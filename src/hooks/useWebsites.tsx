
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

// Define types manually since they're not in the auto-generated types yet
export interface Website {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  category: string;
  tags?: string[];
  price: number;
  preview_url: string;
  demo_url?: string;
  download_url?: string;
  thumbnail_url?: string;
  images?: string[];
  technologies?: string[];
  features?: string[];
  status: 'pending' | 'approved' | 'rejected' | 'featured' | 'archived';
  is_featured: boolean;
  views_count: number;
  downloads_count: number;
  rating_average?: number;
  rating_count: number;
  created_at: string;
  updated_at: string;
  featured_at?: string;
  approved_at?: string;
  profiles?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export interface WebsiteInsert {
  title: string;
  description?: string;
  category: string;
  tags?: string[];
  price: number;
  preview_url: string;
  demo_url?: string;
  download_url?: string;
  thumbnail_url?: string;
  images?: string[];
  technologies?: string[];
  features?: string[];
  user_id?: string;
}

export interface WebsiteUpdate {
  title?: string;
  description?: string;
  category?: string;
  tags?: string[];
  price?: number;
  preview_url?: string;
  demo_url?: string;
  download_url?: string;
  thumbnail_url?: string;
  images?: string[];
  technologies?: string[];
  features?: string[];
  status?: 'pending' | 'approved' | 'rejected' | 'featured' | 'archived';
  is_featured?: boolean;
  featured_at?: string;
  approved_at?: string;
}

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

      const { data, error } = await query
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Website[];
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
      return data as Website[];
    },
    enabled: !!user,
  });
};

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

      if (error) throw error;
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

      if (error) throw error;
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
