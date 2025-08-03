import { useEffect, useRef, useCallback } from 'react';

interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

export const usePerformanceMonitor = (pageName: string) => {
  const metricsRef = useRef<PerformanceMetrics>({
    pageLoadTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
    firstInputDelay: 0,
  });

  const measurePageLoad = useCallback(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        metricsRef.current.pageLoadTime = navigation.loadEventEnd - navigation.loadEventStart;
      }
    }
  }, []);

  const measurePaintMetrics = useCallback(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcp = entries[entries.length - 1];
        metricsRef.current.firstContentfulPaint = fcp.startTime;
        console.log(`🚀 FCP for ${pageName}: ${fcp.startTime.toFixed(2)}ms`);
      });
      fcpObserver.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcp = entries[entries.length - 1];
        metricsRef.current.largestContentfulPaint = lcp.startTime;
        console.log(`🎯 LCP for ${pageName}: ${lcp.startTime.toFixed(2)}ms`);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        metricsRef.current.cumulativeLayoutShift = clsValue;
        console.log(`📐 CLS for ${pageName}: ${clsValue.toFixed(4)}`);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fid = entries[entries.length - 1];
        metricsRef.current.firstInputDelay = (fid as any).processingStart - fid.startTime;
        console.log(`⚡ FID for ${pageName}: ${metricsRef.current.firstInputDelay.toFixed(2)}ms`);
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      return () => {
        fcpObserver.disconnect();
        lcpObserver.disconnect();
        clsObserver.disconnect();
        fidObserver.disconnect();
      };
    }
  }, [pageName]);

  const logPerformanceMetrics = useCallback(() => {
    const metrics = metricsRef.current;
    console.group(`📊 Performance Metrics - ${pageName}`);
    console.log(`Page Load Time: ${metrics.pageLoadTime.toFixed(2)}ms`);
    console.log(`First Contentful Paint: ${metrics.firstContentfulPaint.toFixed(2)}ms`);
    console.log(`Largest Contentful Paint: ${metrics.largestContentfulPaint.toFixed(2)}ms`);
    console.log(`Cumulative Layout Shift: ${metrics.cumulativeLayoutShift.toFixed(4)}`);
    console.log(`First Input Delay: ${metrics.firstInputDelay.toFixed(2)}ms`);
    console.groupEnd();
  }, [pageName]);

  useEffect(() => {
    const startTime = performance.now();
    
    // Measure page load time
    if (document.readyState === 'complete') {
      measurePageLoad();
    } else {
      window.addEventListener('load', measurePageLoad);
    }

    // Start measuring paint metrics
    const cleanup = measurePaintMetrics();

    // Log metrics after a delay to ensure all metrics are captured
    const timeoutId = setTimeout(logPerformanceMetrics, 2000);

    return () => {
      window.removeEventListener('load', measurePageLoad);
      cleanup?.();
      clearTimeout(timeoutId);
      
      // Log final metrics on unmount
      const endTime = performance.now();
      console.log(`⏱️ Total time on ${pageName}: ${(endTime - startTime).toFixed(2)}ms`);
    };
  }, [measurePageLoad, measurePaintMetrics, logPerformanceMetrics]);

  return metricsRef.current;
};

// Hook for monitoring component render performance
export const useRenderPerformance = (componentName: string) => {
  const renderCountRef = useRef(0);
  const lastRenderTimeRef = useRef(performance.now());

  useEffect(() => {
    renderCountRef.current += 1;
    const currentTime = performance.now();
    const timeSinceLastRender = currentTime - lastRenderTimeRef.current;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 ${componentName} rendered (${renderCountRef.current}) in ${timeSinceLastRender.toFixed(2)}ms`);
    }
    
    lastRenderTimeRef.current = currentTime;
  });

  return {
    renderCount: renderCountRef.current,
    timeSinceLastRender: performance.now() - lastRenderTimeRef.current,
  };
};

// Hook for monitoring API call performance
export const useAPIPerformance = () => {
  const apiCallTimesRef = useRef<Map<string, number[]>>(new Map());

  const trackAPICall = useCallback((endpoint: string, duration: number) => {
    if (!apiCallTimesRef.current.has(endpoint)) {
      apiCallTimesRef.current.set(endpoint, []);
    }
    apiCallTimesRef.current.get(endpoint)!.push(duration);

    if (process.env.NODE_ENV === 'development') {
      console.log(`🌐 API Call to ${endpoint}: ${duration.toFixed(2)}ms`);
    }
  }, []);

  const getAverageAPITime = useCallback((endpoint: string) => {
    const times = apiCallTimesRef.current.get(endpoint);
    if (!times || times.length === 0) return 0;
    return times.reduce((sum, time) => sum + time, 0) / times.length;
  }, []);

  return {
    trackAPICall,
    getAverageAPITime,
    apiCallTimes: apiCallTimesRef.current,
  };
}; 