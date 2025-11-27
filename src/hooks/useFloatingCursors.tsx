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
      { id: 'jessica', image: '/assets/cursor-jessica.png', speed: 0.015, roamDuration: 12000 },
      { id: 'mario', image: '/assets/cursor-mario.png', speed: 0.012, roamDuration: 15000 }
    ];

    const cursorStates = new Map<string, {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      velocityX: number;
      velocityY: number;
      isRoaming: boolean;
      lastTargetChange: number;
      targetLink: HTMLElement | null;
      pauseUntil: number;
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
        will-change: transform;
      `;
      
      const heroSection = document.querySelector('.relume-hero-section');
      if (heroSection) {
        heroSection.appendChild(cursor);
        cursorsRef.current.set(id, cursor);
        
        // Initialize starting position in center-ish area
        const rect = heroSection.getBoundingClientRect();
        const startX = rect.width * (0.3 + Math.random() * 0.4);
        const startY = rect.height * (0.3 + Math.random() * 0.4);
        
        cursorStates.set(id, {
          x: startX,
          y: startY,
          targetX: startX,
          targetY: startY,
          velocityX: 0,
          velocityY: 0,
          isRoaming: true,
          lastTargetChange: Date.now(),
          targetLink: null,
          pauseUntil: 0
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

        // Check if paused
        if (currentTime < state.pauseUntil) {
          return;
        }

        const elapsedTime = currentTime - startTimeRef.current;

        // Switch to link-seeking mode after roaming duration
        if (elapsedTime > roamDuration && state.isRoaming && links.length > 0) {
          state.isRoaming = false;
          state.targetLink = links[Math.floor(Math.random() * links.length)];
        }

        // Update target based on mode
        if (state.isRoaming) {
          // Random roaming mode - change target less frequently for smoother motion
          if (currentTime - state.lastTargetChange > 4000 + Math.random() * 3000) {
            // Pick a new target within bounds with some margin
            const margin = 100;
            state.targetX = margin + Math.random() * (rect.width - margin * 2);
            state.targetY = margin + Math.random() * (rect.height - margin * 2);
            state.lastTargetChange = currentTime;
          }
        } else if (state.targetLink) {
          // Link-seeking mode - move towards link slowly
          const linkRect = state.targetLink.getBoundingClientRect();
          const heroRect = heroSection.getBoundingClientRect();
          state.targetX = linkRect.left - heroRect.left + linkRect.width / 2;
          state.targetY = linkRect.top - heroRect.top + linkRect.height / 2;

          // Check if reached the link
          const dx = state.targetX - state.x;
          const dy = state.targetY - state.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 50) {
            // Reached link, pause for a moment like a person would
            state.pauseUntil = currentTime + 1500 + Math.random() * 1000;
            
            // Then pick a new target
            if (Math.random() > 0.4 && links.length > 1) {
              const otherLinks = links.filter(l => l !== state.targetLink);
              state.targetLink = otherLinks[Math.floor(Math.random() * otherLinks.length)];
            } else {
              state.isRoaming = true;
              state.targetLink = null;
              state.lastTargetChange = currentTime;
            }
          }
        }

        // Calculate smooth movement with velocity for natural motion
        const dx = state.targetX - state.x;
        const dy = state.targetY - state.y;
        
        // Apply very gentle acceleration for smooth human-like movement
        state.velocityX += dx * speed;
        state.velocityY += dy * speed;
        
        // Apply damping for smooth deceleration
        state.velocityX *= 0.92;
        state.velocityY *= 0.92;
        
        // Update position
        state.x += state.velocityX;
        state.y += state.velocityY;

        // Keep within bounds
        state.x = Math.max(20, Math.min(rect.width - 100, state.x));
        state.y = Math.max(20, Math.min(rect.height - 100, state.y));

        // Apply position with smooth transform
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
