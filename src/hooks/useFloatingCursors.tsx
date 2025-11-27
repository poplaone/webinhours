import { useEffect, useRef } from 'react';

export const useFloatingCursors = () => {
  const cursorsRef = useRef<Map<string, HTMLElement>>(new Map());
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const cursors = [
      { id: 'jessica', image: '/assets/cursor-jessica.png', width: '82.5px' },
      { id: 'mario', image: '/assets/cursor-mario.png', width: '69.5px' }
    ];

    // Create cursor elements
    cursors.forEach(({ id, image, width }) => {
      const cursor = document.createElement('div');
      cursor.id = `floating-cursor-${id}`;
      cursor.style.cssText = `
        position: absolute;
        width: ${width};
        height: auto;
        pointer-events: none;
        z-index: 100;
        background-image: url(${image});
        background-size: contain;
        background-repeat: no-repeat;
        aspect-ratio: 1;
        transition: none;
        will-change: transform;
      `;
      
      const heroSection = document.querySelector('.relume-hero-section');
      if (heroSection) {
        heroSection.appendChild(cursor);
        cursorsRef.current.set(id, cursor);
      }
    });

    let startTime = Date.now();

    const positionCursors = () => {
      const heroSection = document.querySelector('.relume-hero-section');
      if (!heroSection) return;

      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) / 1000; // in seconds

      // Position Jessica cursor near the "Choose Your Free Website" button
      const jessicaCursor = cursorsRef.current.get('jessica');
      const ctaButton = heroSection.querySelector('button[class*="bg-primary"]') as HTMLElement;
      if (jessicaCursor && ctaButton) {
        const buttonRect = ctaButton.getBoundingClientRect();
        const heroRect = heroSection.getBoundingClientRect();
        
        // Position to the left side of the button with subtle float animation
        const baseX = buttonRect.left - heroRect.left - 100;
        const baseY = buttonRect.top - heroRect.top + buttonRect.height / 2 - 40;
        
        // Add subtle floating animation
        const floatX = Math.sin(elapsed * 0.8) * 8;
        const floatY = Math.cos(elapsed * 0.6) * 10;
        
        jessicaCursor.style.transform = `translate3d(${baseX + floatX}px, ${baseY + floatY}px, 0)`;
      }

      // Position Mario cursor near the typewriter text at top
      const marioCursor = cursorsRef.current.get('mario');
      const typewriterSection = heroSection.querySelector('.group.rounded-full') as HTMLElement;
      if (marioCursor && typewriterSection) {
        const typeRect = typewriterSection.getBoundingClientRect();
        const heroRect = heroSection.getBoundingClientRect();
        
        // Position to the right side of the typewriter with subtle float animation
        const baseX = typeRect.right - heroRect.left + 20;
        const baseY = typeRect.top - heroRect.top + typeRect.height / 2 - 30;
        
        // Add subtle floating animation (different phase from Jessica)
        const floatX = Math.sin(elapsed * 0.7 + 1) * 10;
        const floatY = Math.cos(elapsed * 0.5 + 1) * 8;
        
        marioCursor.style.transform = `translate3d(${baseX + floatX}px, ${baseY + floatY}px, 0)`;
      }
    };

    const animate = () => {
      positionCursors();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Initial positioning after a short delay to ensure DOM is ready
    setTimeout(positionCursors, 100);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      cursorsRef.current.forEach(cursor => cursor.remove());
      cursorsRef.current.clear();
    };
  }, []);
};
