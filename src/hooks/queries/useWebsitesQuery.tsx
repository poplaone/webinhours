
import { useQuery } from '@tanstack/react-query';
import { useIsAdmin } from '../useAdmin';
import { Website, WebsiteFilters } from '@/types/website';
import { buildWebsitesQuery, fetchProfilesForWebsites } from './websiteQueryUtils';

export const useWebsites = (filters?: WebsiteFilters) => {
  const isAdmin = useIsAdmin();
  
  return useQuery({
    queryKey: ['websites', filters, isAdmin],
    queryFn: async () => {
      console.log('🔍 Starting website fetch with filters:', filters);
      console.log('🔍 User is admin:', isAdmin);
      
      try {
        const query = buildWebsitesQuery(filters);

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

        // Fetch and merge profiles
        const mergedData = await fetchProfilesForWebsites(websitesData || []);
        
        console.log('✅ Data merged successfully');
        return mergedData as Website[];
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
