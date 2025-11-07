
import { useQuery } from '@tanstack/react-query';
import { useIsAdmin } from '../useAdmin';
import { Website, WebsiteFilters } from '@/types/website';
import { buildWebsitesQuery, fetchProfilesForWebsites } from './websiteQueryUtils';

export const useWebsites = (filters?: WebsiteFilters) => {
  const isAdmin = useIsAdmin();
  
  return useQuery({
    queryKey: ['websites', filters, isAdmin],
    queryFn: async () => {
      try {
        // For marketplace, always show only approved/featured websites regardless of admin status
        // Only use admin privileges when explicitly requested via includeAll filter
        const marketplaceFilters = filters?.includeAll ? filters : { ...filters, includeAll: false };
        const query = buildWebsitesQuery(marketplaceFilters);

        const { data: websitesData, error: websitesError } = await query
          .order('created_at', { ascending: false }) // Order by creation date to show newest first
          .order('status', { ascending: true }); // Show pending first, then approved, then featured

        if (websitesError) {
          throw new Error(`Database error: ${websitesError.message}`);
        }

        // Only fetch profiles if we have websites and not in a hurry
        let mergedData = websitesData || [];
        if (mergedData.length > 0 && mergedData.length < 50) { // Only fetch profiles for reasonable amounts of data
          mergedData = await fetchProfilesForWebsites(mergedData);
        }

        return mergedData as Website[];
      } catch (error) {
        throw error;
      }
    },
    // 🚀 AGGRESSIVE CACHING FOR INSTANT MARKETPLACE LOADS
    staleTime: 1000 * 60 * 10, // 10 minutes - data stays fresh for 10 min
    gcTime: 1000 * 60 * 60, // 1 hour - keep in cache for an hour
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    networkMode: 'online'
  });
};
