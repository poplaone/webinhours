"use client";

import React from "react";
import { motion } from "motion/react";
import { 
  Clock, 
  Smartphone, 
  Zap, 
  RefreshCw, 
  Shield, 
  Code2, 
  Globe, 
  HeadphonesIcon,
  TrendingUp,
  Users,
  Award,
  CheckCircle2
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

  const stats = [
    {
      icon: Clock,
      title: "Lightning Fast Delivery",
      metric: "24hrs avg delivery",
      description: "Get your website live in 24 hours, not 6 weeks",
    },
    {
      icon: TrendingUp,
      title: "Conversion Focused",
      metric: "250% avg conversion boost",
      description: "Designed to turn visitors into customers",
    },
    {
      icon: Users,
      title: "Expert Team",
      metric: "98% client satisfaction",
      description: "Senior developers and designers with 10+ years experience",
    },
    {
      icon: CheckCircle2,
      title: "Risk-Free Guarantee",
      metric: "30-day guarantee",
      description: "100% money-back guarantee if you're not satisfied",
    },
    {
      icon: Zap,
      title: "Performance Optimized",
      metric: "95+ PageSpeed score",
      description: "Lightning fast loading speeds and perfect mobile scores",
    },
  ];

  return (
    <section className={cn("py-20 px-4 relative z-10", className)}>
      <div className="container mx-auto w-full max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 space-y-4"
        >
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
        </motion.div>

        {/* Animated SVG Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center mb-16"
        >
          <div className="relative w-full max-w-[600px] h-[400px] sm:h-[450px]">
            {/* SVG Paths */}
            <svg
              className="absolute inset-0 w-full h-full text-muted-foreground/40"
              viewBox="0 0 200 120"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                stroke="currentColor"
                fill="none"
                strokeWidth="0.3"
                strokeDasharray="100 100"
                pathLength="100"
              >
                {/* 5 paths for 5 stats */}
                <path d="M 20 10 v 15 q 0 5 5 5 h 55 q 5 0 5 5 v 15" />
                <path d="M 55 10 v 12 q 0 5 5 5 h 25 q 5 0 5 5 v 18" />
                <path d="M 100 10 v 12 q 0 5 0 5 v 23" />
                <path d="M 145 10 v 12 q 0 5 -5 5 h -25 q -5 0 -5 5 v 18" />
                <path d="M 180 10 v 15 q 0 5 -5 5 h -55 q -5 0 -5 5 v 15" />
                
                {/* Animation */}
                <animate
                  attributeName="stroke-dashoffset"
                  from="100"
                  to="0"
                  dur="1.5s"
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0.25,0.1,0.5,1"
                  keyTimes="0; 1"
                />
              </g>

              {/* Flowing Lights */}
              {[1, 2, 3, 4, 5].map((i) => (
                <g key={i} mask={`url(#why-mask-${i})`}>
                  <circle
                    className={`why-light why-light-${i}`}
                    cx="0"
                    cy="0"
                    r="8"
                    fill="url(#why-blue-grad)"
                  />
                </g>
              ))}

              {/* Top Badges */}
              <g>
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  const xPos = 20 + (idx * 160 / 4);
                  return (
                    <g key={idx}>
                      <rect
                        fill="hsl(var(--primary))"
                        x={xPos - 7}
                        y="4"
                        width="14"
                        height="12"
                        rx="6"
                        opacity="0.9"
                      />
                    </g>
                  );
                })}
              </g>

              <defs>
                {/* Masks for lights */}
                <mask id="why-mask-1">
                  <path d="M 20 10 v 15 q 0 5 5 5 h 55 q 5 0 5 5 v 15" strokeWidth="0.6" stroke="white" />
                </mask>
                <mask id="why-mask-2">
                  <path d="M 55 10 v 12 q 0 5 5 5 h 25 q 5 0 5 5 v 18" strokeWidth="0.6" stroke="white" />
                </mask>
                <mask id="why-mask-3">
                  <path d="M 100 10 v 12 q 0 5 0 5 v 23" strokeWidth="0.6" stroke="white" />
                </mask>
                <mask id="why-mask-4">
                  <path d="M 145 10 v 12 q 0 5 -5 5 h -25 q -5 0 -5 5 v 18" strokeWidth="0.6" stroke="white" />
                </mask>
                <mask id="why-mask-5">
                  <path d="M 180 10 v 15 q 0 5 -5 5 h -55 q -5 0 -5 5 v 15" strokeWidth="0.6" stroke="white" />
                </mask>

                {/* Gradient */}
                <radialGradient id="why-blue-grad" fx="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
            </svg>

            {/* Main Content Box */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] max-w-[500px]">
              {/* Bottom shadow */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 h-[120px] w-[70%] rounded-xl bg-primary/10 blur-xl" />
              
              {/* Box title badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center rounded-full border bg-background px-4 py-2 shadow-lg">
                <Award className="size-4 text-primary" />
                <span className="ml-2 text-xs font-semibold">Industry Leading Performance</span>
              </div>

              {/* Circle badge at bottom */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-30 grid h-[70px] w-[70px] place-items-center rounded-full border-2 border-primary/50 bg-background font-bold text-sm shadow-xl">
                <div className="text-center">
                  <div className="text-primary text-lg">24hr</div>
                  <div className="text-[10px] text-muted-foreground">delivery</div>
                </div>
              </div>

              {/* Main Box */}
              <div className="relative z-10 overflow-hidden rounded-xl border-2 bg-background/95 backdrop-blur-sm shadow-2xl p-6">
                {/* Animated Circles */}
                <motion.div
                  className="absolute -bottom-16 left-1/2 -translate-x-1/2 h-[120px] w-[120px] rounded-full border border-primary/20 bg-primary/5"
                  animate={{ scale: [0.98, 1.02, 0.98] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-24 left-1/2 -translate-x-1/2 h-[180px] w-[180px] rounded-full border border-primary/15 bg-primary/5"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="absolute -bottom-32 left-1/2 -translate-x-1/2 h-[240px] w-[240px] rounded-full border border-primary/10 bg-primary/5"
                  animate={{ scale: [1.02, 0.98, 1.02] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />

                {/* Features Grid */}
                <div className="relative z-10 grid grid-cols-2 gap-3 mb-6">
                  {features.map((feature, idx) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * idx }}
                        className="flex items-start gap-2"
                      >
                        <Icon className="size-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-xs font-medium leading-tight">{feature.text}</span>
                      </motion.div>
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
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-20"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="h-full p-6 rounded-xl border-2 bg-background hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                  <Icon className="size-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-sm mb-2">{stat.title}</h3>
                  <div className="text-2xl font-black text-primary mb-2">{stat.metric}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{stat.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseAnimated;
