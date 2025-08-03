import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bot, Code, Globe, Zap, Database, Smartphone } from 'lucide-react';

export const MarketplacePreview = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -200]);
  const opacity = useTransform(scrollY, [0, 400, 800], [1, 0.8, 0.3]);
  
  // Floating icons animation based on scroll - coming from behind the image
  const leftIcon1X = useTransform(scrollY, [0, 300, 600], [0, -80, -150]);
  const leftIcon2X = useTransform(scrollY, [50, 350, 650], [0, -60, -120]);
  const leftIcon3X = useTransform(scrollY, [100, 400, 700], [0, -100, -180]);
  
  const rightIcon1X = useTransform(scrollY, [0, 300, 600], [0, 80, 150]);
  const rightIcon2X = useTransform(scrollY, [50, 350, 650], [0, 60, 120]);
  const rightIcon3X = useTransform(scrollY, [100, 400, 700], [0, 100, 180]);
  
  const iconsOpacity = useTransform(scrollY, [0, 200, 500, 800], [0, 0.8, 1, 0.3]);

  return (
    <motion.section 
      className="relative py-4 sm:py-6 md:py-8 px-4 sm:px-6 overflow-hidden"
      style={{ y, opacity }}
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

          {/* Floating Icons - Left Side (Behind Image) */}
          <motion.div
            className="absolute left-1/2 top-1/4 z-0"
            style={{ x: leftIcon1X, opacity: iconsOpacity }}
          >
            <motion.div
              className="relative p-4 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl overflow-hidden"
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Starry background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-blue-500/15">
                <div className="absolute top-1 left-2 w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse" />
                <div className="absolute top-3 right-3 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-2 left-1 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-1 right-1 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
              <Bot className="w-7 h-7 text-primary relative z-10" />
            </motion.div>
          </motion.div>
          
          <motion.div
            className="absolute left-1/2 top-1/2 z-0"
            style={{ x: leftIcon2X, opacity: iconsOpacity }}
          >
            <motion.div
              className="relative p-4 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl overflow-hidden"
              animate={{ rotate: [0, -2, 2, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              {/* Starry background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-primary/15">
                <div className="absolute top-2 left-1 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-1 right-2 w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
                <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }} />
                <div className="absolute bottom-1 right-1 w-0.5 h-0.5 bg-white/35 rounded-full animate-pulse" />
              </div>
              <Code className="w-7 h-7 text-purple-500 relative z-10" />
            </motion.div>
          </motion.div>
          
          <motion.div
            className="absolute left-1/2 top-3/4 z-0"
            style={{ x: leftIcon3X, opacity: iconsOpacity }}
          >
            <motion.div
              className="relative p-4 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl overflow-hidden"
              animate={{ rotate: [0, 1.5, -1.5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              {/* Starry background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-primary/15">
                <div className="absolute top-3 left-1 w-0.5 h-0.5 bg-white/45 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1 right-3 w-0.5 h-0.5 bg-white/55 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-1 left-2 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-2 right-1 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
              </div>
              <Globe className="w-7 h-7 text-blue-500 relative z-10" />
            </motion.div>
          </motion.div>

          {/* Floating Icons - Right Side (Behind Image) */}
          <motion.div
            className="absolute right-1/2 top-1/4 z-0"
            style={{ x: rightIcon1X, opacity: iconsOpacity }}
          >
            <motion.div
              className="relative p-4 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl overflow-hidden"
              animate={{ rotate: [0, -2, 2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              {/* Starry background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-primary/15">
                <div className="absolute top-1 left-3 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }} />
                <div className="absolute top-2 right-1 w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '1.8s' }} />
                <div className="absolute bottom-2 left-1 w-0.5 h-0.5 bg-white/45 rounded-full animate-pulse" style={{ animationDelay: '2.8s' }} />
                <div className="absolute bottom-3 right-2 w-0.5 h-0.5 bg-white/35 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
              </div>
              <Zap className="w-7 h-7 text-green-500 relative z-10" />
            </motion.div>
          </motion.div>
          
          <motion.div
            className="absolute right-1/2 top-1/2 z-0"
            style={{ x: rightIcon2X, opacity: iconsOpacity }}
          >
            <motion.div
              className="relative p-4 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl overflow-hidden"
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              {/* Starry background */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-red-500/10 to-primary/15">
                <div className="absolute top-2 left-2 w-0.5 h-0.5 bg-white/55 rounded-full animate-pulse" style={{ animationDelay: '1.2s' }} />
                <div className="absolute top-1 right-3 w-0.5 h-0.5 bg-white/45 rounded-full animate-pulse" style={{ animationDelay: '2.2s' }} />
                <div className="absolute bottom-3 left-1 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }} />
                <div className="absolute bottom-1 right-2 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '1.7s' }} />
              </div>
              <Database className="w-7 h-7 text-orange-500 relative z-10" />
            </motion.div>
          </motion.div>
          
          <motion.div
            className="absolute right-1/2 top-3/4 z-0"
            style={{ x: rightIcon3X, opacity: iconsOpacity }}
          >
            <motion.div
              className="relative p-4 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl overflow-hidden"
              animate={{ rotate: [0, -1.5, 1.5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
            >
              {/* Starry background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-400/10 to-primary/15">
                <div className="absolute top-3 left-2 w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                <div className="absolute top-1 right-1 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '1.4s' }} />
                <div className="absolute bottom-1 left-3 w-0.5 h-0.5 bg-white/45 rounded-full animate-pulse" style={{ animationDelay: '2.4s' }} />
                <div className="absolute bottom-2 right-3 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.9s' }} />
              </div>
              <Smartphone className="w-7 h-7 text-cyan-500 relative z-10" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};