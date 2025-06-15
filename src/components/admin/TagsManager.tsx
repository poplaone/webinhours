
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { specialTags } from './types';

interface TagsManagerProps {
  tags: string[];
  newTag: string;
  onTagsChange: (tags: string[]) => void;
  onNewTagChange: (tag: string) => void;
}

export function TagsManager({ tags, newTag, onTagsChange, onNewTagChange }: TagsManagerProps) {
  const addTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      onTagsChange([...tags, tag.trim()]);
      onNewTagChange('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
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
          onChange={(e) => onNewTagChange(e.target.value)}
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
  );
}
