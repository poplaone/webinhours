
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Quote, Star, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45
    })
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.23, 0.86, 0.39, 0.96] 
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

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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
            repeat: Infinity,
            ease: "linear"
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
            repeat: Infinity,
            ease: "easeInOut"
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
            repeat: Infinity,
            ease: "easeInOut"
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
              ease: "easeInOut",
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
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
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

        {/* Desktop: Multiple testimonials grid, Mobile: Single carousel */}
        <div className="hidden lg:block mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative h-full bg-card/50 backdrop-blur-xl rounded-2xl border border-border/40 p-6 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-500">
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/[0.08] via-[#A78BFA]/[0.05] to-[#DDD6FE]/[0.08] rounded-2xl"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      backgroundSize: '300% 300%'
                    }}
                  />

                  {/* Quote icon */}
                  <motion.div
                    className="absolute top-4 right-4 opacity-20"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Quote className="w-8 h-8 text-foreground" />
                  </motion.div>

                  <div className="relative z-10 h-full flex flex-col">
                    {/* User Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border/40 relative">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </motion.div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {testimonial.name}
                        </h3>
                        <p className="text-[#8B5CF6] text-sm font-medium">
                          {testimonial.role}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                    
                    {/* Star Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1, duration: 0.3 }}
                        >
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Content */}
                    <motion.blockquote 
                      className="text-muted-foreground mb-4 flex-1 group-hover:text-foreground/90 transition-colors duration-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      "{testimonial.text}"
                    </motion.blockquote>

                    {/* Results */}
                    <div className="grid grid-cols-1 gap-2">
                      {testimonial.results.map((result, i) => (
                        <motion.div
                          key={i}
                          className="bg-card/50 rounded-lg p-2 border border-border/20 backdrop-blur-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                          whileHover={{ backgroundColor: "hsl(var(--card))" }}
                        >
                          <span className="text-xs text-muted-foreground font-medium">
                            {result}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: Single testimonial carousel */}
        <div className="lg:hidden relative max-w-4xl mx-auto mb-16">
          <div className="relative h-[500px] perspective-1000">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                  rotateY: { duration: 0.6 }
                }}
                className="absolute inset-0"
              >
                <div className="relative h-full bg-card/50 backdrop-blur-xl rounded-3xl border border-border/40 p-8 overflow-hidden group">
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/[0.08] via-[#A78BFA]/[0.05] to-[#DDD6FE]/[0.08] rounded-3xl"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      backgroundSize: '300% 300%'
                    }}
                  />

                  {/* Quote icon */}
                  <motion.div
                    className="absolute top-8 right-8 opacity-20"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Quote className="w-16 h-16 text-foreground" />
                  </motion.div>

                  <div className="relative z-10 h-full flex flex-col items-center text-center">
                    {/* User Info */}
                    <div className="mb-6">
                      <motion.div
                        className="relative mb-4"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-border/40 relative">
                          <img 
                            src={testimonials[currentIndex].avatar} 
                            alt={testimonials[currentIndex].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </motion.div>

                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {testimonials[currentIndex].name}
                      </h3>
                      <p className="text-[#8B5CF6] mb-1 font-medium">
                        {testimonials[currentIndex].role}
                      </p>
                      <p className="text-muted-foreground mb-4">
                        {testimonials[currentIndex].company}
                      </p>
                      
                      {/* Star Rating */}
                      <div className="flex justify-center gap-1 mb-6">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.3 }}
                          >
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <motion.blockquote 
                      className="text-lg text-muted-foreground leading-relaxed mb-6 flex-1 group-hover:text-foreground/90 transition-colors duration-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      "{testimonials[currentIndex].text}"
                    </motion.blockquote>

                    {/* Results */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                      {testimonials[currentIndex].results.map((result, i) => (
                        <motion.div
                          key={i}
                          className="bg-card/50 rounded-lg p-3 border border-border/20 backdrop-blur-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                          whileHover={{ backgroundColor: "hsl(var(--card))" }}
                        >
                          <span className="text-sm text-muted-foreground font-medium">
                            {result}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <motion.button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-card/50 border border-border/40 backdrop-blur-sm text-foreground hover:bg-card/70 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-[#8B5CF6] scale-125' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-card/50 border border-border/40 backdrop-blur-sm text-foreground hover:bg-card/70 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={staggerContainer}
        >
          {[
            { number: "500+", label: "Websites Delivered" },
            { number: "98%", label: "Client Satisfaction" },
            { number: "24hr", label: "Average Delivery" },
            { number: "99.9%", label: "Uptime Guarantee" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold text-gradient-blue mb-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-muted-foreground text-sm font-medium group-hover:text-foreground/80 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
