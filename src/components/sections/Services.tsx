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
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 50 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: index * 0.1 }} 
              viewport={{ once: true }} 
              className="group relative"
              whileHover={{ y: -8 }}
            >
              {/* Glowing background effect */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
                style={{ backgroundColor: service.activeColor }}
              ></div>
              
              {/* Main card */}
              <div className="relative bg-card/80 backdrop-blur-sm border border-border/40 rounded-xl p-6 h-full transition-all duration-500 hover:shadow-2xl hover:border-[#8B5CF6]/50 overflow-hidden">
                
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#8B5CF6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300" 
                        style={{ backgroundColor: `${service.activeColor}15` }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <service.icon 
                          className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" 
                          style={{ color: service.activeColor }} 
                        />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold group-hover:text-[#8B5CF6] transition-colors duration-300">{service.title}</h3>
                        <div 
                          className="text-sm font-semibold px-2 py-1 rounded-full mt-1"
                          style={{ backgroundColor: `${service.activeColor}15`, color: service.activeColor }}
                        >
                          {service.price}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed text-sm group-hover:text-foreground/80 transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <motion.div 
                        key={idx} 
                        className="flex items-center gap-3 text-sm group-hover:transform group-hover:translate-x-1 transition-all duration-300"
                        initial={{ opacity: 0.7 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div 
                          className="w-2 h-2 rounded-full shadow-sm transition-all duration-300 group-hover:w-2.5 group-hover:h-2.5" 
                          style={{ backgroundColor: service.activeColor }}
                        ></div>
                        <span className="font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Hover action */}
                  <motion.div 
                    className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    initial={{ y: 10 }}
                    whileInView={{ y: 0 }}
                  >
                    <button 
                      className="w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg"
                      style={{ 
                        backgroundColor: `${service.activeColor}15`, 
                        color: service.activeColor,
                        border: `1px solid ${service.activeColor}30`
                      }}
                    >
                      Learn More →
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
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