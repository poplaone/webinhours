
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
  Maximize2
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet";
import ChatSidebar from '@/components/ai/ChatSidebar';

const SideNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isAIChatMaximized, setIsAIChatMaximized] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(true); // Default to open

  const navItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/dashboard',
      active: location.pathname === '/dashboard'
    },
    { 
      icon: Lightbulb, 
      label: 'Product Ideas', 
      path: '/idea/new',
      active: location.pathname === '/idea/new'
    },
    { 
      icon: BarChart3, 
      label: 'Concept Testing', 
      path: '/concept-testing/1',
      active: location.pathname.includes('/concept-testing')
    },
    { 
      icon: Users, 
      label: 'Audience Insights', 
      path: '/concept-details/1',
      active: location.pathname.includes('/concept-details')
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/settings',
      active: location.pathname === '/settings'
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
    <div className="flex h-full relative">
      <div className={cn(
        "h-full transition-all duration-300 flex flex-col bg-background border-r fixed left-0 top-0 bottom-0",
        isExpanded ? "w-72" : "w-16"
      )}>
        {/* Header with logo and toggle */}
        <div className="flex items-center justify-between p-4 h-16 shrink-0 border-b">
          <div className={cn("flex items-center", !isExpanded && "justify-center w-full")}>
            {isExpanded ? (
              <>
                <div className="flex items-center">
                  <div className="bg-[#9b87f5] rounded-md p-1 mr-2">
                    <span className="text-white font-bold">AI</span>
                  </div>
                  <span className="font-semibold">Pulse Vision.AI</span>
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
            onClick={toggleSideNav}
            className={cn(
              "h-8 w-8 p-0",
              !isExpanded && "hidden"
            )}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation items section - make it scrollable if needed but fixed height */}
        <div className="flex flex-col py-4 shrink-0 overflow-y-auto">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "secondary" : "ghost"}
              className={cn(
                "mb-1 justify-start",
                item.active && "bg-[#8B5CF6]/10 text-[#8B5CF6]",
                !isExpanded && "justify-center"
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-5 w-5" />
              {isExpanded && <span className="ml-2">{item.label}</span>}
            </Button>
          ))}
        </div>

        <Separator className="shrink-0" />
        
        {/* AI Chat section that stretches to the bottom */}
        <div className={cn(
          "flex flex-col flex-grow min-h-0",
          (!isExpanded || !isAIChatOpen) && "mt-auto"
        )}>
          {isExpanded && isAIChatOpen ? (
            <ChatSidebar 
              isMaximized={false} 
              onToggleMaximize={toggleAIChatMaximize}
              onClose={toggleAIChat}
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
                onClick={toggleAIChat}
              >
                <Sparkles className="h-5 w-5" />
                {isExpanded && <span className="ml-2">AI Ideation Chat</span>}
              </Button>
            </div>
          )}

          {!isExpanded && (
            <div className="p-2 border-t mt-auto">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSideNav}
                className="w-full h-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Add margin to content to prevent overlap with fixed sidebar */}
      <div className={cn(
        "flex-grow transition-all duration-300",
        isExpanded ? "ml-72" : "ml-16"
      )}></div>

      {/* Maximized chat sheet */}
      <Sheet open={isAIChatMaximized} onOpenChange={setIsAIChatMaximized}>
        <SheetContent side="bottom" className="h-[80vh] p-0 border-t rounded-t-xl">
          <div className="h-full">
            <ChatSidebar 
              isMaximized={true}
              onToggleMaximize={toggleAIChatMaximize}
              className="h-full"
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SideNavbar;
