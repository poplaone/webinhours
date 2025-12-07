import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { AIAgent, AIAgentInsert, AIAgentUpdate, AIAgentFilters } from '@/types/aiAgent';

// Cache for profiles to avoid repeated fetches
const profileCache = new Map<string, any>();
const profileCacheTimeout = 1000 * 60 * 5; // 5 minutes
const profileCacheTimestamps = new Map<string, number>();

const fetchProfilesForAgents = async (agents: any[]) => {
  if (!agents || agents.length === 0) return agents;

  const now = Date.now();
  const userIds = [...new Set(agents.map(a => a.user_id).filter(Boolean))];
  
  // Filter out cached profiles
  const uncachedUserIds = userIds.filter(id => {
    const timestamp = profileCacheTimestamps.get(id);
    return !timestamp || (now - timestamp) > profileCacheTimeout;
  });

  if (uncachedUserIds.length === 0) {
    // All profiles are cached, use cached data
    return agents.map(agent => ({
      ...agent,
      profiles: profileCache.get(agent.user_id) || null
    }));
  }

  const { data: profilesData, error: profilesError } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url')
    .in('id', uncachedUserIds);

  if (profilesError) {
    return agents;
  }
  
  // Update cache with new profiles
  profilesData?.forEach(profile => {
    profileCache.set(profile.id, profile);
    profileCacheTimestamps.set(profile.id, now);
  });
  
  // Merge profiles with agents (use cached data for existing profiles)
  return agents.map(agent => ({
    ...agent,
    profiles: profileCache.get(agent.user_id) || null
  }));
};

export const useAIAgents = (filters?: AIAgentFilters) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['ai-agents', filters],
    queryFn: async () => {
      let query = supabase
        .from('ai_agents')
        .select('*')
        .order('created_at', { ascending: false });

      // For marketplace, show approved and featured agents; include current user's own if requested
      if (!filters?.includeAll) {
        if (filters?.includeMine && user?.id) {
          query = query.or(`status.eq.approved,status.eq.featured,user_id.eq.${user.id}`);
        } else {
          query = query.in('status', ['approved', 'featured']);
        }
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
      
      // Fetch profiles separately to avoid join issues
      let agentsWithProfiles = data || [];
      if (agentsWithProfiles.length > 0 && agentsWithProfiles.length < 50) {
        agentsWithProfiles = await fetchProfilesForAgents(agentsWithProfiles);
      }
      
      return agentsWithProfiles as AIAgent[];
    },
    // 🚀 AGGRESSIVE CACHING FOR MARKETPLACE SPEED
    staleTime: 1000 * 60 * 10, // 10 minutes - data stays fresh
    gcTime: 1000 * 60 * 60, // 1 hour - keep in cache for an hour
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    networkMode: 'online'
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
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      // Fetch profile separately
      if (data?.user_id) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .eq('id', data.user_id)
          .maybeSingle();
        
        return { ...data, profiles: profileData || null } as AIAgent;
      }
      
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
