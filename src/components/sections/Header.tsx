
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
    { label: 'Testimonials', path: '/#testimonials' },
    { label: 'Contact', path: '/contact' },
  ];

  const moreItems = [
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Blog', path: '/blog' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
  ];

  const allMobileItems = [
    ...navItems,
    ...moreItems
  ];

  const handleNavigation = (path: string) => {
    if (path.startsWith('/#')) {
      // Handle anchor links
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-3 sm:px-6">
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
              {moreItems.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onClick={() => handleNavigation(item.path)}
                  className="cursor-pointer hover:bg-accent"
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="p-2 h-auto touch-manipulation"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        
        {/* Desktop Get Started Button */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button 
            onClick={() => navigate('/marketplace')} 
            className="bg-[#8B5CF6] hover:bg-[#7C3AED] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#8B5CF6]/25 text-sm px-6"
          >
            Get Started
          </Button>
        </motion.div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <motion.div 
          className="lg:hidden border-t bg-background/95 backdrop-blur"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col space-y-1 p-4 max-h-[70vh] overflow-y-auto">
            {/* All navigation items for mobile */}
            {allMobileItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.path)}
                className={`text-muted-foreground hover:text-foreground transition-colors py-3 text-left touch-manipulation hover:bg-accent/50 rounded-md px-2 ${
                  index < navItems.length ? 'text-base font-medium' : 'text-sm'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Get Started Button for Mobile */}
            <Button 
              onClick={() => {
                navigate('/marketplace');
                setIsMenuOpen(false);
              }}
              className="bg-[#8B5CF6] hover:bg-[#7C3AED] transition-all duration-300 w-full mt-4 min-h-[48px] touch-manipulation"
            >
              Get Started
            </Button>
          </nav>
        </motion.div>
      )}
    </header>
  );
};
