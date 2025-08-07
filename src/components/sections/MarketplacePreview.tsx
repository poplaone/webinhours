import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Bot, Code, Globe, Zap, Database, Smartphone } from 'lucide-react';

export const MarketplacePreview = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [animationsStarted, setAnimationsStarted] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Start animations after component mounts
    const timer = setTimeout(() => {
      setAnimationsStarted(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Add scroll animation for floating effect
  const { scrollY } = useScroll();
  
  // Create different transform values for each icon to create varied floating effect
  const floatY1 = useTransform(scrollY, [0, 1000], [0, 15]);
  const floatY2 = useTransform(scrollY, [0, 1000], [0, -10]);
  const floatY3 = useTransform(scrollY, [0, 1000], [0, 8]);
  const floatY4 = useTransform(scrollY, [0, 1000], [0, -12]);
  const floatY5 = useTransform(scrollY, [0, 1000], [0, 10]);
  const floatY6 = useTransform(scrollY, [0, 1000], [0, -7]);
  
  // Add spring physics for more natural movement
  const springY1 = useSpring(floatY1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(floatY2, { stiffness: 80, damping: 25 });
  const springY3 = useSpring(floatY3, { stiffness: 90, damping: 20 });
  const springY4 = useSpring(floatY4, { stiffness: 70, damping: 35 });
  const springY5 = useSpring(floatY5, { stiffness: 85, damping: 30 });
  const springY6 = useSpring(floatY6, { stiffness: 95, damping: 25 });

  return (
    <motion.section 
      className="relative py-4 sm:py-6 md:py-8 px-4 sm:px-6 overflow-visible"
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-primary/20 via-primary/10 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-gradient-to-br from-blue-500/15 to-primary/15 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/3 right-1/3 w-[300px] h-[300px] bg-gradient-to-tl from-purple-500/15 to-primary/15 rounded-full blur-2xl animate-pulse delay-2000" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Circuit lines behind icons - Left side */}
          {!isMobile && (
            <svg 
              className="absolute -left-32 top-0 w-96 h-full pointer-events-none z-[5]" 
              viewBox="0 0 400 800"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="leftCircuitGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                  <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="leftCircuitGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(168, 85, 247)" stopOpacity="0" />
                  <stop offset="50%" stopColor="rgb(168, 85, 247)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="leftCircuitGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
                  <stop offset="50%" stopColor="rgb(59, 130, 246)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="1" />
                </linearGradient>
                <filter id="leftGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Main trunk from left edge */}
              <path 
                d="M -50 400 L 150 400" 
                stroke="url(#leftCircuitGradient1)" 
                strokeWidth="3" 
                fill="none" 
                filter="url(#leftGlow)"
                strokeDasharray="200"
                strokeDashoffset={animationsStarted ? "0" : "200"}
                style={{ 
                  transition: "stroke-dashoffset 2s ease-out",
                  transitionDelay: "0.5s"
                }}
              />
              
              {/* Branch to top icon (Bot) */}
              <path 
                d="M 150 400 L 200 400 L 200 160 L 300 160" 
                stroke="url(#leftCircuitGradient1)" 
                strokeWidth="2" 
                fill="none" 
                filter="url(#leftGlow)"
                strokeDasharray="290"
                strokeDashoffset={animationsStarted ? "0" : "290"}
                style={{ 
                  transition: "stroke-dashoffset 2.5s ease-out",
                  transitionDelay: "1s"
                }}
              />
              
              {/* Branch to middle icon (Code) */}
              <path 
                d="M 150 400 L 300 400" 
                stroke="url(#leftCircuitGradient2)" 
                strokeWidth="2" 
                fill="none" 
                filter="url(#leftGlow)"
                strokeDasharray="150"
                strokeDashoffset={animationsStarted ? "0" : "150"}
                style={{ 
                  transition: "stroke-dashoffset 2.5s ease-out",
                  transitionDelay: "1.3s"
                }}
              />
              
              {/* Branch to bottom icon (Globe) */}
              <path 
                d="M 150 400 L 200 400 L 200 640 L 300 640" 
                stroke="url(#leftCircuitGradient3)" 
                strokeWidth="2" 
                fill="none" 
                filter="url(#leftGlow)"
                strokeDasharray="290"
                strokeDashoffset={animationsStarted ? "0" : "290"}
                style={{ 
                  transition: "stroke-dashoffset 2.5s ease-out",
                  transitionDelay: "1.6s"
                }}
              />

              {/* Secondary branches extending beyond */}
              <path 
                d="M 300 160 L 380 160 L 400 140" 
                stroke="url(#leftCircuitGradient1)" 
                strokeWidth="1.5" 
                fill="none" 
                filter="url(#leftGlow)"
                opacity="0.6"
                strokeDasharray="100"
                strokeDashoffset={animationsStarted ? "0" : "100"}
                style={{ 
                  transition: "stroke-dashoffset 2s ease-out",
                  transitionDelay: "3.5s"
                }}
              />
              
              <path 
                d="M 300 400 L 380 400 L 400 380" 
                stroke="url(#leftCircuitGradient2)" 
                strokeWidth="1.5" 
                fill="none" 
                filter="url(#leftGlow)"
                opacity="0.6"
                strokeDasharray="100"
                strokeDashoffset={animationsStarted ? "0" : "100"}
                style={{ 
                  transition: "stroke-dashoffset 2s ease-out",
                  transitionDelay: "3.8s"
                }}
              />
              
              <path 
                d="M 300 640 L 380 640 L 400 660" 
                stroke="url(#leftCircuitGradient3)" 
                strokeWidth="1.5" 
                fill="none" 
                filter="url(#leftGlow)"
                opacity="0.6"
                strokeDasharray="100"
                strokeDashoffset={animationsStarted ? "0" : "100"}
                style={{ 
                  transition: "stroke-dashoffset 2s ease-out",
                  transitionDelay: "4.1s"
                }}
              />

              {/* Junction nodes */}
              <circle 
                cx="150" 
                cy="400" 
                r="4" 
                fill="hsl(var(--primary))" 
                opacity={animationsStarted ? "1" : "0"}
                style={{ 
                  transition: "opacity 0.5s ease-out",
                  transitionDelay: "2.5s",
                  filter: "drop-shadow(0 0 8px hsl(var(--primary)))"
                }}
              />

              {/* Connection points at icons */}
              <circle 
                cx="300" 
                cy="160" 
                r="3" 
                fill="hsl(var(--primary))" 
                opacity={animationsStarted ? "1" : "0"}
                style={{ 
                  transition: "opacity 0.5s ease-out",
                  transitionDelay: "3.5s",
                  filter: "drop-shadow(0 0 6px hsl(var(--primary)))"
                }}
              />
              <circle 
                cx="300" 
                cy="400" 
                r="3" 
                fill="rgb(168, 85, 247)" 
                opacity={animationsStarted ? "1" : "0"}
                style={{ 
                  transition: "opacity 0.5s ease-out",
                  transitionDelay: "3.8s",
                  filter: "drop-shadow(0 0 6px rgb(168, 85, 247))"
                }}
              />
              <circle 
                cx="300" 
                cy="640" 
                r="3" 
                fill="rgb(59, 130, 246)" 
                opacity={animationsStarted ? "1" : "0"}
                style={{ 
                  transition: "opacity 0.5s ease-out",
                  transitionDelay: "4.1s",
                  filter: "drop-shadow(0 0 6px rgb(59, 130, 246))"
                }}
              />
            </svg>
          )}

          {/* Circuit lines behind icons - Right side */}
          {!isMobile && (
            <svg 
              className="absolute -right-32 top-0 w-96 h-full pointer-events-none z-[5]" 
              viewBox="0 0 400 800"
              style={{ overflow: 'visible', transform: 'scaleX(-1)' }}
            >
              <defs>
                <linearGradient id="rightCircuitGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0" />
                  <stop offset="50%" stopColor="rgb(34, 197, 94)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="rightCircuitGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(249, 115, 22)" stopOpacity="0" />
                  <stop offset="50%" stopColor="rgb(249, 115, 22)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="rgb(249, 115, 22)" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="rightCircuitGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(6, 182, 212)" stopOpacity="0" />
                  <stop offset="50%" stopColor="rgb(6, 182, 212)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="rgb(6, 182, 212)" stopOpacity="1" />
                </linearGradient>
                <filter id="rightGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Main trunk from right edge */}
              <path 
                d="M -50 400 L 150 400" 
                stroke="url(#rightCircuitGradient1)" 
                strokeWidth="3" 
                fill="none" 
                filter="url(#rightGlow)"
                strokeDasharray="200"
                strokeDashoffset={animationsStarted ? "0" : "200"}
                style={{ 
                  transition: "stroke-dashoffset 2s ease-out",
                  transitionDelay: "2s"
                }}
              />
              
              {/* Branch to top icon (Zap) */}
              <path 
                d="M 150 400 L 200 400 L 200 160 L 300 160" 
                stroke="url(#rightCircuitGradient1)" 
                strokeWidth="2" 
                fill="none" 
                filter="url(#rightGlow)"
                strokeDasharray="290"
                strokeDashoffset={animationsStarted ? "0" : "290"}
                style={{ 
                  transition: "stroke-dashoffset 2.5s ease-out",
                  transitionDelay: "2.5s"
                }}
              />
              
              {/* Branch to middle icon (Database) */}
              <path 
                d="M 150 400 L 300 400" 
                stroke="url(#rightCircuitGradient2)" 
                strokeWidth="2" 
                fill="none" 
                filter="url(#rightGlow)"
                strokeDasharray="150"
                strokeDashoffset={animationsStarted ? "0" : "150"}
                style={{ 
                  transition: "stroke-dashoffset 2.5s ease-out",
                  transitionDelay: "2.8s"
                }}
              />
              
              {/* Branch to bottom icon (Smartphone) */}
              <path 
                d="M 150 400 L 200 400 L 200 640 L 300 640" 
                stroke="url(#rightCircuitGradient3)" 
                strokeWidth="2" 
                fill="none" 
                filter="url(#rightGlow)"
                strokeDasharray="290"
                strokeDashoffset={animationsStarted ? "0" : "290"}
                style={{ 
                  transition: "stroke-dashoffset 2.5s ease-out",
                  transitionDelay: "3.1s"
                }}
              />

              {/* Secondary branches extending beyond */}
              <path 
                d="M 300 160 L 380 160 L 400 140" 
                stroke="url(#rightCircuitGradient1)" 
                strokeWidth="1.5" 
                fill="none" 
                filter="url(#rightGlow)"
                opacity="0.6"
                strokeDasharray="100"
                strokeDashoffset={animationsStarted ? "0" : "100"}
                style={{ 
                  transition: "stroke-dashoffset 2s ease-out",
                  transitionDelay: "4.5s"
                }}
              />
              
              <path 
                d="M 300 400 L 380 400 L 400 380" 
                stroke="url(#rightCircuitGradient2)" 
                strokeWidth="1.5" 
                fill="none" 
                filter="url(#rightGlow)"
                opacity="0.6"
                strokeDasharray="100"
                strokeDashoffset={animationsStarted ? "0" : "100"}
                style={{ 
                  transition: "stroke-dashoffset 2s ease-out",
                  transitionDelay: "4.8s"
                }}
              />
              
              <path 
                d="M 300 640 L 380 640 L 400 660" 
                stroke="url(#rightCircuitGradient3)" 
                strokeWidth="1.5" 
                fill="none" 
                filter="url(#rightGlow)"
                opacity="0.6"
                strokeDasharray="100"
                strokeDashoffset={animationsStarted ? "0" : "100"}
                style={{ 
                  transition: "stroke-dashoffset 2s ease-out",
                  transitionDelay: "5.1s"
                }}
              />

              {/* Junction nodes */}
              <circle 
                cx="150" 
                cy="400" 
                r="4" 
                fill="rgb(34, 197, 94)" 
                opacity={animationsStarted ? "1" : "0"}
                style={{ 
                  transition: "opacity 0.5s ease-out",
                  transitionDelay: "4s",
                  filter: "drop-shadow(0 0 8px rgb(34, 197, 94))"
                }}
              />

              {/* Connection points at icons */}
              <circle 
                cx="300" 
                cy="160" 
                r="3" 
                fill="rgb(34, 197, 94)" 
                opacity={animationsStarted ? "1" : "0"}
                style={{ 
                  transition: "opacity 0.5s ease-out",
                  transitionDelay: "4.5s",
                  filter: "drop-shadow(0 0 6px rgb(34, 197, 94))"
                }}
              />
              <circle 
                cx="300" 
                cy="400" 
                r="3" 
                fill="rgb(249, 115, 22)" 
                opacity={animationsStarted ? "1" : "0"}
                style={{ 
                  transition: "opacity 0.5s ease-out",
                  transitionDelay: "4.8s",
                  filter: "drop-shadow(0 0 6px rgb(249, 115, 22))"
                }}
              />
              <circle 
                cx="300" 
                cy="640" 
                r="3" 
                fill="rgb(6, 182, 212)" 
                opacity={animationsStarted ? "1" : "0"}
                style={{ 
                  transition: "opacity 0.5s ease-out",
                  transitionDelay: "5.1s",
                  filter: "drop-shadow(0 0 6px rgb(6, 182, 212))"
                }}
              />
            </svg>
          )}

          {/* Glass border container */}
          <div className="relative p-1 rounded-2xl bg-gradient-to-r from-white/20 via-primary/30 to-purple-500/20 backdrop-blur-sm">
            {/* Inner glass effect */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-2xl">
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/50 via-purple-500/50 to-blue-500/50 opacity-0 animate-pulse blur-sm" 
                   style={{ 
                     animation: 'pulse 3s ease-in-out infinite alternate',
                     animationDelay: '0s'
                   }} />
              
              {/* Image container */}
              <div className="relative p-2 sm:p-4">
                <img
                  src="/lovable-uploads/f22f95ca-a337-40a0-b696-96e2d06bf221.png"
                  alt="Marketplace Dashboard Preview"
                  className="w-full h-auto rounded-lg shadow-xl"
                  loading="lazy"
                />
                
                {/* Overlay glow effect */}
                <div className="absolute inset-2 sm:inset-4 rounded-lg bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Floating Icons - Desktop Only */}
          {!isMobile && (
            <>
              {/* Icon 1 - AI/Bot */}
              <motion.div
                style={{ y: springY1 }}
                className="absolute z-20 -left-20 top-[20%]"
              >
                <div className="relative backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl overflow-hidden p-4">
                  {/* Starry background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-blue-500/15">
                    <div className="absolute top-1 left-2 w-0.5 h-0.5 bg-white/60 rounded-full" />
                    <div className="absolute top-3 right-3 w-0.5 h-0.5 bg-white/40 rounded-full" />
                    <div className="absolute bottom-2 left-1 w-0.5 h-0.5 bg-white/50 rounded-full" />
                    <div className="absolute bottom-1 right-1 w-0.5 h-0.5 bg-white/30 rounded-full" />
                  </div>
                  <Bot className="w-7 h-7 text-primary relative z-10" />
                </div>
              </motion.div>
              
              {/* Icon 2 - Code */}
              <motion.div
                style={{ y: springY2 }}
                className="absolute z-20 -left-20 top-[50%]"
              >
                <div className="relative backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl overflow-hidden p-4">
                  {/* Starry background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-primary/15">
                    <div className="absolute top-2 left-1 w-0.5 h-0.5 bg-white/50 rounded-full" />
                    <div className="absolute top-1 right-2 w-0.5 h-0.5 bg-white/60 rounded-full" />
                    <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-white/40 rounded-full" />
                    <div className="absolute bottom-1 right-1 w-0.5 h-0.5 bg-white/35 rounded-full" />
                  </div>
                  <Code className="w-7 h-7 text-purple-500 relative z-10" />
                </div>
              </motion.div>
              
              {/* Icon 3 - Globe */}
              <motion.div
                style={{ y: springY3 }}
                className="absolute z-20 -left-20 top-[80%]"
              >
                <div className="relative backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl overflow-hidden p-4">
                  {/* Starry background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-primary/15">
                    <div className="absolute top-3 left-1 w-0.5 h-0.5 bg-white/45 rounded-full" />
                    <div className="absolute top-1 right-3 w-0.5 h-0.5 bg-white/55 rounded-full" />
                    <div className="absolute bottom-1 left-2 w-0.5 h-0.5 bg-white/50 rounded-full" />
                    <div className="absolute bottom-2 right-1 w-0.5 h-0.5 bg-white/40 rounded-full" />
                  </div>
                  <Globe className="w-7 h-7 text-blue-500 relative z-10" />
                </div>
              </motion.div>

              {/* Icon 4 - Zap */}
              <motion.div
                style={{ y: springY4 }}
                className="absolute z-20 -right-20 top-[20%]"
              >
                <div className="relative backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl overflow-hidden p-4">
                  {/* Starry background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-primary/15">
                    <div className="absolute top-1 left-3 w-0.5 h-0.5 bg-white/50 rounded-full" />
                    <div className="absolute top-2 right-1 w-0.5 h-0.5 bg-white/60 rounded-full" />
                    <div className="absolute bottom-2 left-1 w-0.5 h-0.5 bg-white/45 rounded-full" />
                    <div className="absolute bottom-3 right-2 w-0.5 h-0.5 bg-white/35 rounded-full" />
                  </div>
                  <Zap className="w-7 h-7 text-green-500 relative z-10" />
                </div>
              </motion.div>
              
              {/* Icon 5 - Database */}
              <motion.div
                style={{ y: springY5 }}
                className="absolute z-20 -right-20 top-[50%]"
              >
                <div className="relative backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl overflow-hidden p-4">
                  {/* Starry background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-red-500/10 to-primary/15">
                    <div className="absolute top-2 left-2 w-0.5 h-0.5 bg-white/55 rounded-full" />
                    <div className="absolute top-1 right-3 w-0.5 h-0.5 bg-white/45 rounded-full" />
                    <div className="absolute bottom-3 left-1 w-0.5 h-0.5 bg-white/40 rounded-full" />
                    <div className="absolute bottom-1 right-2 w-0.5 h-0.5 bg-white/50 rounded-full" />
                  </div>
                  <Database className="w-7 h-7 text-orange-500 relative z-10" />
                </div>
              </motion.div>
              
              {/* Icon 6 - Smartphone */}
              <motion.div
                style={{ y: springY6 }}
                className="absolute z-20 -right-20 top-[80%]"
              >
                <div className="relative backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl overflow-hidden p-4">
                  {/* Starry background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-400/10 to-primary/15">
                    <div className="absolute top-3 left-2 w-0.5 h-0.5 bg-white/60 rounded-full" />
                    <div className="absolute top-1 right-1 w-0.5 h-0.5 bg-white/50 rounded-full" />
                    <div className="absolute bottom-1 left-3 w-0.5 h-0.5 bg-white/45 rounded-full" />
                    <div className="absolute bottom-2 right-3 w-0.5 h-0.5 bg-white/40 rounded-full" />
                  </div>
                  <Smartphone className="w-7 h-7 text-cyan-500 relative z-10" />
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};