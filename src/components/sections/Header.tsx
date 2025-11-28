import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Code, Menu, X, ArrowUp, HelpCircle, DollarSign, FileText, Shield, RotateCcw, Lightbulb, Globe, Palette, FileCode, Zap, Image, Search, Smartphone, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { useProfile } from '@/hooks/useProfiles';
import { UserDropdown } from "@/components/ui/user-dropdown";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { LucideIcon } from 'lucide-react';

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
    { label: 'Calculator', path: '/calculator' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  type LinkItem = {
    title: string;
    href: string;
    icon: LucideIcon;
    description?: string;
  };

  const serviceItems: LinkItem[] = [
    { 
      title: 'Free Website Templates', 
      href: '/marketplace', 
      icon: Globe, 
      description: 'Browse 100+ professional templates' 
    },
    { 
      title: 'Custom Design', 
      href: '/#services', 
      icon: Palette, 
      description: 'Tailored design matching your brand' 
    },
    { 
      title: 'Content Creation', 
      href: '/#services', 
      icon: FileCode, 
      description: 'Professional copywriting & media' 
    },
    { 
      title: 'SEO Optimization', 
      href: '/#services', 
      icon: Search, 
      description: 'Rank higher in search results' 
    },
    { 
      title: 'Performance', 
      href: '/#services', 
      icon: Zap, 
      description: 'Lightning-fast load times' 
    },
    { 
      title: 'Mobile Responsive', 
      href: '/#services', 
      icon: Smartphone, 
      description: 'Perfect on all devices' 
    },
  ];

  const featuredServices: LinkItem[] = [
    { title: 'View All Services', href: '/#services', icon: FileCode },
    { title: 'Browse Marketplace', href: '/marketplace', icon: Globe },
    { title: 'Get a Quote', href: '/calculator', icon: DollarSign },
  ];

  const moreItems: LinkItem[] = [
    { title: 'How It Works', href: '/how-it-works', icon: Lightbulb, description: 'Learn our proven process' },
    { title: 'Pricing', href: '/pricing', icon: DollarSign, description: 'Transparent pricing plans' },
    { title: 'FAQ', href: '/faq', icon: HelpCircle, description: 'Common questions answered' },
  ];

  const legalItems: LinkItem[] = [
    { title: 'Privacy Policy', href: '/privacy', icon: Shield },
    { title: 'Terms of Service', href: '/terms', icon: FileText },
  ];

  const allMobileItems = [
    { label: 'Services', path: '/#services' },
    ...navItems, 
    ...moreItems.map(item => ({ label: item.title, path: item.href })), 
    ...legalItems.map(item => ({ label: item.title, path: item.href }))
  ];

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
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {/* Services Mega Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-foreground">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background p-1">
                  <div className="grid w-[700px] grid-cols-[2fr_1fr] gap-2">
                    {/* Main Services Grid */}
                    <ul className="bg-popover grid grid-cols-2 gap-2 rounded-md border p-3 shadow-lg">
                      {serviceItems.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink 
                            className="w-full flex flex-row gap-x-2 hover:bg-accent hover:text-accent-foreground rounded-md p-3 cursor-pointer group transition-all"
                            asChild
                          >
                            <button onClick={() => handleNavigation(item.href)} className="w-full text-left">
                              <div className="bg-primary/10 flex aspect-square size-11 items-center justify-center rounded-md border border-primary/20 shadow-sm group-hover:bg-primary/20 transition-colors">
                                <item.icon className="text-primary size-5" />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <span className="font-semibold text-sm">{item.title}</span>
                                <span className="text-muted-foreground text-xs leading-tight">{item.description}</span>
                              </div>
                            </button>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Featured Actions */}
                    <div className="space-y-2 p-2">
                      <div className="mb-3">
                        <h4 className="font-semibold text-sm mb-1 px-2">Quick Actions</h4>
                        <p className="text-xs text-muted-foreground px-2">Get started today</p>
                      </div>
                      <ul className="space-y-1">
                        {featuredServices.map((item) => (
                          <li key={item.title}>
                            <NavigationMenuLink
                              className="flex p-2.5 hover:bg-accent flex-row rounded-md items-center gap-x-2 cursor-pointer group transition-colors"
                              asChild
                            >
                              <button onClick={() => handleNavigation(item.href)} className="w-full text-left">
                                <div className="bg-primary/10 p-1.5 rounded-md group-hover:bg-primary/20 transition-colors">
                                  <item.icon className="text-primary size-4" />
                                </div>
                                <span className="font-medium text-sm">{item.title}</span>
                              </button>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                      
                      {/* CTA Section */}
                      <div className="mt-4 p-3 bg-primary/5 rounded-md border border-primary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock className="size-4 text-primary" />
                          <span className="text-xs font-semibold">24-Hour Delivery</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Get your website live in 24 hours with SSL & GDPR compliance
                        </p>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Regular Nav Items */}
              {navItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground focus:outline-none relative"
                  >
                    {item.label}
                    <span className="absolute bottom-2 left-4 right-4 h-0.5 bg-[#8B5CF6] scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </button>
                </NavigationMenuItem>
              ))}
              
              {/* More dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-foreground">
                  More
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background p-1 pr-1.5 pb-1.5">
                  <div className="grid w-[500px] grid-cols-2 gap-2">
                    <ul className="bg-popover space-y-2 rounded-md border p-2 shadow-lg">
                      {moreItems.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink 
                            className="w-full flex flex-row gap-x-2 hover:bg-accent hover:text-accent-foreground rounded-md p-2 cursor-pointer"
                            asChild
                          >
                            <button onClick={() => handleNavigation(item.href)} className="w-full text-left">
                              <div className="bg-background/40 flex aspect-square size-10 items-center justify-center rounded-md border shadow-sm">
                                <item.icon className="text-foreground size-4" />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <span className="font-medium text-sm">{item.title}</span>
                                <span className="text-muted-foreground text-xs">{item.description}</span>
                              </div>
                            </button>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-2 p-3">
                      {legalItems.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink
                            className="flex p-2 hover:bg-accent flex-row rounded-md items-center gap-x-2 cursor-pointer"
                            asChild
                          >
                            <button onClick={() => handleNavigation(item.href)} className="w-full text-left">
                              <item.icon className="text-foreground size-4" />
                              <span className="font-medium text-sm">{item.title}</span>
                            </button>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

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
