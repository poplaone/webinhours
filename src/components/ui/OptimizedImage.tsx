import React, { useState, useRef, useEffect, memo, useCallback } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  priority?: boolean; // If true, load immediately (above-the-fold)
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
  quality?: number;
}

// Preload critical images
const preloadImage = (src: string) => {
  if (typeof window === 'undefined') return;

  const img = new window.Image();
  img.src = src;
};

export const OptimizedImage = memo<OptimizedImageProps>(({
  src,
  alt,
  className = '',
  aspectRatio = '16/10',
  priority = false,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3C/svg%3E',
  onLoad,
  onError,
  sizes,
  quality = 80
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              observerRef.current?.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '200px 0px', // Start loading 200px before entering viewport
        threshold: 0.01
      }
    );

    if (imgRef.current.dataset.src) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  // Preload if priority
  useEffect(() => {
    if (priority) {
      preloadImage(src);
    }
  }, [src, priority]);

  // Generate optimized src with quality parameter
  const optimizedSrc = src.includes('?') ? `${src}&q=${quality}` : `${src}?q=${quality}`;

  return (
    <div
      className={`relative overflow-hidden bg-gray-100 ${className}`}
      style={{ aspectRatio }}
    >
      {/* Placeholder/Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/30" />
        </div>
      )}

      {/* Actual Image */}
      <img
        ref={imgRef}
        data-src={optimizedSrc}
        src={priority ? optimizedSrc : placeholder}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'low'}
      />

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
          <span className="text-sm">Image unavailable</span>
        </div>
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';
