
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Common FMCG categories
const fmcgCategories = [
  "Beverages",
  "Food & Snacks",
  "Personal Care",
  "Household Products",
  "Baby Care",
  "Pet Care",
  "Health & Wellness",
  "Beauty Products",
  "Dairy Products",
  "Confectionery"
];

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

const CategoryFilter = ({ selectedCategories, onCategoryChange }: CategoryFilterProps) => {
  // Toggle individual category selection
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  // Select all categories
  const selectAll = () => {
    onCategoryChange([...fmcgCategories]);
  };

  // Clear all selections
  const clearAll = () => {
    onCategoryChange([]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2 ml-4">
          <Filter className="h-4 w-4" />
          {selectedCategories.length > 0 ? `${selectedCategories.length} Categories` : "Filter Categories"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>FMCG Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {fmcgCategories.map((category) => (
          <DropdownMenuCheckboxItem
            key={category}
            checked={selectedCategories.includes(category)}
            onCheckedChange={() => toggleCategory(category)}
          >
            {category}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <div className="flex justify-between px-2 py-1.5">
          <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs">
            Clear All
          </Button>
          <Button variant="ghost" size="sm" onClick={selectAll} className="text-xs">
            Select All
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryFilter;
