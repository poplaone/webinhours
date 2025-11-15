import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'motion/react';

type ServiceCardType = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
  price?: string;
  features?: string[];
  images: string[]; // Single or multiple images
};

type AnimatedServiceCardProps = React.ComponentProps<'div'> & {
  service: ServiceCardType;
  index: number;
};

export function AnimatedServiceCard({ service, index, className, ...props }: AnimatedServiceCardProps) {
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Intersection Observer for mobile scroll-triggered animation
  useEffect(() => {
    if (shouldReduceMotion) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // On mobile, trigger when card is in the center of viewport
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            setIsInView(true);
          } else {
            setIsInView(false);
          }
        });
      },
      {
        threshold: [0.3, 0.6, 0.9],
        rootMargin: '-20% 0px -20% 0px', // Center detection
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  const showImages = isHovered || (isInView && window.innerWidth < 768);

  const container = "absolute right-4 -top-2 z-40";
  const imageEffect = cn(
    "relative shadow-none rounded-sm overflow-hidden transition-all duration-500",
    showImages
      ? "w-24 h-24 sm:w-28 sm:h-28 scale-100 opacity-100 shadow-xl"
      : "w-12 h-12 scale-0 opacity-0"
  );

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn('group relative overflow-visible p-6 transition-all duration-300', className)}
      {...props}
    >
      {/* Icon */}
      <div className="relative z-10">
        <service.icon 
          className={cn(
            "text-foreground/75 size-8 sm:size-10 transition-all duration-500",
            showImages && "opacity-40 scale-90"
          )} 
          strokeWidth={1.5} 
          aria-hidden 
        />
      </div>

      {/* Price Badge */}
      {service.price && (
        <motion.span 
          className="relative z-10 text-primary mt-2 block text-sm font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {service.price}
        </motion.span>
      )}

      {/* Title */}
      <h3 className={cn(
        "relative z-10 mt-4 text-sm font-semibold md:text-base transition-all duration-500",
        showImages && "opacity-70"
      )}>
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground relative z-10 mt-2 text-xs font-light">
        {service.description}
      </p>

      {/* Features List */}
      {service.features && service.features.length > 0 && (
        <ul className="relative z-10 mt-4 space-y-2">
          {service.features.map((item, idx) => (
            <li key={idx} className="text-muted-foreground flex items-center gap-2 text-xs">
              <div className="bg-primary/40 h-1.5 w-1.5 rounded-full" />
              <span className="font-medium">{item}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Single Image */}
      <div className={container}>
        <div className={imageEffect}>
          <img 
            alt={`${service.title} preview`} 
            src={service.images[0]} 
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
