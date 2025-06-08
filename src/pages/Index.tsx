
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

const Index = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Globe,
      title: "Custom Web Development",
      description: "Tailored websites built with modern technologies to meet your unique business needs."
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Responsive designs that look perfect on all devices and provide exceptional user experiences."
    },
    {
      icon: Code,
      title: "Full-Stack Solutions",
      description: "Complete web applications with robust backends and intuitive frontends."
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Lightning-fast websites optimized for speed, SEO, and user engagement."
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-[#8B5CF6] rounded-md p-2">
              <Code className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl">WebInHours</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Services</a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </nav>
          <Button onClick={() => navigate('/dashboard')} className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Web Development
              <span className="text-gradient-blue"> In Hours</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transform your ideas into stunning websites with our rapid development process. 
              Professional web solutions delivered faster than ever before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="xl" 
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-lg px-8"
                onClick={() => navigate('/dashboard')}
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="xl" variant="outline" className="text-lg px-8">
                View Portfolio
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive web development solutions tailored to your business needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-border/40 bg-card/50 backdrop-blur">
                  <CardContent className="p-6 text-center">
                    <service.icon className="h-12 w-12 text-[#8B5CF6] mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Why Choose WebInHours?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                We combine speed, quality, and innovation to deliver exceptional web solutions 
                that drive your business forward.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Card className="p-8 border-border/40 bg-card/50 backdrop-blur">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Clock className="h-8 w-8 text-[#8B5CF6]" />
                    <div>
                      <h3 className="font-semibold">Rapid Development</h3>
                      <p className="text-sm text-muted-foreground">Projects completed in hours, not weeks</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Target className="h-8 w-8 text-[#8B5CF6]" />
                    <div>
                      <h3 className="font-semibold">Precision Focused</h3>
                      <p className="text-sm text-muted-foreground">Every detail crafted to perfection</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Users className="h-8 w-8 text-[#8B5CF6]" />
                    <div>
                      <h3 className="font-semibold">Expert Team</h3>
                      <p className="text-sm text-muted-foreground">Experienced developers and designers</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border-border/40 bg-card/50 backdrop-blur">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="p-12 border-border/40 bg-gradient-to-r from-[#8B5CF6]/10 to-[#A78BFA]/10 backdrop-blur">
            <CardContent className="p-0">
              <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Transform your vision into reality with our rapid web development process. 
                Let's build something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="xl" 
                  className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-lg px-8"
                  onClick={() => navigate('/dashboard')}
                >
                  Start Your Project
                  <MessageSquare className="ml-2 h-5 w-5" />
                </Button>
                <Button size="xl" variant="outline" className="text-lg px-8">
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-card/30">
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
