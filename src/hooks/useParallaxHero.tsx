import { useEffect, useRef } from 'react';

export const useParallaxHero = () => {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const rafId = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const animate = () => {
      // Smooth interpolation
      currentX.current += (mouseX.current - currentX.current) * 0.05;
      currentY.current += (mouseY.current - currentY.current) * 0.05;

      // Get viewport center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calculate cursor offset from center
      const deltaX = (currentX.current - centerX) / centerX;
      const deltaY = (currentY.current - centerY) / centerY;

      // Apply parallax to images
      const images = document.querySelectorAll('.parallax-image');
      images.forEach((img) => {
        const depth = parseFloat((img as HTMLElement).dataset.depth || '0.2');
        const moveX = -deltaX * 60 * depth;
        const moveY = -deltaY * 60 * depth;
        (img as HTMLElement).style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });

      // Apply parallax to cursors
      const cursors = document.querySelectorAll('.parallax-cursor');
      cursors.forEach((cursor) => {
        const depth = parseFloat((cursor as HTMLElement).dataset.depth || '0.3');
        const moveX = -deltaX * 90 * depth;
        const moveY = -deltaY * 90 * depth;
        (cursor as HTMLElement).style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });

      rafId.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);
};
