import React from 'react';

interface GridBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({ className = "", children }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Grid Background Container - Fixed positioning */}
      <div className="fixed inset-0 z-[-10] pointer-events-none">

        {/* Base background */}
        <div className="absolute inset-0 bg-background" />

        {/* Subtle dots pattern - more visible */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgb(148 163 184 / 0.3) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.4
        }} />

        {/* Primary grid lines - thick and visible */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgb(148 163 184 / 0.2) 2px, transparent 2px),
            linear-gradient(to bottom, rgb(148 163 184 / 0.2) 2px, transparent 2px)
          `,
          backgroundSize: '100px 100px',
          opacity: 0.6
        }} />

        {/* Major section grid lines - stronger */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgb(148 163 184 / 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(148 163 184 / 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '500px 500px',
          opacity: 0.8
        }} />

        {/* Dark mode overrides */}
        <div className="absolute inset-0 dark:block hidden">
          {/* Dark mode dots */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgb(71 85 105 / 0.6) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            opacity: 0.5
          }} />

          {/* Dark mode primary grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgb(71 85 105 / 0.3) 2px, transparent 2px),
              linear-gradient(to bottom, rgb(71 85 105 / 0.3) 2px, transparent 2px)
            `,
            backgroundSize: '100px 100px',
            opacity: 0.7
          }} />

          {/* Dark mode major grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgb(71 85 105 / 0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(71 85 105 / 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '500px 500px',
            opacity: 0.9
          }} />
        </div>

        {/* Subtle vignette overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/20" />

      </div>

      {/* Content */}
      <div className="relative z-[1]">
        {children}
      </div>
    </div>
  );
};