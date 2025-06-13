
import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

// Website categories with subcategories
const websiteCategories = {
  "Website": [
    "E-commerce",
    "Corporate", 
    "Portfolio",
    "Blog",
    "News",
    "Educational"
  ],
  "SaaS": [
    "Dashboard",
    "Analytics",
    "CRM",
    "Project Management",
    "Communication",
    "Finance"
  ],
  "Landing Page": [
    "Product Launch",
    "Lead Generation",
    "Event",
    "App Download",
    "Newsletter",
    "Webinar"
  ],
  "Funnel": [
    "Sales Funnel",
    "Lead Magnet",
    "Squeeze Page",
    "Thank You Page",
    "Upsell Page",
    "Checkout Page"
  ]
};

const businessCategories = {
  "Health & Wellness": [
    "Fitness",
    "Nutrition",
    "Mental Health",
    "Medical",
    "Spa & Beauty",
    "Yoga & Meditation"
  ],
  "Food & Beverage": [
    "Restaurant",
    "Café",
    "Bakery",
    "Food Delivery",
    "Catering",
    "Bar & Nightlife"
  ],
  "Beauty & Fashion": [
    "Beauty Salon",
    "Fashion Brand",
    "Jewelry",
    "Cosmetics",
    "Hair Care",
    "Skincare"
  ],
  "Technology": [
    "Software",
    "AI & ML",
    "Cybersecurity",
    "Mobile Apps",
    "Web Development",
    "IT Services"
  ],
  "Business Services": [
    "Consulting",
    "Marketing Agency",
    "Legal Services",
    "Accounting",
    "Real Estate",
    "Insurance"
  ],
  "Education": [
    "Online Courses",
    "School",
    "University",
    "Training",
    "Tutoring",
    "Language Learning"
  ]
};

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

const CategoryFilter = ({ selectedCategories, onCategoryChange }: CategoryFilterProps) => {
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

  // Toggle individual category selection
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  // Select all categories from a main category
  const selectAllFromCategory = (mainCategory: string, subcategories: string[]) => {
    const newSelections = subcategories.filter(sub => !selectedCategories.includes(sub));
    onCategoryChange([...selectedCategories, ...newSelections]);
  };

  // Clear all selections from a main category
  const clearAllFromCategory = (subcategories: string[]) => {
    onCategoryChange(selectedCategories.filter(cat => !subcategories.includes(cat)));
  };

  // Select all categories
  const selectAll = () => {
    const allCategories = [
      ...Object.values(websiteCategories).flat(),
      ...Object.values(businessCategories).flat()
    ];
    onCategoryChange(allCategories);
  };

  // Clear all selections
  const clearAll = () => {
    onCategoryChange([]);
  };

  const toggleSubmenu = (category: string) => {
    setOpenSubmenus(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2 ml-4">
          <Filter className="h-4 w-4" />
          {selectedCategories.length > 0 ? `${selectedCategories.length} Categories` : "Filter Categories"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto">
        <DropdownMenuLabel>Website Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Website Type Categories */}
        <div className="space-y-1">
          {Object.entries(websiteCategories).map(([mainCategory, subcategories]) => (
            <div key={mainCategory}>
              <div 
                className="flex items-center justify-between px-2 py-1.5 hover:bg-accent rounded cursor-pointer"
                onClick={() => toggleSubmenu(mainCategory)}
              >
                <span className="font-medium text-sm">{mainCategory}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {subcategories.filter(sub => selectedCategories.includes(sub)).length}/{subcategories.length}
                  </span>
                  {openSubmenus.includes(mainCategory) ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </div>
              </div>
              
              {openSubmenus.includes(mainCategory) && (
                <div className="ml-4 space-y-1 border-l border-border pl-2">
                  <div className="flex justify-between px-2 py-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => selectAllFromCategory(mainCategory, subcategories)}
                      className="text-xs h-6 px-2"
                    >
                      Select All
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => clearAllFromCategory(subcategories)}
                      className="text-xs h-6 px-2"
                    >
                      Clear
                    </Button>
                  </div>
                  {subcategories.map((subcategory) => (
                    <DropdownMenuCheckboxItem
                      key={subcategory}
                      checked={selectedCategories.includes(subcategory)}
                      onCheckedChange={() => toggleCategory(subcategory)}
                      className="ml-2"
                    >
                      {subcategory}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Business Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Business Type Categories */}
        <div className="space-y-1">
          {Object.entries(businessCategories).map(([mainCategory, subcategories]) => (
            <div key={mainCategory}>
              <div 
                className="flex items-center justify-between px-2 py-1.5 hover:bg-accent rounded cursor-pointer"
                onClick={() => toggleSubmenu(mainCategory)}
              >
                <span className="font-medium text-sm">{mainCategory}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {subcategories.filter(sub => selectedCategories.includes(sub)).length}/{subcategories.length}
                  </span>
                  {openSubmenus.includes(mainCategory) ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </div>
              </div>
              
              {openSubmenus.includes(mainCategory) && (
                <div className="ml-4 space-y-1 border-l border-border pl-2">
                  <div className="flex justify-between px-2 py-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => selectAllFromCategory(mainCategory, subcategories)}
                      className="text-xs h-6 px-2"
                    >
                      Select All
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => clearAllFromCategory(subcategories)}
                      className="text-xs h-6 px-2"
                    >
                      Clear
                    </Button>
                  </div>
                  {subcategories.map((subcategory) => (
                    <DropdownMenuCheckboxItem
                      key={subcategory}
                      checked={selectedCategories.includes(subcategory)}
                      onCheckedChange={() => toggleCategory(subcategory)}
                      className="ml-2"
                    >
                      {subcategory}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

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
