// Performance optimization utilities for lightning-fast website loading

// Critical above-fold images for LCP optimization
const CRITICAL_IMAGES = [
  '/assets/card-1.webp',
  '/assets/card-4.webp',
  '/assets/card-3.webp',
  '/assets/card-5.webp',
];

// Below-fold images to lazy load
const LAZY_IMAGES_SELECTOR = 'img[data-lazy], .lazy-image';

export const preloadCriticalResources = () => {
  // Preload critical CSS and fonts
  const criticalResources = [
    { href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap', as: 'style' },
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.as === 'style') {
      link.onload = () => {
        link.rel = 'stylesheet';
      };
    }
    document.head.appendChild(link);
  });

  // Preload critical hero images for LCP
  preloadCriticalImages();
};

// Preload critical above-fold images
export const preloadCriticalImages = () => {
  CRITICAL_IMAGES.forEach((src, index) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    // First two images get highest priority
    if (index < 2) {
      link.setAttribute('fetchpriority', 'high');
    }
    document.head.appendChild(link);
  });
};

// Enhanced lazy loading with IntersectionObserver
export const optimizeImages = () => {
  if (!('IntersectionObserver' in window)) return;

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;

          // Handle data-src lazy loading
          if (img.dataset.src) {
            img.src = img.dataset.src;
            delete img.dataset.src;
          }

          // Handle srcset lazy loading
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            delete img.dataset.srcset;
          }

          img.classList.remove('blur-sm', 'lazy-image');
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: '50px 0px', // Start loading 50px before viewport
      threshold: 0.01,
    }
  );

  // Observe all lazy images
  document.querySelectorAll(LAZY_IMAGES_SELECTOR).forEach(img => {
    imageObserver.observe(img);
  });

  // Also observe images with data-src
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
};

// Lazy load below-fold sections
export const lazyLoadSections = () => {
  if (!('IntersectionObserver' in window)) return;

  const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target as HTMLElement;
          section.classList.add('section-visible');
          section.style.contentVisibility = 'visible';
          observer.unobserve(section);
        }
      });
    },
    {
      rootMargin: '100px 0px',
      threshold: 0.1,
    }
  );

  // Observe sections below the fold
  document.querySelectorAll('[data-lazy-section]').forEach(section => {
    sectionObserver.observe(section);
  });
};

export const measureWebVitals = () => {
  if (typeof window === 'undefined' || !('performance' in window)) return;

  // Measure LCP (Largest Contentful Paint)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.debug('[Core Web Vitals] LCP:', lastEntry.startTime.toFixed(2), 'ms');
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // Measure FID (First Input Delay)
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          const fidEntry = entry as PerformanceEventTiming;
          console.debug('[Core Web Vitals] FID:', fidEntry.processingStart - fidEntry.startTime, 'ms');
        });
      });
      fidObserver.observe({ type: 'first-input', buffered: true });

      // Measure CLS (Cumulative Layout Shift)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          const layoutShift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
          if (!layoutShift.hadRecentInput) {
            clsValue += layoutShift.value;
          }
        });
        console.debug('[Core Web Vitals] CLS:', clsValue.toFixed(4));
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      // Some observers may not be supported
    }
  }
};



export const optimizeRenderPerformance = () => {
  // Use requestIdleCallback for non-critical operations
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      measureWebVitals();
      optimizeImages();
      lazyLoadSections();
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      measureWebVitals();
      optimizeImages();
      lazyLoadSections();
    }, 100);
  }
};

// Debounce utility for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Preload next page resources on hover
export const prefetchOnHover = (selector: string) => {
  document.querySelectorAll(selector).forEach(link => {
    link.addEventListener('mouseenter', () => {
      const href = (link as HTMLAnchorElement).href;
      if (href && !document.querySelector(`link[href="${href}"]`)) {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = href;
        document.head.appendChild(prefetchLink);
      }
    }, { once: true });
  });
};