import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bot, Send, Sparkles, Headphones, Lock, Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type ChatMode = 'ai' | 'live';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'support';
  content: string;
  timestamp: string;
}

interface AIChatbotProps {
  onSearch?: (query: string) => void;
}

const DAILY_LIMIT = 10;

// Initial messages for each mode
const getInitialAIMessage = (): Message => ({
  id: 'ai-welcome',
  role: 'assistant',
  content: "👋 Hi! I'm your AI marketplace assistant. I can help you find the perfect website template or AI agent for your business. What are you looking for today?",
  timestamp: new Date().toISOString(),
});

const getInitialLiveMessage = (): Message => ({
  id: 'live-welcome',
  role: 'support',
  content: "👋 Welcome to live support! Send a message and our team will respond as soon as possible.",
  timestamp: new Date().toISOString(),
});

export const AIChatbot: React.FC<AIChatbotProps> = ({ onSearch }) => {
  const [chatMode, setChatMode] = useState<ChatMode>('ai');
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Separate states for AI and Live modes
  const [aiMessages, setAiMessages] = useState<Message[]>([getInitialAIMessage()]);
  const [liveMessages, setLiveMessages] = useState<Message[]>([getInitialLiveMessage()]);
  
  const [aiLoading, setAiLoading] = useState(false);
  const [liveLoading, setLiveLoading] = useState(false);
  const [remainingCredits, setRemainingCredits] = useState<number | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Current mode's messages and loading state
  const currentMessages = chatMode === 'ai' ? aiMessages : liveMessages;
  const isLoading = chatMode === 'ai' ? aiLoading : liveLoading;

  // Fetch AI credits on mount
  useEffect(() => {
    const fetchCredits = async () => {
      if (!user) {
        setRemainingCredits(null);
        return;
      }
      try {
        const { data } = await supabase.rpc('get_remaining_ai_credits', {
          p_user_id: user.id,
          p_daily_limit: DAILY_LIMIT
        });
        if (data !== null) setRemainingCredits(data);
      } catch (err) {
        console.error('Error fetching credits:', err);
      }
    };
    fetchCredits();
  }, [user]);

  // Initialize live support session
  useEffect(() => {
    if (!user) {
      setLiveMessages([getInitialLiveMessage()]);
      setSessionId(null);
      return;
    }

    const storedSessionId = localStorage.getItem(`live_support_session_${user.id}`);
    const currentSessionId = storedSessionId || crypto.randomUUID();
    
    if (!storedSessionId) {
      localStorage.setItem(`live_support_session_${user.id}`, currentSessionId);
    }
    setSessionId(currentSessionId);

    // Load existing live messages
    const loadLiveMessages = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', user.id)
        .eq('session_id', currentSessionId)
        .eq('is_live_support', true)
        .order('created_at', { ascending: true });

      if (!error && data && data.length > 0) {
        setLiveMessages(data.map(msg => ({
          id: msg.id,
          role: msg.role === 'user' ? 'user' : 'support',
          content: msg.content,
          timestamp: msg.created_at,
        })));
      }
    };
    loadLiveMessages();

    // Subscribe to realtime updates for live support
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
          setLiveMessages(prev => {
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
  }, [currentMessages, scrollToBottom]);

  // Send AI message
  const sendAIMessage = useCallback(async (message: string) => {
    if (!message.trim() || !user || !session) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };
    
    setAiMessages(prev => [...prev, userMessage]);
    setAiLoading(true);

    try {
      const conversationHistory = aiMessages
        .filter(m => m.id !== 'ai-welcome')
        .slice(-10)
        .map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        }));

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gemini-assistant`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ message, conversationHistory }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setRemainingCredits(data.remainingCredits || 0);
          toast({
            title: "Daily limit reached",
            description: `You've used all ${DAILY_LIMIT} AI messages for today.`,
            variant: "destructive"
          });
          const limitMessage: Message = {
            id: `limit-${Date.now()}`,
            role: 'assistant',
            content: `⚠️ You've reached your daily limit of ${DAILY_LIMIT} AI messages. Your credits will reset at midnight. Browse the marketplace or use filters in the meantime!`,
            timestamp: new Date().toISOString(),
          };
          setAiMessages(prev => [...prev, limitMessage]);
          return;
        }
        throw new Error(data.error || 'Failed to get AI response');
      }

      if (data.remainingCredits !== undefined) {
        setRemainingCredits(data.remainingCredits);
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString(),
      };
      setAiMessages(prev => [...prev, assistantMessage]);

    } catch (error: any) {
      console.error('AI error:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "I apologize, but I'm having trouble processing your request. Please try again.",
        timestamp: new Date().toISOString(),
      };
      setAiMessages(prev => [...prev, errorMessage]);
      toast({
        title: "Error",
        description: error.message || "Failed to communicate with AI",
        variant: "destructive",
      });
    } finally {
      setAiLoading(false);
    }
  }, [aiMessages, user, session, toast]);

  // Send live support message
  const sendLiveMessage = useCallback(async (message: string) => {
    if (!message.trim() || !user || !sessionId) return;

    setLiveLoading(true);
    const tempId = `temp-${Date.now()}`;
    const userMessage: Message = {
      id: tempId,
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };
    
    setLiveMessages(prev => [...prev, userMessage]);

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
      setLiveMessages(prev => 
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

      // Auto response for first message
      if (liveMessages.filter(m => m.role === 'user').length === 0) {
        const autoResponse: Message = {
          id: `auto-${Date.now()}`,
          role: 'support',
          content: "Thank you for contacting us! A support agent will respond to your message shortly. Our typical response time is within a few hours during business hours.",
          timestamp: new Date().toISOString(),
        };
        setLiveMessages(prev => [...prev, autoResponse]);
      }

    } catch (error: any) {
      console.error('Live support error:', error);
      setLiveMessages(prev => prev.filter(m => m.id !== tempId));
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLiveLoading(false);
    }
  }, [user, sessionId, liveMessages, toast]);

  // Handle send message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const messageText = inputValue;
    setInputValue('');
    onSearch?.(messageText);

    if (chatMode === 'ai') {
      await sendAIMessage(messageText);
    } else {
      await sendLiveMessage(messageText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
      setSearchQuery('');
    }
  };

  const handleModeSwitch = (checked: boolean) => {
    setChatMode(checked ? 'live' : 'ai');
    // Messages are kept separate, no need to reset
  };

  // Quick action for authenticated AI users
  const handleQuickAction = async (action: string) => {
    if (chatMode === 'ai' && user) {
      setInputValue('');
      onSearch?.(action);
      await sendAIMessage(action);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      className="w-full h-full"
    >
      <Card className="relative h-full flex flex-col bg-transparent border-0 shadow-none overflow-hidden">
        <CardHeader className="pb-2 border-b border-border/20">
          <div className="flex items-center justify-between mb-3">
            <CardTitle className="flex items-center text-lg">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                chatMode === 'ai' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-600'
              }`}>
                {chatMode === 'ai' ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <Headphones className="w-4 h-4 text-white" />
                )}
              </div>
              {chatMode === 'ai' ? 'AI Assistant' : 'Live Support'}
              <div className={`w-2 h-2 rounded-full ml-2 animate-pulse ${
                chatMode === 'ai' ? 'bg-purple-500' : 'bg-green-500'
              }`}></div>
            </CardTitle>
          </div>
          
          {/* Mode Toggle */}
          <div className="flex items-center justify-between bg-muted/30 rounded-lg p-2">
            <div className="flex items-center gap-2">
              <Bot className={`h-4 w-4 transition-colors ${chatMode === 'ai' ? 'text-purple-500' : 'text-muted-foreground'}`} />
              <Label htmlFor="chat-mode" className="text-xs text-muted-foreground cursor-pointer">AI</Label>
            </div>
            
            <Switch
              id="chat-mode"
              checked={chatMode === 'live'}
              onCheckedChange={handleModeSwitch}
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-purple-500"
            />
            
            <div className="flex items-center gap-2">
              <Label htmlFor="chat-mode" className="text-xs text-muted-foreground cursor-pointer">Live</Label>
              <Headphones className={`h-4 w-4 transition-colors ${chatMode === 'live' ? 'text-green-500' : 'text-muted-foreground'}`} />
            </div>
          </div>

          {/* Credits indicator */}
          {chatMode === 'ai' && user && remainingCredits !== null && (
            <div className="mt-2 flex items-center justify-center">
              <Badge variant="outline" className="text-xs bg-purple-500/10 border-purple-500/30 text-purple-400">
                <Sparkles className="h-3 w-3 mr-1" />
                {remainingCredits}/{DAILY_LIMIT} credits remaining
              </Badge>
            </div>
          )}
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 min-h-0 overflow-hidden">
          {/* Non-authenticated AI mode */}
          {chatMode === 'ai' && !user && (
            <div className="flex-1 flex flex-col">
              <div className="flex-none p-4 border-b border-border/20">
                <div className="text-center mb-4">
                  <Lock className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Sign in to use AI-powered search</p>
                  <Button 
                    size="sm" 
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                    onClick={() => navigate('/auth')}
                  >
                    Sign In to Ask AI
                  </Button>
                </div>
                
                <div className="relative mt-4">
                  <p className="text-xs text-muted-foreground mb-2 text-center">Or search the marketplace:</p>
                  <div className="flex gap-2">
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="Search templates..."
                      className="bg-muted/30 border-purple-500/30"
                    />
                    <Button 
                      size="icon"
                      variant="outline"
                      onClick={handleSearch}
                      className="border-purple-500/30 text-purple-500 hover:bg-purple-500/10"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto">
                <p className="text-xs text-muted-foreground mb-3">Quick filters:</p>
                <div className="flex flex-wrap gap-2">
                  {['E-commerce', 'Portfolio', 'SaaS', 'Blog', 'Landing Page'].map((filter) => (
                    <Button
                      key={filter}
                      variant="outline"
                      size="sm"
                      className="text-xs border-purple-500/30 text-muted-foreground hover:bg-purple-500/10"
                      onClick={() => onSearch?.(filter.toLowerCase())}
                    >
                      {filter}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Non-authenticated live support */}
          {chatMode === 'live' && !user && (
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <Lock className="h-12 w-12 text-green-500 mb-4" />
              <p className="text-muted-foreground text-center mb-4">Sign in to chat with our support team</p>
              <Button 
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={() => navigate('/auth')}
              >
                Sign In for Live Support
              </Button>
            </div>
          )}

          {/* Authenticated chat view */}
          {((chatMode === 'ai' && user) || (chatMode === 'live' && user)) && (
            <>
              <div ref={scrollAreaRef} className="relative flex-1 min-h-0">
                <ScrollArea className="h-full w-full">
                  <div className="p-4 pb-24 space-y-4">
                    <AnimatePresence mode="popLayout">
                      {currentMessages.map(message => (
                        <motion.div 
                          key={message.id} 
                          initial={{ opacity: 0, y: 10 }} 
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          layout
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} w-full`}
                        >
                          <div className="max-w-[85%]">
                            <div className={`p-3 rounded-2xl ${
                              message.role === 'user' 
                                ? chatMode === 'ai'
                                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                                  : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                                : 'bg-muted/80 text-foreground'
                            }`}>
                              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                            </div>
                            <div className={`text-xs text-muted-foreground mt-1 ${
                              message.role === 'user' ? 'text-right' : 'text-left'
                            }`}>
                              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Loading indicator */}
                    {isLoading && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="flex justify-start"
                      >
                        <div className="bg-muted/80 p-3 rounded-2xl">
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {chatMode === 'ai' ? 'AI is thinking...' : 'Sending...'}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* Quick actions for AI mode */}
              {chatMode === 'ai' && user && (
                <div className="px-4 py-2 border-t border-border/20">
                  <div className="flex gap-2 flex-wrap">
                    {['E-commerce', 'AI Agents', 'Portfolio'].map((action) => (
                      <Button
                        key={action}
                        variant="outline"
                        size="sm"
                        disabled={isLoading}
                        className="text-xs border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                        onClick={() => handleQuickAction(`Show me ${action.toLowerCase()} templates`)}
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input area */}
              <div className="p-4 border-t border-border/20">
                <div className="flex gap-2">
                  <Input 
                    placeholder={chatMode === 'ai' ? "Ask about templates..." : "Type your message..."} 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    className={`flex-1 ${
                      chatMode === 'ai' 
                        ? 'border-purple-500/30 focus:border-purple-500' 
                        : 'border-green-500/30 focus:border-green-500'
                    }`}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={isLoading || !inputValue.trim()}
                    className={`px-3 ${
                      chatMode === 'ai' 
                        ? 'bg-purple-500 hover:bg-purple-600' 
                        : 'bg-green-500 hover:bg-green-600'
                    } text-white`}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
