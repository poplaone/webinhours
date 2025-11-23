import React from 'react';
import { Palette, Search, PenTool, ShoppingBag, Sparkles, Globe2, Check } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';

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
    title: "FREE Professional Website",
    description: "Get a complete, professional website with everything you need to start your online presence - completely FREE forever.",
    features: ["500+ Templates", "Mobile Responsive", "SSL Security", "Basic Support"],
    price: "100% FREE",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=400&auto=format&fit=crop&q=60"
    ]
  }, {
    icon: Palette,
    title: "Custom Design & Branding",
    description: "Make your website unique with custom colors, fonts, logos, and personalized design that matches your brand perfectly.",
    features: ["Custom Colors", "Logo Integration", "Brand Fonts", "Unlimited Revisions"],
    price: "From $199",
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&auto=format&fit=crop&q=60"
    ]
  }, {
    icon: Search,
    title: "SEO Optimization",
    description: "Get found on Google with professional SEO setup, keyword optimization, and local business listing management.",
    features: ["Google Rankings", "Local Listings", "Keyword Research", "Analytics Setup"],
    price: "From $149",
    images: [
      "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=400&auto=format&fit=crop&q=60"
    ]
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
  }, {
    icon: Sparkles,
    title: "Advanced Features",
    description: "Add powerful functionality like appointment booking, member areas, live chat, and custom tools to grow your business.",
    features: ["Booking Systems", "Member Areas", "Live Chat", "Custom Forms"],
    price: "From $199",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&auto=format&fit=crop&q=60"
    ]
  }];
  return (
    <section id="services" className="relative z-10">
      <div className="py-20 px-4 container mx-auto w-full max-w-6xl space-y-8">
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
      </div>

      <ScrollStack
        itemDistance={150}
        itemStackDistance={40}
        baseScale={0.9}
        stackPosition="45%"
        scaleEndPosition="20%"
        useWindowScroll
      >
        {services.map((service, i) => (
          <ScrollStackItem key={i}>
            <div className="bg-card transition-colors h-full flex flex-col">
              <div className="p-6 md:p-8 flex-1">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <service.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl md:text-3xl font-bold text-primary">{service.price}</p>
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 text-sm md:text-base">{service.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-auto">
                  {service.images.map((img, idx) => (
                    <div key={idx} className="aspect-video rounded-lg overflow-hidden border border-border">
                      <img 
                        src={img} 
                        alt={`${service.title} preview ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
};