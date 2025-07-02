
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function Privacy() {
  return (
    <AppLayout>
      <SEOHead 
        title="Privacy Policy - WebInHours | Your Privacy Matters"
        description="Learn how WebInHours protects your privacy and handles your personal information."
        keywords="privacy policy, data protection, user privacy"
      />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Privacy</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: December 14, 2024
          </p>
        </div>

        <Card>
          <CardContent className="prose prose-gray max-w-none p-8">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                  We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
                </p>
                
                <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Name and email address</li>
                  <li>Payment information (processed securely by third parties)</li>
                  <li>Account credentials</li>
                  <li>Communication preferences</li>
                </ul>

                <h3 className="text-lg font-semibold mb-2">Usage Information</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Website interaction data</li>
                  <li>Device and browser information</li>
                  <li>IP address and location data</li>
                  <li>Cookies and similar technologies</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Provide and improve our services</li>
                  <li>Process transactions and send confirmations</li>
                  <li>Communicate with you about your account</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Detect and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
                <p className="text-gray-600 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties except as described below:
                </p>
                
                <h3 className="text-lg font-semibold mb-2">Service Providers</h3>
                <p className="text-gray-600 mb-4">
                  We may share information with trusted third parties who assist us in operating our website and conducting business, such as payment processors and hosting providers.
                </p>

                <h3 className="text-lg font-semibold mb-2">Legal Requirements</h3>
                <p className="text-gray-600 mb-4">
                  We may disclose information when required by law or to protect our rights, property, or safety.
                </p>

                <h3 className="text-lg font-semibold mb-2">Business Transfers</h3>
                <p className="text-gray-600 mb-4">
                  In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of the transaction.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
                <p className="text-gray-600 mb-4">
                  We implement appropriate security measures to protect your personal information:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure payment processing</li>
                  <li>Regular security audits</li>
                  <li>Access controls and authentication</li>
                  <li>Employee training on data protection</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Cookies and Tracking</h2>
                <p className="text-gray-600 mb-4">
                  We use cookies and similar technologies to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Remember your preferences</li>
                  <li>Analyze website usage</li>
                  <li>Provide personalized content</li>
                  <li>Improve our services</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  You can control cookie settings through your browser preferences.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
                <p className="text-gray-600 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your account and data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Data portability</li>
                  <li>Object to processing in certain circumstances</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
                <p className="text-gray-600 mb-4">
                  We retain your information for as long as necessary to provide our services and comply with legal obligations. Account information is typically retained until you delete your account.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">8. International Transfers</h2>
                <p className="text-gray-600 mb-4">
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data during such transfers.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
                <p className="text-gray-600 mb-4">
                  Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-gray-600">
                  Email: privacy@webinhours.com<br />
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
