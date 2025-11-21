import { useEffect, useRef, useState } from 'react';

export const useHeroAnimation = () => {
  const [currentState, setCurrentState] = useState(1);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const jessicaRef = useRef<HTMLImageElement>(null);
  const marioRef = useRef<HTMLImageElement>(null);
  const leftImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const rightImagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    // Initial fade in
    setTimeout(() => {
      if (centerContentRef.current) {
        centerContentRef.current.style.opacity = '1';
        centerContentRef.current.style.transform = 'translate3d(0, 0, 0) rotateZ(0deg)';
      }

      // Show cursors
      if (jessicaRef.current) {
        jessicaRef.current.style.display = 'block';
        setTimeout(() => {
          if (jessicaRef.current) {
            jessicaRef.current.style.opacity = '1';
            jessicaRef.current.style.transform = 'translate3d(64px, 64px, 0) scale3d(1, 1, 1)';
          }
        }, 100);
      }

      if (marioRef.current) {
        marioRef.current.style.display = 'block';
        setTimeout(() => {
          if (marioRef.current) {
            marioRef.current.style.opacity = '1';
            marioRef.current.style.transform = 'translate3d(0, -64px, 0) scale3d(1, 1, 1)';
          }
        }, 200);
      }
    }, 500);

    // Start cycling through states
    const cycleInterval = setInterval(() => {
      setCurrentState(prev => (prev >= 3 ? 1 : prev + 1));
    }, 4000);

    return () => clearInterval(cycleInterval);
  }, []);

  return {
    currentState,
    refs: {
      centerContent: centerContentRef,
      heading: headingRef,
      subheading: subheadingRef,
      badge: badgeRef,
      jessica: jessicaRef,
      mario: marioRef,
      leftImages: leftImagesRef,
      rightImages: rightImagesRef,
    }
  };
};
