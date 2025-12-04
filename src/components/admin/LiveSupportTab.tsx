import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, MessageCircle, User, Clock, RefreshCw, Zap, Filter, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
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

type ConversationStatus = 'open' | 'pending' | 'resolved';

interface ChatSession {
  session_id: string;
  user_id: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
  user_email?: string;
  status: ConversationStatus;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'support';
  content: string;
  created_at: string;
  is_read: boolean;
}

const STATUS_CONFIG: Record<ConversationStatus, { label: string; icon: React.ElementType; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  open: { label: 'Open', icon: AlertCircle, variant: 'destructive' },
  pending: { label: 'Pending', icon: Clock, variant: 'secondary' },
  resolved: { label: 'Resolved', icon: CheckCircle2, variant: 'outline' },
};

export function LiveSupportTab() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [statusFilter, setStatusFilter] = useState<ConversationStatus | 'all'>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchSessions = async () => {
    setIsLoading(true);
    try {
      const { data: messagesData, error: messagesError } = await supabase
        .from('chat_messages')
        .select('session_id, user_id, content, created_at, is_read, role')
        .eq('is_live_support', true)
        .order('created_at', { ascending: false });

      if (messagesError) throw messagesError;

      const { data: sessionsData } = await supabase
        .from('support_sessions')
        .select('session_id, status');

      const statusMap = new Map(sessionsData?.map(s => [s.session_id, s.status as ConversationStatus]) || []);

      const sessionMap = new Map<string, ChatSession>();
      
      for (const msg of messagesData || []) {
        if (!sessionMap.has(msg.session_id)) {
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
            status: statusMap.get(msg.session_id) || 'open',
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

    await supabase
      .from('chat_messages')
      .update({ is_read: true })
      .eq('session_id', sessionId)
      .eq('is_live_support', true);
  };

  const updateStatus = async (sessionId: string, newStatus: ConversationStatus) => {
    const session = sessions.find(s => s.session_id === sessionId);
    if (!session) return;

    try {
      const { error } = await supabase
        .from('support_sessions')
        .upsert({
          session_id: sessionId,
          user_id: session.user_id,
          status: newStatus,
        }, { onConflict: 'session_id' });

      if (error) throw error;

      setSessions(prev => prev.map(s => 
        s.session_id === sessionId ? { ...s, status: newStatus } : s
      ));

      toast({
        title: 'Status updated',
        description: `Conversation marked as ${newStatus}`,
      });
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive',
      });
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedSession || !user) return;

    setIsSending(true);
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

      if (session.status === 'open') {
        await updateStatus(selectedSession, 'pending');
      }

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

  const deleteConversation = async (sessionId: string) => {
    try {
      // Delete all messages for this session
      const { error: messagesError } = await supabase
        .from('chat_messages')
        .delete()
        .eq('session_id', sessionId)
        .eq('is_live_support', true);

      if (messagesError) throw messagesError;

      // Delete the session record
      const { error: sessionError } = await supabase
        .from('support_sessions')
        .delete()
        .eq('session_id', sessionId);

      if (sessionError) throw sessionError;

      // Update local state
      setSessions(prev => prev.filter(s => s.session_id !== sessionId));
      
      // Clear selection if deleted session was selected
      if (selectedSession === sessionId) {
        setSelectedSession(null);
        setMessages([]);
      }

      toast({
        title: 'Conversation deleted',
        description: 'The conversation has been permanently removed.',
      });
    } catch (error: any) {
      console.error('Error deleting conversation:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete conversation',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (selectedSession) {
      fetchMessages(selectedSession);
    }
  }, [selectedSession]);

  useEffect(() => {
    const channel = supabase
      .channel('admin_live_support_tab')
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
          fetchSessions();
          
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

  const filteredSessions = statusFilter === 'all' 
    ? sessions 
    : sessions.filter(s => s.status === statusFilter);

  const currentSession = sessions.find(s => s.session_id === selectedSession);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Live Support Dashboard</h2>
          <p className="text-sm text-muted-foreground">Manage customer support conversations</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchSessions}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px]">
        {/* Sessions List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageCircle className="h-5 w-5" />
                Conversations
                {filteredSessions.length > 0 && (
                  <Badge variant="secondary">{filteredSessions.length}</Badge>
                )}
              </CardTitle>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as ConversationStatus | 'all')}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Conversations</SelectItem>
                  <SelectItem value="open">
                    <span className="flex items-center gap-2">
                      <AlertCircle className="h-3 w-3 text-destructive" /> Open
                    </span>
                  </SelectItem>
                  <SelectItem value="pending">
                    <span className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" /> Pending
                    </span>
                  </SelectItem>
                  <SelectItem value="resolved">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 text-green-500" /> Resolved
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[480px]">
              {isLoading ? (
                <div className="p-4 text-center text-muted-foreground">Loading...</div>
              ) : filteredSessions.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No conversations found
                </div>
              ) : (
                filteredSessions.map((session) => {
                  const StatusIcon = STATUS_CONFIG[session.status].icon;
                  return (
                    <div
                      key={session.session_id}
                      className={`w-full p-4 text-left border-b border-border/50 hover:bg-muted/50 transition-colors ${
                        selectedSession === session.session_id ? 'bg-muted' : ''
                      }`}
                    >
                      <div 
                        className="cursor-pointer"
                        onClick={() => setSelectedSession(session.session_id)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm truncate max-w-[120px]">
                                {session.user_email}
                              </p>
                              <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                                {session.last_message}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            {session.unread_count > 0 && (
                              <Badge variant="destructive" className="h-5 text-xs">
                                {session.unread_count}
                              </Badge>
                            )}
                            <Badge variant={STATUS_CONFIG[session.status].variant} className="h-5 text-xs">
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {STATUS_CONFIG[session.status].label}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {format(new Date(session.last_message_time), 'MMM d, h:mm a')}
                        </div>
                      </div>
                      <div className="flex justify-end mt-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete conversation?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete this conversation and all its messages. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => deleteConversation(session.session_id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  );
                })
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {selectedSession ? (
                  <span className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Chat with {currentSession?.user_email}
                  </span>
                ) : (
                  'Select a conversation'
                )}
              </CardTitle>
              {selectedSession && currentSession && (
                <Select 
                  value={currentSession.status} 
                  onValueChange={(v) => updateStatus(selectedSession, v as ConversationStatus)}
                >
                  <SelectTrigger className="w-[140px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">
                      <span className="flex items-center gap-2">
                        <AlertCircle className="h-3 w-3 text-destructive" /> Open
                      </span>
                    </SelectItem>
                    <SelectItem value="pending">
                      <span className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-muted-foreground" /> Pending
                      </span>
                    </SelectItem>
                    <SelectItem value="resolved">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-500" /> Resolved
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 p-0 flex flex-col">
            {selectedSession ? (
              <>
                <ScrollArea className="flex-1 p-4 h-[400px]">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'support' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === 'support'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.role === 'support' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}>
                            {format(new Date(message.created_at), 'h:mm a')}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Quick Responses */}
                <div className="px-4 py-2 border-t border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Quick responses:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {QUICK_RESPONSES.map((response, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        className="h-6 text-xs"
                        onClick={() => setNewMessage(response.text)}
                      >
                        {response.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your response..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      disabled={isSending}
                    />
                    <Button onClick={sendMessage} disabled={isSending || !newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
