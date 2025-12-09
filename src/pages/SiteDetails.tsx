import React, { useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Download, Tag, Code2, Shield, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import AppLayout from "@/components/layout/AppLayout";
import SEOHead from '@/components/seo/SEOHead';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useWebsiteById } from '@/hooks/queries/useWebsiteByIdQuery';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePrefetchSiteDetails } from '@/hooks/queries/usePrefetchSiteDetails';

const SiteDetails = () => {
  const { id, slugOrId } = useParams<{ id?: string; slugOrId?: string }>();
  const websiteId = id || slugOrId || '';

  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: site, isLoading } = useWebsiteById(websiteId);
  const isMobile = useIsMobile();
  usePrefetchSiteDetails();

  const handlePurchase = useCallback(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to purchase this template.",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    toast({
      title: "Purchase Initiated",
      description: "Redirecting to payment..."
    });
  }, [user, toast, navigate]);

  const handlePreview = useCallback(() => {
    if (site?.preview_url) {
      window.open(site.preview_url, '_blank', 'noopener,noreferrer');
    } else {
      toast({
        title: "Preview Not Available",
        description: "Preview URL is not available for this template.",
        variant: "destructive"
      });
    }
  }, [site?.preview_url, toast]);

  const handleBackToMarketplace = useCallback(() => {
    navigate('/websites');
  }, [navigate]);

  const defaultFeatures = useMemo(() => ['Responsive Design', 'Modern UI', 'Fast Loading', 'SEO Optimized'], []);
  const defaultTechnologies = useMemo(() => ['HTML', 'CSS', 'JavaScript', 'React'], []);
  const defaultTags = useMemo(() => ['web', 'template', 'responsive'], []);
  const defaultInclusions = useMemo(() => [
    'Source code files',
    'Documentation',
    '30-day support',
    'Future updates'
  ], []);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="container mx-auto px-6 pt-4 md:pt-24 pb-20 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-10 w-40 bg-gray-800/30 rounded-lg animate-pulse" />
            <div className="flex-1" />
            <div className="h-10 w-32 bg-gray-800/30 rounded-lg animate-pulse" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[calc(100vh-200px)]">
            <div className="lg:col-span-2">
              <Card className="h-full bg-white/5 backdrop-blur-md border-border/50">
                <CardContent className="p-0 h-full">
                  <div className="h-full min-h-[500px] bg-gray-800/20 animate-pulse rounded-lg" />
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-md border-border/50">
                <CardHeader>
                  <div className="h-6 w-48 bg-gray-800/30 rounded animate-pulse" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-4 bg-gray-800/20 rounded animate-pulse" />
                  <div className="h-4 bg-gray-800/20 rounded w-3/4 animate-pulse" />
                  <Separator />
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-4 bg-gray-800/20 rounded animate-pulse" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!site) {
    return (
      <AppLayout>
        <div className="container mx-auto px-6 pt-4 md:pt-24 pb-20 flex items-center justify-center min-h-[50vh] relative z-10">
          <Card className="p-8 text-center bg-white/5 backdrop-blur-md border-border/50">
            <h2 className="text-2xl font-bold mb-4">Site Not Found</h2>
            <p className="text-muted-foreground mb-4">The requested site could not be found.</p>
            <Button onClick={handleBackToMarketplace}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Marketplace
            </Button>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <SEOHead
        title={`${site.title} - Website Template | WebInHour`}
        description={site.description || `Professional ${site.category} website template. ${site.features?.slice(0, 3).join(', ')}. Ready in 24 hours.`}
        keywords={`${site.category} template, ${site.tags?.join(', ')}, website template`}
        ogImage={site.thumbnail_url}
        canonicalUrl={`https://webinhour.com/websites/${site.id}`}
      />

      <div className="container mx-auto px-6 pt-4 md:pt-24 pb-20 relative z-10">
        {/* Mobile Header with Back Button, Title, and Buy */}
        {isMobile && (
          <div className="flex items-center justify-between gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackToMarketplace}
              className="-ml-2 text-muted-foreground hover:text-foreground shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <h1 className="text-lg font-bold truncate flex-1 text-center">
              {site.title}
            </h1>

            <Button
              size="sm"
              onClick={handlePurchase}
              className="bg-[#8B5CF6] hover:bg-[#7C3AED] h-8 px-3 shrink-0"
            >
              Buy
            </Button>
          </div>
        )}

        {!isMobile && (
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={handleBackToMarketplace} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Marketplace
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{site.title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-2" onClick={handlePreview}>
                <Eye className="h-4 w-4" />
                Preview
              </Button>
              <Button onClick={handlePurchase} className="bg-[#8B5CF6] hover:bg-[#7C3AED] flex items-center gap-2">
                <Download className="h-4 w-4" />
                {site.price === 0 ? 'Download Free' : `Purchase $${site.price}`}
              </Button>
            </div>
          </div>
        )}

        <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'lg:grid-cols-3 gap-6'} min-h-[calc(100vh-200px)]`}>
          <div className={isMobile ? '' : 'lg:col-span-2'}>
            <Card className="h-full relative overflow-hidden bg-white/5 backdrop-blur-md border-border/50">
              <CardContent className="p-0 h-full">
                <div className={`h-full ${isMobile ? 'aspect-[4/3] w-full' : 'min-h-[500px]'} overflow-hidden rounded-lg relative group`}>
                  <img
                    src={site.thumbnail_url || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&h=450&q=80"}
                    alt={site.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      onClick={handlePreview}
                      className="bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20"
                      variant="outline"
                      size="lg"
                    >
                      <Eye className="mr-2 h-5 w-5" />
                      Live Preview
                    </Button>
                  </div>
                  {/* Mobile Preview Button Overlay - Always visible on mobile if needed, or stick to the logic above */}
                  {isMobile && (
                    <Button
                      onClick={handlePreview}
                      className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white border-white/20 flex items-center gap-2"
                      variant="outline"
                      size="sm"
                    >
                      <Eye className="h-4 w-4" />
                      Preview
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {isMobile && (
              <div className="mt-4">
                <h1 className="text-xl font-bold">{site.title}</h1>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-md border-border/50">
              <CardHeader>
                <CardTitle>About This Template</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {site.description || "This is a professional website template designed for modern businesses. It features a clean, responsive design that looks great on all devices."}
                </p>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium">Category</span>
                  <Badge>{site.category}</Badge>
                </div>
                <Separator />
                <Tabs defaultValue="features">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="features" className="mt-4">
                    <div className="grid grid-cols-1 gap-3">
                      {(site.features || defaultFeatures).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#8B5CF6] rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="inclusions" className="mt-4">
                    <div className="space-y-3">
                      {(site.inclusions && site.inclusions.length > 0 ? site.inclusions : defaultInclusions).map((inc, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>



            <Card className="bg-white/5 backdrop-blur-md border-border/50">
              <CardHeader>
                <CardTitle>Tech & Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tech">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="tech">Tech Used</TabsTrigger>
                    <TabsTrigger value="tags">Tags</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tech" className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {(site.technologies || defaultTechnologies).map((tech, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          <Code2 className="h-3 w-3" />
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="tags" className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {(site.tags || defaultTags).map((tag, index) => (
                        <Badge key={index} variant="outline" className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>


      </div>
    </AppLayout>
  );
};

export default SiteDetails;
