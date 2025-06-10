
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import PixelCanvas from './PixelCanvas';

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
      className="relative overflow-hidden h-full hover:shadow-lg transition-all duration-500 border-border/40 bg-card/50 backdrop-blur group"
      style={{ '--active-color': activeColor } as React.CSSProperties}
    >
      <div className="absolute inset-0">
        <PixelCanvas 
          colors={colors}
          gap={6}
          speed={25 + index * 10}
        />
      </div>
      
      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/30 to-background/70 transition-opacity duration-700 group-hover:opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div 
          className="absolute inset-0 blur-xl"
          style={{ 
            background: `radial-gradient(circle at center, ${activeColor}20, transparent 70%)` 
          }}
        />
      </div>
      
      <CardContent className="relative z-10 p-6 text-center h-full flex flex-col justify-center">
        <div className="mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
          <Icon 
            className="h-12 w-12 mx-auto transition-all duration-300 group-hover:drop-shadow-lg"
            style={{ color: activeColor }}
          />
        </div>
        <h3 className="text-xl font-semibold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[var(--active-color)] group-hover:to-[var(--active-color)]60 group-hover:bg-clip-text transition-all duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default AnimatedServiceCard;
