
import React from 'react';
import { Plus, Zap, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";

type QuickActionsProps = {
  handleQuickAction: (action: string) => void;
  isLoading: boolean;
};

const QuickActions = ({ handleQuickAction, isLoading }: QuickActionsProps) => {
  return (
    <div className="flex gap-2 mt-2 flex-wrap">
      <Button 
        variant="outline" 
        size="sm" 
        className="text-xs h-7 bg-[#1A1F2C] border-[#8B5CF6]/30 text-white hover:bg-[#8B5CF6]/20"
        onClick={() => handleQuickAction("Show me business templates")}
        disabled={isLoading}
      >
        <Plus className="h-3 w-3 mr-1" />
        Templates
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-xs h-7 bg-[#1A1F2C] border-[#8B5CF6]/30 text-white hover:bg-[#8B5CF6]/20"
        onClick={() => handleQuickAction("What are your prices?")}
        disabled={isLoading}
      >
        <Zap className="h-3 w-3 mr-1" />
        Pricing
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-xs h-7 bg-[#1A1F2C] border-[#8B5CF6]/30 text-white hover:bg-[#8B5CF6]/20"
        onClick={() => handleQuickAction("Tell me about the marketplace")}
        disabled={isLoading}
      >
        <Sparkles className="h-3 w-3 mr-1" />
        Marketplace
      </Button>
    </div>
  );
};

export default QuickActions;
