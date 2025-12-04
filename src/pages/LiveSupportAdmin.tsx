import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import SEOHead from '@/components/seo/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Send, MessageCircle, User, Clock, RefreshCw, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const QUICK_RESPONSES = [
  { label: 'Greeting', text: 'Hello! Thanks for reaching out to WebInHours support. How can I help you today?' },
  { label: 'Pricing', text: 'Our pricing varies based on the template or AI agent you choose. You can see individual prices on each product page. Need help finding something in your budget?' },
  { label: 'Customization', text: 'Yes, all our templates are fully customizable! Once purchased, you get the complete source code to modify as needed.' },
  { label: 'Delivery', text: 'After purchase, you\'ll receive instant access to download your template or AI agent. Check your email for the download link!' },
  { label: 'Refund', text: 'We offer refunds within 7 days of purchase if the product doesn\'t meet your expectations. Please contact us with your order details.' },
  { label: 'Tech Support', text: 'For technical issues, please describe the problem in detail. Screenshots help us diagnose faster!' },
  { label: 'Thanks', text: 'Thank you for choosing WebInHours! Is there anything else I can help you with?' },
];

interface ChatSession {
  session_id: string;
  user_id: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
  user_email?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'support';
  content: string;
  created_at: string;
  is_read: boolean;
}

const LiveSupportAdmin = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch all live support sessions
  const fetchSessions = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('session_id, user_id, content, created_at, is_read, role')
        .eq('is_live_support', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group by session
      const sessionMap = new Map<string, ChatSession>();
      
      for (const msg of data || []) {
        if (!sessionMap.has(msg.session_id)) {
          // Get user email from profiles
          const { data: profile } = await supabase
            .from('profiles')
            .select('email')
            .eq('id', msg.user_id)
            .single();

          sessionMap.set(msg.session_id, {
            session_id: msg.session_id,
            user_id: msg.user_id,
            last_message: msg.content,
            last_message_time: msg.created_at,
            unread_count: 0,
            user_email: profile?.email || 'Unknown',
          });
        }
        
        const session = sessionMap.get(msg.session_id)!;
        if (!msg.is_read && msg.role !== 'support') {
          session.unread_count++;
        }
      }

      setSessions(Array.from(sessionMap.values()));
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch messages for selected session
  const fetchMessages = async (sessionId: string) => {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .eq('is_live_support', true)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return;
    }

    setMessages(data?.map(msg => ({
      id: msg.id,
      role: msg.role as 'user' | 'support',
      content: msg.content,
      created_at: msg.created_at,
      is_read: msg.is_read,
    })) || []);

    // Mark messages as read
    await supabase
      .from('chat_messages')
      .update({ is_read: true })
      .eq('session_id', sessionId)
      .eq('is_live_support', true);
  };

  // Send support response
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedSession || !user) return;

    setIsSending(true);
    
    // Get the user_id for this session
    const session = sessions.find(s => s.session_id === selectedSession);
    if (!session) return;

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          user_id: session.user_id,
          session_id: selectedSession,
          role: 'support',
          content: newMessage,
          is_live_support: true,
          is_read: false,
        });

      if (error) throw error;

      setNewMessage('');
      toast({
        title: "Message sent",
        description: "Your response has been delivered.",
      });
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial fetch
  useEffect(() => {
    fetchSessions();
  }, []);

  // Fetch messages when session changes
  useEffect(() => {
    if (selectedSession) {
      fetchMessages(selectedSession);
    }
  }, [selectedSession]);

  // Subscribe to realtime updates
  useEffect(() => {
    const channel = supabase
      .channel('admin_live_support')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: 'is_live_support=eq.true'
        },
        (payload) => {
          const newMsg = payload.new as any;
          
          // Update sessions list
          fetchSessions();
          
          // Update current conversation if it matches
          if (selectedSession === newMsg.session_id) {
            setMessages(prev => [...prev, {
              id: newMsg.id,
              role: newMsg.role,
              content: newMsg.content,
              created_at: newMsg.created_at,
              is_read: newMsg.is_read,
            }]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedSession]);

  return (
    <>
      <SEOHead 
        title="Live Support Admin - WebInHours"
        description="Manage live support conversations"
        noIndex={true}
      />
      <main className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin-panel')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Live Support Dashboard</h1>
            <p className="text-muted-foreground">Manage customer support conversations</p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchSessions} className="ml-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Sessions List */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageCircle className="h-5 w-5" />
                Conversations
                {sessions.length > 0 && (
                  <Badge variant="secondary">{sessions.length}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-320px)]">
                {isLoading ? (
                  <div className="p-4 text-center text-muted-foreground">Loading...</div>
                ) : sessions.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    No support conversations yet
                  </div>
                ) : (
                  sessions.map((session) => (
                    <button
                      key={session.session_id}
                      onClick={() => setSelectedSession(session.session_id)}
                      className={`w-full p-4 text-left border-b border-border/50 hover:bg-muted/50 transition-colors ${
                        selectedSession === session.session_id ? 'bg-muted' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm truncate max-w-[150px]">
                              {session.user_email}
                            </p>
                            <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                              {session.last_message}
                            </p>
                          </div>
                        </div>
                        {session.unread_count > 0 && (
                          <Badge variant="destructive" className="shrink-0">
                            {session.unread_count}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {format(new Date(session.last_message_time), 'MMM d, h:mm a')}
                      </div>
                    </button>
                  ))
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 flex flex-col">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg">
                {selectedSession ? (
                  <span className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Chat with {sessions.find(s => s.session_id === selectedSession)?.user_email}
                  </span>
                ) : (
                  'Select a conversation'
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              {selectedSession ? (
                <>
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.role === 'support' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              msg.role === 'support'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                            <p className={`text-xs mt-1 ${
                              msg.role === 'support' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}>
                              {format(new Date(msg.created_at), 'h:mm a')}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  <div className="p-4 border-t space-y-3">
                    {/* Quick Responses */}
                    <div className="flex flex-wrap gap-2">
                      <span className="flex items-center text-xs text-muted-foreground mr-1">
                        <Zap className="h-3 w-3 mr-1" />
                        Quick:
                      </span>
                      {QUICK_RESPONSES.map((qr) => (
                        <Button
                          key={qr.label}
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => setNewMessage(qr.text)}
                        >
                          {qr.label}
                        </Button>
                      ))}
                    </div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage();
                      }}
                      className="flex gap-2"
                    >
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your response..."
                        className="flex-1"
                      />
                      <Button type="submit" disabled={isSending || !newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select a conversation to start responding</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default LiveSupportAdmin;
