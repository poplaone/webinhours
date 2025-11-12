import React from 'react';
import { Code, Smartphone, Globe, Zap, ShoppingCart, Users } from 'lucide-react';
// Removed motion imports for better performance
export const Services = () => {
  const services = [{
    icon: Globe,
    title: "FREE Professional Website",
    description: "Get a complete, professional website with everything you need to start your online presence - completely FREE forever.",
    features: ["500+ Templates", "Mobile Responsive", "SSL Security", "Basic Support"],
    activeColor: "#10B981",
    colors: ["#D1FAE5", "#6EE7B7", "#10B981"],
    price: "100% FREE"
  }, {
    icon: Code,
    title: "Custom Design & Branding",
    description: "Make your website unique with custom colors, fonts, logos, and personalized design that matches your brand perfectly.",
    features: ["Custom Colors", "Logo Integration", "Brand Fonts", "Unlimited Revisions"],
    activeColor: "#3B82F6",
    colors: ["#DBEAFE", "#93C5FD", "#3B82F6"],
    price: "From $199"
  }, {
    icon: Zap,
    title: "SEO Optimization",
    description: "Get found on Google with professional SEO setup, keyword optimization, and local business listing management.",
    features: ["Google Rankings", "Local Listings", "Keyword Research", "Analytics Setup"],
    activeColor: "#8B5CF6",
    colors: ["#DDD6FE", "#C4B5FD", "#8B5CF6"],
    price: "From $149"
  }, {
    icon: Users,
    title: "Content Creation",
    description: "Professional content for your website, blog, and social media to engage customers and grow your business online.",
    features: ["Blog Writing", "Social Media Posts", "Email Content", "Product Copy"],
    activeColor: "#F59E0B",
    colors: ["#FEF3C7", "#FCD34D", "#F59E0B"],
    price: "$99/month"
  }, {
    icon: ShoppingCart,
    title: "E-commerce Setup",
    description: "Add online shopping to your free website with secure payment processing, inventory management, and order tracking.",
    features: ["Payment Processing", "Product Catalog", "Order Management", "Customer Accounts"],
    activeColor: "#EF4444",
    colors: ["#FEE2E2", "#FCA5A5", "#EF4444"],
    price: "From $299"
  }, {
    icon: Smartphone,
    title: "Advanced Features",
    description: "Add powerful functionality like appointment booking, member areas, live chat, and custom tools to grow your business.",
    features: ["Booking Systems", "Member Areas", "Live Chat", "Custom Forms"],
    activeColor: "#06B6D4",
    colors: ["#CFFAFE", "#67E8F9", "#06B6D4"],
    price: "From $199"
  }];
  return <section id="services" className="py-20 px-4 bg-card/30 backdrop-blur relative z-10 my-0">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-6">
            <span className="text-sm font-medium text-green-500">🆓 Free Website + Premium Services</span>
          </div>
          
          <h2 className="text-4xl font-bold mb-4">Start FREE, Upgrade When Ready</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto px-0 text-sm">
            Get your professional website completely FREE with no hidden costs. Choose from hundreds of templates
            and upgrade to premium services only when you need advanced features, custom design, or marketing support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group relative"
            >
              {/* Main card */}
              <div className="relative bg-card/80 backdrop-blur-sm border border-border/40 rounded-xl p-6 h-full hover:shadow-2xl hover:border-[#8B5CF6]/50 overflow-hidden">
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#8B5CF6]/5 opacity-0 group-hover:opacity-100"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl" 
                        style={{ backgroundColor: `${service.activeColor}15` }}
                      >
                        <service.icon 
                          className="h-7 w-7" 
                          style={{ color: service.activeColor }} 
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold group-hover:text-[#8B5CF6]">{service.title}</h3>
                        <div 
                          className="text-sm font-semibold px-2 py-1 rounded-full mt-1"
                          style={{ backgroundColor: `${service.activeColor}15`, color: service.activeColor }}
                        >
                          {service.price}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed text-sm group-hover:text-foreground/80">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-3 text-sm"
                      >
                        <div 
                          className="w-2 h-2 rounded-full shadow-sm" 
                          style={{ backgroundColor: service.activeColor }}
                        ></div>
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Hover action */}
                  <div 
                    className="mt-6 opacity-0 group-hover:opacity-100"
                  >
                    <button 
                      className="w-full py-2 px-4 rounded-lg text-sm font-medium hover:shadow-lg"
                      style={{ 
                        backgroundColor: `${service.activeColor}15`, 
                        color: service.activeColor,
                        border: `1px solid ${service.activeColor}30`
                      }}
                    >
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          
        </div>
      </div>
    </section>;
};