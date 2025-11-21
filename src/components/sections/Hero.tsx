import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useHeroAnimation } from '@/hooks/useHeroAnimation';

export const Hero = () => {
  const navigate = useNavigate();
  const { currentState, refs } = useHeroAnimation();

  return (
    <section className="hero-animated min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-10 px-4 sm:px-6">
      <div className="hero-layout max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-10 items-center">
        
        {/* LEFT COLUMN - Images */}
        <div className="hero-column-left relative hidden lg:flex flex-col gap-5">
          <img 
            ref={el => refs.leftImages.current[0] = el}
            src="/assets/card-3.png" 
            alt="Wireframe example"
            className={`hero-image ${currentState === 2 || currentState === 3 ? 'hero-image-visible' : ''}`}
          />
          <img 
            src="/assets/card-1.png" 
            alt="Design preview"
            className="hero-image-offset hero-image-offset-left"
          />
          <img 
            ref={el => refs.leftImages.current[1] = el}
            src="/assets/card-2.png" 
            alt="Interface mockup"
            className={`hero-image ${currentState === 3 ? 'hero-image-visible' : ''}`}
          />
          
          {/* Jessica Cursor */}
          <img 
            ref={refs.jessica}
            src="/assets/cursor-jessica.png" 
            alt="Cursor indicator"
            width="82.5"
            className={`hero-cursor hero-cursor-jessica ${currentState === 2 ? 'hero-cursor-state-2' : ''} ${currentState === 3 ? 'hero-cursor-state-3' : ''}`}
          />
        </div>

        {/* CENTER CONTENT */}
        <div 
          ref={refs.centerContent}
          className={`hero-content-center text-center max-w-[800px] ${currentState === 2 ? 'hero-content-state-2' : ''} ${currentState === 3 ? 'hero-content-state-3' : ''}`}
        >
          <div 
            ref={refs.badge}
            className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 px-4 py-2 rounded-full shadow-sm mb-6"
          >
            <span className="text-sm font-semibold">
              <span className="text-primary font-bold">500+</span> Professional Templates Available
            </span>
          </div>

          <h1 
            ref={refs.heading}
            className={`hero-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4 ${currentState === 2 ? 'hero-heading-state-2' : ''} ${currentState === 3 ? 'hero-heading-state-3' : ''}`}
          >
            <span className="text-foreground/90 block text-base sm:text-lg font-normal mb-2">
              Get Your
            </span>
            <span className="text-primary block">
              FREE Website{' '}
            </span>
            <span className="text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold block mt-2">
              in 24 Hours
            </span>
          </h1>

          <p 
            ref={refs.subheading}
            className={`hero-subheading text-base sm:text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed font-normal max-w-2xl mx-auto ${currentState === 2 ? 'hero-subheading-state-2' : ''} ${currentState === 3 ? 'hero-subheading-state-3' : ''}`}
          >
            Choose from <span className="text-primary font-semibold">500+ professional templates</span>. 
            Upgrade to premium services only when you're ready to scale.
          </p>

          <div className="mb-8">
            <Button 
              size="lg" 
              onClick={() => navigate('/marketplace')} 
              className="bg-black hover:bg-black/90 text-white sm:text-lg px-8 sm:px-10 py-4 sm:py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto transform hover:scale-[1.02] font-semibold"
            >
              <span>Browse FREE Templates</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* RIGHT COLUMN - Images */}
        <div className="hero-column-right relative hidden lg:flex flex-col gap-5">
          <img 
            ref={el => refs.rightImages.current[0] = el}
            src="/assets/card-6.png" 
            alt="Component preview"
            className={`hero-image ${currentState === 2 || currentState === 3 ? 'hero-image-visible' : ''}`}
          />
          <img 
            src="/assets/card-4.png" 
            alt="Interface component"
            className="hero-image-offset hero-image-offset-right"
          />
          <img 
            ref={el => refs.rightImages.current[1] = el}
            src="/assets/card-5.png" 
            alt="Design system"
            className={`hero-image ${currentState === 3 ? 'hero-image-visible' : ''}`}
          />
          
          {/* Mario Cursor */}
          <img 
            ref={refs.mario}
            src="/assets/cursor-mario.png" 
            alt="Cursor indicator"
            width="69.5"
            className={`hero-cursor hero-cursor-mario ${currentState === 2 ? 'hero-cursor-state-2' : ''} ${currentState === 3 ? 'hero-cursor-state-3' : ''}`}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs">Scroll to explore</span>
          <div className="w-6 h-10 border border-border rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};