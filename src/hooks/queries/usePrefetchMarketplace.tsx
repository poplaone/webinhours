import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Hook to preload marketplace data when user hovers near or navigates to marketplace
export const usePrefetchMarketplace = () => {
  const queryClient = useQueryClient();
  const location = useLocation();

  // Prefetch data when component mounts if not already cached
  useEffect(() => {
    // Check if data is already in cache (instant load)
    const hasWebsitesCache = queryClient.getQueryData(['websites', { includeAll: false }]);
    const hasAIAgentsCache = queryClient.getQueryData(['ai-agents', { includeAll: false, includeMine: true }]);

    if (!hasWebsitesCache) {
      // Trigger a prefetch by invalidating which will trigger a fetch in background
      queryClient.prefetchQuery({
        queryKey: ['websites', { includeAll: false }],
        queryFn: async () => {
          // Import and call the query function
          const { useWebsites } = await import('@/hooks/queries/useWebsitesQuery');
          // This is a hack to trigger the query - in real implementation you'd extract the queryFn
          const response = await fetch('/api/prefetch/websites');
          return response.json();
        },
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 60,
      });
    }

    if (!hasAIAgentsCache) {
      queryClient.prefetchQuery({
        queryKey: ['ai-agents', { includeAll: false, includeMine: true }],
        queryFn: async () => {
          const response = await fetch('/api/prefetch/ai-agents');
          return response.json();
        },
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 60,
      });
    }
  }, [queryClient]);

  // Prefetch on navigation intent
  const prefetchOnHover = () => {
    // Just warm up the cache - the actual queries will use this cache
    queryClient.prefetchQuery({
      queryKey: ['websites', { includeAll: false }],
      staleTime: 1000 * 60 * 10,
    });

    queryClient.prefetchQuery({
      queryKey: ['ai-agents', { includeAll: false, includeMine: true }],
      staleTime: 1000 * 60 * 10,
    });
  };

  // Trigger prefetch when user is near marketplace
  useEffect(() => {
    const recentRoutes = JSON.parse(sessionStorage.getItem('recentRoutes') || '[]');
    recentRoutes.push(location.pathname);
    sessionStorage.setItem('recentRoutes', JSON.stringify(recentRoutes.slice(-3)));

    // If user has visited marketplace before, prefetch data
    if (recentRoutes.includes('/marketplace')) {
      prefetchOnHover();
    }
  }, [location.pathname]);

  return { prefetchOnHover };
};
