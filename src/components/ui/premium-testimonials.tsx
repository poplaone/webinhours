
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, ExternalLink, TrendingUp } from 'lucide-react';
import { TestimonialCard } from './testimonials/TestimonialCard';
import { TestimonialCarousel } from './testimonials/TestimonialCarousel';
import { StatsSection } from './testimonials/StatsSection';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    company: "TechStart",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "WebInHours delivered our SaaS landing page in just 18 hours. The conversion rate jumped from 2.1% to 5.3% within the first week. The mobile optimization alone brought in 40% more leads.",
    results: ["18-hour delivery", "250% conversion boost", "40% more mobile leads"],
    projectType: "SaaS Landing Page",
    websiteUrl: "https://techstart.example.com",
    businessImpact: "Generated $50K in new revenue within 30 days"
  },
  {
    name: "Michael Chen",
    role: "Founder, Digital Marketing Agency",
    company: "Digital Solutions",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "As a marketing agency, I know good web design. WebInHours exceeded my expectations with a custom e-commerce site that loads in under 2 seconds and converts at 8.7%. Client bookings increased 300%.",
    results: ["Sub-2s load time", "8.7% conversion rate", "300% booking increase"],
    projectType: "E-commerce Store",
    websiteUrl: "https://digitalsolutions.example.com",
    businessImpact: "Scaled from $20K to $80K monthly revenue"
  },
  {
    name: "Elena Rodriguez",
    role: "Restaurant Owner",
    company: "Bella Vista Restaurant",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Needed an online ordering system fast during COVID. WebInHours built a complete restaurant website with ordering in 20 hours. Online orders now represent 60% of our revenue - saved our business!",
    results: ["20-hour delivery", "60% online revenue", "Business saved"],
    projectType: "Restaurant Website + Ordering",
    websiteUrl: "https://bellavista.example.com",
    businessImpact: "Maintained revenue during pandemic, now 40% above pre-COVID levels"
  },
  {
    name: "David Kim",
    role: "Marketing Director",
    company: "GrowthLab Analytics",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "The SEO optimization was incredible. Our B2B site went from page 3 to ranking #1-3 for 12 key terms within 60 days. Organic traffic increased 340% and qualified leads are up 180%.",
    results: ["340% traffic growth", "180% more leads", "#1-3 rankings"],
    projectType: "B2B Corporate Website",
    websiteUrl: "https://growthlab.example.com",
    businessImpact: "Reduced customer acquisition cost by 60%"
  },
  {
    name: "Lisa Thompson",
    role: "E-commerce Entrepreneur",
    company: "Handmade Crafts Co",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Shopify was too limiting. WebInHours built a custom e-commerce platform with inventory management and analytics in 30 hours. Sales increased 220% and customer retention improved 85%.",
    results: ["220% sales increase", "85% better retention", "Custom features"],
    projectType: "Custom E-commerce Platform",
    websiteUrl: "https://handmadecrafts.example.com",
    businessImpact: "Grew from $5K to $35K monthly sales in 3 months"
  },
  {
    name: "James Wilson",
    role: "Real Estate Agent",
    company: "Premier Properties",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "The property showcase website with virtual tours and lead capture forms generated 45 qualified leads in the first month. Closed 3 high-value deals directly from the website. ROI was 800%.",
    results: ["45 qualified leads", "3 deals closed", "800% ROI"],
    projectType: "Real Estate Showcase",
    websiteUrl: "https://premierproperties.example.com",
    businessImpact: "Generated $180K in commissions from website leads"
  }
];

export function PremiumTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section id="testimonials" className="relative py-20 bg-card/30 backdrop-blur overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/[0.08] via-[#A78BFA]/[0.05] to-[#DDD6FE]/[0.08]"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity
          }}
          style={{
            backgroundSize: '400% 400%'
          }}
        />
        
        <motion.div
          className="absolute top-1/3 left-1/5 w-72 h-72 bg-[#8B5CF6]/15 rounded-full blur-3xl"
          animate={{
            x: [0, 150, 0],
            y: [0, 80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-[#A78BFA]/15 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity
          }}
        />

        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-foreground/30 rounded-full"
            style={{
              left: `${15 + (i * 7)}%`,
              top: `${25 + (i * 5)}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <motion.div 
        ref={containerRef}
        className="relative z-10 container mx-auto px-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-card/50 border border-border/40 backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05, borderColor: "hsl(var(--border))" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="h-4 w-4 text-[#8B5CF6]" />
            </motion.div>
            <span className="text-sm font-medium text-muted-foreground">
              ✨ Real Results from Real Businesses
            </span>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </motion.div>

          <motion.h2 
            className="text-4xl font-bold mb-4"
            variants={fadeInUp}
          >
            Success Stories That Speak Volumes
          </motion.h2>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            See how businesses like yours achieved remarkable growth with professional websites 
            delivered in hours, not weeks. Real metrics, real impact, real success.
          </motion.p>
        </motion.div>

        {/* Desktop: Multiple testimonials grid */}
        <div className="hidden lg:block mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-card border border-border/40 rounded-xl p-6 h-full hover:shadow-xl hover:border-[#8B5CF6]/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-[#8B5CF6] font-medium">{testimonial.projectType}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-4 h-4 text-yellow-400 fill-current">★</div>
                    ))}
                  </div>
                  
                  <p className="text-foreground mb-4 leading-relaxed">{testimonial.text}</p>
                  
                  <div className="space-y-2 mb-4">
                    {testimonial.results.map((result, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-green-600 font-medium">{result}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-border/40">
                    <p className="text-xs text-muted-foreground mb-2">Business Impact:</p>
                    <p className="text-sm font-medium text-[#8B5CF6]">{testimonial.businessImpact}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: Carousel */}
        <TestimonialCarousel testimonials={testimonials} />

        {/* Updated Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
          variants={staggerContainer}
        >
          {[
            { number: "500+", label: "Websites Delivered", detail: "Across 50+ industries" },
            { number: "98.7%", label: "Client Satisfaction", detail: "Based on 200+ reviews" },
            { number: "18hrs", label: "Average Delivery", detail: "Fastest: 12 hours" },
            { number: "340%", label: "Avg Growth Boost", detail: "Traffic & conversions" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold text-[#8B5CF6] mb-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-foreground font-medium mb-1 group-hover:text-[#8B5CF6] transition-colors">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat.detail}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
