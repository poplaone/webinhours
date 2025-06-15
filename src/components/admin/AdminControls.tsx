
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Download, Star } from 'lucide-react';
import { TagsManager } from './TagsManager';
import { statusOptions } from './types';

interface AdminControlsProps {
  status: 'pending' | 'approved' | 'featured' | 'rejected' | 'archived';
  viewsCount: number;
  downloadsCount: number;
  ratingAverage: number;
  ratingCount: number;
  tags: string[];
  newTag: string;
  isFeatured: boolean;
  onStatusChange: (status: 'pending' | 'approved' | 'featured' | 'rejected' | 'archived') => void;
  onViewsCountChange: (count: number) => void;
  onDownloadsCountChange: (count: number) => void;
  onRatingAverageChange: (rating: number) => void;
  onRatingCountChange: (count: number) => void;
  onTagsChange: (tags: string[]) => void;
  onNewTagChange: (tag: string) => void;
  onFeaturedChange: (featured: boolean) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function AdminControls({
  status,
  viewsCount,
  downloadsCount,
  ratingAverage,
  ratingCount,
  tags,
  newTag,
  isFeatured,
  onStatusChange,
  onViewsCountChange,
  onDownloadsCountChange,
  onRatingAverageChange,
  onRatingCountChange,
  onTagsChange,
  onNewTagChange,
  onFeaturedChange,
  onSave,
  onCancel
}: AdminControlsProps) {
  const handleStatusChange = (value: string) => {
    onStatusChange(value as 'pending' | 'approved' | 'featured' | 'rejected' | 'archived');
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="featured"
          checked={isFeatured}
          onChange={(e) => onFeaturedChange(e.target.checked)}
        />
        <Label htmlFor="featured">Mark as Featured</Label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="views">Views Count</Label>
          <div className="relative">
            <Eye className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="views"
              type="number"
              value={viewsCount}
              onChange={(e) => onViewsCountChange(Number(e.target.value))}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="downloads">Downloads Count</Label>
          <div className="relative">
            <Download className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="downloads"
              type="number"
              value={downloadsCount}
              onChange={(e) => onDownloadsCountChange(Number(e.target.value))}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="rating">Rating Average</Label>
          <div className="relative">
            <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={ratingAverage}
              onChange={(e) => onRatingAverageChange(Number(e.target.value))}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="ratingCount">Rating Count</Label>
          <Input
            id="ratingCount"
            type="number"
            value={ratingCount}
            onChange={(e) => onRatingCountChange(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Tags Management */}
      <TagsManager
        tags={tags}
        newTag={newTag}
        onTagsChange={onTagsChange}
        onNewTagChange={onNewTagChange}
      />

      <div className="flex justify-end gap-4 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave} className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/90">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
