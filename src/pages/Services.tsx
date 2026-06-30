import React, { Suspense, lazy } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Footer } from '@/components/sections/Footer';
import { SkeletonSection } from '@/components/ui/SkeletonLoaders';

const PremiumMarketplaceServices = lazy(() =>
  import('@/components/sections/PremiumMarketplaceServices').then(m => ({ default: m.PremiumMarketplaceServices }))
);

const Services = () => {
  return (
    <AppLayout>
      <SEOHead
        title="Premium Digital Solutions & Services | WebInHour"
        description="Explore WebInHour's full marketplace of premium digital services - reputation management, social growth, verification, SEO, and enterprise-grade solutions. Vetted experts, fast delivery."
        keywords="digital services marketplace, reputation management, social media growth, SEO services, verification services, premium digital solutions, WebInHour services"
        canonicalUrl="https://webinhour.com/services"
      />

      <div className="relative z-10">
        <Suspense fallback={<SkeletonSection heightClass="h-[600px]" />}>
          <PremiumMarketplaceServices />
        </Suspense>

        <Footer />
      </div>
    </AppLayout>
  );
};

export default Services;
