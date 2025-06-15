
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateWebsite, useIsAdmin } from '@/hooks/useWebsites';
import { useToast } from '@/hooks/use-toast';

interface WebsiteFormData {
  title: string;
  description: string;
  category: string;
  price: number;
  preview_url: string;
  demo_url?: string;
}

export function useWebsiteUploadForm(onClose: () => void) {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState('');
  const [inclusions, setInclusions] = useState<string[]>([]);
  const [inclusionInput, setInclusionInput] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<WebsiteFormData>();
  const createWebsite = useCreateWebsite();
  const isAdmin = useIsAdmin();
  const { toast } = useToast();

  // Tag management
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  // Technology management
  const addTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter(t => t !== tech));
  };

  // Feature management
  const addFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const removeFeature = (feature: string) => {
    setFeatures(features.filter(f => f !== feature));
  };

  // Inclusion management
  const addInclusion = () => {
    if (inclusionInput.trim() && !inclusions.includes(inclusionInput.trim())) {
      setInclusions([...inclusions, inclusionInput.trim()]);
      setInclusionInput('');
    }
  };

  const removeInclusion = (inclusion: string) => {
    setInclusions(inclusions.filter(i => i !== inclusion));
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
      // Determine status based on user role - EXPLICIT logic
      const websiteStatus = isAdmin ? 'approved' as const : 'pending' as const;
      
      console.log('🔧 Creating website with status:', websiteStatus, 'for admin user:', isAdmin);

      const websiteData = {
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price,
        preview_url: data.preview_url,
        demo_url: data.demo_url || null,
        thumbnail_url: thumbnailUrl,
        tags: tags.length > 0 ? tags : null,
        technologies: technologies.length > 0 ? technologies : null,
        features: features.length > 0 ? features : null,
        inclusions: inclusions.length > 0 ? inclusions : null,
        status: websiteStatus, // Explicitly set status with proper typing
        // Only set approved_at if admin
        ...(isAdmin && { approved_at: new Date().toISOString() })
      };

      console.log('🔧 Final website data before submission:', websiteData);

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
    
    // State
    tags,
    tagInput,
    setTagInput,
    technologies,
    techInput,
    setTechInput,
    features,
    featureInput,
    setFeatureInput,
    inclusions,
    inclusionInput,
    setInclusionInput,
    thumbnailUrl,
    setThumbnailUrl,
    
    // Handlers
    addTag,
    removeTag,
    addTechnology,
    removeTechnology,
    addFeature,
    removeFeature,
    addInclusion,
    removeInclusion,
    
    // Loading state
    isSubmitting: createWebsite.isPending,
    isAdmin,
  };
}
