
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const AIPreferencesStep: React.FC = () => {
  const [innovationLevel, setInnovationLevel] = useState(5);
  const [marketInsight, setMarketInsight] = useState(true);
  const [competitorAnalysis, setCompetitorAnalysis] = useState(true);
  const [productMockups, setProductMockups] = useState(true);
  const [sustainabilityFocus, setSustainabilityFocus] = useState(false);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-display font-semibold mb-2">
          AI Assistant preferences
        </h1>
        <p className="text-gray-600">
          Configure how the AI supports your product development process.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-5"
      >
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Innovation Level
          </label>
          <p className="text-xs text-gray-500">How radical should the AI's product suggestions be?</p>
          
          <div className="space-y-3">
            <input
              type="range"
              min="1"
              max="10"
              value={innovationLevel}
              onChange={(e) => setInnovationLevel(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-600">
              <span>Conservative</span>
              <span>Incremental</span>
              <span>Disruptive</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            AI Assistant Features
          </label>
          <p className="text-xs text-gray-500">Select which capabilities you want the AI to provide</p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">Market Trend Analysis</h3>
                  <p className="text-xs text-gray-500">AI identifies emerging market trends</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketInsight}
                  onChange={() => setMarketInsight(!marketInsight)}
                  className="sr-only peer"
                />
                <div className={cn(
                  "w-11 h-6 rounded-full peer transition-all",
                  "after:content-[''] after:absolute after:top-[2px] after:left-[2px]",
                  "after:bg-white after:rounded-full after:h-5 after:w-5",
                  "after:transition-all peer-checked:after:translate-x-full",
                  marketInsight ? "bg-blue-500" : "bg-gray-200"
                )}></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">Competitor Analysis</h3>
                  <p className="text-xs text-gray-500">AI monitors competitor products</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={competitorAnalysis}
                  onChange={() => setCompetitorAnalysis(!competitorAnalysis)}
                  className="sr-only peer"
                />
                <div className={cn(
                  "w-11 h-6 rounded-full peer transition-all",
                  "after:content-[''] after:absolute after:top-[2px] after:left-[2px]",
                  "after:bg-white after:rounded-full after:h-5 after:w-5",
                  "after:transition-all peer-checked:after:translate-x-full",
                  competitorAnalysis ? "bg-blue-500" : "bg-gray-200"
                )}></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">Product Mockups</h3>
                  <p className="text-xs text-gray-500">AI generates visual product concepts</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={productMockups}
                  onChange={() => setProductMockups(!productMockups)}
                  className="sr-only peer"
                />
                <div className={cn(
                  "w-11 h-6 rounded-full peer transition-all",
                  "after:content-[''] after:absolute after:top-[2px] after:left-[2px]",
                  "after:bg-white after:rounded-full after:h-5 after:w-5",
                  "after:transition-all peer-checked:after:translate-x-full",
                  productMockups ? "bg-blue-500" : "bg-gray-200"
                )}></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">Sustainability Analysis</h3>
                  <p className="text-xs text-gray-500">AI evaluates environmental impact</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={sustainabilityFocus}
                  onChange={() => setSustainabilityFocus(!sustainabilityFocus)}
                  className="sr-only peer"
                />
                <div className={cn(
                  "w-11 h-6 rounded-full peer transition-all",
                  "after:content-[''] after:absolute after:top-[2px] after:left-[2px]",
                  "after:bg-white after:rounded-full after:h-5 after:w-5",
                  "after:transition-all peer-checked:after:translate-x-full",
                  sustainabilityFocus ? "bg-blue-500" : "bg-gray-200"
                )}></div>
              </label>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-blue-50 p-4 rounded-xl border border-blue-100"
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Privacy note</h3>
            <p className="text-xs text-blue-700 mt-1">
              All preferences can be modified later. Your product data is kept confidential and never used to train our models.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIPreferencesStep;
