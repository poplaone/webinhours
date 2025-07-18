
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import SideNavbar from '@/components/layout/SideNavbar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { TemplateGrid } from '@/components/dashboard/TemplateGrid';
import { InsightsSidebar } from '@/components/dashboard/InsightsSidebar';
import { CategoryCards } from '@/components/dashboard/CategoryCards';
import { useWebsites } from '@/hooks/useWebsiteQueries';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedTag, setSelectedTag] = useState<string>('');

  // Fetch websites - only show approved/featured for marketplace visitors
  const {
    data: websites = [],
    isLoading,
    error,
    refetch
  } = useWebsites({
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    search: searchValue || undefined,
    // Don't include pending websites in the public marketplace
    includeAll: false
  });

  // Enhanced error handling and logging
  React.useEffect(() => {
    console.log('📊 Dashboard state update:');
    console.log('  - Websites loaded:', websites.length);
    console.log('  - Is loading:', isLoading);
    console.log('  - Has error:', !!error);
    
    if (error) {
      console.error('💥 Dashboard error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      
      toast({
        title: "Error loading websites",
        description: error.message || "There was an error loading the marketplace. Please try again.",
        variant: "destructive",
      });
    } else if (!isLoading && websites.length === 0) {
      console.warn('⚠️ No websites found in database');
      toast({
        title: "No websites found",
        description: "The marketplace appears to be empty. Try refreshing or check back later.",
        variant: "default",
      });
    } else if (!isLoading && websites.length > 0) {
      console.log('✅ Websites loaded successfully:', websites.map(w => ({ id: w.id, title: w.title, status: w.status })));
    }
  }, [websites, isLoading, error, toast]);

  // Apply client-side filters to website data
  const filteredTemplates = websites.filter(template => {
    // Category filter (already handled by query)
    const categoryMatch = selectedCategory === 'all' || template.category.toLowerCase() === selectedCategory.toLowerCase();

    // Search filter (already handled by query, but keeping for additional client-side filtering)
    const searchMatch = !searchValue || 
      template.title.toLowerCase().includes(searchValue.toLowerCase()) || 
      (template.description && template.description.toLowerCase().includes(searchValue.toLowerCase())) || 
      template.category.toLowerCase().includes(searchValue.toLowerCase());

    // Price filter
    const priceMatch = Number(template.price) >= priceRange[0] && Number(template.price) <= priceRange[1];

    // Tag filter
    const tagMatch = !selectedTag || 
      (template.tags && template.tags.some(tag => 
        tag.toLowerCase().includes(selectedTag.toLowerCase())
      ));

    return categoryMatch && searchMatch && priceMatch && tagMatch;
  });

  const handleTagFilter = (tag: string) => {
    console.log('🔖 Tag filter applied:', tag);
    setSelectedTag(tag);
    setSearchValue(''); // Clear search when filtering by tag
  };

  const clearTagFilter = () => {
    console.log('🔖 Tag filter cleared');
    setSelectedTag('');
  };

  const handleRefresh = () => {
    console.log('🔄 Manual refresh triggered');
    refetch();
    toast({
      title: "Refreshed",
      description: "Marketplace data has been refreshed.",
    });
  };

  console.log('🎨 Dashboard render - filteredTemplates:', filteredTemplates.length);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-background to-background/80">
      <SideNavbar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader 
          searchValue={searchValue} 
          onSearchChange={setSearchValue} 
          selectedCategory={selectedCategory} 
          onCategoryChange={setSelectedCategory} 
          priceRange={priceRange} 
          onPriceRangeChange={setPriceRange}
          templateCount={filteredTemplates.length}
          onRefresh={handleRefresh}
          isLoading={isLoading}
        />

        <main className="flex-1 overflow-hidden p-3 md:p-6 lg:p-8 xl:p-10 pb-20 md:pb-6">
          <div className="flex flex-col gap-3 md:gap-4 mb-4 md:mb-6">
            <div>
              {selectedTag && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm bg-[#8B5CF6]/10 text-[#8B5CF6] px-2 py-1 rounded-full">
                    Tag: {selectedTag}
                  </span>
                  <Button variant="ghost" size="sm" onClick={clearTagFilter} className="h-6 px-2 text-xs">
                    Clear
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Responsive grid layout optimized for larger screens */}
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8 h-full">
            {/* Main content area - takes up more space on larger screens */}
            <div className="lg:col-span-2 xl:col-span-3 2xl:col-span-4 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="pr-4">
                  <TemplateGrid 
                    templates={filteredTemplates} 
                    isLoading={isLoading} 
                    onRefresh={handleRefresh} 
                    onTagFilter={handleTagFilter} 
                  />
                </div>
              </ScrollArea>
            </div>
            
            {/* Fixed sidebar content - responsive width */}
            <div className="hidden lg:block lg:col-span-1 xl:col-span-1 2xl:col-span-1 space-y-4 lg:space-y-6">
              <InsightsSidebar />
              <CategoryCards websiteCount={websites.length} />
            </div>
          </div>
        </main>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default Dashboard;
