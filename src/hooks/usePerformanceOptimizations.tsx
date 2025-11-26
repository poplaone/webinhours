import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Track page load performance
export const useTrackPageLoad = (pageName: string) => {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;

      // Log to analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'page_load_time', {
          page_name: pageName,
          load_time: Math.round(loadTime)
        });
      }
    };
  }, [pageName]);
};

// Preload critical resources
export const usePreloadResources = () => {
  useEffect(() => {
    // Preload marketplace images
    const imageUrls = [
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80',
      // Add more critical images
    ];

    imageUrls.forEach((url) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    });

    return () => {
      // Cleanup preloaded links
      imageUrls.forEach((url) => {
        const links = document.querySelectorAll(`link[rel="preload"][href="${url}"]`);
        links.forEach((link) => link.remove());
      });
    };
  }, []);
};

// Optimize re-renders
export const useOptimizeRender = (componentName: string) => {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
    };
  }, [componentName]);
};

// Connection-aware loading
export const useConnectionAwareLoading = () => {
  const [connection, setConnection] = useState({
    effectiveType: '4g',
    saveData: false
  });

  useEffect(() => {
    if ('connection' in navigator) {
      const updateConnection = () => {
        setConnection({
          effectiveType: (navigator as any).connection?.effectiveType || '4g',
          saveData: (navigator as any).connection?.saveData || false
        });
      };

      updateConnection();
      (navigator as any).connection?.addEventListener('change', updateConnection);

      return () => {
        (navigator as any).connection?.removeEventListener('change', updateConnection);
      };
    }
  }, []);

  return connection;
};
