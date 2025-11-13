import React from 'react';
import { Code, Smartphone, Globe, Zap, ShoppingCart, Users } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { FeatureCard } from '@/components/ui/grid-feature-cards';

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
    icon: Globe,
    title: "FREE Professional Website",
    description: "Get a complete, professional website with everything you need to start your online presence - completely FREE forever.",
    features: ["500+ Templates", "Mobile Responsive", "SSL Security", "Basic Support"],
    price: "100% FREE"
  }, {
    icon: Code,
    title: "Custom Design & Branding",
    description: "Make your website unique with custom colors, fonts, logos, and personalized design that matches your brand perfectly.",
    features: ["Custom Colors", "Logo Integration", "Brand Fonts", "Unlimited Revisions"],
    price: "From $199"
  }, {
    icon: Zap,
    title: "SEO Optimization",
    description: "Get found on Google with professional SEO setup, keyword optimization, and local business listing management.",
    features: ["Google Rankings", "Local Listings", "Keyword Research", "Analytics Setup"],
    price: "From $149"
  }, {
    icon: Users,
    title: "Content Creation",
    description: "Professional content for your website, blog, and social media to engage customers and grow your business online.",
    features: ["Blog Writing", "Social Media Posts", "Email Content", "Product Copy"],
    price: "$99/month"
  }, {
    icon: ShoppingCart,
    title: "E-commerce Setup",
    description: "Add online shopping to your free website with secure payment processing, inventory management, and order tracking.",
    features: ["Payment Processing", "Product Catalog", "Order Management", "Customer Accounts"],
    price: "From $299"
  }, {
    icon: Smartphone,
    title: "Advanced Features",
    description: "Add powerful functionality like appointment booking, member areas, live chat, and custom tools to grow your business.",
    features: ["Booking Systems", "Member Areas", "Live Chat", "Custom Forms"],
    price: "From $199"
  }];
  return (
    <section id="services" className="py-20 px-4 relative z-10 my-0">
      <div className="container mx-auto w-full max-w-6xl space-y-8">
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

        <AnimatedContainer
          delay={0.4}
          className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed sm:grid-cols-2 md:grid-cols-3"
        >
          {services.map((service, i) => (
            <FeatureCard key={i} feature={service} />
          ))}
        </AnimatedContainer>
      </div>
    </section>
  );
};