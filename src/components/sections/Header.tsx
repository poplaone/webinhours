import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Menu, X, ChevronDown, ArrowUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileHeaderVisible, setMobileHeaderVisible] = useState(false);

  const { scrollY } = useScroll();
  
  // Transform values for scroll effects (only for desktop)
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.98]);
  const headerHeight = useTransform(scrollY, [0, 100], [64, 56]);
  
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
    { label: 'Blog', path: '/blog' },
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
              ? 'bg-background/95 backdrop-blur-lg border-border/40' 
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
              
              {/* Menu button on right */}
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 rounded-lg touch-manipulation text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
              <motion.div
                className="border-t border-border/40"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
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
              </motion.div>
            )}
          </div>
        </header>

        {/* Add padding to prevent content overlap */}
        <div className="h-14 lg:hidden" />

        {/* Scroll to top button */}
        <motion.button
          className="fixed bottom-20 right-4 z-50 bg-[#8B5CF6] text-white p-3 rounded-full shadow-lg hover:bg-[#7C3AED] transition-all duration-300 hover:scale-110 lg:hidden"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: showScrollTop ? 1 : 0, 
            scale: showScrollTop ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      </>
    );
  }

  // Desktop header
  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
        style={{
          opacity: headerOpacity,
          scale: headerScale,
          height: headerHeight
        }}
        animate={{
          y: isVisible ? 0 : -100
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <div className="container flex h-full items-center justify-between px-3 sm:px-6">
          <motion.div 
            className="flex items-center space-x-2" 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
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
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.button
                key={item.label}
                onClick={() => handleNavigation(item.path)}
                className="text-muted-foreground hover:text-foreground transition-all duration-300 relative group text-sm font-medium"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8B5CF6] transition-all duration-300 group-hover:w-full" />
              </motion.button>
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

          {/* Desktop Get Started Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button 
              onClick={() => navigate('/marketplace')} 
              className="bg-[#8B5CF6] hover:bg-[#7C3AED] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#8B5CF6]/25 text-sm px-6"
            >
              Sign in
            </Button>
          </motion.div>
        </div>

        {/* Desktop Navigation Menu */}
        {isMenuOpen && (
          <motion.div
            className="hidden lg:block border-t bg-background/95 backdrop-blur"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
        )}
      </motion.header>

      {/* Scroll to top button for desktop */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 bg-[#8B5CF6] text-white p-3 rounded-full shadow-lg hover:bg-[#7C3AED] transition-all duration-300 hover:scale-110 hidden lg:block"
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0, 
          scale: showScrollTop ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </>
  );
};
