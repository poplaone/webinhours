
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Upload, DollarSign } from 'lucide-react';
import { useCreateWebsite } from '@/hooks/useWebsites';
import { useToast } from '@/hooks/use-toast';

interface WebsiteFormData {
  title: string;
  description: string;
  category: string;
  price: number;
  preview_url: string;
  demo_url?: string;
  thumbnail_url?: string;
}

const categories = [
  { value: 'business', label: 'Business' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'blog', label: 'Blog' },
  { value: 'landing_page', label: 'Landing Page' },
  { value: 'saas', label: 'SaaS' },
  { value: 'nonprofit', label: 'Non-Profit' },
  { value: 'education', label: 'Education' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'creative', label: 'Creative' },
  { value: 'other', label: 'Other' },
];

export function WebsiteUploadForm({ onClose }: { onClose: () => void }) {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState('');

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<WebsiteFormData>();
  const createWebsite = useCreateWebsite();
  const { toast } = useToast();

  const selectedCategory = watch('category');

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const addTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter(t => t !== tech));
  };

  const addFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const removeFeature = (feature: string) => {
    setFeatures(features.filter(f => f !== feature));
  };

  const onSubmit = async (data: WebsiteFormData) => {
    try {
      await createWebsite.mutateAsync({
        title: data.title,
        description: data.description,
        category: data.category as any,
        price: data.price,
        preview_url: data.preview_url,
        demo_url: data.demo_url || null,
        thumbnail_url: data.thumbnail_url || null,
        tags,
        technologies,
        features,
      });

      toast({
        title: "Success",
        description: "Website uploaded successfully! It will be reviewed before being published.",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload website. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Website Template
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                {...register('title', { required: 'Title is required' })}
                placeholder="Enter website title"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select onValueChange={(value) => setValue('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500">Category is required</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Describe your website template"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($) *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  className="pl-10"
                  {...register('price', { 
                    required: 'Price is required',
                    min: { value: 0, message: 'Price must be non-negative' }
                  })}
                  placeholder="0.00"
                />
              </div>
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="preview_url">Preview URL *</Label>
              <Input
                id="preview_url"
                {...register('preview_url', { required: 'Preview URL is required' })}
                placeholder="https://your-preview-site.com"
              />
              {errors.preview_url && (
                <p className="text-sm text-red-500">{errors.preview_url.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="demo_url">Demo URL</Label>
              <Input
                id="demo_url"
                {...register('demo_url')}
                placeholder="https://demo.example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
              <Input
                id="thumbnail_url"
                {...register('thumbnail_url')}
                placeholder="https://image.example.com/thumbnail.jpg"
              />
            </div>
          </div>

          {/* Tags Section */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
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

          {/* Technologies Section */}
          <div className="space-y-2">
            <Label>Technologies Used</Label>
            <div className="flex gap-2">
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="e.g., React, Tailwind CSS"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
              />
              <Button type="button" onClick={addTechnology} variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="flex items-center gap-1">
                  {tech}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeTechnology(tech)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-2">
            <Label>Key Features</Label>
            <div className="flex gap-2">
              <Input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="e.g., Responsive Design, SEO Optimized"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              />
              <Button type="button" onClick={addFeature} variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
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

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={createWebsite.isPending}
              className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/90"
            >
              {createWebsite.isPending ? 'Uploading...' : 'Upload Website'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
