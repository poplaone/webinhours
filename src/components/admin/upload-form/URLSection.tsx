
import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface WebsiteFormData {
  title: string;
  description: string;
  category: string;
  price: number;
  preview_url: string;
}

interface URLSectionProps {
  register: UseFormRegister<WebsiteFormData>;
  errors: FieldErrors<WebsiteFormData>;
}

export function URLSection({ register, errors }: URLSectionProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="preview_url">Website URL</Label>
      <Input
        id="preview_url"
        type="url"
        maxLength={2048}
        {...register('preview_url', { 
          required: 'Website URL is required',
          pattern: {
            value: /^https?:\/\/.+/,
            message: 'Please enter a valid URL starting with http:// or https://'
          }
        })}
        placeholder="https://your-website.com"
      />
      <p className="text-xs text-muted-foreground">
        The URL where users can access your website template
      </p>
      {errors.preview_url && (
        <p className="text-sm text-red-500">{errors.preview_url.message}</p>
      )}
    </div>
  );
}
