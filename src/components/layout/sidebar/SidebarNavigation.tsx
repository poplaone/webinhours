
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Store,
  User,
  Code,
  Bell,
  InfoIcon,
  Phone,
  HelpCircle,
  DollarSign,
  BookOpen,
  Workflow,
  Calculator
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsAdmin } from '@/hooks/useAdmin';
import { usePrefetchMarketplace } from '@/hooks/queries/usePrefetchMarketplace';

interface SidebarNavigationProps {
  currentPath: string;
  isAuthenticated: boolean;
}

export const SidebarNavigation = ({ currentPath, isAuthenticated }: SidebarNavigationProps) => {
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  const { prefetchOnHover } = usePrefetchMarketplace();

  // Show these links only on homepage
  const homepageOnlyItems = [
    { path: '/about', icon: InfoIcon, label: 'About' },
    { path: '/how-it-works', icon: Workflow, label: 'How It Works' },
    { path: '/pricing', icon: DollarSign, label: 'Pricing' },
    { path: '/blog', icon: BookOpen, label: 'Blog' },
    { path: '/contact', icon: Phone, label: 'Contact' },
    { path: '/faq', icon: HelpCircle, label: 'FAQ' },
  ];

  // Always show marketplace and calculator
  const commonNavItems = [
    { path: '/marketplace', icon: Store, label: 'Marketplace' },
    { path: '/calculator', icon: Calculator, label: 'Project Calculator' },
  ];

  const authenticatedNavItems = [
    { path: '/profile', icon: User, label: 'Profile' },
    // Show different label based on admin status
    { 
      path: '/admin-panel', 
      icon: Code, 
      label: isAdmin ? 'Admin Panel' : 'My Dashboard'
    },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
  ];

  // Determine which items to show based on current path
  const isHomepage = currentPath === '/';
  const publicNavItems = isHomepage ? [...commonNavItems, ...homepageOnlyItems] : commonNavItems;
  
  const navItems = isAuthenticated ? [...publicNavItems, ...authenticatedNavItems] : publicNavItems;

  // Handle navigation with preloading
  const handleNavigate = useCallback((path: string) => {
    // Prefetch marketplace data if navigating to marketplace
    if (path === '/marketplace') {
      prefetchOnHover();
    }
    navigate(path);
  }, [navigate, prefetchOnHover]);

  return (
    <nav className="p-4 space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.path;

        return (
          <Button
            key={item.path}
            variant={isActive ? "default" : "ghost"}
            className={`w-full justify-start gap-3 ${
              isActive
                ? "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                : "hover:bg-accent hover:text-accent-foreground"
            }`}
            onClick={() => handleNavigate(item.path)}
            onMouseEnter={() => {
              // Prefetch data when hovering over marketplace
              if (item.path === '/marketplace') {
                prefetchOnHover();
              }
            }}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Button>
        );
      })}
    </nav>
  );
};
