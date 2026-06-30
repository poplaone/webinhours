import { useNavigate } from 'react-router-dom';
import { HeroEmailCapture } from '@/components/forms/HeroEmailCapture';
import { useParallaxHero } from '@/hooks/useParallaxHero';
import { CardSlider } from '@/components/ui/CardSlider';
import { LogoMarquee } from '@/components/sections/LogoMarquee';

interface HeroProps {
  headline?: React.ReactNode;
  description?: React.ReactNode;
}

export const Hero = ({ headline, description }: HeroProps) => {
  const navigate = useNavigate();
  useParallaxHero();

  const handleExplorePackages = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      className="wih-hero-section"
      aria-labelledby="hero-heading"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      <div className="wih-hero-container">
        <div className="wih-hero-grid">

          {/* LEFT COLUMN - LCP optimized with fetchpriority */}
          <div className="wih-hero-column" aria-hidden="true">
            <img
              src="/assets/card-1.webp"
              alt="Professional website and online presence preview"
              title="Professional website and online presence preview"
              width={400}
              height={300}
              style={{ width: '100%', height: 'auto', aspectRatio: '400/300' }}
              data-depth="0.15"
              loading="eager"
              decoding="sync"
              className="wih-hero-image parallax-image object-contain"
            />
            <img
              alt="Business website and digital presence example"
              title="Business website and digital presence example"
              src="/uploads/f05d4bb5-4c1a-40d9-bb57-f25dcd61d809.png"
              width={400}
              height={300}
              style={{ width: '100%', height: 'auto', aspectRatio: '400/300' }}
              data-depth="0.25"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="wih-hero-image is-offset-left parallax-image object-contain"
            />
            <img
              src="/assets/card-3.webp"
              alt="Brand and social content preview"
              title="Brand and social content preview"
              width={400}
              height={300}
              style={{ width: '100%', height: 'auto', aspectRatio: '400/300' }}
              data-depth="0.2"
              loading="eager"
              decoding="async"
              className="wih-hero-image parallax-image object-contain"
            />
            <img
              src="/assets/cursor-jessica.png"
              alt=""
              width={83}
              height={83}
              className="wih-hero-cursor parallax-cursor"
              style={{ position: 'absolute', width: '82.5px', top: '20px', left: '200px' }}
              data-depth="0.4"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* CENTER CONTENT - GEO Optimized with Answer-First Formatting */}
          <div className="wih-hero-center flex flex-col items-center">

            <div className="relative mx-auto w-full max-w-full px-4 py-5 sm:px-8 sm:py-6 xl:px-16 xl:py-8 border border-primary/30 rounded-sm">
              {/* Decorative Corner Squares */}
              <div className="absolute -top-1.5 -left-1.5 w-2 h-2 sm:w-3 sm:h-3 bg-primary" />
              <div className="absolute -bottom-1.5 -right-1.5 w-2 h-2 sm:w-3 sm:h-3 bg-primary" />

              {/* H1 - Primary keyword optimized for GEO */}
              <h1
                id="hero-heading"
                className="text-center font-medium tracking-tight leading-tight mb-4 sm:mb-5 xl:mb-6 xl:text-6xl text-xl text-primary"
                itemProp="headline"
              >
                {headline || (
                  <>
                    Complete Online Presence. <br className="hidden md:block" />
                    <span className="text-foreground">Launched in Hours, Not Weeks.</span>
                  </>
                )}
              </h1>

              {/* TL;DR Summary - Answer-First for GEO extraction */}
              <div className="text-center max-w-5xl mx-auto text-muted-foreground" itemProp="description">
                <div className="text-sm xl:text-lg leading-relaxed font-medium">
                  {description || (
                    <>
                      We build your website, set up Google Business, create social content, and prepare local SEO so your business looks ready everywhere customers check.
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Primary CTA - Inline email lead capture */}
            <div className="mt-6 sm:mt-8 mx-auto w-full max-w-xl">
              <HeroEmailCapture />
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Get a practical web presence plan in 24 hours. No spam - just your launch path.
              </p>
            </div>

            {/* Secondary actions */}
            <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
              <button
                onClick={handleExplorePackages}
                className="text-sm font-medium text-primary underline decoration-2 underline-offset-4 transition-colors hover:text-primary/80"
              >
                Explore web presence packages
              </button>
              <button
                onClick={() => navigate('/pricing')}
                className="text-sm font-medium text-muted-foreground underline decoration-2 underline-offset-4 transition-colors hover:text-foreground"
              >
                See pricing
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN - LCP optimized with fetchpriority */}
          <div className="wih-hero-column" aria-hidden="true">
            <img
              src="/assets/card-4.webp"
              alt="Digital workflow and content planning preview"
              title="Digital workflow and content planning preview"
              width={400}
              height={300}
              style={{ width: '100%', height: 'auto', aspectRatio: '400/300' }}
              data-depth="0.18"
              loading="eager"
              decoding="sync"
              className="wih-hero-image parallax-image object-contain"
            />
            <img
              src="/assets/card-5.webp"
              alt="Mobile-first social and website preview"
              title="Mobile-first social and website preview"
              width={400}
              height={300}
              style={{ width: '100%', height: 'auto', aspectRatio: '400/300' }}
              data-depth="0.22"
              loading="eager"
              decoding="async"
              className="wih-hero-image is-offset-right parallax-image object-contain"
            />
            <img
              src="/assets/card-6.webp"
              alt="SEO-ready online presence preview"
              title="SEO-ready online presence preview"
              width={400}
              height={300}
              style={{ width: '100%', height: 'auto', aspectRatio: '400/300' }}
              data-depth="0.16"
              loading="eager"
              decoding="async"
              className="wih-hero-image parallax-image object-contain"
            />
            <img
              src="/assets/cursor-mario.png"
              alt=""
              width={70}
              height={70}
              className="wih-hero-cursor parallax-cursor"
              style={{ position: 'absolute', width: '69.5px', top: '10px', right: '180px' }}
              data-depth="0.35"
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
          </div>

        </div>

        {/* Mobile Card Slider - shown only on mobile */}
        <div className="wih-hero-mobile-slider" role="region" aria-label="Online presence examples">
          <CardSlider />
        </div>

        {/* Logo Marquee - Trust signals for E-E-A-T */}
        <div className="w-full mt-0 md:mt-8">
          <LogoMarquee />
        </div>
      </div>
    </section>
  );
};
