
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Store, 
  User, 
  LogIn,
  Phone,
  Wrench,
  Home
} from 'lucide-react';
import { Button } from "@/components/ui/button";

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isMobile = useIsMobile();

  // Show only on mobile devices
  if (!isMobile) return null;

  // Updated navigation items with Home, Services, Marketplace, Contact, Login/Profile
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/services', icon: Wrench, label: 'Services' },
    { path: '/marketplace', icon: Store, label: 'Marketplace' },
    { path: '/contact', icon: Phone, label: 'Contact' },
    // Show Profile icon when logged in, Login icon when not logged in
    user 
      ? { path: '/profile', icon: User, label: 'Profile' }
      : { path: '/auth', icon: LogIn, label: 'Login' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-border/40 z-50 lg:hidden safe-area-pb">
      <div className="flex items-center justify-between py-2 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-3 px-2 flex-1 max-w-[75px] min-h-[56px] touch-manipulation ${
                isActive 
                  ? "text-[#8B5CF6] bg-[#8B5CF6]/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              } transition-all duration-200`}
              onClick={() => navigate(item.path)}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium leading-tight">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
