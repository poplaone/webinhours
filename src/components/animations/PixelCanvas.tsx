
import React, { useEffect, useRef } from 'react';

interface PixelCanvasProps {
  colors?: string[];
  gap?: number;
  speed?: number;
  noFocus?: boolean;
}

class Pixel {
  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;
  private x: number;
  private y: number;
  private color: string;
  private speed: number;
  private size: number = 0;
  private sizeStep: number;
  private minSize: number = 0.5;
  private maxSizeInteger: number = 2;
  private maxSize: number;
  private delay: number;
  private counter: number = 0;
  private counterStep: number;
  public isIdle: boolean = false;
  private isReverse: boolean = false;
  private isShimmer: boolean = false;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, x: number, y: number, color: string, speed: number, delay: number) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.sizeStep = Math.random() * 0.4;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
  }

  private getRandomValue(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private draw(): void {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size
    );
  }

  public appear(): void {
    this.isIdle = false;

    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }

    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }

    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }

    this.draw();
  }

  public disappear(): void {
    this.isShimmer = false;
    this.counter = 0;

    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.1;
    }

    this.draw();
  }

  private shimmer(): void {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }

    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

const PixelCanvas: React.FC<PixelCanvasProps> = ({ 
  colors = ['#8B5CF6', '#A78BFA', '#DDD6FE'], 
  gap = 5, 
  speed = 35,
  noFocus = false 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  const getDistanceToCanvasCenter = (x: number, y: number, canvas: HTMLCanvasElement): number => {
    const dx = x - canvas.width / 2;
    const dy = y - canvas.height / 2;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const createPixels = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void => {
    pixelsRef.current = [];
    const normalizedSpeed = speed * 0.001;
    
    for (let x = 0; x < canvas.width; x += gap) {
      for (let y = 0; y < canvas.height; y += gap) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = getDistanceToCanvasCenter(x, y, canvas);
        
        pixelsRef.current.push(
          new Pixel(canvas, ctx, x, y, color, normalizedSpeed, delay)
        );
      }
    }
  };

  const animate = (fnName: 'appear' | 'disappear'): void => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;

    animationRef.current = requestAnimationFrame(() => animate(fnName));
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < pixelsRef.current.length; i++) {
      pixelsRef.current[i][fnName]();
    }
    
    if (pixelsRef.current.every((pixel) => pixel.isIdle)) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  const handleAnimation = (name: 'appear' | 'disappear'): void => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animate(name);
  };

  const init = (): void => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !container || !ctx) return;
    
    const rect = container.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);
    
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    createPixels(canvas, ctx);
  };

  useEffect(() => {
    init();
    
    const resizeObserver = new ResizeObserver(() => init());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colors, gap, speed]);

  const handleMouseEnter = () => handleAnimation('appear');
  const handleMouseLeave = () => handleAnimation('disappear');
  const handleFocusIn = (e: React.FocusEvent) => {
    if (!noFocus && !e.currentTarget.contains(e.relatedTarget as Node)) {
      handleAnimation('appear');
    }
  };
  const handleFocusOut = (e: React.FocusEvent) => {
    if (!noFocus && !e.currentTarget.contains(e.relatedTarget as Node)) {
      handleAnimation('disappear');
    }
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={handleFocusIn}
      onBlurCapture={handleFocusOut}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default PixelCanvas;
