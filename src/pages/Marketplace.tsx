import React, { useState, useRef } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';

import { MarketplaceFilters } from '@/components/marketplace/MarketplaceFilters';

interface Category {
  id: string;
  name: string;
  count: number;
}
import { TemplateGrid } from '@/components/dashboard/TemplateGrid';
import { AIAgentCard } from '@/components/ai-agents/AIAgentCard';
import { MarketplaceCTA } from '@/components/marketplace/MarketplaceCTA';
import { AIChatbot } from '@/components/dashboard/AIChatbot';
import { FeaturedSidebar } from '@/components/dashboard/FeaturedSidebar';
import { useWebsites } from '@/hooks/useWebsites';
import { useAIAgents } from '@/hooks/useAIAgents';
import { Tables } from '@/integrations/supabase/types';
import { motion } from 'framer-motion';
import AnimatedGridBackground from '@/components/animations/AnimatedGridBackground';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

type Website = Tables<'websites'>;
type AIAgent = Tables<'ai_agents'>;

const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [activeTab, setActiveTab] = useState<'websites' | 'ai-agents'>('websites');
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  const mainContentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);

  // Explicitly request only public marketplace data (approved/featured only)
  const { data: allMarketplaceWebsites = [], isLoading: isLoadingWebsites, refetch: refetchWebsites, error: websitesError } = useWebsites({ includeAll: false });
  const { data: allMarketplaceAIAgents = [], isLoading: isLoadingAIAgents, refetch: refetchAIAgents, error: aiAgentsError } = useAIAgents({ includeAll: false });

  // Debug logging
  console.log('Marketplace data:', {
    websites: allMarketplaceWebsites.length,
    aiAgents: allMarketplaceAIAgents.length,
    websitesError,
    aiAgentsError
  });

  const isLoading = activeTab === 'websites' ? isLoadingWebsites : isLoadingAIAgents;

  const handleRefresh = () => {
    if (activeTab === 'websites') {
      refetchWebsites();
    } else {
      refetchAIAgents();
    }
  };

  const handleTagFilter = (tag: string | null) => {
    setTagFilter(tag);
  };

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

  const totalWebsites = allMarketplaceWebsites.length;
  const totalDownloads = allMarketplaceWebsites.reduce((sum, w) => sum + (w.downloads_count || 0), 0);
  const totalAIAgents = allMarketplaceAIAgents.length;
  const totalUsage = allMarketplaceAIAgents.reduce((sum, a) => sum + (a.usage_count || 0), 0);

  return (
    <AppLayout className="bg-home-glow">
      <SEOHead 
        title="Website Template Marketplace - Choose Your Perfect Design"
        description="Browse our collection of professional website templates. E-commerce, business, portfolio designs ready in 24 hours. All templates include hosting, SSL, and mobile optimization."
        keywords="website templates, web design marketplace, professional websites, e-commerce templates, business websites"
      />
      <div className="pt-6 pb-8 px-2 sm:px-4 lg:px-6 h-screen flex flex-col">
        <div className="container mx-auto max-w-[1800px] flex flex-col flex-1">
          <div className="sticky top-0 z-30 py-4 bg-background/90 backdrop-blur-lg -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-4">
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

          <div className="flex gap-4 xl:gap-6 items-start flex-1 overflow-hidden">
            {/* Left Sidebar */}
            <div className="hidden xl:block w-[300px] shrink-0 h-full overflow-y-auto scrollbar-hide">
              <AIChatbot />
            </div>
            
            {/* Main Content */}
            <div className="flex-1 min-w-0 h-full relative">
              <div className="absolute inset-0">
                <AnimatedGridBackground />
              </div>
              <div ref={mainContentRef} className="relative z-10 h-full overflow-y-auto scrollbar-hide p-1">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
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
                          <AIAgentCard 
                            key={agent.id} 
                            agent={agent}
                            onUse={(agent) => console.log('Use agent:', agent)}
                            onView={(agent) => console.log('View agent:', agent)}
                          />
                        ))
                      )}
                    </div>
                  )}
                </motion.div>
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
                size="lg"
                className="fixed bottom-4 right-4 z-50 rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90"
              >
                <MessageSquare className="h-6 w-6" />
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