
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
  demo_url?: string;
}

interface URLSectionProps {
  register: UseFormRegister<WebsiteFormData>;
  errors: FieldErrors<WebsiteFormData>;
}

export function URLSection({ register, errors }: URLSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="preview_url">Preview URL *</Label>
        <Input
          id="preview_url"
          {...register('preview_url', { required: 'Preview URL is required' })}
          placeholder="https://your-website.com"
        />
        {errors.preview_url && (
          <p className="text-sm text-red-500">{errors.preview_url.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="demo_url">Demo URL (optional)</Label>
        <Input
          id="demo_url"
          {...register('demo_url')}
          placeholder="https://demo.example.com"
        />
      </div>
    </div>
  );
}
