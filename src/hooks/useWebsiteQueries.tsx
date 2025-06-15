
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useIsAdmin } from './useAdmin';
import { Website, WebsiteFilters } from '@/types/website';

export const useWebsites = (filters?: WebsiteFilters) => {
  const isAdmin = useIsAdmin();
  
  return useQuery({
    queryKey: ['websites', filters],
    queryFn: async () => {
      console.log('Fetching websites with filters:', filters);
      let query = (supabase as any)
        .from('websites')
        .select(`
          *,
          profiles!websites_user_id_fkey(full_name, avatar_url)
        `);

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      // Admin can see all websites, regular users only see approved/featured
      if (filters?.status) {
        query = query.eq('status', filters.status);
      } else if (!filters?.includeAll || !isAdmin) {
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

      if (error) {
        console.error('Error fetching websites:', error);
        throw error;
      }
      
      console.log('Fetched websites:', data);
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
      
      console.log('Fetching user websites for user:', user.id);
      const { data, error } = await (supabase as any)
        .from('websites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user websites:', error);
        throw error;
      }
      
      console.log('Fetched user websites:', data);
      return data as Website[];
    },
    enabled: !!user,
  });
};
