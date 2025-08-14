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
// import { usePerformanceMonitor, useRenderPerformance } from '@/hooks/usePerformanceMonitor';

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
  const didInitialScrollReset = useRef(false);
  const isMobile = useIsMobile();
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
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
      if (mainContentRef.current) {
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
  }, []);

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
        if (mainContentRef.current) {
          mainContentRef.current.scrollTop = 0;
          mainContentRef.current.scrollLeft = 0;
        }
      }, 0);
      return () => clearTimeout(t);
    }
  }, [isLoading, activeTab]);

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

    const filteredItems = allItems.filter(item => {
      if (!item) return false;
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      const matchesTag = !tagFilter || (item.tags && item.tags.includes(tagFilter));
      return matchesCategory && matchesSearch && matchesTag;
    });

    const sortedItems = [...filteredItems].sort((a, b) => {
      if (sortBy === 'popular') {
        const aPopularity = 'downloads_count' in a ? a.downloads_count : ('usage_count' in a ? a.usage_count : 0);
        const bPopularity = 'downloads_count' in b ? b.downloads_count : ('usage_count' in b ? b.usage_count : 0);
        return bPopularity - aPopularity;
      }
      if (sortBy === 'newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      return 0;
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
          <div className="sticky top-16 z-30 py-6 mb-6">
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

          <div className="flex gap-4 xl:gap-6 items-start flex-1">
            {/* Left Sidebar */}
            <div className="hidden xl:block w-[300px] shrink-0 h-full overflow-y-auto scrollbar-hide">
              <AIChatbot />
            </div>
            
            {/* Main Content */}
            <div className="flex-1 min-w-0 relative">
              <div className="absolute inset-0">
                <AnimatedGridBackground />
              </div>
              <div ref={mainContentRef} className="relative z-10 p-1">
                <div>
                  {activeTab === 'websites' ? (
                    <TemplateGrid 
                      templates={sortedItems as Website[]} 
                      isLoading={isLoading} 
                      onRefresh={handleRefresh}
                      onTagFilter={handleTagFilter}
                    />
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                      {isLoading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-lg" />
                        ))
                      ) : (
                        (sortedItems as AIAgent[]).map((agent) => (
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
            </div>

            {/* Right Sidebar */}
            <div className="hidden lg:block w-[300px] shrink-0 h-full overflow-y-auto scrollbar-hide">
              <div className="block xl:hidden">
                <AIChatbot />
              </div>
              <FeaturedSidebar />
            </div>
          </div>
        </div>

        {isMobile && (
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