import React from "react";
import { cn } from "@/lib/utils";
import { Palette, Type, LayoutTemplate, MousePointer2, Image as ImageIcon, Minus } from "lucide-react";

export function CustomBrandingVisuals({ className }: { className?: string }) {
    return (
        <div className={cn("w-full flex flex-col gap-4 p-0 sm:p-2", className)}>
            {/* Brand Identity Composition - Responsive Container */}
            {/* Mobile: Auto height, no aspect ratio enforcement to allow stacking. Desktop: Fixed aspect ratio. */}
            <div className="relative w-full min-h-[320px] sm:aspect-[2/1] rounded-xl overflow-hidden bg-gradient-to-br from-background/80 to-muted/30 border border-border/40 p-4 sm:p-6 flex items-center justify-center">

                {/* Subtle Static Background */}
                <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-primary/10 rounded-full blur-[60px] sm:blur-[80px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] bg-blue-500/10 rounded-full blur-[50px] sm:blur-[60px] translate-y-1/2 -translate-x-1/4" />
                </div>

                {/* Bento Grid Layout - Responsive Grid */}
                {/* Mobile: 1 Column. Tablet: 2 Columns. Desktop: 3 Columns. */}
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-lg">

                    {/* 1. Typography Card */}
                    {/* Mobile: Full width. Tablet: Spans 2 cols (full width). Desktop: Spans 2 cols. */}
                    <div className="col-span-1 sm:col-span-2 bg-card/90 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2 text-muted-foreground mb-3">
                            <Type className="h-3.5 w-3.5" />
                            <span className="text-[10px] font-semibold uppercase tracking-wider">Typography</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex flex-col">
                                <span className="text-xl sm:text-2xl font-serif font-bold text-foreground leading-tight">Brand Heading</span>
                                <span className="text-[10px] text-muted-foreground">Merriweather Bold</span>
                            </div>
                            <div className="h-px w-full bg-border/50" />
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground leading-relaxed">
                                    Clean and modern sans-serif for optimal readability across all devices.
                                </span>
                                <span className="text-[10px] text-muted-foreground mt-0.5">Inter Regular</span>
                            </div>
                        </div>
                    </div>

                    {/* 2. Color Palette */}
                    {/* Mobile: Full width. Tablet: Spans 1 col, Row span 2 (vertical sidebar). Desktop: Row span 2. */}
                    <div className="col-span-1 sm:row-span-2 bg-card/90 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-sm flex flex-col justify-between gap-3 sm:gap-0">
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                            <Palette className="h-3.5 w-3.5" />
                            <span className="text-[10px] font-semibold uppercase tracking-wider">Colors</span>
                        </div>
                        <div className="grid grid-cols-3 sm:flex sm:flex-col gap-2 sm:gap-3 sm:space-y-3">
                            <div className="space-y-1">
                                <div className="w-full h-8 sm:h-10 rounded-md bg-primary shadow-sm" />
                                <div className="hidden sm:flex justify-between text-[10px] text-muted-foreground">
                                    <span>Primary</span>
                                    <span className="font-mono opacity-70">#4F46E5</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="w-full h-8 sm:h-10 rounded-md bg-[#0EA5E9] shadow-sm" />
                                <div className="hidden sm:flex justify-between text-[10px] text-muted-foreground">
                                    <span>Accent</span>
                                    <span className="font-mono opacity-70">#0EA5E9</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="w-full h-8 sm:h-10 rounded-md bg-[#F43F5E] shadow-sm" />
                                <div className="hidden sm:flex justify-between text-[10px] text-muted-foreground">
                                    <span>Highlight</span>
                                    <span className="font-mono opacity-70">#F43F5E</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Iconography & UI Elements */}
                    {/* Mobile: Full width. Tablet: Spans 1 col (Bottom Right). Desktop: Bottom Right. */}
                    <div className="col-span-1 bg-card/90 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-sm flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground mb-3">
                            <ImageIcon className="h-3.5 w-3.5" />
                            <span className="text-[10px] font-semibold uppercase tracking-wider">Assets</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 place-items-center">
                            <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary"><MousePointer2 className="h-4 w-4" /></div>
                            <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary"><LayoutTemplate className="h-4 w-4" /></div>
                            <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary"><Minus className="h-4 w-4" /></div>
                        </div>
                        <div className="mt-3">
                            <div className="h-6 w-full rounded bg-primary flex items-center justify-center text-[10px] font-medium text-primary-foreground">
                                Button
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
