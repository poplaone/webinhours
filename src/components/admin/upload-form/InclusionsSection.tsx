
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

interface InclusionsSectionProps {
  inclusions: string[];
  inclusionInput: string;
  setInclusionInput: (value: string) => void;
  onAddInclusion: () => void;
  onRemoveInclusion: (inclusion: string) => void;
}

export function InclusionsSection({ 
  inclusions, 
  inclusionInput, 
  setInclusionInput, 
  onAddInclusion, 
  onRemoveInclusion 
}: InclusionsSectionProps) {
  return (
    <div className="space-y-2">
      <Label>What's Included</Label>
      <div className="flex gap-2">
        <Input
          value={inclusionInput}
          onChange={(e) => setInclusionInput(e.target.value)}
          placeholder="e.g., Source files, Documentation, 30-day support"
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), onAddInclusion())}
        />
        <Button type="button" onClick={onAddInclusion} variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {inclusions.map((inclusion) => (
          <Badge key={inclusion} variant="outline" className="flex items-center gap-1 bg-green-50 border-green-200 text-green-800">
            {inclusion}
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={() => onRemoveInclusion(inclusion)}
            />
          </Badge>
        ))}
      </div>
      {inclusions.length === 0 && (
        <p className="text-sm text-muted-foreground">Add items that are included with this template</p>
      )}
    </div>
  );
}
