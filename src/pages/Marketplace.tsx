import React, { useState, useRef, useMemo, useCallback, useEffect, Suspense, lazy } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import GEOStructuredData from '@/components/seo/GEOStructuredData';
import { GridPattern } from '@/components/ui/GridPattern';
import { useWebsites } from '@/hooks/useWebsites';
import { Tables } from '@/integrations/supabase/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { useSearchParams } from 'react-router-dom';

// Lazy load heavy components
const MarketplaceFilters = lazy(() => import('@/components/marketplace/MarketplaceFilters').then(m => ({ default: m.MarketplaceFilters })));
const TemplateGrid = lazy(() => import('@/components/dashboard/TemplateGrid').then(m => ({ default: m.TemplateGrid })));
const MarketplaceCTA = lazy(() => import('@/components/marketplace/MarketplaceCTA').then(m => ({ default: m.MarketplaceCTA })));

interface Category {
  id: string;
  name: string;
  count: number;
}

type Website = Tables<'websites'>;

const Marketplace: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('popular');
  const [tagFilter, setTagFilter] = useState<string | null>(searchParams.get('tag') || null);

  // Sync URL params when they change externally
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    const urlCategory = searchParams.get('category') || 'all';
    const urlTag = searchParams.get('tag') || null;
    
    if (urlSearch !== searchTerm) setSearchTerm(urlSearch);
    if (urlCategory !== selectedCategory) setSelectedCategory(urlCategory);
    if (urlTag !== tagFilter) setTagFilter(urlTag);
  }, [searchParams]);

  // Check if any filters are active
  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || tagFilter;

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory('all');
    setTagFilter(null);
    setSearchParams({});
  }, [setSearchParams]);

  const mainContentRef = useRef<HTMLDivElement>(null);
  const filtersWrapRef = useRef<HTMLDivElement>(null);
  const didInitialScrollReset = useRef(false);
  const isMobile = useIsMobile();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Always start at top when entering Marketplace
  useEffect(() => {
    const prevRestoration = (typeof window !== 'undefined' && 'scrollRestoration' in window.history)
      ? window.history.scrollRestoration
      : undefined;

    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const reset = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      if (!isMobile && mainContentRef.current) {
        mainContentRef.current.scrollTop = 0;
        mainContentRef.current.scrollLeft = 0;
      }
    };

    reset();
    const raf = requestAnimationFrame(reset);
    const t0 = setTimeout(reset, 0);
    const t1 = setTimeout(reset, 100);

    didInitialScrollReset.current = true;

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t0);
      clearTimeout(t1);
      if (prevRestoration !== undefined && 'scrollRestoration' in window.history) {
        window.history.scrollRestoration = prevRestoration as History['scrollRestoration'];
      }
    };
  }, [isMobile]);

  // Calculate sticky offset for filters
  useEffect(() => {
    if (isMobile || !filtersWrapRef.current) return;
    const root = document.documentElement;
    const STICKY_TOP_PX = 64;

    const updateOffset = () => {
      if (!filtersWrapRef.current) return;

      requestAnimationFrame(() => {
        if (!filtersWrapRef.current) return;

        const rect = filtersWrapRef.current.getBoundingClientRect();
        const height = filtersWrapRef.current.offsetHeight || rect.height || 0;
        const computedOffset = Math.max(0, STICKY_TOP_PX + height);

        requestAnimationFrame(() => {
          root.style.setProperty('--filters-sticky-offset', `${computedOffset}px`);
        });
      });
    };

    updateOffset();
    const ro = new ResizeObserver(updateOffset);
    ro.observe(filtersWrapRef.current);
    window.addEventListener('resize', updateOffset);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateOffset);
    };
  }, [filtersWrapRef, isMobile]);

  // Fetch websites data
  const { data: allMarketplaceWebsites = [], isLoading, refetch: refetchWebsites, error: websitesError } = useWebsites({ includeAll: false });

  // After data loads first time, re-assert scroll to top once
  useEffect(() => {
    if (!isLoading && didInitialScrollReset.current) {
      const t = setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        if (!isMobile && mainContentRef.current) {
          mainContentRef.current.scrollTop = 0;
          mainContentRef.current.scrollLeft = 0;
        }
      }, 0);
      return () => clearTimeout(t);
    }
  }, [isLoading, isMobile]);

  const handleRefresh = useCallback(() => {
    refetchWebsites();
  }, [refetchWebsites]);

  const handleTagFilter = useCallback((tag: string | null) => {
    setTagFilter(tag);
  }, []);

  // Memoized data processing
  const { filteredItems, sortedItems, categories } = useMemo(() => {
    const allItems = allMarketplaceWebsites as Website[];

    // Helpers for robust search
    const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]+/g, ' ').replace(/\s+/g, ' ').trim();
    const splitTokens = (s: string) => normalize(s).split(' ').filter(Boolean);
    const synonymMap: Record<string, string[]> = {
      ecommerce: ['ecommerce', 'e-commerce', 'ecom', 'e-comm', 'ecomm', 'ecommerse', 'shop', 'store', 'shopping', 'cart', 'retail'],
      portfolio: ['portfolio', 'showcase', 'work', 'case', 'creative'],
      business: ['business', 'company', 'corporate', 'agency'],
      blog: ['blog', 'article', 'news', 'content'],
      landing: ['landing', 'launch', 'product', 'saas'],
    };
    const expandTokens = (tokens: string[]) => {
      const out = new Set<string>();
      tokens.forEach(t => {
        out.add(t);
        Object.values(synonymMap).forEach(list => {
          if (list.includes(t)) list.forEach(x => out.add(x));
        });
      });
      return Array.from(out);
    };

    const queryTokens = searchTerm ? expandTokens(splitTokens(searchTerm)) : [];

    const filteredItems = allItems.filter(item => {
      if (!item) return false;
      const cat = normalize(item.category || '');
      const title = normalize(item.title || '');
      const desc = normalize((item as any).description || '');
      const tags = Array.isArray((item as any).tags) ? ((item as any).tags as string[]).map(t => normalize(t)).join(' ') : '';
      const haystack = [title, desc, tags, cat].join(' ');

      const matchesCategory = selectedCategory === 'all' || cat === normalize(selectedCategory);
      const matchesSearch = queryTokens.length === 0 || queryTokens.some(t => haystack.includes(t));
      const matchesTag = !tagFilter || (Array.isArray((item as any).tags) && ((item as any).tags as string[]).includes(tagFilter));
      return matchesCategory && matchesSearch && matchesTag;
    });

    const sortedItems = [...filteredItems].sort((a, b) => {
      switch (sortBy) {
        case 'popular': {
          const aPopularity = (a as any).downloads_count ?? 0;
          const bPopularity = (b as any).downloads_count ?? 0;
          return bPopularity - aPopularity;
        }
        case 'newest': {
          return new Date((b as any).created_at).getTime() - new Date((a as any).created_at).getTime();
        }
        case 'rating': {
          const aRating = (a as any).rating ?? (a as any).average_rating ?? 0;
          const bRating = (b as any).rating ?? (b as any).average_rating ?? 0;
          return bRating - aRating;
        }
        case 'price-low': {
          const aPrice = (a as any).price ?? Infinity;
          const bPrice = (b as any).price ?? Infinity;
          return aPrice - bPrice;
        }
        case 'price-high': {
          const aPrice = (a as any).price ?? -Infinity;
          const bPrice = (b as any).price ?? -Infinity;
          return bPrice - aPrice;
        }
        default:
          return 0;
      }
    });

    const categories: Category[] = [
      { id: 'all', name: 'All', count: allMarketplaceWebsites.length },
      ...Array.from(new Set(allMarketplaceWebsites.map(t => t.category))).map((cat) => ({
        id: cat,
        name: cat,
        count: allMarketplaceWebsites.filter(t => t.category === cat).length
      }))
    ];

    return { filteredItems, sortedItems, categories };
  }, [allMarketplaceWebsites, selectedCategory, searchTerm, tagFilter, sortBy]);

  // Memoized stats
  const { totalWebsites, totalDownloads } = useMemo(() => ({
    totalWebsites: allMarketplaceWebsites.length,
    totalDownloads: allMarketplaceWebsites.reduce((sum, w) => sum + (w.downloads_count || 0), 0),
  }), [allMarketplaceWebsites]);

  return (
    <AppLayout className="">
      <SEOHead
        title="Free Website Templates - 500+ SEO-Ready Designs | WebInHours"
        description="Browse 500+ professional website templates, all SEO & GEO optimized. Download free or get custom development in 24 hours. The fastest way to launch your business online."
        keywords="free website templates, SEO ready templates, fast website download, professional website designs, website in 24 hours, same day website, responsive templates, GEO optimized websites"
        canonicalUrl="https://webinhours.com/websites"
      />

      {/* GEO-Optimized Marketplace Schema */}
      <GEOStructuredData pageType="marketplace" />

      <div className="pt-6 pb-8 px-2 sm:px-4 lg:px-6 min-h-screen flex flex-col relative z-10">
        <div className="container mx-auto max-w-[1800px] flex flex-col flex-1">
          {/* Filters header */}
          {!isMobile ? (
            <div ref={filtersWrapRef} className="sticky top-16 z-30 py-6 mb-6">
              <Suspense fallback={<div className="h-16 bg-muted/20 animate-pulse rounded-lg" />}>
                <MarketplaceFilters
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  categories={categories}
                  tagFilter={tagFilter}
                  onClearFilters={clearAllFilters}
                />
              </Suspense>
            </div>
          ) : (
            <div className="sticky top-16 z-30 mb-4">
              <div className="rounded-lg border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
                <button
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium"
                  onClick={() => setIsMobileFiltersOpen(prev => !prev)}
                >
                  <span className="text-muted-foreground">Filters {hasActiveFilters && `(${[searchTerm, selectedCategory !== 'all' ? selectedCategory : null, tagFilter].filter(Boolean).length})`}</span>
                  {isMobileFiltersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                <Collapsible open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
                  <CollapsibleContent className="px-3 pb-3">
                    <Suspense fallback={<div className="h-32 bg-muted/10 animate-pulse rounded" />}>
                      <MarketplaceFilters
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        categories={categories}
                        tagFilter={tagFilter}
                        onClearFilters={clearAllFilters}
                      />
                    </Suspense>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          )}
          
          {/* Main Content - Full width now without AI sidebar */}
          <div className="flex-1 min-w-0 relative">
            <div className="absolute inset-0" />
            {isMobile ? (
              <div className="relative z-10 p-1">
                <TemplateGrid
                  templates={sortedItems as Website[]}
                  isLoading={isLoading}
                  onRefresh={handleRefresh}
                  onTagFilter={handleTagFilter}
                />
                <MarketplaceCTA />
              </div>
            ) : (
              <div
                ref={mainContentRef}
                className="relative z-10 p-1 overflow-y-auto"
                style={{
                  height: 'calc(100dvh - var(--filters-sticky-offset, 140px))',
                  overscrollBehavior: 'contain'
                }}
              >
                <div>
                  <TemplateGrid
                    templates={sortedItems as Website[]}
                    isLoading={isLoading}
                    onRefresh={handleRefresh}
                    onTagFilter={handleTagFilter}
                  />
                </div>
                <MarketplaceCTA />
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Marketplace;
