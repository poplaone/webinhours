
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Eye, 
  Star, 
  Download,
  ExternalLink,
  TrendingUp,
  Filter,
  Grid,
  List,
  Heart
} from 'lucide-react';
import { useWebsites, useIncrementViews } from '@/hooks/useWebsites';
import { DashboardHeader } from '@/components/layout/DashboardHeader';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'business', label: 'Business' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'blog', label: 'Blog' },
  { value: 'landing_page', label: 'Landing Page' },
  { value: 'saas', label: 'SaaS' },
  { value: 'nonprofit', label: 'Non-Profit' },
  { value: 'education', label: 'Education' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'creative', label: 'Creative' },
  { value: 'other', label: 'Other' },
];

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('ranking');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const incrementViews = useIncrementViews();

  const filters = {
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    search: searchTerm || undefined,
  };

  const { data: websites = [], isLoading } = useWebsites(filters);

  const filteredWebsites = websites.filter(website => {
    if (priceFilter === 'free') return website.price === 0;
    if (priceFilter === 'paid') return website.price > 0;
    return true;
  });

  const sortedWebsites = [...filteredWebsites].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'popular':
        return b.views_count - a.views_count;
      case 'rating':
        return (b.rating_average || 0) - (a.rating_average || 0);
      default: // ranking
        return 0; // Already sorted by ranking from the query
    }
  });

  const handlePreview = (website: any) => {
    incrementViews.mutate(website.id);
    window.open(website.preview_url, '_blank');
  };

  const formatPrice = (price: number) => {
    return price === 0 ? 'Free' : `$${price.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader searchValue={searchTerm} onSearchChange={setSearchTerm} />
      
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Website Marketplace</h1>
          <p className="text-xl text-muted-foreground">
            Discover and purchase premium website templates
          </p>
        </div>

        {/* Filters Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ranking">Best Match</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-muted-foreground">
            {sortedWebsites.length} template{sortedWebsites.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Website Grid/List */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
          : "space-y-4"
        }>
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : sortedWebsites.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">No templates found</p>
              <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            sortedWebsites.map((website) => (
              <Card 
                key={website.id} 
                className={`group hover:shadow-lg transition-all duration-300 cursor-pointer ${
                  viewMode === 'list' ? 'flex flex-row' : ''
                }`}
              >
                <div className={`relative ${viewMode === 'list' ? 'w-64 flex-shrink-0' : ''}`}>
                  {website.thumbnail_url ? (
                    <img 
                      src={website.thumbnail_url} 
                      alt={website.title}
                      className={`w-full object-cover ${
                        viewMode === 'list' ? 'h-40' : 'h-48'
                      } ${viewMode === 'list' ? 'rounded-l-lg' : 'rounded-t-lg'}`}
                    />
                  ) : (
                    <div className={`w-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center ${
                      viewMode === 'list' ? 'h-40 rounded-l-lg' : 'h-48 rounded-t-lg'
                    }`}>
                      <span className="text-white font-semibold text-lg">
                        {website.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  {website.is_featured && (
                    <Badge className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-pink-600">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}

                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button 
                      onClick={() => handlePreview(website)}
                      className="bg-white text-black hover:bg-gray-100"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>

                <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg group-hover:text-purple-600 transition-colors">
                      {website.title}
                    </h3>
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {website.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {website.tags?.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {website.tags?.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{website.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {website.views_count}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      {website.rating_average?.toFixed(1) || '0.0'}
                      ({website.rating_count})
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {website.downloads_count}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">
                      {formatPrice(website.price)}
                    </span>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handlePreview(website)}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/90"
                      >
                        {website.price === 0 ? 'Download' : 'Buy Now'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
