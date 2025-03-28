
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
  X
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
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

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

  return (
    <div className="flex h-full relative">
      {/* Main Navigation */}
      <div className={cn(
        "h-full transition-all duration-300 flex flex-col bg-background border-r",
        isExpanded ? "w-72" : "w-16" // Increased width from w-60 to w-72
      )}>
        {/* Logo Area */}
        <div className="flex items-center justify-between p-4 h-16 border-b">
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

        {/* Navigation Links */}
        <div className="flex flex-col flex-1 py-4 overflow-y-auto">
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

        <Separator />
        
        {/* AI Chat Trigger - Moved to bottom */}
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

        {/* Toggle Button (only visible when collapsed) */}
        {!isExpanded && (
          <div className="p-2 border-t">
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

      {/* AI Chat Panel (as overlay using Sheet component) */}
      <Sheet open={isAIChatOpen} onOpenChange={setIsAIChatOpen}>
        <SheetContent side="bottom" className="h-[80vh] p-0 border-t rounded-t-xl">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#8B5CF6]" />
              <span className="font-medium">AI Ideation Chat</span>
            </div>
            <SheetClose className="rounded-full h-8 w-8 p-0">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>
          <div className="h-[calc(100%-60px)]">
            <ChatSidebar />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SideNavbar;
