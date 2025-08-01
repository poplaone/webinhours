
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Globe, Bot } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Category {
  id: string;
  name: string;
  count: number;
}

interface MarketplaceFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  categories: Category[];
  activeTab: 'websites' | 'ai-agents';
  setActiveTab: (tab: 'websites' | 'ai-agents') => void;
}

export const MarketplaceFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories,
  activeTab,
  setActiveTab
}: MarketplaceFiltersProps) => {
  return (
    <motion.div
      className="bg-card/50 backdrop-blur rounded-xl p-6 mb-8 border border-border/40"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="flex flex-col sm:flex-row gap-4 items-center flex-wrap">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'websites' | 'ai-agents')} className="w-auto">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="websites" className="flex items-center gap-2 px-3 py-1.5">
              <Globe className="h-4 w-4" />
              <span className="hidden md:inline">Websites</span>
            </TabsTrigger>
            <TabsTrigger value="ai-agents" className="flex items-center gap-2 px-3 py-1.5">
              <Bot className="h-4 w-4" />
              <span className="hidden md:inline">AI Agents</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="w-full lg:w-48">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full min-w-[160px]">
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
        </div>
        
        <div className="w-full lg:w-48">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full min-w-[160px]">
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
      </div>
    </motion.div>
  );
};
