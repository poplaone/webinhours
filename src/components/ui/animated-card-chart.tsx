"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// --- Card Components ---

interface CardProps extends React.HTMLAttributes<HTMLDivElement> { }

export function AnimatedCard({ className, ...props }: CardProps) {
  return (
    <div
      role="region"
      aria-labelledby="card-title"
      aria-describedby="card-description"
      className={cn(
        "group/animated-card relative w-full overflow-hidden rounded-xl bg-transparent",
        className
      )}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: CardProps) {
  return (
    <div
      role="group"
      className={cn(
        "flex flex-col space-y-1.5 p-4 bg-transparent",
        className
      )}
      {...props}
    />
  );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> { }

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  );
}

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> { }

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn(
        "text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export function CardVisual({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("h-[250px] sm:h-[300px] lg:h-[350px] w-full overflow-hidden", className)}
      {...props}
    />
  );
}

// --- Visual3 Component and its Sub-components ---

interface Visual3Props {
  mainColor?: string;
  secondaryColor?: string;
  gridColor?: string;
}

export function Visual3({
  mainColor = "hsl(var(--primary))",
  secondaryColor = "hsl(var(--accent))",
  gridColor = "#80808015",
}: Visual3Props) {
  const [animated, setAnimated] = useState(false);

  React.useEffect(() => {
    // Auto-animate after component mounts
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-[250px] sm:h-[300px] lg:h-[350px] w-full overflow-hidden bg-transparent">
      <Layer4
        color={mainColor}
        secondaryColor={secondaryColor}
        hovered={animated}
      />
      <Layer3 color={mainColor} animated={animated} />
      <Layer2 color={mainColor} animated={animated} />
      <Layer1 color={mainColor} secondaryColor={secondaryColor} animated={animated} />
      <EllipseGradient color={mainColor} />
      <GridLayer color={gridColor} />
    </div>
  );
}

interface LayerProps {
  color: string;
  secondaryColor?: string;
  hovered?: boolean;
  animated?: boolean;
}

const GridLayer: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div
      style={{ "--grid-color": color } as React.CSSProperties}
      className="pointer-events-none absolute inset-0 z-[4] h-full w-full bg-transparent bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:20px_20px] bg-center opacity-70 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"
    />
  );
};

const EllipseGradient: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div className="absolute inset-0 z-[5] flex h-full w-full items-center justify-center">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 356 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="356" height="300" fill="url(#paint0_radial_12_207)" />
        <defs>
          <radialGradient
            id="paint0_radial_12_207"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(178 150) rotate(90) scale(150 178)"
          >
            <stop stopColor={color} stopOpacity="0.15" />
            <stop offset="0.34" stopColor={color} stopOpacity="0.08" />
            <stop offset="1" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

