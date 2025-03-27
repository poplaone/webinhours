
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, RocketIcon, LightbulbIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-background to-background/80">
      {/* Left sidebar - only visible on larger screens */}
      <div className="hidden md:flex md:w-1/3 lg:w-1/4 bg-gradient-to-b from-[#8B5CF6] to-[#7C3AED] text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[10%] left-[15%] w-32 h-32 rounded-full bg-white/30 blur-xl"></div>
          <div className="absolute bottom-[30%] right-[10%] w-40 h-40 rounded-full bg-white/20 blur-xl"></div>
          <div className="absolute top-[40%] right-[20%] w-24 h-24 rounded-full bg-[#C4B5FD]/40 blur-xl"></div>
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
              className="text-[#EDE9FE] mb-4 pl-7"
            >
              AI-Powered Product Development
            </motion.div>
            
            {/* Visual illustration with animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="p-4 mb-8"
            >
              <div className="w-full h-44 bg-white/10 rounded-xl backdrop-blur-sm flex items-center justify-center overflow-hidden border border-white/20">
                <svg className="w-full h-full p-6" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Base layer */}
                  <motion.rect 
                    x="40" y="40" width="220" height="120" rx="10" 
                    fill="#C4B5FD" fillOpacity="0.3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />

                  {/* Left panel */}
                  <motion.rect 
                    x="60" y="60" width="80" height="80" rx="5" 
                    fill="#EDE9FE"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  />

                  {/* Right top panel */}
                  <motion.rect 
                    x="160" y="60" width="80" height="35" rx="5" 
                    fill="#EDE9FE"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  />

                  {/* Right bottom panel */}
                  <motion.rect 
                    x="160" y="105" width="80" height="35" rx="5" 
                    fill="#EDE9FE"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  />

                  {/* Left panel check circle with animated check */}
                  <motion.circle 
                    cx="100" cy="80" r="10" 
                    fill="#8B5CF6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.1 }}
                  />
                  <motion.path 
                    d="M95 80L100 85L105 75" 
                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                  />

                  {/* Right top button with animated plus */}
                  <motion.circle 
                    cx="200" cy="77" r="8" 
                    fill="#8B5CF6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.2 }}
                  />
                  <motion.path 
                    d="M197 77L203 77" 
                    stroke="white" strokeWidth="2" strokeLinecap="round"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3, delay: 1.5 }}
                  />
                  <motion.path 
                    d="M200 74L200 80" 
                    stroke="white" strokeWidth="2" strokeLinecap="round"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.3, delay: 1.5 }}
                  />

                  {/* Right bottom button with animated minus */}
                  <motion.circle 
                    cx="200" cy="123" r="8" 
                    fill="#8B5CF6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.3 }}
                  />
                  <motion.path 
                    d="M195 123L205 123" 
                    stroke="white" strokeWidth="2" strokeLinecap="round"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3, delay: 1.6 }}
                  />

                  {/* Animated lines in the left panel */}
                  <motion.path 
                    d="M80 110H120" 
                    stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 1.7 }}
                  />
                  <motion.path 
                    d="M80 120H110" 
                    stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 1.8 }}
                  />
                </svg>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-sm text-[#EDE9FE] mt-8 bg-white/5 rounded-2xl p-5 backdrop-blur-sm border border-white/10"
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
                <div className="w-8 h-8 rounded-full bg-[#A78BFA] border-2 border-[#8B5CF6] flex items-center justify-center text-xs font-bold">JS</div>
                <div className="w-8 h-8 rounded-full bg-[#A78BFA] border-2 border-[#8B5CF6] flex items-center justify-center text-xs font-bold">KL</div>
                <div className="w-8 h-8 rounded-full bg-[#A78BFA] border-2 border-[#8B5CF6] flex items-center justify-center text-xs font-bold">+5</div>
              </div>
              <span className="text-xs text-white/60">Trusted by teams worldwide</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 md:p-12 bg-grid relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[#8B5CF6]/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        <div className="max-w-2xl w-full z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="neo-card p-8 md:p-10 w-full text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#8B5CF6]/20 flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-[#8B5CF6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-display font-semibold mb-4">
              <span className="text-gradient-blue">AI-Powered</span> Product Development
            </h1>
            
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              Transform your product ideation and development process with our AI-powered platform. Get intelligent insights, streamline workflows, and bring innovative products to market faster.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#8B5CF6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium">Idea Generation</h3>
                <p className="text-xs text-gray-500 mt-1">AI-powered ideation tools</p>
              </div>

              <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#8B5CF6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium">Concept Creation</h3>
                <p className="text-xs text-gray-500 mt-1">Visual prototyping tools</p>
              </div>

              <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#8B5CF6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium">Concept Testing</h3>
                <p className="text-xs text-gray-500 mt-1">User feedback analysis</p>
              </div>
            </div>
            
            <Button 
              onClick={handleGetStarted}
              className="px-8 py-6 h-auto text-base bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-lg shadow-lg transition-all duration-300"
            >
              Get Started
            </Button>
          </motion.div>

          <div className="text-center text-sm text-muted-foreground mt-6">
            Already have an account? <a href="#" className="text-[#8B5CF6] hover:text-[#A78BFA] hover:underline">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
