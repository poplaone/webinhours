
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { useWebsites } from '@/hooks/useWebsites';
import { TemplateGrid } from '@/components/dashboard/TemplateGrid';
import { MarketplaceHeader } from '@/components/marketplace/MarketplaceHeader';
import { MarketplaceFilters } from '@/components/marketplace/MarketplaceFilters';
import { MarketplaceCTA } from '@/components/marketplace/MarketplaceCTA';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Fetch approved and featured websites only for marketplace
  const { data: websites = [], isLoading, refetch } = useWebsites({
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

  // Combine approved and featured websites
  const allMarketplaceWebsites = [...websites, ...featuredWebsites];

  // Sort websites based on sortBy criteria
  const sortedWebsites = [...allMarketplaceWebsites].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.views_count || 0) - (a.views_count || 0);
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

  // Get unique categories from the websites
  const categories = [
    { id: 'all', name: 'All Templates', count: allMarketplaceWebsites.length },
    ...Array.from(new Set(allMarketplaceWebsites.map(w => w.category))).map(category => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1),
      count: allMarketplaceWebsites.filter(w => w.category === category).length
    }))
  ];

  const handleTagFilter = (tag: string) => {
    setSearchTerm(tag);
  };

  // Calculate total downloads for header
  const totalDownloads = allMarketplaceWebsites.reduce((sum, w) => sum + (w.downloads_count || 0), 0);

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
            totalWebsites={allMarketplaceWebsites.length}
            totalDownloads={totalDownloads}
          />

          <MarketplaceFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            categories={categories}
          />

          {/* Templates Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <TemplateGrid 
              templates={sortedWebsites} 
              isLoading={isLoading} 
              onRefresh={refetch}
              onTagFilter={handleTagFilter}
            />
          </motion.div>

          <MarketplaceCTA />
        </div>
      </div>
    </AppLayout>
  );
};

export default Marketplace;
