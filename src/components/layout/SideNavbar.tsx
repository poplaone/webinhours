
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  LayoutDashboard, 
  Lightbulb, 
  BarChart3, 
  Users, 
  Settings, 
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Minimize2,
  Maximize2,
  ClipboardCheck,
  Code
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ChatSidebar from '@/components/ai/ChatSidebar';

const SideNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [isAIChatMaximized, setIsAIChatMaximized] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(true);

  const navItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/dashboard',
      active: false,
      description: 'View all product ideas'
    },
    { 
      icon: Lightbulb, 
      label: 'Product Ideas', 
      path: '/dashboard',
      active: location.pathname === '/dashboard',
      description: 'View product ideas dashboard'
    },
    { 
      icon: ClipboardCheck, 
      label: 'Concept Testing', 
      path: '/concept-testing',
      active: location.pathname.includes('/concept-testing'),
      description: 'Launch and review surveys'
    },
    { 
      icon: BarChart3, 
      label: 'Analytics', 
      path: '/concept-details/1',
      active: location.pathname.includes('/concept-details'),
      description: 'View detailed analytics'
    }
  ];

  const toggleAIChatMaximize = () => {
    setIsAIChatMaximized(!isAIChatMaximized);
  };

  return (
    <div className="h-screen flex">
      <div 
        className={cn(
          "h-full transition-all duration-300 ease-in-out flex flex-col bg-[#121212] border-r border-[#1A1F2C] z-20 relative",
          isHovered ? "w-72" : "w-16"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center justify-between p-4 h-16 shrink-0 border-b border-[#1A1F2C]">
          <div className={cn("flex items-center overflow-hidden", !isHovered && "justify-center w-full")}>
            <div className="bg-[#9b87f5] rounded-md p-1 flex-shrink-0">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <div className={cn(
              "ml-2 transition-all duration-300 whitespace-nowrap",
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
            )}>
              <span className="font-semibold text-white">Pulse Vision.AI</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col py-4 shrink-0 overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <Button
                variant={item.active ? "secondary" : "ghost"}
                className={cn(
                  "mb-1 w-full justify-start relative overflow-hidden",
                  item.active && "bg-[#8B5CF6]/10 text-[#8B5CF6]",
                  !isHovered && "justify-center px-2",
                  "text-white hover:bg-[#8B5CF6]/20"
                )}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className={cn(
                  "ml-2 transition-all duration-300 whitespace-nowrap",
                  isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
                )}>
                  {item.label}
                </span>
              </Button>

              {!isHovered && (
                <div className="absolute left-full top-0 ml-2 px-2 py-1 bg-[#1A1F2C] text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </div>

        <Separator className="shrink-0 bg-[#1A1F2C]" />
        
        {(!isAIChatOpen || !isHovered) && (
          <div className="p-4 mt-auto">
            <Button 
              variant="outline" 
              className={cn(
                "w-full justify-start border border-[#8B5CF6]/30 bg-[#8B5CF6]/5 text-[#8B5CF6] hover:bg-[#8B5CF6]/10 overflow-hidden",
                !isHovered && "justify-center px-2"
              )}
              onClick={() => setIsAIChatOpen(true)}
            >
              <Sparkles className="h-5 w-5 flex-shrink-0" />
              <span className={cn(
                "ml-2 transition-all duration-300 whitespace-nowrap",
                isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
              )}>
                AI Ideation Chat
              </span>
            </Button>
          </div>
        )}
      </div>

      {isAIChatOpen && !isAIChatMaximized && (
        <div className={cn(
          "fixed bottom-0 left-0 z-30 border-t border-[#8B5CF6]/10 h-[400px] bg-[#121212]",
          isHovered ? "w-72" : "w-16",
          "transition-all duration-300"
        )}>
          <ChatSidebar 
            isMaximized={false} 
            onToggleMaximize={toggleAIChatMaximize}
            onClose={() => setIsAIChatOpen(false)}
          />
        </div>
      )}

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
    </div>
  );
};

export default SideNavbar;
