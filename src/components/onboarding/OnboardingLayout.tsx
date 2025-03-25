
import React, { ReactNode, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import StepIndicator from './StepIndicator';
import { Sparkles, RocketIcon, LightbulbIcon } from 'lucide-react';

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onPrevious?: () => void;
  isLastStep?: boolean;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  isLastStep = false,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-background to-background/80">
      {/* Left sidebar - only visible on larger screens */}
      <div className="hidden md:flex md:w-1/3 lg:w-1/4 bg-gradient-to-b from-[#6353E6] to-[#5447D3] text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[10%] left-[15%] w-32 h-32 rounded-full bg-white/30 blur-xl"></div>
          <div className="absolute bottom-[30%] right-[10%] w-40 h-40 rounded-full bg-white/20 blur-xl"></div>
          <div className="absolute top-[40%] right-[20%] w-24 h-24 rounded-full bg-[#8575FF]/40 blur-xl"></div>
        </div>
        
        <div className="p-8 flex flex-col justify-between w-full z-10 relative">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-display text-2xl font-semibold mb-1 flex items-center"
            >
              <Sparkles className="mr-2 h-5 w-5" /> NPD Platform
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-[#C3BCFF] mb-12 pl-7"
            >
              AI-Powered Product Development
            </motion.div>
            
            {/* Step indicators moved to right side */}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-sm text-[#C3BCFF] mt-8 bg-white/5 rounded-2xl p-5 backdrop-blur-sm border border-white/10"
          >
            <p className="mb-4 text-white/90 font-medium">Streamline your product development process from ideation to market with our AI-powered platform.</p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shadow-lg">
                  <LightbulbIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/80">Intelligent product ideation</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white/80">Streamlined concept testing</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shadow-lg">
                  <RocketIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/80">End-to-end development lifecycle</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#8575FF] border-2 border-[#6353E6] flex items-center justify-center text-xs font-bold">JS</div>
                <div className="w-8 h-8 rounded-full bg-[#8575FF] border-2 border-[#6353E6] flex items-center justify-center text-xs font-bold">KL</div>
                <div className="w-8 h-8 rounded-full bg-[#8575FF] border-2 border-[#6353E6] flex items-center justify-center text-xs font-bold">+5</div>
              </div>
              <span className="text-xs text-white/60">Trusted by teams worldwide</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile step indicator - only visible on small screens */}
      <div className="flex flex-col p-4 md:hidden bg-card">
        <div className="font-display text-xl font-semibold mb-1 flex items-center">
          <Sparkles className="mr-2 h-4 w-4" /> NPD Platform
        </div>
        <div className="text-sm text-muted-foreground mb-4">AI-Powered Product Development</div>
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      {/* Main content area */}
      <div className={cn(
        "flex-1 px-6 py-8 md:p-12 bg-grid",
        "relative overflow-hidden transition-all duration-500"
      )}>
        <motion.div
          className="absolute inset-0 bg-[#6353E6]/10 rounded-none md:rounded-tl-[3rem] md:rounded-bl-[3rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Step indicators on the right side - desktop only */}
        <div className="hidden md:block absolute right-8 top-12 z-20">
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} vertical />
        </div>
        
        <div className="max-w-2xl mx-auto w-full z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="neo-card p-8 md:p-10 w-full"
            >
              {children}

              <div className="flex justify-between mt-8 pt-6 border-t border-border/30">
                <button
                  onClick={onPrevious}
                  className={cn(
                    "px-5 py-2 rounded-lg text-muted-foreground transition-all",
                    "hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/30",
                    currentStep === 0 ? "opacity-0 pointer-events-none" : ""
                  )}
                >
                  Back
                </button>
                
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={onNext}
                  className={cn(
                    "btn-shine px-5 py-2 rounded-lg bg-[#6353E6] text-white shadow-sm",
                    "hover:bg-[#5447D3] focus:outline-none focus:ring-2 focus:ring-[#6353E6]/50",
                    "transition-all duration-300 ease-in-out"
                  )}
                >
                  {isLastStep ? "Get Started" : "Continue"}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="text-center text-sm text-muted-foreground mt-6">
            Already have an account? <a href="#" className="text-[#6353E6] hover:text-[#8575FF] hover:underline">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
