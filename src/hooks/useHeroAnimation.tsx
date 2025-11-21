import { useEffect, useRef, useState } from 'react';

export const useHeroAnimation = () => {
  const [rotation, setRotation] = useState(0);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const jessicaRef = useRef<HTMLImageElement>(null);
  const cardElementsRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    // Initial fade in animation
    setTimeout(() => {
      if (centerContentRef.current) {
        centerContentRef.current.style.opacity = '1';
        centerContentRef.current.style.transform = 'translate3d(0, 0, 0)';
      }

      // Position cards in semicircle and show initial 3
      positionCardsInSemicircle(0);

      // Animate Jessica cursor
      if (jessicaRef.current) {
        jessicaRef.current.style.display = 'block';
        setTimeout(() => {
          if (jessicaRef.current) {
            jessicaRef.current.style.opacity = '1';
          }
        }, 100);
      }
    }, 300);

    // Start rotating cards like a clock
    const rotationInterval = setInterval(() => {
      setRotation(prev => {
        const newRotation = prev + 60; // Move by 60 degrees (one card position)
        positionCardsInSemicircle(newRotation);
        return newRotation;
      });
    }, 3000);

    return () => clearInterval(rotationInterval);
  }, []);

  const positionCardsInSemicircle = (rotationOffset: number) => {
    const radius = 250; // Radius of the semicircle
    const totalCards = 6;
    const angleStep = 180 / (totalCards - 1); // Spread cards across 180 degrees (semicircle)

    cardElementsRef.current.forEach((card, index) => {
      if (!card) return;

      // Calculate angle for this card (including rotation offset)
      const angle = (index * angleStep + rotationOffset) % 360;
      
      // Convert to radians
      const radian = (angle - 90) * (Math.PI / 180);
      
      // Calculate position
      const x = radius * Math.cos(radian);
      const y = radius * Math.sin(radian);

      // Determine if card should be visible (only show 3 cards at a time)
      // Show cards between -90 and 90 degrees (front-facing semicircle)
      const normalizedAngle = ((angle - 90 + 360) % 360);
      const isVisible = normalizedAngle >= 0 && normalizedAngle <= 180;
      
      // Calculate opacity based on position (center card is most visible)
      let opacity = 0;
      if (isVisible) {
        const distanceFromCenter = Math.abs(90 - normalizedAngle);
        opacity = Math.max(0, 1 - (distanceFromCenter / 90));
      }

      // Calculate scale (center cards are larger)
      const scale = isVisible ? 0.7 + (opacity * 0.3) : 0.5;

      // Apply transform
      card.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      card.style.opacity = `${opacity}`;
      card.style.zIndex = `${Math.floor(opacity * 10)}`;
    });
  };

  return {
    rotation,
    refs: {
      centerContent: centerContentRef,
      heading: headingRef,
      subheading: subheadingRef,
      badge: badgeRef,
      jessica: jessicaRef,
      cardElements: cardElementsRef,
    }
  };
};
