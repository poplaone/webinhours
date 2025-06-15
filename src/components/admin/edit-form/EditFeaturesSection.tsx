
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

interface EditFeaturesSectionProps {
  features: string[];
  newFeature: string;
  setNewFeature: (value: string) => void;
  addFeature: () => void;
  removeFeature: (feature: string) => void;
}

export function EditFeaturesSection({ 
  features, 
  newFeature, 
  setNewFeature, 
  addFeature, 
  removeFeature 
}: EditFeaturesSectionProps) {
  return (
    <div>
      <FormLabel>Features</FormLabel>
      <div className="flex gap-2 mb-2">
        <Input
          value={newFeature}
          onChange={(e) => setNewFeature(e.target.value)}
          placeholder="Add a feature"
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
        />
        <Button type="button" onClick={addFeature} size="sm">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {features.map((feature) => (
          <Badge key={feature} variant="default" className="flex items-center gap-1">
            {feature}
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={() => removeFeature(feature)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
}
