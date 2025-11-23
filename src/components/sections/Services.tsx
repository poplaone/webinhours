import React from 'react';
import { Palette, Search, PenTool, ShoppingBag, Sparkles, Globe2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { AnimatedServiceCard } from '@/components/ui/animated-service-card';
import customBrandingGif from '@/assets/custom-branding.gif';

type ViewAnimationProps = {
	delay?: number;
	className?: React.ComponentProps<typeof motion.div>['className'];
	children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <>{children}</>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', y: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', y: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

export const Services = () => {
  const services = [{
    icon: Globe2,
    tagline: "100% FREE",
    title: "FREE Professional Website",
    description: "Get a complete, professional website with everything you need to start your online presence - completely FREE forever.",
    keywords: "500+ Templates • Mobile Responsive • SSL Security • Basic Support"
  }, {
    icon: Palette,
    image: customBrandingGif,
    tagline: "From $199",
    title: "Custom Design & Branding",
    description: "Make your website unique with custom colors, fonts, logos, and personalized design that matches your brand perfectly.",
    keywords: "Custom Colors • Logo Integration • Brand Fonts • Unlimited Revisions"
  }, {
    icon: Search,
    tagline: "From $149",
    title: "SEO Optimization",
    description: "Get found on Google with professional SEO setup, keyword optimization, and local business listing management.",
    keywords: "Google Rankings • Local Listings • Keyword Research • Analytics Setup"
  }, {
    icon: PenTool,
    title: "Content Creation",
    description: "Professional content for your website, blog, and social media to engage customers and grow your business online.",
    features: ["Blog Writing", "Social Media Posts", "Email Content", "Product Copy"],
    price: "$99/month",
    images: [
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&auto=format&fit=crop&q=60"
    ]
  }, {
    icon: ShoppingBag,
    title: "E-commerce Setup",
    description: "Add online shopping to your free website with secure payment processing, inventory management, and order tracking.",
    features: ["Payment Processing", "Product Catalog", "Order Management", "Customer Accounts"],
    price: "From $299",
    images: [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=400&auto=format&fit=crop&q=60"
    ]
  }];
  return (
    <section id="services" className="py-20 px-4 relative z-10 my-0">
      <div className="container mx-auto w-full max-w-7xl space-y-8">
        <AnimatedContainer className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-green-500">🆓 Free Website + Premium Services</span>
          </div>
          
          <h2 className="text-3xl font-bold tracking-wide text-balance md:text-4xl lg:text-5xl xl:font-extrabold mb-4">
            Start FREE, Upgrade When Ready
          </h2>
          <p className="text-muted-foreground mt-4 text-sm tracking-wide text-balance md:text-base">
            Get your professional website completely FREE with no hidden costs. Choose from hundreds of templates
            and upgrade to premium services only when you need advanced features, custom design, or marketing support.
          </p>
        </AnimatedContainer>

        <div className="space-y-0">
          {services.slice(0, 3).map((service, i) => (
            <AnimatedContainer key={i} delay={0.4 + i * 0.1}>
              <AnimatedServiceCard service={service} index={i} />
            </AnimatedContainer>
          ))}
        </div>

        <AnimatedContainer
          delay={0.7}
          className="grid grid-cols-1 divide-x divide-y divide-border/50 border border-border/50 sm:grid-cols-2"
        >
          {services.slice(3).map((service, i) => (
            <AnimatedServiceCard key={i + 3} service={service} index={i + 3} />
          ))}
        </AnimatedContainer>
      </div>
    </section>
  );
};