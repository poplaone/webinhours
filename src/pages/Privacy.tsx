import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, Lock, Eye, FileText, Globe } from 'lucide-react';

export default function Privacy() {
  return (
    <AppLayout>
      <SEOHead
        title="Privacy Policy - WebInHour | Data Protection & Security"
        description="Our commitment to protecting your digital footprint. Learn how we handle data for enterprise clients, reputation management, and asset acquisitions."
        keywords="enterprise privacy policy, data security, reputation management privacy, digital asset protection"
      />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-purple-600 border-purple-500/50">Data Protocol</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Privacy & Security Policy
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We operate with a security-first architecture. Your data, identity, and assets are protected by enterprise-grade encryption and strict confidentiality protocols.
            </p>
            <p className="text-sm text-muted-foreground mt-4 uppercase tracking-widest">
              Last Updated: December 14, 2024
            </p>
          </div>

          <Card className="bg-white/5 backdrop-blur-md border border-border/50">
            <CardContent className="p-8 md:p-12 space-y-12">

              <section>
                <div className="flex items-center mb-6">
                  <Shield className="h-6 w-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold">1. Data Collection Protocol</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  We collect only the data necessary to execute our services with precision. This falls into three verified categories:
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-background/50 p-6 rounded-lg border border-border/50">
                    <h3 className="font-semibold mb-2 text-foreground">Identity Verification</h3>
                    <p className="text-sm text-muted-foreground">KYC (Know Your Customer) data required for high-value asset acquisitions and reputation management services.</p>
                  </div>
                  <div className="bg-background/50 p-6 rounded-lg border border-border/50">
                    <h3 className="font-semibold mb-2 text-foreground">Operational Telemetry</h3>
                    <p className="text-sm text-muted-foreground">Technical data from your deployed assets to monitor uptime, performance, and security threats.</p>
                  </div>
                </div>
              </section>

              <Separator className="bg-border/50" />

              <section>
                <div className="flex items-center mb-6">
                  <Lock className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold">2. Reputation & Confidentiality</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  For clients utilizing our <strong className="text-foreground">Reputation Defense</strong> and <strong className="text-foreground">PR Services</strong>, we adhere to a strict code of silence.
                </p>
                <ul className="list-none space-y-3 mt-4">
                  {["Zero-Knowledge Disclosure: We do not publicly acknowledge client relationships without explicit consent.", "Sensitive Data Isolation: Reputation case files are stored in isolated, encrypted containers.", "NDA Compliance: All internal staff and vetted partners are bound by non-disclosure agreements."].map((item, i) => (
                    <li key={i} className="flex items-start text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2.5 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <Separator className="bg-border/50" />

              <section>
                <div className="flex items-center mb-6">
                  <Eye className="h-6 w-6 text-green-600 mr-3" />
                  <h2 className="text-2xl font-bold">3. Asset Acquisition & Transfer</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  When facilitating the sale or purchase of digital assets (domains, handles, accounts):
                </p>
                <ul className="space-y-4">
                  <li className="bg-background/30 p-4 rounded-lg border-l-2 border-green-500">
                    <strong className="block text-foreground mb-1">Escrow Data</strong>
                    <span className="text-sm text-muted-foreground">Transaction data is held securely in escrow until verification is complete. Once verified, sensitive ownership credentials are transferred directly and wiped from our intermediary systems.</span>
                  </li>
                  <li className="bg-background/30 p-4 rounded-lg border-l-2 border-green-500">
                    <strong className="block text-foreground mb-1">Seller Anonymity</strong>
                    <span className="text-sm text-muted-foreground">We protect the identity of premium asset sellers unless disclosure is legally required for the transfer of ownership.</span>
                  </li>
                </ul>
              </section>

              <Separator className="bg-border/50" />

              <section>
                <div className="flex items-center mb-6">
                  <Globe className="h-6 w-6 text-orange-600 mr-3" />
                  <h2 className="text-2xl font-bold">4. Third-Party Ecosystem</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  We interact with a curated network of third-party platforms (registrars, social platforms, hosting providers).
                </p>
                <p className="text-muted-foreground mb-4">
                  While we ensure our "Nodes" (service providers) meet high standards, data shared directly with third-party platforms is subject to their respective privacy policies. We minimize data sharing to only what is functionally essential.
                </p>
              </section>

              <Separator className="bg-border/50" />

              <section>
                <div className="flex items-center mb-6">
                  <FileText className="h-6 w-6 text-foreground mr-3" />
                  <h2 className="text-2xl font-bold">5. Contact & Compliance</h2>
                </div>
                <div className="bg-background/50 p-6 rounded-xl border border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <p className="text-muted-foreground mb-2">For privacy inquiries, data deletion requests, or compliance audits:</p>
                    <p className="text-lg font-medium text-foreground">compliance@webinhour.com</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>San Francisco, CA</p>
                    <p>Global Compliance Office</p>
                  </div>
                </div>
              </section>

            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
