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

                {/* Digital Ring Meter */}
                <div className="flex items-center gap-8 w-full justify-center mb-6">
                    <div className="relative w-24 h-24 group-hover:scale-105 transition-transform duration-500">
                        {/* Outer Ring */}
                        <svg className="w-full h-full -rotate-90">
                            <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-muted/10" />
                            <circle
                                cx="48" cy="48" r="44"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="transparent"
                                strokeDasharray="276"
                                strokeDashoffset="0"
                                className="text-primary drop-shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                            />
                        </svg>

                        {/* Center Score */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold tracking-tighter text-foreground">100</span>
                            <span className="text-[10px] uppercase font-mono text-muted-foreground">Score</span>
                        </div>
                    </div>

                    {/* Metric Bars */}
                    <div className="flex flex-col gap-3 min-w-[100px]">
                        <div className="space-y-1">
                            <div className="flex justify-between text-[10px] uppercase font-mono text-muted-foreground">
                                <span>LCP</span>
                                <span className="text-foreground">0.8s</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted/20 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[95%] shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-[10px] uppercase font-mono text-muted-foreground">
                                <span>INP</span>
                                <span className="text-foreground">40ms</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted/20 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[98%] shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
