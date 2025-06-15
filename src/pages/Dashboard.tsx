import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User, Sparkles, TrendingUp, Code, Users, Radio, BookOpen, BarChart3, Brain, ExternalLink, Settings, ShoppingCart, DollarSign, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import SideNavbar from '@/components/layout/SideNavbar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useWebsites } from '@/hooks/useWebsites';

// Demo data - will be mixed with real uploaded websites
const demoWebsiteTemplates = [
  {
    id: 'demo-1',
    title: "E-commerce Store Template",
    description: "Complete e-commerce solution with shopping cart, payment integration, and admin dashboard. Perfect for online stores.",
    tags: ["E-commerce", "Stripe", "Admin Panel"],
    timestamp: "New",
    price: 299,
    sales: 45,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=300&h=170&q=80",
    category: "E-commerce",
    status: "Available",
    views_count: 245,
    rating_average: 4.8,
    is_featured: false
  },
  {
    id: 'demo-2',
    title: "Corporate Business Website",
    description: "Professional corporate website with CMS, contact forms, and SEO optimization. Ideal for businesses and agencies.",
    tags: ["Corporate", "CMS", "SEO"],
    timestamp: "Featured",
    price: 199,
    sales: 32,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&h=170&q=80",
    category: "Corporate",
    status: "Available",
    views_count: 189,
    rating_average: 4.9,
    is_featured: true
  },
  {
    id: 'demo-3',
    title: "SaaS Landing Page",
    description: "High-converting SaaS landing page with pricing tables, testimonials, and lead capture forms. Ready to launch.",
    tags: ["SaaS", "Landing Page", "Conversion"],
    timestamp: "Hot",
    price: 149,
    sales: 78,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=300&h=170&q=80",
    category: "SaaS",
    status: "Available",
    views_count: 423,
    rating_average: 4.7,
    is_featured: false
  },
  {
    id: 'demo-4',
    title: "Restaurant Website Template",
    description: "Beautiful restaurant website with menu display, online reservations, and food gallery. Mobile optimized.",
    tags: ["Restaurant", "Reservations", "Mobile"],
    timestamp: "Popular",
    price: 179,
    sales: 56,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=300&h=170&q=80",
    category: "Restaurant",
    status: "Available",
    views_count: 312,
    rating_average: 4.6,
    is_featured: false
  },
  {
    id: 'demo-5',
    title: "Portfolio Website Builder",
    description: "Creative portfolio template for designers, photographers, and artists. Showcase your work beautifully.",
    tags: ["Portfolio", "Creative", "Gallery"],
    timestamp: "Trending",
    price: 129,
    sales: 89,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&h=170&q=80",
    category: "Portfolio",
    status: "Available",
    views_count: 567,
    rating_average: 4.9,
    is_featured: false
  },
  {
    id: 'demo-6',
    title: "Real Estate Platform",
    description: "Complete real estate website with property listings, search filters, and agent profiles. Database included.",
    tags: ["Real Estate", "Listings", "Search"],
    timestamp: "Premium",
    price: 399,
    sales: 23,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=300&h=170&q=80",
    category: "Real Estate",
    status: "Available",
    views_count: 156,
    rating_average: 4.8,
    is_featured: false
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  // Fetch real websites from database with better filtering
  const { data: uploadedWebsites = [], isLoading, refetch } = useWebsites({
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    search: searchValue || undefined,
    // Don't filter by status here - let all approved/featured websites show
  });

  // Debug logging
  React.useEffect(() => {
    console.log('Dashboard: uploadedWebsites', uploadedWebsites);
    console.log('Dashboard: isLoading', isLoading);
  }, [uploadedWebsites, isLoading]);

  // Refetch data when component mounts to ensure fresh data
  React.useEffect(() => {
    refetch();
  }, [refetch]);

  const viewTemplateDetail = (templateId: string) => {
    navigate(`/idea/${templateId}`);
  };

  const viewTemplateDemo = (templateId: string) => {
    navigate(`/concept-testing/${templateId}`);
  };

  // Combine demo data with real uploaded websites
  const allWebsites = [
    ...demoWebsiteTemplates,
    ...uploadedWebsites.map(website => ({
      id: website.id,
      title: website.title,
      description: website.description || "No description available",
      tags: website.tags || [],
      timestamp: website.is_featured ? "Featured" : "New",
      price: Number(website.price),
      sales: 0, // New uploads start with 0 sales
      rating: website.rating_average || 0,
      image: website.thumbnail_url || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&h=170&q=80",
      category: website.category,
      status: "Available",
      views_count: website.views_count,
      rating_average: website.rating_average || 0,
      is_featured: website.is_featured
    }))
  ];

  // Apply filters to combined data
  const filteredTemplates = allWebsites.filter(template => {
    // Category filter
    const categoryMatch = selectedCategory === 'all' || template.category.toLowerCase() === selectedCategory.toLowerCase();
    
    // Search filter
    const searchMatch = template.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                       template.description.toLowerCase().includes(searchValue.toLowerCase()) ||
                       template.category.toLowerCase().includes(searchValue.toLowerCase());
    
    // Price filter
    const priceMatch = template.price >= priceRange[0] && template.price <= priceRange[1];
    
    return categoryMatch && searchMatch && priceMatch;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-background to-background/80">
      <SideNavbar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader 
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
        />

        <main className="flex-1 overflow-y-auto p-6 lg:container">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Website Templates Marketplace</h1>
              <p className="text-muted-foreground mt-1">Professional website templates ready to buy and customize for your business</p>
              <p className="text-sm text-blue-600 mt-2">
                Showing {filteredTemplates.length} templates ({uploadedWebsites.length} uploaded + {demoWebsiteTemplates.length} demo)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={() => refetch()}
                disabled={isLoading}
              >
                {isLoading ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]" onClick={() => navigate('/admin-panel')}>
                <Code className="mr-2 h-4 w-4" />
                Upload Website
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-40 bg-gray-200 rounded-t-lg"></div>
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4"></div>
                      <div className="flex justify-between">
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                filteredTemplates.map((template) => (
                  <Card 
                    key={template.id} 
                    className="border border-border/40 bg-card/50 backdrop-blur overflow-hidden flex flex-col hover:shadow-lg transition-shadow group relative h-full"
                  >
                    <div className="h-40 overflow-hidden relative">
                      <img 
                        src={template.image} 
                        alt={template.title} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-[#8B5CF6] text-white text-xs px-2 py-1 rounded-full font-medium">
                          {template.timestamp}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                onClick={() => viewTemplateDemo(template.id)} 
                                variant="secondary" 
                                className="bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                                size="sm"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Preview
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View live demo</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                onClick={() => viewTemplateDetail(template.id)} 
                                variant="secondary" 
                                className="bg-[#8B5CF6]/80 text-white backdrop-blur-sm hover:bg-[#8B5CF6]"
                                size="sm"
                              >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Buy
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Purchase template</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    
                    <CardContent className="p-4 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg cursor-pointer hover:text-[#8B5CF6] transition-colors" onClick={() => viewTemplateDetail(template.id)}>{template.title}</h3>
                        <div className="flex items-center gap-1 text-[#8B5CF6] font-bold">
                          <DollarSign className="h-4 w-4" />
                          <span>{template.price}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{template.description}</p>
                      
                      <div className="mt-auto">
                        <div className="grid grid-cols-3 gap-2 text-xs border-t border-border/40 pt-2 mb-2">
                          <div className="flex flex-col bg-[#8B5CF6]/5 p-2 rounded-md">
                            <div className="flex items-center gap-1 text-muted-foreground mb-1">
                              <TrendingUp className="h-3 w-3 text-[#8B5CF6]" />
                              <span>Sales</span>
                            </div>
                            <div className="font-medium text-sm text-emerald-500">
                              {template.sales || 0} sold
                            </div>
                          </div>
                          
                          <div className="flex flex-col bg-[#8B5CF6]/5 p-2 rounded-md">
                            <div className="flex items-center gap-1 text-muted-foreground mb-1">
                              <Users className="h-3 w-3 text-[#8B5CF6]" />
                              <span>Rating</span>
                            </div>
                            <div className="font-medium text-sm">
                              ⭐ {template.rating_average?.toFixed(1) || '0.0'}
                            </div>
                          </div>
                          
                          <div className="flex flex-col bg-[#8B5CF6]/5 p-2 rounded-md">
                            <div className="flex items-center gap-1 text-muted-foreground mb-1">
                              <Radio className="h-3 w-3 text-[#8B5CF6]" />
                              <span>Views</span>
                            </div>
                            <div className="font-medium text-sm text-emerald-500">
                              {template.views_count || 0}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          {template.tags?.slice(0, 3).map((tag, index) => (
                            <span key={index} className="bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
            
            <div className="lg:col-span-1">
              <Card className="border border-border/40 bg-card/50 backdrop-blur h-full">
                <div className="p-5 border-b border-border/40 flex items-center gap-2">
                  <Brain className="h-5 w-5 text-[#8B5CF6]" />
                  <h3 className="font-semibold">Marketplace Insights</h3>
                </div>
                
                <CardContent className="p-5">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                        <TrendingUp className="h-4 w-4 text-[#8B5CF6]" />
                        Popular Categories
                      </h4>
                      <p className="text-xs text-muted-foreground">E-commerce and SaaS templates are trending this month, with 85% higher sales compared to last quarter.</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                        <BarChart3 className="h-4 w-4 text-[#8B5CF6]" />
                        Best Sellers
                      </h4>
                      <p className="text-xs text-muted-foreground">Portfolio and landing page templates show consistent high demand with 4.8+ average ratings from customers.</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4 text-[#8B5CF6]" />
                        Upload Your Website
                      </h4>
                      <p className="text-xs text-muted-foreground">Ready to sell your website? Upload your template and start earning from your designs.</p>
                      <Button 
                        size="sm" 
                        className="mt-2 w-full bg-[#8B5CF6] hover:bg-[#7C3AED]"
                        onClick={() => navigate('/admin-panel')}
                      >
                        Upload Now
                      </Button>
                    </div>
                    
                    <div className="pt-2 border-t border-border/40">
                      <h4 className="text-sm font-medium mb-2">Featured This Week</h4>
                      <ul className="space-y-2">
                        <li className="flex gap-2 items-center text-xs">
                          <span className="bg-[#8B5CF6]/10 text-[#8B5CF6] p-1 rounded-full">
                            <Code className="h-3 w-3" />
                          </span>
                          <span>New AI-powered chatbot templates</span>
                        </li>
                        <li className="flex gap-2 items-center text-xs">
                          <span className="bg-[#8B5CF6]/10 text-[#8B5CF6] p-1 rounded-full">
                            <DollarSign className="h-3 w-3" />
                          </span>
                          <span>Payment integration ready templates</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8">
            <Card className="p-6 border border-border/40 bg-card/50 backdrop-blur">
              <h2 className="text-xl font-semibold mb-4">Template Categories</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-background rounded-lg border border-border/60">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Ready-to-Use Templates</h3>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#8B5CF6] text-white">12+ Available</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Pre-built websites ready for immediate deployment and customization</p>
                </div>
                <div className="p-4 bg-background rounded-lg border border-border/60">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Custom Development</h3>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-500 text-white">24-48h Delivery</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Bespoke websites built according to your specific requirements</p>
                </div>
                <div className="p-4 bg-background rounded-lg border border-border/60">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Premium Support</h3>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-500 text-white">Included</span>
                  </div>
                  <p className="text-sm text-muted-foreground">30-day support and customization assistance with every purchase</p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
