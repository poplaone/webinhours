import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, ShoppingCart, Rocket, MessageCircle, Users, Zap, Code, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HowItWorks() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: Search,
      title: "Select Your Architecture",
      description: "Don't start from zero. Choose from our library of enterprise-grade architectures, pre-optimized for SEO, performance, and conversion.",
      details: ["Strategic Industry Frameworks", "AI-Driven Recommendations", "Live Component Previews", "Tech Stack Transparency"]
    },
    {
      icon: Code,
      title: "Intelligent Customization",
      description: "Tailor the core to your brand's DNA. Whether it's a simple reskin or a complex logic overhaul, our platform adapts to your needs.",
      details: ["Modular Component Logic", "Direct Source Code Access", "Automated Asset Optimization", "Responsive Design Engine"]
    },
    {
      icon: MessageCircle,
      title: "Rapid Iteration",
      description: "Collaborate directly with creators or our internal experts. Refine, test, and polish your digital asset in real-time.",
      details: ["Agile Feedback Loops", "Version Control Integration", "Staging Environments", "Expert Code Review"]
    },
    {
      icon: Rocket,
      title: "Instant Deployment",
      description: "Launch globally with a single click. Our infrastructure ensures your site delivers peak performance from the very first second.",
      details: ["Global CDN Distribution", "Automatic SSL Provisioning", "GEO & SEO Pre-Configuration", "Post-Launch Analytics"]
    }
  ];

  return (
    <AppLayout>
      <SEOHead
        title="How It Works - WebInHours | Get Your Website in 24 Hours"
        description="From template selection to launch in 24 hours. Our streamlined process eliminates weeks of waiting. Select, customize, deploy - your website live today."
        keywords="how to get website in 24 hours, fast website process, same day website delivery, rapid web development, instant website launch"
        canonicalUrl="https://webinhours.com/how-it-works"
      />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-20 scroll-m-20">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium tracking-wide uppercase">The Workflow</Badge>
            <h1 className="text-4xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
              From Concept to Cloud<br />
              <span className="text-foreground">in Record Time.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              We've engineered a streamlined development lifecycle that eliminates friction.
              Reduce your time-to-value from months to hours without sacrificing quality.
            </p>
          </div>

          {/* Process Steps */}
          <div className="space-y-16 mb-24 relative">

            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute left-[3.25rem] top-10 bottom-10 w-0.5 bg-gradient-to-b from-purple-600 via-blue-600 to-transparent opacity-30"></div>

            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="flex flex-col md:flex-row gap-10">
                  <div className="flex-shrink-0 z-10">
                    <div className="w-28 h-28 bg-background border-4 border-border/50 rounded-full flex items-center justify-center shadow-lg group-hover:border-purple-500/50 transition-colors duration-300">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                        {index + 1}
                      </div>
                    </div>
                  </div>

                  <Card className="flex-grow bg-white/5 backdrop-blur-md border-border/50 hover:border-primary/20 transition-all duration-300 group-hover:bg-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center text-2xl md:text-3xl font-bold">
                        <step.icon className="h-8 w-8 mr-4 text-purple-500" />
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-muted-foreground text-lg leading-relaxed">{step.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/30">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center text-sm font-medium text-foreground/80">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                            {detail}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>

          {/* Marketplace Section - The Creator Economy */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">The Creator Economy, Elevated</h2>
              <p className="text-xl text-muted-foreground p-2">Are you an expert developer? Turn your intellectual property into active revenue.</p>
            </div>

            <Card className="bg-gradient-to-br from-purple-500/5 via-background to-blue-500/5 border-primary/20 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  <div className="p-8 md:p-12 space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 flex items-center">
                        <Users className="h-6 w-6 mr-3 text-purple-600" />
                        Join the Elite Network
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        WebInHour isn't just a platform; it's a global distribution engine for your work.
                        List your highest-quality templates, components, and full-stack projects.
                      </p>
                    </div>

                    <ul className="space-y-4">
                      {[
                        "Keep 70% of Every Transaction",
                        "Automated Quality Assurance Pipeline",
                        "Global Audience of Ready Buyers",
                        "Featured Placement Opportunities"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center text-foreground">
                          <Shield className="h-5 w-5 mr-3 text-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <Button variant="outline" className="border-purple-500/50 hover:bg-purple-500/10" onClick={() => navigate('/dashboard')}>
                      Become a Creator
                    </Button>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm p-8 md:p-12 border-l border-border/50 flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-6 text-center">High-Demand Assets</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: Zap, label: "React Frameworks", color: "text-yellow-500" },
                        { icon: ShoppingCart, label: "E-Commerce", color: "text-blue-500" },
                        { icon: Code, label: "SaaS Starters", color: "text-purple-500" },
                        { icon: Rocket, label: "Landing Pages", color: "text-red-500" }
                      ].map((item, i) => (
                        <div key={i} className="bg-background/50 border border-border/50 rounded-xl p-4 text-center hover:border-primary/50 transition-colors">
                          <item.icon className={`h-8 w-8 mx-auto mb-3 ${item.color}`} />
                          <span className="font-medium text-sm">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center py-12 rounded-2xl bg-gradient-to-b from-transparent to-purple-500/5 border border-border/50">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Building Your Future</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              The tools you need to dominate your market are one click away.
              Why wait weeks when you can launch today?
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 h-auto"
                onClick={() => navigate('/dashboard')}
              >
                Explore The Marketplace
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 h-auto border-2"
                onClick={() => navigate('/pricing')}
              >
                View Enterprise Plans
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
