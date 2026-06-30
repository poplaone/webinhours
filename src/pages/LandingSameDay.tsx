import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Hero } from '@/components/sections/Hero';
import { PricingCard, PricingPlan } from '@/components/ui/PricingCard';
import { Zap, Crown, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingSameDay() {
    const navigate = useNavigate();

    const handleContactForPlan = (planName: string, price: string, features: string[]) => {
        const params = new URLSearchParams({ plan: planName, price, features: features.join('|') });
        navigate(`/contact?${params.toString()}`);
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
            action: () => handleContactForPlan("Same Day Rush", "$299", ["Guaranteed Same Day Delivery", "Priority Queue Status", "Emergency Brand Setup", "Rapid Content Entry", "Live Today"]),
            isPaid: false
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
            action: () => handleContactForPlan("Custom Pro", "$599", ["Deep Customization", "Strategic Planning", "SEO Optimization", "Design Revisions", "Consultation Included"]),
            isPaid: false
        }
    ];

    return (
        <AppLayout>
            <SEOHead
                title="Same Day Website Delivery | Emergency Web Design Service"
                description="Need a website right now? Our Same Day Rush service delivers professional, fully customized websites by the end of the day. Urgent service available."
                keywords="same day website, emergency web design, rush website delivery, urgent website builder, fast turned website, website tonight"
                canonicalUrl="https://webinhour.com/same-day-delivery"
            />

            {/* Urgency-Focused Hero */}
            <Hero
                headline={
                    <>
                        Website crashed?<br className="hidden md:block" />
                        <span className="text-foreground"> We'll fix it today.</span>
                    </>
                }
                description={
                    <>
                        When your launch gets moved up or your old site dies, you don't have weeks to wait.
                        We build professional, production-ready sites by <strong>the end of the day</strong>.
                    </>
                }
            />

            <div className="py-20 px-4 bg-background">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                                Emergency Delivery
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            If you need it live tonight, pick the rush option. We drop everything and build your site.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 justify-center max-w-5xl mx-auto">
                        {plans.map((plan, index) => (
                            <PricingCard key={index} plan={plan} loadingPlan={null} />
                        ))}
                    </div>
                </div>
            </div>

        </AppLayout>
    );
}
