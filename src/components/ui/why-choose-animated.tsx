"use client";

import React from "react";
import {
  Award,
  Clock,
  Smartphone,
  Zap,
  RefreshCw,
  Shield,
  Code2,
  Globe,
  HeadphonesIcon,
  ArrowRight,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface WhyChooseAnimatedProps {
  className?: string;
}

const WhyChooseAnimated = ({ className }: WhyChooseAnimatedProps) => {
  const features = [
    { icon: Clock, text: "24-Hour Delivery Guarantee", color: "text-blue-500" },
    { icon: Smartphone, text: "100% Mobile Responsive", color: "text-purple-500" },
    { icon: Zap, text: "SEO & Performance Optimized", color: "text-yellow-500" },
    { icon: RefreshCw, text: "Unlimited Revisions Included", color: "text-green-500" },
    { icon: Shield, text: "SSL Security & GDPR Compliant", color: "text-red-500" },
    { icon: Code2, text: "Modern Technology Stack", color: "text-cyan-500" },
    { icon: Globe, text: "Free Domain & Hosting Setup", color: "text-indigo-500" },
    { icon: HeadphonesIcon, text: "Ongoing Support & Maintenance", color: "text-pink-500" },
  ];

  return (
    <section className={cn("py-12 md:py-20 px-4 relative z-10 overflow-hidden", className)}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto w-full max-w-7xl relative z-10">
        {/* Main Content - Side by Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Main Header + CTA Buttons */}
          <div className="relative">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Award className="size-4 text-primary" />
                <span className="text-sm font-medium text-primary">Why Choose WebInHours</span>
              </div>

              <h2 className="text-3xl font-bold tracking-wide text-balance md:text-4xl lg:text-5xl">
                The Fastest Way to Professional Online Presence
              </h2>

              <p className="text-muted-foreground text-sm tracking-wide text-balance md:text-base">
                Stop losing customers to slow development timelines. Our proven process delivers high-quality websites at lightning speed, so you can start growing your business today.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  size="lg"
                  className="group relative overflow-hidden font-semibold px-8"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Your Project
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="group font-semibold px-8 border-2"
                >
                  <span className="flex items-center gap-2">
                    View Our Work
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Features Grid Only */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="group relative overflow-hidden rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-4 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                  >
                    {/* Gradient background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10 flex items-start gap-3">
                      <div className={cn(
                        "flex-shrink-0 p-2 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300",
                        feature.color
                      )}>
                        <Icon className="size-5" strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold leading-tight mb-1">
                          {feature.text}
                        </h4>
                      </div>
                      <Check className="size-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseAnimated;
