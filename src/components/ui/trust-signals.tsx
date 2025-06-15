
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Clock, Users, Star, CheckCircle } from 'lucide-react';

interface TrustSignalsProps {
  variant?: 'horizontal' | 'grid' | 'compact';
  className?: string;
}

export const TrustSignals: React.FC<TrustSignalsProps> = ({ 
  variant = 'horizontal', 
  className = '' 
}) => {
  const signals = [
    {
      icon: Star,
      label: '4.9/5 Rating',
      detail: '200+ Reviews',
      color: 'text-yellow-500'
    },
    {
      icon: Users,
      label: '500+ Clients',
      detail: 'Happy Customers',
      color: 'text-blue-500'
    },
    {
      icon: Clock,
      label: '24hr Delivery',
      detail: 'Average Time',
      color: 'text-green-500'
    },
    {
      icon: Shield,
      label: 'Money-Back',
      detail: '30-Day Guarantee',
      color: 'text-purple-500'
    },
    {
      icon: Award,
      label: '99.9% Uptime',
      detail: 'Guaranteed',
      color: 'text-orange-500'
    },
    {
      icon: CheckCircle,
      label: 'SSL Secure',
      detail: 'GDPR Compliant',
      color: 'text-emerald-500'
    }
  ];

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
        {signals.slice(0, 3).map((signal, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-2 text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <signal.icon className={`h-4 w-4 ${signal.color}`} />
            <span className="font-medium">{signal.label}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 gap-6 ${className}`}>
        {signals.map((signal, index) => (
          <motion.div
            key={index}
            className="text-center p-4 bg-card/50 backdrop-blur border border-border/40 rounded-lg hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <signal.icon className={`h-8 w-8 mx-auto mb-3 ${signal.color}`} />
            <div className="text-lg font-semibold">{signal.label}</div>
            <div className="text-sm text-muted-foreground">{signal.detail}</div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap justify-center gap-8 ${className}`}>
      {signals.map((signal, index) => (
        <motion.div
          key={index}
          className="flex items-center gap-2 text-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <signal.icon className={`h-5 w-5 ${signal.color}`} />
          <div>
            <div className="font-medium text-foreground">{signal.label}</div>
            <div className="text-muted-foreground text-xs">{signal.detail}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
