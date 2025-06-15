
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, ShoppingCart, DollarSign, TrendingUp, Users, Radio } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Website } from '@/types/website';

interface TemplateGridProps {
  templates: Website[];
  isLoading: boolean;
  onRefresh: () => void;
}

export const TemplateGrid = ({ templates, isLoading, onRefresh }: TemplateGridProps) => {
  const navigate = useNavigate();

  const viewTemplateDetail = (templateId: string) => {
    navigate(`/site-details/${templateId}`);
  };

  const viewTemplateDemo = (templateId: string) => {
    navigate(`/concept-testing/${templateId}`);
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
          className="border border-border/40 bg-card/50 backdrop-blur overflow-hidden flex flex-col hover:shadow-lg transition-shadow group relative h-full cursor-pointer"
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
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 md:gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        viewTemplateDemo(template.id);
                      }} 
                      variant="secondary" 
                      className="bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                      size="sm"
                    >
                      <Eye className="mr-1 md:mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Preview</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View live demo</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        viewTemplateDetail(template.id);
                      }} 
                      variant="secondary" 
                      className="bg-[#8B5CF6]/80 text-white backdrop-blur-sm hover:bg-[#8B5CF6]"
                      size="sm"
                    >
                      <ShoppingCart className="mr-1 md:mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Buy</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Purchase template</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <CardContent className="p-2 md:p-3 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-base md:text-lg cursor-pointer hover:text-[#8B5CF6] transition-colors line-clamp-1" onClick={() => viewTemplateDetail(template.id)}>{template.title}</h3>
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
                <span key={index} className="bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs px-1 md:px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
