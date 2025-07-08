
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateWebsite, useIsAdmin } from '@/hooks/useWebsites';
import { useToast } from '@/hooks/use-toast';
import { useArrayFields } from './useArrayFields';
import { prepareWebsiteData } from '@/utils/websiteDataUtils';

interface WebsiteFormData {
  title: string;
  description: string;
  category: string;
  price: number;
  preview_url: string;
  demo_url?: string;
  slug?: string;
}

export function useWebsiteUploadForm(onClose: () => void) {
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<WebsiteFormData>();
  const createWebsite = useCreateWebsite();
  const isAdmin = useIsAdmin();
  const { toast } = useToast();
  
  const arrayFields = useArrayFields();

  // Generate slug function
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Form submission
  const onSubmit = async (data: WebsiteFormData) => {
    if (!thumbnailUrl) {
      toast({
        title: "Error",
        description: "Please upload a thumbnail image.",
        variant: "destructive",
      });
      return;
    }

    try {
      const websiteData = prepareWebsiteData({
        data,
        thumbnailUrl,
        tags: arrayFields.tags,
        technologies: arrayFields.technologies,
        features: arrayFields.features,
        inclusions: arrayFields.inclusions,
        isAdmin,
      });

      await createWebsite.mutateAsync(websiteData);

      toast({
        title: "Success",
        description: isAdmin 
          ? "Website uploaded and automatically approved!" 
          : "Website uploaded successfully! It will be reviewed before being published.",
      });
      
      onClose();
    } catch (error) {
      console.error('🔧 Error creating website:', error);
      toast({
        title: "Error",
        description: "Failed to upload website. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    // Form
    register,
    handleSubmit,
    errors,
    setValue,
    watch,
    onSubmit,
    generateSlug,
    
    // Basic state
    thumbnailUrl,
    setThumbnailUrl,
    
    // Array fields
    ...arrayFields,
    
    // Loading state
    isSubmitting: createWebsite.isPending,
    isAdmin,
  };
}
