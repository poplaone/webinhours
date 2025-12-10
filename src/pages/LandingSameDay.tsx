import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Hero } from '@/components/sections/Hero';
import { PricingCard, PricingPlan } from '@/components/ui/PricingCard';
import { Zap, Star, Crown, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDodoPayment } from '@/hooks/useDodoPayment';

export default function LandingSameDay() {
    const navigate = useNavigate();
    const { initiateCheckout, isLoading } = useDodoPayment();
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

    // Dodo Payments Product IDs
    const DODO_PRODUCTS = {
        'Custom Lite': 'pdt_4VbxIlVYONBlZcu91PSu5',
        'Custom Pro': 'pdt_Lp3H6UAAng5cDeHMYNwqR',
    } as const;

    const handlePurchase = async (planName: keyof typeof DODO_PRODUCTS) => {
        setLoadingPlan(planName);
        await initiateCheckout(DODO_PRODUCTS[planName], 'USD');
        setLoadingPlan(null);
    };

    const plans: PricingPlan[] = [
        {
            name: "Instant Template",
            icon: Zap,
            price: "Free",
            period: "forever",
            description: "Download and deploy in minutes. The fastest option.",
            features: [
                "Instant Access",
                "Pre-built Structure",
                "Self-Service Setup",
                "No Waiting Time"
            ],
            popular: false,
            cta: "Download Now",
            action: () => navigate('/websites'),
            isPaid: false
        },
        {
            name: "Same Day Rush",
            icon: Clock,
            price: "$299",
            period: "project",
            description: "Priority customization service delivering by EOD.",
            features: [
                "Guaranteed Same Day Delivery",
                "Priority Queue Status",
                "Emergency Brand Setup",
                "Rapid Content Entry",
                "Live Today"
            ],
            popular: true,
            cta: "Order Rush Service",
            action: () => handlePurchase("Custom Lite"), // Maps to Custom Lite backend
            isPaid: true
        },
        {
            name: "Custom Pro",
            icon: Crown,
            price: "$599",
            period: "project",
            description: "Full service with deep customization (2-3 days).",
            features: [
                "Deep Customization",
                "Strategic Planning",
                "SEO Optimization",
                "Design Revisions",
                "Consultation Included"
            ],
            popular: false,
            cta: "Get Custom Pro",
            action: () => handlePurchase("Custom Pro"),
            isPaid: true
        }
    ];

    return (
        <AppLayout>
            <SEOHead
                title="Same Day Website Delivery | Emergency Web Design Service"
                description="Need a website right now? Our Same Day Rush service delivers professional, fully customized websites by the end of the day. Urgent service available."
                keywords="same day website, emergency web design, rush website delivery, urgent website builder, fast turned website, website tonight"
                canonicalUrl="https://webinhours.com/same-day-delivery"
            />

            {/* Urgency-Focused Hero */}
            <Hero
                headline={
                    <>
                        Need a Professional Website<br className="hidden md:block" />
                        <span className="text-foreground"> delivered Today?</span>
                    </>
                }
                description={
                    <>
                        We specialize in <strong>emergency & rush delivery</strong>.
                        Select our Same Day service to skip the queue and get your business online before the sun goes down.
                    </>
                }
            />

            <div className="py-20 px-4 bg-background">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                                Rush Delivery Options
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Time is money. We don't waste either. Choose the speed that fits your deadline.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 justify-center max-w-5xl mx-auto">
                        {plans.map((plan, index) => (
                            <PricingCard key={index} plan={plan} loadingPlan={loadingPlan} />
                        ))}
                    </div>
                </div>
            </div>

        </AppLayout>
    );
}
