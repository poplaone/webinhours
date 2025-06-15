
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Gift, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LeadCaptureFormProps {
  variant?: 'popup' | 'inline' | 'sidebar';
  incentive?: string;
  className?: string;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ 
  variant = 'inline',
  incentive = "Free Website Audit + Strategy Session",
  className = ''
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    projectType: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const benefits = [
    "Free 30-min consultation call",
    "Custom project roadmap",
    "No-obligation quote",
    "Priority scheduling"
  ];

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${className}`}
      >
        <Card className="border-green-500/20 bg-green-500/10">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p className="text-muted-foreground mb-4">
              We'll contact you within 24 hours with your free audit and strategy session details.
            </p>
            <Badge className="bg-green-500 hover:bg-green-600">
              Response guaranteed within 24hrs
            </Badge>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={className}
    >
      <Card className="border-[#8B5CF6]/20 bg-gradient-to-br from-[#8B5CF6]/5 to-[#A78BFA]/5 backdrop-blur">
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Gift className="h-4 w-4 text-[#8B5CF6]" />
              <span className="text-sm font-medium text-[#8B5CF6]">{incentive}</span>
            </motion.div>
            
            <h3 className="text-2xl font-bold mb-2">Get Your Free Website Strategy</h3>
            <p className="text-muted-foreground">
              Tell us about your project and receive a custom roadmap + pricing within 24 hours
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Your Name *"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="bg-background/50"
              />
              <Input
                type="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="bg-background/50"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Current Website (if any)"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                className="bg-background/50"
              />
              <Input
                placeholder="Project Type (e.g., E-commerce)"
                value={formData.projectType}
                onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                className="bg-background/50"
              />
            </div>
            
            <Textarea
              placeholder="Tell us about your project goals and requirements..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows={4}
              className="bg-background/50"
            />
            
            <Button 
              type="submit"
              size="lg"
              className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-lg py-3 transition-all duration-300 hover:scale-105 group"
            >
              Get My Free Strategy Session
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-4">
            No spam. We respect your privacy and will only send project-related updates.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};
