import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, TrendingUp, BarChart3, BookOpen, Code, DollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
export const InsightsSidebar = () => {
  const navigate = useNavigate();
  return <Card className="border border-border/40 bg-card/50 backdrop-blur h-fit">
      <div className="p-4 border-b border-border/40 flex items-center gap-2">
        <Brain className="h-5 w-5 text-[#8B5CF6]" />
        <h3 className="font-semibold">Marketplace Insights</h3>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-[#8B5CF6]" />
              Popular Categories
            </h4>
            <p className="text-xs text-muted-foreground">E-commerce and SaaS templates are trending this month, with high demand from customers.</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4 text-[#8B5CF6]" />
              Best Sellers
            </h4>
            <p className="text-xs text-muted-foreground">Portfolio and landing page templates show consistent high demand with excellent ratings from customers.</p>
          </div>
          
          
          
          <div className="pt-2 border-t border-border/40">
            <h4 className="text-sm font-medium mb-2">Featured This Week</h4>
            <ul className="space-y-2">
              <li className="flex gap-2 items-center text-xs">
                <span className="bg-[#8B5CF6]/10 text-[#8B5CF6] p-1 rounded-full">
                  <Code className="h-3 w-3" />
                </span>
                <span>New AI-powered templates</span>
              </li>
              <li className="flex gap-2 items-center text-xs">
                <span className="bg-[#8B5CF6]/10 text-[#8B5CF6] p-1 rounded-full">
                  <DollarSign className="h-3 w-3" />
                </span>
                <span>Payment integration ready templates</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>;
};