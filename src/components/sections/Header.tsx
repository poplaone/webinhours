
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-[#8B5CF6] rounded-md p-2 hover:bg-[#7C3AED] transition-colors duration-300">
            <Code className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent">
            WebInHours
          </span>
        </motion.div>
        
        <nav className="hidden md:flex items-center space-x-6">
          {['Services', 'About', 'Testimonials', 'Contact'].map((item, index) => (
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
        
        <motion.div
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
    </header>
  );
};
