
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Lightbulb, 
  BarChart3, 
  ClipboardCheck,
  User,
  Settings
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useProfiles';

interface SidebarNavigationProps {
  isExpanded: boolean;
}

const SidebarNavigation = ({ isExpanded }: SidebarNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const userRole = useUserRole();

  const navItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/dashboard',
      active: location.pathname === '/dashboard',
      description: 'View marketplace dashboard'
    },
    { 
      icon: User, 
      label: 'Profile', 
      path: '/profile',
      active: location.pathname === '/profile',
      description: 'Manage your profile',
      requireAuth: true
    },
    { 
      icon: ClipboardCheck, 
      label: 'Concept Testing', 
      path: '/concept-testing',
      active: location.pathname.includes('/concept-testing'),
      description: 'Launch and review surveys',
      requireAuth: true
    },
    { 
      icon: BarChart3, 
      label: 'Analytics', 
      path: '/concept-details/1',
      active: location.pathname.includes('/concept-details'),
      description: 'View detailed analytics',
      requireAuth: true
    },
    { 
      icon: Settings, 
      label: 'Admin Panel', 
      path: '/admin-panel',
      active: location.pathname === '/admin-panel',
      description: 'Manage listings and users',
      requireAuth: true,
      requireSeller: true
    }
  ];

  const filteredItems = navItems.filter(item => {
    if (item.requireAuth && !user) return false;
    if (item.requireSeller && userRole !== 'seller') return false;
    return true;
  });

  return (
    <nav className="flex flex-col py-4 flex-1 overflow-y-auto">
      {filteredItems.map((item) => (
        <TooltipProvider key={item.label}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={item.active ? "secondary" : "ghost"}
                className={cn(
                  "mb-1 w-full justify-start relative overflow-hidden group",
                  item.active && "bg-[#8B5CF6]/10 text-[#8B5CF6]",
                  !isExpanded && "justify-center px-2",
                  "text-white hover:bg-[#8B5CF6]/20 transition-all duration-200"
                )}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className={cn(
                  "ml-2 transition-all duration-300 whitespace-nowrap",
                  isExpanded ? "opacity-100 translate-x-0 w-auto" : "opacity-0 -translate-x-4 w-0 pointer-events-none"
                )}>
                  {item.label}
                </span>
                
                {/* Active indicator */}
                {item.active && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8B5CF6] rounded-r-full" />
                )}
              </Button>
            </TooltipTrigger>
            
            {!isExpanded && (
              <TooltipContent side="right" className="ml-2">
                <p>{item.label}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      ))}
    </nav>
  );
};

export default SidebarNavigation;
