
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  vertical?: boolean;
  className?: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  vertical = false,
  className
}) => {
  return (
    <div className={cn("flex flex-row justify-between space-x-2 items-center", className)}>
      {Array.from({ length: totalSteps }, (_, i) => (
        <div 
          key={i} 
          className="relative"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 * i, duration: 0.3 }}
            className={cn(
              "rounded-full flex items-center justify-center transition-all w-6 h-6 md:w-8 md:h-8",
              i <= currentStep
                ? "bg-[#6353E6] text-white border-2 border-[#6353E6]"
                : "bg-white text-gray-400 border-2 border-gray-200"
            )}
          >
            {i < currentStep ? (
              <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <span className="text-xs md:text-sm">{i + 1}</span>
            )}
          </motion.div>
          
          {vertical && (
            <div className={cn(
              "text-sm ml-2 transition-all",
              i === currentStep ? "text-white font-medium" : "text-[#C3BCFF] font-normal"
            )}>
              {i === 0 && "Welcome"}
              {i === 1 && "Brand Info"}
              {i === 2 && "Complete"}
            </div>
          )}
          
          {i < totalSteps - 1 && (
            <div 
              className={cn(
                "absolute top-1/2 left-full transform -translate-y-1/2 h-[2px] transition-all duration-300",
                i < currentStep ? "bg-[#6353E6]" : "bg-gray-200",
                "w-full"
              )} 
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
