// Utility for lazy loading components only when needed
import { lazy, ComponentType } from 'react';

/**
 * Lazy load a component with optional preload capability
 * @param importFn - The dynamic import function
 * @returns Object with lazy component and preload function
 */
export function lazyWithPreload<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
) {
  let component: Promise<{ default: T }> | null = null;

  const load = () => {
    if (!component) {
      component = importFn();
    }
    return component;
  };

  const LazyComponent = lazy(load);

  return {
    Component: LazyComponent,
    preload: load,
  };
}

/**
 * Preload a component when hovering over a link
 * @param preloadFn - The preload function from lazyWithPreload
 */
export function preloadOnHover(preloadFn: () => void) {
  return {
    onMouseEnter: preloadFn,
    onFocus: preloadFn,
  };
}

/**
 * Lazy load a component only when it's visible in the viewport
 * Uses Intersection Observer for optimal performance
 */
export function lazyLoadOnVisible<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: IntersectionObserverInit = {}
) {
  return lazy(() => {
    return new Promise<{ default: T }>((resolve) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              importFn().then(resolve);
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: '50px',
          ...options,
        }
      );

      // Create a temporary element to observe
      const element = document.createElement('div');
      observer.observe(element);
    });
  });
}
