import React from "react";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function PerformanceSEOCard({ className }: { className?: string }) {
    return (
        <div className={cn("relative flex flex-col gap-6 p-6 border border-border bg-card/60 rounded-xl hover:shadow-lg hover:border-primary/20 transition-all duration-300 overflow-hidden group min-h-[280px]", className)}>

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#80808012_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            {/* TEXT CONTENT (Top) */}
            <div className="relative z-10 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20 text-primary">
                        <Zap className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Performance</span>
                </div>

                <div>
                    <h3 className="text-xl font-medium tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors">
                        SEO & Speed Optimized
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Rank higher, load faster. Built for Core Web Vitals.
                    </p>
                </div>
            </div>

            {/* GRAPHIC CONTENT (Bottom) */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-end mt-4">

                {/* Advanced HUD Meter */}
                <div className="flex items-center gap-6 w-full justify-center mb-4 relative">
                    {/* Rotating Scan Background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent blur-3xl opacity-20 pointer-events-none"></div>

                    <div className="relative w-28 h-28 group-hover:scale-105 transition-transform duration-500">
                        {/* Outer Decoration Ring */}
                        <div className="absolute inset-0 rounded-full border border-primary/20 border-dashed animate-[spin_10s_linear_infinite]"></div>

                        {/* Segmented Arc Gauge */}
                        <svg className="w-full h-full -rotate-90">
                            {/* Background Track */}
                            <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-muted/10" strokeDasharray="30 5" />

                            {/* Active Progress (with Gradient effect simulated by color) */}
                            <circle
                                cx="56" cy="56" r="48"
                                stroke="currentColor"
                                strokeWidth="6"
                                fill="transparent"
                                strokeDasharray="280 360"
                                strokeLinecap="butt"
                                className="text-primary drop-shadow-[0_0_12px_rgba(var(--primary),0.6)] animate-in fade-in duration-1000"
                            />
                        </svg>

                        {/* Center Digital Readout */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/30 backdrop-blur-sm rounded-full m-4 border border-white/5">
                            <span className="text-[10px] font-mono text-primary animate-pulse">OPTIMIZED</span>
                            <span className="text-4xl font-bold tracking-tighter text-foreground tabular-nums">100</span>
                        </div>
                    </div>

                    {/* Matrix Data Bars */}
                    <div className="flex flex-col gap-2 min-w-[100px] z-10">
                        {[{ l: "LCP", v: "0.8s", w: "98%" }, { l: "INP", v: "40ms", w: "95%" }, { l: "CLS", v: "0.00", w: "100%" }].map((metric, i) => (
                            <div key={metric.l} className="space-y-0.5">
                                <div className="flex justify-between text-[9px] font-mono text-muted-foreground/80 tracking-widest">
                                    <span>[ {metric.l} ]</span>
                                    <span className="text-primary">{metric.v}</span>
                                </div>
                                <div className="h-1 w-full bg-zinc-900 rounded-sm overflow-hidden border border-white/5">
                                    <div
                                        className="h-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]"
                                        style={{ width: metric.w, animationDelay: `${i * 200}ms` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
