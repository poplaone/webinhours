
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash, Star } from 'lucide-react';
import { Website } from '@/hooks/useWebsites';

interface WebsiteGridProps {
  websites: Website[];
  isLoading: boolean;
  onReviewWebsite: (website: Website) => void;
  onEditWebsite: (website: Website) => void;
  onDeleteWebsite: (websiteId: string) => void;
  formatPrice: (price: number) => string;
  getStatusColor: (status: string) => string;
}

export function WebsiteGrid({
  websites,
  isLoading,
  onReviewWebsite,
  onEditWebsite,
  onDeleteWebsite,
  formatPrice,
  getStatusColor
}: WebsiteGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg"></div>
            <CardContent className="p-4">
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {websites.map((website) => (
        <Card key={website.id} className="group hover:shadow-lg transition-shadow">
          <div className="relative">
            {website.thumbnail_url && (
              <img 
                src={website.thumbnail_url} 
                alt={website.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            {website.is_featured && (
              <Badge className="absolute top-2 right-2 bg-purple-600">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2 line-clamp-1">{website.title}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {website.description}
            </p>
            
            <div className="flex items-center justify-between mb-3">
              <Badge className={getStatusColor(website.status)}>
                {website.status}
              </Badge>
              <span className="font-semibold text-green-600">
                {formatPrice(website.price)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Eye className="h-4 w-4" />
              <span>{website.views_count}</span>
              <span>•</span>
              <span>⭐ {website.rating_average?.toFixed(1) || '0.0'}</span>
            </div>

            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onEditWebsite(website)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onReviewWebsite(website)}
              >
                Review
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onDeleteWebsite(website.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