const Layer1: React.FC<LayerProps> = ({ color, secondaryColor, animated }) => {
  return (
    <div
      className="absolute top-4 left-4 z-[8] flex items-center gap-1"
      style={
        {
          "--color": color,
          "--secondary-color": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className={cn(
        "flex shrink-0 items-center rounded-full border border-border bg-background/25 px-1.5 py-0.5 backdrop-blur-sm transition-opacity duration-300 ease-in-out",
        animated && "opacity-0"
      )}>
        <div className="h-1.5 w-1.5 rounded-full bg-[var(--color)]" />
        <span className="ml-1 text-[10px] text-foreground">
          +45%
        </span>
      </div>
      <div className={cn(
        "flex shrink-0 items-center rounded-full border border-border bg-background/25 px-1.5 py-0.5 backdrop-blur-sm transition-opacity duration-300 ease-in-out",
        animated && "opacity-0"
      )}>
        <div className="h-1.5 w-1.5 rounded-full bg-[var(--secondary-color)]" />
        <span className="ml-1 text-[10px] text-foreground">
          +63%
        </span>
      </div>
    </div>
  );
};

const Layer2: React.FC<LayerProps> = ({ color, animated }) => {
  return (
    <div
      className="group relative h-full w-full"
      style={{ "--color": color } as React.CSSProperties}
    >
      <div className={cn(
        "ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute inset-0 z-[7] flex w-full items-start justify-center bg-transparent p-2 sm:p-4 transition-transform duration-500",
        animated ? "translate-y-0" : "translate-y-full"
      )}>
        <div className={cn(
          "ease-[cubic-bezier(0.6, 0, 1)] rounded-md border border-border bg-background/25 p-2 sm:p-3 backdrop-blur-sm transition-opacity duration-500 w-full max-w-[280px] sm:max-w-sm",
          animated ? "opacity-100" : "opacity-0"
        )}>
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
            <div className="h-2 w-2 shrink-0 rounded-full bg-[var(--color)]" />
            <p className="text-xs sm:text-sm font-semibold text-foreground">
              Content Engagement Growth
            </p>
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed mb-1.5 sm:mb-2">
            High-impact content strategies that drive organic traffic and maximize conversion rates across all channels.
          </p>
          <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-4 border-t border-border/50 pt-1.5 sm:pt-2 mt-1.5 sm:mt-2">
            <div className="flex flex-col">
              <span className="text-[9px] sm:text-xs text-muted-foreground">Avg Monthly</span>
              <span className="text-xs sm:text-sm font-bold text-foreground">+54%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] sm:text-xs text-muted-foreground">Peak Growth</span>
              <span className="text-xs sm:text-sm font-bold text-foreground">+63%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] sm:text-xs text-muted-foreground">6 Months</span>
              <span className="text-xs sm:text-sm font-bold text-foreground">+180%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Layer3: React.FC<LayerProps> = ({ color, animated }) => {
  return (
    <div className={cn(
      "ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute inset-0 z-[6] flex items-center justify-center transition-all duration-500",
      animated ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
    )}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 356 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="356" height="300" fill="url(#paint0_linear_29_3)" />
        <defs>
          <linearGradient
            id="paint0_linear_29_3"
            x1="178"
            y1="0"
            x2="178"
            y2="300"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.35" stopColor={color} stopOpacity="0" />
            <stop offset="1" stopColor={color} stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const Layer4: React.FC<LayerProps> = ({ color, secondaryColor, hovered, animated }) => {
  const isAnimated = hovered || animated;
  const rectsData = [
    { width: 12, height: 15, y: 115, hoverHeight: 25, hoverY: 125, x: 25, fill: "currentColor", hoverFill: secondaryColor },
    { width: 12, height: 25, y: 105, hoverHeight: 35, hoverY: 115, x: 40, fill: color, hoverFill: color },
    { width: 12, height: 35, y: 95, hoverHeight: 45, hoverY: 105, x: 55, fill: color, hoverFill: color },
    { width: 12, height: 45, y: 85, hoverHeight: 55, hoverY: 95, x: 70, fill: color, hoverFill: color },
    { width: 12, height: 30, y: 100, hoverHeight: 35, hoverY: 115, x: 85, fill: "currentColor", hoverFill: secondaryColor },
    { width: 12, height: 25, y: 105, hoverHeight: 30, hoverY: 120, x: 100, fill: "currentColor", hoverFill: secondaryColor },
    { width: 12, height: 40, y: 90, hoverHeight: 50, hoverY: 100, x: 115, fill: color, hoverFill: color },
    { width: 12, height: 35, y: 95, hoverHeight: 45, hoverY: 105, x: 130, fill: color, hoverFill: color },
    { width: 12, height: 25, y: 105, hoverHeight: 40, hoverY: 110, x: 145, fill: "currentColor", hoverFill: secondaryColor },
    { width: 12, height: 50, y: 80, hoverHeight: 60, hoverY: 90, x: 160, fill: color, hoverFill: color },
    { width: 12, height: 30, y: 100, hoverHeight: 45, hoverY: 105, x: 175, fill: "currentColor", hoverFill: secondaryColor },
    { width: 12, height: 45, y: 85, hoverHeight: 55, hoverY: 95, x: 190, fill: color, hoverFill: color },
    { width: 12, height: 35, y: 95, hoverHeight: 50, hoverY: 100, x: 205, fill: "currentColor", hoverFill: secondaryColor },
    { width: 12, height: 55, y: 75, hoverHeight: 70, hoverY: 80, x: 220, fill: color, hoverFill: color },
    { width: 12, height: 40, y: 90, hoverHeight: 55, hoverY: 95, x: 235, fill: "currentColor", hoverFill: secondaryColor },
    { width: 12, height: 60, y: 70, hoverHeight: 75, hoverY: 75, x: 250, fill: color, hoverFill: color },
    { width: 12, height: 45, y: 85, hoverHeight: 65, hoverY: 85, x: 265, fill: "currentColor", hoverFill: secondaryColor },
    { width: 12, height: 70, y: 60, hoverHeight: 85, hoverY: 65, x: 280, fill: color, hoverFill: color },
    { width: 12, height: 50, y: 80, hoverHeight: 75, hoverY: 75, x: 295, fill: "currentColor", hoverFill: secondaryColor },
    { width: 12, height: 80, y: 50, hoverHeight: 95, hoverY: 55, x: 310, fill: color, hoverFill: color },
    { width: 12, height: 65, y: 65, hoverHeight: 85, hoverY: 65, x: 325, fill: "currentColor", hoverFill: secondaryColor },
  ];

  return (
    <div className={cn(
      "ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute inset-0 z-[8] flex h-full w-full items-center justify-center text-muted/10 transition-transform duration-500",
      isAnimated && "scale-150"
    )}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 356 300" preserveAspectRatio="xMidYMid meet" className="scale-110">
        {rectsData.map((rect, index) => (
          <rect
            key={index}
            width={rect.width}
            height={isAnimated ? rect.hoverHeight : rect.height}
            x={rect.x}
            y={isAnimated ? rect.hoverY + 100 : rect.y + 100}
            fill={isAnimated ? rect.hoverFill : rect.fill}
            rx="2"
            ry="2"
            className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] transition-all duration-500"
          />
        ))}
      </svg>
    </div>
  );
};
