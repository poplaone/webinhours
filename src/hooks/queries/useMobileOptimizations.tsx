import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Hook to detect and optimize for mobile performance
export const useMobilePerformanceOptimizations = () => {
  const isMobile = useIsMobile();
  const [connection, setConnection] = useState({
    effectiveType: '4g',
    saveData: false,
    downlink: 10
  });

  // Get connection info (if available)
  useEffect(() => {
    if ('connection' in navigator) {
      const updateConnection = () => {
        const conn = (navigator as any).connection;
        setConnection({
          effectiveType: conn?.effectiveType || '4g',
          saveData: conn?.saveData || false,
          downlink: conn?.downlink || 10
        });
      };

      updateConnection();
      (navigator as any).connection?.addEventListener('change', updateConnection);

      return () => {
        (navigator as any).connection?.removeEventListener('change', updateConnection);
      };
    }
  }, []);

  // Determine if we should use aggressive optimizations
  const shouldOptimize = isMobile || connection.saveData || connection.effectiveType.includes('2g') || connection.effectiveType === '3g';

  // Get optimized cache settings based on connection
  const getOptimizedCacheSettings = () => {
    if (shouldOptimize) {
      // Mobile/slow connection: shorter cache, more aggressive cleanup
      return {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 30 * 60, // 30 minutes
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      };
    }

    // Desktop/fast connection: longer cache
    return {
      staleTime: 1000 * 60 * 15, // 15 minutes
      gcTime: 1000 * 60 * 60 * 2, // 2 hours
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    };
  };

  // Get optimized image settings
  const getOptimizedImageSettings = () => {
    if (shouldOptimize) {
      // Mobile/slow: smaller images, lower quality
      return {
        quality: 60,
        sizes: '50vw',
        loading: 'lazy' as const,
      };
    }

    // Desktop/fast: higher quality
    return {
      quality: 85,
      sizes: '33vw',
      loading: 'eager' as const,
    };
  };

  // Get optimized prefetch settings
  const getOptimizedPrefetchSettings = () => {
    if (shouldOptimize) {
      // Mobile: less aggressive prefetching (saves data)
      return {
        preloadOnHover: false,
        preloadOnTouchStart: true, // Only on touch
        preloadCount: 1, // Preload only 1 item
      };
    }

    // Desktop: aggressive prefetching
    return {
      preloadOnHover: true,
      preloadOnTouchStart: true,
      preloadCount: 3, // Preload 3 items
    };
  };

  return {
    isMobile,
    connection,
    shouldOptimize,
    cacheSettings: getOptimizedCacheSettings(),
    imageSettings: getOptimizedImageSettings(),
    prefetchSettings: getOptimizedPrefetchSettings(),
  };
};

// Hook to prefetch items based on connection quality
export const useSmartPrefetch = () => {
  const { prefetchSettings } = useMobilePerformanceOptimizations();

  const smartPrefetch = async (urls: string[], prefetchFn: (url: string) => Promise<any>) => {
    if (!prefetchSettings.preloadOnHover && !prefetchSettings.preloadOnTouchStart) {
      return; // Skip prefetching on slow connections
    }

    // Limit prefetching to configured count
    const urlsToPrefetch = urls.slice(0, prefetchSettings.preloadCount);

    // Prefetch in sequence to avoid overwhelming the network
    for (const url of urlsToPrefetch) {
      try {
        await prefetchFn(url);
      } catch (error) {
        // Silently fail - don't log errors for prefetch
      }
    }
  };

  return { smartPrefetch, settings: prefetchSettings };
};
