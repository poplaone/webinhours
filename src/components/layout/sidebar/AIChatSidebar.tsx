
import React from 'react';
import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ChatSidebar from '@/components/ai/ChatSidebar';

interface AIChatSidebarProps {
  isExpanded: boolean;
  isAIChatOpen: boolean;
  isAIChatMaximized: boolean;
  onToggleMaximize: () => void;
  onClose: () => void;
  setIsAIChatMaximized: (value: boolean) => void;
}

const AIChatSidebar = ({ 
  isExpanded, 
  isAIChatOpen, 
  isAIChatMaximized, 
  onToggleMaximize, 
  onClose,
  setIsAIChatMaximized 
}: AIChatSidebarProps) => {
  return (
    <>
      {/* AI Chat Sidebar */}
      {isAIChatOpen && !isAIChatMaximized && (
        <div className={cn(
          "fixed bottom-0 left-0 z-30 border-t border-[#8B5CF6]/10 h-[400px] bg-[#121212] transition-all duration-300",
          isExpanded ? "w-72" : "w-16"
        )}>
          <ChatSidebar 
            isMaximized={false} 
            onToggleMaximize={onToggleMaximize}
            onClose={onClose}
          />
        </div>
      )}

      {/* Maximized Chat Sheet */}
      <Sheet open={isAIChatMaximized} onOpenChange={setIsAIChatMaximized}>
        <SheetContent side="bottom" className="h-[80vh] p-0 border-t rounded-t-xl">
          <div className="h-full">
            <ChatSidebar 
              isMaximized={true}
              onToggleMaximize={() => setIsAIChatMaximized(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AIChatSidebar;
