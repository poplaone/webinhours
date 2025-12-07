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
          <img src="/assets/card-1.webp" alt="Design preview" style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '100%'
          }} data-depth="0.15" loading="eager" className="relume-hero-image parallax-image object-contain" />
          <img alt="E-commerce website" style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '100%'
          }} data-depth="0.25" loading="eager" className="relume-hero-image is-offset-left parallax-image object-contain" src="/lovable-uploads/f05d4bb5-4c1a-40d9-bb57-f25dcd61d809.png" />
          <img src="/assets/card-3.webp" alt="Portfolio website" className="relume-hero-image parallax-image object-contain" style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '100%'
          }} data-depth="0.2" loading="eager" />
          <img src="/assets/cursor-jessica.png" alt="" className="relume-hero-cursor parallax-cursor" style={{
            position: 'absolute',
            width: '82.5px',
            top: '20px',
            left: '200px'
          }} data-depth="0.4" />
        </div>

        {/* CENTER CONTENT */}
        <div className="relume-hero-center">

          <div className="text-center mb-6 md:mb-6 mt-8 md:mt-0 flex items-center justify-center">
            <RotatingServices />
          </div>

          <div className="relative mx-auto max-w-full px-4 py-6 sm:px-8 xl:px-16 xl:py-8 border border-primary/30 rounded-sm">
            {/* Decorative Corner Squares */}
            <div className="absolute -top-1.5 -left-1.5 w-2 h-2 sm:w-3 sm:h-3 bg-primary" />
            <div className="absolute -bottom-1.5 -right-1.5 w-2 h-2 sm:w-3 sm:h-3 bg-primary" />

            <h1 className="text-center font-medium tracking-tight leading-tight mb-6 sm:mb-8 xl:text-6xl text-xl text-primary">
              WebInHour: Elite Digital Presence <br className="hidden md:block" />
              <span className="text-foreground">& SEO Solutions.</span>
            </h1>

            <div className="text-center max-w-5xl mx-auto text-muted-foreground">
              <p className="text-sm xl:text-lg leading-relaxed font-medium">
                The fastest way to launch high-conversion websites.
                Access <button onClick={() => navigate('/marketplace')} className="text-primary hover:text-primary/80 transition-colors font-semibold underline decoration-2 underline-offset-4">professional custom design</button>, reputation management,
                and <button onClick={() => {
                  const servicesSection = document.getElementById('premium-services');
                  servicesSection?.scrollIntoView({ behavior: 'smooth' });
                }} className="text-primary hover:text-primary/80 transition-colors font-semibold underline decoration-2 underline-offset-4">verified digital assets</button> in one ecosystem.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={() => navigate('/marketplace')} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-bold tracking-tight">
              <span>Start Your Project</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button variant="outline" size="lg" onClick={() => {
              const servicesSection = document.getElementById('premium-marketplace');
              servicesSection?.scrollIntoView({ behavior: 'smooth' });
            }} className="w-full sm:w-auto border-2 border-primary/20 hover:bg-primary/5 text-foreground text-base sm:text-lg px-8 py-6 rounded-lg font-semibold">
              View Premium Services
            </Button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="relume-hero-column">
          <img src="/assets/card-4.webp" alt="AI workflow platform" style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '100%'
          }} data-depth="0.18" loading="eager" className="relume-hero-image parallax-image object-contain" />
          <img src="/assets/card-5.webp" alt="Mobile app design" className="relume-hero-image is-offset-right parallax-image object-contain" style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '100%'
          }} data-depth="0.22" loading="eager" />
          <img src="/assets/card-6.webp" alt="Tech landing page" style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '100%'
          }} data-depth="0.16" loading="eager" className="relume-hero-image parallax-image object-contain" />
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