
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
  ClipboardCheck
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
  const [isExpanded, setIsExpanded] = useState(true);
  const [isAIChatMaximized, setIsAIChatMaximized] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(true); // Default to open

  // Modified navItems to highlight only Product Ideas when on dashboard
  const navItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/dashboard',
      active: false, // Dashboard is never highlighted
      description: 'View all product ideas'
    },
    { 
      icon: Lightbulb, 
      label: 'Product Ideas', 
      path: '/idea/new',
      // This item should be active on both the dashboard and idea/new routes
      active: location.pathname === '/idea/new' || location.pathname === '/dashboard',
      description: 'Create new product ideas'
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

  const toggleSideNav = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleAIChat = () => {
    setIsAIChatOpen(!isAIChatOpen);
  };

  const toggleAIChatMaximize = () => {
    setIsAIChatMaximized(!isAIChatMaximized);
  };

  return (
    <div className="h-screen">
      <div className={cn(
        "h-full transition-all duration-300 flex flex-col bg-[#121212] border-r border-[#1A1F2C] z-20",
        isExpanded ? "w-72" : "w-16"
      )}>
        {/* Header with logo and toggle */}
        <div className="flex items-center justify-between p-4 h-16 shrink-0 border-b border-[#1A1F2C]">
          <div className={cn("flex items-center", !isExpanded && "justify-center w-full")}>
            {isExpanded ? (
              <>
                <div className="flex items-center">
                  <div className="bg-[#9b87f5] rounded-md p-1 mr-2">
                    <span className="text-white font-bold">AI</span>
                  </div>
                  <span className="font-semibold text-white">Pulse Vision.AI</span>
                </div>
              </>
            ) : (
              <div className="bg-[#9b87f5] rounded-md p-1">
                <span className="text-white font-bold">AI</span>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "h-8 w-8 p-0 text-white hover:bg-[#8B5CF6]/20",
              !isExpanded && "hidden"
            )}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation items section */}
        <div className="flex flex-col py-4 shrink-0 overflow-y-auto">
          {navItems.map((item) => (
            <TooltipProvider key={item.label} delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={item.active ? "secondary" : "ghost"}
                    className={cn(
                      "mb-1 justify-start",
                      item.active && "bg-[#8B5CF6]/10 text-[#8B5CF6]",
                      !isExpanded && "justify-center",
                      "text-white hover:bg-[#8B5CF6]/20"
                    )}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="h-5 w-5" />
                    {isExpanded && <span className="ml-2">{item.label}</span>}
                  </Button>
                </TooltipTrigger>
                {!isExpanded && (
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <Separator className="shrink-0 bg-[#1A1F2C]" />
        
        {/* AI Chat section that stretches to the bottom */}
        <div className={cn(
          "flex flex-col flex-grow min-h-0",
          (!isExpanded || !isAIChatOpen) && "mt-auto"
        )}>
          {isExpanded && isAIChatOpen ? (
            <ChatSidebar 
              isMaximized={false} 
              onToggleMaximize={() => setIsAIChatMaximized(!isAIChatMaximized)}
              onClose={() => setIsAIChatOpen(false)}
              className="h-full"
            />
          ) : (
            <div className="p-4">
              <Button 
                variant="outline" 
                className={cn(
                  "w-full justify-start border border-[#8B5CF6]/30 bg-[#8B5CF6]/5 text-[#8B5CF6] hover:bg-[#8B5CF6]/10",
                  !isExpanded && "justify-center"
                )}
                onClick={() => setIsAIChatOpen(true)}
              >
                <Sparkles className="h-5 w-5" />
                {isExpanded && <span className="ml-2">AI Ideation Chat</span>}
              </Button>
            </div>
          )}

          {!isExpanded && (
            <div className="p-2 border-t border-[#1A1F2C] mt-auto">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(true)}
                className="w-full h-8 text-white hover:bg-[#8B5CF6]/20"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Maximized chat sheet */}
      <Sheet open={isAIChatMaximized} onOpenChange={setIsAIChatMaximized}>
        <SheetContent side="bottom" className="h-[80vh] p-0 border-t rounded-t-xl">
          <div className="h-full">
            <ChatSidebar 
              isMaximized={true}
              onToggleMaximize={() => setIsAIChatMaximized(false)}
              className="h-full"
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SideNavbar;
