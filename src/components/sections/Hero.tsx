import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { CardSlider } from "@/components/ui/CardSlider";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Subtle animated background elements - theme aware */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/3 dark:bg-green-500/8 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/3 dark:bg-purple-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-indigo-500/3 dark:bg-blue-500/8 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
            
            {/* Left Column - Typography */}
            <div className="order-1 lg:order-1">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] mb-8">
                <span className="bg-gradient-to-r from-foreground via-foreground/95 to-foreground/90 bg-clip-text text-transparent block">
                  Get Your
                </span>
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent block">
                  FREE Website
                </span>
                <span className="bg-gradient-to-r from-foreground/95 via-foreground/90 to-foreground/85 bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium block mt-2">
                  in 24 Hours
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl sm:text-2xl md:text-3xl text-foreground/75 mb-12 leading-relaxed font-light max-w-2xl">
                Choose from <span className="text-blue-600 dark:text-blue-400 font-semibold">500+ professional templates</span>. 
                Upgrade to premium services only when you're ready to scale.
              </p>

              {/* CTA Button */}
              <div className="mb-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white text-xl px-10 py-5 rounded-2xl font-bold shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 w-full sm:w-auto transform hover:scale-[1.02]"
                  onClick={() => navigate('/marketplace')}
                >
                  <span>Browse FREE Templates</span>
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Right Column - Card Slider */}
            <div className="order-2 lg:order-2 flex justify-center lg:justify-end">
              <CardSlider className="!px-0 !mt-0 !max-w-none" />
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator - theme aware */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-foreground/40">
          <span className="text-xs">Scroll to explore</span>
          <div className="w-6 h-10 border border-foreground/20 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-foreground/40 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};