
import React, { useRef, useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import './masonry.css';
import ColorThief from 'color-thief-browser';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Star } from 'lucide-react';
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


const TemplateCard: React.FC<{template: Website; onClick: (t: Website) => void;}> = ({ template, onClick }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  // Use a soft purpleish white background, matching the theme
  // Use a more purpleish white background
  const cardBg = 'bg-[#f6f0ff] dark:bg-[#232136]';

  return (
    <Card
      key={template.id}
      className={`border-2 border-transparent ${cardBg} overflow-hidden flex flex-col group relative h-full cursor-pointer rounded-2xl shadow-sm hover:shadow-2xl hover:border-[#8B5CF6] hover:scale-[1.025] transition-all duration-300`}
      onClick={() => onClick(template)}
      title={`View ${template.title}`}
    >
      <div className="aspect-[16/10] w-full overflow-hidden relative">
        <img
          ref={imgRef}
          crossOrigin="anonymous"
          src={template.thumbnail_url || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80'}
          alt={template.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80';
          }}
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          <span className="bg-white/80 dark:bg-[#181825]/80 text-xs font-semibold px-2 py-0.5 rounded-full shadow border border-border/30 capitalize w-fit mb-1">
            {template.category}
          </span>
          {template.is_featured && (
            <Badge className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white text-xs xl:text-sm px-3 py-1 rounded-full font-semibold shadow-lg">
              <Star className="w-4 h-4 mr-1" />
              Featured
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-5 xl:p-6 flex flex-col flex-grow bg-transparent min-h-[110px]">
        <h3 className="font-semibold text-base xl:text-lg text-[#8B5CF6] dark:text-[#a78bfa] hover:text-[#7C3AED] transition-colors line-clamp-2 mb-2">
          {template.title}
        </h3>
        {template.description && (
          <p className="text-gray-800 dark:text-gray-200 text-xs xl:text-sm mb-2 line-clamp-2">{template.description}</p>
        )}
        <div className="flex flex-wrap gap-2 mb-2">
          {template.tags && template.tags.slice(0, 3).map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5 rounded-full capitalize">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-1 text-[#8B5CF6] font-bold text-sm xl:text-base mt-auto pt-2">
          <DollarSign className="h-4 w-4 xl:h-5 xl:w-5" />
          <span>{Number(template.price) === 0 ? 'Free' : Number(template.price)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export const TemplateGrid = ({ templates, isLoading, onRefresh, onTagFilter }: TemplateGridProps) => {
  const navigate = useNavigate();

  const viewTemplateDetail = (template: Website) => {
    const slug = template.slug || template.id;
    navigate(`/site/${slug}`);
  };

  if (isLoading) {
    return (
      <Masonry
        breakpointCols={{ default: 4, 1600: 3, 1200: 2, 700: 1 }}
        className="masonry-grid"
        columnClassName="masonry-col"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="mb-5 animate-pulse rounded-2xl border-2 border-transparent bg-gradient-to-br from-[#f5f3ff] to-[#e0e7ff] break-inside-avoid">
            <div className="h-52 md:h-64 bg-gray-200 rounded-t-2xl"></div>
            <CardContent className="p-5">
              <div className="h-5 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-5"></div>
              <div className="flex justify-between">
                <div className="h-6 bg-gray-200 rounded w-20"></div>
                <div className="h-6 bg-gray-200 rounded w-24"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </Masonry>
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
    <Masonry
      breakpointCols={{ default: 4, 1600: 3, 1200: 2, 700: 1 }}
      className="masonry-grid"
      columnClassName="masonry-col"
    >
      {templates.map((template) => (
        <div key={template.id} className="mb-5 break-inside-avoid">
          <TemplateCard template={template} onClick={viewTemplateDetail} />
        </div>
      ))}
    </Masonry>
  );
};
