
import React, { ReactNode, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import StepIndicator from './StepIndicator';

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
      <div className="hidden md:flex md:w-1/3 lg:w-1/4 bg-gradient-to-b from-blue-600 to-blue-700 text-white">
        <div className="p-8 flex flex-col justify-between w-full">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-display text-2xl font-semibold mb-1"
            >
              NPD Platform
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-blue-100 mb-12"
            >
              AI-Powered Product Development
            </motion.div>

            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} vertical />
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-sm text-blue-100 mt-4"
          >
            <p className="mb-4">Streamline your product development process from ideation to market with our AI-powered platform.</p>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Intelligent product ideation</span>
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Streamlined concept testing</span>
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>End-to-end development lifecycle</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile step indicator - only visible on small screens */}
      <div className="flex flex-col p-4 md:hidden bg-card">
        <div className="font-display text-xl font-semibold mb-1">NPD Platform</div>
        <div className="text-sm text-muted-foreground mb-4">AI-Powered Product Development</div>
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      {/* Main content area */}
      <div className={cn(
        "flex-1 px-6 py-8 md:p-12 flex flex-col justify-center bg-grid",
        "relative overflow-hidden transition-all duration-500"
      )}>
        <motion.div
          className="absolute inset-0 bg-blue-500/10 rounded-none md:rounded-tl-[3rem] md:rounded-bl-[3rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
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
                    "btn-shine px-5 py-2 rounded-lg bg-blue-600 text-white shadow-sm",
                    "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400/50",
                    "transition-all duration-300 ease-in-out"
                  )}
                >
                  {isLastStep ? "Get Started" : "Continue"}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="text-center text-sm text-muted-foreground mt-6">
            Already have an account? <a href="#" className="text-blue-400 hover:text-blue-300 hover:underline">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
