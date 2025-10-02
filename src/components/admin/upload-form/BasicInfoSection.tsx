
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
  const slug = watch('slug');
  
  // Auto-generate slug when title changes only if slug is empty
  React.useEffect(() => {
    if (title && generateSlug && !slug) {
      const newSlug = generateSlug(title);
      setValue('slug', newSlug);
    }
  }, [title, generateSlug, setValue, slug]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            maxLength={200}
            {...register('title', { 
              required: 'Title is required',
              maxLength: { value: 200, message: 'Title must be less than 200 characters' }
            })}
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
        <Label htmlFor="slug">Custom URL Slug *</Label>
        <Input
          id="slug"
          {...register('slug', { required: 'URL slug is required' })}
          placeholder="e-commerce-store-template"
          onChange={(e) => {
            const cleanSlug = e.target.value
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')
              .trim();
            setValue('slug', cleanSlug);
          }}
        />
        {errors.slug && (
          <p className="text-sm text-red-500">{errors.slug.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          This will be your SEO-friendly URL: /site/{slug || 'your-custom-url'}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          maxLength={2000}
          {...register('description', { 
            required: 'Description is required',
            maxLength: { value: 2000, message: 'Description must be less than 2000 characters' }
          })}
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
