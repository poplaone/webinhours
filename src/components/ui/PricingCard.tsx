
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface PricingPlan {
    name: string;
    icon: LucideIcon;
    price: string;
    period: string;
    description: string;
    features: string[];
    popular: boolean;
    cta: string;
    action: () => void;
    isPaid: boolean;
}

interface PricingCardProps {
    plan: PricingPlan;
    loadingPlan: string | null;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, loadingPlan }) => {
    const isPopular = plan.popular;
    const isFree = plan.price === "Free";
    const isContact = plan.price === "Contact";

    return (
        <div
            className={cn(
                "group relative rounded-2xl p-[1px] transition-all duration-300",
                isPopular
                    ? "bg-gradient-to-br from-primary via-purple-500 to-blue-500 scale-[1.02] z-10"
                    : "bg-border/50 hover:bg-gradient-to-br hover:from-primary/50 hover:to-purple-500/50"
            )}
        >
            {/* Popular Badge */}
            {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <Badge className="bg-primary text-primary-foreground shadow-lg px-4 py-1 text-xs font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Most Popular
                    </Badge>
                </div>
            )}

            <div className={cn(
                "relative h-full rounded-2xl p-6 flex flex-col",
                "bg-background",
                isPopular && "shadow-2xl shadow-primary/20"
            )}>
                {/* Icon & Name */}
                <div className="flex items-center gap-3 mb-4">
                    <div className={cn(
                        "p-2.5 rounded-xl",
                        isPopular
                            ? "bg-gradient-to-br from-primary to-purple-600 text-white"
                            : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                    )}>
                        <plan.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                </div>

                {/* Price */}
                <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                        <span className={cn(
                            "text-4xl font-bold",
                            isPopular ? "text-primary" : "text-foreground"
                        )}>
                            {plan.price}
                        </span>
                        {!isFree && !isContact && (
                            <span className="text-sm text-muted-foreground">/{plan.period}</span>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-6 flex-grow">
                    {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                            <div className={cn(
                                "mt-0.5 rounded-full p-0.5",
                                isPopular ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                            )}>
                                <Check className="h-3 w-3" />
                            </div>
                            <span className="text-muted-foreground">{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                <Button
                    className={cn(
                        "w-full mt-auto transition-all duration-300 group/btn",
                        isPopular
                            ? "bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg shadow-primary/25"
                            : "hover:bg-primary hover:text-primary-foreground"
                    )}
                    variant={isPopular ? "default" : "outline"}
                    onClick={plan.action}
                    disabled={plan.isPaid && loadingPlan === plan.name}
                >
                    {plan.isPaid && loadingPlan === plan.name ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            {plan.cta}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};
