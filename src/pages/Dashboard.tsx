
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SideNavbar from '@/components/layout/SideNavbar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { TemplateGrid } from '@/components/dashboard/TemplateGrid';
import { InsightsSidebar } from '@/components/dashboard/InsightsSidebar';
import { CategoryCards } from '@/components/dashboard/CategoryCards';
import { FeaturedSidebar } from '@/components/dashboard/FeaturedSidebar';
import { AIChatbot } from '@/components/dashboard/AIChatbot';
import { useWebsites } from '@/hooks/useWebsiteQueries';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);

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
          {/* Main Layout with independent scrollable sections */}
          <div className="flex gap-4 xl:gap-6 h-full">
            {/* Left Sidebar: AI Chatbot - Independently scrollable */}
            <div className="hidden xl:block w-[300px] shrink-0">
              <div className="h-full overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="pr-2">
                    <AIChatbot />
                  </div>
                </ScrollArea>
              </div>
            </div>
            
            {/* Main Content - Independently scrollable */}
            <div className="flex-1 min-w-0 max-w-none xl:max-w-[calc(100%-640px)] lg:max-w-[calc(100%-320px)] flex flex-col">
              {/* Header section with filters - stays fixed */}
              <div className="flex flex-col gap-3 md:gap-4 mb-4 md:mb-6 flex-shrink-0">
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
              
              {/* Scrollable website cards section */}
              <div className="flex-1 overflow-hidden">
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
            </div>
            
            {/* Right Sidebar: Featured content and insights - Independently scrollable */}
            <div className="hidden lg:block w-[300px] shrink-0">
              <div className="h-full overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="pr-2 space-y-4">
                    {/* AI Assistant for tablet/small screens - show on right */}
                    <div className="block xl:hidden">
                      <AIChatbot />
                    </div>
                    {/* Featured sidebar */}
                    <FeaturedSidebar />
                    {/* Insights and category cards */}
                    <InsightsSidebar />
                    <CategoryCards websiteCount={websites.length} />
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
      
      {/* Mobile AI Assistant - Floating button and popup */}
      <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="fixed bottom-20 right-4 z-50 rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90 lg:hidden"
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
    </div>
  );
};

export default Dashboard;
