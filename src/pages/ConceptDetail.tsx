
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Lightbulb, BookOpen, FileText, Brain, Star, BarChart3, Users, TrendingUp } from 'lucide-react';
import ChatSidebar from '@/components/ai/ChatSidebar';

// Define the concept type
export interface Concept {
  id: number;
  title: string;
  description: string;
  differentiators: string[];
  image?: string;
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

// Sample market research data
const marketResearchData = [
  {
    title: "Market Trends",
    icon: TrendingUp,
    description: "35% of consumers prefer eco-friendly products, with 28% willing to pay a premium for sustainability features."
  },
  {
    title: "Target Demographics",
    icon: Users,
    description: "Primary audience segments include urban professionals (25-40) and health-conscious consumers across all age groups."
  },
  {
    title: "AI-Generated Insights",
    icon: Brain,
    description: "Digital companions to physical products show 47% higher customer retention and 32% increase in brand loyalty."
  }
];

const ConceptDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const handleBackToIdea = () => {
    navigate(`/idea/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 flex">
      {/* AI Chat Sidebar */}
      <ChatSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            {/* Logo and Back button */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={handleBackToIdea}>
                ← Back to Idea Detail
              </Button>
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-[#8B5CF6]" />
                <span className="ml-2 text-xl font-semibold">Concept Creation</span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-4">
              <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
                <Plus className="mr-2 h-4 w-4" />
                Create New Concept
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container py-6 flex-1 overflow-auto">
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="pr-4 pb-10">
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">Transform your idea into market-ready concept variants</p>
              </div>
              
              {/* Concept Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                      
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]" size="sm">Develop</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Market Research Section */}
              <div className="border-t border-border/30 pt-6 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-[#8B5CF6]" />
                  <h2 className="text-xl font-semibold">Market Research Insights</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {marketResearchData.map((item, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <item.icon className="h-4 w-4 text-[#8B5CF6]" />
                        <h3 className="font-medium">{item.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default ConceptDetail;
