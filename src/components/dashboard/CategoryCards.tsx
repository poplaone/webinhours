
import React from 'react';
import { Card } from "@/components/ui/card";

interface CategoryCardsProps {
  websiteCount: number;
}

export const CategoryCards = ({
  websiteCount
}: CategoryCardsProps) => {
  return (
    <Card className="p-3 md:p-4 lg:p-5 xl:p-6 border border-border/40 bg-card/50 backdrop-blur">
      <div className="space-y-3 lg:space-y-4 xl:space-y-5">
        <div className="p-3 lg:p-4 xl:p-5 bg-background rounded-lg border border-border/60">
          <div className="flex justify-between items-center mb-2 lg:mb-3">
            <h3 className="font-medium text-sm md:text-base lg:text-lg">Ready-to-Use Templates</h3>
            <span className="text-xs lg:text-sm font-medium px-2 lg:px-3 py-1 lg:py-1.5 rounded-full bg-[#8B5CF6] text-white">
              {websiteCount}+ Available
            </span>
          </div>
          <p className="text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed">
            Pre-built websites ready for immediate deployment and customization with modern design patterns
          </p>
        </div>
        
        <div className="p-3 lg:p-4 xl:p-5 bg-background rounded-lg border border-border/60">
          <div className="flex justify-between items-center mb-2 lg:mb-3">
            <h3 className="font-medium text-sm md:text-base lg:text-lg">Custom Development</h3>
            <span className="text-xs lg:text-sm font-medium px-2 lg:px-3 py-1 lg:py-1.5 rounded-full bg-emerald-500 text-white">
              24-48h Delivery
            </span>
          </div>
          <p className="text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed">
            Bespoke websites built according to your specific requirements with professional development standards
          </p>
        </div>
        
        <div className="p-3 lg:p-4 xl:p-5 bg-background rounded-lg border border-border/60">
          <div className="flex justify-between items-center mb-2 lg:mb-3">
            <h3 className="font-medium text-sm md:text-base lg:text-lg">Premium Support</h3>
            <span className="text-xs lg:text-sm font-medium px-2 lg:px-3 py-1 lg:py-1.5 rounded-full bg-amber-500 text-white">
              Included
            </span>
          </div>
          <p className="text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed">
            30-day support and customization assistance with every purchase, including deployment guidance
          </p>
        </div>
      </div>
    </Card>
  );
};
