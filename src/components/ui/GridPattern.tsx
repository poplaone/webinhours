import React from 'react';

export const GridPattern: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      {/* Full-width grid container */}
      <div className="absolute inset-0 w-full h-full">
        {/* Radial gradient background */}
        <div
          className="absolute inset-0 -z-20"
          style={{
            background:
              "radial-gradient(70% 80% at 50% 100%, hsl(var(--primary) / 0.6) 0%, hsl(262 83% 58% / 0.5) 50%, hsl(var(--accent) / 0.4) 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 0%, black 20%, transparent 75%)",
            maskImage:
              "linear-gradient(to top, black 0%, black 20%, transparent 75%)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        />
        
        {/* Full-width grid with fade gradients for content areas */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            opacity: 0.5,
          }}
        >
          {/* Fade gradient overlay for content areas (where text appears) */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background: `
                radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, transparent 35%, hsl(var(--background)) 70%),
                linear-gradient(to right, hsl(var(--background)) 0%, transparent 8%, transparent 92%, hsl(var(--background)) 100%),
                linear-gradient(to bottom, transparent 0%, transparent 15%, hsl(var(--background) / 0.7) 45%, hsl(var(--background) / 0.7) 55%, transparent 85%, transparent 100%)
              `,
              WebkitMaskImage: 'none',
              maskImage: 'none',
            }}
          />
        </div>
        
        {/* Additional vertical lines on the sides for better visibility */}
        <div 
          className="absolute inset-0 w-full h-full hidden md:block"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '160px 100%',
            backgroundPosition: '0 0',
            opacity: 0.4,
          }}
        >
          {/* Fade gradient for side lines where content appears */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background: `
                radial-gradient(ellipse 55% 45% at 50% 50%, transparent 0%, transparent 30%, hsl(var(--background)) 65%),
                linear-gradient(to bottom, transparent 0%, transparent 20%, hsl(var(--background) / 0.8) 48%, hsl(var(--background) / 0.8) 52%, transparent 80%, transparent 100%)
              `,
            }}
          />
        </div>
      </div>
    </div>
  );
};
