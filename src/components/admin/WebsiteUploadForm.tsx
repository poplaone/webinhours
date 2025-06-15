import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload } from 'lucide-react';
import { useCreateWebsite, useIsAdmin } from '@/hooks/useWebsites';
import { useToast } from '@/hooks/use-toast';
import { BasicInfoSection } from './upload-form/BasicInfoSection';
import { URLSection } from './upload-form/URLSection';
import { TagsSection } from './upload-form/TagsSection';
import { TechnologiesSection } from './upload-form/TechnologiesSection';
import { FeaturesSection } from './upload-form/FeaturesSection';
import { InclusionsSection } from './upload-form/InclusionsSection';

interface WebsiteFormData {
  title: string;
  description: string;
  category: string;
  price: number;
  preview_url: string;
  demo_url?: string;
}

export function WebsiteUploadForm({ onClose }: { onClose: () => void }) {
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

  console.log('🔧 WebsiteUploadForm - User is admin:', isAdmin);

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

  const addInclusion = () => {
    if (inclusionInput.trim() && !inclusions.includes(inclusionInput.trim())) {
      setInclusions([...inclusions, inclusionInput.trim()]);
      setInclusionInput('');
    }
  };

  const removeInclusion = (inclusion: string) => {
    setInclusions(inclusions.filter(i => i !== inclusion));
  };

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
      const websiteStatus = isAdmin ? 'approved' : 'pending';
      
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
        status: websiteStatus, // Explicitly set status
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

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Website Template
          {isAdmin && (
            <Badge className="bg-purple-100 text-purple-800">
              Admin - Auto Approve
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <BasicInfoSection
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
            thumbnailUrl={thumbnailUrl}
            setThumbnailUrl={setThumbnailUrl}
          />

          <URLSection register={register} errors={errors} />

          <TagsSection
            tags={tags}
            tagInput={tagInput}
            setTagInput={setTagInput}
            onAddTag={addTag}
            onRemoveTag={removeTag}
          />

          <TechnologiesSection
            technologies={technologies}
            techInput={techInput}
            setTechInput={setTechInput}
            onAddTechnology={addTechnology}
            onRemoveTechnology={removeTechnology}
          />

          <FeaturesSection
            features={features}
            featureInput={featureInput}
            setFeatureInput={setFeatureInput}
            onAddFeature={addFeature}
            onRemoveFeature={removeFeature}
          />

          <InclusionsSection
            inclusions={inclusions}
            inclusionInput={inclusionInput}
            setInclusionInput={setInclusionInput}
            onAddInclusion={addInclusion}
            onRemoveInclusion={removeInclusion}
          />

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={createWebsite.isPending || tags.length === 0 || !thumbnailUrl}
              className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/90"
            >
              {createWebsite.isPending ? 'Uploading...' : `Upload Website${isAdmin ? ' (Auto-Approve)' : ''}`}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
