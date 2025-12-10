import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Hero } from '@/components/sections/Hero';
import { PricingCard, PricingPlan } from '@/components/ui/PricingCard';
import { Zap, Star, Crown, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDodoPayment } from '@/hooks/useDodoPayment';

export default function Landing24Hour() {
    const navigate = useNavigate();
    const { initiateCheckout, isLoading } = useDodoPayment();
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

    // Dodo Payments Product IDs (Same as Pricing.tsx)
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
            name: "Template",
            icon: Zap,
            price: "Free",
            period: "forever",
            description: "Start immediately. Download a professional template now.",
            features: [
                "Instant Download",
                "SEO-Ready Structure",
                "Mobile Optimized",
                "Commercial License"
            ],
            popular: false,
            cta: "Get Started Now",
            action: () => navigate('/websites'),
            isPaid: false
        },
        {
            name: "24-Hour Custom",
            icon: Star,
            price: "$299",
            period: "project",
            description: "We customize your website and launch it in 24 hours.",
            features: [
                "Delivered in 24 Hours",
                "Professional Customization",
                "Logo & Branding Setup",
                "Content Upload",
                "Live by Tomorrow"
            ],
            popular: true, // Specific highlight for this landing page
            cta: "Start 24-Hour Build",
            action: () => handlePurchase("Custom Lite"),
            isPaid: true
        },
        {
            name: "Custom Pro",
            icon: Crown,
            price: "$599",
            period: "project",
            description: "For more complex requirements needing deep customization.",
            features: [
                "Advanced Features",
                "Database Integration",
                "Complex Forms",
                "SEO Deep Dive",
                "30-Day Support"
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
                title="Website in 24 Hours | Same Day Web Design & Delivery"
                description="Need a website today? We deliver professional, custom websites in 24 hours. No waiting weeks - get online with WebInHours same-day service."
                keywords="website in 24 hours, same day website, urgent web design, fast website builder, emergency website service, get website today"
                canonicalUrl="https://webinhours.com/24-hour-website"
            />

            {/* Speed-Focused Hero */}
            <Hero
                headline={
                    <>
                        Getting Your Business Online<br className="hidden md:block" />
                        <span className="text-foreground">In Just 24 Hours</span>
                    </>
                }
                description={
                    <>
                        Stop waiting weeks for agencies. We combine professional templates with
                        expert same-day customization to launch your brand <strong>today</strong>.
                    </>
                }
            />

            <div className="py-20 px-4 bg-background">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                                Choose Your Speed
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Need it instantly? Grab a template. Need it custom? We'll build it by tomorrow.
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
