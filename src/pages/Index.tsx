
import React, { useState } from 'react';
import OnboardingLayout from '../components/onboarding/OnboardingLayout';
import WelcomeStep from '../components/onboarding/WelcomeStep';
import BrandInfoStep from '../components/onboarding/BrandInfoStep';
import ProductFocusStep from '../components/onboarding/ProductFocusStep';
import AIPreferencesStep from '../components/onboarding/AIPreferencesStep';
import CompleteStep from '../components/onboarding/CompleteStep';
import { AnimatePresence, motion } from 'framer-motion';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5;

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
          {currentStep === 2 && <ProductFocusStep />}
          {currentStep === 3 && <AIPreferencesStep />}
          {currentStep === 4 && <CompleteStep />}
        </OnboardingLayout>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
