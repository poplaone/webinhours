// Performance utilities for optimizing the application

// Debounce function for search inputs and other frequent events
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for scroll events and animations
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Optimized image loading with intersection observer
export const createImageObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver((entries) => {
    entries.forEach(callback);
  }, defaultOptions);
};

// Lazy load images with fallback
export const lazyLoadImage = (
  img: HTMLImageElement,
  src: string,
  fallbackSrc?: string
) => {
  const observer = createImageObserver((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target as HTMLImageElement;
      target.src = src;
      target.onload = () => {
        target.classList.add('loaded');
        observer.unobserve(target);
      };
      target.onerror = () => {
        if (fallbackSrc) {
          target.src = fallbackSrc;
        }
        observer.unobserve(target);
      };
    }
  });

  observer.observe(img);
  return () => observer.unobserve(img);
};

// Memoization helper for expensive calculations
export const memoize = <T extends (...args: any[]) => any>(
  fn: T,
  getKey?: (...args: Parameters<T>) => string
): T => {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = getKey ? getKey(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

// Batch DOM updates for better performance
export const batchDOMUpdates = (updates: (() => void)[]) => {
  if (typeof window !== 'undefined' && window.requestAnimationFrame) {
    requestAnimationFrame(() => {
      updates.forEach(update => update());
    });
  } else {
    updates.forEach(update => update());
  }
};

// Optimized array operations
export const optimizedFilter = <T>(
  array: T[],
  predicate: (item: T, index: number) => boolean
): T[] => {
  const result: T[] = [];
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i)) {
      result.push(array[i]);
    }
  }
  return result;
};

export const optimizedMap = <T, U>(
  array: T[],
  mapper: (item: T, index: number) => U
): U[] => {
  const result: U[] = new Array(array.length);
  for (let i = 0; i < array.length; i++) {
    result[i] = mapper(array[i], i);
  }
  return result;
};

// Cache management
export class SimpleCache<T> {
  private cache = new Map<string, { data: T; timestamp: number }>();
  private maxAge: number;

  constructor(maxAgeMs: number = 5 * 60 * 1000) { // 5 minutes default
    this.maxAge = maxAgeMs;
  }

  set(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > this.maxAge) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// Performance monitoring
export const measurePerformance = <T extends (...args: any[]) => any>(
  fn: T,
  name: string
): T => {
  return ((...args: Parameters<T>): ReturnType<T> => {
    const result = fn(...args);
    return result;
  }) as T;
};

// Preload critical resources
export const preloadResource = (href: string, as: string = 'fetch') => {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  }
};

// Optimize scroll performance
export const optimizeScroll = (element: HTMLElement) => {
  element.style.willChange = 'scroll-position';
  element.style.transform = 'translateZ(0)'; // Force hardware acceleration
};

// Clean up performance optimizations
export const cleanupPerformance = (element: HTMLElement) => {
  element.style.willChange = 'auto';
  element.style.transform = '';
}; 