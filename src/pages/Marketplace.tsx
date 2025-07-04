
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { useWebsites } from '@/hooks/useWebsites';
import { useAIAgents } from '@/hooks/useAIAgents';
import { TemplateGrid } from '@/components/dashboard/TemplateGrid';
import { MarketplaceHeader } from '@/components/marketplace/MarketplaceHeader';
import { MarketplaceFilters } from '@/components/marketplace/MarketplaceFilters';
import { MarketplaceCTA } from '@/components/marketplace/MarketplaceCTA';
import { AIAgentCard } from '@/components/ai-agents/AIAgentCard';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [activeTab, setActiveTab] = useState<'all' | 'websites' | 'ai-agents'>('all');

  // Fetch approved and featured websites only for marketplace
  const { data: websites = [], isLoading: websitesLoading, refetch: refetchWebsites } = useWebsites({
    search: searchTerm || undefined,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    status: 'approved', // Only show approved websites in marketplace
  });

  // Filter to include featured websites as well
  const { data: featuredWebsites = [] } = useWebsites({
    search: searchTerm || undefined,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    status: 'featured',
  });

  // Fetch AI agents
  const { data: aiAgents = [], isLoading: aiAgentsLoading, refetch: refetchAIAgents } = useAIAgents({
    search: searchTerm || undefined,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    status: 'approved',
  });

  const { data: featuredAIAgents = [] } = useAIAgents({
    search: searchTerm || undefined,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    status: 'featured',
  });

  // Combine approved and featured items
  const allMarketplaceWebsites = [...websites, ...featuredWebsites];
  const allMarketplaceAIAgents = [...aiAgents, ...featuredAIAgents];

  // Determine what to show based on active tab
  let displayItems: any[] = [];
  let isLoading = false;
  
  if (activeTab === 'websites') {
    displayItems = allMarketplaceWebsites;
    isLoading = websitesLoading;
  } else if (activeTab === 'ai-agents') {
    displayItems = allMarketplaceAIAgents;
    isLoading = aiAgentsLoading;
  } else {
    displayItems = [...allMarketplaceWebsites, ...allMarketplaceAIAgents];
    isLoading = websitesLoading || aiAgentsLoading;
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
    { id: 'all', name: `All ${activeTab === 'websites' ? 'Templates' : activeTab === 'ai-agents' ? 'Agents' : 'Items'}`, count: displayItems.length },
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
    <AppLayout>
      <SEOHead 
        title="Website Template Marketplace - Choose Your Perfect Design"
        description="Browse our collection of professional website templates. E-commerce, business, portfolio designs ready in 24 hours. All templates include hosting, SSL, and mobile optimization."
        keywords="website templates, web design marketplace, professional websites, e-commerce templates, business websites"
      />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
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

          {/* Items Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {activeTab === 'ai-agents' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading ? (
                  Array.from({ length: 8 }).map((_, i) => (
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
              <div className="space-y-8">
                {/* Mixed view for 'all' tab */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {isLoading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-lg" />
                    ))
                  ) : (
                    sortedItems.map((item) => (
                      item.agent_type ? (
                        <AIAgentCard 
                          key={item.id} 
                          agent={item}
                          onUse={(agent) => console.log('Use agent:', agent)}
                          onView={(agent) => console.log('View agent:', agent)}
                        />
                      ) : (
                        <div key={item.id} className="h-80 bg-gray-100 rounded-lg p-4 flex flex-col">
                          <div className="text-sm text-gray-500 mb-2">Website Template</div>
                          <h3 className="font-semibold mb-2">{item.title}</h3>
                          <p className="text-sm text-gray-600 flex-1">{item.description}</p>
                          <div className="mt-auto pt-4">
                            <div className="text-lg font-bold">{item.price === 0 ? 'Free' : `$${item.price}`}</div>
                          </div>
                        </div>
                      )
                    ))
                  )}
                </div>
              </div>
            )}
          </motion.div>

          <MarketplaceCTA />
        </div>
      </div>
    </AppLayout>
  );
};

export default Marketplace;
