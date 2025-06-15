
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

interface TechnologiesSectionProps {
  technologies: string[];
  techInput: string;
  setTechInput: (value: string) => void;
  onAddTechnology: () => void;
  onRemoveTechnology: (tech: string) => void;
}

export function TechnologiesSection({ 
  technologies, 
  techInput, 
  setTechInput, 
  onAddTechnology, 
  onRemoveTechnology 
}: TechnologiesSectionProps) {
  return (
    <div className="space-y-2">
      <Label>Technologies Used</Label>
      <div className="flex gap-2">
        <Input
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          placeholder="e.g., React, Tailwind CSS, Node.js"
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), onAddTechnology())}
        />
        <Button type="button" onClick={onAddTechnology} variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {technologies.map((tech) => (
          <Badge key={tech} variant="outline" className="flex items-center gap-1">
            {tech}
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={() => onRemoveTechnology(tech)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
}
