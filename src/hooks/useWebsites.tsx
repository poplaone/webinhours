
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Database } from '@/integrations/supabase/types';

type Website = Database['public']['Tables']['websites']['Row'];
type WebsiteInsert = Database['public']['Tables']['websites']['Insert'];
type WebsiteUpdate = Database['public']['Tables']['websites']['Update'];

export const useWebsites = (filters?: {
  category?: string;
  tags?: string[];
  status?: string;
  featured?: boolean;
  search?: string;
}) => {
  return useQuery({
    queryKey: ['websites', filters],
    queryFn: async () => {
      let query = supabase
        .from('websites')
        .select(`
          *,
          profiles!websites_user_id_fkey(full_name, avatar_url)
        `);

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      if (filters?.status) {
        query = query.eq('status', filters.status);
      } else {
        // Default to showing only approved and featured websites for public view
        query = query.in('status', ['approved', 'featured']);
      }

      if (filters?.featured !== undefined) {
        query = query.eq('is_featured', filters.featured);
      }

      if (filters?.tags && filters.tags.length > 0) {
        query = query.overlaps('tags', filters.tags);
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      // Add ranking calculation and order by it
      const { data, error } = await query
        .select(`
          *,
          profiles!websites_user_id_fkey(full_name, avatar_url),
          ranking_score:calculate_ranking_score(rating_average, rating_count, views_count, downloads_count, created_at, is_featured)
        `)
        .order('ranking_score', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useUserWebsites = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-websites', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('websites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useCreateWebsite = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (website: Omit<WebsiteInsert, 'user_id'>) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('websites')
        .insert({ ...website, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['websites'] });
      queryClient.invalidateQueries({ queryKey: ['user-websites'] });
    },
  });
};

export const useUpdateWebsite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: WebsiteUpdate }) => {
      const { data, error } = await supabase
        .from('websites')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['websites'] });
      queryClient.invalidateQueries({ queryKey: ['user-websites'] });
    },
  });
};

export const useDeleteWebsite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('websites')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['websites'] });
      queryClient.invalidateQueries({ queryKey: ['user-websites'] });
    },
  });
};

export const useIncrementViews = () => {
  return useMutation({
    mutationFn: async (websiteId: string) => {
      const { error } = await supabase.rpc('increment_website_views', {
        website_uuid: websiteId
      });

      if (error) throw error;
    },
  });
};
