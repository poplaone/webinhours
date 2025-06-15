import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { ImageUpload } from '@/components/ui/image-upload';
import { Website } from '@/types/website';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="portfolio">Portfolio</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="blog">Blog</SelectItem>
                      <SelectItem value="landing">Landing Page</SelectItem>
                      <SelectItem value="dashboard">Dashboard</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (USD) *</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01" 
                    min="0"
                    {...field} 
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="preview_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preview URL *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="demo_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Demo URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <ImageUpload
              value={thumbnailUrl}
              onChange={setThumbnailUrl}
              label="Thumbnail Image"
            />
          </div>

          {/* Tags Section */}
          <div>
            <FormLabel>Tags</FormLabel>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
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

          {/* Technologies Section */}
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

          {/* Features Section */}
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

          {/* Inclusions Section */}
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
