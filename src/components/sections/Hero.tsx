import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-16 px-6">
      <div className="max-w-[1440px] mx-auto w-full relative">
        
        {/* LEFT SIDE - Scattered Images */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block" style={{ width: '340px' }}>
          {/* Top pink card */}
          <img 
            src="/assets/card-1.png" 
            alt="Design preview"
            className="absolute rounded-2xl shadow-xl"
            style={{ 
              width: '240px',
              top: '-200px',
              left: '0',
              zIndex: 3
            }}
          />
          
          {/* Middle left white card with phones */}
          <img 
            src="/assets/card-2.png" 
            alt="Mobile designs"
            className="absolute rounded-2xl shadow-xl"
            style={{ 
              width: '200px',
              top: '0',
              left: '-20px',
              zIndex: 2
            }}
          />
          
          {/* Bottom dark card */}
          <img 
            src="/assets/card-3.png" 
            alt="Agency website"
            className="absolute rounded-2xl shadow-xl"
            style={{ 
              width: '280px',
              top: '140px',
              left: '40px',
              zIndex: 1
            }}
          />
          
          {/* Jessica Cursor */}
          <img 
            src="/assets/cursor-jessica.png" 
            alt=""
            className="absolute"
            style={{ 
              width: '80px',
              top: '-80px',
              left: '180px',
              zIndex: 10
            }}
          />
        </div>

        {/* CENTER CONTENT */}
        <div className="text-center max-w-[900px] mx-auto relative z-20">
          {/* Top Badge */}
          <div className="mb-8">
            <span className="text-base sm:text-lg">
              <span className="text-primary font-bold">500+</span> Professional Templates Available
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8">
            Websites designed & built faster with AI
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-[800px] mx-auto">
            Use AI as your design ally, not a replacement. Instantly generate Sitemaps, Wireframes and Style Guides for marketing websites—all in minutes
          </p>

          {/* CTA Button */}
          <Button 
            size="lg" 
            onClick={() => navigate('/marketplace')} 
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-7 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
          >
            <span>Browse FREE Templates</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* RIGHT SIDE - Scattered Images */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block" style={{ width: '340px' }}>
          {/* Top blue airplane card */}
          <img 
            src="/assets/card-4.png" 
            alt="Travel website"
            className="absolute rounded-2xl shadow-xl"
            style={{ 
              width: '260px',
              top: '-220px',
              right: '0',
              zIndex: 3
            }}
          />
          
          {/* Middle purple card */}
          <img 
            src="/assets/card-5.png" 
            alt="Business website"
            className="absolute rounded-2xl shadow-xl"
            style={{ 
              width: '220px',
              top: '-20px',
              right: '-20px',
              zIndex: 2
            }}
          />
          
          {/* Bottom analytics card */}
          <img 
            src="/assets/card-6.png" 
            alt="Dashboard design"
            className="absolute rounded-2xl shadow-xl"
            style={{ 
              width: '240px',
              top: '160px',
              right: '40px',
              zIndex: 1
            }}
          />
          
          {/* Mario Cursor */}
          <img 
            src="/assets/cursor-mario.png" 
            alt=""
            className="absolute"
            style={{ 
              width: '70px',
              top: '-100px',
              right: '120px',
              zIndex: 10
            }}
          />
        </div>
      </div>
    </section>
  );
};