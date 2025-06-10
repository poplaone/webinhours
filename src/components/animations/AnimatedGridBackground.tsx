
import React, { useEffect, useRef } from 'react';

const AnimatedGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gridSize = 30;
      const { x: mouseX, y: mouseY } = mouseRef.current;
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
      ctx.lineWidth = 1;
      
      for (let x = 0; x <= canvas.width; x += gridSize) {
        const distance = Math.abs(x - mouseX);
        const opacity = Math.max(0.05, 0.3 - distance / 300);
        
        ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y <= canvas.height; y += gridSize) {
        const distance = Math.abs(y - mouseY);
        const opacity = Math.max(0.05, 0.3 - distance / 300);
        
        ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Draw glowing cursor effect
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 100);
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.15)');
      gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(mouseX - 100, mouseY - 100, 200, 200);
      
      animationRef.current = requestAnimationFrame(drawGrid);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    
    drawGrid();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default AnimatedGridBackground;
