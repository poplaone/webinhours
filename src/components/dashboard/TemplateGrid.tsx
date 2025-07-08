
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, TrendingUp, Users, Radio, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Website } from '@/types/website';

interface TemplateGridProps {
  templates: Website[];
  isLoading: boolean;
  onRefresh: () => void;
  onTagFilter?: (tag: string) => void;
}

export const TemplateGrid = ({ templates, isLoading, onRefresh, onTagFilter }: TemplateGridProps) => {
  const navigate = useNavigate();

  const viewTemplateDetail = (template: Website) => {
    const slug = template.slug || template.id;
    navigate(`/site/${slug}`);
  };

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation(); // Prevent card click
    if (onTagFilter) {
      onTagFilter(tag);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-3 md:gap-5 lg:gap-6 xl:gap-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 md:h-56 lg:h-64 bg-gray-200 rounded-t-lg"></div>
            <CardContent className="p-3 md:p-4 lg:p-5">
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
      <div className="col-span-full text-center py-8 md:py-12 lg:py-16">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center">
            <Star className="w-8 h-8 lg:w-10 lg:h-10 text-[#8B5CF6]" />
          </div>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-2">No templates found</p>
          <p className="text-muted-foreground text-sm md:text-base lg:text-lg mb-6">
            Try adjusting your search or filters to find what you're looking for
          </p>
          <div className="flex gap-3 justify-center">
            <Button 
              variant="outline"
              onClick={onRefresh}
              size="sm"
              className="lg:px-6 lg:py-3"
            >
              Refresh
            </Button>
            <Button 
              className="bg-[#8B5CF6] hover:bg-[#7C3AED] lg:px-6 lg:py-3"
              onClick={() => navigate('/admin-panel')}
              size="sm"
            >
              Upload Website
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-3 md:gap-5 lg:gap-6 xl:gap-8">
      {templates.map((template) => (
        <Card 
          key={template.id} 
          className="border border-border/40 bg-card/50 backdrop-blur overflow-hidden flex flex-col hover:shadow-lg hover:shadow-[#8B5CF6]/10 transition-all duration-300 group relative h-full cursor-pointer hover:scale-[1.02] lg:hover:scale-[1.03]"
          onClick={() => viewTemplateDetail(template)}
          title={`View ${template.title}`}
        >
          <div className="h-48 md:h-56 lg:h-64 xl:h-72 overflow-hidden relative">
            <img 
              src={template.thumbnail_url || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&h=256&q=80"} 
              alt={template.title} 
              className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&h=256&q=80";
              }}
            />
            <div className="absolute top-2 left-2 lg:top-3 lg:left-3 flex gap-2">
              {template.is_featured && (
                <Badge className="bg-[#8B5CF6] text-white text-xs lg:text-sm px-2 py-1 rounded-full font-medium">
                  <Star className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                  Featured
                </Badge>
              )}
              <Badge 
                variant="secondary" 
                className="text-xs lg:text-sm px-2 py-1 rounded-full font-medium capitalize"
              >
                {template.status}
              </Badge>
            </div>
            {template.profiles?.avatar_url && (
              <div className="absolute bottom-2 right-2 lg:bottom-3 lg:right-3">
                <img 
                  src={template.profiles.avatar_url} 
                  alt={template.profiles.full_name || 'Author'}
                  className="w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 border-white shadow-sm"
                />
              </div>
            )}
          </div>
          
          <CardContent className="p-3 md:p-4 lg:p-5 xl:p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-2 lg:mb-3">
              <h3 className="font-semibold text-base md:text-lg lg:text-xl hover:text-[#8B5CF6] transition-colors line-clamp-1">
                {template.title}
              </h3>
              <div className="flex items-center gap-1 text-[#8B5CF6] font-bold text-sm md:text-base lg:text-lg">
                <DollarSign className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5" />
                <span>{Number(template.price) === 0 ? 'Free' : Number(template.price)}</span>
              </div>
            </div>
            
            <p className="text-xs md:text-sm lg:text-base text-muted-foreground mb-2 lg:mb-3 line-clamp-2">
              {template.description || "No description available"}
            </p>

            {template.profiles?.full_name && (
              <p className="text-xs lg:text-sm text-muted-foreground mb-2 lg:mb-3">
                by {template.profiles.full_name}
              </p>
            )}
            
            <div className="grid grid-cols-3 gap-1 md:gap-2 lg:gap-3 text-xs lg:text-sm border-t border-border/40 pt-2 lg:pt-3 mb-2 lg:mb-3">
              <div className="flex flex-col bg-[#8B5CF6]/5 p-1 md:p-2 lg:p-3 rounded-md">
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                  <TrendingUp className="h-2 w-2 md:h-3 md:w-3 lg:h-4 lg:w-4 text-[#8B5CF6]" />
                  <span className="text-xs lg:text-sm">Sales</span>
                </div>
                <div className="font-medium text-xs md:text-sm lg:text-base text-emerald-500">
                  {template.downloads_count || 0}
                </div>
              </div>
              
              <div className="flex flex-col bg-[#8B5CF6]/5 p-1 md:p-2 lg:p-3 rounded-md">
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                  <Users className="h-2 w-2 md:h-3 md:w-3 lg:h-4 lg:w-4 text-[#8B5CF6]" />
                  <span className="text-xs lg:text-sm">Rating</span>
                </div>
                <div className="font-medium text-xs md:text-sm lg:text-base">
                  ⭐ {template.rating_average?.toFixed(1) || '0.0'}
                </div>
              </div>
              
              <div className="flex flex-col bg-[#8B5CF6]/5 p-1 md:p-2 lg:p-3 rounded-md">
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                  <Radio className="h-2 w-2 md:h-3 md:w-3 lg:h-4 lg:w-4 text-[#8B5CF6]" />
                  <span className="text-xs lg:text-sm">Views</span>
                </div>
                <div className="font-medium text-xs md:text-sm lg:text-base text-emerald-500">
                  {template.views_count || 0}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 lg:gap-2">
              {template.tags?.slice(0, 2).map((tag, index) => (
                <button
                  key={index}
                  onClick={(e) => handleTagClick(e, tag)}
                  className="bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs lg:text-sm px-2 lg:px-3 py-1 lg:py-1.5 rounded-full hover:bg-[#8B5CF6]/20 transition-colors cursor-pointer"
                  title={`Filter by ${tag}`}
                >
                  {tag}
                </button>
              ))}
              {template.tags && template.tags.length > 2 && (
                <span className="text-xs lg:text-sm text-muted-foreground px-1 py-1 lg:px-2 lg:py-1.5">
                  +{template.tags.length - 2} more
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
