import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobileOrTablet } from '@/hooks/use-mobile';
import { 
  Store, 
  User, 
  LogIn,
  Phone,
  Wrench,
  Home,
  Calculator,
  Info
} from 'lucide-react';
import { Button } from "@/components/ui/button";

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isMobileOrTablet = useIsMobileOrTablet();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start transparent, then appear quickly
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Show on mobile and tablet devices (below lg breakpoint)
  if (!isMobileOrTablet) return null;

  // Navigation items - 4 items for mobile, more for tablet
  const isMobile = window.innerWidth < 640;
  
  const mobileNavItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/marketplace', icon: Store, label: 'Marketplace' },
    { path: '/how-it-works', icon: Wrench, label: 'Services' },
    { path: '/contact', icon: Phone, label: 'Contact' },
  ];

  const tabletNavItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/marketplace', icon: Store, label: 'Marketplace' },
    { path: '/calculator', icon: Calculator, label: 'Calculator' },
    { path: '/about', icon: Info, label: 'About' },
    { path: '/contact', icon: Phone, label: 'Contact' },
    user 
      ? { path: '/profile', icon: User, label: 'Profile' }
      : { path: '/auth', icon: LogIn, label: 'Login' }
  ];

  const navItems = isMobile ? mobileNavItems : tabletNavItems;

  return (
    <div className={`fixed bottom-2 left-2 right-2 sm:bottom-3 sm:left-4 sm:right-4 rounded-xl sm:rounded-2xl border shadow-xl z-50 lg:hidden safe-area-pb transition-all duration-700 ease-in-out ${
      isVisible 
        ? 'bg-background/70 backdrop-blur-md border-border/30' 
        : 'bg-transparent backdrop-blur-none border-transparent'
    }`}>
      <div className="flex items-center justify-around py-2 sm:py-3 px-1.5 sm:px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center justify-center rounded-lg h-12 sm:h-14 px-2 sm:px-4 touch-manipulation gap-0.5 ${
                isActive 
                  ? "text-[#8B5CF6] bg-[#8B5CF6]/20" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              } transition-all duration-200`}
              onClick={() => navigate(item.path)}
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-[10px] sm:text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
