
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Star, Eye, Download } from 'lucide-react';
import { Website } from '@/hooks/useWebsites';

interface WebsiteReviewModalProps {
  website: Website | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, updates: any) => void;
}

const statusOptions = [
  { value: 'pending', label: 'Pending Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'featured', label: 'Featured' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'archived', label: 'Archived' },
];

const specialTags = [
  'New', 'Featured', 'Hot', 'Popular', 'Trending', 'Premium', 
  'Best Seller', 'Editor\'s Choice', 'Recently Updated'
];

export function WebsiteReviewModal({ website, isOpen, onClose, onUpdate }: WebsiteReviewModalProps) {
  const [status, setStatus] = useState<'pending' | 'approved' | 'featured' | 'rejected' | 'archived'>(website?.status || 'pending');
  const [viewsCount, setViewsCount] = useState(website?.views_count || 0);
  const [downloadsCount, setDownloadsCount] = useState(website?.downloads_count || 0);
  const [ratingAverage, setRatingAverage] = useState(website?.rating_average || 0);
  const [ratingCount, setRatingCount] = useState(website?.rating_count || 0);
  const [tags, setTags] = useState<string[]>(website?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [isFeatured, setIsFeatured] = useState(website?.is_featured || false);

  if (!website) return null;

  const handleSave = () => {
    const updates = {
      status,
      views_count: viewsCount,
      downloads_count: downloadsCount,
      rating_average: ratingAverage > 0 ? ratingAverage : null,
      rating_count: ratingCount,
      tags,
      is_featured: isFeatured,
      ...(status === 'approved' && !website.approved_at && { approved_at: new Date().toISOString() }),
      ...(status === 'featured' && { 
        is_featured: true, 
        featured_at: new Date().toISOString(),
        approved_at: website.approved_at || new Date().toISOString()
      })
    };

    onUpdate(website.id, updates);
    onClose();
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleStatusChange = (value: string) => {
    setStatus(value as 'pending' | 'approved' | 'featured' | 'rejected' | 'archived');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review Website: {website.title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Website Preview */}
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

          {/* Admin Controls */}
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
                onChange={(e) => setIsFeatured(e.target.checked)}
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
                    onChange={(e) => setViewsCount(Number(e.target.value))}
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
                    onChange={(e) => setDownloadsCount(Number(e.target.value))}
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
                    onChange={(e) => setRatingAverage(Number(e.target.value))}
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
                  onChange={(e) => setRatingCount(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Tags Management */}
            <div>
              <Label>Tags & Categories</Label>
              
              {/* Quick add special tags */}
              <div className="flex flex-wrap gap-2 mt-2 mb-3">
                {specialTags.map((specialTag) => (
                  <Button
                    key={specialTag}
                    size="sm"
                    variant={tags.includes(specialTag) ? "default" : "outline"}
                    onClick={() => tags.includes(specialTag) ? removeTag(specialTag) : addTag(specialTag)}
                  >
                    {specialTag}
                  </Button>
                ))}
              </div>

              {/* Custom tag input */}
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add custom tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(newTag))}
                />
                <Button type="button" onClick={() => addTag(newTag)} variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Current tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/90">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
