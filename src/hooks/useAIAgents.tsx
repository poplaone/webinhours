import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { AIAgent, AIAgentInsert, AIAgentUpdate, AIAgentFilters } from '@/types/aiAgent';

export const useAIAgents = (filters?: AIAgentFilters) => {
  return useQuery({
    queryKey: ['ai-agents', filters],
    queryFn: async () => {
      let query = supabase
        .from('ai_agents')
        .select(`
          *,
          profiles:user_id(full_name, avatar_url)
        `)
        .order('created_at', { ascending: false });

      if (!filters?.includeAll) {
        query = query.in('status', ['approved', 'featured']);
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      if (filters?.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }

      if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      if (filters?.agent_type && filters.agent_type !== 'all') {
        query = query.eq('agent_type', filters.agent_type);
      }

      if (filters?.featured) {
        query = query.eq('is_featured', true);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as AIAgent[];
    }
  });
};

export const useUserAIAgents = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-ai-agents', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('ai_agents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as AIAgent[];
    },
    enabled: !!user
  });
};

export const useAIAgentById = (id: string) => {
  return useQuery({
    queryKey: ['ai-agent', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_agents')
        .select(`
          *,
          profiles:user_id(full_name, avatar_url)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as AIAgent;
    },
    enabled: !!id
  });
};

export const useCreateAIAgent = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (agent: AIAgentInsert) => {
      if (!user) throw new Error('User must be authenticated');

      const { data, error } = await supabase
        .from('ai_agents')
        .insert({ ...agent, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-agents'] });
      queryClient.invalidateQueries({ queryKey: ['user-ai-agents'] });
    }
  });
};

export const useUpdateAIAgent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: AIAgentUpdate }) => {
      const { data, error } = await supabase
        .from('ai_agents')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-agents'] });
      queryClient.invalidateQueries({ queryKey: ['user-ai-agents'] });
    }
  });
};

export const useDeleteAIAgent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('ai_agents')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-agents'] });
      queryClient.invalidateQueries({ queryKey: ['user-ai-agents'] });
    }
  });
};

export const useIncrementAgentUsage = () => {
  return useMutation({
    mutationFn: async (agentId: string) => {
      const { error } = await supabase.rpc('increment_agent_usage', {
        agent_uuid: agentId
      });

      if (error) throw error;
    }
  });
};