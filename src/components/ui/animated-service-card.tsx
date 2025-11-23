import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

type ServiceCardType = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
  price?: string;
  features?: string[];
  images?: string[];
  tagline?: string;
  detailedFeatures?: Array<{
    title: string;
    description: string;
  }>;
};

type AnimatedServiceCardProps = React.ComponentProps<'div'> & {
  service: ServiceCardType;
  index: number;
};

export function AnimatedServiceCard({ service, index, className, ...props }: AnimatedServiceCardProps) {
  // Use detailed layout for first 3 cards if they have detailedFeatures
  const isDetailedCard = service.detailedFeatures && service.detailedFeatures.length > 0;

  if (isDetailedCard) {
    return (
      <div
        className={cn(
          'group relative transition-all duration-300',
          className
        )}
        {...props}
      >
        <div className="flex flex-col gap-8">
          {/* Header Section */}
          <div className="space-y-4">
            {/* Tagline */}
            {service.tagline && (
              <span className="text-lg font-semibold tracking-tight text-foreground">
                {service.tagline}
              </span>
            )}
            
            {/* Title */}
            <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-foreground">
              {service.title}
            </h2>
            
            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-[500px]">
              {service.description}
            </p>
          </div>

          {/* Detailed Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border pt-8">
            {service.detailedFeatures.map((feature, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                {/* Feature Icon */}
                <div className="w-12 h-12">
                  <service.icon className="w-full h-full text-foreground" strokeWidth={1.5} aria-hidden />
                </div>
                
                {/* Feature Title */}
                <h3 className="text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                
                {/* Feature Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Original simple card layout for remaining cards
  return (
    <div
      className={cn(
        'group relative p-6 transition-all duration-300 hover:bg-accent/5',
        className
      )}
      {...props}
    >
      {/* Icon */}
      <div className="mb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
          <service.icon className="size-6" strokeWidth={2} aria-hidden />
        </div>
      </div>

      {/* Price Badge */}
      {service.price && (
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
            {service.price}
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2 text-foreground">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {service.description}
      </p>

      {/* Features List */}
      {service.features && service.features.length > 0 && (
        <ul className="space-y-2">
          {service.features.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="size-4 text-primary flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
