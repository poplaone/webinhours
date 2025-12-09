import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, Zap, Shield, Heart, Trophy, Target, Globe } from 'lucide-react';

export default function About() {
  return (
    <AppLayout>
      <SEOHead
        title="About WebInHour | The Future of Digital Deployment"
        description="We are redefining web development with an AI-integrated ecosystem that merges speed, quality, and scalability. Discover how we empower brands to launch instantly and grow limitlessly."
        keywords="enterprise web development, AI website builder, digital ecosystem, vetted freelance marketplace, rapid deployment platform"
      />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-20 scroll-m-20">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium tracking-wide uppercase">Our Vision</Badge>
            <h1 className="text-4xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent tracking-tight">
              Architecting the Future <br className="hidden md:block" />
              of Digital Presence.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              We've dismantled the barriers between idea and execution.
              <span className="text-foreground font-medium"> WebInHour</span> is the world's first unified ecosystem where professional-grade deployment meets limitless scalability.
            </p>
          </div>

          {/* Stats Section - Social Proof */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24">
            {[
              { icon: Clock, value: "24h", label: "Max Deployment Time", color: "text-purple-600" },
              { icon: Globe, value: "500+", label: "Active Ecosystem Nodes", color: "text-blue-600" },
              { icon: Trophy, value: "99.9%", label: "Client Success Rate", color: "text-yellow-600" },
              { icon: Zap, value: "100+", label: "Enterprise Templates", color: "text-green-600" }
            ].map((stat, idx) => (
              <Card key={idx} className="text-center bg-white/5 backdrop-blur-md border-border/50 hover:border-primary/20 transition-all duration-300 group">
                <CardContent className="pt-8 pb-8">
                  <div className="bg-background/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-border/50">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2 tracking-tight">{stat.value}</div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Our Story - The Narrative */}
          <div className="grid md:grid-cols-2 gap-16 mb-24 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">The Paradigm Shift</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  For too long, businesses faced a binary choice: wait months for expensive agencies or settle for generic, unscalable DIY builders. To us, this was a fundamental market failure.
                </p>
                <p>
                  <strong className="text-foreground">We built the third option.</strong>
                </p>
                <p>
                  WebInHour was engineered to democratize access to enterprise-grade web technology. By leveraging AI-driven optimization and a curated marketplace of expert developers, we deliver custom, high-performance digital assets in a fraction of the time.
                </p>
                <p>
                  We aren't just building websites; we're accelerating the speed of digital commerce.
                </p>
              </div>
            </div>
            <div className="grid gap-6">
              <Card className="bg-gradient-to-br from-background to-muted border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Target className="h-6 w-6 text-primary mr-3" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To eliminate technical friction and empower every brand, from startups to enterprises, with a world-class digital footprint instantly.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-background to-muted border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Heart className="h-6 w-6 text-red-500 mr-3" />
                    Core Philosophy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Performance is not a luxury. It is a standard. Every asset we deploy is optimized for speed, SEO, and conversion from day one.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-center mb-12">Engineered for Excellence</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Excellence by Design",
                  desc: "We don't compromise. Our diverse library is curated rigorously, ensuring cleaner code, faster loads, and better results.",
                  color: "text-blue-500"
                },
                {
                  icon: Clock,
                  title: "Velocity & Precision",
                  desc: "Time is your most valuable asset. Our streamlined pipelines ensure your project goes from concept to live in record time.",
                  color: "text-purple-500"
                },
                {
                  icon: Users,
                  title: "Collaborative Ecosystem",
                  desc: "We bridge the gap between top-tier talent and ambitious brands, creating a symbiotic marketplace of innovation.",
                  color: "text-green-500"
                }
              ].map((value, i) => (
                <Card key={i} className="bg-white/5 backdrop-blur-md border-border/50 hover:bg-white/10 transition-colors">
                  <CardContent className="pt-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`p-3 rounded-lg bg-background border border-border/50 ${value.color}`}>
                        <value.icon className="h-6 w-6" />
                      </div>
                      <h4 className="font-bold text-lg">{value.title}</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Differentiation */}
          <Card className="mb-16 bg-gradient-to-r from-primary/5 via-background to-primary/5 border-primary/20 backdrop-blur-xl">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl font-bold">The WebInHour Advantage</CardTitle>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="grid md:grid-cols-3 gap-12 relative">
                {/* Dividers for desktop */}
                <div className="hidden md:block absolute top-10 bottom-10 left-1/3 w-px bg-border/50"></div>
                <div className="hidden md:block absolute top-10 bottom-10 right-1/3 w-px bg-border/50"></div>

                <div className="text-center px-4">
                  <div className="bg-purple-500/10 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 transform hover:rotate-6 transition-transform">
                    <Zap className="h-10 w-10 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">AI-Native Optimization</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Proprietary Generative Engine Optimization (GEO) ensures your site ranks not just on Search, but in AI answers.
                  </p>
                </div>
                <div className="text-center px-4">
                  <div className="bg-blue-500/10 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 transform hover:-rotate-6 transition-transform">
                    <Star className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">Enterprise Standards</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Built on modern stacks (React, Vite, Tailwind). No bloated legacy code. Just pure performance.
                  </p>
                </div>
                <div className="text-center px-4">
                  <div className="bg-green-500/10 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 transform hover:rotate-6 transition-transform">
                    <Users className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">Vetted Expert Network</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Direct access to a closed network of verified developers and digital strategists for bespoke needs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
