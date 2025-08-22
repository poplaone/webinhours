// Performance optimization utilities for lightning-fast website loading

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
};

export const optimizeImages = () => {
  // Add intersection observer for lazy loading images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('blur-sm');
            observer.unobserve(img);
          }
        }
      });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

export const measureWebVitals = () => {
  // Simple performance monitoring without external dependencies
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Measure First Contentful Paint
    if ('getEntriesByType' in performance) {
      const paintEntries = performance.getEntriesByType('paint');
      paintEntries.forEach(entry => {
        console.log(`${entry.name}: ${entry.startTime}ms`);
      });
    }
    
    // Measure page load time
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log(`Page load time: ${loadTime}ms`);
    });
  }
};

export const enableServiceWorker = () => {
  // Register service worker for caching
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  }
};

export const optimizeRenderPerformance = () => {
  // Use requestIdleCallback for non-critical operations
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Defer non-critical operations
      measureWebVitals();
      optimizeImages();
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      measureWebVitals();
      optimizeImages();
    }, 1000);
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