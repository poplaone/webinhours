import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Website, WebsiteInsert, WebsiteUpdate } from '@/types/website';

export const useCreateWebsite = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (website: WebsiteInsert) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('websites')
        .insert({ ...website, user_id: user.id })
        .select()
        .single();

      if (error) {
        throw error;
      }
      
      return data as Website;
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

      if (error) {
        throw error;
      }
      return data as Website;
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

      if (error) {
        throw error;
      }
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

      if (error) {
        throw error;
      }
    },
  });
};
