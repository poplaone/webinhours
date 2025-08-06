
import React, { useState, useEffect } from 'react';
import { Code } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export const Footer = () => {
  const isMobile = useIsMobile();
  const [mobileFooterVisible, setMobileFooterVisible] = useState(false);

  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        setMobileFooterVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  return (
    <footer className={`py-12 px-4 border-t relative z-10 transition-all duration-[2000ms] ease-in-out ${
      isMobile && !mobileFooterVisible 
        ? 'bg-transparent backdrop-blur-none border-transparent' 
        : 'bg-card/30 backdrop-blur'
    }`}>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-[#8B5CF6] rounded-md p-2">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl">WebInHours</span>
            </div>
            <p className="text-muted-foreground">
              Professional web development services delivered with speed and precision.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Web Development</li>
              <li>Mobile Design</li>
              <li>E-commerce Solutions</li>
              <li>Performance Optimization</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>About Us</li>
              <li>Portfolio</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>LinkedIn</li>
              <li>Twitter</li>
              <li>GitHub</li>
              <li>Email</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/40 mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 WebInHours. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
