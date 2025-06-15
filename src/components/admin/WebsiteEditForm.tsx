
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Website } from '@/types/website';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EditBasicInfoSection } from './edit-form/EditBasicInfoSection';
import { EditURLSection } from './edit-form/EditURLSection';
import { EditTagsSection } from './edit-form/EditTagsSection';
import { EditTechnologiesSection } from './edit-form/EditTechnologiesSection';
import { EditFeaturesSection } from './edit-form/EditFeaturesSection';
import { EditInclusionsSection } from './edit-form/EditInclusionsSection';

const websiteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  price: z.number().min(0, 'Price must be non-negative'),
  preview_url: z.string().url('Must be a valid URL'),
  demo_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

interface WebsiteEditFormProps {
  website: Website;
  onClose: () => void;
  onUpdate: (websiteId: string, updates: any) => void;
}

export function WebsiteEditForm({ website, onClose, onUpdate }: WebsiteEditFormProps) {
  const [tags, setTags] = useState<string[]>(website.tags || []);
  const [newTag, setNewTag] = useState('');
  const [technologies, setTechnologies] = useState<string[]>(website.technologies || []);
  const [newTech, setNewTech] = useState('');
  const [features, setFeatures] = useState<string[]>(website.features || []);
  const [newFeature, setNewFeature] = useState('');
  const [inclusions, setInclusions] = useState<string[]>(website.inclusions || []);
  const [newInclusion, setNewInclusion] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState(website.thumbnail_url || '');

  const form = useForm({
    resolver: zodResolver(websiteSchema),
    defaultValues: {
      title: website.title,
      description: website.description || '',
      category: website.category,
      price: website.price,
      preview_url: website.preview_url,
      demo_url: website.demo_url || '',
    },
  });

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const addTech = () => {
    if (newTech.trim() && !technologies.includes(newTech.trim())) {
      setTechnologies([...technologies, newTech.trim()]);
      setNewTech('');
    }
  };

  const removeTech = (techToRemove: string) => {
    setTechnologies(technologies.filter(tech => tech !== techToRemove));
  };

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (featureToRemove: string) => {
    setFeatures(features.filter(feature => feature !== featureToRemove));
  };

  const addInclusion = () => {
    if (newInclusion.trim() && !inclusions.includes(newInclusion.trim())) {
      setInclusions([...inclusions, newInclusion.trim()]);
      setNewInclusion('');
    }
  };

  const removeInclusion = (inclusionToRemove: string) => {
    setInclusions(inclusions.filter(inclusion => inclusion !== inclusionToRemove));
  };

  const onSubmit = (data: any) => {
    const updates = {
      ...data,
      price: Number(data.price),
      tags: tags.length > 0 ? tags : null,
      technologies: technologies.length > 0 ? technologies : null,
      features: features.length > 0 ? features : null,
      inclusions: inclusions.length > 0 ? inclusions : null,
      demo_url: data.demo_url || null,
      thumbnail_url: thumbnailUrl || null,
      description: data.description || null,
    };

    onUpdate(website.id, updates);
    onClose();
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>Edit Website: {website.title}</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <EditBasicInfoSection 
            control={form.control}
            errors={form.formState.errors}
            thumbnailUrl={thumbnailUrl}
            setThumbnailUrl={setThumbnailUrl}
          />

          <EditURLSection 
            control={form.control}
            errors={form.formState.errors}
          />

          <EditTagsSection 
            tags={tags}
            newTag={newTag}
            setNewTag={setNewTag}
            addTag={addTag}
            removeTag={removeTag}
          />

          <EditTechnologiesSection 
            technologies={technologies}
            newTech={newTech}
            setNewTech={setNewTech}
            addTech={addTech}
            removeTech={removeTech}
          />

          <EditFeaturesSection 
            features={features}
            newFeature={newFeature}
            setNewFeature={setNewFeature}
            addFeature={addFeature}
            removeFeature={removeFeature}
          />

          <EditInclusionsSection 
            inclusions={inclusions}
            newInclusion={newInclusion}
            setNewInclusion={setNewInclusion}
            addInclusion={addInclusion}
            removeInclusion={removeInclusion}
          />

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/90">
              Update Website
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
