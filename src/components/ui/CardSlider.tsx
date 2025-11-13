import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Plus, Check } from 'lucide-react';

interface Card {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const defaultCards: Card[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Complete online store design",
    image: "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/fa91f7af-c0ee-487e-9b71-34905a5f7414_1600w.webp",
    alt: "E-commerce design preview"
  },
  {
    id: 2,
    title: "SaaS Dashboard",
    description: "Modern analytics interface",
    image: "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/5929dfb3-6ba0-482e-8054-7c6b716e45bc_1600w.jpg",
    alt: "SaaS dashboard design"
  },
  {
    id: 3,
    title: "Landing Pages",
    description: "High-converting designs",
    image: "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/ce6d7146-78eb-4530-bc2a-2885666e1383_1600w.webp",
    alt: "Landing page design"
  },
  {
    id: 4,
    title: "Mobile App UI",
    description: "Native & responsive experiences",
    image: "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/c75a3e33-28d5-4996-97d3-cabbf3908ede_1600w.webp",
    alt: "Mobile app design"
  },
  {
    id: 5,
    title: "Brand Identity",
    description: "Complete visual systems",
    image: "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/c4ba3f45-b7fb-47e5-a442-3c55bd9f9f1c_1600w.webp",
    alt: "Brand identity design"
  }
];

interface CardSliderProps {
  cards?: Card[];
  className?: string;
}

export const CardSlider: React.FC<CardSliderProps> = ({ 
  cards = defaultCards, 
  className = "" 
}) => {
  const [current, setCurrent] = useState(2);
  const [savedStates, setSavedStates] = useState<Record<number, boolean>>({});
  const [isVisible, setIsVisible] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  const applyPositions = () => {
    const cardElements = document.querySelectorAll('.coach-card');
    const isMobile = window.innerWidth < 768;
    const baseX = isMobile ? 20 : 72;
    const baseY = isMobile ? 5 : 14;
    const baseR = isMobile ? 2 : 5;

    cardElements.forEach((card, i) => {
      const element = card as HTMLElement;
      const offset = i - current;
      const depth = Math.abs(offset);

      if (depth > 2) {
        element.style.opacity = '0';
        element.style.pointerEvents = 'none';
        element.style.transform = 'translate3d(0,0,0) scale(0.9)';
        element.style.zIndex = '0';
        return;
      }

      const translateX = offset * baseX;
      const translateY = depth * baseY + (offset === 0 ? 0 : (isMobile ? 3 : 6));
      const rotate = offset * -baseR;
      const scale = offset === 0 ? 1 : (depth === 1 ? (isMobile ? 0.95 : 0.965) : (isMobile ? 0.9 : 0.93));

      element.style.opacity = '1';
      element.style.pointerEvents = offset === 0 ? 'auto' : 'none';
      element.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg) scale(${scale})`;
      element.style.transition = 'transform 400ms cubic-bezier(.2,.7,0,1), opacity 300ms ease';
      element.style.zIndex = String(100 - depth);
      element.style.filter = offset === 0 ? 'drop-shadow(0 15px 25px rgba(15,23,42,0.25))' : 'drop-shadow(0 8px 16px rgba(15,23,42,0.12))';
    });
  };

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + cards.length) % cards.length);
  }, [cards.length]);

  const toggleSave = (cardId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedStates(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      next();
    }
    if (isRightSwipe) {
      prev();
    }
  };

  // Auto-slide functionality
  const startAutoSlide = useCallback(() => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    
    // Only auto-slide on desktop (width >= 1024px)
    if (window.innerWidth >= 1024) {
      autoSlideRef.current = setInterval(next, 3000); // 3 seconds
    }
  }, [next]);

  const stopAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  };

  // Intersection Observer for viewport visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          startAutoSlide();
        } else {
          stopAutoSlide();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      stopAutoSlide();
    };
  }, [startAutoSlide]);

  useEffect(() => {
    applyPositions();
  }, [current]);

  useEffect(() => {
    const handleResize = () => {
      applyPositions();
      // Restart auto-slide on resize to check screen size
      if (isVisible) {
        startAutoSlide();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [current, isVisible, startAutoSlide]);

  // Stop auto-slide on user interaction
  const handleUserInteraction = () => {
    stopAutoSlide();
    // Restart after 5 seconds if still visible
    setTimeout(() => {
      if (isVisible) startAutoSlide();
    }, 5000);
  };

  return (
    <div ref={containerRef} className={`sm:px-8 sm:mt-16 max-w-5xl mt-8 sm:mt-16 mr-auto ml-auto px-4 sm:px-6 relative ${className}`}>
      <div className="h-[400px] sm:h-[520px] lg:h-[600px] relative">
        {/* Cards */}
        <div 
          className="flex absolute top-0 right-0 bottom-0 left-0 items-center justify-center" 
          id="cardStack"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {cards.map((card, index) => (
            <article 
              key={card.id}
              className="coach-card w-[280px] sm:w-[320px] lg:w-[420px] aspect-[4/5] overflow-hidden shadow-lg bg-card ring-border ring-1 rounded-xl sm:rounded-2xl absolute"
            >
              <img 
                className="w-full h-full object-cover absolute top-0 right-0 bottom-0 left-0" 
                src={card.image} 
                alt={card.alt}
                loading="lazy"
              />
              <div className="absolute top-4 right-4">
                <button 
                  className="save-btn transition hover:bg-foreground/90 bg-foreground/80 rounded-full pt-2 pr-2.5 pb-2 pl-2.5 shadow-sm backdrop-blur"
                  onClick={(e) => toggleSave(card.id, e)}
                >
                  {savedStates[card.id] ? (
                    <Check className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-background" />
                  )}
                </button>
              </div>
              <div className="p-4 sm:p-5 lg:p-6 bg-gradient-to-t to-transparent from-slate-100/70 via-slate-100/20 absolute right-0 bottom-0 left-0">
                <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold tracking-tight leading-tight text-black">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base mt-1 text-slate-800">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Controls - theme aware */}
        <div className="left-0 sm:-left-2 lg:-left-8 flex absolute top-0 bottom-0 items-center">
          <button 
            onClick={() => {
              prev();
              handleUserInteraction();
            }}
            className="group relative inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 rounded-full shadow-md ring-1 hover:shadow-lg transition bg-foreground hover:bg-foreground/90 ring-border hover:ring-border/80"
          >
            <ChevronLeft className="text-background group-hover:text-background/90 w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 sm:-right-2 lg:-right-8 flex items-center">
          <button 
            onClick={() => {
              next();
              handleUserInteraction();
            }}
            className="group relative inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 rounded-full shadow-md ring-1 hover:shadow-lg transition bg-foreground hover:bg-foreground/90 ring-border hover:ring-border/80"
          >
            <ChevronRight className="text-background group-hover:text-background/90 w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};