import React, { useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Download, Tag, Code2, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useWebsiteById } from '@/hooks/queries/useWebsiteByIdQuery';
import { useIsMobile } from '@/hooks/use-mobile';

const SiteDetails = () => {
  const { id, slugOrId } = useParams<{ id?: string; slugOrId?: string }>();
  const websiteId = id || slugOrId || '';
  
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: site, isLoading } = useWebsiteById(websiteId);
  const isMobile = useIsMobile();

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

    // Handle purchase logic here for authenticated users
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
    navigate('/marketplace');
  }, [navigate]);

  // Memoized default values
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
    return <div className="min-h-screen bg-gradient-to-br from-background to-background/80 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>;
  }

  if (!site) {
    return <div className="min-h-screen bg-gradient-to-br from-background to-background/80 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Site Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested site could not be found.</p>
          <Button onClick={handleBackToMarketplace}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Button>
        </Card>
      </div>;
  }

  return <div className="min-h-screen bg-gradient-to-br from-background to-background/80 relative">
      <div className="container mx-auto p-6 pb-20">
        {/* Header - Only show on desktop */}
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
          {/* Main Content */}
          <div className={isMobile ? '' : 'lg:col-span-2'}>
            {/* Site Preview */}
            <Card className="h-full relative">
              <CardContent className="p-0 h-full">
                <div className={`h-full ${isMobile ? 'min-h-[300px]' : 'min-h-[500px]'} overflow-hidden rounded-lg relative`}>
                  <img 
                    src={site.thumbnail_url || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&h=450&q=80"} 
                    alt={site.title} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Translucent Preview Button Inside Image */}
                  <Button 
                    onClick={handlePreview}
                    className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white border-white/20 flex items-center gap-2"
                    variant="outline"
                  >
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Mobile: Title below image */}
            {isMobile && (
              <div className="mt-4">
                <h1 className="text-2xl font-bold">{site.title}</h1>
              </div>
            )}
          </div>

          {/* Sidebar - Desktop or Mobile content */}
          <div className="space-y-6">
            {/* Combined: Details with About This Template */}
            <Card>
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

            {/* Desktop: Call-to-action buttons under the combined card */}
            {!isMobile && (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED]"
                  onClick={() => navigate(`/checkout?site=${websiteId}`)}
                >
                  Buy Template
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/contact')}
                >
                  Customize
                </Button>
              </div>
            )}

            {/* Toggle: Tech Used / Tags */}
            <Card>
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
        
        {/* Mobile: Sticky Footer with Action Buttons */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 z-50">
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              <Button
                className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] flex items-center justify-center gap-2"
                onClick={() => navigate(`/checkout?site=${websiteId}`)}
              >
                <Download className="h-4 w-4" />
                Buy Template ${site.price === 0 ? 'Free' : site.price}
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => navigate('/contact')}
              >
                <Code2 className="h-4 w-4" />
                Customize
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>;
};

export default SiteDetails;
