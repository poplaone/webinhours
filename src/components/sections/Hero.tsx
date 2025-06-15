
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const navigate = useNavigate();
  const [currentText, setCurrentText] = useState(0);
  const texts = ["In Hours", "Not Weeks"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Web Development
            <div className="text-gradient-blue block h-20 md:h-24 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentText}
                  initial={{ 
                    opacity: 0, 
                    rotateX: -90,
                    scale: 0.8
                  }}
                  animate={{ 
                    opacity: 1, 
                    rotateX: 0,
                    scale: 1
                  }}
                  exit={{ 
                    opacity: 0, 
                    rotateX: 90,
                    scale: 0.8
                  }}
                  transition={{ 
                    duration: 0.6,
                    ease: "easeInOut"
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center"
                  }}
                >
                  {texts[currentText]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Transform your ideas into stunning websites with our rapid development process. 
            Professional web solutions delivered faster than ever before.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Button 
              size="lg" 
              className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-lg px-8 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#8B5CF6]/25 group"
              onClick={() => navigate('/marketplace')}
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6] transition-all duration-300 hover:scale-105"
            >
              View Portfolio
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
