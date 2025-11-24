import React from "react";
import { 
  Clock, 
  Smartphone, 
  Zap, 
  RefreshCw, 
  Shield, 
  Code2, 
  Globe, 
  HeadphonesIcon,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface WhyChooseAnimatedProps {
  className?: string;
}

const WhyChooseAnimated = ({ className }: WhyChooseAnimatedProps) => {
  const features = [
    { icon: Clock, text: "24-Hour Delivery Guarantee" },
    { icon: Smartphone, text: "100% Mobile Responsive" },
    { icon: Zap, text: "SEO & Performance Optimized" },
    { icon: RefreshCw, text: "Unlimited Revisions Included" },
    { icon: Shield, text: "SSL Security & GDPR Compliant" },
    { icon: Code2, text: "Modern Technology Stack" },
    { icon: Globe, text: "Free Domain & Hosting Setup" },
    { icon: HeadphonesIcon, text: "Ongoing Support & Maintenance" },
  ];

  return (
    <section className={cn("py-6 md:py-20 px-4 relative z-10", className)}>
      <div className="container mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Award className="size-4 text-primary" />
            <span className="text-sm font-medium text-primary">Why Choose WebInHours</span>
          </div>
          
          <h2 className="text-3xl font-bold tracking-wide text-balance md:text-4xl lg:text-5xl xl:font-extrabold">
            The Fastest Way to Professional Online Presence
          </h2>
          
          <p className="text-muted-foreground mt-4 text-sm tracking-wide text-balance md:text-base max-w-3xl mx-auto">
            Stop losing customers to slow development timelines. Our proven process delivers high-quality websites at lightning speed, so you can start growing your business today.
          </p>
        </div>

        {/* Main Content Box */}
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-[600px]">
            {/* Bottom shadow */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 h-[120px] w-[70%] rounded-xl bg-primary/10 blur-xl" />
            
            {/* Box title badge */}
            <div className="relative mb-3 mx-auto z-20 flex items-center justify-center rounded-full border bg-background px-4 py-2 shadow-lg w-fit">
              <Award className="size-4 text-primary" />
              <span className="ml-2 text-xs font-semibold">Industry Leading Performance</span>
            </div>

            {/* Main Box */}
            <div className="relative z-10 overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-background via-background to-primary/5 backdrop-blur-sm shadow-2xl p-6">
              {/* Subtle corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-[100px] blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/10 to-transparent rounded-tr-[100px] blur-2xl" />

              {/* Features Grid */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {features.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div key={idx} className="flex items-start gap-2">
                      <Icon className="size-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-xs font-medium leading-tight">{feature.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* CTA Buttons */}
              <div className="relative z-10 flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 font-semibold" size="lg">
                  Start Your Project
                </Button>
                <Button variant="outline" className="flex-1 font-semibold" size="lg">
                  View Our Work
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseAnimated;
