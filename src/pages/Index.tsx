import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Code, 
  Smartphone, 
  Globe, 
  Zap, 
  Users, 
  Award,
  ArrowRight,
  CheckCircle,
  Star,
  MessageSquare,
  Clock,
  Target
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedGridBackground from '@/components/animations/AnimatedGridBackground';
import AnimatedServiceCard from '@/components/animations/AnimatedServiceCard';

const Index = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Globe,
      title: "Custom Web Development",
      description: "Tailored websites built with modern technologies to meet your unique business needs.",
      activeColor: "#8B5CF6",
      colors: ["#8B5CF6", "#A78BFA", "#DDD6FE"]
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Responsive designs that look perfect on all devices and provide exceptional user experiences.",
      activeColor: "#0EA5E9",
      colors: ["#E0F2FE", "#7DD3FC", "#0EA5E9"]
    },
    {
      icon: Code,
      title: "Full-Stack Solutions",
      description: "Complete web applications with robust backends and intuitive frontends.",
      activeColor: "#EAB308",
      colors: ["#FEF08A", "#FDE047", "#EAB308"]
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Lightning-fast websites optimized for speed, SEO, and user engagement.",
      activeColor: "#E11D48",
      colors: ["#FECDD3", "#FDA4AF", "#E11D48"]
    }
  ];

  const features = [
    "24/7 Support & Maintenance",
    "SEO-Optimized Development",
    "Mobile-Responsive Design",
    "Fast Turnaround Times",
    "Modern Technology Stack",
    "Unlimited Revisions"
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      text: "WebInHours delivered our project in record time with exceptional quality. Highly recommended!",
      rating: 5
    },
    {
      name: "Michael Chen",
      company: "Digital Solutions",
      text: "The team's expertise and attention to detail exceeded our expectations. Outstanding work!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 relative">
      <AnimatedGridBackground />
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-[#8B5CF6] rounded-md p-2 hover:bg-[#7C3AED] transition-colors duration-300">
              <Code className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent">
              WebInHours
            </span>
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-6">
            {['Services', 'About', 'Testimonials', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-muted-foreground hover:text-foreground transition-all duration-300 relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8B5CF6] transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </nav>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button 
              onClick={() => navigate('/dashboard')} 
              className="bg-[#8B5CF6] hover:bg-[#7C3AED] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#8B5CF6]/25"
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Web Development
              <motion.span 
                className="text-gradient-blue block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                In Hours
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Transform your ideas into stunning websites with our rapid development process. 
              Professional web solutions delivered faster than ever before.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Button 
                size="lg" 
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-lg px-8 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#8B5CF6]/25 group"
                onClick={() => navigate('/dashboard')}
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6] transition-all duration-300 hover:scale-105"
              >
                View Portfolio
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-card/30 backdrop-blur relative z-10">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive web development solutions tailored to your business needs
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AnimatedServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  index={index}
                  activeColor={service.activeColor}
                  colors={service.colors}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Why Choose WebInHours?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                We combine speed, quality, and innovation to deliver exceptional web solutions 
                that drive your business forward.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center space-x-3 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-foreground group-hover:text-[#8B5CF6] transition-colors duration-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 border-border/40 bg-card/50 backdrop-blur hover:shadow-xl transition-all duration-500 group">
                <div className="space-y-6">
                  {[
                    { icon: Clock, title: "Rapid Development", desc: "Projects completed in hours, not weeks" },
                    { icon: Target, title: "Precision Focused", desc: "Every detail crafted to perfection" },
                    { icon: Users, title: "Expert Team", desc: "Experienced developers and designers" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-[#8B5CF6]/10 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <item.icon className="h-8 w-8 text-[#8B5CF6] transition-transform duration-300 group-hover:rotate-6" />
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-card/30 backdrop-blur relative z-10">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 border-border/40 bg-card/50 backdrop-blur hover:shadow-xl hover:scale-105 transition-all duration-500 group">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 group-hover:text-foreground transition-colors duration-300">
                      "{testimonial.text}"
                    </p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-12 border-border/40 bg-gradient-to-r from-[#8B5CF6]/10 to-[#A78BFA]/10 backdrop-blur hover:shadow-2xl transition-all duration-500 group">
              <CardContent className="p-0">
                <h2 className="text-4xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#8B5CF6] group-hover:to-[#A78BFA] group-hover:bg-clip-text transition-all duration-500">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto group-hover:text-foreground transition-colors duration-500">
                  Transform your vision into reality with our rapid web development process. 
                  Let's build something amazing together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-lg px-8 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#8B5CF6]/25 group"
                    onClick={() => navigate('/dashboard')}
                  >
                    Start Your Project
                    <MessageSquare className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-8 hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6] transition-all duration-300 hover:scale-105"
                  >
                    Schedule Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-card/30 backdrop-blur relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-[#8B5CF6] rounded-md p-2">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-xl">WebInHours</span>
              </div>
              <p className="text-muted-foreground">
                Professional web development services delivered with speed and precision.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Web Development</li>
                <li>Mobile Design</li>
                <li>E-commerce Solutions</li>
                <li>Performance Optimization</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>About Us</li>
                <li>Portfolio</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>LinkedIn</li>
                <li>Twitter</li>
                <li>GitHub</li>
                <li>Email</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 WebInHours. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
