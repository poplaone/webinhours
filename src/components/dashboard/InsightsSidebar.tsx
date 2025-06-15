
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, TrendingUp, BarChart3, BookOpen, Code, DollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const InsightsSidebar = () => {
  const navigate = useNavigate();

  return (
    <Card className="border border-border/40 bg-card/50 backdrop-blur h-fit">
      <div className="p-4 lg:p-5 xl:p-6 border-b border-border/40 flex items-center gap-2">
        <Brain className="h-5 w-5 lg:h-6 lg:w-6 text-[#8B5CF6]" />
        <h3 className="font-semibold text-sm lg:text-base xl:text-lg">Marketplace Insights</h3>
      </div>
      
      <CardContent className="p-4 lg:p-5 xl:p-6">
        <div className="space-y-4 lg:space-y-5 xl:space-y-6">
          <div>
            <h4 className="text-sm lg:text-base font-medium mb-2 lg:mb-3 flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 lg:h-5 lg:w-5 text-[#8B5CF6]" />
              Popular Categories
            </h4>
            <p className="text-xs lg:text-sm xl:text-base text-muted-foreground leading-relaxed">
              E-commerce and SaaS templates are trending this month, with high demand from customers seeking modern, responsive designs.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm lg:text-base font-medium mb-2 lg:mb-3 flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4 lg:h-5 lg:w-5 text-[#8B5CF6]" />
              Best Sellers
            </h4>
            <p className="text-xs lg:text-sm xl:text-base text-muted-foreground leading-relaxed">
              Portfolio and landing page templates show consistent high demand with excellent ratings from customers and developers.
            </p>
          </div>
          
          <div className="pt-3 lg:pt-4 border-t border-border/40">
            <h4 className="text-sm lg:text-base font-medium mb-3 lg:mb-4">Featured This Week</h4>
            <ul className="space-y-3 lg:space-y-4">
              <li className="flex gap-3 items-center text-xs lg:text-sm xl:text-base">
                <span className="bg-[#8B5CF6]/10 text-[#8B5CF6] p-1.5 lg:p-2 rounded-full">
                  <Code className="h-3 w-3 lg:h-4 lg:w-4" />
                </span>
                <span>New AI-powered templates with advanced functionality</span>
              </li>
              <li className="flex gap-3 items-center text-xs lg:text-sm xl:text-base">
                <span className="bg-[#8B5CF6]/10 text-[#8B5CF6] p-1.5 lg:p-2 rounded-full">
                  <DollarSign className="h-3 w-3 lg:h-4 lg:w-4" />
                </span>
                <span>Payment integration ready templates for e-commerce</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
