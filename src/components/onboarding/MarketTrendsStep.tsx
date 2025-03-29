
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, TrendingUp, Tag, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const MarketTrendsStep: React.FC = () => {
  const [selectedFocus, setSelectedFocus] = useState<'trends' | 'categories' | null>(null);
  const [selectedTrends, setSelectedTrends] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const marketTrends = [
    { id: 'sustainability', name: 'Sustainability', icon: '🍃', description: 'Eco-friendly products and practices' },
    { id: 'ai', name: 'AI & Automation', icon: '🤖', description: 'Smart technology integration' },
    { id: 'wellness', name: 'Health & Wellness', icon: '🧘', description: 'Products focusing on well-being' },
    { id: 'remote', name: 'Remote Work', icon: '🏡', description: 'Solutions for distributed teams' },
    { id: 'personalization', name: 'Personalization', icon: '👤', description: 'Customized user experiences' },
  ];
  
  const productCategories = [
    { id: 'tech', name: 'Technology', icon: '💻', description: 'Digital products and services' },
    { id: 'health', name: 'Healthcare', icon: '⚕️', description: 'Medical and wellness offerings' },
    { id: 'food', name: 'Food & Beverage', icon: '🍽️', description: 'Consumable products' },
    { id: 'home', name: 'Home & Living', icon: '🏠', description: 'Household items and decor' },
    { id: 'apparel', name: 'Apparel', icon: '👕', description: 'Clothing and accessories' },
  ];

  const toggleTrend = (trendId: string) => {
    if (selectedTrends.includes(trendId)) {
      setSelectedTrends(selectedTrends.filter(id => id !== trendId));
    } else {
      setSelectedTrends([...selectedTrends, trendId]);
    }
  };

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-display font-semibold mb-2">
          What would you like to focus on?
        </h1>
        <p className="text-gray-600 mb-6">
          This helps us tailor content to your interests. You can change this later.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            className={cn(
              "glass-card p-5 rounded-xl border-2 cursor-pointer transition-all",
              selectedFocus === 'trends' 
                ? "border-[#8B5CF6] bg-[#8B5CF6]/5" 
                : "border-transparent hover:border-[#8B5CF6]/30"
            )}
            onClick={() => setSelectedFocus('trends')}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center mr-4">
                <TrendingUp className="w-5 h-5 text-[#8B5CF6]" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Market Trends</h3>
                <p className="text-sm text-gray-500">Focus on emerging opportunities in the market</p>
              </div>
              {selectedFocus === 'trends' && (
                <div className="ml-auto bg-[#8B5CF6] rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>

          <div 
            className={cn(
              "glass-card p-5 rounded-xl border-2 cursor-pointer transition-all",
              selectedFocus === 'categories' 
                ? "border-[#8B5CF6] bg-[#8B5CF6]/5" 
                : "border-transparent hover:border-[#8B5CF6]/30"
            )}
            onClick={() => setSelectedFocus('categories')}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center mr-4">
                <Tag className="w-5 h-5 text-[#8B5CF6]" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Product Categories</h3>
                <p className="text-sm text-gray-500">Focus on specific product types and markets</p>
              </div>
              {selectedFocus === 'categories' && (
                <div className="ml-auto bg-[#8B5CF6] rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trends selection */}
        {selectedFocus === 'trends' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 space-y-3"
          >
            <h3 className="font-medium text-sm text-gray-700 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Select trends that interest you
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {marketTrends.map(trend => (
                <div 
                  key={trend.id}
                  onClick={() => toggleTrend(trend.id)}
                  className={cn(
                    "p-3 border rounded-lg flex items-center cursor-pointer transition-all",
                    selectedTrends.includes(trend.id)
                      ? "border-[#8B5CF6] bg-[#8B5CF6]/5"
                      : "border-gray-200 hover:border-[#8B5CF6]/30"
                  )}
                >
                  <div className="text-xl mr-3">{trend.icon}</div>
                  <div className="flex-grow">
                    <div className="font-medium text-sm">{trend.name}</div>
                    <div className="text-xs text-gray-500">{trend.description}</div>
                  </div>
                  {selectedTrends.includes(trend.id) && (
                    <div className="ml-auto">
                      <div className="bg-[#8B5CF6] rounded-full p-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Categories selection */}
        {selectedFocus === 'categories' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 space-y-3"
          >
            <h3 className="font-medium text-sm text-gray-700 flex items-center">
              <Tag className="w-4 h-4 mr-2" />
              Select categories that interest you
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {productCategories.map(category => (
                <div 
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={cn(
                    "p-3 border rounded-lg flex items-center cursor-pointer transition-all",
                    selectedCategories.includes(category.id)
                      ? "border-[#8B5CF6] bg-[#8B5CF6]/5"
                      : "border-gray-200 hover:border-[#8B5CF6]/30"
                  )}
                >
                  <div className="text-xl mr-3">{category.icon}</div>
                  <div className="flex-grow">
                    <div className="font-medium text-sm">{category.name}</div>
                    <div className="text-xs text-gray-500">{category.description}</div>
                  </div>
                  {selectedCategories.includes(category.id) && (
                    <div className="ml-auto">
                      <div className="bg-[#8B5CF6] rounded-full p-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-[#8B5CF6]/10 p-4 rounded-xl border border-[#8B5CF6]/20"
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-[#8B5CF6]">Personalized Experience</h3>
            <p className="text-xs text-[#8B5CF6]/80 mt-1">
              Your selection helps our AI generate more relevant product ideas and insights.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MarketTrendsStep;
