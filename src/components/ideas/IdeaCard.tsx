
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, Radio, ExternalLink } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IdeaCardProps {
  idea: {
    id: number;
    title: string;
    description: string;
    tags: string[];
    timestamp: string;
    trendAnalysis: { score: number; trend: string };
    consumerDemandScore: number;
    industryRelevance: string;
    image: string;
    category: string;
  };
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  const navigate = useNavigate();

  const viewIdeaDetail = (ideaId: number) => {
    navigate(`/idea/${ideaId}`);
  };

  return (
    <Card 
      key={idea.id} 
      className="border border-border/40 bg-card/50 backdrop-blur overflow-hidden flex flex-col hover:shadow-lg transition-shadow group relative"
    >
      {/* Image container with hover overlay */}
      <div className="h-40 overflow-hidden relative">
        <img 
          src={idea.image} 
          alt={idea.title} 
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
        />
        {/* View Detail overlay that appears on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button 
            onClick={() => viewIdeaDetail(idea.id)} 
            variant="secondary" 
            className="bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View Detail
          </Button>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{idea.title}</h3>
          <span className="text-xs text-muted-foreground">{idea.timestamp}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{idea.description}</p>
        
        {/* Metrics section with improved visuals */}
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs border-t border-border/40 pt-2">
          <div className="flex flex-col bg-[#8B5CF6]/5 p-2 rounded-md">
            <div className="flex items-center gap-1 text-muted-foreground mb-1">
              <TrendingUp className="h-3 w-3 text-[#8B5CF6]" />
              <span>Trend</span>
            </div>
            <div className={cn(
              "font-medium text-sm",
              idea.trendAnalysis.trend === "up" ? "text-emerald-500" : 
              idea.trendAnalysis.trend === "down" ? "text-red-500" : "text-amber-500"
            )}>
              {idea.trendAnalysis.score}%
              {idea.trendAnalysis.trend === "up" && " ↑"}
              {idea.trendAnalysis.trend === "down" && " ↓"}
              {idea.trendAnalysis.trend === "stable" && " →"}
            </div>
          </div>
          
          <div className="flex flex-col bg-[#8B5CF6]/5 p-2 rounded-md">
            <div className="flex items-center gap-1 text-muted-foreground mb-1">
              <Users className="h-3 w-3 text-[#8B5CF6]" />
              <span>Demand</span>
            </div>
            <div className="font-medium text-sm">
              {idea.consumerDemandScore}%
            </div>
          </div>
          
          <div className="flex flex-col bg-[#8B5CF6]/5 p-2 rounded-md">
            <div className="flex items-center gap-1 text-muted-foreground mb-1">
              <Radio className="h-3 w-3 text-[#8B5CF6]" />
              <span>Relevance</span>
            </div>
            <div className="font-medium text-sm">
              {idea.industryRelevance}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 mt-2">
          {idea.tags.map((tag: string, index: number) => (
            <span key={index} className="bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default IdeaCard;
