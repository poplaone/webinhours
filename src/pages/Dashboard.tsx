
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SideNavbar from '@/components/layout/SideNavbar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { TemplateGrid } from '@/components/dashboard/TemplateGrid';
import { InsightsSidebar } from '@/components/dashboard/InsightsSidebar';
import { CategoryCards } from '@/components/dashboard/CategoryCards';
import { useWebsites } from '@/hooks/useWebsites';
const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedTag, setSelectedTag] = useState<string>('');

  // Fetch all websites for marketplace - don't filter by approval status to show uploaded sites
  const {
    data: websites = [],
    isLoading,
    refetch
  } = useWebsites({
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    search: searchValue || undefined,
    includeAll: true // Show all websites including uploaded ones
  });

  // Debug logging
  React.useEffect(() => {
    console.log('Dashboard: websites', websites);
    console.log('Dashboard: isLoading', isLoading);
  }, [websites, isLoading]);

  // Refetch data when component mounts to ensure fresh data
  React.useEffect(() => {
    refetch();
  }, [refetch]);

  // Apply filters to website data
  const filteredTemplates = websites.filter(template => {
    // Category filter
    const categoryMatch = selectedCategory === 'all' || template.category.toLowerCase() === selectedCategory.toLowerCase();

    // Search filter
    const searchMatch = template.title.toLowerCase().includes(searchValue.toLowerCase()) || template.description?.toLowerCase().includes(searchValue.toLowerCase()) || template.category.toLowerCase().includes(searchValue.toLowerCase());

    // Price filter
    const priceMatch = Number(template.price) >= priceRange[0] && Number(template.price) <= priceRange[1];

    // Tag filter
    const tagMatch = !selectedTag || template.tags && template.tags.some(tag => tag.toLowerCase().includes(selectedTag.toLowerCase()));
    return categoryMatch && searchMatch && priceMatch && tagMatch;
  });
  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag);
    setSearchValue(''); // Clear search when filtering by tag
  };
  const clearTagFilter = () => {
    setSelectedTag('');
  };
  return <div className="flex h-screen overflow-hidden bg-gradient-to-br from-background to-background/80">
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
          onRefresh={refetch}
          isLoading={isLoading}
        />

        <main className="flex-1 overflow-y-auto p-3 md:p-6 lg:container pb-20 md:pb-6">
          <div className="flex flex-col gap-3 md:gap-4 mb-4 md:mb-6">
            <div>
              {selectedTag && <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm bg-[#8B5CF6]/10 text-[#8B5CF6] px-2 py-1 rounded-full">
                      Tag: {selectedTag}
                    </span>
                    <Button variant="ghost" size="sm" onClick={clearTagFilter} className="h-6 px-2 text-xs">
                      Clear
                    </Button>
                  </div>}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="lg:col-span-3">
              <TemplateGrid templates={filteredTemplates} isLoading={isLoading} onRefresh={refetch} onTagFilter={handleTagFilter} />
            </div>
            
            {/* Hide sidebar content on mobile, show only on lg+ */}
            <div className="hidden lg:block lg:col-span-1 space-y-4">
              <InsightsSidebar />
              <CategoryCards websiteCount={websites.length} />
            </div>
          </div>
        </main>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>;
};
export default Dashboard;
