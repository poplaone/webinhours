import React from "react";
import { Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileResponsiveCard({ className }: { className?: string }) {
    return (
        <div className={cn("relative flex flex-col gap-6 p-6 border border-border bg-card/60 rounded-xl hover:shadow-lg hover:border-primary/20 transition-all duration-300 overflow-hidden group min-h-[280px]", className)}>

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,#80808008_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            {/* TEXT CONTENT (Top) */}
            <div className="relative z-10 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20 text-primary">
                        <Smartphone className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Responsive</span>
                </div>

                <div>
                    <h3 className="text-xl font-medium tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors">
                        100% Mobile Optimized
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Perfect on every device. Mobile, Tablet, and Desktop.
                    </p>
                </div>
            </div>

            {/* GRAPHIC CONTENT (Bottom) */}
            <div className="relative z-10 flex-1 flex items-end justify-center mt-6 group-hover:scale-105 transition-transform duration-500 perspective-1000">
                <div className="relative w-full max-w-[180px] flex justify-center transform-style-3d rotate-x-12 rotate-y-[-10deg] group-hover:rotate-x-0 group-hover:rotate-y-0 transition-transform duration-700">

                    {/* Backend Mockup (Layer 1 - Deep) */}
                    <div className="absolute top-4 -right-12 w-[140px] h-[200px] bg-zinc-900/80 border border-zinc-800 rounded-lg shadow-xl translate-z-[-20px] blur-[1px] opacity-60">
                        <div className="p-3 space-y-2">
                            <div className="w-full h-1 bg-primary/20 rounded-full"></div>
                            <div className="w-2/3 h-1 bg-primary/20 rounded-full"></div>
                            <div className="w-full h-1 bg-primary/20 rounded-full"></div>
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                <div className="h-10 border border-primary/10 bg-primary/5 rounded"></div>
                                <div className="h-10 border border-primary/10 bg-primary/5 rounded"></div>
                            </div>
                        </div>
                    </div>

                    {/* Main Sharp Device (Layer 2 - Focus) */}
                    <div className="relative w-[150px] h-[230px] bg-zinc-950 border border-zinc-800 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/10 z-20">
                        {/* Status Bar */}
                        <div className="h-6 bg-background/50 border-b border-white/5 backdrop-blur-md flex items-center justify-between px-3">
                            <span className="text-[8px] font-mono text-muted-foreground">09:41</span>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-[1px] bg-primary"></div>
                                <div className="w-2 h-2 rounded-[1px] bg-foreground"></div>
                            </div>
                        </div>

                        {/* UI Content */}
                        <div className="p-4 space-y-3">
                            {/* Pro Card 1 */}
                            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-3 rounded-sm shadow-lg relative overflow-hidden group/item">
                                <div className="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover/item:translate-x-[100%] transition-transform duration-1000"></div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center text-[10px] text-primary-foreground font-bold">W</div>
                                    <div className="h-2 w-16 bg-zinc-800 rounded-sm"></div>
                                </div>
                                <div className="h-12 bg-zinc-800/50 rounded-sm border border-white/5"></div>
                            </div>

                            {/* Pro Card 2 */}
                            <div className="bg-zinc-900/50 border border-white/5 p-3 rounded-sm flex gap-2 items-center">
                                <div className="w-8 h-8 rounded-full border border-primary/30"></div>
                                <div className="space-y-1">
                                    <div className="h-1.5 w-12 bg-zinc-700 rounded-full"></div>
                                    <div className="h-1.5 w-8 bg-zinc-800 rounded-full"></div>
                                </div>
                            </div>

                            {/* Floating Interactive Element */}
                            <div className="absolute bottom-4 right-4 left-4 h-10 bg-primary text-primary-foreground text-[10px] font-bold tracking-widest uppercase flex items-center justify-center shadow-[0_4px_20px_rgba(var(--primary),0.4)]">
                                View Project
                            </div>
                        </div>
                    </div>

                    {/* Floating Glass Element (Layer 3 - Overlay) */}
                    <div className="absolute -bottom-6 -left-8 w-24 h-24 bg-primary/10 backdrop-blur-md border border-white/10 rounded-lg shadow-glass z-30 flex items-center justify-center transform rotate-6 animate-pulse duration-[4000ms]">
                        <div className="text-[10px] font-mono text-primary font-bold">MOBILE_FIRST</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
