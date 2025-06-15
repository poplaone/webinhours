
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

interface FeaturesSectionProps {
  features: string[];
  featureInput: string;
  setFeatureInput: (value: string) => void;
  onAddFeature: () => void;
  onRemoveFeature: (feature: string) => void;
}

export function FeaturesSection({ 
  features, 
  featureInput, 
  setFeatureInput, 
  onAddFeature, 
  onRemoveFeature 
}: FeaturesSectionProps) {
  return (
    <div className="space-y-2">
      <Label>Key Features</Label>
      <div className="flex gap-2">
        <Input
          value={featureInput}
          onChange={(e) => setFeatureInput(e.target.value)}
          placeholder="e.g., Responsive Design, SEO Optimized, Payment Integration"
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), onAddFeature())}
        />
        <Button type="button" onClick={onAddFeature} variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {features.map((feature) => (
          <Badge key={feature} variant="default" className="flex items-center gap-1">
            {feature}
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={() => onRemoveFeature(feature)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
}
