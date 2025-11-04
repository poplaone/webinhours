
import React, { useState, useEffect } from 'react';
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start transparent, then appear quickly
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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
    <div className={`fixed bottom-2 left-2 right-2 rounded-xl border shadow-xl z-50 lg:hidden safe-area-pb transition-all duration-700 ease-in-out ${
      isVisible 
        ? 'bg-background/95 backdrop-blur-lg border-border/40' 
        : 'bg-transparent backdrop-blur-none border-transparent'
    }`}>
      <div className="flex items-center justify-around py-2 px-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              className={`flex items-center justify-center rounded-lg h-10 w-10 touch-manipulation ${
                isActive 
                  ? "text-[#8B5CF6] bg-[#8B5CF6]/20" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              } transition-all duration-200`}
              onClick={() => navigate(item.path)}
            >
              <Icon className="h-5 w-5" />
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
