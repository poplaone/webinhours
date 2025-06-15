
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = ['Services', 'About', 'Testimonials', 'Contact'];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-[#8B5CF6] rounded-md p-2 hover:bg-[#7C3AED] transition-colors duration-300">
            <Code className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent">
            WebInHours
          </span>
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-muted-foreground hover:text-foreground transition-all duration-300 relative group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8B5CF6] transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="p-2 touch-manipulation"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        {/* Desktop Get Started Button */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button 
            onClick={() => navigate('/marketplace')} 
            className="bg-[#8B5CF6] hover:bg-[#7C3AED] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#8B5CF6]/25"
          >
            Get Started
          </Button>
        </motion.div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden border-t bg-background/95 backdrop-blur"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col space-y-4 p-4">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-muted-foreground hover:text-foreground transition-colors py-2 text-lg touch-manipulation"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
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
