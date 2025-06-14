
import React, { useState, useCallback } from 'react';
import { cn } from "@/lib/utils";
import { useAuth } from '@/hooks/useAuth';
import SidebarLogo from './sidebar/SidebarLogo';
import SidebarNavigation from './sidebar/SidebarNavigation';
import SidebarActions from './sidebar/SidebarActions';
import AIChatSidebar from './sidebar/AIChatSidebar';

const SideNavbar = () => {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAIChatMaximized, setIsAIChatMaximized] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsExpanded(false);
  }, []);

  const toggleAIChatMaximize = () => {
    setIsAIChatMaximized(!isAIChatMaximized);
  };

  return (
    <div className="h-screen flex">
      <div 
        className={cn(
          "h-full transition-all duration-300 ease-out flex flex-col bg-[#121212] border-r border-[#1A1F2C] z-20 relative",
          isExpanded ? "w-72" : "w-16"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SidebarLogo isExpanded={isExpanded} />
        <SidebarNavigation isExpanded={isExpanded} />
        <SidebarActions 
          isExpanded={isExpanded}
          isAIChatOpen={isAIChatOpen}
          onOpenAIChat={() => setIsAIChatOpen(true)}
        />
      </div>

      {/* Only show AI Chat if user is authenticated */}
      {user && (
        <AIChatSidebar
          isExpanded={isExpanded}
          isAIChatOpen={isAIChatOpen}
          isAIChatMaximized={isAIChatMaximized}
          onToggleMaximize={toggleAIChatMaximize}
          onClose={() => setIsAIChatOpen(false)}
          setIsAIChatMaximized={setIsAIChatMaximized}
        />
      )}
    </div>
  );
};

export default SideNavbar;
