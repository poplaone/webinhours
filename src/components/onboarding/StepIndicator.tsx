
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  vertical?: boolean;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  vertical = false
}) => {
  return (
    <div className={cn(
      vertical ? "flex-col space-y-8" : "flex-row justify-between space-x-2",
      "flex items-center"
    )}>
      {Array.from({ length: totalSteps }, (_, i) => (
        <div 
          key={i} 
          className={cn(
            vertical ? "flex items-center" : "",
            "relative"
          )}
        >
          <div className={cn(
            "transition-all duration-300",
            vertical ? "mr-4" : ""
          )}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * i, duration: 0.3 }}
              className={cn(
                "rounded-full flex items-center justify-center transition-all",
                i <= currentStep
                  ? "bg-blue-500 text-white border-2 border-blue-500"
                  : "bg-white text-gray-400 border-2 border-gray-200",
                vertical ? "w-8 h-8" : "w-6 h-6 md:w-8 md:h-8"
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
          </div>
          
          {vertical && (
            <div className={cn(
              "text-sm transition-all",
              i === currentStep ? "text-white font-medium" : "text-blue-100 font-normal"
            )}>
              {i === 0 && "Welcome"}
              {i === 1 && "Brand Info"}
              {i === 2 && "Product Focus"}
              {i === 3 && "AI Preferences"}
              {i === 4 && "Complete"}
            </div>
          )}
          
          {i < totalSteps - 1 && !vertical && (
            <div 
              className={cn(
                "absolute top-1/2 left-full transform -translate-y-1/2 h-[2px] transition-all duration-300",
                i < currentStep ? "bg-blue-500" : "bg-gray-200",
                "w-[calc(100%-1.5rem)]"
              )} 
            />
          )}
          
          {i < totalSteps - 1 && vertical && (
            <div 
              className={cn(
                "absolute top-full left-1/2 transform -translate-x-1/2 w-[2px] h-8 transition-all duration-300",
                i < currentStep ? "bg-blue-500" : "bg-blue-400/30"
              )} 
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
