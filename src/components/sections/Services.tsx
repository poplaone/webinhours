import React from 'react';
import { Palette, Search, PenTool, ShoppingBag, Sparkles, Globe2, Check } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';

export const Services = () => {
  const services = [{
    icon: Globe2,
    title: "FREE Professional Website",
    description: "Get a complete, professional website with everything you need to start your online presence - completely FREE forever.",
    features: ["500+ Templates", "Mobile Responsive", "SSL Security", "Basic Support"],
    price: "100% FREE",
    color: "hsl(var(--background))",
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
    color: "#69e160",
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
    color: "#bc367d",
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
    color: "#ef8d36",
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
    color: "#57b8de",
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
    color: "#313cb9",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&auto=format&fit=crop&q=60"
    ]
  }];

  return (
    <section id="services" className="relative z-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center py-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            🆓 Free Website + Premium Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start FREE, Upgrade When Ready. Get your professional website completely FREE with no hidden costs.
          </p>
        </div>
      </div>

      <ScrollStack
        itemDistance={150}
        itemStackDistance={40}
        stackPosition="30%"
        scaleEndPosition="15%"
        baseScale={0.92}
        useWindowScroll={true}
      >
        {services.map((service, i) => (
          <ScrollStackItem key={i}>
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-2xl min-h-[500px] max-h-[600px] h-[70vh]">
              <div className="h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 rounded-xl bg-primary/10">
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
                    <div key={idx} className="aspect-video rounded-lg overflow-hidden">
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
