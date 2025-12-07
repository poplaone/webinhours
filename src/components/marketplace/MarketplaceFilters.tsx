import { useState, useCallback, useEffect, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
}

export const MarketplaceFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories,
}: MarketplaceFiltersProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Simple debounced search without external utility
  const debouncedSetSearchTerm = useMemo(() => {
    let timeout: NodeJS.Timeout;
    return (term: string) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setSearchTerm(term), 300);
    };
  }, [setSearchTerm]);

  // Update local search term when prop changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  // Handle search input change
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    debouncedSetSearchTerm(value);
  }, [debouncedSetSearchTerm]);

  // Memoized handlers to prevent re-renders
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, [setSelectedCategory]);

  const handleSortChange = useCallback((sort: string) => {
    setSortBy(sort);
  }, [setSortBy]);

  const handleFilterClose = useCallback(() => {
    setIsFiltersOpen(false);
  }, []);

  // Memoized sort options to prevent re-creation
  const sortOptions = useMemo(() => [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ], []);

  // Get current filter labels for display
  const selectedCategoryLabel = useMemo(() => 
    categories.find(cat => cat.id === selectedCategory)?.name || 'All',
    [categories, selectedCategory]
  );

  const sortByLabel = useMemo(() => {
    const option = sortOptions.find(opt => opt.value === sortBy);
    return option?.label || 'Sort by';
  }, [sortBy, sortOptions]);

  return (
    <div className="bg-card/50 backdrop-blur rounded-xl border border-border/40 p-4 px-[23px] py-[10px] mx-[3px]">
      {/* Desktop Layout */}
      <div className="hidden sm:flex gap-4 items-center flex-wrap">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search websites..." 
            value={localSearchTerm} 
            onChange={handleSearchChange} 
            className="pl-10" 
          />
        </div>

        <div className="min-w-[160px]">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-[160px]">
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
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
            <Input 
              placeholder="Search websites..." 
              value={localSearchTerm} 
              onChange={handleSearchChange} 
              className="pl-9 pr-3 h-9 text-sm" 
            />
          </div>

          {/* Mobile Filter Button */}
          <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="shrink-0 w-9 h-9 p-0 flex items-center justify-center" 
                aria-label="Filters"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl px-4 pt-6 pb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filter & Sort</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleFilterClose} 
                  className="text-muted-foreground"
                >
                  Done
                </Button>
              </div>
              
              <div className="space-y-6 overflow-y-auto max-h-[calc(85vh-100px)] pr-2 -mr-2">
                {/* Category Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Category</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map(category => (
                      <Button 
                        key={category.id} 
                        variant={selectedCategory === category.id ? 'default' : 'outline'} 
                        size="sm" 
                        className={`justify-start h-auto py-1.5 px-3 text-left text-sm font-normal ${selectedCategory === category.id ? 'bg-primary/90' : ''}`} 
                        onClick={() => handleCategoryChange(category.id)}
                      >
                        <span className="truncate">{category.name}</span>
                        <span className="ml-1.5 text-xs opacity-70">({category.count})</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Sort By</h4>
                  <div className="space-y-2">
                    {sortOptions.map(option => (
                      <Button 
                        key={option.value} 
                        variant={sortBy === option.value ? 'secondary' : 'ghost'} 
                        size="sm" 
                        className={`w-full justify-start ${sortBy === option.value ? 'bg-secondary/80' : ''}`} 
                        onClick={() => handleSortChange(option.value)}
                      >
                        {sortBy === option.value && (
                          <span className="w-1 h-4 bg-primary rounded-full mr-3"></span>
                        )}
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};
