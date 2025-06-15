
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface WebsitePreviewProps {
  website: any;
}

export function WebsitePreview({ website }: WebsitePreviewProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Website Preview</h3>
        {website.thumbnail_url && (
          <img 
            src={website.thumbnail_url} 
            alt={website.title}
            className="w-full h-48 object-cover rounded-lg border"
          />
        )}
      </div>
      
      <div>
        <h4 className="font-medium mb-1">Description</h4>
        <p className="text-sm text-gray-600">{website.description}</p>
      </div>

      <div>
        <h4 className="font-medium mb-1">Category</h4>
        <Badge variant="secondary">{website.category}</Badge>
      </div>

      <div>
        <h4 className="font-medium mb-1">Price</h4>
        <span className="text-lg font-semibold text-green-600">
          ${website.price.toFixed(2)}
        </span>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Links</h4>
        {website.preview_url && (
          <Button size="sm" variant="outline" asChild>
            <a href={website.preview_url} target="_blank" rel="noopener noreferrer">
              View Preview
            </a>
          </Button>
        )}
        {website.demo_url && (
          <Button size="sm" variant="outline" asChild className="ml-2">
            <a href={website.demo_url} target="_blank" rel="noopener noreferrer">
              View Demo
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
