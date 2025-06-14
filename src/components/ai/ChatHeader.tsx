
import React from 'react';
import { Sparkles, Minimize2, Maximize2, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

type ChatHeaderProps = {
  isMaximized: boolean;
  onToggleMaximize?: () => void;
  onClose?: () => void;
};

const ChatHeader = ({ isMaximized, onToggleMaximize, onClose }: ChatHeaderProps) => {
  return (
    <div className="flex-none items-center justify-between bg-[#1A1F2C] border-b border-[#8B5CF6]/10 px-4 py-3">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Sparkles className="h-4 w-4 text-[#8B5CF6] mr-2" />
          <span className="text-sm font-medium text-white">WebInHours AI Assistant</span>
        </div>
        <div className="flex items-center space-x-1">
          {onToggleMaximize && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0 text-white hover:bg-[#8B5CF6]/20" 
              onClick={onToggleMaximize}
            >
              {isMaximized ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          )}
          {onClose && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0 text-white hover:bg-[#8B5CF6]/20" 
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
