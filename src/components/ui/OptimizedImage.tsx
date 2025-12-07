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
  width?: number;
  height?: number;
}

// LCP-optimized placeholder - minimal size, no layout shift
const PLACEHOLDER_SVG = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1" height="1"%3E%3C/svg%3E';

// Preload critical images
const preloadImage = (src: string) => {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
};

export const OptimizedImage = memo<OptimizedImageProps>(({
  src,
  alt,
  className = '',
  aspectRatio = '16/10',
  priority = false,
  placeholder = PLACEHOLDER_SVG,
  onLoad,
  onError,
  sizes,
  quality = 80,
  width,
  height,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

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
        rootMargin: '100px 0px', // Start loading 100px before entering viewport
        threshold: 0.01
      }
    );

    if (imgRef.current.dataset.src) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority]);

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
      className={`relative overflow-hidden bg-muted ${className}`}
      style={{ aspectRatio, width, height }}
    >
      {/* Placeholder/Skeleton - only show for lazy loaded images */}
      {!isLoaded && !hasError && !priority && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/80 to-muted animate-pulse" />
      )}

      {/* Actual Image */}
      <img
        ref={imgRef}
        data-src={priority ? undefined : optimizedSrc}
        src={priority ? optimizedSrc : placeholder}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        width={width}
        height={height}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded || priority ? 'opacity-100' : 'opacity-0'
        }`}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'low'}
      />

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
          <span className="text-sm">Image unavailable</span>
        </div>
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';
