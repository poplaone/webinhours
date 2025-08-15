import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Globe, Zap, ShoppingCart, Users } from 'lucide-react';
import AnimatedServiceCard from '@/components/animations/AnimatedServiceCard';
export const Services = () => {
  const services = [{
    icon: Globe,
    title: "Business Websites",
    description: "Professional corporate sites that establish credibility and drive leads. Includes contact forms, service pages, and SEO optimization.",
    features: ["Custom Design", "Contact Forms", "SEO Ready", "Mobile Responsive"],
    activeColor: "#8B5CF6",
    colors: ["#8B5CF6", "#A78BFA", "#DDD6FE"],
    price: "From $299"
  }, {
    icon: ShoppingCart,
    title: "E-commerce Stores",
    description: "Complete online stores with payment processing, inventory management, and conversion optimization to maximize sales.",
    features: ["Payment Gateway", "Inventory System", "Order Management", "Analytics"],
    activeColor: "#0EA5E9",
    colors: ["#E0F2FE", "#7DD3FC", "#0EA5E9"],
    price: "From $599"
  }, {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Responsive designs optimized for mobile users, ensuring perfect performance on all devices and screen sizes.",
    features: ["Touch Optimized", "Fast Loading", "App-like Feel", "Cross-browser"],
    activeColor: "#EAB308",
    colors: ["#FEF08A", "#FDE047", "#EAB308"],
    price: "Included"
  }, {
    icon: Users,
    title: "Landing Pages",
    description: "High-converting landing pages designed to capture leads and drive specific actions with compelling copy and design.",
    features: ["Lead Capture", "A/B Testing", "Analytics", "CRO Focused"],
    activeColor: "#E11D48",
    colors: ["#FECDD3", "#FDA4AF", "#E11D48"],
    price: "From $199"
  }, {
    icon: Code,
    title: "Custom Development",
    description: "Tailored web applications with advanced functionality, integrations, and custom features specific to your business needs.",
    features: ["API Integration", "Custom Features", "Database Design", "Scalable"],
    activeColor: "#7C3AED",
    colors: ["#DDD6FE", "#C4B5FD", "#7C3AED"],
    price: "From $899"
  }, {
    icon: Zap,
    title: "Performance Optimization",
    description: "Speed optimization, SEO enhancement, and technical improvements to boost rankings and user experience.",
    features: ["Speed Boost", "SEO Audit", "Core Web Vitals", "GTmetrix A+"],
    activeColor: "#059669",
    colors: ["#D1FAE5", "#6EE7B7", "#059669"],
    price: "From $149"
  }];
  return <section id="services" className="py-20 px-4 bg-card/30 backdrop-blur relative z-10 my-0">
      <div className="container mx-auto">
        <motion.div className="text-center mb-16" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }}>
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-6" initial={{
          opacity: 0,
          scale: 0.9
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }}>
            <span className="text-sm font-medium text-[#8B5CF6]">🚀 Our Services</span>
          </motion.div>
          
          <h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed Online</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto px-0 text-sm">
            From simple landing pages to complex e-commerce platforms, we deliver complete web solutions 
            that drive real business results. All projects include unlimited revisions and ongoing support.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 50
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: index * 0.1
        }} viewport={{
          once: true
        }} className="group">
              <div className="bg-card border border-border/40 rounded-xl p-6 h-full transition-all duration-300 hover:shadow-xl hover:border-[#8B5CF6]/30 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center`} style={{
                backgroundColor: `${service.activeColor}15`
              }}>
                    <service.icon className="h-6 w-6" style={{
                  color: service.activeColor
                }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold group-hover:text-[#8B5CF6] transition-colors">{service.title}</h3>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
                
                <div className="space-y-2">
                  {service.features.map((feature, idx) => <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full" style={{
                  backgroundColor: service.activeColor
                }}></div>
                      <span>{feature}</span>
                    </div>)}
                </div>
              </div>
            </motion.div>)}
        </div>

        {/* CTA Section */}
        <motion.div className="text-center mt-16" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }}>
          
        </motion.div>
      </div>
    </section>;
};