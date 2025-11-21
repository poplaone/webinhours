import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-12">
      
      {/* Floating Cards */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden sm:block">
        <img 
          src="/assets/card-1.png" 
          alt="Template" 
          className="absolute top-[10%] left-[5%] w-[280px] rounded-xl shadow-2xl transform -rotate-[5deg] opacity-70 hover:opacity-100 transition-opacity duration-300"
        />
        <img 
          src="/assets/card-2.png" 
          alt="Template" 
          className="absolute top-[40%] left-[2%] w-[240px] rounded-xl shadow-2xl transform rotate-[2deg] opacity-70 hover:opacity-100 transition-opacity duration-300"
        />
        <img 
          src="/assets/card-3.png" 
          alt="Template" 
          className="absolute bottom-[5%] left-[8%] w-[300px] rounded-xl shadow-2xl transform -rotate-[2deg] opacity-70 hover:opacity-100 transition-opacity duration-300"
        />
        <img 
          src="/assets/card-4.png" 
          alt="Template" 
          className="absolute top-[10%] right-[5%] w-[280px] rounded-xl shadow-2xl transform rotate-[5deg] opacity-70 hover:opacity-100 transition-opacity duration-300"
        />
        <img 
          src="/assets/card-5.png" 
          alt="Template" 
          className="absolute top-[45%] right-[2%] w-[260px] rounded-xl shadow-2xl transform -rotate-[3deg] opacity-70 hover:opacity-100 transition-opacity duration-300"
        />
        <img 
          src="/assets/card-6.png" 
          alt="Template" 
          className="absolute bottom-[10%] right-[8%] w-[270px] rounded-xl shadow-2xl transform rotate-[2deg] opacity-70 hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge */}
          <div className="mb-6 inline-block">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#E6E1FF] px-4 py-2 rounded-full shadow-sm">
              <span className="text-sm font-semibold text-gray-800">
                <span className="text-primary">500+</span> Professional Templates Available
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
            <span className="text-gray-900 block text-base sm:text-lg font-normal mb-2">
              Get Your
            </span>
            <span className="text-primary block">
              FREE Website{' '}
            </span>
            <span className="text-gray-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold block mt-2">
              in 24 Hours
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 leading-relaxed font-normal max-w-2xl mx-auto">
            Choose from <span className="text-primary font-semibold">500+ professional templates</span>. 
            Upgrade to premium services only when you're ready to scale.
          </p>

          {/* CTA Button */}
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

          {/* Cursor Elements */}
          <div className="absolute top-[55%] left-[38%] hidden lg:flex flex-col items-start pointer-events-none z-20">
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-[#00C950] transform -rotate-[25deg]"></div>
            <span className="mt-1 px-2 py-1 bg-[#00C950] text-white text-xs font-semibold rounded">Guest</span>
          </div>

          <div className="absolute top-[15%] right-[10%] hidden lg:flex flex-col items-start pointer-events-none z-20">
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-[#3399FF] transform -rotate-[25deg]"></div>
            <span className="mt-1 px-2 py-1 bg-[#3399FF] text-white text-xs font-semibold rounded">Mario</span>
          </div>

          <div className="absolute bottom-[30%] left-[25%] hidden lg:flex flex-col items-start pointer-events-none z-20">
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-[#FFD02B] transform -rotate-[25deg]"></div>
            <span className="mt-1 px-2 py-1 bg-[#FFD02B] text-black text-xs font-semibold rounded">Jessica</span>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-gray-600">
          <span className="text-xs">Scroll to explore</span>
          <div className="w-6 h-10 border border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-600 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};