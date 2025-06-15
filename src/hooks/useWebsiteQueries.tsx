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
      console.log('🔍 Starting website fetch with filters:', filters);
      console.log('🔍 User is admin:', isAdmin);
      
      try {
        // Start with a simple query first
        let query = supabase
          .from('websites')
          .select('*');

        // Apply category filter
        if (filters?.category && filters.category !== 'all') {
          console.log('🔍 Applying category filter:', filters.category);
          query = query.eq('category', filters.category);
        }

        // Apply status filter based on user role and context
        if (filters?.status && filters.status !== 'all') {
          console.log('🔍 Applying status filter:', filters.status);
          query = query.eq('status', filters.status);
        } else if (filters?.includeAll) {
          console.log('🔍 Including all websites regardless of status (admin mode)');
          // When includeAll is true, don't filter by status - show all websites
        } else {
          console.log('🔍 Applying default status filter: approved, featured');
          // Default behavior: show only approved/featured for marketplace
          query = query.in('status', ['approved', 'featured']);
        }

        // Apply featured filter
        if (filters?.featured !== undefined) {
          console.log('🔍 Applying featured filter:', filters.featured);
          query = query.eq('is_featured', filters.featured);
        }

        // Apply tags filter
        if (filters?.tags && filters.tags.length > 0) {
          console.log('🔍 Applying tags filter:', filters.tags);
          query = query.overlaps('tags', filters.tags);
        }

        // Apply search filter
        if (filters?.search && filters.search.trim()) {
          const searchTerm = filters.search.trim();
          console.log('🔍 Applying search filter:', searchTerm);
          query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`);
        }

        console.log('🔍 Executing websites query...');
        const { data: websitesData, error: websitesError } = await query
          .order('created_at', { ascending: false }) // Order by creation date to show newest first
          .order('status', { ascending: true }); // Show pending first, then approved, then featured

        if (websitesError) {
          console.error('❌ Error fetching websites:', websitesError);
          throw new Error(`Database error: ${websitesError.message}`);
        }

        console.log('✅ Websites query successful:', websitesData?.length || 0, 'websites');
        console.log('📋 Website statuses found:', websitesData?.map(w => ({ id: w.id, title: w.title, status: w.status, created_at: w.created_at })));

        // Log specifically for pending websites
        const pendingWebsites = websitesData?.filter(w => w.status === 'pending') || [];
        console.log('🟡 Pending websites found:', pendingWebsites.length, pendingWebsites.map(w => ({ title: w.title, id: w.id, user_id: w.user_id })));

        // Now fetch profiles separately and merge
        if (websitesData && websitesData.length > 0) {
          const userIds = [...new Set(websitesData.map(w => w.user_id).filter(Boolean))];
          console.log('🔍 Fetching profiles for user IDs:', userIds);

          if (userIds.length > 0) {
            const { data: profilesData, error: profilesError } = await supabase
              .from('profiles')
              .select('id, full_name, avatar_url')
              .in('id', userIds);

            if (profilesError) {
              console.warn('⚠️ Error fetching profiles (non-critical):', profilesError);
            } else {
              console.log('✅ Profiles fetched successfully:', profilesData?.length || 0);
              
              // Create a map for quick profile lookup
              const profilesMap = new Map(profilesData?.map(p => [p.id, p]) || []);
              
              // Merge profiles with websites
              const mergedData = websitesData.map(website => ({
                ...website,
                profiles: profilesMap.get(website.user_id) || null
              }));

              console.log('✅ Data merged successfully');
              return mergedData as Website[];
            }
          }
        }
        
        console.log('✅ Returning websites without profiles');
        return (websitesData || []) as Website[];
      } catch (error) {
        console.error('💥 Query failed with error:', error);
        console.error('💥 Error details:', {
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        });
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 1, // Only retry once to avoid infinite loops
    retryDelay: 1000, // Wait 1 second before retry
  });
};

export const useUserWebsites = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-websites', user?.id],
    queryFn: async () => {
      if (!user) {
        console.log('🔍 No user authenticated for user websites');
        return [];
      }
      
      console.log('🔍 Fetching user websites for user:', user.id);
      
      try {
        const { data, error } = await supabase
          .from('websites')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('❌ Error fetching user websites:', error);
          throw new Error(`Database error: ${error.message}`);
        }
        
        console.log('✅ Successfully fetched user websites:', data?.length || 0, 'websites');
        return (data || []) as Website[];
      } catch (error) {
        console.error('💥 User websites query failed:', error);
        throw error;
      }
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};

export const useWebsiteById = (id: string) => {
  return useQuery({
    queryKey: ['website', id],
    queryFn: async () => {
      if (!id) {
        console.warn('🔍 No website ID provided');
        return null;
      }

      console.log('🔍 Fetching website by id:', id);
      
      try {
        const { data, error } = await supabase
          .from('websites')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (error) {
          console.error('❌ Error fetching website:', error);
          throw new Error(`Database error: ${error.message}`);
        }
        
        if (!data) {
          console.warn('⚠️ Website not found:', id);
          return null;
        }

        console.log('✅ Successfully fetched website:', data.title);
        
        // Fetch profile separately if needed
        if (data.user_id) {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('id, full_name, avatar_url')
            .eq('id', data.user_id)
            .maybeSingle();

          if (!profileError && profileData) {
            return { ...data, profiles: profileData } as Website;
          }
        }

        return data as Website;
      } catch (error) {
        console.error('💥 Website by ID query failed:', error);
        throw error;
      }
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });
};
