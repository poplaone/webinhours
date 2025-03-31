
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Star } from 'lucide-react';

// Sample concept data for demonstration
const sampleConcepts = [
  {
    id: 1,
    title: "Premium Edition",
    description: "A high-end version with exclusive features and premium materials targeted at luxury consumers.",
    differentiators: ["Luxury packaging", "Premium ingredients", "Limited edition"],
    image: "https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?auto=format&fit=crop&w=300&h=170&q=80"
  },
  {
    id: 2,
    title: "Eco-Conscious Variant",
    description: "Fully sustainable version with biodegradable packaging and ethically sourced materials.",
    differentiators: ["Zero-waste packaging", "Carbon-neutral", "Plant-based materials"],
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=300&h=170&q=80"
  },
  {
    id: 3,
    title: "Digital Companion",
    description: "Product with integrated digital experience through mobile app and QR-enabled packaging.",
    differentiators: ["AR experiences", "Product tracking", "Digital community"],
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=300&h=170&q=80"
  }
];

interface ConceptCardsListProps {
  ideaId: number | null;
}

const ConceptCardsList: React.FC<ConceptCardsListProps> = ({ ideaId }) => {
  const navigate = useNavigate();
  
  if (!ideaId) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Select an idea to view its concepts</p>
      </div>
    );
  }

  const viewConceptDetail = (conceptId: number) => {
    navigate(`/concept/${conceptId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Associated Concepts</h2>
        <Button 
          variant="outline" 
          className="border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10"
          onClick={() => navigate(`/concept/${ideaId}`)}
        >
          <Lightbulb className="mr-2 h-4 w-4" />
          New Concept
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sampleConcepts.map((concept) => (
          <Card key={concept.id} className="border border-border/40 bg-card/50 backdrop-blur overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex">
              {/* Image */}
              {concept.image && (
                <div className="h-auto w-24 overflow-hidden">
                  <img 
                    src={concept.image} 
                    alt={concept.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="flex-1">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1 rounded-full bg-[#8B5CF6]/10">
                      <Lightbulb className="h-4 w-4 text-[#8B5CF6]" />
                    </div>
                    <h3 className="font-semibold">{concept.title}</h3>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {concept.description}
                  </p>
                  
                  {/* Key Differentiators Section */}
                  <div className="flex items-center gap-1 text-xs mb-1">
                    <Star className="h-3 w-3 text-[#8B5CF6]" />
                    <span className="font-medium">Key Differentiators:</span>
                    <span className="text-muted-foreground">{concept.differentiators.join(", ")}</span>
                  </div>
                </CardContent>
                
                <CardFooter className="p-3 pt-0 flex justify-end">
                  <Button 
                    className="bg-[#8B5CF6] hover:bg-[#7C3AED]" 
                    size="sm"
                    onClick={() => viewConceptDetail(concept.id)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConceptCardsList;
