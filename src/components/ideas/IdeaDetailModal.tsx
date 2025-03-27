
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Calendar, Lightbulb, TrendingUp, Users, Radio } from 'lucide-react';
import { cn } from "@/lib/utils";

export interface Idea {
  id: number;
  title: string;
  description: string;
  tags: string[];
  timestamp: string;
  trendAnalysis: { score: number; trend: 'up' | 'down' | 'stable' };
  consumerDemandScore: number;
  industryRelevance: string;
  image: string;
}

interface IdeaDetailModalProps {
  idea: Idea | null;
  isOpen: boolean;
  onClose: () => void;
}

const IdeaDetailModal: React.FC<IdeaDetailModalProps> = ({ idea, isOpen, onClose }) => {
  if (!idea) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{idea.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Added {idea.timestamp}
          </DialogDescription>
        </DialogHeader>

        {/* Hero Image */}
        <div className="w-full h-60 overflow-hidden rounded-md mb-6">
          <img 
            src={idea.image} 
            alt={idea.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {idea.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Overview</h3>
          <p className="text-muted-foreground">{idea.description}</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-[#8B5CF6]/10 rounded-full">
                  <TrendingUp className="h-5 w-5 text-[#8B5CF6]" />
                </div>
                <h3 className="font-medium">Trend Analysis</h3>
              </div>
              <div className={cn(
                "text-2xl font-bold",
                idea.trendAnalysis.trend === "up" ? "text-emerald-500" : 
                idea.trendAnalysis.trend === "down" ? "text-red-500" : "text-amber-500"
              )}>
                {idea.trendAnalysis.score}%
                {idea.trendAnalysis.trend === "up" && " ↑"}
                {idea.trendAnalysis.trend === "down" && " ↓"}
                {idea.trendAnalysis.trend === "stable" && " →"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {idea.trendAnalysis.trend === "up" 
                  ? "Trending upward in market interest" 
                  : idea.trendAnalysis.trend === "down" 
                    ? "Declining in market interest" 
                    : "Maintaining stable market interest"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-[#8B5CF6]/10 rounded-full">
                  <Users className="h-5 w-5 text-[#8B5CF6]" />
                </div>
                <h3 className="font-medium">Consumer Demand</h3>
              </div>
              <div className="text-2xl font-bold">
                {idea.consumerDemandScore}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {idea.consumerDemandScore > 80 ? "Very high consumer interest" :
                 idea.consumerDemandScore > 60 ? "Strong consumer interest" :
                 idea.consumerDemandScore > 40 ? "Moderate consumer interest" : "Low consumer interest"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-[#8B5CF6]/10 rounded-full">
                  <Radio className="h-5 w-5 text-[#8B5CF6]" />
                </div>
                <h3 className="font-medium">Industry Relevance</h3>
              </div>
              <div className="text-2xl font-bold">
                {idea.industryRelevance}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Alignment with current industry priorities and trends
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Example Expanded Content */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Market Opportunity</h3>
          <p className="text-muted-foreground mb-4">
            This idea presents a significant opportunity in the current market landscape. Based on our analysis, there is substantial room for growth and differentiation in this space.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">Development Considerations</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
            <li>Technical feasibility assessment needed</li>
            <li>Consider regulatory compliance requirements</li>
            <li>Evaluate potential partnerships to accelerate development</li>
            <li>Initial MVP could focus on core functionality</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
            <Lightbulb className="mr-2 h-4 w-4" />
            Develop Idea
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IdeaDetailModal;
