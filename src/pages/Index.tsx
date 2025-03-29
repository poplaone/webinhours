
import React, { useState } from 'react';
import OnboardingLayout from '../components/onboarding/OnboardingLayout';
import WelcomeStep from '../components/onboarding/WelcomeStep';
import MarketTrendsStep from '../components/onboarding/MarketTrendsStep';
import CompleteStep from '../components/onboarding/CompleteStep';
import { AnimatePresence, motion } from 'framer-motion';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 3; // Total of 3 steps

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSkip = () => {
    // Skip to the final step
    setCurrentStep(totalSteps - 1);
    window.scrollTo(0, 0);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen"
      >
        <OnboardingLayout
          currentStep={currentStep}
          totalSteps={totalSteps}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSkip={currentStep === 1 ? handleSkip : undefined} // Only show skip on the second step
          isLastStep={currentStep === totalSteps - 1}
        >
          {currentStep === 0 && <WelcomeStep />}
          {currentStep === 1 && <MarketTrendsStep />}
          {currentStep === 2 && <CompleteStep />}
        </OnboardingLayout>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
