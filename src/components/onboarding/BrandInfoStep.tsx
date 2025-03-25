
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BrandInfoStep: React.FC = () => {
  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');

  const industries = [
    "Technology",
    "Consumer Goods",
    "Food & Beverage",
    "Healthcare",
    "Fashion & Apparel",
    "Home & Garden",
    "Beauty & Cosmetics",
    "Automotive",
    "Toys & Games",
    "Electronics",
    "Other"
  ];

  const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees"
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-display font-semibold mb-2">
          Tell us about your brand
        </h1>
        <p className="text-gray-600">
          This helps us customize your product development workflow.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-4"
      >
        <div className="space-y-2">
          <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">
            Brand Name
          </label>
          <input
            type="text"
            id="brandName"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter your brand name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
            Industry
          </label>
          <select
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="" disabled>Select your industry</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="companySize" className="block text-sm font-medium text-gray-700">
            Company Size
          </label>
          <select
            id="companySize"
            value={companySize}
            onChange={(e) => setCompanySize(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="" disabled>Select company size</option>
            {companySizes.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Brand Colors (Optional)
          </label>
          <div className="grid grid-cols-5 gap-2">
            {['#FFFFFF', '#F87171', '#60A5FA', '#34D399', '#A78BFA'].map((color) => (
              <div 
                key={color}
                className="aspect-square rounded-lg border border-gray-200 cursor-pointer relative flex items-center justify-center"
                style={{ backgroundColor: color }}
              >
                {color === '#FFFFFF' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Select your brand colors to customize your dashboard (you can change this later)
          </p>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Why we ask this</h3>
            <p className="text-xs text-blue-700 mt-1">
              Your industry and company details help us tailor our AI to generate more relevant product ideas and concepts.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BrandInfoStep;
