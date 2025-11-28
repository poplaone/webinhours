import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Code, Menu, X, ChevronDown, ArrowUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { useProfile } from '@/hooks/useProfiles';
import { UserDropdown } from "@/components/ui/user-dropdown";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const { data: profile } = useProfile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileHeaderVisible, setMobileHeaderVisible] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { label: 'Services', path: '/#services' },
    { label: 'Calculator', path: '/calculator' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const moreItems = [
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' }
  ];

  const allMobileItems = [...navItems, ...moreItems];

  // Handle mobile header appearance
  useEffect(() => {
    if (isMobile) {
      // Start transparent, then appear after 500ms for better UX
      const timer = setTimeout(() => {
        setMobileHeaderVisible(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide scroll to top button
      setShowScrollTop(currentScrollY > 300);
      
      // Hide/show header on scroll (only for desktop)
      if (!isMobile) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false); // Scrolling down
        } else {
          setIsVisible(true); // Scrolling up
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobile]);

  const handleNavigation = (path: string) => {
    if (path.startsWith('/#')) {
      const anchor = path.substring(2);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mobile header styles - matching bottom nav (thinner for more content space)
  if (isMobile) {
    return (
      <>
        <header className="fixed top-2 left-2 right-2 z-50 lg:hidden">
          <div className={`rounded-xl border shadow-xl transition-all duration-700 ease-in-out ${
            mobileHeaderVisible 
              ? 'bg-background/70 backdrop-blur-md border-border/30' 
              : 'bg-transparent backdrop-blur-none border-transparent'
          }`}>
            <div className="flex items-center justify-between py-2 px-3">
              {/* Logo on left */}
              <div 
                className="flex items-center space-x-2 cursor-pointer" 
                onClick={() => navigate('/')}
              >
                <div className="bg-[#8B5CF6] rounded-lg p-1.5">
                  <Code className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-sm bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent">
                  WebInHours
                </span>
              </div>
              
              {/* Theme toggle and Menu button on right */}
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 rounded-lg touch-manipulation text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200"
                  onClick={toggleMenu}
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
              <div className="border-t border-border/40">
                <nav className="flex flex-col space-y-1 p-4 max-h-[55vh] overflow-y-auto">
                  {allMobileItems.map((item, index) => (
                    <button
                      key={item.label}
                      onClick={() => handleNavigation(item.path)}
                      className={`text-muted-foreground hover:text-foreground transition-colors py-2 text-left touch-manipulation hover:bg-accent/50 rounded-md px-2 ${
                        index < navItems.length ? 'text-base font-medium' : 'text-sm'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </header>

        {/* Add padding to prevent content overlap */}
        <div className="h-14 lg:hidden" />

        {/* Scroll to top button */}
        {showScrollTop && (
          <button
            className="fixed bottom-20 right-4 z-50 bg-[#8B5CF6] text-white p-3 rounded-full shadow-lg hover:bg-[#7C3AED] transition-all duration-300 hover:scale-110 lg:hidden"
            onClick={scrollToTop}
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
      </>
    );
  }

  // Desktop header
  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container flex h-16 items-center justify-between px-3 sm:px-6">
          <div className="flex items-center space-x-2">
            <div 
              className="bg-[#8B5CF6] rounded-md p-1.5 sm:p-2 hover:bg-[#7C3AED] transition-colors duration-300 cursor-pointer" 
              onClick={() => navigate('/')}
            >
              <Code className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
            </div>
            <span 
              className="font-bold text-base sm:text-lg md:text-xl bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent cursor-pointer" 
              onClick={() => navigate('/')}
            >
              WebInHours
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.path)}
                className="text-muted-foreground hover:text-foreground transition-all duration-300 relative group text-sm font-medium"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8B5CF6] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            
            {/* More dropdown for desktop */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-0 h-auto font-medium text-sm">
                  More <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-background border shadow-lg">
                {moreItems.map(item => (
                  <DropdownMenuItem key={item.label} onClick={() => handleNavigation(item.path)} className="cursor-pointer hover:bg-accent">
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Desktop Theme Toggle and Get Started Button */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            {user ? (
              <UserDropdown profile={profile} />
            ) : (
              <Button 
                onClick={() => navigate('/auth')} 
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#8B5CF6]/25 text-sm px-6"
              >
                Sign in
              </Button>
            )}
          </div>
        </div>

        {/* Desktop Navigation Menu */}
        {isMenuOpen && (
          <div className="hidden lg:block border-t bg-background/95 backdrop-blur">
            <nav className="flex flex-col space-y-1 p-4 max-h-[70vh] overflow-y-auto">
              {allMobileItems.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.path)}
                  className={`text-muted-foreground hover:text-foreground transition-colors py-3 text-left hover:bg-accent/50 rounded-md px-2 ${
                    index < navItems.length ? 'text-base font-medium' : 'text-sm'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Scroll to top button for desktop */}
      {showScrollTop && (
        <button
          className="fixed bottom-8 right-8 z-50 bg-[#8B5CF6] text-white p-3 rounded-full shadow-lg hover:bg-[#7C3AED] transition-all duration-300 hover:scale-110 hidden lg:block"
          onClick={scrollToTop}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
};
