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
  BarChart,
  Terminal,
  Layout,
  Timer
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

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

          {/* HEADER SECTION - Spans full width on mobile, 5 cols on large */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pr-8 mb-8 lg:mb-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
              <Award className="size-4 text-primary" />
              <span className="text-sm font-medium text-primary">Why Choose WebInHours</span>
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

            {/* Trust Badges */}
            <div className="flex items-center gap-6 pt-6 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* BENTO GRID - Spans 7 cols */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* FEATURE 1: 24-Hour Delivery (Large Horizontal) */}
            <div className="md:col-span-2">
              <FeatureCard
                icon={<Clock className="w-4 h-4 text-blue-500" />}
                title="Fast Delivery"
                subtitle="24-Hour Delivery Guarantee"
                description="Your website ready in just one day."
                className="min-h-[250px]"
                customBackground={<DeliveryBackground />}
              />
            </div>

            {/* FEATURE 2: Mobile Responsive */}
            <FeatureCard
              icon={<Smartphone className="w-4 h-4 text-purple-500" />}
              title="Responsive"
              subtitle="100% Mobile Optimized"
              description="Perfect on every device."
              className="min-h-[280px]"
              customBackground={<MobileResponsiveBackground />}
            />

            {/* FEATURE 3: SEO & Performance */}
            <FeatureCard
              icon={<Zap className="w-4 h-4 text-yellow-500" />}
              title="Performance"
              subtitle="SEO & Speed Optimized"
              description="Rank higher, load faster."
              className="min-h-[280px]"
              customBackground={<SEOPerformanceBackground />}
            />

            {/* FEATURE 4: Modern Tech Stack (Large Horizontal) */}
            <div className="md:col-span-2">
              <FeatureCard
                icon={<Code2 className="w-4 h-4 text-cyan-500" />}
                title="Technology"
                subtitle="Modern Tech Stack"
                description="Built with React, TypeScript & Tailwind for scalability."
                className="min-h-[220px]"
                customBackground={<TechStackBackground />}
              />
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
  return <div className={cn("relative flex flex-col gap-2 p-5 border border-border bg-card/50 overflow-hidden group rounded-xl hover:shadow-lg hover:border-primary/20 transition-all duration-300", className)}>
    {/* Content Layer */}
    <div className="relative z-10 flex flex-col h-full pointer-events-none">
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
        <p className="text-sm text-muted-foreground/90 leading-relaxed max-w-[90%]">
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
    <div className="p-4 border border-border bg-card/30 rounded-xl flex flex-col items-center justify-center text-center gap-3 hover:bg-card hover:border-primary/20 transition-all group">
      <div className={cn("p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors", color)}>
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-xs font-semibold">{title}</span>
    </div>
  )
}


// ----------------- BACKGROUNDS -------------------

// 1. Delivery Background (Timeline/Clock)
const DeliveryBackground = () => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] h-[70%] md:w-[50%]"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Abstract simplified calendar/timeline */}
        <div className="relative w-full h-full">
          <div className="absolute right-[-20px] top-0 w-full h-full bg-background border border-border rounded-l-xl shadow-lg p-4 flex flex-col gap-3 opacity-90">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-border pb-2">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] font-bold">Project Timeline</span>
              </div>
              <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full dark:bg-blue-900/30 dark:text-blue-400">24h Target</span>
            </div>

            {/* Timeline Items */}
            <div className="space-y-3 relative pl-2">
              {/* Line */}
              <div className="absolute left-[7px] top-1 bottom-1 w-0.5 bg-muted"></div>

              <div className="relative flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-background z-10"></div>
                <div className="flex-1 p-1.5 bg-muted/20 rounded text-[10px]">Order Received</div>
              </div>
              <div className="relative flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-background z-10"></div>
                <div className="flex-1 p-1.5 bg-muted/20 rounded text-[10px]">Development</div>
              </div>
              <div className="relative flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-500/20 ring-background z-10 animate-pulse"></div>
                <div className="flex-1 p-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 rounded text-[10px] font-medium dark:text-blue-400">Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// 2. Mobile Background
