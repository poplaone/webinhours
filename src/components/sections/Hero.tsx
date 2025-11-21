import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-10 px-4 sm:px-6">
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_600px] gap-8 lg:gap-16 items-center">
        
        {/* LEFT SIDE - Scattered Image Grid */}
        <div className="hero-image-grid relative hidden lg:block" style={{ height: '600px' }}>
          {/* Large top-left image */}
          <img 
            src="/assets/card-1.png" 
            alt="Featured design 1"
            className="hero-grid-image hero-grid-large"
            style={{ 
              position: 'absolute',
              top: '0',
              left: '0',
              width: '280px',
              height: '320px',
              objectFit: 'cover'
            }}
          />
          
          {/* Small top-right image */}
          <img 
            src="/assets/card-2.png" 
            alt="Featured design 2"
            className="hero-grid-image hero-grid-small"
            style={{ 
              position: 'absolute',
              top: '20px',
              right: '80px',
              width: '180px',
              height: '180px',
              objectFit: 'cover'
            }}
          />
          
          {/* Medium center image */}
          <img 
            src="/assets/card-3.png" 
            alt="Featured design 3"
            className="hero-grid-image hero-grid-medium"
            style={{ 
              position: 'absolute',
              top: '140px',
              left: '60px',
              width: '220px',
              height: '240px',
              objectFit: 'cover'
            }}
          />
          
          {/* Small bottom-left image */}
          <img 
            src="/assets/card-4.png" 
            alt="Featured design 4"
            className="hero-grid-image hero-grid-small"
            style={{ 
              position: 'absolute',
              bottom: '80px',
              left: '20px',
              width: '160px',
              height: '160px',
              objectFit: 'cover'
            }}
          />
          
          {/* Medium bottom-right image */}
          <img 
            src="/assets/card-5.png" 
            alt="Featured design 5"
            className="hero-grid-image hero-grid-medium"
            style={{ 
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              width: '200px',
              height: '220px',
              objectFit: 'cover'
            }}
          />
          
          {/* Accent small image */}
          <img 
            src="/assets/card-6.png" 
            alt="Featured design 6"
            className="hero-grid-image hero-grid-small"
            style={{ 
              position: 'absolute',
              top: '260px',
              right: '0',
              width: '140px',
              height: '140px',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* RIGHT SIDE - Content */}
        <div className="text-center lg:text-left max-w-[600px] mx-auto lg:mx-0">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 px-4 py-2 rounded-full shadow-sm mb-6">
            <span className="text-sm font-semibold">
              <span className="text-primary font-bold">500+</span> Professional Templates Available
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4">
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

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed font-normal max-w-2xl">
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