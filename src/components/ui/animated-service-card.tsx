import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { FeatureWithImageComparison } from './feature-with-image-comparison';

type ServiceCardType = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
  price?: string;
  features?: string[];
  images?: string[];
  image?: string;
  tagline?: string;
  detailedFeatures?: Array<{
    title: string;
    description?: string;
  }>;
  beforeAfterSlider?: {
    beforeImage: string;
    afterImage: string;
  };
};

type AnimatedServiceCardProps = React.ComponentProps<'div'> & {
  service: ServiceCardType;
  index: number;
};

export function AnimatedServiceCard({ service, index, className, ...props }: AnimatedServiceCardProps) {
  // Use detailed layout for first 3 cards
  const isLargeCard = index < 3;
  const isImageLeft = index === 1; // Middle card has image on left

  if (isLargeCard) {
    return (
      <div
        className={cn(
          'py-24',
          className
        )}
        {...props}
      >
        <div className={cn(
          'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch',
          isImageLeft && 'lg:grid-flow-dense'
        )}>
          {/* Content Section */}
          <div className={cn('space-y-8 p-4 flex flex-col justify-center order-2 lg:order-none', isImageLeft && 'lg:col-start-2')}>
            {/* Tagline */}
            {service.tagline && (
              <span className="text-[1.125rem] font-semibold tracking-[-0.02em] inline-block mb-2">
                {service.tagline}
              </span>
            )}

            {/* Title */}
            <h2 className="text-[2.5rem] md:text-[3.5rem] font-bold leading-[1.1] tracking-[-0.03em] mb-8">
              {service.title}
            </h2>

            {/* Description */}
            <p className="text-base md:text-[1.125rem] text-muted-foreground leading-[1.6] max-w-[500px] mb-8">
              {service.description}
            </p>

            {/* Detailed Features Grid */}
            {service.detailedFeatures && service.detailedFeatures.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border/50 pt-8 mt-8">
                {service.detailedFeatures.map((feature, idx) => (
                  <div key={idx} className="flex flex-col items-start gap-4">
                    {/* Feature Icon */}
                    <div className="w-12 h-12">
                      <service.icon className="w-full h-full" strokeWidth={1.5} aria-hidden />
                    </div>

                    {/* Feature Title */}
                    <h3 className="text-base font-semibold mb-2">
                      {feature.title}
                    </h3>

                    {/* Feature Description */}
                    {feature.description && (
                      <p className="text-sm text-muted-foreground leading-[1.5]">
                        {feature.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image Section */}
          <div className={cn(
            'bg-muted/30 rounded-3xl overflow-hidden flex items-center justify-center w-full min-h-[300px] md:min-h-[500px] lg:min-h-[600px] order-1 lg:order-none',
            isImageLeft && 'lg:col-start-1 lg:row-start-1'
          )}>
            <div className="w-full h-full flex items-center justify-center p-8">
              {service.beforeAfterSlider ? (
                <FeatureWithImageComparison
                  beforeImage={service.beforeAfterSlider.beforeImage}
                  afterImage={service.beforeAfterSlider.afterImage}
                  beforeAlt={`${service.title} - Before`}
                  afterAlt={`${service.title} - After`}
                />
              ) : service.image ? (
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-contain max-w-3xl max-h-[550px]"
                />
              ) : (
                <service.icon className="w-full h-full max-w-3xl max-h-[550px] text-muted-foreground/20" strokeWidth={1} aria-hidden />
              )}
            </div>
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
