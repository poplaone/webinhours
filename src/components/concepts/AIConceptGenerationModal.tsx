
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Brain, BrainCircuit, ChevronRight, Sparkles, Star } from 'lucide-react';
import { toast } from "sonner";
import { Concept } from '@/pages/ConceptDetail';

interface AIConceptGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  ideaId: number;
}

const AIConceptGenerationModal: React.FC<AIConceptGenerationModalProps> = ({ isOpen, onClose, ideaId }) => {
  const [generationStep, setGenerationStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [generatedConcepts, setGeneratedConcepts] = useState<Concept[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock idea data based on id
  const ideaTitle = ideaId === 1 
    ? "AI-Powered Personalized Nutrition App" 
    : ideaId === 2 
      ? "Sustainable Packaging Solution" 
      : "Smart Home Energy System";

  const totalSteps = 4;
  const stepTitles = [
    "Analyzing market data",
    "Identifying key differentiators",
    "Generating concept variants",
    "Finalizing concept details"
  ];

  const stepDescriptions = [
    "Processing market trends, consumer preferences, and competitor analysis data",
    "Identifying unique selling propositions and key differentiators based on analysis",
    "Creating distinct concept variants with differentiated positioning and features",
    "Finalizing concept details, visuals, and market fit analysis"
  ];

  // Sample generated concepts
  const sampleGeneratedConcepts: Concept[] = [
    {
      id: 101,
      title: "Premium Subscription Tier",
      description: "A high-end version with personalized coaching, premium content, and exclusive features for health-conscious professionals.",
      differentiators: [
        "One-on-one nutrition coaching", 
        "Exclusive content library", 
        "Priority customer support", 
        "Advanced analytics dashboard"
      ],
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=300&h=170&q=80"
    },
    {
      id: 102,
      title: "Community-Focused Variant",
      description: "Social-oriented platform that connects users with similar health goals and dietary preferences for motivation and recipe sharing.",
      differentiators: [
        "Community challenges", 
        "Recipe sharing network", 
        "Group progress tracking", 
        "Peer accountability system"
      ],
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=300&h=170&q=80"
    },
    {
      id: 103,
      title: "Health Provider Integration",
      description: "Version that integrates with healthcare providers to incorporate medical dietary restrictions and share progress with physicians.",
      differentiators: [
        "Medical compliance features", 
        "HIPAA-compliant data sharing", 
        "Clinical integration APIs", 
        "Remote monitoring capabilities"
      ],
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=300&h=170&q=80"
    }
  ];

  // Simulating the generation process
  useEffect(() => {
    if (isGenerating) {
      const timer = setInterval(() => {
        setProgress(prev => {
          // Calculate next progress based on current step
          const stepProgress = (generationStep * (100 / totalSteps)) + (prev % (100 / totalSteps) + 1);
          
          // Move to next step if this step is complete
          if (stepProgress >= ((generationStep + 1) * (100 / totalSteps))) {
            if (generationStep < totalSteps - 1) {
              setGenerationStep(generationStep + 1);
            } else {
              clearInterval(timer);
              setIsGenerating(false);
              // Set the generated concepts
              setGeneratedConcepts(sampleGeneratedConcepts);
              toast.success("AI concept generation complete!");
            }
          }
          
          return Math.min(stepProgress, 100);
        });
      }, 120);
      
      return () => clearInterval(timer);
    }
  }, [generationStep, isGenerating]);

  const handleStartGeneration = () => {
    setGenerationStep(0);
    setProgress(0);
    setGeneratedConcepts([]);
    setIsGenerating(true);
  };

  const handleSaveConcepts = () => {
    toast.success("Concepts saved successfully!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-[#8B5CF6]" />
            AI Concept Generation
            <Badge variant="outline" className="ml-2 text-xs font-normal">
              Idea: {ideaTitle}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        {!isGenerating && generatedConcepts.length === 0 && (
          <div className="mt-4 space-y-6">
            <Card className="bg-[#8B5CF6]/5 border-[#8B5CF6]/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#8B5CF6]/10 rounded-full">
                    <Brain className="h-5 w-5 text-[#8B5CF6]" />
                  </div>
                  <h3 className="text-lg font-semibold">AI-Powered Concept Generation</h3>
                </div>
                <p className="text-muted-foreground mb-3">
                  Our AI will analyze market trends, consumer preferences, and your idea details to generate 
                  unique concept variants with differentiated positioning and features.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-[#8B5CF6]" />
                    <p className="text-sm">Market fit analysis based on current trends</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-[#8B5CF6]" />
                    <p className="text-sm">Identification of unique selling propositions</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-[#8B5CF6]" />
                    <p className="text-sm">Feature sets tailored to different market segments</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-[#8B5CF6]" />
                    <p className="text-sm">Distinct positioning strategies for each concept</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button variant="purple" onClick={handleStartGeneration}>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Concepts
              </Button>
            </div>
          </div>
        )}

        {isGenerating && (
          <div className="mt-4 space-y-6">
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Generation in progress...</span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-4">
              {stepTitles.map((title, index) => (
                <div key={index} className={`flex items-start gap-3 ${index < generationStep ? 'opacity-50' : index === generationStep ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`p-2 rounded-full ${index <= generationStep ? 'bg-[#8B5CF6]/20' : 'bg-muted'}`}>
                    <BrainCircuit className={`h-5 w-5 ${index <= generationStep ? 'text-[#8B5CF6]' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <h3 className="font-medium">{title}</h3>
                    <p className="text-sm text-muted-foreground">{stepDescriptions[index]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isGenerating && generatedConcepts.length > 0 && (
          <div className="mt-4 space-y-6">
            <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
              <Sparkles className="h-5 w-5 text-[#8B5CF6]" />
              Generated Concepts
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
              {generatedConcepts.map((concept) => (
                <Card key={concept.id} className="border border-border/40 bg-card/50 backdrop-blur">
                  {concept.image && (
                    <div className="h-36 overflow-hidden">
                      <img 
                        src={concept.image} 
                        alt={concept.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 rounded-full bg-[#8B5CF6]/10">
                        <Lightbulb className="h-4 w-4 text-[#8B5CF6]" />
                      </div>
                      <h3 className="font-semibold">{concept.title}</h3>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {concept.description}
                    </p>
                    
                    <div className="mt-2">
                      <div className="flex items-center gap-1 text-sm font-medium mb-1">
                        <Star className="h-4 w-4 text-[#8B5CF6]" />
                        Key Differentiators
                      </div>
                      <ul className="text-xs space-y-1 ml-5 list-disc text-muted-foreground">
                        {concept.differentiators.map((diff, index) => (
                          <li key={index}>{diff}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="purple" onClick={handleSaveConcepts}>
                Save Concepts
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AIConceptGenerationModal;
