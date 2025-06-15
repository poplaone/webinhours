
import { motion } from 'framer-motion';

const stats = [
  { number: "500+", label: "Websites Delivered" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "24hr", label: "Average Delivery" },
  { number: "99.9%", label: "Uptime Guarantee" }
];

export function StatsSection() {
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
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-4 gap-8"
      variants={staggerContainer}
    >
      {stats.map((stat, index) => (
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
  );
}
