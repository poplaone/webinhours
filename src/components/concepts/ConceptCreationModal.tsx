
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Lightbulb, BookOpen, FileText, Brain, Star, BarChart3, Users, TrendingUp } from 'lucide-react';

// Define the concept type
export interface Concept {
  id: number;
  title: string;
  description: string;
  differentiators: string[];
  image?: string;
}

interface ConceptCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  ideaTitle?: string;
}

// Sample concepts with differentiators
const sampleConcepts: Concept[] = [
  {
    id: 1,
    title: "Premium Edition",
    description: "A high-end version with exclusive features and premium materials targeted at luxury consumers.",
    differentiators: ["Luxury packaging", "Premium ingredients", "Limited edition", "Higher price point"],
    image: "https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?auto=format&fit=crop&w=300&h=170&q=80"
  },
  {
    id: 2,
    title: "Eco-Conscious Variant",
    description: "Fully sustainable version with biodegradable packaging and ethically sourced materials.",
    differentiators: ["Zero-waste packaging", "Carbon-neutral", "Plant-based materials", "Environmental messaging"],
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=300&h=170&q=80"
  },
  {
    id: 3,
    title: "Digital Companion",
    description: "Product with integrated digital experience through mobile app and QR-enabled packaging.",
    differentiators: ["AR experiences", "Product tracking", "Digital community", "Gamification elements"],
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=300&h=170&q=80"
  },
  {
    id: 4,
    title: "Value Edition",
    description: "Cost-effective version with essential features at an accessible price point.",
    differentiators: ["Simplified packaging", "Core functionality", "Mass market appeal", "Competitive pricing"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&h=170&q=80"
  },
  {
    id: 5,
    title: "Subscription Model",
    description: "Regular delivery service with personalized product selections and member benefits.",
    differentiators: ["Recurring revenue", "Customer loyalty", "Personalization", "Data collection"],
    image: "https://images.unsplash.com/photo-1617644491633-9cc71756fee5?auto=format&fit=crop&w=300&h=170&q=80"
  },
  {
    id: 6,
    title: "Co-branded Partnership",
    description: "Strategic collaboration with complementary brand to create a unique offering.",
    differentiators: ["Expanded audience", "Shared marketing", "Combined expertise", "Unique positioning"],
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=300&h=170&q=80"
  }
];

const ConceptCreationModal: React.FC<ConceptCreationModalProps> = ({ isOpen, onClose, ideaTitle }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl overflow-hidden">
        <ScrollArea className="h-[80vh] overflow-y-auto pr-4">
          <div className="pr-4 pb-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-[#8B5CF6]" />
                Concept Creation
                {ideaTitle && <span className="text-muted-foreground text-lg ml-2">for {ideaTitle}</span>}
              </DialogTitle>
            </DialogHeader>

            {/* Create New Concept Button */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">Transform your idea into market-ready concept variants</p>
              <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
                <Plus className="mr-2 h-4 w-4" />
                Create New Concept
              </Button>
            </div>

            {/* Concept Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleConcepts.map((concept) => (
                <Card key={concept.id} className="border border-border/40 bg-card/50 backdrop-blur overflow-hidden hover:shadow-md transition-shadow">
                  {/* Image */}
                  {concept.image && (
                    <div className="h-40 overflow-hidden">
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
                      <h3 className="font-semibold text-lg">{concept.title}</h3>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {concept.description}
                    </p>
                    
                    {/* Key Differentiators Section */}
                    <div className="mt-2">
                      <div className="flex items-center gap-1 text-sm font-medium mb-1">
                        <Star className="h-4 w-4 text-[#8B5CF6]" />
                        Key Differentiators
                      </div>
                      <ul className="text-sm space-y-1 ml-5 list-disc text-muted-foreground">
                        {concept.differentiators.map((diff, index) => (
                          <li key={index}>{diff}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]" size="sm">Develop</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Market Research Section */}
            <div className="mt-8 border-t border-border/30 pt-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-5 w-5 text-[#8B5CF6]" />
                <h2 className="text-xl font-semibold">Market Research Insights</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-[#8B5CF6]" />
                    <h3 className="font-medium">Market Trends</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    35% of consumers prefer eco-friendly products, with 28% willing to pay a premium for sustainability features.
                  </p>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-[#8B5CF6]" />
                    <h3 className="font-medium">Target Demographics</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Primary audience segments include urban professionals (25-40) and health-conscious consumers across all age groups.
                  </p>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-4 w-4 text-[#8B5CF6]" />
                    <h3 className="font-medium">AI-Generated Insights</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Digital companions to physical products show 47% higher customer retention and 32% increase in brand loyalty.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ConceptCreationModal;
