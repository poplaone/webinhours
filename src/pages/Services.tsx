import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Building2, Camera, FileText, Smartphone, Zap, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { ProjectCalculator } from '@/components/calculator/ProjectCalculator';
const Services = () => {
  const navigate = useNavigate();
  const services = [{
    icon: ShoppingCart,
    title: "E-commerce Websites",
    description: "Complete online stores with payment processing, inventory management, and customer accounts",
    price: "From $599",
    timeline: "48 hours",
    features: ["Stripe/PayPal integration", "Product catalog management", "Customer account system", "Order tracking", "Mobile-first design", "SEO optimization"],
    popular: true,
    slug: "ecommerce"
  }, {
    icon: Building2,
    title: "Business Websites",
    description: "Professional websites for businesses with booking systems and client portals",
    price: "From $299",
    timeline: "24 hours",
    features: ["Professional design", "Contact forms", "Appointment booking", "Service pages", "Client testimonials", "Google Analytics"],
    popular: false,
    slug: "business"
  }, {
    icon: Camera,
    title: "Portfolio Websites",
    description: "Stunning portfolios for creatives, photographers, and designers",
    price: "From $199",
    timeline: "12 hours",
    features: ["Image galleries", "Project showcases", "Client testimonials", "Contact forms", "Social media integration", "Fast loading"],
    popular: false,
    slug: "portfolio"
  }, {
    icon: FileText,
    title: "Landing Pages",
    description: "High-converting landing pages for marketing campaigns and lead generation",
    price: "From $149",
    timeline: "12 hours",
    features: ["Conversion optimization", "A/B testing ready", "Lead capture forms", "Analytics integration", "Mobile responsive", "Fast loading"],
    popular: false,
    slug: "landing"
  }, {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Websites designed specifically for mobile users with app-like experience",
    price: "From $399",
    timeline: "36 hours",
    features: ["Progressive Web App", "Touch-optimized", "Offline functionality", "Push notifications", "App store ready", "Native feel"],
    popular: false,
    slug: "mobile"
  }, {
    icon: Zap,
    title: "Custom Development",
    description: "Tailored web applications with specific functionality and integrations",
    price: "From $999",
    timeline: "72 hours",
    features: ["Custom functionality", "API integrations", "Database design", "User authentication", "Admin dashboard", "Scalable architecture"],
    popular: false,
    slug: "custom"
  }];
  return <AppLayout>
      <SEOHead title="Professional Website Development Services - Fast & Affordable" description="Professional website development services delivered in 24-48 hours. E-commerce, business, portfolio websites with mobile optimization, SEO, and hosting included." keywords="website development services, professional web design, e-commerce websites, business websites, portfolio websites, mobile websites" />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div className="text-center mb-16" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>
            
            
            
            {/* Quick stats */}
            
          </motion.div>

          {/* Services Grid */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }}>
            {services.map((service, index) => <motion.div key={service.slug} initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} className="relative group">
                <Card className={`h-full border-border/40 bg-card/50 backdrop-blur hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${service.popular ? 'border-[#8B5CF6]/30 ring-1 ring-[#8B5CF6]/20' : 'hover:border-[#8B5CF6]/30'}`}>
                  {service.popular && <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#8B5CF6] text-white">
                      Most Popular
                    </Badge>}
                  
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-[#8B5CF6]/10 rounded-xl mb-4 group-hover:bg-[#8B5CF6]/20 transition-colors">
                        <service.icon className="h-8 w-8 text-[#8B5CF6]" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-[#8B5CF6]">{service.price}</span>
                        <span className="text-sm text-muted-foreground">{service.timeline}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium mb-3">What's included:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>)}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <Button className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] group/btn" onClick={() => navigate('/marketplace')}>
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Button>
                      <Button variant="outline" className="w-full hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6]" onClick={() => navigate('/contact')}>
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>)}
          </motion.div>

          {/* Project Calculator */}
          <ProjectCalculator />

          {/* Why Choose Us */}
          <motion.div className="mt-20" initial={{
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
            <Card className="p-8 border-[#8B5CF6]/20 bg-gradient-to-br from-[#8B5CF6]/5 to-[#A78BFA]/5">
              <CardContent className="p-0">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-4">Why Choose WebInHours?</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    We've perfected the art of rapid website development without compromising on quality
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[{
                  title: "Lightning Fast",
                  desc: "24-48 hour delivery guaranteed",
                  icon: Zap
                }, {
                  title: "Professional Quality",
                  desc: "No templates, custom development",
                  icon: Star
                }, {
                  title: "All Inclusive",
                  desc: "Hosting, SSL, mobile optimization",
                  icon: CheckCircle
                }, {
                  title: "Money-Back Guarantee",
                  desc: "30-day satisfaction guarantee",
                  icon: Building2
                }].map((item, index) => <div key={index} className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-[#8B5CF6]/10 rounded-lg mb-3">
                        <item.icon className="h-6 w-6 text-[#8B5CF6]" />
                      </div>
                      <h4 className="font-semibold mb-2">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AppLayout>;
};
export default Services;