const MobileResponsiveBackground = () => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#80808008_1px,transparent_1px)] bg-[size:16px_16px]"></div>

      {/* Device Mockup */}
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[90%] bg-zinc-900 rounded-t-2xl border-4 border-zinc-800 shadow-2xl overflow-hidden"
        initial={{ y: 50, rotate: -5 }}
        whileInView={{ y: 0, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        {/* Screen Content */}
        <div className="w-full h-full bg-background flex flex-col">
          {/* Header */}
          <div className="h-4 bg-muted border-b flex items-center px-2 gap-1">
            <div className="w-1 h-1 rounded-full bg-red-400"></div>
            <div className="w-1 h-1 rounded-full bg-yellow-400"></div>
          </div>
          {/* Body */}
          <div className="p-3 space-y-2">
            <div className="w-full h-20 bg-primary/5 rounded-md border border-dashed border-primary/20 flex items-center justify-center">
              <div className="w-8 h-8 rounded bg-primary/10"></div>
            </div>
            <div className="space-y-1">
              <div className="w-full h-2 bg-muted/50 rounded-full"></div>
              <div className="w-[80%] h-2 bg-muted/50 rounded-full"></div>
              <div className="w-[60%] h-2 bg-muted/50 rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="h-10 bg-muted/30 rounded"></div>
              <div className="h-10 bg-muted/30 rounded"></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating bubble */}
      <motion.div
        className="absolute top-10 right-10 bg-purple-500 text-white text-[10px] px-2 py-1 rounded-full shadow-lg z-10"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        iPhone 15 Pro
      </motion.div>
    </div>
  )
}

// 3. SEO Background
const SEOPerformanceBackground = () => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#80808012_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Gauge Container */}
        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90">
            {/* Background Circle */}
            <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/10" />
            {/* Progress Circle */}
            <motion.circle
              cx="64" cy="64" r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray="351.86"
              strokeDashoffset="351.86"
              className="text-yellow-500"
              whileInView={{ strokeDashoffset: 10 }} // ~98%
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">100</span>
            <span className="text-[10px] uppercase font-semibold text-muted-foreground">Score</span>
          </div>
        </div>

        {/* Floating Badges */}
        <motion.div
          className="absolute top-4 right-2 px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-600 rounded text-[10px] font-bold"
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          SEO 100%
        </motion.div>

        <motion.div
          className="absolute bottom-4 left-2 px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-600 rounded text-[10px] font-bold"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Lighthouse
        </motion.div>
      </motion.div>
    </div>
  )
}

// 4. Tech Stack Background
const TechStackBackground = () => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-dot-pattern">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Code Editor Window */}
      <motion.div
        className="absolute right-0 top-6 w-[70%] h-full bg-[#1e1e1e] rounded-tl-xl shadow-2xl border border-zinc-700 overflow-hidden"
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Editor Header */}
        <div className="h-6 bg-[#2d2d2d] flex items-center px-3 gap-1.5 border-b border-zinc-700">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="ml-2 text-[8px] text-zinc-400 font-mono">WebInHours.tsx</span>
        </div>

        {/* Code Content */}
        <div className="p-3 font-mono text-[8px] sm:text-[10px] text-zinc-300 leading-relaxed opacity-80">
          <div className="text-purple-400">import <span className="text-blue-300">React</span> from <span className="text-orange-300">'react'</span>;</div>
          <div className="text-purple-400">import <span className="text-blue-300">Next</span> from <span className="text-orange-300">'next'</span>;</div>
          <br />
          <div className="text-blue-400">export default <span className="text-yellow-300">function</span> <span className="text-yellow-100">App</span>() {'{'}</div>
          <div className="pl-4 text-zinc-400">// Optimized for speed</div>
          <div className="pl-4"><span className="text-purple-400">return</span> (</div>
          <div className="pl-8 text-green-300">&lt;Performance /&gt;</div>
          <div className="pl-4">);</div>
          <div>{'}'}</div>
        </div>
      </motion.div>

      {/* Floating Icons */}
      <div className="absolute left-6 bottom-4 flex gap-2">
        <div className="w-8 h-8 rounded bg-[#61DAFB]/10 flex items-center justify-center border border-[#61DAFB]/20 p-1">
          <svg viewBox="0 0 24 24" className="w-full h-full fill-[#61DAFB]"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2.2c4.27 0 7.9 2.7 9.2 6.5h-18.4c1.3-3.8 4.93-6.5 9.2-6.5zm0 19.6c-4.27 0-7.9-2.7-9.2-6.5h18.4c-1.3 3.8-4.93 6.5-9.2 6.5z" /></svg>
        </div>
        <div className="w-8 h-8 rounded bg-[#3178C6]/10 flex items-center justify-center border border-[#3178C6]/20 p-1">
          <span className="text-[#3178C6] font-bold text-xs">TS</span>
        </div>
      </div>
    </div>
  )
}

export default WhyChooseAnimated;
