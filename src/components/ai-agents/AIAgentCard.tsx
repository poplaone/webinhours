import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Play, Star, Bot } from "lucide-react";
import { AIAgent } from '@/types/aiAgent';

interface AIAgentCardProps {
  agent: AIAgent;
  onUse?: (agent: AIAgent) => void;
  onView?: (agent: AIAgent) => void;
}

export const AIAgentCard = ({ agent, onUse, onView }: AIAgentCardProps) => {
  const handleUse = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUse?.(agent);
  };

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onView?.(agent);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg group-hover:scale-[1.02]">
        <div className="relative">
          <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
            {agent.thumbnail_url ? (
              <img 
                src={agent.thumbnail_url} 
                alt={agent.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <Bot className="h-16 w-16 text-purple-600" />
            )}
          </div>
          
          {agent.is_featured && (
            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-purple-600 to-blue-600">
              Featured
            </Badge>
          )}
          
          <Badge 
            variant="secondary" 
            className="absolute top-2 right-2"
          >
            {agent.agent_type}
          </Badge>
        </div>

        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg line-clamp-1">{agent.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {agent.description}
              </p>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{agent.views_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <Play className="h-4 w-4" />
                <span>{agent.usage_count}</span>
              </div>
              {agent.rating_average && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{agent.rating_average.toFixed(1)}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-1">
              {agent.tags?.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                {agent.price === 0 ? 'Free' : `$${agent.price}`}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleView}>
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button size="sm" onClick={handleUse} className="bg-gradient-to-r from-purple-600 to-blue-600">
                  <Play className="h-4 w-4 mr-1" />
                  Use
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};