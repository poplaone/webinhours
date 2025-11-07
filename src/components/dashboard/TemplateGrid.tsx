
import React, { useRef, useEffect, useState, memo, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import './masonry.css';
import ColorThief from 'color-thief-browser';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Website } from '@/types/website';
import { usePrefetchSiteDetails } from '@/hooks/queries/usePrefetchSiteDetails';

interface TemplateGridProps {
  templates: Website[];
  isLoading: boolean;
  onRefresh: () => void;
  onTagFilter?: (tag: string) => void;
}

// Memoized template card component
const TemplateCard = memo<{template: Website; onClick: (t: Website) => void; onHover?: (t: Website) => void; onTouchStart?: (t: Website) => void;}>(({ template, onClick, onHover, onTouchStart }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Glassmorphism effect styles - keeping the shimmer glass effect
  const glassEffect = 'bg-transparent border border-white/20 dark:border-white/10 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300';

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80';
    setImageLoaded(true);
  }, []);

  const handleClick = useCallback(() => {
    onClick(template);
  }, [onClick, template]);

  return (
    <Card
      key={template.id}
      className={`${glassEffect} overflow-hidden flex flex-col group relative h-full cursor-pointer rounded-2xl hover:scale-[1.02] transition-all duration-300`}
      onClick={handleClick}
      onMouseEnter={() => onHover?.(template)}
      onTouchStart={() => onTouchStart?.(template)}
      title={`View ${template.title}`}
    >
      <div className="aspect-[16/10] w-full overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-purple-500/5 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          ref={imgRef}
          crossOrigin="anonymous"
          src={template.thumbnail_url || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80'}
          alt={template.title}
          className={`w-full h-full object-cover transition-transform group-hover:scale-110 duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          <span className="bg-white/80 dark:bg-[#181825]/80 text-xs font-semibold px-2 py-0.5 rounded-full shadow border border-border/30 capitalize w-fit mb-1">
            {template.category}
          </span>
          {template.is_featured && (
            <Badge className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white text-xs xl:text-sm px-3 py-1 rounded-full font-semibold shadow-lg">
              <Star className="w-4 h-4 mr-1" />
              Featured
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-5 xl:p-6 flex flex-col flex-grow bg-transparent min-h-[110px] relative z-10">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-base xl:text-lg text-white dark:text-white/90 group-hover:text-purple-200 transition-colors line-clamp-2 pr-2">
            {template.title}
          </h3>
          <div className="flex items-center gap-1 text-white/90 font-bold text-sm xl:text-base bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors duration-200">
            <DollarSign className="h-3.5 w-3.5" />
            <span>{Number(template.price) === 0 ? 'Free' : Number(template.price)}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {template.tags && template.tags.slice(0, 3).map((tag: string) => (
            <Badge 
              key={tag} 
              className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-colors border border-white/10 backdrop-blur-sm"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

TemplateCard.displayName = 'TemplateCard';

// Memoized loading skeleton
const LoadingSkeleton = memo(() => (
  <Masonry
    breakpointCols={{ default: 4, 1280: 3, 1024: 2, 640: 1 }}
    className="masonry-grid"
    columnClassName="masonry-col"
  >
    {Array.from({ length: 6 }).map((_, i) => (
      <Card key={i} className="mb-5 animate-pulse rounded-2xl border-2 border-transparent bg-gradient-to-br from-[#f5f3ff] to-[#e0e7ff] break-inside-avoid">
        <div className="h-52 md:h-64 bg-gray-200 rounded-t-2xl"></div>
        <CardContent className="p-5">
          <div className="h-5 bg-gray-200 rounded mb-3"></div>
          <div className="h-4 bg-gray-200 rounded mb-5"></div>
          <div className="flex justify-between">
            <div className="h-6 bg-gray-200 rounded w-20"></div>
            <div className="h-6 bg-gray-200 rounded w-24"></div>
          </div>
        </CardContent>
      </Card>
    ))}
  </Masonry>
));

LoadingSkeleton.displayName = 'LoadingSkeleton';

// Memoized empty state
const EmptyState = memo<{onRefresh: () => void; onNavigate: () => void}>(({ onRefresh, onNavigate }) => (
  <div className="col-span-full text-center py-8 md:py-12 lg:py-16">
    <div className="max-w-md mx-auto">
      <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center">
        <Star className="w-8 h-8 lg:w-10 lg:h-10 text-[#8B5CF6]" />
      </div>
      <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-2">No templates found</p>
      <p className="text-muted-foreground text-sm md:text-base lg:text-lg mb-6">
        Try adjusting your search or filters to find what you're looking for
      </p>
      <div className="flex gap-3 justify-center">
        <Button 
          variant="outline"
          onClick={onRefresh}
          size="sm"
          className="lg:px-6 lg:py-3"
        >
          Refresh
        </Button>
        <Button 
          className="bg-[#8B5CF6] hover:bg-[#7C3AED] lg:px-6 lg:py-3"
          onClick={onNavigate}
          size="sm"
        >
          Upload Website
        </Button>
      </div>
    </div>
  </div>
));

EmptyState.displayName = 'EmptyState';

export const TemplateGrid = memo(({ templates, isLoading, onRefresh, onTagFilter }: TemplateGridProps) => {
  const navigate = useNavigate();
  const { prefetchSite } = usePrefetchSiteDetails();

  // Prefetch on hover (desktop) or touch (mobile) for ultra-fast navigation
  const handleCardHover = useCallback((template: Website) => {
    // Desktop: hover preloading
    const slug = template.slug || template.id;
    prefetchSite(slug).catch(() => {
      // Silently fail - don't show errors on hover
    });
  }, [prefetchSite]);

  // Mobile-specific: prefetch on touch start
  const handleCardTouchStart = useCallback((template: Website) => {
    // Mobile: start preloading immediately on touch
    const slug = template.slug || template.id;
    prefetchSite(slug).catch(() => {
      // Silently fail
    });
  }, [prefetchSite]);

  const viewTemplateDetail = useCallback(async (template: Website) => {
    const slug = template.slug || template.id;

    // Start prefetching in background before navigation
    prefetchSite(slug).catch(console.error);

    // Navigate immediately
    navigate(`/site/${slug}`);
  }, [navigate, prefetchSite]);

  const handleNavigateToAdmin = useCallback(() => {
    navigate('/admin-panel');
  }, [navigate]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (templates.length === 0) {
    return <EmptyState onRefresh={onRefresh} onNavigate={handleNavigateToAdmin} />;
  }

  return (
    <Masonry
      breakpointCols={{ default: 4, 1280: 3, 1024: 2, 640: 1 }}
      className="masonry-grid"
      columnClassName="masonry-col"
    >
      {templates.map((template) => (
        <div key={template.id} className="mb-5 break-inside-avoid">
          <TemplateCard
            template={template}
            onClick={viewTemplateDetail}
            onHover={handleCardHover}
            onTouchStart={handleCardTouchStart}
          />
        </div>
      ))}
    </Masonry>
  );
});

TemplateGrid.displayName = 'TemplateGrid';
