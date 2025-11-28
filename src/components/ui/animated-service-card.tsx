import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { FeatureWithImageComparison } from './feature-with-image-comparison';
import { FeatureInfographicCards } from './feature-infographic-cards';
import { CustomBrandingGradient } from './custom-branding-gradient';
import { AnimatedCard, CardBody, CardDescription, CardTitle, CardVisual, Visual3 } from './animated-card-chart';
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
export function AnimatedServiceCard({
  service,
  index,
  className,
  ...props
}: AnimatedServiceCardProps) {
  // Use detailed layout for first 3 cards
  const isLargeCard = index < 3;
  const isImageLeft = index === 1; // Middle card has image on left

  if (isLargeCard) {
    // Special layout for Content Creation (index 2)
    if (index === 2) {
      return <div className={cn('py-8 sm:py-12 lg:py-24', className)} {...props}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 xl:gap-16 items-center">
          {/* Chart with integrated text */}
          <div className="relative w-full order-2 lg:order-1">
            {/* Tagline Badge */}
            {service.tagline && <div className="mb-6">
              
            </div>}
            
            <AnimatedCard className="w-full">
              <CardVisual className="relative">
                <Visual3 mainColor="hsl(var(--primary))" secondaryColor="hsl(var(--accent))" />
                <div className="absolute inset-0 z-10 flex flex-col items-start justify-start p-6 lg:p-8 pt-8 lg:pt-12">
                  <div className="max-w-lg space-y-3">
                    
                    <h3 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-foreground">
                      Content Creation Drives Results
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                      Quality content increases engagement and revenue
                    </p>
                  </div>
                </div>
              </CardVisual>
            </AnimatedCard>
          </div>

          {/* Image Section */}
          <div className="relative order-1 lg:order-2 min-h-[350px] sm:min-h-[450px] lg:min-h-[500px]">
            <div className="w-full h-full flex items-center justify-center">
              {service.image ? <img src={service.image} alt={service.title} className="w-full h-full object-contain max-w-2xl" /> : <service.icon className="w-full h-full max-w-md text-muted-foreground/15" strokeWidth={0.5} aria-hidden />}
            </div>
          </div>
        </div>
      </div>;
    }

    // Standard layout for other large cards
    return <div className={cn('py-8 sm:py-12 lg:py-24', className)} {...props}>
        <div className={cn('grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-4 sm:gap-6 lg:gap-12 xl:gap-16 items-center', isImageLeft && 'lg:grid-cols-[1.2fr_1fr]')}>
          {/* Content Section */}
          <div className={cn('space-y-4 sm:space-y-6 order-2 lg:order-1', isImageLeft && 'lg:order-2')}>
            {/* Tagline Badge */}
            {service.tagline && <div className="inline-block">
                
              </div>}

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight text-foreground">
              {service.title}
            </h2>

            {/* Description / Infographic Cards / Gradient Generator */}
            {index === 0 ? <div className="space-y-4">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                  Get a complete, professional website with everything you need to start your online presence - completely FREE forever.
                </p>
                <FeatureInfographicCards />
              </div> : index === 1 ? <div className="space-y-4">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                  Make your website unique with custom colors, fonts, logos, and personalized design that matches your brand perfectly.
                </p>
                <CustomBrandingGradient />
              </div> : <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl">
                {service.description}
              </p>}
          </div>

          {/* Image Section */}
          <div className={cn('relative order-1 lg:order-2 min-h-[350px] sm:min-h-[450px] lg:min-h-[500px]', !service.beforeAfterSlider && !service.image && 'bg-gradient-to-br from-muted/50 to-muted/30 rounded-lg overflow-hidden p-6 lg:p-8', isImageLeft && 'lg:order-1')}>
            <div className="w-full h-full flex items-center justify-center">
              {service.beforeAfterSlider ? <FeatureWithImageComparison beforeImage={service.beforeAfterSlider.beforeImage} afterImage={service.beforeAfterSlider.afterImage} beforeAlt={`${service.title} - Before`} afterAlt={`${service.title} - After`} /> : service.image ? <img src={service.image} alt={service.title} className="w-full h-full object-contain max-w-2xl" /> : <service.icon className="w-full h-full max-w-md text-muted-foreground/15" strokeWidth={0.5} aria-hidden />}
            </div>
          </div>
        </div>
      </div>;
  }

  // Original simple card layout for remaining cards
  return <div className={cn('group relative p-6 transition-all duration-300 hover:bg-accent/5', className)} {...props}>
      {/* Icon */}
      <div className="mb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
          <service.icon className="size-6" strokeWidth={2} aria-hidden />
        </div>
      </div>

      {/* Price Badge */}
      {service.price && <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
            {service.price}
          </span>
        </div>}

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2 text-foreground">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {service.description}
      </p>

      {/* Features List */}
      {service.features && service.features.length > 0 && <ul className="space-y-2">
          {service.features.map((item, idx) => <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="size-4 text-primary flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>)}
        </ul>}
    </div>;
}