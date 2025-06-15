import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useIsAdmin } from './useAdmin';
import { Website, WebsiteFilters } from '@/types/website';

export const useWebsites = (filters?: WebsiteFilters) => {
  const isAdmin = useIsAdmin();
  
  return useQuery({
    queryKey: ['websites', filters, isAdmin],
    queryFn: async () => {
      console.log('Fetching websites with filters:', filters);
      let query = supabase
        .from('websites')
        .select(`
          *,
          profiles!websites_user_id_fkey(
            full_name,
            avatar_url
          )
        `);

      // Apply category filter
      if (filters?.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }

      // Apply status filter based on user role and context
      if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      } else if (filters?.includeAll) {
        // When includeAll is true, don't filter by status - show all websites
        console.log('Including all websites regardless of status');
      } else {
        // Default behavior: show only approved/featured for marketplace
        query = query.in('status', ['approved', 'featured']);
      }

      // Apply featured filter
      if (filters?.featured !== undefined) {
        query = query.eq('is_featured', filters.featured);
      }

      // Apply tags filter
      if (filters?.tags && filters.tags.length > 0) {
        query = query.overlaps('tags', filters.tags);
      }

      // Apply search filter
      if (filters?.search && filters.search.trim()) {
        const searchTerm = filters.search.trim();
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching websites:', error);
        throw error;
      }
      
      console.log('Successfully fetched websites:', data?.length || 0, 'websites');
      console.log('Website data:', data);
      return data as Website[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useUserWebsites = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-websites', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      console.log('Fetching user websites for user:', user.id);
      const { data, error } = await supabase
        .from('websites')
        .select(`
          *,
          profiles!websites_user_id_fkey(
            full_name,
            avatar_url
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user websites:', error);
        throw error;
      }
      
      console.log('Successfully fetched user websites:', data?.length || 0, 'websites');
      return data as Website[];
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useWebsiteById = (id: string) => {
  return useQuery({
    queryKey: ['website', id],
    queryFn: async () => {
      console.log('Fetching website by id:', id);
      const { data, error } = await supabase
        .from('websites')
        .select(`
          *,
          profiles!websites_user_id_fkey(
            full_name,
            avatar_url
          )
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching website:', error);
        throw error;
      }
      
      if (!data) {
        console.warn('Website not found:', id);
        return null;
      }

      console.log('Successfully fetched website:', data.title);
      return data as Website;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
