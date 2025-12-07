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
            <div className="relative z-10 flex-1 flex items-end justify-center mt-6 group-hover:scale-105 transition-transform duration-500">
                <div className="relative w-full max-w-[180px] flex justify-center">

                    {/* Sharp Bezel-less Device */}
                    <div className="relative w-[140px] h-[220px] bg-zinc-950 border-x border-t border-zinc-800 shadow-2xl overflow-hidden ring-1 ring-white/5 mx-auto">

                        {/* Screen Content - Sharp & Professional */}
                        <div className="w-full h-full bg-background flex flex-col relative">
                            {/* Fake Browser Header */}
                            <div className="h-6 bg-zinc-900 border-b border-zinc-800 flex items-center px-2 gap-2">
                                <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                                <div className="flex-1 h-3 bg-zinc-800 rounded mx-2"></div>
                            </div>

                            {/* Hero Section Wireframe */}
                            <div className="h-24 bg-zinc-900/50 flex flex-col items-center justify-center gap-2 p-4 border-b border-border/10">
                                <div className="w-3/4 h-2 bg-muted-foreground/20 rounded-none"></div>
                                <div className="w-1/2 h-2 bg-muted-foreground/20 rounded-none"></div>
                                <div className="mt-2 w-16 h-4 bg-primary rounded-none"></div>
                            </div>

                            {/* Grid Content */}
                            <div className="flex-1 p-3 grid grid-cols-2 gap-2 bg-zinc-950/30">
                                <div className="bg-zinc-900 border border-zinc-800/50 aspect-square"></div>
                                <div className="bg-zinc-900 border border-zinc-800/50 aspect-square"></div>
                                <div className="bg-zinc-900 border border-zinc-800/50 aspect-square"></div>
                                <div className="bg-zinc-900 border border-zinc-800/50 aspect-square"></div>
                            </div>
                        </div>

                        {/* Reflection Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-40"></div>
                    </div>

                    {/* Minimal Shadow/Base */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-primary/20 blur-xl rounded-full"></div>
                </div>
            </div>
        </div>
    );
}
