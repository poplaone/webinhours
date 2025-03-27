
import React from 'react';
import { Filter } from 'lucide-react';
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  allCategories: string[];
  selectedCategories: string[];
  onCategoryClick: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  allCategories, 
  selectedCategories,
  onCategoryClick 
}) => {
  return (
    <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
      <div className="flex items-center text-muted-foreground text-sm">
        <Filter className="h-4 w-4 mr-1" />
        Filter:
      </div>
      
      {allCategories.map(category => (
        <button
          key={category}
          onClick={() => onCategoryClick(category)}
          className={cn(
            "px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors",
            selectedCategories.includes(category) 
              ? "bg-[#8B5CF6] text-white" 
              : "bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
