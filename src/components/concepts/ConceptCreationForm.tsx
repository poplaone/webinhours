
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from 'react-router-dom';
import { BookOpen, Lightbulb, Star, Check, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage, 
  FormDescription 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Concept } from './ConceptCreationModal';

// Define form schema
const conceptFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  differentiators: z.string().min(5, { message: "Please add at least one differentiator." }),
  marketSegment: z.string().min(3, { message: "Market segment is required." }),
  valueProposition: z.string().min(10, { message: "Value proposition is required." }),
  pricingStrategy: z.string().optional(),
  keyFeatures: z.string().min(5, { message: "Please add at least one key feature." }),
  developmentRequirements: z.string().optional(),
});

type ConceptFormValues = z.infer<typeof conceptFormSchema>;

interface ConceptCreationFormProps {
  isOpen: boolean;
  onClose: () => void;
  ideaTitle?: string;
}

const ConceptCreationForm: React.FC<ConceptCreationFormProps> = ({ isOpen, onClose, ideaTitle }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [previewData, setPreviewData] = useState<Partial<ConceptFormValues> | null>(null);
  const [differentiatorList, setDifferentiatorList] = useState<string[]>([]);
  const [featureList, setFeatureList] = useState<string[]>([]);
  const [newDifferentiator, setNewDifferentiator] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<ConceptFormValues>({
    resolver: zodResolver(conceptFormSchema),
    defaultValues: {
      title: "",
      description: "",
      differentiators: "",
      marketSegment: "",
      valueProposition: "",
      pricingStrategy: "",
      keyFeatures: "",
      developmentRequirements: "",
    },
  });

  const steps = [
    { number: 1, title: "Basic Information" },
    { number: 2, title: "Key Differentiators" },
    { number: 3, title: "Market Position" },
    { number: 4, title: "Features & Requirements" },
    { number: 5, title: "Review & Create" },
  ];

  const handleAddDifferentiator = () => {
    if (newDifferentiator.trim() === "") return;
    setDifferentiatorList([...differentiatorList, newDifferentiator]);
    setNewDifferentiator("");
    // Update the form field with the comma-separated list
    form.setValue("differentiators", [...differentiatorList, newDifferentiator].join(","));
  };

  const handleAddFeature = () => {
    if (newFeature.trim() === "") return;
    setFeatureList([...featureList, newFeature]);
    setNewFeature("");
    // Update the form field with the comma-separated list
    form.setValue("keyFeatures", [...featureList, newFeature].join(","));
  };

  const nextStep = () => {
    const currentStepFields = getFieldsForCurrentStep();
    const isStepValid = currentStepFields.every(field => form.getFieldState(field as any).invalid === false);
    
    if (isStepValid) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      // Trigger validation for fields in the current step
      form.trigger(currentStepFields as any[]);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getFieldsForCurrentStep = (): string[] => {
    switch (currentStep) {
      case 1:
        return ["title", "description"];
      case 2:
        return ["differentiators"];
      case 3:
        return ["marketSegment", "valueProposition", "pricingStrategy"];
      case 4:
        return ["keyFeatures", "developmentRequirements"];
      default:
        return [];
    }
  };

  const onSubmit = (data: ConceptFormValues) => {
    if (currentStep < 5) {
      nextStep();
      setPreviewData(data);
    } else {
      // Final submission
      console.log("Form submitted:", data);
      const newConcept: Concept = {
        id: Date.now(), // Generate a temporary ID
        title: data.title,
        description: data.description,
        differentiators: differentiatorList.length > 0 ? differentiatorList : data.differentiators.split(","),
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=300&h=170&q=80", // Placeholder image
      };
      
      toast({
        title: "Concept Created",
        description: `${data.title} has been created successfully.`,
      });
      
      // Close the modal and navigate to concept detail
      onClose();
      navigate(`/concept-details/${newConcept.id}`);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Concept Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter concept title" {...field} />
                  </FormControl>
                  <FormDescription>
                    Create a clear, concise title that describes your concept variant.
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
                  <FormLabel>Concept Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your concept in detail..." 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a comprehensive description of your concept variant.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <div className="mb-4">
              <h3 className="text-md font-medium mb-2">Key Differentiators</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add key points that differentiate this concept from others.
              </p>
              
              <div className="flex gap-2 mb-4">
                <Input 
                  placeholder="Add a differentiator..." 
                  value={newDifferentiator}
                  onChange={(e) => setNewDifferentiator(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddDifferentiator();
                    }
                  }}
                />
                <Button 
                  type="button" 
                  onClick={handleAddDifferentiator}
                  className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                >
                  Add
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {differentiatorList.map((diff, index) => (
                  <Badge key={index} className="bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20 py-1.5">
                    {diff}
                  </Badge>
                ))}
              </div>
              
              <FormField
                control={form.control}
                name="differentiators"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {differentiatorList.length === 0 && (
                <p className="text-sm text-amber-500">Please add at least one differentiator to continue.</p>
              )}
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="marketSegment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Market Segment</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Premium customers, Eco-conscious consumers..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Define the specific market segment this concept targets.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="valueProposition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value Proposition</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What unique value does this concept provide to customers?" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Clearly articulate the unique value this concept offers to your target customers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="pricingStrategy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pricing Strategy</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Premium pricing, Value-based pricing..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Optional: Define the pricing approach for this concept.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-4">
            <div className="mb-4">
              <h3 className="text-md font-medium mb-2">Key Features</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add the main features that define this concept.
              </p>
              
              <div className="flex gap-2 mb-4">
                <Input 
                  placeholder="Add a feature..." 
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                />
                <Button 
                  type="button" 
                  onClick={handleAddFeature}
                  className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                >
                  Add
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {featureList.map((feature, index) => (
                  <Badge key={index} className="bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20 py-1.5">
                    {feature}
                  </Badge>
                ))}
              </div>
              
              <FormField
                control={form.control}
                name="keyFeatures"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {featureList.length === 0 && (
                <p className="text-sm text-amber-500">Please add at least one key feature to continue.</p>
              )}
            </div>
            
            <FormField
              control={form.control}
              name="developmentRequirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Development Requirements</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Specify any technical, resource or timeline requirements..." 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Optional: Outline any specific requirements for developing this concept.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
        
      case 5:
        // Prepare the consolidated data for review
        const formData = form.getValues();
        return (
          <div className="space-y-6">
            <div className="rounded-md border p-4 bg-[#8B5CF6]/5">
              <h3 className="font-semibold flex items-center gap-2 mb-3">
                <Lightbulb className="h-5 w-5 text-[#8B5CF6]" />
                {formData.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{formData.description}</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-[#8B5CF6]" />
                    Key Differentiators
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {differentiatorList.map((diff, index) => (
                      <Badge key={index} className="bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20 py-1.5">
                        {diff}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-background/50">
                    <CardContent className="p-4">
                      <h4 className="text-sm font-medium mb-1">Target Market</h4>
                      <p className="text-sm text-muted-foreground">{formData.marketSegment}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-background/50">
                    <CardContent className="p-4">
                      <h4 className="text-sm font-medium mb-1">Pricing Strategy</h4>
                      <p className="text-sm text-muted-foreground">
                        {formData.pricingStrategy || "Not specified"}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Value Proposition</h4>
                  <p className="text-sm text-muted-foreground">{formData.valueProposition}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Features</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featureList.map((feature, index) => (
                      <Badge key={index} className="bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20 py-1.5">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {formData.developmentRequirements && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Development Requirements</h4>
                    <p className="text-sm text-muted-foreground">{formData.developmentRequirements}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl overflow-hidden">
        <ScrollArea className="h-[80vh] overflow-y-auto pr-4">
          <div className="pr-4 pb-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-[#8B5CF6]" />
                Manual Concept Creation
                {ideaTitle && <span className="text-muted-foreground text-lg ml-2">for {ideaTitle}</span>}
              </DialogTitle>
            </DialogHeader>
            
            {/* Step Indicator */}
            <div className="mb-8">
              <div className="flex justify-between items-center">
                {steps.map((step) => (
                  <div key={step.number} className="flex flex-col items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center 
                        ${currentStep >= step.number ? 'bg-[#8B5CF6] text-white' : 'bg-gray-200 text-gray-500 dark:bg-gray-700'}`}
                    >
                      {currentStep > step.number ? <Check className="h-5 w-5" /> : step.number}
                    </div>
                    <span className="text-xs mt-2 text-center max-w-[80px]">{step.title}</span>
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <div className="absolute top-0 h-1 bg-gray-200 dark:bg-gray-700 w-full"></div>
                <div 
                  className="absolute top-0 h-1 bg-[#8B5CF6] transition-all" 
                  style={{ width: `${(currentStep - 1) / (steps.length - 1) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {renderStepContent()}
                
                <div className="flex justify-between pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    Back
                  </Button>
                  
                  <Button 
                    type={currentStep === 5 ? "submit" : "button"}
                    className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                    onClick={currentStep < 5 ? nextStep : undefined}
                  >
                    {currentStep < 5 ? (
                      <>
                        Next
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </>
                    ) : "Create Concept"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ConceptCreationForm;
