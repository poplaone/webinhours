import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface UseMarketplaceAIReturn {
  messages: AIMessage[];
  isLoading: boolean;
  remainingCredits: number | null;
  dailyLimit: number;
  sendMessage: (message: string) => Promise<void>;
  clearMessages: () => void;
  isAuthenticated: boolean;
}

const DAILY_LIMIT = 10;

export const useMarketplaceAI = (): UseMarketplaceAIReturn => {
  const { user, session } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      role: 'assistant',
      content: "👋 Hi! I'm your AI marketplace assistant. I can help you find the perfect website template or AI agent for your business. What are you looking for today?",
      timestamp: new Date().toISOString(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [remainingCredits, setRemainingCredits] = useState<number | null>(null);

  // Fetch initial credits on mount
  useEffect(() => {
    const fetchCredits = async () => {
      if (!user) {
        setRemainingCredits(null);
        return;
      }

      try {
        const { data, error } = await supabase.rpc('get_remaining_ai_credits', {
          p_user_id: user.id,
          p_daily_limit: DAILY_LIMIT
        });

        if (!error && data !== null) {
          setRemainingCredits(data);
        }
      } catch (err) {
        console.error('Error fetching credits:', err);
      }
    };

    fetchCredits();
  }, [user]);

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;
    
    if (!user || !session) {
      toast({
        title: "Sign in required",
        description: "Please sign in to use the AI assistant.",
        variant: "destructive"
      });
      return;
    }

    const userMessage: AIMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Build conversation history (last 10 messages for context)
      const conversationHistory = messages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch(
        `https://dcsnxieqnpcjqqiajtvh.supabase.co/functions/v1/gemini-assistant`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            message,
            conversationHistory
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setRemainingCredits(data.remainingCredits || 0);
          toast({
            title: "Daily limit reached",
            description: `You've used all ${DAILY_LIMIT} AI messages for today. Limit resets at midnight.`,
            variant: "destructive"
          });
          
          const limitMessage: AIMessage = {
            role: 'assistant',
            content: `⚠️ You've reached your daily limit of ${DAILY_LIMIT} AI messages. Your credits will reset at midnight. In the meantime, you can browse the marketplace or use the search filters!`,
            timestamp: new Date().toISOString(),
          };
          setMessages(prev => [...prev, limitMessage]);
          return;
        }
        throw new Error(data.error || 'Failed to get AI response');
      }

      if (data.remainingCredits !== undefined) {
        setRemainingCredits(data.remainingCredits);
      }

      const assistantMessage: AIMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);

    } catch (error: any) {
      console.error('AI Assistant error:', error);
      
      const errorMessage: AIMessage = {
        role: 'assistant',
        content: "I apologize, but I'm having trouble processing your request. Please try again.",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);

      toast({
        title: "Error",
        description: error.message || "Failed to communicate with AI assistant",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [messages, user, session, toast]);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        role: 'assistant',
        content: "👋 Hi! I'm your AI marketplace assistant. I can help you find the perfect website template or AI agent for your business. What are you looking for today?",
        timestamp: new Date().toISOString(),
      }
    ]);
  }, []);

  return {
    messages,
    isLoading,
    remainingCredits,
    dailyLimit: DAILY_LIMIT,
    sendMessage,
    clearMessages,
    isAuthenticated: !!user,
  };
};
