
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function Terms() {
  return (
    <AppLayout>
      <SEOHead
        title="Terms of Service - WebInHour | Legal Terms"
        description="Read our terms of service for WebInHour website development platform."
        keywords="terms of service, legal, website development terms"
      />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Legal</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: December 14, 2024
            </p>
          </div>

          <Card>
            <CardContent className="prose prose-gray max-w-none p-8">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-600 mb-4">
                    By accessing and using WebInHour ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
                  <p className="text-gray-600 mb-4">
                    WebInHour provides a platform for rapid website development and deployment, connecting customers with professional web developers and offering pre-built templates. Our services include:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Website template marketplace</li>
                    <li>Custom website development services</li>
                    <li>Developer marketplace platform</li>
                    <li>Website hosting assistance</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
                  <p className="text-gray-600 mb-4">
                    To access certain features of our service, you may be required to create an account. You are responsible for:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Maintaining the confidentiality of your account credentials</li>
                    <li>All activities that occur under your account</li>
                    <li>Notifying us immediately of any unauthorized use</li>
                    <li>Providing accurate and current information</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-bold mb-4">4. Payment Terms</h2>
                  <p className="text-gray-600 mb-4">
                    Payment terms for our services are as follows:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>All prices are displayed in USD and include applicable taxes</li>
                    <li>Payment is required before service delivery</li>
                    <li>We accept major credit cards and PayPal</li>
                    <li>Custom projects may require partial payment upfront</li>
                    <li>Refunds are subject to our refund policy</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-bold mb-4">5. Intellectual Property</h2>
                  <p className="text-gray-600 mb-4">
                    Upon full payment for services:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>You receive full ownership rights to your custom website</li>
                    <li>Template purchases include commercial usage rights</li>
                    <li>You may not resell or redistribute templates as-is</li>
                    <li>WebInHour retains rights to our platform and technology</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-bold mb-4">6. Marketplace Terms</h2>
                  <p className="text-gray-600 mb-4">
                    For sellers on our marketplace:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>You retain ownership of your original templates</li>
                    <li>You grant us license to sell your templates on our platform</li>
                    <li>Revenue sharing is 70% to seller, 30% to WebInHour</li>
                    <li>All submissions must be original work</li>
                    <li>We reserve the right to remove listings that violate our guidelines</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-bold mb-4">7. Service Delivery</h2>
                  <p className="text-gray-600 mb-4">
                    We strive to meet our delivery timeframes:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Templates: Instant download after payment</li>
                    <li>Custom websites: 2-24 hours typical delivery</li>
                    <li>Rush delivery available for additional fee</li>
                    <li>Delays may occur due to scope changes or technical issues</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-bold mb-4">8. Refund Policy</h2>
                  <p className="text-gray-600 mb-4">
                    We offer a 7-day money-back guarantee under the following conditions:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Request must be made within 7 days of purchase</li>
                    <li>Custom work refunds are evaluated case-by-case</li>
                    <li>Template refunds require valid reason</li>
                    <li>Downloaded files must be deleted upon refund</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
                  <p className="text-gray-600 mb-4">
                    WebInHour shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
                  <p className="text-gray-600 mb-4">
                    If you have any questions about these Terms of Service, please contact us at:
                  </p>
                  <p className="text-gray-600">
                    Email: legal@webinhour.com<br />
                    Address: 123 Tech Street, San Francisco, CA 94105
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
