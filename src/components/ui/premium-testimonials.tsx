
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles } from 'lucide-react';
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
    text: "WebInHours delivered our project in record time with exceptional quality. The website exceeded our expectations and our conversion rate increased by 250%.",
    results: ["Record delivery time", "250% conversion boost", "Professional quality"]
  },
  {
    name: "Michael Chen",
    role: "CTO, Digital Solutions",
    company: "Digital Solutions",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "The team's expertise and attention to detail exceeded our expectations. Our new e-commerce platform is fast, beautiful, and converts incredibly well.",
    results: ["Lightning fast", "Beautiful design", "High conversion"]
  },
  {
    name: "Elena Rodriguez",
    role: "Founder, StartupCo",
    company: "StartupCo",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "From concept to launch in just 48 hours! The mobile-first design is perfect and our users love the seamless experience across all devices.",
    results: ["48-hour delivery", "Mobile-first design", "Seamless UX"]
  },
  {
    name: "David Kim",
    role: "Marketing Director, GrowthLab",
    company: "GrowthLab",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Outstanding web development service! The SEO optimization and performance improvements led to 180% increase in organic traffic within the first month.",
    results: ["180% traffic growth", "SEO optimized", "Fast performance"]
  },
  {
    name: "Lisa Thompson",
    role: "Director, InnovateCorp",
    company: "InnovateCorp",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Exceptional web development that actually works. The custom features and integrations saved us months of development time. Best investment we've made.",
    results: ["Custom features", "Time savings", "High ROI"]
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
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient mesh */}
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
        
        {/* Moving light orbs */}
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

        {/* Floating particles */}
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
        {/* Header */}
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
              ✨ Client Success Stories
            </span>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </motion.div>

          <motion.h2 
            className="text-4xl font-bold mb-4"
            variants={fadeInUp}
          >
            What Our Clients Say
          </motion.h2>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Don't just take our word for it - hear from our satisfied clients
          </motion.p>
        </motion.div>

        {/* Desktop: Multiple testimonials grid */}
        <div className="hidden lg:block mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <TestimonialCard 
                key={index}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Mobile: Single testimonial carousel */}
        <TestimonialCarousel testimonials={testimonials} />

        {/* Stats Section */}
        <StatsSection />
      </motion.div>
    </section>
  );
}
