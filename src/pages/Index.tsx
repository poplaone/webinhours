
import React, { useState } from 'react';
import OnboardingLayout from '../components/onboarding/OnboardingLayout';
import WelcomeStep from '../components/onboarding/WelcomeStep';
import BrandInfoStep from '../components/onboarding/BrandInfoStep';
import CompleteStep from '../components/onboarding/CompleteStep';
import { AnimatePresence, motion } from 'framer-motion';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 3; // Reduced from 5 to 3 steps

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
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
          isLastStep={currentStep === totalSteps - 1}
        >
          {currentStep === 0 && <WelcomeStep />}
          {currentStep === 1 && <BrandInfoStep />}
          {currentStep === 2 && <CompleteStep />}
        </OnboardingLayout>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
