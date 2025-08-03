
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface AnimatedServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  activeColor?: string;
  colors?: string[];
}

const AnimatedServiceCard: React.FC<AnimatedServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  index,
  activeColor = '#8B5CF6',
  colors = ['#8B5CF6', '#A78BFA', '#DDD6FE']
}) => {
  return (
    <Card 
      className="relative overflow-hidden h-full hover:shadow-lg transition-all duration-300 border-border/40 bg-card/50 backdrop-blur group"
      style={{ '--active-color': activeColor } as React.CSSProperties}
    >
      <CardContent className="relative z-10 p-6 text-center h-full flex flex-col justify-center">
        <div className="mb-4">
          <Icon 
            className="h-12 w-12 mx-auto"
            style={{ color: activeColor }}
          />
        </div>
        <h3 className="text-xl font-semibold mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default AnimatedServiceCard;
