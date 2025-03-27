
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Upload, ImagePlus, Lightbulb, TrendingUp, Users, BarChart3, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import ChatSidebar from '@/components/ai/ChatSidebar';
import GenerateImageButton from '@/components/ai/GenerateImageButton';
import { toast } from "sonner";

// Form schema validation
const ideaFormSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  targetAudience: z.string().min(5, {
    message: "Target audience must be at least 5 characters.",
  }),
  businessValue: z.string().min(5, {
    message: "Business value must be at least 5 characters.",
  }),
  tags: z.string(),
});

type IdeaFormValues = z.infer<typeof ideaFormSchema>;

const IdeaCreation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Default form values
  const defaultValues: Partial<IdeaFormValues> = {
    title: "",
    description: "",
    targetAudience: "",
    businessValue: "",
    tags: "",
  };

  // Initialize form
  const form = useForm<IdeaFormValues>({
    resolver: zodResolver(ideaFormSchema),
    defaultValues,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL for the image
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleAIImageGenerated = (imageUrl: string) => {
    setImagePreview(imageUrl);
  };

  const onSubmit = (values: IdeaFormValues) => {
    // Save the created idea to sessionStorage
    const newIdea = {
      ...values,
      imageUrl: imagePreview
    };
    
    sessionStorage.setItem('newIdea', JSON.stringify(newIdea));
    
    toast.success("Idea created successfully!");
    console.log(values);
    
    // Navigate to dashboard after successful submission
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  const goToNextStep = () => {
    if (currentStep === 1) {
      const { title, description } = form.getValues();
      if (title.length < 5 || description.length < 20) {
        form.trigger(["title", "description"]);
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 flex">
      {/* AI Chat Sidebar */}
      <ChatSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 text-[#8B5CF6]" />
                <span className="ml-2 text-xl font-semibold">New Idea Creation</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container py-6 flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex justify-between">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-[#8B5CF6] text-white' : 'bg-muted text-muted-foreground'}`}>
                    1
                  </div>
                  <span className="text-sm mt-1">Basics</span>
                </div>
                <div className="flex-1 flex items-center mx-2">
                  <div className={`h-1 w-full ${currentStep >= 2 ? 'bg-[#8B5CF6]' : 'bg-muted'}`}></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-[#8B5CF6] text-white' : 'bg-muted text-muted-foreground'}`}>
                    2
                  </div>
                  <span className="text-sm mt-1">Details</span>
                </div>
                <div className="flex-1 flex items-center mx-2">
                  <div className={`h-1 w-full ${currentStep >= 3 ? 'bg-[#8B5CF6]' : 'bg-muted'}`}></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-[#8B5CF6] text-white' : 'bg-muted text-muted-foreground'}`}>
                    3
                  </div>
                  <span className="text-sm mt-1">Review</span>
                </div>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <Card className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Lightbulb className="h-5 w-5 text-[#8B5CF6]" />
                        <h2 className="text-xl font-semibold">Basic Information</h2>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Idea Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter a catchy title for your idea" {...field} />
                            </FormControl>
                            <FormDescription>
                              Keep it concise and memorable.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your idea in detail..." 
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Explain the concept, its purpose, and potential impact.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <FormLabel>Idea Visualization</FormLabel>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                          {imagePreview ? (
                            <div className="relative w-full">
                              <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="mx-auto max-h-48 object-contain rounded-md"
                              />
                              <Button 
                                type="button"
                                variant="outline" 
                                size="sm" 
                                className="mt-2"
                                onClick={() => setImagePreview(null)}
                              >
                                Remove Image
                              </Button>
                            </div>
                          ) : (
                            <>
                              <ImagePlus className="h-12 w-12 text-gray-400 mb-2" />
                              <p className="text-sm text-muted-foreground mb-2">
                                Upload an image or generate one with AI
                              </p>
                              <div className="flex flex-wrap gap-2 justify-center">
                                <div>
                                  <input
                                    type="file"
                                    id="image-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                  />
                                  <Button 
                                    type="button"
                                    variant="outline" 
                                    onClick={() => document.getElementById('image-upload')?.click()}
                                  >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload Image
                                  </Button>
                                </div>
                                <GenerateImageButton 
                                  title={form.getValues('title')} 
                                  description={form.getValues('description')}
                                  onImageGenerated={handleAIImageGenerated}
                                  disabled={!form.getValues('title') || !form.getValues('description')}
                                />
                              </div>
                            </>
                          )}
                        </div>
                        {(!form.getValues('title') || !form.getValues('description')) && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Fill in the title and description to enable AI image generation
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-6">
                      <Button type="button" onClick={goToNextStep} className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
                        Next Step
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                )}

                {/* Step 2: Detailed Information */}
                {currentStep === 2 && (
                  <Card className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Users className="h-5 w-5 text-[#8B5CF6]" />
                        <h2 className="text-xl font-semibold">Detailed Information</h2>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="targetAudience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Target Audience</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Who is this idea for?" 
                                className="min-h-[80px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Describe the primary user demographic, their needs, and pain points.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="businessValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Value</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="How does this idea create value?" 
                                className="min-h-[80px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Explain the potential return on investment, market opportunity, or strategic advantage.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="FMCG, Health, Digital, etc. (comma-separated)" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Add relevant categories to help organize your idea.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-between mt-6">
                      <Button type="button" variant="outline" onClick={goToPreviousStep}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous Step
                      </Button>
                      <Button type="button" onClick={goToNextStep} className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
                        Next Step
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                )}

                {/* Step 3: Review and Submit */}
                {currentStep === 3 && (
                  <Card className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="h-5 w-5 text-[#8B5CF6]" />
                        <h2 className="text-xl font-semibold">Review and Submit</h2>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="border-b pb-4">
                          <h3 className="font-medium mb-1">Idea Title</h3>
                          <p>{form.getValues('title')}</p>
                        </div>
                        
                        <div className="border-b pb-4">
                          <h3 className="font-medium mb-1">Description</h3>
                          <p className="whitespace-pre-line">{form.getValues('description')}</p>
                        </div>
                        
                        {imagePreview && (
                          <div className="border-b pb-4">
                            <h3 className="font-medium mb-1">Visualization</h3>
                            <img 
                              src={imagePreview} 
                              alt="Idea visualization" 
                              className="max-h-48 object-contain rounded-md"
                            />
                          </div>
                        )}
                        
                        <div className="border-b pb-4">
                          <h3 className="font-medium mb-1">Target Audience</h3>
                          <p className="whitespace-pre-line">{form.getValues('targetAudience')}</p>
                        </div>
                        
                        <div className="border-b pb-4">
                          <h3 className="font-medium mb-1">Business Value</h3>
                          <p className="whitespace-pre-line">{form.getValues('businessValue')}</p>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-1">Tags</h3>
                          <div className="flex flex-wrap gap-2">
                            {form.getValues('tags').split(',').map((tag, index) => tag.trim() && (
                              <span 
                                key={index} 
                                className="bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs px-2 py-1 rounded-full"
                              >
                                {tag.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-muted/50 p-4 rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart3 className="h-4 w-4 text-[#8B5CF6]" />
                          <h3 className="font-medium">AI Analysis</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Based on current market research and trends, this idea has a high potential for success in the FMCG sector. The concept aligns well with consumer demand for innovative solutions in this space.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-6">
                      <Button type="button" variant="outline" onClick={goToPreviousStep}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous Step
                      </Button>
                      <Button type="submit" className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Create Idea
                      </Button>
                    </div>
                  </Card>
                )}
              </form>
            </Form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default IdeaCreation;
