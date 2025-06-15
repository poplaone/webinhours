
import React from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DashboardHeaderProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  priceRange?: [number, number];
  onPriceRangeChange?: (range: [number, number]) => void;
  templateCount?: number;
  onRefresh?: () => void;
  isLoading?: boolean;
}

const categories = [{
  value: 'all',
  label: 'All Categories'
}, {
  value: 'E-commerce',
  label: 'E-commerce'
}, {
  value: 'Corporate',
  label: 'Corporate'
}, {
  value: 'SaaS',
  label: 'SaaS'
}, {
  value: 'Portfolio',
  label: 'Portfolio'
}, {
  value: 'Restaurant',
  label: 'Restaurant'
}, {
  value: 'Real Estate',
  label: 'Real Estate'
}];

export function DashboardHeader({
  searchValue = "",
  onSearchChange,
  selectedCategory = "all",
  onCategoryChange,
  priceRange = [0, 500],
  onPriceRangeChange,
  templateCount = 0,
  onRefresh,
  isLoading = false
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Search Bar on the absolute left - wider */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-10 h-10 w-full"
            />
          </div>
        </div>
        
        {/* Right side - Template count, refresh, and filters */}
        <div className="flex items-center gap-4">
          {/* Template count and refresh button */}
          <div className="flex items-center gap-3 whitespace-nowrap">
            <p className="text-sm text-blue-600">
              Showing {templateCount} templates
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onRefresh} 
              disabled={isLoading} 
              className="h-8 w-8 p-0"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border shadow-lg">
              {categories.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Price Range Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                ${priceRange[0]} - ${priceRange[1]}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-background border border-border shadow-lg" align="end">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="px-3">
                    <Slider 
                      min={0} 
                      max={500} 
                      step={10} 
                      value={priceRange} 
                      onValueChange={value => onPriceRangeChange?.(value as [number, number])} 
                      className="w-full" 
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
