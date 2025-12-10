import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCookiePreferences } from '@/components/ui/cookie-consent';

export const Footer = () => {
  const isMobile = useIsMobile();
  const [mobileFooterVisible, setMobileFooterVisible] = useState(false);
  const { openPreferences, PreferencesModal } = useCookiePreferences();

  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        setMobileFooterVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={`py-12 px-4 border-t relative z-10 transition-all duration-[2000ms] ease-in-out ${isMobile && !mobileFooterVisible
      ? 'bg-transparent backdrop-blur-none border-transparent'
      : isMobile
        ? 'bg-background/60 backdrop-blur-md border-border/20'
        : 'bg-card/30 backdrop-blur'
      }`}>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="WebInHours Logo" className="h-10 w-10 object-contain" />
              <span className="font-bold text-xl">WebInHour</span>
            </Link>
            <p className="text-muted-foreground">
              Professional web development services delivered with speed and precision.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/contact?service=custom-website" className="hover:text-foreground transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/contact?service=custom-website" className="hover:text-foreground transition-colors">
                  Mobile Design
                </Link>
              </li>
              <li>
                <Link to="/24-hour-website" className="hover:text-foreground transition-colors">
                  24-Hour Website
                </Link>
              </li>
              <li>
                <Link to="/same-day-delivery" className="hover:text-foreground transition-colors">
                  Same-Day Delivery
                </Link>
              </li>
              <li>
                <Link to="/contact?service=ecommerce" className="hover:text-foreground transition-colors">
                  E-commerce Solutions
                </Link>
              </li>
              <li>
                <Link to="/contact?service=seo-geo" className="hover:text-foreground transition-colors">
                  SEO & GEO Optimization
                </Link>
              </li>
              <li>
                <Link to="/contact?service=maintenance" className="hover:text-foreground transition-colors">
                  Performance Optimization
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/websites" className="hover:text-foreground transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@webinhour.com"
                  className="hover:text-foreground transition-colors"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/40 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground">
          <p>&copy; 2024 WebInHour. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/faq" className="hover:text-foreground transition-colors">
              FAQ
            </Link>
            <button
              onClick={openPreferences}
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Cookie className="h-3 w-3" />
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
      {PreferencesModal}
    </footer>
  );
};
