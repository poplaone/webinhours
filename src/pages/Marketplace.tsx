
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import AnimatedGridBackground from '@/components/animations/AnimatedGridBackground';
import SEOHead from '@/components/seo/SEOHead';
import { useWebsites } from '@/hooks/useWebsites';
import { useAIAgents } from '@/hooks/useAIAgents';
import { TemplateGrid } from '@/components/dashboard/TemplateGrid';
import { MarketplaceHeader } from '@/components/marketplace/MarketplaceHeader';
import { MarketplaceFilters } from '@/components/marketplace/MarketplaceFilters';
import { MarketplaceCTA } from '@/components/marketplace/MarketplaceCTA';
import { AIAgentCard } from '@/components/ai-agents/AIAgentCard';
import { FeaturedSidebar } from '@/components/dashboard/FeaturedSidebar';
import { AIChatbot } from '@/components/dashboard/AIChatbot';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { MessageSquare, X } from 'lucide-react';

const Marketplace = () => {
  // Ref for main scrollable content
  const mainContentRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);

  // Scroll to top on mount
  React.useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
  }, []);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [activeTab, setActiveTab] = useState<'websites' | 'ai-agents'>('websites');


  // Fetch all approved and featured websites in one query
  const { data: allMarketplaceWebsites = [], isLoading: websitesLoading, refetch: refetchWebsites } = useWebsites({
    search: searchTerm || undefined,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    status: undefined, // We'll use status filter in the query builder
    includeAll: false // Only show approved/featured for marketplace
  });

  // Fetch all approved and featured AI agents in one query
  const { data: allMarketplaceAIAgents = [], isLoading: aiAgentsLoading, refetch: refetchAIAgents } = useAIAgents({
    search: searchTerm || undefined,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    status: undefined,
    includeAll: false
  });

  // Determine what to show based on active tab
  let displayItems: any[] = [];
  let isLoading = false;
  
  if (activeTab === 'websites') {
    displayItems = allMarketplaceWebsites;
    isLoading = websitesLoading;
  } else {
    displayItems = allMarketplaceAIAgents;
    isLoading = aiAgentsLoading;
  }

  // Sort items based on sortBy criteria
  const sortedItems = [...displayItems].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        const aViews = a.views_count || a.usage_count || 0;
        const bViews = b.views_count || b.usage_count || 0;
        return bViews - aViews;
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'rating':
        return (b.rating_average || 0) - (a.rating_average || 0);
      case 'price-low':
        return (a.price || 0) - (b.price || 0);
      case 'price-high':
        return (b.price || 0) - (a.price || 0);
      default:
        return 0;
    }
  });

  // Get unique categories from the active items
  const categories = [
    { id: 'all', name: `All ${activeTab === 'websites' ? 'Templates' : 'Agents'}`, count: displayItems.length },
    ...Array.from(new Set(displayItems.map(item => item.category))).map(category => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1),
      count: displayItems.filter(item => item.category === category).length
    }))
  ];

  const handleTagFilter = (tag: string) => {
    setSearchTerm(tag);
  };

  const handleRefresh = () => {
    refetchWebsites();
    refetchAIAgents();
  };

  // Calculate total downloads/usage for header
  const totalWebsites = allMarketplaceWebsites.length;
  const totalAIAgents = allMarketplaceAIAgents.length;
  const totalDownloads = allMarketplaceWebsites.reduce((sum, w) => sum + (w.downloads_count || 0), 0);
  const totalUsage = allMarketplaceAIAgents.reduce((sum, a) => sum + (a.usage_count || 0), 0);

  return (
    <AppLayout className="bg-home-glow relative">
      <AnimatedGridBackground />
      <SEOHead 
        title="Website Template Marketplace - Choose Your Perfect Design"
        description="Browse our collection of professional website templates. E-commerce, business, portfolio designs ready in 24 hours. All templates include hosting, SSL, and mobile optimization."
        keywords="website templates, web design marketplace, professional websites, e-commerce templates, business websites"
      />
      <div className="pt-6 pb-20 px-2 sm:px-4 lg:px-6">
        <div className="container mx-auto max-w-[1800px]">
          {/* Header and Filters Section */}
          <div className="space-y-0 mb-6">
            <MarketplaceHeader 
              totalWebsites={totalWebsites}
              totalDownloads={totalDownloads}
              totalAIAgents={totalAIAgents}
              totalUsage={totalUsage}
              activeTab={activeTab}
            />
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

          {/* Main Layout */}
          <div className="flex gap-4 xl:gap-6 items-start">
            {/* Left Sidebar: AI Chatbot - Only on XL screens */}
            <div className="hidden xl:block w-[300px] shrink-0">
              <div className="sticky top-6">
                <AIChatbot />
              </div>
            </div>
            
            {/* Main Content */}
            <div ref={mainContentRef} className="flex-1 min-w-0 max-w-none xl:max-w-[calc(100%-640px)] lg:max-w-[calc(100%-320px)]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {activeTab === 'ai-agents' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {isLoading ? (
                      Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-lg" />
                      ))
                    ) : (
                      sortedItems.map((agent) => (
                        <AIAgentCard 
                          key={agent.id} 
                          agent={agent}
                          onUse={(agent) => console.log('Use agent:', agent)}
                          onView={(agent) => console.log('View agent:', agent)}
                        />
                      ))
                    )}
                  </div>
                ) : activeTab === 'websites' ? (
                  <TemplateGrid 
                    templates={sortedItems} 
                    isLoading={isLoading} 
                    onRefresh={handleRefresh}
                    onTagFilter={handleTagFilter}
                  />
                ) : (
                  <TemplateGrid 
                    templates={sortedItems} 
                    isLoading={isLoading} 
                    onRefresh={handleRefresh}
                    onTagFilter={handleTagFilter}
                  />
                )}
              </motion.div>
              <MarketplaceCTA />
            </div>

            {/* Right Sidebar: Different layouts for different screen sizes */}
            {!isMobile && (
              <div className="hidden lg:block w-[300px] shrink-0">
                <div className="sticky top-6 space-y-4">
                  {/* AI Assistant for tablet/small screens - show on right */}
                  <div className="block xl:hidden">
                    <AIChatbot />
                  </div>
                  {/* Featured sidebar - always on right for non-mobile */}
                  <FeaturedSidebar />
                </div>
              </div>
            )}
          </div>

          {/* Mobile AI Assistant - Floating button and popup */}
          {isMobile && (
            <>
              <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="fixed bottom-20 right-4 z-50 rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90"
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
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Marketplace;
