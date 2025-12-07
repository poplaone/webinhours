import React from "react";
import { Clock, CheckCircle2, Rocket, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function FastDeliveryCard({ className }: { className?: string }) {
    return (
        <div className={cn("relative flex flex-col md:flex-row gap-6 p-6 border border-border bg-card/60 rounded-xl hover:shadow-lg hover:border-primary/20 transition-all duration-300 overflow-hidden group min-h-[220px]", className)}>

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* TEXT CONTENT (Left / Top) */}
            <div className="relative z-10 flex flex-col justify-between flex-1 gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-500">
                            <Clock className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fast Delivery</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-blue-500 transition-colors">
                        24-Hour Delivery Guarantee
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                        Your website ready in just one day. We streamline the process to get you online instantly.
                    </p>
                </div>

                <div className="hidden md:flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <Badge variant="outline" className="bg-blue-500/5 text-blue-600 border-blue-200 dark:border-blue-900">
                        <Timer className="w-3 h-3 mr-1" />
                        24h Target
                    </Badge>
                </div>
            </div>

            {/* GRAPHIC CONTENT (Right / Bottom) */}
            <div className="relative z-10 flex-1 flex items-center justify-center min-h-[140px] md:min-h-auto">
                {/* Timeline Visualization */}
                <div className="w-full bg-background/50 backdrop-blur-sm border border-border/60 rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-4 border-b border-border/50 pb-2">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Project Timeline</span>
                        <span className="text-[10px] bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full font-medium">Active</span>
                    </div>

                    <div className="relative space-y-0">
                        {/* Connecting Line */}
                        <div className="absolute left-[11px] top-2 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-blue-500/50 to-muted/20"></div>

                        {/* Step 1 */}
                        <div className="relative flex items-center gap-3 pb-4">
                            <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white shadow-md ring-2 ring-background">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                            <div>
                                <div className="text-xs font-semibold text-foreground">Order Received</div>
                                <div className="text-[10px] text-muted-foreground">Requirements gathered</div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative flex items-center gap-3 pb-4">
                            <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white shadow-md ring-2 ring-background">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                            <div>
                                <div className="text-xs font-semibold text-foreground">Development</div>
                                <div className="text-[10px] text-muted-foreground">Building & optimizing</div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative flex items-center gap-3">
                            <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white shadow-lg shadow-green-500/20 ring-2 ring-background animate-pulse">
                                <Rocket className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="text-xs font-bold text-foreground">Delivery</div>
                                    <div className="text-[10px] text-green-600 font-medium">Ready in 24h</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
