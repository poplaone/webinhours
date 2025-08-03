
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
        // For marketplace, always show only approved/featured websites regardless of admin status
        // Only use admin privileges when explicitly requested via includeAll filter
        const marketplaceFilters = filters?.includeAll ? filters : { ...filters, includeAll: false };
        const query = buildWebsitesQuery(marketplaceFilters);

        console.log('🔍 Executing websites query...');
        const { data: websitesData, error: websitesError } = await query
          .order('created_at', { ascending: false }) // Order by creation date to show newest first
          .order('status', { ascending: true }); // Show pending first, then approved, then featured

        if (websitesError) {
          console.error('❌ Error fetching websites:', websitesError);
          throw new Error(`Database error: ${websitesError.message}`);
        }

        console.log('✅ Websites query successful:', websitesData?.length || 0, 'websites');

        // Only fetch profiles if we have websites and not in a hurry
        let mergedData = websitesData || [];
        if (mergedData.length > 0 && mergedData.length < 50) { // Only fetch profiles for reasonable amounts of data
          mergedData = await fetchProfilesForWebsites(mergedData);
        }
        
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
    staleTime: 1000 * 60 * 10, // Increased to 10 minutes
    gcTime: 1000 * 60 * 30, // Increased to 30 minutes
    retry: 1, // Only retry once to avoid infinite loops
    retryDelay: 1000, // Wait 1 second before retry
    refetchOnWindowFocus: false, // Prevent refetch on window focus
    refetchOnMount: false, // Prevent refetch on mount if data exists
  });
};
