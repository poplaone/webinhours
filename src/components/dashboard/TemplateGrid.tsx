
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, TrendingUp, Users, Radio } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Website } from '@/types/website';

interface TemplateGridProps {
  templates: Website[];
  isLoading: boolean;
  onRefresh: () => void;
  onTagFilter?: (tag: string) => void;
}

export const TemplateGrid = ({ templates, isLoading, onRefresh, onTagFilter }: TemplateGridProps) => {
  const navigate = useNavigate();

  const viewTemplateDetail = (templateId: string) => {
    navigate(`/site-details/${templateId}`);
  };

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation(); // Prevent card click
    if (onTagFilter) {
      onTagFilter(tag);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 md:h-64 bg-gray-200 rounded-t-lg"></div>
            <CardContent className="p-3 md:p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-4"></div>
              <div className="flex justify-between">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div className="col-span-full text-center py-8 md:py-12">
        <p className="text-lg md:text-xl text-muted-foreground mb-4">No templates found</p>
        <p className="text-muted-foreground text-sm md:text-base">Upload your first website template to get started</p>
        <Button 
          className="mt-4 bg-[#8B5CF6] hover:bg-[#7C3AED]"
          onClick={() => navigate('/admin-panel')}
          size="sm"
        >
          Upload Website
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
      {templates.map((template) => (
        <Card 
          key={template.id} 
          className="border border-border/40 bg-card/50 backdrop-blur overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 group relative h-full cursor-pointer hover:scale-[1.02]"
          onClick={() => viewTemplateDetail(template.id)}
        >
          <div className="h-48 md:h-64 overflow-hidden relative">
            <img 
              src={template.thumbnail_url || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&h=256&q=80"} 
              alt={template.title} 
              className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
            />
            <div className="absolute top-2 left-2">
              <span className="bg-[#8B5CF6] text-white text-xs px-2 py-1 rounded-full font-medium">
                {template.is_featured ? "Featured" : template.status === 'approved' ? "Approved" : template.status}
              </span>
            </div>
          </div>
          
          <CardContent className="p-2 md:p-3 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-base md:text-lg hover:text-[#8B5CF6] transition-colors line-clamp-1">{template.title}</h3>
              <div className="flex items-center gap-1 text-[#8B5CF6] font-bold text-sm md:text-base">
                <DollarSign className="h-3 w-3 md:h-4 md:w-4" />
                <span>{Number(template.price) === 0 ? 'Free' : Number(template.price)}</span>
              </div>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mb-2 line-clamp-2">{template.description || "No description available"}</p>
            
            <div className="grid grid-cols-3 gap-1 md:gap-2 text-xs border-t border-border/40 pt-2 mb-2">
              <div className="flex flex-col bg-[#8B5CF6]/5 p-1 md:p-2 rounded-md">
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                  <TrendingUp className="h-2 w-2 md:h-3 md:w-3 text-[#8B5CF6]" />
                  <span className="text-xs">Sales</span>
                </div>
                <div className="font-medium text-xs md:text-sm text-emerald-500">
                  {template.downloads_count || 0}
                </div>
              </div>
              
              <div className="flex flex-col bg-[#8B5CF6]/5 p-1 md:p-2 rounded-md">
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                  <Users className="h-2 w-2 md:h-3 md:w-3 text-[#8B5CF6]" />
                  <span className="text-xs">Rating</span>
                </div>
                <div className="font-medium text-xs md:text-sm">
                  ⭐ {template.rating_average?.toFixed(1) || '0.0'}
                </div>
              </div>
              
              <div className="flex flex-col bg-[#8B5CF6]/5 p-1 md:p-2 rounded-md">
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                  <Radio className="h-2 w-2 md:h-3 md:w-3 text-[#8B5CF6]" />
                  <span className="text-xs">Views</span>
                </div>
                <div className="font-medium text-xs md:text-sm text-emerald-500">
                  {template.views_count || 0}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {template.tags?.slice(0, 2).map((tag, index) => (
                <button
                  key={index}
                  onClick={(e) => handleTagClick(e, tag)}
                  className="bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs px-1 md:px-2 py-1 rounded-full hover:bg-[#8B5CF6]/20 transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
