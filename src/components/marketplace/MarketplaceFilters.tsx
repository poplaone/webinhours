import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Globe, Bot, ChevronDown } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Get current filter labels for display
  const selectedCategoryLabel = categories.find(cat => cat.id === selectedCategory)?.name || 'All';
  const sortByLabel = {
    'popular': 'Most Popular',
    'newest': 'Newest',
    'rating': 'Highest Rated',
    'price-low': 'Price: Low to High',
    'price-high': 'Price: High to Low'
  }[sortBy] || 'Sort by';
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.8,
    delay: 0.2
  }} className="bg-card/50 backdrop-blur rounded-xl border border-border/40 p-4 px-[41px]">
      {/* Desktop Layout */}
      <div className="hidden sm:flex gap-4 items-center flex-wrap">
        <Tabs value={activeTab} onValueChange={value => setActiveTab(value as 'websites' | 'ai-agents')} className="w-auto">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="websites" className="flex items-center gap-2 px-3 py-1.5 text-base">
              <Globe className="h-4 w-4" />
              Websites
            </TabsTrigger>
            <TabsTrigger value="ai-agents" className="flex items-center gap-2 px-3 py-1.5 text-base">
              <Bot className="h-4 w-4" />
              AI Agents
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder={`Search ${activeTab}...`} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
        </div>

        <div className="min-w-[160px]">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => <SelectItem key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-[160px]">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full">
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

      {/* Mobile Layout */}
      <div className="sm:hidden space-y-3">
        <div className="flex gap-2">
          {/* Search Bar - More compact */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder={`Search ${activeTab}...`} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9 pr-3 h-9 text-sm" />
          </div>

          {/* Mobile Filter Button */}
          <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 w-9 h-9 p-0 flex items-center justify-center" aria-label="Filters">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl px-4 pt-6 pb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filter & Sort</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsFiltersOpen(false)} className="text-muted-foreground">
                  Done
                </Button>
              </div>
              
              <div className="space-y-6 overflow-y-auto max-h-[calc(85vh-100px)] pr-2 -mr-2">
                {/* Tab Selector */}
                <div>
                  <h4 className="text-sm font-medium mb-3">View</h4>
                  <Tabs value={activeTab} onValueChange={value => setActiveTab(value as 'websites' | 'ai-agents')} className="w-full">
                    <TabsList className="grid grid-cols-2 w-full bg-muted/50 h-10">
                      <TabsTrigger value="websites" className="flex items-center gap-1.5 text-sm py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                        <Globe className="h-3.5 w-3.5" />
                        <span>Websites</span>
                      </TabsTrigger>
                      <TabsTrigger value="ai-agents" className="flex items-center gap-1.5 text-sm py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                        <Bot className="h-3.5 w-3.5" />
                        <span>AI Agents</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Category Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Category</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map(category => <Button key={category.id} variant={selectedCategory === category.id ? 'default' : 'outline'} size="sm" className={`justify-start h-auto py-1.5 px-3 text-left text-sm font-normal ${selectedCategory === category.id ? 'bg-primary/90' : ''}`} onClick={() => setSelectedCategory(category.id)}>
                        <span className="truncate">{category.name}</span>
                        <span className="ml-1.5 text-xs opacity-70">({category.count})</span>
                      </Button>)}
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Sort By</h4>
                  <div className="space-y-2">
                    {[{
                    value: 'popular',
                    label: 'Most Popular'
                  }, {
                    value: 'newest',
                    label: 'Newest'
                  }, {
                    value: 'rating',
                    label: 'Highest Rated'
                  }, {
                    value: 'price-low',
                    label: 'Price: Low to High'
                  }, {
                    value: 'price-high',
                    label: 'Price: High to Low'
                  }].map(option => <Button key={option.value} variant={sortBy === option.value ? 'secondary' : 'ghost'} size="sm" className={`w-full justify-start ${sortBy === option.value ? 'bg-secondary/80' : ''}`} onClick={() => setSortBy(option.value)}>
                        {sortBy === option.value && <span className="w-1 h-4 bg-primary rounded-full mr-3"></span>}
                        {option.label}
                      </Button>)}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.div>;
};