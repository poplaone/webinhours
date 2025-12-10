
import React from 'react';
import { Plus, Sparkles, Layout, ShoppingBag } from 'lucide-react';
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
        onClick={() => handleQuickAction("Find me an e-commerce website template")}
        disabled={isLoading}
      >
        <ShoppingBag className="h-3 w-3 mr-1" />
        E-commerce
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-xs h-7 bg-[#1A1F2C] border-[#8B5CF6]/30 text-white hover:bg-[#8B5CF6]/20"
        onClick={() => handleQuickAction("Show me landing page templates")}
        disabled={isLoading}
      >
        <Layout className="h-3 w-3 mr-1" />
        Landing Pages
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-xs h-7 bg-[#1A1F2C] border-[#8B5CF6]/30 text-white hover:bg-[#8B5CF6]/20"
        onClick={() => handleQuickAction("Compare your best portfolio templates")}
        disabled={isLoading}
      >
        <Sparkles className="h-3 w-3 mr-1" />
        Portfolio
      </Button>
    </div>
  );
};

export default QuickActions;
