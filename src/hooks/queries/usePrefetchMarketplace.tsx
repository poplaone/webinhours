import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Hook to preload marketplace data when user hovers near or navigates to marketplace
export const usePrefetchMarketplace = () => {
  const queryClient = useQueryClient();
  const location = useLocation();

  // Prefetch websites data
  const prefetchWebsites = useCallback(async () => {
    const cached = queryClient.getQueryData(['websites', { includeAll: false }]);
    if (cached) return;

    await queryClient.prefetchQuery({
      queryKey: ['websites', { includeAll: false }],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('websites')
          .select('*')
          .in('status', ['approved', 'featured'])
          .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
      },
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 60,
    });
  }, [queryClient]);

  // Prefetch data when component mounts if not already cached
  useEffect(() => {
    const hasWebsitesCache = queryClient.getQueryData(['websites', { includeAll: false }]);

    if (!hasWebsitesCache) {
      prefetchWebsites();
    }
  }, [queryClient, prefetchWebsites]);

  // Prefetch on navigation intent
  const prefetchOnHover = useCallback(() => {
    prefetchWebsites();
  }, [prefetchWebsites]);

  // Trigger prefetch when user is near marketplace
  useEffect(() => {
    try {
      const recentRoutes = JSON.parse(sessionStorage.getItem('recentRoutes') || '[]');
      recentRoutes.push(location.pathname);
      sessionStorage.setItem('recentRoutes', JSON.stringify(recentRoutes.slice(-3)));

      // If user has visited marketplace before, prefetch data
      if (recentRoutes.includes('/marketplace')) {
        prefetchOnHover();
      }
    } catch {
      // Ignore sessionStorage errors
    }
  }, [location.pathname, prefetchOnHover]);

  return { prefetchOnHover };
};
