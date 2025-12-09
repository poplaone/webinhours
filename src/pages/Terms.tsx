import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Scale, Users, AlertTriangle, ShieldCheck, Zap, Server } from 'lucide-react';

export default function Terms() {
  return (
    <AppLayout>
      <SEOHead
        title="Terms of Service - WebInHour | Ecosystem Governance"
        description="The governing framework for the WebInHour ecosystem. Detailed terms for developers, enterprise clients, and asset traders."
        keywords="terms of service, legal framework, digital asset trading terms, software license agreement"
      />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-purple-600 border-purple-500/50">Ecosystem Governance</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our ecosystem operates on trust, speed, and precision. These terms define the rights, responsibilities, and standards for all Nodes, Creators, and Enterprise Clients.
            </p>
            <p className="text-sm text-muted-foreground mt-4 uppercase tracking-widest">
              Last Updated: December 14, 2024
            </p>
          </div>

          <Card className="bg-white/5 backdrop-blur-md border border-border/50">
            <CardContent className="p-8 md:p-12 space-y-12">

              <section>
                <div className="flex items-center mb-6">
                  <Scale className="h-6 w-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold">1. Service Tiers & Definition</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    By accessing WebInHour, you agree to these terms. Our services are categorized as follows:
                  </p>
                  <ul className="grid md:grid-cols-2 gap-4">
                    <li className="bg-background/50 p-4 rounded-lg border border-border/50">
                      <strong className="block text-foreground mb-1">The Marketplace</strong>
                      <span className="text-sm text-muted-foreground">A platform for buying and selling standardized digital assets (templates, components).</span>
                    </li>
                    <li className="bg-background/50 p-4 rounded-lg border border-border/50">
                      <strong className="block text-foreground mb-1">Enterprise Solutions</strong>
                      <span className="text-sm text-muted-foreground">Bespoke development, reputation management, and high-level consulting services.</span>
                    </li>
                  </ul>
                </div>
              </section>

              <Separator className="bg-border/50" />

              <section>
                <div className="flex items-center mb-6">
                  <Users className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold">2. Creator Economy (Marketplace)</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  For developers and creators listing assets on our network ("Nodes"):
                </p>
                <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                  <li><strong className="text-foreground">Revenue Split:</strong> Creators retain 70% of the gross sale price. WebInHour retains 30% as a platform fee.</li>
                  <li><strong className="text-foreground">Exclusivity:</strong> You retain ownership of your IP. However, assets listed as "Exclusive" must not be sold elsewhere.</li>
                  <li><strong className="text-foreground">Quality Standards:</strong> We reserve the right to delist any asset that fails our security, performance, or SEO benchmarks.</li>
                </ul>
              </section>

              <Separator className="bg-border/50" />

              <section>
                <div className="flex items-center mb-6">
                  <ShieldCheck className="h-6 w-6 text-green-600 mr-3" />
                  <h2 className="text-2xl font-bold">3. Premium Asset Transfers</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  For the acquisition of Domains, Social Handles, and Aged Accounts:
                </p>
                <div className="bg-yellow-500/10 p-5 rounded-lg border border-yellow-500/20">
                  <div className="flex items-center mb-2 text-yellow-500">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    <span className="font-semibold text-sm uppercase">Finality of Sale</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Due to the irreversible nature of digital asset transfers, all sales of Premium Assets are final. Ownership is considered transferred once the cryptographic key, authorization code, or account credentials have been delivered to the buyer.
                  </p>
                </div>
              </section>

              <Separator className="bg-border/50" />

              <section>
                <div className="flex items-center mb-6">
                  <Zap className="h-6 w-6 text-orange-600 mr-3" />
                  <h2 className="text-2xl font-bold">4. Reputation & PR Services</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  We employ industry-leading methodologies for reputation defense and PR. However:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Results for third-party platform actions (indexing, verification, removals) cannot be guaranteed due to the autonomous nature of these platforms.</li>
                  <li>We operate strictly within legal frameworks. We will not engage in libel, slander, or illegal hacking activities.</li>
                </ul>
              </section>

              <Separator className="bg-border/50" />

              <section>
                <div className="flex items-center mb-6">
                  <Server className="h-6 w-6 text-foreground mr-3" />
                  <h2 className="text-2xl font-bold">5. Hosting & Deployment</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Sites deployed via our "Instant Launch" pipeline are subject to our Acceptable Use Policy. We maintain a zero-tolerance policy for phishing, malware distribution, or illegal content.
                </p>
              </section>

              <Separator className="bg-border/50" />

              <section>
                <p className="text-sm text-muted-foreground text-center">
                  For legal inquiries or intellectual property disputes, contact our legal team at <strong className="text-foreground">legal@webinhour.com</strong>.
                </p>
              </section>

            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
