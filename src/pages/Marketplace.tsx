import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';

import { MarketplaceFilters } from '@/components/marketplace/MarketplaceFilters';

interface Category {
  id: string;
  name: string;
  count: number;
}
import { TemplateGrid } from '@/components/dashboard/TemplateGrid';
import { AIAgentInfographicCard } from '@/components/ai-agents/AIAgentInfographicCard';
import { MarketplaceCTA } from '@/components/marketplace/MarketplaceCTA';
import { AIChatbot } from '@/components/dashboard/AIChatbot';
import { FeaturedSidebar } from '@/components/dashboard/FeaturedSidebar';
import { useWebsites } from '@/hooks/useWebsites';
import { useAIAgents } from '@/hooks/useAIAgents';
import { Tables } from '@/integrations/supabase/types';
import AnimatedGridBackground from '@/components/animations/AnimatedGridBackground';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ChevronDown, ChevronUp } from 'lucide-react';

type Website = Tables<'websites'>;
type AIAgent = Tables<'ai_agents'>;

const Marketplace: React.FC = () => {
  // Performance monitoring - temporarily disabled
  // usePerformanceMonitor('Marketplace');
  // useRenderPerformance('Marketplace');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [activeTab, setActiveTab] = useState<'websites' | 'ai-agents'>('websites');
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  const mainContentRef = useRef<HTMLDivElement>(null);
  const filtersWrapRef = useRef<HTMLDivElement>(null);
  const didInitialScrollReset = useRef(false);
  const isMobile = useIsMobile();
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const [floatingButtonPos, setFloatingButtonPos] = useState({ x: typeof window !== 'undefined' ? window.innerWidth - 80 : 0, y: typeof window !== 'undefined' ? window.innerHeight - 120 : 0 });

  // Always start at top when entering Marketplace
  useEffect(() => {
    const prevRestoration = (typeof window !== 'undefined' && 'scrollRestoration' in window.history)
      ? window.history.scrollRestoration
      : undefined;

    // Disable browser automatic scroll restoration
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

    // Reset immediately and after layout/paint to beat late content shifts
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

  // Calculate sticky offset for filters so assistant starts below it
  useEffect(() => {
    // Skip offset management on mobile since we use normal page scroll
    if (isMobile || !filtersWrapRef.current) return;
    const root = document.documentElement;
    const STICKY_TOP_PX = 64; // matches top-16

    const updateOffset = () => {
      if (!filtersWrapRef.current) return;
      const rect = filtersWrapRef.current.getBoundingClientRect();
      const height = filtersWrapRef.current.offsetHeight || rect.height || 0;
      const computedOffset = Math.max(0, STICKY_TOP_PX + height);
      root.style.setProperty('--filters-sticky-offset', `${computedOffset}px`);
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

  // Note: post-data scroll reset is declared AFTER data hooks below

  // Explicitly request only public marketplace data (approved/featured only)
  const { data: allMarketplaceWebsites = [], isLoading: isLoadingWebsites, refetch: refetchWebsites, error: websitesError } = useWebsites({ includeAll: false });
  const { data: allMarketplaceAIAgents = [], isLoading: isLoadingAIAgents, refetch: refetchAIAgents, error: aiAgentsError } = useAIAgents({ includeAll: false, includeMine: true });

  const handleDrag = useCallback((e: React.DragEvent) => {
    setFloatingButtonPos({ x: e.clientX - 28, y: e.clientY - 28 });
  }, []);

  // Debug logging
  console.log('Marketplace data:', {
    websites: allMarketplaceWebsites.length,
    aiAgents: allMarketplaceAIAgents.length,
    websitesError,
    aiAgentsError
  });

  const isLoading = activeTab === 'websites' ? isLoadingWebsites : isLoadingAIAgents;

  // After data loads first time or tab changes, re-assert scroll to top once
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
  }, [isLoading, activeTab, isMobile]);

  const handleRefresh = useCallback(() => {
    if (activeTab === 'websites') {
      refetchWebsites();
    } else {
      refetchAIAgents();
    }
  }, [activeTab, refetchWebsites, refetchAIAgents]);

  const handleTagFilter = useCallback((tag: string | null) => {
    setTagFilter(tag);
  }, []);

  // Memoized data processing
  const { allItems, filteredItems, sortedItems, categories } = useMemo(() => {
    const allItems = (activeTab === 'websites' ? allMarketplaceWebsites : allMarketplaceAIAgents) as (Website | AIAgent)[];

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
          const aPopularity = 'downloads_count' in a ? (a as any).downloads_count ?? 0 : ('usage_count' in a ? (a as any).usage_count ?? 0 : 0);
          const bPopularity = 'downloads_count' in b ? (b as any).downloads_count ?? 0 : ('usage_count' in b ? (b as any).usage_count ?? 0 : 0);
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
          const aPrice = (a as any).price ?? (a as any).starting_price ?? Infinity;
          const bPrice = (b as any).price ?? (b as any).starting_price ?? Infinity;
          return aPrice - bPrice;
        }
        case 'price-high': {
          const aPrice = (a as any).price ?? (a as any).starting_price ?? -Infinity;
          const bPrice = (b as any).price ?? (b as any).starting_price ?? -Infinity;
          return bPrice - aPrice;
        }
        default:
          return 0;
      }
    });

    const categories: Category[] = [
      { id: 'all', name: 'All', count: allMarketplaceWebsites.length },
      ...Array.from(new Set(allMarketplaceWebsites.map(t => t.category))).map((cat, index) => ({
        id: cat,
        name: cat,
        count: allMarketplaceWebsites.filter(t => t.category === cat).length
      }))
    ];

    return { allItems, filteredItems, sortedItems, categories };
  }, [activeTab, allMarketplaceWebsites, allMarketplaceAIAgents, selectedCategory, searchTerm, tagFilter, sortBy]);

  // Fallback: 12 dummy AI agents when no data exists
  const dummyAIAgents: AIAgent[] = useMemo(() => (
    Array.from({ length: 12 }).map((_, i) => {
      const presets = [
        { title: 'ShopBot Assistant', category: 'ecommerce', agent_type: 'automation', tags: ['shop','cart','retail'] },
        { title: 'Portfolio Curator', category: 'portfolio', agent_type: 'creative', tags: ['design','showcase','ui'] },
        { title: 'BizOps Advisor', category: 'business', agent_type: 'assistant', tags: ['crm','sales','ops'] },
        { title: 'Blog Content Wizard', category: 'blog', agent_type: 'copywriter', tags: ['article','seo','news'] },
        { title: 'SaaS Launch Copilot', category: 'landing', agent_type: 'growth', tags: ['saas','startup','launch'] },
        { title: 'Support Chat Agent', category: 'support', agent_type: 'chatbot', tags: ['inbox','support','message'] },
        { title: 'Analytics Reporter', category: 'analytics', agent_type: 'reporting', tags: ['kpi','metrics','charts'] },
        { title: 'Security Sentinel', category: 'security', agent_type: 'monitor', tags: ['shield','guard','auth'] },
        { title: 'Global SEO Scout', category: 'marketing', agent_type: 'seo', tags: ['traffic','keywords','intl'] },
        { title: 'Dev Automator', category: 'developer', agent_type: 'automation', tags: ['code','github','pipeline'] },
        { title: 'Brand Design Helper', category: 'design', agent_type: 'assistant', tags: ['logo','brand','assets'] },
        { title: 'Magic Optimizer', category: 'utilities', agent_type: 'optimizer', tags: ['enhance','wizard','auto'] }
      ];
      const p = presets[i % presets.length];
      const now = new Date().toISOString();
      return {
        id: `dummy-${i+1}` as any,
        user_id: 'system' as any,
        title: p.title,
        description: `Infographic AI agent for ${p.category} use-cases. No image, glass card, themed icon.`,
        category: p.category,
        tags: p.tags,
        price: 0 as any,
        preview_url: '#',
        demo_url: '#',
        thumbnail_url: undefined,
        images: [],
        technologies: ['AI','Automation'],
        features: ['Fast','Configurable','Reliable'],
        inclusions: [],
        agent_type: p.agent_type,
        model_info: null,
        use_cases: [p.category, ...p.tags],
        status: 'live' as any,
        is_featured: i % 5 === 0,
        views_count: Math.floor(Math.random()*500),
        usage_count: Math.floor(Math.random()*200),
        rating_average: 4 + (Math.random()*1),
        rating_count: Math.floor(Math.random()*100),
        created_at: now,
        updated_at: now,
        featured_at: undefined,
        approved_at: now,
        profiles: { full_name: 'WebInHours', avatar_url: undefined }
      } as unknown as AIAgent;
    })
  ), []);

  // Memoized stats
  const { totalWebsites, totalDownloads, totalAIAgents, totalUsage } = useMemo(() => ({
    totalWebsites: allMarketplaceWebsites.length,
    totalDownloads: allMarketplaceWebsites.reduce((sum, w) => sum + (w.downloads_count || 0), 0),
    totalAIAgents: allMarketplaceAIAgents.length,
    totalUsage: allMarketplaceAIAgents.reduce((sum, a) => sum + (a.usage_count || 0), 0)
  }), [allMarketplaceWebsites, allMarketplaceAIAgents]);

  return (
    <AppLayout className="bg-home-glow">
      <SEOHead 
        title="Website Template Marketplace - Choose Your Perfect Design"
        description="Browse our collection of professional website templates. E-commerce, business, portfolio designs ready in 24 hours. All templates include hosting, SSL, and mobile optimization."
        keywords="website templates, web design marketplace, professional websites, e-commerce templates, business websites"
      />
      <div className="pt-6 pb-8 px-2 sm:px-4 lg:px-6 min-h-screen flex flex-col">
        <div className="container mx-auto max-w-[1800px] flex flex-col flex-1">
          {/* Filters header */}
          {!isMobile ? (
            <div ref={filtersWrapRef} className="sticky top-16 z-30 py-6 mb-6">
              <MarketplaceFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
                categories={categories}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
          ) : (
            <div className="sticky top-16 z-30 mb-4">
              <div className="rounded-lg border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex-1 border-r">
                    <button
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium ${activeTab === 'websites' ? 'text-primary' : 'text-muted-foreground'}`}
                      onClick={() => setActiveTab('websites')}
                    >
                      <span>Websites</span>
                      {activeTab === 'websites' && <ChevronDown className="h-4 w-4 ml-1" />}
                    </button>
                  </div>
                  <div className="flex-1">
                    <button
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium ${activeTab === 'ai-agents' ? 'text-primary' : 'text-muted-foreground'}`}
                      onClick={() => setActiveTab('ai-agents')}
                    >
                      <span>AI Agents</span>
                      {activeTab === 'ai-agents' && <ChevronDown className="h-4 w-4 ml-1" />}
                    </button>
                  </div>
                  <div className="border-l">
                    <button
                      className="flex items-center justify-center px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setIsMobileFiltersOpen(prev => !prev)}
                    >
                      <div className="relative">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground group-hover:text-foreground">
                          <path d="M3 6H21M6 12H18M9 18H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary"></span>
                      </div>
                    </button>
                  </div>
                </div>
                <Collapsible open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
                  <CollapsibleContent className="px-3 pb-3">
                    <Tabs defaultValue="search">
                      <TabsList className="w-full grid grid-cols-2">
                        <TabsTrigger value="search">Search</TabsTrigger>
                        <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
                      </TabsList>
                      <TabsContent value="search" className="mt-3">
                        <MarketplaceFilters
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                          selectedCategory={selectedCategory}
                          setSelectedCategory={setSelectedCategory}
                          sortBy={sortBy}
                          setSortBy={setSortBy}
                          categories={categories}
                          activeTab={activeTab}
                          setActiveTab={setActiveTab}
                        />
                      </TabsContent>
                      <TabsContent value="assistant" className="mt-3">
                        <div className="rounded-lg border bg-card p-3">
                          <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                            <Bot className="h-4 w-4" />
                            AI Chatbot
                          </div>
                          <div className="max-h-[60vh] overflow-y-auto">
                            <AIChatbot onSearch={(q) => { 
                              setActiveTab('websites');
                              setSelectedCategory('all');
                              setTagFilter(null);
                              setSearchTerm(q);
                            }} />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          )}
          <div className="flex gap-4 xl:gap-6 items-start flex-1">
            {/* Left Sidebar */}
            <div className="hidden xl:block w-[320px] shrink-0">
              {/* Sticky assistant under filter bar using measured offset */}
              <div
                className="sticky"
                style={{
                  // @ts-ignore CSS var
                  top: 'var(--filters-sticky-offset, 140px)',
                  height: 'calc(100dvh - var(--filters-sticky-offset, 140px))'
                }}
              >
                <AIChatbot onSearch={(q) => { 
                  setActiveTab('websites');
                  setSelectedCategory('all');
                  setTagFilter(null);
                  setSearchTerm(q);
                }} />
              </div>
            </div>
            {/* Main Content - desktop uses independent scroll; mobile uses page scroll */}
            <div className="flex-1 min-w-0 relative">
              <div className="absolute inset-0">
                <AnimatedGridBackground />
              </div>
              {isMobile ? (
                <div className="relative z-10 p-1">
                  {activeTab === 'websites' ? (
                    <TemplateGrid 
                      templates={sortedItems as Website[]} 
                      isLoading={isLoading} 
                      onRefresh={handleRefresh}
                      onTagFilter={handleTagFilter}
                    />
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-4">
                      {isLoading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-lg" />
                        ))
                      ) : (
                        ((sortedItems as AIAgent[]).length > 0 ? (sortedItems as AIAgent[]) : dummyAIAgents).map((agent) => (
                          <AIAgentInfographicCard 
                            key={agent.id}
                            agent={agent as any}
                            onUse={(agent) => console.log('Use agent:', agent)}
                            onView={(agent) => console.log('View agent:', agent)}
                          />
                        ))
                      )}
                    </div>
                  )}
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
                    {activeTab === 'websites' ? (
                      <TemplateGrid 
                        templates={sortedItems as Website[]} 
                        isLoading={isLoading} 
                        onRefresh={handleRefresh}
                        onTagFilter={handleTagFilter}
                      />
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-4">
                        {isLoading ? (
                          Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-lg" />
                          ))
                        ) : (
                          ((sortedItems as AIAgent[]).length > 0 ? (sortedItems as AIAgent[]) : dummyAIAgents).map((agent) => (
                            <AIAgentInfographicCard 
                              key={agent.id}
                              agent={agent as any}
                              onUse={(agent) => console.log('Use agent:', agent)}
                              onView={(agent) => console.log('View agent:', agent)}
                            />
                          ))
                        )}
                      </div>
                    )}
                  </div>
                  <MarketplaceCTA />
                </div>
              )}
            </div>
            {/* Right Sidebar removed per request: Featured/Trending/Quick Links */}
          </div>
        </div>

        {!isMobile && (
          <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
            <DialogTrigger asChild>
              <Button
                draggable
                onDrag={handleDrag}
                size="lg"
                style={{ left: floatingButtonPos.x, top: floatingButtonPos.y }}
                className="fixed z-50 rounded-full w-16 h-16 shadow-xl bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-2 border-white/20 cursor-move"
              >
                <Bot className="h-8 w-8 text-white" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md w-[90vw] h-[70vh] p-0 rounded-2xl">
              <div className="h-full">
                <AIChatbot />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AppLayout>
  );
};

export default Marketplace;