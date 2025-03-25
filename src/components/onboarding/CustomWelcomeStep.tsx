
import React from 'react';
import { motion } from 'framer-motion';
import StepIndicator from './StepIndicator';

interface WelcomeStepProps {
  currentStep: number;
  totalSteps: number;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Welcome to <span className="text-[#6353E6]">NPD Platform</span>
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Let's set up your account to streamline your product development process.
        </p>
        
        {/* Step indicators placed right below the welcome text */}
        <div className="mt-6 mb-8">
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} className="max-w-md" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="space-y-4"
      >
        <p>
          Before we begin, we need to collect some information about your company and your product development needs to optimize your experience.
        </p>
        <p>
          We'll use this information to customize our AI recommendations and workflows to match your specific requirements.
        </p>
        <div className="bg-muted/50 p-4 rounded-lg border border-border mt-4">
          <p className="text-sm text-muted-foreground">
            Your information helps us personalize our AI tools to deliver more relevant suggestions and streamline your product development process.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeStep;
