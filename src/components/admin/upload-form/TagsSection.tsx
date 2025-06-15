
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

interface TagsSectionProps {
  tags: string[];
  tagInput: string;
  setTagInput: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
}

export function TagsSection({ 
  tags, 
  tagInput, 
  setTagInput, 
  onAddTag, 
  onRemoveTag 
}: TagsSectionProps) {
  return (
    <div className="space-y-2">
      <Label>Tags *</Label>
      <div className="flex gap-2">
        <Input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="Add a tag (e.g., E-commerce, Stripe, Admin Panel)"
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), onAddTag())}
        />
        <Button type="button" onClick={onAddTag} variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
            {tag}
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={() => onRemoveTag(tag)}
            />
          </Badge>
        ))}
      </div>
      {tags.length === 0 && (
        <p className="text-sm text-red-500">At least one tag is required</p>
      )}
    </div>
  );
}
