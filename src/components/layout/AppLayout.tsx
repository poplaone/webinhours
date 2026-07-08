import { GridPattern } from '@/components/ui/GridPattern';
import { Header } from '@/components/sections/Header';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { CookieConsent } from '@/components/ui/cookie-consent';
import { MessageCircle } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showMobileNav?: boolean;
  className?: string;
}

const AppLayout = ({ children, showHeader = true, showMobileNav = true, className = "" }: AppLayoutProps) => {
  return (
    <div className={`min-h-screen relative ${className}`}>
      {/* Skip link — first focusable element, visible only on keyboard focus */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-primary focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to content
      </a>
      <GridPattern />
      {showHeader && <Header />}
      {/* Not a <main> landmark — App.tsx already provides the single <main id="main-content">.
          Nesting <main> inside it is invalid HTML and breaks screen-reader landmark nav. */}
      <div className="pb-24 sm:pb-28 lg:pb-0 relative z-10">
        {children}
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/917560032111"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-4 lg:bottom-8 lg:right-8 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-3.5 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-4 bg-background border border-border text-foreground text-sm px-3 py-1.5 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none hidden sm:block">
          Chat with us
        </span>
      </a>

      {showMobileNav && <MobileBottomNav />}
      <CookieConsent />
    </div>
  );
};

export default AppLayout;
