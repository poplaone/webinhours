import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Headphones, Send, Lock, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'support';
  content: string;
  timestamp: string;
}

const getInitialMessage = (): Message => ({
  id: 'live-welcome',
  role: 'support',
  content: "👋 Welcome to live support! Send a message and our team will respond as soon as possible.",
  timestamp: new Date().toISOString(),
});

export const LiveChatSupport: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([getInitialMessage()]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize live support session
  useEffect(() => {
    if (!user) {
      setMessages([getInitialMessage()]);
      setSessionId(null);
      return;
    }

    const storedSessionId = localStorage.getItem(`live_support_session_${user.id}`);
    const currentSessionId = storedSessionId || crypto.randomUUID();
    
    if (!storedSessionId) {
      localStorage.setItem(`live_support_session_${user.id}`, currentSessionId);
    }
    setSessionId(currentSessionId);

    // Load existing messages
    const loadMessages = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', user.id)
        .eq('session_id', currentSessionId)
        .eq('is_live_support', true)
        .order('created_at', { ascending: true });

      if (!error && data && data.length > 0) {
        setMessages(data.map(msg => ({
          id: msg.id,
          role: msg.role === 'user' ? 'user' : 'support',
          content: msg.content,
          timestamp: msg.created_at,
        })));
      }
    };
    loadMessages();

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`live_support_${currentSessionId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `session_id=eq.${currentSessionId}`
      }, (payload) => {
        const newMsg = payload.new as any;
        if (newMsg.role === 'support') {
          setMessages(prev => {
            if (prev.some(m => m.id === newMsg.id)) return prev;
            return [...prev, {
              id: newMsg.id,
              role: 'support',
              content: newMsg.content,
              timestamp: newMsg.created_at,
            }];
          });
          toast({
            title: "New message from support",
            description: newMsg.content.slice(0, 50) + (newMsg.content.length > 50 ? '...' : ''),
          });
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, toast]);

  // Scroll to bottom when messages change
  const scrollToBottom = useCallback(() => {
    const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement | null;
    if (viewport) {
      requestAnimationFrame(() => {
        viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Send message
  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim() || !user || !sessionId) return;

    setIsLoading(true);
    const tempId = `temp-${Date.now()}`;
    const userMessage: Message = {
      id: tempId,
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          user_id: user.id,
          session_id: sessionId,
          role: 'user',
          content: message,
          is_live_support: true,
          is_read: false
        })
        .select()
        .single();

      if (error) throw error;

      // Update temp ID with real ID
      setMessages(prev => 
        prev.map(m => m.id === tempId ? { ...m, id: data.id } : m)
      );

      // Create support session
      await supabase
        .from('support_sessions')
        .upsert({
          session_id: sessionId,
          user_id: user.id,
          status: 'open',
        }, { onConflict: 'session_id' });

      // Send notification (fire and forget)
      const { data: profile } = await supabase
        .from('profiles')
        .select('email, full_name')
        .eq('id', user.id)
        .single();

      supabase.functions.invoke('live-support-notification', {
        body: {
          userName: profile?.full_name || 'User',
          userEmail: profile?.email || user.email,
          message,
          sessionId,
        }
      }).catch(console.error);

      // Auto response for first user message
      const userMsgCount = messages.filter(m => m.role === 'user').length;
      if (userMsgCount === 0) {
        const autoResponse: Message = {
          id: `auto-${Date.now()}`,
          role: 'support',
          content: "Thank you for contacting us! A support agent will respond to your message shortly. Our typical response time is within a few hours during business hours.",
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, autoResponse]);
      }

    } catch (error: any) {
      console.error('Live support error:', error);
      setMessages(prev => prev.filter(m => m.id !== tempId));
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, sessionId, messages, toast]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const messageText = inputValue;
    setInputValue('');
    await sendMessage(messageText);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-full flex flex-col bg-card/80 backdrop-blur border-border/50">
      <CardHeader className="pb-3 border-b border-border/30">
        <CardTitle className="text-base flex items-center gap-2">
          <Headphones className="h-5 w-5 text-green-500" />
          Live Support
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Messages */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/60 text-foreground'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-[10px] opacity-60 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-muted/60 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Sending...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-border/30">
          {user ? (
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 bg-background/50"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="icon"
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => navigate('/auth')}
              className="w-full gap-2"
              variant="outline"
            >
              <Lock className="h-4 w-4" />
              Sign in to chat with support
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveChatSupport;
