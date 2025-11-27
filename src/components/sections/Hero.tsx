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
  return <section className="relume-hero-section">
      <div className="relume-hero-container">
        <div className="relume-hero-grid">

          {/* LEFT COLUMN */}
          <div className="relume-hero-column">
            <img src="/assets/card-1.png" alt="Design preview" className="relume-hero-image parallax-image" data-depth="0.15" />
            <img src="/assets/card-2.png" alt="Mobile designs" className="relume-hero-image is-offset-left parallax-image" data-depth="0.25" />
            <img src="/assets/card-3.png" alt="Agency website" className="relume-hero-image parallax-image" data-depth="0.2" />
            <img src="/assets/cursor-jessica.png" alt="" className="relume-hero-cursor parallax-cursor" style={{
            position: 'absolute',
            width: '82.5px',
            top: '20px',
            left: '200px'
          }} data-depth="0.4" />
          </div>

          {/* CENTER CONTENT */}
          <div className="relume-hero-center">

            <div className="text-center mb-6 flex items-center justify-center">
              <div className={cn("group rounded-full border border-black/5 bg-neutral-100 text-base transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800")}>
                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <RotatingServices />
                </AnimatedShinyText>
              </div>
            </div>

            <div className="relative mx-auto max-w-full px-16 py-8 border border-primary/30 rounded-sm">
              {/* Decorative Corner Squares */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-primary" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-primary" />

              <h1 className="text-center font-bold text-secondary-foreground leading-tight mb-8 xl:text-6xl text-xl">We build your online presence in Hours, Not Weeks.</h1>

              <div className="text-center max-w-5xl mx-auto text-muted-foreground">
                <p className="text-sm xl:text-base">
                  Choose from hundreds of professional{' '}
                  <button onClick={() => navigate('/marketplace')} className="underline decoration-2 underline-offset-4 hover:text-primary transition-colors cursor-pointer bg-transparent border-none p-0 font-inherit">
                    website designs
                  </button>
                  —completely free. We'll handle the setup while you focus on growing your business. Need help with{' '}
                  <button onClick={() => {
                  const servicesSection = document.getElementById('services');
                  servicesSection?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }} className="underline decoration-2 underline-offset-4 hover:text-primary transition-colors cursor-pointer bg-transparent border-none p-0 font-inherit">
                    additional services
                  </button>
                  ? We've got you covered.
                </p>
              </div>
            </div>

            <Button size="lg" onClick={() => navigate('/marketplace')} className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-7 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
              <span>Choose Your Free Website</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* RIGHT COLUMN */}
          <div className="relume-hero-column">
            <img src="/assets/card-4.png" alt="Travel website" className="relume-hero-image parallax-image" data-depth="0.18" />
            <img src="/assets/card-5.png" alt="Business website" className="relume-hero-image is-offset-right parallax-image" data-depth="0.22" />
            <img src="/assets/card-6.png" alt="Dashboard design" className="relume-hero-image parallax-image" data-depth="0.16" />
            <img src="/assets/cursor-mario.png" alt="" className="relume-hero-cursor parallax-cursor" style={{
            position: 'absolute',
            width: '69.5px',
            top: '10px',
            right: '180px'
          }} data-depth="0.35" />
          </div>

        </div>

        {/* Mobile Card Slider - shown only on mobile */}
        <div className="relume-hero-mobile-slider">
          <CardSlider />
        </div>

        {/* Logo Marquee - part of hero section */}
        <div className="w-full mt-0 md:mt-8">
          <LogoMarquee />
        </div>
      </div>
    </section>;
};