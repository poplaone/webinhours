
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import SidebarLogo from './sidebar/SidebarLogo';
import { SidebarNavigation } from './sidebar/SidebarNavigation';
import { SidebarActions } from './sidebar/SidebarActions';

const SideNavbar = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Hide sidebar on mobile (handled by MobileBottomNav)
  const isMobile = window.innerWidth < 1024;
  if (isMobile) return null;

  return (
    <div className="w-64 bg-card border-r border-border/40 h-full flex flex-col">
      <SidebarLogo isExpanded={true} />
      <div className="flex-1 overflow-y-auto">
        <SidebarNavigation currentPath={location.pathname} isAuthenticated={!!user} />
      </div>
      <SidebarActions isAuthenticated={!!user} />
    </div>
  );
};

export default SideNavbar;
