
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

interface EditInclusionsSectionProps {
  inclusions: string[];
  newInclusion: string;
  setNewInclusion: (value: string) => void;
  addInclusion: () => void;
  removeInclusion: (inclusion: string) => void;
}

export function EditInclusionsSection({ 
  inclusions, 
  newInclusion, 
  setNewInclusion, 
  addInclusion, 
  removeInclusion 
}: EditInclusionsSectionProps) {
  return (
    <div>
      <FormLabel>What's Included</FormLabel>
      <div className="flex gap-2 mb-2">
        <Input
          value={newInclusion}
          onChange={(e) => setNewInclusion(e.target.value)}
          placeholder="Add an inclusion"
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addInclusion())}
        />
        <Button type="button" onClick={addInclusion} size="sm">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {inclusions.map((inclusion) => (
          <Badge key={inclusion} variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-800">
            {inclusion}
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={() => removeInclusion(inclusion)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
}
