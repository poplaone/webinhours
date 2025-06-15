
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings,
  User,
  Sparkles
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { useAuth } from '@/hooks/useAuth';

interface MobileBottomNavProps {
  onOpenAIChat: () => void;
}

const MobileBottomNav = ({ onOpenAIChat }: MobileBottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  if (!user) return null;

  const navItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/dashboard',
      active: location.pathname === '/dashboard'
    },
    { 
      icon: User, 
      label: 'Profile', 
      path: '/profile',
      active: location.pathname === '/profile'
    },
    { 
      icon: Sparkles, 
      label: 'AI Chat', 
      action: onOpenAIChat,
      active: false
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/settings',
      active: location.pathname === '/settings'
    }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#121212] border-t border-[#1A1F2C] px-2 py-2">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => item.action ? item.action() : navigate(item.path!)}
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-[60px]",
              item.active 
                ? "bg-[#8B5CF6]/20 text-[#8B5CF6]" 
                : "text-gray-400 hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6]"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNav;
