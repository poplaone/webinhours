import React from "react";
import { Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function TechStackCard({ className }: { className?: string }) {
    return (
        <div className={cn("relative flex flex-col md:flex-row gap-6 p-6 border border-border bg-card/60 rounded-xl hover:shadow-lg hover:border-primary/20 transition-all duration-300 overflow-hidden group min-h-[220px]", className)}>

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* TEXT CONTENT (Left / Top) */}
            <div className="relative z-10 flex flex-col justify-between flex-1 gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-500">
                            <Code2 className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Technology</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-cyan-500 transition-colors">
                        Modern Tech Stack
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                        Built with React, TypeScript & Tailwind for scalability. Future-proof code that scales with your business.
                    </p>
                </div>
            </div>

            {/* GRAPHIC CONTENT (Right / Bottom) */}
            <div className="relative z-10 flex-1 flex items-center justify-center md:justify-end min-h-[160px] md:min-h-auto">

                {/* Code Editor Window */}
                <div className="relative w-full max-w-[320px] shadow-2xl group-hover:scale-105 transition-transform duration-500">
                    {/* Editor Container */}
                    <div className="w-full bg-[#1e1e1e] rounded-xl border border-zinc-700 overflow-hidden shadow-xl">
                        {/* Editor Header */}
                        <div className="h-7 bg-[#2d2d2d] flex items-center px-3 gap-1.5 border-b border-zinc-700">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                            <span className="ml-2 text-[10px] text-zinc-400 font-mono">WebInHour.tsx</span>
                        </div>

                        {/* Code Content */}
                        <div className="p-4 font-mono text-[10px] md:text-xs text-zinc-300 leading-relaxed opacity-90">
                            <div className="text-purple-400">import <span className="text-blue-300">React</span> from <span className="text-orange-300">'react'</span>;</div>
                            <div className="text-purple-400">import <span className="text-blue-300">Next</span> from <span className="text-orange-300">'next'</span>;</div>
                            <br />
                            <div className="text-blue-400">export default <span className="text-yellow-300">function</span> <span className="text-yellow-100">App</span>() {'{'}</div>
                            <div className="pl-4 text-zinc-500">// Optimized for speed</div>
                            <div className="pl-4"><span className="text-purple-400">return</span> (</div>
                            <div className="pl-8 text-green-300">&lt;Performance /&gt;</div>
                            <div className="pl-4">);</div>
                            <div>{'}'}</div>
                        </div>
                    </div>

                    {/* Floating Tags (Optional decorations) */}
                    <div className="absolute -right-2 -bottom-2 bg-[#3178c6] text-white px-2 py-0.5 rounded text-[8px] font-bold shadow-lg">TS</div>
                    <div className="absolute -left-2 -top-2 bg-[#38bdf8] text-white px-2 py-0.5 rounded text-[8px] font-bold shadow-lg">React</div>
                </div>

            </div>
        </div>
    );
}
