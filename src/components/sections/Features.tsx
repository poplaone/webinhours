
import React from 'react';
import { CheckCircle, Clock, Target, Users, Shield, Zap } from 'lucide-react';
import { Card } from "@/components/ui/card";
// Removed framer-motion for better performance

export const Features = () => {
  const features = [
    "24-Hour Delivery Guarantee",
    "100% Mobile Responsive",
    "SEO & Performance Optimized", 
    "Unlimited Revisions Included",
    "SSL Security & GDPR Compliant",
    "Modern Technology Stack",
    "Free Domain & Hosting Setup",
    "Ongoing Support & Maintenance"
  ];

  const benefits = [
    { 
      icon: Clock, 
      title: "Lightning Fast Delivery", 
      desc: "Get your website live in 24 hours, not 6 weeks",
      metric: "24hrs avg delivery"
    },
    { 
      icon: Target, 
      title: "Conversion Focused", 
      desc: "Designed to turn visitors into customers",
      metric: "250% avg conversion boost"
    },
    { 
      icon: Users, 
      title: "Expert Team", 
      desc: "Senior developers and designers with 10+ years experience",
      metric: "98% client satisfaction"
    },
    { 
      icon: Shield, 
      title: "Risk-Free Guarantee", 
      desc: "100% money-back guarantee if you're not satisfied",
      metric: "30-day guarantee"
    },
    { 
      icon: Zap, 
      title: "Performance Optimized", 
      desc: "Lightning fast loading speeds and perfect mobile scores",
      metric: "95+ PageSpeed score"
    }
  ];

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
              <span className="text-sm font-medium text-green-600">✨ Why Choose WebInHours</span>
            </div>

            <h2 className="text-4xl font-bold mb-6">The Fastest Way to Professional Online Presence</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Stop losing customers to slow development timelines. Our proven process delivers 
              high-quality websites at lightning speed, so you can start growing your business today.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 group p-2 rounded-lg hover:bg-[#8B5CF6]/5"
                >
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-foreground group-hover:text-[#8B5CF6] font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-8 py-3 rounded-lg font-medium hover:shadow-xl">
                Start Your Project
              </button>
              <button className="border border-border hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6] px-8 py-3 rounded-lg font-medium">
                View Our Work
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-1 gap-6">
              {benefits.map((item, index) => (
                <div key={index}>
                  <Card className="p-6 border-border/40 bg-card/50 backdrop-blur hover:shadow-xl group hover:border-[#8B5CF6]/30">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center group-hover:bg-[#8B5CF6]/20">
                        <item.icon className="h-6 w-6 text-[#8B5CF6]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg group-hover:text-[#8B5CF6]">{item.title}</h3>
                          <span className="text-sm font-medium text-[#8B5CF6] bg-[#8B5CF6]/10 px-2 py-1 rounded">
                            {item.metric}
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
