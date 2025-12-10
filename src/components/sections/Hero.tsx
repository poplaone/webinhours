import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useParallaxHero } from '@/hooks/useParallaxHero';
import { CardSlider } from '@/components/ui/CardSlider';
import { RotatingServices } from '@/components/ui/text-shuffle/RotatingServices';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { LogoMarquee } from '@/components/sections/LogoMarquee';
import { cn } from '@/lib/utils';
export const Hero = () => {
  const navigate = useNavigate();
  useParallaxHero();
  return (
    <section
      className="relume-hero-section"
      aria-labelledby="hero-heading"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      <div className="relume-hero-container">
        <div className="relume-hero-grid">

          {/* LEFT COLUMN - LCP optimized with fetchpriority */}
          <div className="relume-hero-column" aria-hidden="true">
            <img
              src="/assets/card-1.webp"
              alt="Professional website design preview"
              width={400}
              height={300}
              style={{ width: '100%', height: 'auto', aspectRatio: '400/300' }}
              data-depth="0.15"
              loading="eager"
              decoding="sync"
              className="relume-hero-image parallax-image object-contain"
            />
            <img
              alt="E-commerce website template example"
              src="/lovable-uploads/f05d4bb5-4c1a-40d9-bb57-f25dcd61d809.png"
              width={400}
              height={300}
              style={{ width: '100%', height: 'auto', aspectRatio: '400/300' }}
              data-depth="0.25"
              loading="eager"
              decoding="async"
              className="relume-hero-image is-offset-left parallax-image object-contain"
            />
            <img
              src="/assets/card-3.webp"
              alt="Portfolio website template example"
              width={400}
              height={300}
              style={{ width: '100%', height: 'auto', aspectRatio: '400/300' }}
              data-depth="0.2"
              loading="eager"
              decoding="async"
              className="relume-hero-image parallax-image object-contain"
            />
            <img
              src="/assets/cursor-jessica.png"
              alt=""
              width={83}
              height={83}
              className="relume-hero-cursor parallax-cursor"
              style={{ position: 'absolute', width: '82.5px', top: '20px', left: '200px' }}
              data-depth="0.4"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* CENTER CONTENT - GEO Optimized with Answer-First Formatting */}
          <div className="relume-hero-center">

            <div className="text-center mb-6 md:mb-6 mt-8 md:mt-0 flex items-center justify-center">
              <RotatingServices />
            </div>

            <div className="relative mx-auto max-w-full px-4 py-6 sm:px-8 xl:px-16 xl:py-8 border border-primary/30 rounded-sm">
              {/* Decorative Corner Squares */}
              <div className="absolute -top-1.5 -left-1.5 w-2 h-2 sm:w-3 sm:h-3 bg-primary" />
              <div className="absolute -bottom-1.5 -right-1.5 w-2 h-2 sm:w-3 sm:h-3 bg-primary" />

              {/* H1 - Primary keyword optimized for GEO */}
              <h1
                id="hero-heading"
                className="text-center font-medium tracking-tight leading-tight mb-6 sm:mb-8 xl:text-6xl text-xl text-primary"
                itemProp="headline"
              >
                Professional Website in 24 Hours <br className="hidden md:block" />
                <span className="text-foreground">SEO & GEO Optimized</span>
              </h1>

              {/* TL;DR Summary - Answer-First for GEO extraction */}
              <div className="text-center max-w-5xl mx-auto text-muted-foreground" itemProp="description">
                <p className="text-sm xl:text-lg leading-relaxed font-medium">
                  The fastest way to launch high-conversion websites optimized for AI Search. Access{' '}
                  <button onClick={() => navigate('/websites')} className="text-primary hover:text-primary/80 transition-colors font-semibold underline decoration-2 underline-offset-4">
                    professional custom design
                  </button>
                  , Generative Engine Optimization (GEO), and{' '}
                  <button onClick={() => {
                    const servicesSection = document.getElementById('premium-marketplace');
                    servicesSection?.scrollIntoView({ behavior: 'smooth' });
                  }} className="text-primary hover:text-primary/80 transition-colors font-semibold underline decoration-2 underline-offset-4">
                    premium digital solutions
                  </button>
                  {' '}in one ecosystem.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/websites')}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                aria-label="Browse free website templates"
              >
                <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent font-medium">Get Free Website</span>
                <ArrowRight className="ml-2 h-5 w-5 text-white" aria-hidden="true" />
              </Button>


            </div>
          </div>

          {/* RIGHT COLUMN - LCP optimized with fetchpriority */}
          <div className="relume-hero-column" aria-hidden="true">
            <img
              src="/assets/card-4.webp"
              alt="AI workflow platform template"
              width={400}
              height={300}
              style={{ width: '100%', height: 'auto', aspectRatio: '400/300' }}
              data-depth="0.18"
              loading="eager"
              decoding="sync"
              className="relume-hero-image parallax-image object-contain"
            />
            <img
              src="/assets/card-5.webp"
              alt="Mobile app design template"
              width={400}
              height={300}
              style={{ width: '100%', height: 'auto', aspectRatio: '400/300' }}
              data-depth="0.22"
              loading="eager"
              decoding="async"
              className="relume-hero-image is-offset-right parallax-image object-contain"
            />
            <img
              src="/assets/card-6.webp"
              alt="Tech landing page template"
              width={400}
              height={300}
              style={{ width: '100%', height: 'auto', aspectRatio: '400/300' }}
              data-depth="0.16"
              loading="eager"
              decoding="async"
              className="relume-hero-image parallax-image object-contain"
            />
            <img
              src="/assets/cursor-mario.png"
              alt=""
              width={70}
              height={70}
              className="relume-hero-cursor parallax-cursor"
              style={{ position: 'absolute', width: '69.5px', top: '10px', right: '180px' }}
              data-depth="0.35"
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
          </div>

        </div>

        {/* Mobile Card Slider - shown only on mobile */}
        <div className="relume-hero-mobile-slider" role="region" aria-label="Website template examples">
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