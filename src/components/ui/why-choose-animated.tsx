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
  CheckCircle,
  Timer,
  Layout,
  Terminal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { FastDeliveryCard } from "./fast-delivery-card";
import { MobileResponsiveCard } from "./mobile-responsive-card";
import { PerformanceSEOCard } from "./performance-seo-card";
import { TechStackCard } from "./tech-stack-card";

interface WhyChooseAnimatedProps {
  className?: string;
}

const WhyChooseAnimated = ({ className }: WhyChooseAnimatedProps) => {
  return (
    <section className={cn("py-12 md:py-24 px-4 relative z-10 overflow-hidden", className)}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto w-full max-w-[1400px] relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* HEADER CARD - Integrated into the grid (Full width top or 5 cols side) */}
          <div className="lg:col-span-5 relative flex flex-col p-6 md:p-8 border border-border bg-card/40 backdrop-blur-sm rounded-xl overflow-hidden group">
            {/* Subtle background for header card */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full justify-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
                <Award className="size-4 text-primary" />
                <span className="text-sm font-medium text-primary">Why Choose WebInHour</span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Fastest Way</span> to Professional Online Presence
              </h2>

              <p className="text-muted-foreground text-lg md:text-xl max-w-lg">
                Stop losing customers to slow development timelines. Our proven process delivers high-quality websites at lightning speed, so you can start growing your business today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="group relative overflow-hidden font-semibold px-8 h-12 text-base shadow-lg shadow-primary/20">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Your Project
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>

                <Button variant="outline" size="lg" className="group font-semibold px-8 h-12 text-base border-2">
                  <span className="flex items-center gap-2">
                    View Our Work
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>

              {/* Trust Badges - Text only to be cleaner */}
              <div className="flex flex-wrap items-center gap-4 pt-4 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/50 border border-border/50">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  <span>Money-back guarantee</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/50 border border-border/50">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* BENTO GRID - Spans 7 cols */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* FEATURE 1: 24-Hour Delivery */}
            <div className="md:col-span-2">
              <FastDeliveryCard />
            </div>

            {/* FEATURE 2: Mobile Responsive */}
            <MobileResponsiveCard />

            {/* FEATURE 3: SEO & Performance */}
            <PerformanceSEOCard />

            {/* FEATURE 4: Modern Tech Stack */}
            <div className="md:col-span-2">
              <TechStackCard />
            </div>

            {/* SMALLER FEATURES GRID */}
            <div className="md:col-span-2 grid grid-cols-2 lg:grid-cols-4 gap-4">
              <MiniFeatureCard icon={RefreshCw} color="text-green-500" title="Unlimited Revisions" />
              <MiniFeatureCard icon={Shield} color="text-red-500" title="SSL & Security" />
              <MiniFeatureCard icon={Globe} color="text-indigo-500" title="Free Hosting" />
              <MiniFeatureCard icon={HeadphonesIcon} color="text-pink-500" title="Ongoing Support" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

// ----------------- Feature Card Component -------------------
function FeatureCard({
  icon,
  title,
  subtitle,
  description,
  customBackground,
  className
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  customBackground?: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("relative flex flex-col gap-2 p-5 border border-border bg-card/60 overflow-hidden group rounded-xl hover:shadow-lg hover:border-primary/20 transition-all duration-300", className)}>
    {/* Content Layer - Added z-20 to ensure text stays on top of graphics */}
    <div className="relative z-20 flex flex-col h-full pointer-events-none max-w-[70%] md:max-w-[75%]">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-md bg-background/80 backdrop-blur-sm border border-border shadow-sm">
          {icon}
        </div>
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</span>
      </div>

      <div className="mt-auto">
        <h3 className="text-lg md:text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
          {subtitle}
        </h3>
        <p className="text-sm text-muted-foreground/90 leading-relaxed">
          {description}
        </p>
      </div>
    </div>

    {/* Custom Background Layer */}
    {customBackground && (
      <div className="absolute inset-0 z-0">
        {customBackground}
      </div>
    )}

    {/* Hover Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 z-[1] pointer-events-none" />
  </div>;
}

function MiniFeatureCard({ icon: Icon, title, color }: { icon: any, title: string, color: string }) {
  return (
    <div className="p-4 border border-border bg-card/40 rounded-xl flex flex-col items-center justify-center text-center gap-3 hover:bg-card hover:border-primary/20 transition-all group">
      <div className={cn("p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors", color)}>
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-xs font-semibold">{title}</span>
    </div>
  )
}


// ----------------- BACKGROUNDS -------------------

// 1. Delivery Background - Removed (Replaced by FastDeliveryCard)

// 2. Mobile Background - Removed (Replaced by MobileResponsiveCard)

// 3. SEO Background - Removed (Replaced by PerformanceSEOCard)

// 4. Tech Stack Background - Removed (Replaced by TechStackCard)

export default WhyChooseAnimated;
