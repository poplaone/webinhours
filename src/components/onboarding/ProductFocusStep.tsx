
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Lightbulb, BarChart3, TrendingUp, CornerUpRight, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ProductFocusStep: React.FC = () => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [targetAudience, setTargetAudience] = useState('');
  const [competitorCount, setCompetitorCount] = useState(0);
  const [showInsights, setShowInsights] = useState(false);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  const [innovationType, setInnovationType] = useState<string | null>(null);
  const { toast } = useToast();

  const goals = [
    {
      id: 'new-market',
      title: 'Enter New Market',
      description: 'Launch products into untapped markets',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      id: 'improve-existing',
      title: 'Improve Existing',
      description: 'Enhance your current product line',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    },
    {
      id: 'cost-reduction',
      title: 'Cost Reduction',
      description: 'Develop more cost-efficient products',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'sustainability',
      title: 'Sustainability',
      description: 'Create more environmentally friendly products',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'innovation',
      title: 'Breakthrough Innovation',
      description: 'Develop industry-changing products',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: 'customer-needs',
      title: 'Address Customer Needs',
      description: 'Solve specific customer pain points',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
  ];

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId) 
        : [...prev, goalId]
    );
  };

  const audiences = ["Gen Z", "Millennials", "Gen X", "Baby Boomers", "Luxury", "Budget-conscious", "Professionals", "Families"];

  // Generate insights based on user inputs
  const generateInsights = () => {
    if (selectedGoals.length === 0 && !targetAudience) {
      toast({
        title: "Missing information",
        description: "Please select at least one goal or audience to generate insights",
        variant: "destructive",
      });
      return;
    }
    
    setIsGeneratingInsights(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Determine innovation type based on selected goals
      let type = "incremental";
      
      if (selectedGoals.includes('new-market') && selectedGoals.includes('innovation')) {
        type = "disruptive";
      } else if (selectedGoals.includes('innovation')) {
        type = "radical";
      } else if (selectedGoals.includes('new-market') || selectedGoals.includes('customer-needs')) {
        type = "augmentative";
      }
      
      setInnovationType(type);
      setShowInsights(true);
      setIsGeneratingInsights(false);
      
      toast({
        title: "Insights Generated",
        description: "AI has analyzed your inputs and generated relevant insights",
      });
    }, 1500);
  };

  // Clear insights when inputs change
  useEffect(() => {
    if (showInsights) {
      setShowInsights(false);
    }
  }, [selectedGoals, targetAudience, competitorCount]);

  // Innovation type descriptions
  const innovationDescriptions = {
    incremental: {
      title: "Incremental Innovation",
      description: "Focuses on improving existing products with minor changes. Lower risk, steady returns.",
      marketImpact: "Typically maintains current market position with modest growth potential.",
      examples: "iPhone annual updates, car model refreshes, improved product formulations.",
      color: "blue"
    },
    augmentative: {
      title: "Augmentative Innovation",
      description: "Extends existing product lines into adjacent markets or new customer segments.",
      marketImpact: "Expands market reach and increases revenue streams without disrupting core business.",
      examples: "Amazon expanding from books to all retail, Netflix moving from DVD rental to streaming.",
      color: "green"
    },
    radical: {
      title: "Radical Innovation",
      description: "Breakthrough technology or approach that creates significant performance improvements.",
      marketImpact: "Creates new value within existing markets, potential for high growth and premium positioning.",
      examples: "First smartphones, OLED displays, electric vehicles, gene therapy treatments.",
      color: "purple"
    },
    disruptive: {
      title: "Disruptive Innovation",
      description: "Redefines market expectations and overthrows existing solutions with a new paradigm.",
      marketImpact: "Creates entirely new markets or radically transforms existing ones, high-risk & high-reward.",
      examples: "Personal computers, smartphones, streaming services, ride-sharing platforms.",
      color: "amber"
    }
  };

  // Get innovation color
  const getInnovationColor = (type: string) => {
    const colors = {
      incremental: "blue",
      augmentative: "green", 
      radical: "purple",
      disruptive: "amber"
    };
    return colors[type as keyof typeof colors] || "blue";
  };

  return (
    <div className="space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-display font-semibold mb-2">
          Product development focus
        </h1>
        <p className="text-gray-600">
          Help us understand your product goals and target audience.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-4"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            What are your primary product development goals?
          </label>
          <p className="text-xs text-gray-500">Select all that apply</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            {goals.map((goal) => (
              <div
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={cn(
                  "p-3 rounded-xl border cursor-pointer transition-all",
                  "hover:border-blue-300 hover:bg-blue-50/50",
                  selectedGoals.includes(goal.id) 
                    ? "bg-blue-50 border-blue-300" 
                    : "bg-white border-gray-200"
                )}
              >
                <div className="flex items-start">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center mr-3",
                    selectedGoals.includes(goal.id) ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                  )}>
                    {goal.icon}
                  </div>
                  <div>
                    <h3 className={cn(
                      "text-sm font-medium",
                      selectedGoals.includes(goal.id) ? "text-blue-700" : "text-gray-700"
                    )}>{goal.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{goal.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Who is your target audience?
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {audiences.map((audience) => (
              <button
                key={audience}
                type="button"
                onClick={() => setTargetAudience(audience)}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-full transition-all",
                  targetAudience === audience
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                )}
              >
                {audience}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            How many direct competitors do you have?
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="10"
              value={competitorCount}
              onChange={(e) => setCompetitorCount(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-700 w-8 text-center">
              {competitorCount}
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 px-1">
            <span>None</span>
            <span>Many</span>
          </div>
        </div>
        
        {/* Generate Insights Button */}
        <div className="flex justify-end">
          <Button 
            onClick={generateInsights}
            disabled={isGeneratingInsights}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isGeneratingInsights ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <BarChart3 className="mr-2 h-4 w-4" />
                Generate Market Insights
              </>
            )}
          </Button>
        </div>
      </motion.div>

      {/* AI Insights Section */}
      {showInsights && innovationType && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-4 space-y-4"
        >
          <div className="border rounded-xl overflow-hidden">
            <div className={`px-4 py-3 bg-${getInnovationColor(innovationType)}-50 border-b border-${getInnovationColor(innovationType)}-100 flex items-center`}>
              <Lightbulb className={`h-5 w-5 text-${getInnovationColor(innovationType)}-500 mr-2`} />
              <h3 className={`text-${getInnovationColor(innovationType)}-700 font-medium`}>
                AI Innovation Analysis
              </h3>
            </div>
            
            <div className="p-4 space-y-3">
              {/* Innovation Type Classification */}
              <div className="mb-3">
                <div className="flex items-center mb-1">
                  <Zap className={`h-4 w-4 text-${getInnovationColor(innovationType)}-500 mr-1.5`} />
                  <h4 className="text-sm font-medium">Innovation Classification</h4>
                </div>
                <div className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${getInnovationColor(innovationType)}-100 text-${getInnovationColor(innovationType)}-800`}>
                  {innovationDescriptions[innovationType as keyof typeof innovationDescriptions]?.title}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {innovationDescriptions[innovationType as keyof typeof innovationDescriptions]?.description}
                </p>
              </div>
              
              {/* Market Impact */}
              <div className="mb-3">
                <div className="flex items-center mb-1">
                  <TrendingUp className={`h-4 w-4 text-${getInnovationColor(innovationType)}-500 mr-1.5`} />
                  <h4 className="text-sm font-medium">Potential Market Impact</h4>
                </div>
                <p className="text-sm text-gray-600">
                  {innovationDescriptions[innovationType as keyof typeof innovationDescriptions]?.marketImpact}
                </p>
              </div>
              
              {/* Examples */}
              <div>
                <div className="flex items-center mb-1">
                  <CornerUpRight className={`h-4 w-4 text-${getInnovationColor(innovationType)}-500 mr-1.5`} />
                  <h4 className="text-sm font-medium">Similar Innovation Examples</h4>
                </div>
                <p className="text-sm text-gray-600">
                  {innovationDescriptions[innovationType as keyof typeof innovationDescriptions]?.examples}
                </p>
              </div>
              
              {/* Additional Context Based on User Selections */}
              {selectedGoals.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-start mb-1">
                    <BarChart3 className="h-4 w-4 text-gray-500 mr-1.5 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Strategic Analysis</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedGoals.includes('new-market') 
                          ? "Entering new markets requires significant customer research and competitive analysis. Consider pilot testing before full launch." 
                          : "Focusing on existing markets allows for incremental improvements with lower risk profile."}
                        {selectedGoals.includes('innovation') && " Your focus on breakthrough innovation suggests allocation of dedicated R&D resources will be critical for success."}
                        {competitorCount > 7 && " In your highly competitive market, differentiation will be essential for capturing market share."}
                        {competitorCount < 3 && " The limited competition in your space provides opportunity for establishing early market leadership."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-blue-50 p-4 rounded-xl border border-blue-100"
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Strategic insight</h3>
            <p className="text-xs text-blue-700 mt-1">
              This information helps our AI generate product concepts that are aligned with your business strategy and target market.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductFocusStep;
