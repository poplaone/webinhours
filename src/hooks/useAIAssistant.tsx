import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface AIDecision {
  action: string;
  response?: string;
  title?: string;
  description?: string;
  priority?: string;
  category?: string;
  recommendations?: any[];
  reasoning?: string;
}

interface AIResponse {
  decision: AIDecision;
  result?: any;
  error?: string;
  auditLogId?: string;
}

export const useAIAssistant = () => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI assistant. I can help you with support tickets, recommend templates, answer questions, and more. How can I assist you today?",
      timestamp: new Date().toISOString(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (message: string, context?: any) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: AIMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          message,
          action: 'read_data',
          context,
        },
      });

      if (error) throw error;

      const aiResponse = data as AIResponse;
      
      // Handle different action types
      let responseContent = '';
      
      if (aiResponse.decision.action === 'create_ticket' && aiResponse.result) {
        responseContent = `I've created a support ticket for you:\n\n**${aiResponse.decision.title}**\nPriority: ${aiResponse.decision.priority}\n\nOur team will review it shortly. Is there anything else I can help you with?`;
        
        toast({
          title: "Support Ticket Created",
          description: "Your ticket has been submitted successfully.",
        });
      } else if (aiResponse.decision.action === 'recommend_content') {
        responseContent = aiResponse.decision.response || 'Here are my recommendations based on your needs.';
      } else {
        responseContent = aiResponse.decision.response || 'I understand. How else can I assist you?';
      }

      if (aiResponse.error) {
        responseContent = `I encountered an issue: ${aiResponse.error}. Please try again or contact support.`;
        toast({
          title: "Action Failed",
          description: aiResponse.error,
          variant: "destructive",
        });
      }

      // Add AI response
      const assistantMessage: AIMessage = {
        role: 'assistant',
        content: responseContent,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMessage]);

    } catch (error: any) {
      console.error('AI Assistant error:', error);
      
      const errorMessage: AIMessage = {
        role: 'assistant',
        content: "I apologize, but I'm having trouble processing your request. Please try again or contact support if the issue persists.",
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
  };

  const clearMessages = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hi! I'm your AI assistant. I can help you with support tickets, recommend templates, answer questions, and more. How can I assist you today?",
        timestamp: new Date().toISOString(),
      }
    ]);
  };

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
};