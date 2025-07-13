
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
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg line-clamp-1">{agent.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {agent.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <Badge 
                variant="secondary" 
                className="text-xs px-2 py-1 rounded-full font-medium capitalize"
              >
                {agent.category}
              </Badge>
              <div className="text-lg font-bold text-purple-600">
                {agent.price === 0 ? 'Free' : `$${agent.price}`}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={handleView} className="flex-1">
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button size="sm" onClick={handleUse} className="bg-gradient-to-r from-purple-600 to-blue-600 flex-1">
                <Play className="h-4 w-4 mr-1" />
                Use
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
