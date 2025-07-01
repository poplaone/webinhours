
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Eye, Download, Heart, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { useWebsites } from '@/hooks/useWebsites';
import { TemplateGrid } from '@/components/dashboard/TemplateGrid';

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

  return (
    <AppLayout>
      <SEOHead 
        title="Website Template Marketplace - Choose Your Perfect Design"
        description="Browse our collection of professional website templates. E-commerce, business, portfolio designs ready in 24 hours. All templates include hosting, SSL, and mobile optimization."
        keywords="website templates, web design marketplace, professional websites, e-commerce templates, business websites"
      />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Website Template <span className="text-[#8B5CF6]">Marketplace</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Choose from our collection of professionally designed templates. Each comes with 24-hour delivery, 
              hosting setup, and mobile optimization included.
            </p>
            
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span>4.8/5 Average Rating</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-4 w-4 text-green-500" />
                <span>{allMarketplaceWebsites.reduce((sum, w) => sum + (w.downloads_count || 0), 0)}+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-1">
                <ExternalLink className="h-4 w-4 text-blue-500" />
                <span>24hr Delivery Guaranteed</span>
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="bg-card/50 backdrop-blur rounded-xl p-6 mb-8 border border-border/40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

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

          {/* CTA Section */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 border-[#8B5CF6]/20 bg-gradient-to-br from-[#8B5CF6]/5 to-[#A78BFA]/5">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-4">Don't See What You Need?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Our team can create a completely custom website tailored to your specific requirements. 
                  Get a personalized quote and timeline for your unique project.
                </p>
                <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
                  Request Custom Design
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Marketplace;
