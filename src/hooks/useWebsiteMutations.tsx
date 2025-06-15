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

      console.log('🔧 Creating website with data:', website);
      console.log('🔧 User creating website:', user.id, user.email);

      const { data, error } = await supabase
        .from('websites')
        .insert({ ...website, user_id: user.id })
        .select()
        .single();

      if (error) {
        console.error('🔧 Error creating website:', error);
        throw error;
      }
      
      console.log('🔧 Successfully created website:', data);
      console.log('🔧 Website status set to:', data.status);
      return data as Website;
    },
    onSuccess: (data) => {
      console.log('🔧 Website creation successful, invalidating queries...');
      queryClient.invalidateQueries({ queryKey: ['websites'] });
      queryClient.invalidateQueries({ queryKey: ['user-websites'] });
    },
    onError: (error) => {
      console.error('🔧 Website creation failed:', error);
    },
  });
};

export const useUpdateWebsite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: WebsiteUpdate }) => {
      console.log('Updating website:', id, updates);
      const { data, error } = await supabase
        .from('websites')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating website:', error);
        throw error;
      }
      console.log('Updated website:', data);
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
      console.log('Deleting website:', id);
      const { error } = await supabase
        .from('websites')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting website:', error);
        throw error;
      }
      console.log('Deleted website:', id);
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
      console.log('Incrementing views for website:', websiteId);
      const { error } = await supabase.rpc('increment_website_views', {
        website_uuid: websiteId
      });

      if (error) {
        console.error('Error incrementing views:', error);
        throw error;
      }
      console.log('Incremented views for website:', websiteId);
    },
  });
};
