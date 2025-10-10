
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, AlertTriangle } from 'lucide-react';
import { BasicInfoSection } from './upload-form/BasicInfoSection';
import { URLSection } from './upload-form/URLSection';
import { TagsSection } from './upload-form/TagsSection';
import { TechnologiesSection } from './upload-form/TechnologiesSection';
import { FeaturesSection } from './upload-form/FeaturesSection';
import { InclusionsSection } from './upload-form/InclusionsSection';
import { FormActions } from './upload-form/FormActions';
import { useWebsiteUploadForm } from '@/hooks/useWebsiteUploadForm';

export function WebsiteUploadForm({ onClose }: { onClose: () => void }) {
  const {
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
    isSubmitting,
    isAdmin,
    generateSlug,
  } = useWebsiteUploadForm(onClose);

  // If user is not admin, show access denied message
  if (!isAdmin) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Access Denied
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Only administrators can upload website templates to the marketplace.
          </p>
        </CardContent>
      </Card>
    );
  }

  const isFormValid = tags.length > 0 && !!thumbnailUrl;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Website Template
          <Badge className="bg-purple-100 text-purple-800">
            Admin - Auto Approve
          </Badge>
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
            generateSlug={generateSlug}
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

          <FormActions
            onClose={onClose}
            isSubmitting={isSubmitting}
            isFormValid={isFormValid}
            isAdmin={isAdmin}
          />
        </form>
      </CardContent>
    </Card>
  );
}
