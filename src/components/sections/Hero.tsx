
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, LayoutGroup } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { TextRotate } from "@/components/ui/text-rotate";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <LayoutGroup>
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 flex items-center justify-center whitespace-pre"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              layout
            >
              <motion.span
                className="pt-0.5 sm:pt-1 md:pt-2"
                layout
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              >
                Web Development{" "}
              </motion.span>
              <TextRotate
                texts={["In Hours", "Not Weeks", "work!", "fancy ✽", "right", "fast", "fun", "rock"]}
                mainClassName="text-white px-2 sm:px-2 md:px-3 bg-[#8B5CF6] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </motion.h1>
          </LayoutGroup>
          
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
