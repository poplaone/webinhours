import React from 'react';

interface GridBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({ className = "", children }) => {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
};