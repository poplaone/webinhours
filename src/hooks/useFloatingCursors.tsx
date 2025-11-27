import { useEffect } from 'react';

export const useFloatingCursors = () => {
  useEffect(() => {
    const cursors = [
      { id: 'jessica', image: '/assets/cursor-jessica.png', width: '82.5px' },
      { id: 'mario', image: '/assets/cursor-mario.png', width: '69.5px' }
    ];

    const cursorElements: HTMLElement[] = [];

    // Create cursor elements
    cursors.forEach(({ id, image, width }) => {
      const cursor = document.createElement('div');
      cursor.id = `floating-cursor-${id}`;
      cursor.style.cssText = `
        position: absolute;
        width: ${width};
        height: auto;
        pointer-events: none;
        z-index: 150;
        background-image: url(${image});
        background-size: contain;
        background-repeat: no-repeat;
        aspect-ratio: 1;
        will-change: transform;
        opacity: 1;
      `;
      
      const heroSection = document.querySelector('.relume-hero-section');
      if (heroSection) {
        heroSection.appendChild(cursor);
        cursorElements.push(cursor);
      }
    });

    let animationFrameId: number;
    let startTime = Date.now();

    const positionCursors = () => {
      const heroSection = document.querySelector('.relume-hero-section');
      if (!heroSection) return;

      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) / 1000;

      const heroRect = heroSection.getBoundingClientRect();

      // Position Jessica cursor near the CTA button
      const jessicaCursor = document.getElementById('floating-cursor-jessica');
      const ctaButton = heroSection.querySelector('button.bg-primary') as HTMLElement;
      
      if (jessicaCursor) {
        let baseX, baseY;
        
        if (ctaButton) {
          const buttonRect = ctaButton.getBoundingClientRect();
          baseX = buttonRect.left - heroRect.left - 110;
          baseY = buttonRect.top - heroRect.top + buttonRect.height / 2 - 35;
        } else {
          // Fallback position if button not found
          baseX = heroRect.width / 2 - 150;
          baseY = heroRect.height * 0.7;
        }
        
        const floatX = Math.sin(elapsed * 0.8) * 8;
        const floatY = Math.cos(elapsed * 0.6) * 10;
        
        jessicaCursor.style.transform = `translate3d(${baseX + floatX}px, ${baseY + floatY}px, 0)`;
      }

      // Position Mario cursor near the typewriter section
      const marioCursor = document.getElementById('floating-cursor-mario');
      const animatedShinyText = heroSection.querySelector('.group.rounded-full') as HTMLElement;
      
      if (marioCursor) {
        let baseX, baseY;
        
        if (animatedShinyText) {
          const textRect = animatedShinyText.getBoundingClientRect();
          baseX = textRect.right - heroRect.left + 25;
          baseY = textRect.top - heroRect.top + textRect.height / 2 - 30;
        } else {
          // Fallback position if text section not found
          baseX = heroRect.width / 2 + 100;
          baseY = 80;
        }
        
        const floatX = Math.sin(elapsed * 0.7 + 1) * 10;
        const floatY = Math.cos(elapsed * 0.5 + 1) * 8;
        
        marioCursor.style.transform = `translate3d(${baseX + floatX}px, ${baseY + floatY}px, 0)`;
      }
    };

    const animate = () => {
      positionCursors();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation after a delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      positionCursors();
      animationFrameId = requestAnimationFrame(animate);
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      cursorElements.forEach(cursor => cursor.remove());
    };
  }, []);
};
