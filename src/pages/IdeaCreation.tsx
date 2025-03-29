
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, Loader2, Sparkles, TrendingUp, Users, BookOpen, FileText, BarChart3, Brain } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  problemStatement: z.string().min(10, {
    message: "Problem statement must be at least 10 characters.",
  }),
  targetAudience: z.string().min(10, {
    message: "Target audience must be at least 10 characters.",
  }),
  uniqueSellingProposition: z.string().min(10, {
    message: "Unique selling proposition must be at least 10 characters.",
  }),
  solutionOutline: z.string().min(10, {
    message: "Solution outline must be at least 10 characters.",
  }),
  revenueModel: z.string().min(10, {
    message: "Revenue model must be at least 10 characters.",
  }),
  potentialChallenges: z.string().min(10, {
    message: "Potential challenges must be at least 10 characters.",
  }),
  marketAnalysis: z.string().optional(),
  competitiveAnalysis: z.string().optional(),
  growthPotentialAnalysis: z.string().optional(),
  detailedInsights: z.string().optional(),
  trendAnalysis: z.object({
    score: z.number(),
    trend: z.string(),
  }).optional(),
  consumerDemandScore: z.number().optional(),
  industryRelevance: z.string().optional(),
});

const IdeaCreation = () => {
  const initialValues = {
    title: "",
    description: "",
    problemStatement: "",
    targetAudience: "",
    uniqueSellingProposition: "",
    solutionOutline: "",
    revenueModel: "",
    potentialChallenges: "",
    marketAnalysis: "",
    competitiveAnalysis: "",
    growthPotentialAnalysis: "",
    detailedInsights: "",
    trendAnalysis: { score: 50, trend: "stable" },
    consumerDemandScore: 50,
    industryRelevance: "Medium",
  };

  const tagOptions = [
    "Tech", "Healthcare", "Education", "Finance", 
    "Entertainment", "E-commerce", "Social Media", 
    "Sustainability", "AI", "Mobile"
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast()

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      problemStatement: initialValues?.problemStatement || "",
      targetAudience: initialValues?.targetAudience || "",
      uniqueSellingProposition: initialValues?.uniqueSellingProposition || "",
      solutionOutline: initialValues?.solutionOutline || "",
      revenueModel: initialValues?.revenueModel || "",
      potentialChallenges: initialValues?.potentialChallenges || "",
      marketAnalysis: initialValues?.marketAnalysis || "",
      competitiveAnalysis: initialValues?.competitiveAnalysis || "",
      growthPotentialAnalysis: initialValues?.growthPotentialAnalysis || "",
      detailedInsights: initialValues?.detailedInsights || "",
      trendAnalysis: initialValues?.trendAnalysis || { score: 50, trend: "stable" },
      consumerDemandScore: initialValues?.consumerDemandScore || 50,
      industryRelevance: initialValues?.industryRelevance || "Medium",
    },
  })

  const title = form.watch("title");
  const description = form.watch("description");
  const problemStatement = form.watch("problemStatement");
  const targetAudience = form.watch("targetAudience");
  const uniqueSellingProposition = form.watch("uniqueSellingProposition");
  const solutionOutline = form.watch("solutionOutline");
  const revenueModel = form.watch("revenueModel");
  const potentialChallenges = form.watch("potentialChallenges");
  const marketAnalysis = form.watch("marketAnalysis");
  const competitiveAnalysis = form.watch("competitiveAnalysis");
  const growthPotentialAnalysis = form.watch("growthPotentialAnalysis");
  const detailedInsights = form.watch("detailedInsights");
  const trendAnalysis = form.watch("trendAnalysis");
  const consumerDemandScore = form.watch("consumerDemandScore");
  const industryRelevance = form.watch("industryRelevance");

  const steps = [
    "Describe your idea",
    "Add details",
    "Review"
  ];

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast({
      title: "Success!",
      description: "Your idea has been saved.",
    })
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </Button>
          <div className="flex items-center">
            <Sparkles className="h-5 w-5 text-[#8B5CF6]" />
            <span className="ml-2 text-xl font-semibold">New Idea</span>
          </div>
          <div></div>
        </div>
      </header>
      
      <main className="container py-6">
        <div className="mb-8">
          <div className="text-sm font-medium leading-none text-muted-foreground">Step {currentStep + 1} of {steps.length}</div>
          <h2 className="mt-2 font-semibold text-3xl leading-none tracking-tight">{steps[currentStep]}</h2>
          <Progress value={((currentStep + 1) / steps.length) * 100} className="mt-4" />
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {currentStep === 0 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="A concise title for your idea" {...field} />
                      </FormControl>
                      <FormDescription>
                        This will be the title of your idea.
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
                          placeholder="A brief description of your idea"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Describe your idea in a few sentences.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {tagOptions && tagOptions.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        onClick={() => handleTagToggle(tag)}
                        className={cn(
                          "cursor-pointer",
                          selectedTags.includes(tag) ? "bg-[#8B5CF6] text-white hover:bg-[#7C3AED]" : "border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10"
                        )}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" onClick={() => navigate('/dashboard')} variant="outline">Cancel</Button>
                  <Button type="button" onClick={() => setCurrentStep(1)}>Next</Button>
                </div>
              </div>
            )}
            
            {currentStep === 1 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="problemStatement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Problem Statement</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What problem does your idea solve?"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Clearly define the problem your idea addresses.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Who is your target audience?"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Describe your ideal customer or user.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="uniqueSellingProposition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unique Selling Proposition</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What makes your idea unique?"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Explain what sets your idea apart from the competition.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="solutionOutline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Solution Outline</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How will your idea solve the problem?"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Outline the key steps to implement your idea.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="revenueModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Revenue Model</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How will your idea generate revenue?"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Describe how your idea will make money.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="potentialChallenges"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Potential Challenges</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What challenges might you face?"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Identify potential obstacles and how you might overcome them.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Accordion type="single" collapsible>
                  <AccordionItem value="market-analysis">
                    <AccordionTrigger>Market Analysis (Optional)</AccordionTrigger>
                    <AccordionContent>
                      <FormField
                        control={form.control}
                        name="marketAnalysis"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Market Analysis</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe the market for your idea."
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Analyze the market size, trends, and potential.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="competitiveAnalysis"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Competitive Analysis</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Who are your competitors?"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Identify your main competitors and their strengths/weaknesses.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="growthPotentialAnalysis"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Growth Potential Analysis</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="What is the growth potential of your idea?"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Analyze the potential for growth and expansion.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="ai-insights">
                    <AccordionTrigger>AI-Generated Insights (Optional)</AccordionTrigger>
                    <AccordionContent>
                      <FormField
                        control={form.control}
                        name="detailedInsights"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Detailed Insights</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter any AI-generated insights."
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Add any detailed insights generated by AI.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex justify-between space-x-4">
                  <Button variant="outline" onClick={() => setCurrentStep(0)} className="border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Description
                  </Button>
                  <Button type="button" onClick={() => setCurrentStep(2)}>Review</Button>
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">{title}</h1>
                  <div className="flex gap-2">
                    {selectedTags.map((tag) => (
                      <Badge key={tag} className="bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs font-medium rounded-full px-2 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-muted-foreground mt-2">{description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="p-4 border border-border/40 bg-card/50 backdrop-blur">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-[#8B5CF6]" />
                      <h3 className="font-medium">Trend Analysis</h3>
                    </div>
                    <div className={cn(
                      "font-medium text-sm",
                      {
                        "text-emerald-500": trendAnalysis?.trend === "up",
                        "text-red-500": trendAnalysis?.trend === "down",
                        "text-amber-500": trendAnalysis?.trend === "stable"
                      }
                    )}>
                      {trendAnalysis?.score || 0}%
                      {trendAnalysis?.trend === "up" && " ↑"}
                      {trendAnalysis?.trend === "down" && " ↓"}
                      {trendAnalysis?.trend === "stable" && " →"}
                    </div>
                  </Card>
                  <Card className="p-4 border border-border/40 bg-card/50 backdrop-blur">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-[#8B5CF6]" />
                      <h3 className="font-medium">Consumer Demand</h3>
                    </div>
                    <p className="font-medium text-sm">{consumerDemandScore || 0}%</p>
                  </Card>
                  <Card className="p-4 border border-border/40 bg-card/50 backdrop-blur">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-[#8B5CF6]" />
                      <h3 className="font-medium">Industry Relevance</h3>
                    </div>
                    <p className="font-medium text-sm">{industryRelevance || "Not analyzed"}</p>
                  </Card>
                </div>

                <Card className="p-6 border border-border/40 bg-card/50 backdrop-blur mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#8B5CF6]" />
                    Core Idea Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Problem Statement</h3>
                      <p className="text-sm text-muted-foreground">{problemStatement}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Target Audience</h3>
                      <p className="text-sm text-muted-foreground">{targetAudience}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Unique Selling Proposition</h3>
                      <p className="text-sm text-muted-foreground">{uniqueSellingProposition}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Solution Outline</h3>
                      <p className="text-sm text-muted-foreground">{solutionOutline}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Revenue Model</h3>
                      <p className="text-sm text-muted-foreground">{revenueModel}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Potential Challenges</h3>
                      <p className="text-sm text-muted-foreground">{potentialChallenges}</p>
                    </div>
                  </div>
                </Card>

                {marketAnalysis && (
                  <Card className="p-6 border border-border/40 bg-card/50 backdrop-blur mb-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-[#8B5CF6]" />
                      Market Analysis
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">{marketAnalysis}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-2">Competitive Landscape</h3>
                        <p className="text-sm text-muted-foreground">{competitiveAnalysis || "Not provided"}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Potential for Growth</h3>
                        <p className="text-sm text-muted-foreground">{growthPotentialAnalysis || "Not provided"}</p>
                      </div>
                    </div>
                  </Card>
                )}

                {detailedInsights && (
                  <Card className="p-6 border border-border/40 bg-card/50 backdrop-blur mb-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Brain className="h-5 w-5 text-[#8B5CF6]" />
                      AI-Generated Insights
                    </h2>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{detailedInsights}</p>
                  </Card>
                )}

                <div className="flex justify-end space-x-4 mt-8">
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => setCurrentStep(1)}
                    className="border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Details
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Save Idea
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>
      </main>
    </div>
  );
};

export default IdeaCreation;
