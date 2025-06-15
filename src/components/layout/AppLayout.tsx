
import React from 'react';
import { Header } from '@/components/sections/Header';
import MobileBottomNav from '@/components/layout/MobileBottomNav';

interface AppLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  className?: string;
}

const AppLayout = ({ children, showHeader = true, className = "" }: AppLayoutProps) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-background via-background to-background/80 relative ${className}`}>
      {showHeader && <Header />}
      <main className="pb-20 lg:pb-0">
        {children}
      </main>
      <MobileBottomNav />
    </div>
  );
};

export default AppLayout;
