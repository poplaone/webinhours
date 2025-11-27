import { useEffect, useRef } from 'react';

interface CursorConfig {
  id: string;
  image: string;
  speed: number;
  roamDuration: number;
}

export const useFloatingCursors = () => {
  const cursorsRef = useRef<Map<string, HTMLElement>>(new Map());
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const cursors: CursorConfig[] = [
      { id: 'jessica', image: '/assets/cursor-jessica.png', speed: 0.3, roamDuration: 8000 },
      { id: 'mario', image: '/assets/cursor-mario.png', speed: 0.25, roamDuration: 9000 }
    ];

    const cursorStates = new Map<string, {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      angle: number;
      isRoaming: boolean;
      lastTargetChange: number;
      targetLink: HTMLElement | null;
    }>();

    // Create cursor elements
    cursors.forEach(({ id, image }) => {
      const cursor = document.createElement('div');
      cursor.id = `floating-cursor-${id}`;
      cursor.style.cssText = `
        position: absolute;
        width: ${id === 'jessica' ? '82.5px' : '69.5px'};
        height: auto;
        pointer-events: none;
        z-index: 100;
        background-image: url(${image});
        background-size: contain;
        background-repeat: no-repeat;
        aspect-ratio: 1;
        transition: none;
      `;
      
      const heroSection = document.querySelector('.relume-hero-section');
      if (heroSection) {
        heroSection.appendChild(cursor);
        cursorsRef.current.set(id, cursor);
        
        // Initialize random starting position
        const rect = heroSection.getBoundingClientRect();
        cursorStates.set(id, {
          x: Math.random() * (rect.width - 100) + 50,
          y: Math.random() * (rect.height - 100) + 50,
          targetX: Math.random() * (rect.width - 100) + 50,
          targetY: Math.random() * (rect.height - 100) + 50,
          angle: Math.random() * Math.PI * 2,
          isRoaming: true,
          lastTargetChange: Date.now(),
          targetLink: null
        });
      }
    });

    // Get all clickable links in hero
    const getHeroLinks = () => {
      const heroSection = document.querySelector('.relume-hero-section');
      if (!heroSection) return [];
      return Array.from(heroSection.querySelectorAll('button, a')) as HTMLElement[];
    };

    const animate = () => {
      const heroSection = document.querySelector('.relume-hero-section');
      if (!heroSection) return;

      const rect = heroSection.getBoundingClientRect();
      const currentTime = Date.now();
      const links = getHeroLinks();

      cursors.forEach(({ id, speed, roamDuration }) => {
        const cursor = cursorsRef.current.get(id);
        const state = cursorStates.get(id);
        if (!cursor || !state) return;

        const elapsedTime = currentTime - startTimeRef.current;

        // Switch to link-seeking mode after roaming duration
        if (elapsedTime > roamDuration && state.isRoaming && links.length > 0) {
          state.isRoaming = false;
          // Pick a random link
          state.targetLink = links[Math.floor(Math.random() * links.length)];
        }

        // Update target based on mode
        if (state.isRoaming) {
          // Random roaming mode
          if (currentTime - state.lastTargetChange > 2000 + Math.random() * 2000) {
            state.targetX = Math.random() * (rect.width - 100) + 50;
            state.targetY = Math.random() * (rect.height - 100) + 50;
            state.lastTargetChange = currentTime;
          }
        } else if (state.targetLink) {
          // Link-seeking mode
          const linkRect = state.targetLink.getBoundingClientRect();
          const heroRect = heroSection.getBoundingClientRect();
          state.targetX = linkRect.left - heroRect.left + linkRect.width / 2;
          state.targetY = linkRect.top - heroRect.top + linkRect.height / 2;

          // Check if reached the link
          const dx = state.targetX - state.x;
          const dy = state.targetY - state.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 30) {
            // Reached link, pick a new one or go back to roaming
            if (Math.random() > 0.5 && links.length > 1) {
              const otherLinks = links.filter(l => l !== state.targetLink);
              state.targetLink = otherLinks[Math.floor(Math.random() * otherLinks.length)];
            } else {
              state.isRoaming = true;
              state.targetLink = null;
              state.lastTargetChange = currentTime;
            }
          }
        }

        // Move towards target with easing
        const dx = state.targetX - state.x;
        const dy = state.targetY - state.y;
        
        state.x += dx * speed;
        state.y += dy * speed;

        // Apply position
        cursor.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

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
