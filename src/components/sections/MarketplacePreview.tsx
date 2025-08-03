import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bot, Code, Globe, Zap, Database, Smartphone } from 'lucide-react';

export const MarketplacePreview = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -200]);
  const opacity = useTransform(scrollY, [0, 400, 800], [1, 0.8, 0.3]);
  
  // Floating icons animation based on scroll
  const leftIcon1X = useTransform(scrollY, [200, 600], [-100, 50]);
  const leftIcon2X = useTransform(scrollY, [250, 650], [-120, 30]);
  const leftIcon3X = useTransform(scrollY, [300, 700], [-80, 70]);
  
  const rightIcon1X = useTransform(scrollY, [200, 600], [100, -50]);
  const rightIcon2X = useTransform(scrollY, [250, 650], [120, -30]);
  const rightIcon3X = useTransform(scrollY, [300, 700], [80, -70]);
  
  const iconsOpacity = useTransform(scrollY, [200, 400, 800], [0, 1, 0]);

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

          {/* Floating Icons - Left Side */}
          <motion.div
            className="absolute left-0 top-1/4 z-20"
            style={{ x: leftIcon1X, opacity: iconsOpacity }}
          >
            <motion.div
              className="p-3 bg-primary/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Bot className="w-6 h-6 text-primary" />
            </motion.div>
          </motion.div>
          
          <motion.div
            className="absolute left-0 top-1/2 z-20"
            style={{ x: leftIcon2X, opacity: iconsOpacity }}
          >
            <motion.div
              className="p-3 bg-purple-500/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg"
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Code className="w-6 h-6 text-purple-500" />
            </motion.div>
          </motion.div>
          
          <motion.div
            className="absolute left-0 top-3/4 z-20"
            style={{ x: leftIcon3X, opacity: iconsOpacity }}
          >
            <motion.div
              className="p-3 bg-blue-500/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg"
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <Globe className="w-6 h-6 text-blue-500" />
            </motion.div>
          </motion.div>

          {/* Floating Icons - Right Side */}
          <motion.div
            className="absolute right-0 top-1/4 z-20"
            style={{ x: rightIcon1X, opacity: iconsOpacity }}
          >
            <motion.div
              className="p-3 bg-green-500/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg"
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <Zap className="w-6 h-6 text-green-500" />
            </motion.div>
          </motion.div>
          
          <motion.div
            className="absolute right-0 top-1/2 z-20"
            style={{ x: rightIcon2X, opacity: iconsOpacity }}
          >
            <motion.div
              className="p-3 bg-orange-500/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              <Database className="w-6 h-6 text-orange-500" />
            </motion.div>
          </motion.div>
          
          <motion.div
            className="absolute right-0 top-3/4 z-20"
            style={{ x: rightIcon3X, opacity: iconsOpacity }}
          >
            <motion.div
              className="p-3 bg-cyan-500/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg"
              animate={{ rotate: [0, -3, 3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
            >
              <Smartphone className="w-6 h-6 text-cyan-500" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};