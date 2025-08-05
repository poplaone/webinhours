
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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <div className={`fixed bottom-4 left-4 right-4 rounded-2xl border shadow-2xl z-50 lg:hidden safe-area-pb transition-all duration-300 ${
      scrollY > 10 
        ? 'bg-background/95 backdrop-blur-lg border-border/40' 
        : 'bg-transparent backdrop-blur-none border-transparent'
    }`}>
      <div className="flex items-center justify-around py-3 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              className={`flex items-center justify-center rounded-xl h-12 w-12 touch-manipulation ${
                isActive 
                  ? "text-[#8B5CF6] bg-[#8B5CF6]/20" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              } transition-all duration-200`}
              onClick={() => navigate(item.path)}
            >
              <Icon className="h-6 w-6" />
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
