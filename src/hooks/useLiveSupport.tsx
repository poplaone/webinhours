import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface LiveMessage {
  id: string;
  role: 'user' | 'support';
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface UseLiveSupportReturn {
  messages: LiveMessage[];
  isLoading: boolean;
  sessionId: string | null;
  sendMessage: (message: string) => Promise<void>;
  isAuthenticated: boolean;
}

export const useLiveSupport = (): UseLiveSupportReturn => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<LiveMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Initialize session and load messages
  useEffect(() => {
    if (!user) {
      setMessages([]);
      setSessionId(null);
      return;
    }

    // Create or get session ID from localStorage
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

      if (error) {
        console.error('Error loading messages:', error);
        return;
      }

      if (data) {
        setMessages(data.map(msg => ({
          id: msg.id,
          role: msg.role as 'user' | 'support',
          content: msg.content,
          timestamp: msg.created_at,
          isRead: msg.is_read
        })));
      }
    };

    loadMessages();

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`live_support_${currentSessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `session_id=eq.${currentSessionId}`
        },
        (payload) => {
          const newMsg = payload.new as any;
          // Only add if it's a support message (user messages are added locally)
          if (newMsg.role === 'support') {
            setMessages(prev => {
              // Check if message already exists
              if (prev.some(m => m.id === newMsg.id)) return prev;
              return [...prev, {
                id: newMsg.id,
                role: newMsg.role,
                content: newMsg.content,
                timestamp: newMsg.created_at,
                isRead: newMsg.is_read
              }];
            });
            
            // Show notification for support response
            toast({
              title: "New message from support",
              description: newMsg.content.slice(0, 50) + (newMsg.content.length > 50 ? '...' : ''),
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, toast]);

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim() || !user || !sessionId) return;

    setIsLoading(true);

    // Optimistically add message to UI
    const tempId = crypto.randomUUID();
    const tempMessage: LiveMessage = {
      id: tempId,
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    
    setMessages(prev => [...prev, tempMessage]);

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

      // Update temp message with real ID
      setMessages(prev => 
        prev.map(m => m.id === tempId ? { ...m, id: data.id } : m)
      );

      // Create or update support session (upsert)
      await supabase
        .from('support_sessions')
        .upsert({
          session_id: sessionId,
          user_id: user.id,
          status: 'open',
        }, { onConflict: 'session_id' });

      // Send email notification to admin (fire and forget)
      const { data: profile } = await supabase
        .from('profiles')
        .select('email, full_name')
        .eq('id', user.id)
        .single();

      supabase.functions.invoke('live-support-notification', {
        body: {
          userName: profile?.full_name || 'User',
          userEmail: profile?.email || user.email,
          message: message,
          sessionId: sessionId,
        }
      }).catch(err => console.error('Email notification failed:', err));

      // If this is the first message, show a welcome response
      if (messages.length === 0) {
        const welcomeMessage: LiveMessage = {
          id: crypto.randomUUID(),
          role: 'support',
          content: "Thank you for contacting us! A support agent will respond to your message shortly. Our typical response time is within a few hours during business hours.",
          timestamp: new Date().toISOString(),
          isRead: true
        };
        setMessages(prev => [...prev, welcomeMessage]);
      }

    } catch (error: any) {
      console.error('Error sending message:', error);
      // Remove optimistic message on error
      setMessages(prev => prev.filter(m => m.id !== tempId));
      
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, sessionId, messages.length, toast]);

  return {
    messages,
    isLoading,
    sessionId,
    sendMessage,
    isAuthenticated: !!user,
  };
};
