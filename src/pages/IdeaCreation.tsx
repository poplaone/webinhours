
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Upload, Lightbulb, TrendingUp, Users, BarChart3, ChevronRight, Sparkles, ArrowRightCircle, Loader2, CheckCircle2, XCircle, FileText } from 'lucide-react';
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
import { Card, CardContent } from "@/components/ui/card";
import ChatSidebar from '@/components/ai/ChatSidebar';
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

// Form schema validation
const ideaFormSchema = z.object({
  problemStatement: z.string().min(10, {
    message: "Problem statement must be at least 10 characters.",
  }).optional().or(z.literal('')),
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }).optional().or(z.literal('')),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }).optional().or(z.literal('')),
  targetAudience: z.string().min(5, {
    message: "Target audience must be at least 5 characters.",
  }).optional().or(z.literal('')),
  businessValue: z.string().min(5, {
    message: "Business value must be at least 5 characters.",
  }).optional().or(z.literal('')),
  tags: z.string().optional().or(z.literal('')),
});

type IdeaFormValues = z.infer<typeof ideaFormSchema>;

type MarketInsight = {
  title: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
};

type StrengthWeakness = {
  type: 'strength' | 'weakness';
  title: string;
  description: string;
};

const IdeaCreation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  const [marketInsights, setMarketInsights] = useState<MarketInsight[]>([]);
  const [ideaSuggestions, setIdeaSuggestions] = useState<string[]>([]);
  const [strengthsWeaknesses, setStrengthsWeaknesses] = useState<StrengthWeakness[]>([]);
  const [isProcessingDocument, setIsProcessingDocument] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Default form values
  const defaultValues: Partial<IdeaFormValues> = {
    problemStatement: "",
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
    mode: "onSubmit",
  });

  const onSubmit = (values: IdeaFormValues) => {
    toast.success("Idea created successfully!");
    console.log(values);
    // Navigate to dashboard after successful submission
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  const goToNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Start processing animation
    setIsProcessingDocument(true);
    
    // Simulate document processing with progress updates
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setProcessingProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Simulate AI populated data
        setTimeout(() => {
          form.setValue('title', 'Smart Eco-Packaging Solution');
          form.setValue('description', 'A sustainable packaging solution that reduces environmental impact while maintaining product protection. The packaging uses biodegradable materials that decompose within 6 months after disposal.');
          form.setValue('problemStatement', 'Traditional packaging contributes significantly to landfill waste and ocean pollution, with most materials taking hundreds of years to decompose.');
          form.setValue('targetAudience', 'Environmentally conscious consumers ages 25-45, retail brands looking to improve sustainability metrics, and food delivery services.');
          form.setValue('businessValue', 'Reduced environmental footprint, potential cost savings through optimized material usage, and increased brand loyalty from environmentally conscious consumers.');
          form.setValue('tags', 'Sustainable, Packaging, Eco-friendly, Innovation');
          
          // Generate insights based on the uploaded document
          generateMarketInsights();
          
          setIsProcessingDocument(false);
          toast.success("Document processed successfully!");
        }, 500);
      }
    }, 100);
  };

  const generateMarketInsights = () => {
    const problemStatement = form.getValues('problemStatement');
    
    setIsGeneratingInsights(true);
    
    // Simulating API call with setTimeout
    setTimeout(() => {
      // Mock data based on the problem statement
      const insights: MarketInsight[] = [
        {
          title: 'Market Size',
          value: '$4.2B',
          trend: 'up',
          description: 'The global market for this solution is growing at 14% CAGR',
        },
        {
          title: 'Competition',
          value: 'Medium',
          trend: 'neutral',
          description: 'Several established players but room for innovation',
        },
        {
          title: 'Growth Potential',
          value: 'High',
          trend: 'up',
          description: 'Emerging markets show strong adoption trends',
        }
      ];
      
      const suggestions = [
        'Consider focusing on mobile-first approach for wider reach',
        'Adding AI-driven personalization could be a key differentiator',
        'Subscription model may yield better long-term revenue',
        'Partner with established brands for faster market entry'
      ];

      // Add strengths and weaknesses analysis
      const swAnalysis: StrengthWeakness[] = [
        {
          type: 'strength',
          title: 'Innovative Approach',
          description: 'Your solution takes a novel approach to solving the problem, which can be a significant differentiator.',
        },
        {
          type: 'strength',
          title: 'Market Timing',
          description: 'The current market conditions are favorable for this type of solution.',
        },
        {
          type: 'weakness',
          title: 'Resource Requirements',
          description: 'Implementation may require significant technical resources and expertise.',
        },
        {
          type: 'weakness',
          title: 'Adoption Barriers',
          description: 'Potential users may face learning curves or integration challenges.',
        }
      ];
      
      setMarketInsights(insights);
      setIdeaSuggestions(suggestions);
      setStrengthsWeaknesses(swAnalysis);
      setIsGeneratingInsights(false);
      
      toast.success("Market insights generated!");
    }, 2000);
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
            
            {/* Next Step Button in Top Bar */}
            <Button 
              onClick={goToNextStep} 
              className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
              disabled={currentStep === 3}
            >
              Next Step
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
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
                {/* Document Upload Option */}
                <Card className="p-6 mb-6 bg-gradient-to-r from-[#8B5CF6]/10 to-[#7C3AED]/5 border-[#8B5CF6]/20">
                  <div className="flex flex-col items-center text-center p-4">
                    <FileText className="h-12 w-12 text-[#8B5CF6] mb-4" />
                    <h3 className="text-xl font-medium mb-2">Upload Research Document</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      Upload a research document or market analysis to let our AI analyze it and populate the idea details automatically.
                    </p>
                    
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange}
                      className="hidden" 
                      accept=".pdf,.doc,.docx,.txt"
                    />
                    
                    {isProcessingDocument ? (
                      <div className="w-full max-w-md">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Processing document...</span>
                          <span className="text-sm font-medium">{processingProgress}%</span>
                        </div>
                        <Progress value={processingProgress} className="h-2 w-full bg-muted" />
                        <p className="text-xs text-muted-foreground mt-2">AI is analyzing your document and extracting relevant information</p>
                      </div>
                    ) : (
                      <Button 
                        type="button" 
                        onClick={handleUploadClick}
                        className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Select Document
                      </Button>
                    )}
                  </div>
                </Card>

                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <Card className="p-6 bg-background border-muted-foreground/20">
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
                              <Input 
                                placeholder="Enter a catchy title for your idea" 
                                className="bg-[#1A1F2C] border-[#8B5CF6]/30 text-white placeholder:text-gray-400"
                                {...field} 
                              />
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
                                className="min-h-[120px] bg-[#1A1F2C] border-[#8B5CF6]/30 text-white placeholder:text-gray-400"
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
                      
                      <FormField
                        control={form.control}
                        name="problemStatement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>What Problem Are We Trying to Solve?</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe the problem or opportunity you're addressing..." 
                                className="min-h-[80px] bg-[#1A1F2C] border-[#8B5CF6]/30 text-white placeholder:text-gray-400"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Clearly define the problem or opportunity your idea addresses.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={generateMarketInsights}
                          className="bg-[#1A1F2C] border-[#8B5CF6]/30 text-white hover:bg-[#8B5CF6]/20"
                          disabled={isGeneratingInsights}
                        >
                          {isGeneratingInsights ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Generating Insights...
                            </>
                          ) : (
                            <>
                              <BarChart3 className="mr-2 h-4 w-4" />
                              Generate Market Insights
                            </>
                          )}
                        </Button>
                      </div>
                      
                      {/* Market Insights Section */}
                      {marketInsights.length > 0 && (
                        <div className="mt-6 space-y-4">
                          <h3 className="text-lg font-medium">Market Insights</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {marketInsights.map((insight, index) => (
                              <Card key={index} className="bg-[#1A1F2C] border-[#8B5CF6]/20">
                                <CardContent className="p-4">
                                  <h4 className="text-sm text-gray-400">{insight.title}</h4>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xl font-semibold text-white">{insight.value}</span>
                                    {insight.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                                    {insight.trend === 'down' && <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />}
                                    {insight.trend === 'neutral' && <ArrowRightCircle className="h-4 w-4 text-yellow-500" />}
                                  </div>
                                  <p className="text-xs text-gray-400 mt-2">{insight.description}</p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                          
                          {/* Strengths and Weaknesses Analysis */}
                          {strengthsWeaknesses.length > 0 && (
                            <div className="mt-6">
                              <h3 className="text-lg font-medium mb-4">Strengths & Weaknesses Analysis</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Strengths Column */}
                                <div className="space-y-3">
                                  <h4 className="text-base font-medium text-green-500 flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Strengths
                                  </h4>
                                  {strengthsWeaknesses
                                    .filter(item => item.type === 'strength')
                                    .map((strength, index) => (
                                      <Card key={index} className="bg-green-900/10 border-green-500/20">
                                        <CardContent className="p-4">
                                          <h5 className="text-sm font-medium text-green-500">{strength.title}</h5>
                                          <p className="text-xs text-gray-300 mt-1">{strength.description}</p>
                                        </CardContent>
                                      </Card>
                                    ))}
                                </div>
                                
                                {/* Weaknesses Column */}
                                <div className="space-y-3">
                                  <h4 className="text-base font-medium text-red-500 flex items-center gap-2">
                                    <XCircle className="h-4 w-4" />
                                    Weaknesses
                                  </h4>
                                  {strengthsWeaknesses
                                    .filter(item => item.type === 'weakness')
                                    .map((weakness, index) => (
                                      <Card key={index} className="bg-red-900/10 border-red-500/20">
                                        <CardContent className="p-4">
                                          <h5 className="text-sm font-medium text-red-500">{weakness.title}</h5>
                                          <p className="text-xs text-gray-300 mt-1">{weakness.description}</p>
                                        </CardContent>
                                      </Card>
                                    ))}
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Idea Improvement Suggestions */}
                          {ideaSuggestions.length > 0 && (
                            <div className="mt-4">
                              <h3 className="text-lg font-medium mb-2">Improvement Suggestions</h3>
                              <ul className="space-y-2">
                                {ideaSuggestions.map((suggestion, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <Lightbulb className="h-4 w-4 text-[#8B5CF6] mt-1" />
                                    <span className="text-sm">{suggestion}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
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
