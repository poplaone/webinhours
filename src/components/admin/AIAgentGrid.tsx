import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, CheckCircle, XCircle, Star, Bot } from "lucide-react";
import { AIAgent } from '@/types/aiAgent';

interface AIAgentGridProps {
  agents: AIAgent[];
  isLoading: boolean;
  onReviewAgent: (agent: AIAgent) => void;
  onEditAgent: (agent: AIAgent) => void;
  onDeleteAgent: (agentId: string) => void;
  formatPrice: (price: number) => string;
  getStatusColor: (status: string) => string;
}

export const AIAgentGrid = ({
  agents,
  isLoading,
  onReviewAgent,
  onEditAgent,
  onDeleteAgent,
  formatPrice,
  getStatusColor
}: AIAgentGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (agents.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Bot className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold mb-2">No AI Agents Found</h3>
        <p className="text-gray-600">No AI agents match your current filters.</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((agent) => (
        <motion.div
          key={agent.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <Badge className={getStatusColor(agent.status)}>
                  {agent.status}
                </Badge>
                <Badge variant="outline">
                  {agent.agent_type}
                </Badge>
              </div>

              <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                {agent.thumbnail_url ? (
                  <img 
                    src={agent.thumbnail_url} 
                    alt={agent.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Bot className="h-12 w-12 text-purple-600" />
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg truncate">{agent.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {agent.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{agent.category}</span>
                  <span>{formatPrice(agent.price)}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{agent.views_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bot className="h-4 w-4" />
                    <span>{agent.usage_count}</span>
                  </div>
                  {agent.rating_average && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{agent.rating_average.toFixed(1)}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1">
                  {agent.tags?.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onReviewAgent(agent)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Review
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditAgent(agent)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDeleteAgent(agent.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};