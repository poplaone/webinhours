
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  LayoutDashboard, 
  Store, 
  User, 
  Code, 
  LogIn,
  InfoIcon,
  Phone,
  HelpCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isMobile = useIsMobile();

  // Show only on mobile devices
  if (!isMobile) return null;

  const publicNavItems = [
    { path: '/marketplace', icon: Store, label: 'Marketplace' },
    { path: '/about', icon: InfoIcon, label: 'About' },
    { path: '/contact', icon: Phone, label: 'Contact' },
    { path: '/faq', icon: HelpCircle, label: 'FAQ' },
  ];

  const authenticatedNavItems = [
    { path: '/marketplace', icon: Store, label: 'Marketplace' },
    { path: '/admin-panel', icon: Code, label: 'Upload' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  // Show login button if not authenticated
  const authNavItems = [
    { path: '/marketplace', icon: Store, label: 'Marketplace' },
    { path: '/about', icon: InfoIcon, label: 'About' },
    { path: '/auth', icon: LogIn, label: 'Login' },
  ];

  const navItems = user ? authenticatedNavItems : authNavItems;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/40 z-50 lg:hidden">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                isActive 
                  ? "text-[#8B5CF6]" 
                  : "text-muted-foreground"
              }`}
              onClick={() => navigate(item.path)}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
