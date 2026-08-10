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
        title="About WebInHour | Complete Online Presence, Launched in Hours"
        description="Why we build complete online presences, website, Google Business, social content, and local SEO, in hours, not weeks. Stop waiting months for an agency just to get you online."
        keywords="complete online presence, web presence agency, Google Business setup, local SEO, social media content, fast web presence launch, agency alternatives"
      />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-20 scroll-m-20">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium tracking-wide uppercase">Who we are</Badge>
            <h1 className="text-4xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent tracking-tight">
              We killed the <br className="hidden md:block" />
              8-week timeline.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              We got tired of watching founders wait two months and pay $10,000 just to get online, and still end up with only a website.
              <span className="text-foreground font-medium"> WebInHour</span> sets up your complete online presence, website, Google Business, social content, and local SEO, so you look ready everywhere customers check. Launched in hours.
            </p>
          </div>

          {/* Stats Section - Social Proof */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24">
            {[
              { icon: Clock, value: "24h", label: "Max Build Time", color: "text-purple-600" },
              { icon: Globe, value: "500+", label: "Tested Layouts", color: "text-blue-600" },
              { icon: Trophy, value: "99.9%", label: "Uptime", color: "text-yellow-600" },
              { icon: Zap, value: "100+", label: "Engineers", color: "text-green-600" }
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
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Agencies are too slow. Builders are too hard.</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  If you want a website today, you basically have two bad options. You can pay an agency $10,000 and wait two months, or you can spend your entire weekend fighting with a drag-and-drop builder until you want to throw your laptop out a window.
                </p>
                <p>
                  <strong className="text-foreground">We built the third option.</strong>
                </p>
                <p>
                  WebInHour pairs smart automation with actual human developers. We don't build from scratch. We take proven, high-converting components and assemble them to fit your brand. 
                </p>
                <p>
                  You get the quality of an agency build, but you get it tomorrow.
                </p>
              </div>
            </div>
            <div className="grid gap-6">
              <Card className="bg-gradient-to-br from-background to-muted border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Target className="h-6 w-6 text-primary mr-3" />
                    The Goal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To make professional web development accessible, fast, and completely transparent. No hidden fees, no endless revisions.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-background to-muted border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Heart className="h-6 w-6 text-red-500 mr-3" />
                    The Rule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Fast doesn't mean broken. Every site we ship has to load under 3 seconds, work perfectly on mobile, and pass Google's core web vitals.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-center mb-12">How We Operate</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Tested Code Only",
                  desc: "We don't reinvent the wheel. We use components that we already know look great and perform flawlessly across all devices.",
                  color: "text-blue-500"
                },
                {
                  icon: Clock,
                  title: "Speed is a Feature",
                  desc: "Time is money. The faster we launch, the faster you can start running ads, collecting leads, and closing deals.",
                  color: "text-purple-500"
                },
                {
                  icon: Users,
                  title: "Human Experts",
                  desc: "We use automation to move fast, but human engineers write your copy, check the margins, and push the final code live.",
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
              <CardTitle className="text-3xl font-bold">Why We Win</CardTitle>
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
                  <h3 className="font-bold text-lg mb-3">AI-Search Ready</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We structure your site so ChatGPT and Perplexity can read it, not just Google.
                  </p>
                </div>
                <div className="text-center px-4">
                  <div className="bg-blue-500/10 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 transform hover:-rotate-6 transition-transform">
                    <Star className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">Modern Stack</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We use React, Tailwind, and Vite. We don't use heavy WordPress plugins that take 10 seconds to load.
                  </p>
                </div>
                <div className="text-center px-4">
                  <div className="bg-green-500/10 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 transform hover:rotate-6 transition-transform">
                    <Users className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">You Own It</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We hand over the code. You aren't locked into a monthly subscription just to keep your site online.
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
