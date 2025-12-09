

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobileOrTablet } from '@/hooks/use-mobile';
import { useIsAdmin } from '@/hooks/useAdmin';
import { useToast } from '@/hooks/use-toast';
import {
  Store,
  User,
  LogIn,
  Phone,
  Wrench,
  Home,
  LogOut,
  MessageSquare,
  Shield
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { MobileServicesDrawer } from './MobileServicesDrawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mobile Bottom Navigation - 5 items with Profile Popup
const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const isMobileOrTablet = useIsMobileOrTablet();
  const [isVisible, setIsVisible] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const isAdmin = useIsAdmin();
  const { toast } = useToast();

  useEffect(() => {
    // Start transparent, then appear quickly
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'Signed out successfully',
        description: 'You have been signed out of your account.',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error signing out',
        description: 'There was an error signing out. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Home', action: () => navigate('/') },
    { path: '#', icon: Wrench, label: 'Services', action: () => setServicesOpen(true) },
    { path: '/websites', icon: Store, label: 'Websites', action: () => navigate('/websites') },
    { path: '/contact', icon: Phone, label: 'Contact', action: () => navigate('/contact') },
    // User item is handled separately in the render
  ];

  if (!isMobileOrTablet) return null;

  return (
    <>
      <div className={`fixed bottom-2 left-2 right-2 sm:bottom-3 sm:left-4 sm:right-4 rounded-xl sm:rounded-2xl border shadow-xl z-50 lg:hidden safe-area-pb transition-all duration-700 ease-in-out ${isVisible
        ? 'bg-background/90 backdrop-blur-md border-border/30'
        : 'bg-transparent backdrop-blur-none border-transparent translate-y-full'
        }`}>
        <div className="flex items-center justify-around py-2 sm:py-3 px-1.5 sm:px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.label === 'Services' ? servicesOpen : location.pathname === item.path;

            return (
              <Button
                key={item.label}
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center justify-center rounded-lg h-12 sm:h-14 px-2 sm:px-4 touch-manipulation gap-0.5 ${isActive
                  ? "text-[#8B5CF6] bg-[#8B5CF6]/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  } transition-all duration-200`}
                onClick={item.action}
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-[10px] sm:text-xs font-medium">{item.label}</span>
              </Button>
            );
          })}

          {/* User / Auth Item with Dropdown */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center justify-center rounded-lg h-12 sm:h-14 px-2 sm:px-4 touch-manipulation gap-0.5 ${location.pathname.includes('/profile')
                    ? "text-[#8B5CF6] bg-[#8B5CF6]/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    } transition-all duration-200`}
                >
                  <User className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-[10px] sm:text-xs font-medium">Profile</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="top" className="w-56 mb-2">
                <DropdownMenuLabel>
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile & Dashboard</span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => navigate('/support-tickets')}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Support Tickets</span>
                </DropdownMenuItem>

                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/admin-panel')}>
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Admin Panel</span>
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center justify-center rounded-lg h-12 sm:h-14 px-2 sm:px-4 touch-manipulation gap-0.5 ${location.pathname === '/auth'
                ? "text-[#8B5CF6] bg-[#8B5CF6]/20"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                } transition-all duration-200`}
              onClick={() => navigate('/auth')}
            >
              <LogIn className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-[10px] sm:text-xs font-medium">Sign In</span>
            </Button>
          )}

        </div>
      </div>

      <MobileServicesDrawer
        isOpen={servicesOpen}
        onOpenChange={setServicesOpen}
      />
    </>
  );
};

export default MobileBottomNav;
