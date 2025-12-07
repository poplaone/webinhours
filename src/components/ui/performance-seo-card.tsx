import React from "react";
import { Zap, Gauge, Search, BarChart3, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function PerformanceSEOCard({ className }: { className?: string }) {
    return (
        <div className={cn("relative flex flex-col gap-6 p-6 border border-border bg-card/60 rounded-xl hover:shadow-lg hover:border-primary/20 transition-all duration-300 overflow-hidden group min-h-[280px]", className)}>

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#80808012_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            {/* TEXT CONTENT (Top) */}
            <div className="relative z-10 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
                        <Zap className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Performance</span>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-yellow-500 transition-colors">
                        SEO & Speed Optimized
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Rank higher, load faster. Built for Core Web Vitals.
                    </p>
                </div>
            </div>

            {/* GRAPHIC CONTENT (Bottom) */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-end mt-2 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* Main Score Gauge */}
                <div className="relative w-32 h-32 group-hover:scale-105 transition-transform duration-500 mb-4">
                    <svg className="w-full h-full -rotate-90">
                        {/* Background Circle */}
                        <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-muted/10" />

                        {/* Progress Circle */}
                        <circle
                            cx="64" cy="64" r="58"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            strokeDasharray="364.4"
                            strokeDashoffset="10"
                            strokeLinecap="round"
                            className="text-green-500 transition-all duration-1000 ease-out"
                        />
                    </svg>

                    {/* Central Score */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-black text-foreground tracking-tighter tabular-nums">100</span>
                    </div>
                </div>

                {/* Core Web Vitals */}
                <div className="w-full flex justify-between gap-2 px-1">
                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-background/50 border border-border/50 flex-1 hover:border-green-500/30 transition-colors cursor-default">
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                        <span className="text-[10px] font-bold text-muted-foreground">LCP</span>
                        <span className="text-xs font-semibold">0.8s</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-background/50 border border-border/50 flex-1 hover:border-green-500/30 transition-colors cursor-default">
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                        <span className="text-[10px] font-bold text-muted-foreground">INP</span>
                        <span className="text-xs font-semibold">40ms</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-background/50 border border-border/50 flex-1 hover:border-green-500/30 transition-colors cursor-default">
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                        <span className="text-[10px] font-bold text-muted-foreground">CLS</span>
                        <span className="text-xs font-semibold">0.00</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
