
import React from 'react';

interface PixelCanvasProps {
  colors?: string[];
  gap?: number;
  speed?: number;
  noFocus?: boolean;
}

const PixelCanvas: React.FC<PixelCanvasProps> = ({ 
  colors = ['#8B5CF6', '#A78BFA', '#DDD6FE'], 
  gap = 5, 
  speed = 35,
  noFocus = false 
}) => {
  return (
    <div 
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors[0]}10 0%, ${colors[1]}10 50%, ${colors[2]}10 100%)`
      }}
    />
  );
};

export default PixelCanvas;
