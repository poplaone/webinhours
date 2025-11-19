"use client";

import React, { useEffect, useRef, useState } from "react";
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

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [lines, setLines] = useState<Array<{ d: string; key: string }>>([]);

  useEffect(() => {
    const compute = () => {
      if (typeof window !== "undefined" && window.innerWidth < 640) {
        setLines([]);
        return;
      }
      if (!sectionRef.current || !circleRef.current) return;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const circRect = circleRef.current.getBoundingClientRect();
      const sx = circRect.left + circRect.width / 2 - sectionRect.left;
      const radius = circRect.height / 2;
      const sy = circRect.top - sectionRect.top + radius * 2 - 2;
      const next: Array<{ d: string; key: string }> = [];
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const ex = r.left + r.width / 2 - sectionRect.left;
        const ey = r.top - sectionRect.top + 4;
        const drop = 12;
        const curve = 60;
        const dx = ex - sx;
        const midY = sy + drop + curve;
        const elbowX = sx + dx * 0.45;
        const d = `M ${sx} ${sy} L ${sx} ${sy + drop} Q ${sx} ${midY} ${elbowX} ${midY} H ${ex} V ${ey}`;
        next.push({ d, key: `line-${i}` });
      });
      setLines(next);
    };
    const ro = new ResizeObserver(() => compute());
    if (sectionRef.current) ro.observe(sectionRef.current);
    if (circleRef.current) ro.observe(circleRef.current);
    cardRefs.current.forEach((el) => el && ro.observe(el));
    const id = requestAnimationFrame(compute);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(id);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <section ref={sectionRef} className={cn("py-20 px-4 relative z-10", className)}>
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
          <div className="relative w-full max-w-[600px] h-[360px] sm:h-[450px]">
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
                      <circle
                        fill="hsl(var(--primary))"
                        cx={xPos}
                        cy={10}
                        r={6}
                        opacity={0.9}
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
            <div className="relative mx-auto md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 w-[90%] max-w-[500px] mt-4">
              {/* Bottom shadow */}
              <div className="hidden md:block absolute -bottom-6 left-1/2 -translate-x-1/2 h-[120px] w-[70%] rounded-xl bg-primary/10 blur-xl" />
              
              {/* Box title badge */}
              <div className="relative mb-3 mx-auto md:absolute md:-top-4 md:left-1/2 md:-translate-x-1/2 z-20 flex items-center justify-center rounded-full border bg-background px-4 py-2 shadow-lg">
                <Award className="size-4 text-primary" />
                <span className="ml-2 text-xs font-semibold">Industry Leading Performance</span>
              </div>

              <div ref={circleRef} className="relative mx-auto mt-4 md:absolute md:-bottom-10 md:left-1/2 md:-translate-x-1/2 z-30 grid h-[56px] w-[56px] md:h-[60px] md:w-[60px] lg:h-[64px] lg:w-[64px] place-items-center rounded-full border-2 border-primary/50 bg-background font-bold text-sm shadow-xl">
                <div className="text-center">
                  <div className="text-primary text-base md:text-md lg:text-lg">24hr</div>
                  <div className="text-[9px] md:text-[9px] lg:text-[10px] text-muted-foreground">delivery</div>
                </div>
              </div>

              {/* Main Box */}
              <div className="relative z-10 overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-background via-background to-primary/5 backdrop-blur-sm shadow-2xl p-6 pb-20 md:pb-6">
                {/* Subtle corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-[100px] blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/10 to-transparent rounded-tr-[100px] blur-2xl" />

                {/* Features Grid */}
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
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
                ref={(el) => (cardRefs.current[idx] = el)}
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

        <svg className="absolute inset-0 pointer-events-none z-0 hidden sm:block" width="100%" height="100%">
          <defs>
            <filter id="neural-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {lines.map((l, i) => (
            <g key={l.key}>
              {/* Base glow line */}
              <motion.path
                d={l.d}
                stroke="url(#line-gradient)"
                strokeWidth="2.5"
                fill="none"
                opacity="0.3"
                filter="url(#neural-glow)"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.2 * i, ease: [0.25, 0.1, 0.5, 1] }}
              />
              {/* Main line */}
              <motion.path
                d={l.d}
                stroke="hsl(var(--primary))"
                strokeWidth="1.5"
                fill="none"
                opacity="0.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.2 * i + 0.1, ease: [0.25, 0.1, 0.5, 1] }}
              />
              {/* Animated flowing light */}
              <motion.path
                d={l.d}
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                fill="none"
                opacity="0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="20 80"
                initial={{ strokeDashoffset: 100, opacity: 0 }}
                animate={{ 
                  strokeDashoffset: [100, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{ 
                  duration: 3,
                  delay: 0.2 * i + 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
              />
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
};

export default WhyChooseAnimated;
