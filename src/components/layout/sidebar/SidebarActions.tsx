
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Sparkles, User } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from '@/hooks/useAuth';

interface SidebarActionsProps {
  isExpanded: boolean;
  isAIChatOpen: boolean;
  onOpenAIChat: () => void;
}

const SidebarActions = ({ isExpanded, isAIChatOpen, onOpenAIChat }: SidebarActionsProps) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      <Separator className="shrink-0 bg-[#1A1F2C]" />
      
      {/* Profile Button - only show if user is logged in */}
      {user && (
        <div className="p-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "w-full justify-start text-white hover:bg-[#8B5CF6]/20 overflow-hidden transition-all duration-200",
                    !isExpanded && "justify-center px-2"
                  )}
                  onClick={() => navigate('/profile')}
                >
                  <User className="h-5 w-5 flex-shrink-0" />
                  <span className={cn(
                    "ml-2 transition-all duration-300 whitespace-nowrap",
                    isExpanded ? "opacity-100 translate-x-0 w-auto" : "opacity-0 -translate-x-4 w-0 pointer-events-none"
                  )}>
                    Profile
                  </span>
                </Button>
              </TooltipTrigger>
              
              {!isExpanded && (
                <TooltipContent side="right" className="ml-2">
                  <p>Profile</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

      {/* Sign Out Button - only show if user is logged in */}
      {user && (
        <div className="p-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "w-full justify-start text-red-400 hover:bg-red-500/10 overflow-hidden transition-all duration-200",
                    !isExpanded && "justify-center px-2"
                  )}
                  onClick={handleSignOut}
                >
                  <LogOut className="h-5 w-5 flex-shrink-0" />
                  <span className={cn(
                    "ml-2 transition-all duration-300 whitespace-nowrap",
                    isExpanded ? "opacity-100 translate-x-0 w-auto" : "opacity-0 -translate-x-4 w-0 pointer-events-none"
                  )}>
                    Sign Out
                  </span>
                </Button>
              </TooltipTrigger>
              
              {!isExpanded && (
                <TooltipContent side="right" className="ml-2">
                  <p>Sign Out</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      
      {/* AI Chat Button - only show if user is logged in */}
      {user && (!isAIChatOpen || !isExpanded) && (
        <div className="p-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  className={cn(
                    "w-full justify-start border border-[#8B5CF6]/30 bg-[#8B5CF6]/5 text-[#8B5CF6] hover:bg-[#8B5CF6]/10 overflow-hidden transition-all duration-200",
                    !isExpanded && "justify-center px-2"
                  )}
                  onClick={onOpenAIChat}
                >
                  <Sparkles className="h-5 w-5 flex-shrink-0" />
                  <span className={cn(
                    "ml-2 transition-all duration-300 whitespace-nowrap",
                    isExpanded ? "opacity-100 translate-x-0 w-auto" : "opacity-0 -translate-x-4 w-0 pointer-events-none"
                  )}>
                    AI Ideation Chat
                  </span>
                </Button>
              </TooltipTrigger>
              
              {!isExpanded && (
                <TooltipContent side="right" className="ml-2">
                  <p>AI Ideation Chat</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </>
  );
};

export default SidebarActions;
