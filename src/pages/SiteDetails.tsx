import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Download, Star, User, Calendar, Tag, Globe, Code2, Palette, Smartphone, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useWebsites } from '@/hooks/useWebsites';

const SiteDetails = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const {
    toast
  } = useToast();
  const {
    data: websites = []
  } = useWebsites({
    includeAll: true
  });
  const site = websites.find(w => w.id === id);

  const handlePurchase = () => {
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
  };
  const handlePreview = () => {
    if (site?.preview_url) {
      window.open(site.preview_url, '_blank', 'noopener,noreferrer');
    } else {
      toast({
        title: "Preview Not Available",
        description: "Preview URL is not available for this template.",
        variant: "destructive"
      });
    }
  };

  if (!site) {
    return <div className="min-h-screen bg-gradient-to-br from-background to-background/80 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Site Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested site could not be found.</p>
          <Button onClick={() => navigate('/marketplace')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Button>
        </Card>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-to-br from-background to-background/80">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => navigate('/marketplace')} className="flex items-center gap-2">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Site Preview */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img src={site.thumbnail_url || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&h=450&q=80"} alt={site.title} className="w-full h-full object-cover" />
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Template</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {site.description || "This is a professional website template designed for modern businesses. It features a clean, responsive design that looks great on all devices."}
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(site.features || ['Responsive Design', 'Modern UI', 'Fast Loading', 'SEO Optimized']).map((feature, index) => <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#8B5CF6] rounded-full"></div>
                      <span>{feature}</span>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* Technologies */}
            <Card>
              <CardHeader>
                <CardTitle>Technologies Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(site.technologies || ['HTML', 'CSS', 'JavaScript', 'React']).map((tech, index) => <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      <Code2 className="h-3 w-3" />
                      {tech}
                    </Badge>)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Info */}
            <Card>
              <CardHeader>
                <CardTitle>Purchase Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Price</span>
                  <span className="text-2xl font-bold text-[#8B5CF6]">
                    ${site.price === 0 ? 'Free' : site.price}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium">Category</span>
                  <Badge>{site.category}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Status</span>
                  <Badge variant={site.status === 'approved' ? 'default' : 'secondary'}>
                    {site.status}
                  </Badge>
                </div>
                <Separator />
                <Button className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED]" onClick={handlePurchase}>
                  <Download className="mr-2 h-4 w-4" />
                  {site.price === 0 ? 'Download Now' : 'Purchase Now'}
                </Button>
                {!user && <p className="text-xs text-center text-muted-foreground mt-2">
                    Sign in required to purchase
                  </p>}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span>Views</span>
                  </div>
                  <span className="font-medium">{site.views_count || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-muted-foreground" />
                    <span>Downloads</span>
                  </div>
                  <span className="font-medium">{site.downloads_count || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <span>Rating</span>
                  </div>
                  <span className="font-medium">
                    ⭐ {site.rating_average?.toFixed(1) || '0.0'} ({site.rating_count || 0})
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(site.tags || ['web', 'template', 'responsive']).map((tag, index) => <Badge key={index} variant="outline" className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {tag}
                    </Badge>)}
                </div>
              </CardContent>
            </Card>

            {/* What's Included */}
            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {site.inclusions && site.inclusions.length > 0 ? site.inclusions.map((inclusion, index) => <div key={index} className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{inclusion}</span>
                    </div>) : <>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Source code files</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Documentation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="text-sm">30-day support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Future updates</span>
                    </div>
                  </>}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
export default SiteDetails;
