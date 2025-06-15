
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

interface EditTechnologiesSectionProps {
  technologies: string[];
  newTech: string;
  setNewTech: (value: string) => void;
  addTech: () => void;
  removeTech: (tech: string) => void;
}

export function EditTechnologiesSection({ 
  technologies, 
  newTech, 
  setNewTech, 
  addTech, 
  removeTech 
}: EditTechnologiesSectionProps) {
  return (
    <div>
      <FormLabel>Technologies</FormLabel>
      <div className="flex gap-2 mb-2">
        <Input
          value={newTech}
          onChange={(e) => setNewTech(e.target.value)}
          placeholder="Add a technology"
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
        />
        <Button type="button" onClick={addTech} size="sm">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <Badge key={tech} variant="outline" className="flex items-center gap-1">
            {tech}
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={() => removeTech(tech)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
}
