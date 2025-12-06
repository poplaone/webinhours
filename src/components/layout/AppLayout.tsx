import React from 'react';
import { Header } from '@/components/sections/Header';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { CookieConsent } from '@/components/ui/cookie-consent';

interface AppLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showMobileNav?: boolean;
  className?: string;
}

const AppLayout = ({ children, showHeader = true, showMobileNav = true, className = "" }: AppLayoutProps) => {
  return (
    <div className={`min-h-screen relative ${className}`}>
      {showHeader && <Header />}
      <main className="pb-24 sm:pb-28 lg:pb-0">
        {children}
      </main>
      {showMobileNav && <MobileBottomNav />}
      <CookieConsent />
    </div>
  );
};

export default AppLayout;
