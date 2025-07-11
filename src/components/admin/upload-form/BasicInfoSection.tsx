
import React from 'react';
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign } from 'lucide-react';
import { ImageUpload } from '@/components/ui/image-upload';

interface WebsiteFormData {
  title: string;
  description: string;
  category: string;
  price: number;
  preview_url: string;
  demo_url?: string;
  slug?: string;
}

interface BasicInfoSectionProps {
  register: UseFormRegister<WebsiteFormData>;
  errors: FieldErrors<WebsiteFormData>;
  setValue: UseFormSetValue<WebsiteFormData>;
  watch: UseFormWatch<WebsiteFormData>;
  generateSlug?: (title: string) => string;
  thumbnailUrl: string;
  setThumbnailUrl: (url: string) => void;
}

const categories = [
  { value: 'E-commerce', label: 'E-commerce' },
  { value: 'Corporate', label: 'Corporate' },
  { value: 'SaaS', label: 'SaaS' },
  { value: 'Portfolio', label: 'Portfolio' },
  { value: 'Restaurant', label: 'Restaurant' },
  { value: 'Real Estate', label: 'Real Estate' },
  { value: 'Landing Page', label: 'Landing Page' },
  { value: 'Blog', label: 'Blog' },
  { value: 'Creative', label: 'Creative' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Education', label: 'Education' },
  { value: 'Non-Profit', label: 'Non-Profit' },
  { value: 'Other', label: 'Other' },
];

export function BasicInfoSection({ 
  register, 
  errors, 
  setValue, 
  watch,
  thumbnailUrl, 
  setThumbnailUrl,
  generateSlug 
}: BasicInfoSectionProps) {
  const title = watch('title');
  
  // Auto-generate slug when title changes
  React.useEffect(() => {
    if (title && generateSlug) {
      const newSlug = generateSlug(title);
      setValue('slug', newSlug);
    }
  }, [title, generateSlug, setValue]);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            {...register('title', { required: 'Title is required' })}
            placeholder="E-commerce Store Template"
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
        <Label htmlFor="slug">SEO URL Slug</Label>
        <Input
          id="slug"
          {...register('slug')}
          placeholder="e-commerce-store-template"
          disabled
          className="bg-muted"
        />
        <p className="text-xs text-muted-foreground">
          Auto-generated from title. URL will be: /site/your-slug-here
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          {...register('description', { required: 'Description is required' })}
          placeholder="Complete e-commerce solution with shopping cart, payment integration, and admin dashboard. Perfect for online stores."
          rows={4}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
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
                min: { value: 0, message: 'Price must be non-negative' },
                valueAsNumber: true
              })}
              placeholder="299"
            />
          </div>
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <ImageUpload
            value={thumbnailUrl}
            onChange={setThumbnailUrl}
            label="Thumbnail Image"
            required
          />
        </div>
      </div>
    </>
  );
}
