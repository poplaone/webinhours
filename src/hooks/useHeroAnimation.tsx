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
    const totalCards = 6;
    const stackSpacing = 40; // Spacing between stacked cards
    const rotationSpread = 25; // Degrees of rotation spread

    cardElementsRef.current.forEach((card, index) => {
      if (!card) return;

      // Calculate position in the rotation cycle
      const position = (index - rotationOffset / 60 + totalCards) % totalCards;
      
      // Only show 3 cards (center and two on sides)
      const isVisible = position >= 1.5 && position <= 4.5;
      
      // Calculate stacked position (cards overlap in center)
      const centerOffset = position - 3; // -1.5 to 1.5 for visible cards
      const x = centerOffset * stackSpacing;
      const y = Math.abs(centerOffset) * 20; // Slight Y offset for depth
      const rotateZ = centerOffset * (rotationSpread / 2);
      
      // Calculate opacity and scale based on position
      let opacity = 0;
      let scale = 0.6;
      let zIndex = 0;
      
      if (isVisible) {
        const distanceFromCenter = Math.abs(centerOffset);
        opacity = Math.max(0, 1 - (distanceFromCenter / 2));
        scale = 0.75 + (opacity * 0.25);
        zIndex = Math.floor(opacity * 10);
      }

      // Apply transform with 3D effect
      card.style.transform = `translate3d(${x}px, ${y}px, ${-Math.abs(centerOffset) * 50}px) scale(${scale}) rotateY(${centerOffset * 5}deg) rotateZ(${rotateZ}deg)`;
      card.style.opacity = `${opacity}`;
      card.style.zIndex = `${zIndex}`;
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
