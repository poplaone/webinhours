import React from 'react';

export const GridPattern: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 flex items-center justify-center">
      <div className="w-full max-w-7xl px-2 sm:px-4 lg:px-0">
        <div className="grid w-full border-0 border-b md:border relative grid-cols-10 opacity-40 sm:opacity-50">
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
          
          {/* Left column */}
          <div className="md:grid hidden w-full col-span-1">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={idx}
                className="border-b border-border/30 last:border-0 flex-1 aspect-square"
              />
            ))}
          </div>
          
          {/* Center columns */}
          <div className="md:col-span-8 col-span-10">
            <div className="md:flex hidden">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="border-l border-border/30 last:border-r flex-1 aspect-square"
                />
              ))}
            </div>
            
            {/* Main grid rows */}
            {Array.from({ length: 6 }).map((_, rowIdx) => (
              <div key={rowIdx} className="flex">
                {Array.from({ length: 8 }).map((_, colIdx) => (
                  <div
                    key={colIdx}
                    className="border-l border-b border-border/30 last:border-r flex-1 aspect-square"
                  />
                ))}
              </div>
            ))}
          </div>
          
          {/* Right column */}
          <div className="md:grid hidden col-span-1">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={idx}
                className="border-b border-border/30 last:border-b-0 flex-1 aspect-square"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
