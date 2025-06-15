
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: {
    name: string;
    role: string;
    company: string;
    avatar: string;
    rating: number;
    text: string;
    results: string[];
  };
  index: number;
}

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
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
  );
}
