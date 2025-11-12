import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-28 px-4 sm:px-6 relative z-10 my-0">
      <div className="container mx-auto text-center">
        <div className="my-[4px]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 whitespace-pre-wrap sm:whitespace-pre leading-tight">
            <span className="pt-0.5 sm:pt-1 md:pt-2 text-center sm:text-left">
              Professional Websites{" "}
            </span>
            <span className="text-white px-3 sm:px-2 md:px-3 bg-green-500 py-1 sm:py-0.5 md:py-2 rounded-lg text-center min-w-fit">
              100% FREE
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-4xl mx-auto px-2 sm:px-0 leading-relaxed">
            No monthly fees. No hidden costs. Just a beautiful website ready in <span className="text-green-500 font-semibold">24 hours</span>.
            Pay only for <span className="text-[#8B5CF6] font-semibold">premium services</span> when you're ready to grow.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-lg px-8 py-3 sm:py-2 w-full sm:w-auto min-h-[48px] touch-manipulation" onClick={() => navigate('/marketplace')}>
              Get My FREE Website Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};