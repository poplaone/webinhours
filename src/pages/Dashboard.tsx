
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SideNavbar } from '@/components/layout/SideNavbar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { TemplateGrid } from '@/components/dashboard/TemplateGrid';
import { InsightsSidebar } from '@/components/dashboard/InsightsSidebar';
import { useWebsites } from '@/hooks/useWebsites';

const Dashboard = () => {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  
  const { data: websites = [], isLoading, refetch } = useWebsites();

  // Filter websites based on search, category, and price
  const filteredWebsites = websites.filter(website => {
    const matchesSearch = website.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                         website.description?.toLowerCase().includes(searchValue.toLowerCase()) ||
                         website.tags?.some(tag => tag.toLowerCase().includes(searchValue.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || website.category === selectedCategory;
    
    const price = Number(website.price) || 0;
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice && website.status === 'approved';
  });

  const handleRefresh = () => {
    refetch();
  };

  const handleTagFilter = (tag: string) => {
    setSearchValue(tag);
  };

  return (
    <div className="min-h-screen bg-background">
      <SideNavbar />
      
      <div className="lg:pl-72">
        <DashboardHeader
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          templateCount={filteredWebsites.length}
          onRefresh={handleRefresh}
          isLoading={isLoading}
        />
        
        <main className="container mx-auto p-3 md:p-4">
          <div className="flex gap-3 md:gap-4">
            <div className="flex-1">
              <TemplateGrid 
                templates={filteredWebsites}
                isLoading={isLoading}
                onRefresh={handleRefresh}
                onTagFilter={handleTagFilter}
              />
            </div>
            
            <div className="hidden lg:block w-80 flex-shrink-0">
              <InsightsSidebar />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
