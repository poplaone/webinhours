
import React, { useState } from 'react';
import OnboardingLayout from '../components/onboarding/OnboardingLayout';
import WelcomeStep from '../components/onboarding/WelcomeStep';
import MarketTrendsStep from '../components/onboarding/MarketTrendsStep';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 2; // Updated to 2 steps only
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // If we're on the last step, navigate to dashboard
      navigate('/dashboard');
    }
  };

  const handleSkip = () => {
    // Skip directly to dashboard
    navigate('/dashboard');
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
          showSteppers={false} // Setting showSteppers to false to hide them
        >
          {currentStep === 0 && <WelcomeStep />}
          {currentStep === 1 && <MarketTrendsStep />}
        </OnboardingLayout>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
