import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Eye, Bot } from "lucide-react";
import { AIAgent } from '@/types/aiAgent';

interface MyAIAgentsTableProps {
  agents: AIAgent[];
  onEditAgent: (agent: AIAgent) => void;
  onDeleteAgent: (agentId: string) => void;
  formatPrice: (price: number) => string;
  getStatusColor: (status: string) => string;
}

export const MyAIAgentsTable = ({
  agents,
  onEditAgent,
  onDeleteAgent,
  formatPrice,
  getStatusColor
}: MyAIAgentsTableProps) => {
  if (agents.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Bot className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No AI Agents Yet</h3>
          <p className="text-gray-600">Upload your first AI agent to get started.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          My AI Agents ({agents.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                        {agent.thumbnail_url ? (
                          <img 
                            src={agent.thumbnail_url} 
                            alt={agent.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <Bot className="h-6 w-6 text-purple-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{agent.title}</p>
                        <p className="text-sm text-gray-500 max-w-xs truncate">
                          {agent.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {agent.agent_type}
                    </Badge>
                  </TableCell>
                  <TableCell className="capitalize">{agent.category}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(agent.status)}>
                      {agent.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatPrice(agent.price)}</TableCell>
                  <TableCell>{agent.views_count}</TableCell>
                  <TableCell>{agent.usage_count}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(agent.preview_url, '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditAgent(agent)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteAgent(agent.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};