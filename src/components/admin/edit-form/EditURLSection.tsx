
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface WebsiteFormData {
  title: string;
  description: string;
  category: string;
  price: number;
  preview_url: string;
}

interface EditURLSectionProps {
  control: Control<WebsiteFormData>;
  errors: FieldErrors<WebsiteFormData>;
}

export function EditURLSection({ control, errors }: EditURLSectionProps) {
  return (
    <FormField
      control={control}
      name="preview_url"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Website URL</FormLabel>
          <FormControl>
            <Input placeholder="https://your-website.com" {...field} />
          </FormControl>
          <p className="text-xs text-muted-foreground">
            The URL where users can access your website template
          </p>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
