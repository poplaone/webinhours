import React from "react";
import { Smartphone, Check, Layout } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileResponsiveCard({ className }: { className?: string }) {
    return (
        <div className={cn("relative flex flex-col gap-6 p-6 border border-border bg-card/60 rounded-xl hover:shadow-lg hover:border-primary/20 transition-all duration-300 overflow-hidden group min-h-[280px]", className)}>

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,#80808008_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            {/* TEXT CONTENT (Top) */}
            <div className="relative z-10 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-500">
                        <Smartphone className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Responsive</span>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-purple-500 transition-colors">
                        100% Mobile Optimized
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Perfect on every device. Mobile, Tablet, and Desktop.
                    </p>
                </div>
            </div>

            {/* GRAPHIC CONTENT (Bottom) */}
            <div className="relative z-10 flex-1 flex items-end justify-center mt-6 group-hover:scale-105 transition-transform duration-500">
                <div className="relative w-full max-w-[200px] flex justify-center">

                    {/* High Fidelity Phone Mockup */}
                    <div className="relative w-[120px] h-[200px] bg-[#1a1a1a] rounded-[2rem] border-[4px] border-[#2a2a2a] shadow-2xl overflow-hidden ring-1 ring-white/10">

                        {/* Dynamic Island / Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-24 bg-[#0a0a0a] rounded-b-xl z-30 flex items-center justify-center">
                            <div className="w-12 h-2.5 bg-[#1a1a1a] rounded-full flex items-center justify-end px-1.5 gap-1">
                                <div className="w-1 h-1 rounded-full bg-[#333]"></div>
                                <div className="w-1 h-1 rounded-full bg-[#3d3d3d]"></div>
                            </div>
                        </div>

                        {/* Screen Content (Wireframe) */}
                        <div className="w-full h-full bg-background flex flex-col pt-6 px-3 pb-3 relative">
                            {/* Status Bar hint */}
                            <div className="absolute top-1 right-4 flex gap-0.5">
                                <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                                <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                            </div>

                            {/* Navigation */}
                            <div className="flex justify-between items-center mb-3">
                                <div className="w-4 h-4 rounded bg-purple-500/20"></div>
                                <div className="w-3 h-2 rounded-sm bg-muted/50"></div>
                            </div>

                            {/* Hero Section */}
                            <div className="w-full aspect-[4/3] bg-purple-500/5 rounded-lg border border-purple-500/10 mb-3 flex flex-col items-center justify-center p-2 gap-1.5">
                                <div className="w-2/3 h-1.5 bg-purple-500/20 rounded-full"></div>
                                <div className="w-1/2 h-1.5 bg-muted/20 rounded-full"></div>
                                <div className="mt-1 w-12 h-3 bg-purple-500 rounded text-[4px] text-white flex items-center justify-center font-bold">CTA</div>
                            </div>

                            {/* Grid Section */}
                            <div className="grid grid-cols-2 gap-2">
                                <div className="aspect-square rounded-md bg-muted/10 border border-border/50"></div>
                                <div className="aspect-square rounded-md bg-muted/10 border border-border/50"></div>
                                <div className="aspect-square rounded-md bg-muted/10 border border-border/50"></div>
                                <div className="aspect-square rounded-md bg-muted/10 border border-border/50"></div>
                            </div>
                        </div>

                        {/* Reflection Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-40"></div>
                    </div>

                    {/* Tablet Hint (Left Shadow) */}
                    <div className="absolute -left-8 bottom-4 w-12 h-32 bg-zinc-800 rounded-r-xl border-y border-r border-zinc-700 opacity-40 blur-[1px] -z-10"></div>

                    {/* Desktop Hint (Right Shadow) */}
                    <div className="absolute -right-12 bottom-0 w-24 h-24 bg-zinc-800 rounded-tl-xl border-t border-l border-zinc-700 opacity-30 blur-[1px] -z-10"></div>

                    {/* Floating Check Badge */}
                    <div className="absolute -right-2 top-10 bg-green-500 text-white p-1.5 rounded-full shadow-lg ring-2 ring-background z-50 animate-bounce duration-[3000ms]">
                        <Check className="w-3 h-3" strokeWidth={3} />
                    </div>
                </div>
            </div>
        </div>
    );
}
