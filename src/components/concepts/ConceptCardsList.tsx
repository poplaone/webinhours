
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Star, ExternalLink } from 'lucide-react';

interface ConceptCardsListProps {
  ideaId?: number;
}

// Sample concept data - this would typically come from an API
const sampleConcepts = [
  {
    id: 1,
    title: "Premium Edition",
    description: "A high-end version with exclusive features and premium materials targeted at luxury consumers.",
    differentiators: ["Luxury packaging", "Premium ingredients", "Limited edition"],
    ideaId: 1
  },
  {
    id: 2,
    title: "Eco-Conscious Variant",
    description: "Fully sustainable version with biodegradable packaging and ethically sourced materials.",
    differentiators: ["Zero-waste packaging", "Carbon-neutral", "Plant-based materials"],
    ideaId: 1
  },
  {
    id: 3,
    title: "Digital Companion",
    description: "Product with integrated digital experience through mobile app and QR-enabled packaging.",
    differentiators: ["AR experiences", "Product tracking", "Digital community"],
    ideaId: 9
  },
  {
    id: 4,
    title: "Value Edition",
    description: "Cost-effective version with essential features at an accessible price point.",
    differentiators: ["Simplified packaging", "Core functionality", "Mass market appeal"],
    ideaId: 10
  }
];

const ConceptCardsList: React.FC<ConceptCardsListProps> = ({ ideaId }) => {
  const navigate = useNavigate();
  
  // Filter concepts by ideaId if provided
  const concepts = ideaId 
    ? sampleConcepts.filter(concept => concept.ideaId === ideaId)
    : [];
    
  if (concepts.length === 0 && ideaId) {
    return (
      <div className="p-6 text-center">
        <Lightbulb className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        <h3 className="text-lg font-medium mb-2">No concepts yet</h3>
        <p className="text-muted-foreground mb-4">
          This idea doesn't have any concepts yet. Create one to start developing this idea further.
        </p>
        <Button 
          className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
          onClick={() => navigate(`/concept/new?ideaId=${ideaId}`)}
        >
          Create New Concept
        </Button>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Concepts</h2>
        {ideaId && (
          <Button 
            className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
            onClick={() => navigate(`/concept/new?ideaId=${ideaId}`)}
          >
            Create New Concept
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        {concepts.map(concept => (
          <Card key={concept.id} className="border border-border/40 bg-card/50 backdrop-blur overflow-hidden hover:shadow-md transition-shadow">
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
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate(`/concept/${concept.id}`)}
              >
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                View Details
              </Button>
              <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]" size="sm">
                Develop
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConceptCardsList;
