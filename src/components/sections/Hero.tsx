import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, LayoutGroup, MotionConfig } from 'framer-motion';
import { ArrowRight, Star, Clock, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { TextRotate } from "@/components/ui/text-rotate";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <MotionConfig reducedMotion="never">
      <section className="py-12 sm:py-16 md:py-24 lg:py-28 px-4 sm:px-6 relative z-10 my-0">
        <div className="container mx-auto text-center">
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} className="my-[4px]">
            {/* Trust badges */}
            

            <LayoutGroup>
              <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 whitespace-pre-wrap sm:whitespace-pre leading-tight" initial={{
                opacity: 0,
                scale: 0.9
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                duration: 1,
                delay: 0.2
              }} layout>
                <motion.span className="pt-0.5 sm:pt-1 md:pt-2 text-center sm:text-left" layout transition={{
                  type: "spring",
                  damping: 30,
                  stiffness: 400
                }}>
                  Professional Websites{" "}
                </motion.span>
                <TextRotate texts={["In Hours", "Lightning Fast", "Mobile First"]} mainClassName="text-white px-3 sm:px-2 md:px-3 bg-[#8B5CF6] overflow-hidden py-1 sm:py-0.5 md:py-2 justify-center rounded-lg text-center min-w-fit" staggerFrom="last" initial={{
                  y: "100%"
                }} animate={{
                  y: 0
                }} exit={{
                  y: "-120%"
                }} staggerDuration={0.025} splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1" transition={{
                  type: "spring",
                  damping: 30,
                  stiffness: 400
                }} rotationInterval={2000} />
              </motion.h1>
            </LayoutGroup>
            
            <motion.p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-4xl mx-auto px-2 sm:px-0 leading-relaxed" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 0.7
            }}>
              Skip the 6-week wait.
              Get an <span className="text-[#8B5CF6] font-semibold">AI-powered</span> stunning, mobile-responsive website delivered in just <span className="text-[#8B5CF6] font-semibold">24 hours</span>.
            </motion.p>

            {/* Value propositions */}
            
            <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 0.9
            }}>
              <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-lg px-8 py-3 sm:py-2 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#8B5CF6]/25 group w-full sm:w-auto min-h-[48px] touch-manipulation" onClick={() => navigate('/marketplace')}>
                Get Your Website in 24hrs
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 sm:py-2 hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6] transition-all duration-300 hover:scale-105 w-full sm:w-auto min-h-[48px] touch-manipulation" onClick={() => navigate('/contact')}>
                Free Consultation
              </Button>
            </motion.div>

            {/* Social proof */}
            
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
};