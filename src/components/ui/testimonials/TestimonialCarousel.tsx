
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Quote, Star, ArrowLeft, ArrowRight } from 'lucide-react';

interface TestimonialCarouselProps {
  testimonials: Array<{
    name: string;
    role: string;
    company: string;
    avatar: string;
    rating: number;
    text: string;
    results: string[];
  }>;
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

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

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
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
  );
}
