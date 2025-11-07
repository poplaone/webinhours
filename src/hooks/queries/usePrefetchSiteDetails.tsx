import { useQueryClient } from '@tanstack/react-query';

// Hook to preload site details when navigating from marketplace
export const usePrefetchSiteDetails = () => {
  const queryClient = useQueryClient();

  // Prefetch site details in background
  const prefetchSite = async (slugOrId: string) => {
    // Check if already in cache
    const cachedData = queryClient.getQueryData(['website', slugOrId]);

    if (cachedData) {
      // Already cached, just navigate
      return Promise.resolve(cachedData);
    }

    // Prefetch in background
    await queryClient.prefetchQuery({
      queryKey: ['website', slugOrId],
      queryFn: async () => {
        // Import the query function dynamically
        const { fetchSingleWebsiteWithProfile } = await import('./websiteQueryUtils');
        const { supabase } = await import('@/integrations/supabase/client');

        // Check if identifier is UUID
        const isUUID = (str: string) => {
          const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
          return uuidRegex.test(str);
        };

        let query = supabase.from('websites').select('*');

        if (isUUID(slugOrId)) {
          query = query.eq('id', slugOrId);
        } else {
          query = query.eq('slug', slugOrId);
        }

        const { data, error } = await query.maybeSingle();

        if (error || !data) {
          throw new Error(error?.message || 'Site not found');
        }

        // Fetch and merge profile
        return await fetchSingleWebsiteWithProfile(data);
      },
      staleTime: 1000 * 60 * 15, // 15 minutes
      gcTime: 1000 * 60 * 60, // 1 hour
    });

    return queryClient.getQueryData(['website', slugOrId]);
  };

  return { prefetchSite };
};
