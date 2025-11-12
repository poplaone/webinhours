import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { 
  Calculator as CalculatorIcon, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  Globe, 
  ShoppingCart, 
  Smartphone, 
  Zap,
  ArrowRight,
  Star,
  Users,
  Shield
} from 'lucide-react';

interface ProjectType {
  id: string;
  name: string;
  icon: React.ElementType;
  basePrice: number;
  description: string;
  timeframe: string;
  color: string;
}

interface Feature {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

interface TimelineOption {
  label: string;
  value: string;
  multiplier: number;
  description: string;
}

const Calculator = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string>('standard');
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const projectTypes: ProjectType[] = [
    {
      id: 'free',
      name: 'FREE Website',
      icon: Globe,
      basePrice: 0,
      description: 'Professional template-based website',
      timeframe: '1 day',
      color: 'bg-green-500'
    },
    {
      id: 'basic',
      name: 'Basic + Branding',
      icon: Users,
      basePrice: 199,
      description: 'FREE website + custom design',
      timeframe: '2-3 days',
      color: 'bg-blue-500'
    },
    {
      id: 'professional',
      name: 'Professional Package',
      icon: ShoppingCart,
      basePrice: 399,
      description: 'FREE website + branding + SEO',
      timeframe: '3-4 days',
      color: 'bg-purple-500'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Solution',
      icon: Zap,
      basePrice: 799,
      description: 'Everything + advanced features',
      timeframe: '5-7 days',
      color: 'bg-orange-500'
    }
  ];

  const features: Feature[] = [
    {
      id: 'seo',
      name: 'Advanced SEO Optimization',
      price: 149,
      description: 'Complete SEO setup and optimization',
      category: 'Marketing'
    },
    {
      id: 'analytics',
      name: 'Analytics & Tracking',
      price: 99,
      description: 'Google Analytics and conversion tracking',
      category: 'Analytics'
    },
    {
      id: 'cms',
      name: 'Content Management System',
      price: 199,
      description: 'Easy-to-use content management',
      category: 'Functionality'
    },
    {
      id: 'api',
      name: 'API Integration',
      price: 299,
      description: 'Third-party service integrations',
      category: 'Functionality'
    },
    {
      id: 'security',
      name: 'Enhanced Security',
      price: 179,
      description: 'Advanced security features and SSL',
      category: 'Security'
    },
    {
      id: 'mobile',
      name: 'Mobile App Integration',
      price: 399,
      description: 'Mobile app connectivity',
      category: 'Mobile'
    },
    {
      id: 'support',
      name: '6-Month Premium Support',
      price: 249,
      description: 'Extended support and maintenance',
      category: 'Support'
    },
    {
      id: 'design',
      name: 'Custom Design System',
      price: 349,
      description: 'Unique brand-focused design',
      category: 'Design'
    }
  ];

  const timelineOptions: TimelineOption[] = [
    {
      label: 'Rush (12-24 hours)',
      value: 'rush',
      multiplier: 1.5,
      description: 'Express delivery with priority support'
    },
    {
      label: 'Standard (2-3 days)',
      value: 'standard',
      multiplier: 1,
      description: 'Our regular delivery timeline'
    },
    {
      label: 'Extended (1 week)',
      value: 'extended',
      multiplier: 0.9,
      description: 'More time for detailed customization'
    }
  ];

  useEffect(() => {
    calculateTotal();
  }, [selectedType, selectedFeatures, timeline]);

  const calculateTotal = () => {
    let total = 0;
    
    // Base project price
    const projectType = projectTypes.find(type => type.id === selectedType);
    if (projectType) {
      total += projectType.basePrice;
    }
    
    // Add feature prices
    selectedFeatures.forEach(featureId => {
      const feature = features.find(f => f.id === featureId);
      if (feature) {
        total += feature.price;
      }
    });
    
    // Apply timeline multiplier
    const timelineOption = timelineOptions.find(option => option.value === timeline);
    if (timelineOption) {
      total *= timelineOption.multiplier;
    }
    
    setTotalPrice(Math.round(total));
  };

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const getSelectedProject = () => projectTypes.find(type => type.id === selectedType);

  const progress = selectedType ? (selectedFeatures.length > 0 ? (timeline ? 100 : 75) : 50) : 25;

  return (
    <AppLayout>
      <SEOHead 
        title="Project Calculator - Get Instant Quote | WebInHours"
        description="Calculate the cost of your website project instantly. Get transparent pricing for landing pages, business websites, e-commerce stores, and custom development."
        keywords="website cost calculator, project quote, web development pricing, website price estimate"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        {/* Header Section */}
        <section className="pt-20 pb-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-6">
                <CalculatorIcon className="h-5 w-5 text-[#8B5CF6]" />
                <span className="text-sm font-medium text-[#8B5CF6]">Project Calculator</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Start FREE, Add What You Need
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Your professional website is <span className="text-green-500 font-semibold">100% FREE</span>. Calculate the cost of premium services you might want to add later.
              </p>
              
              {/* Progress Indicator */}
              <div className="max-w-md mx-auto mt-8">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Configuration Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Content */}
        <section className="px-4 pb-20">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Configuration Panel */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Step 1: Project Type */}
                <Card className="border-border/40 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                      Choose Your Starting Package
                    </CardTitle>
                    <CardDescription>
                      Start with FREE and optionally add premium services
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {projectTypes.map((type) => {
                        const Icon = type.icon;
                        const isSelected = selectedType === type.id;
                        
                        return (
                          <div
                            key={type.id}
                            className={`p-6 rounded-xl border-2 cursor-pointer group hover:shadow-lg ${
                              isSelected 
                                ? 'border-[#8B5CF6] bg-[#8B5CF6]/5' 
                                : 'border-border hover:border-[#8B5CF6]/50'
                            }`}
                            onClick={() => setSelectedType(type.id)}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-lg ${type.color} flex items-center justify-center`}>
                                <Icon className="h-6 w-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold mb-1 group-hover:text-[#8B5CF6]">
                                  {type.name}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {type.description}
                                </p>
                                <div className="flex items-center justify-between">
                                  <Badge variant="outline" className="text-xs">
                                    {type.timeframe}
                                  </Badge>
                                  <span className="font-bold text-[#8B5CF6]">
                                    ${type.basePrice}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Step 2: Features */}
                {selectedType && (
                  <Card className="border-border/40 bg-card/50 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-[#8B5CF6] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                        Add Features & Enhancements
                      </CardTitle>
                      <CardDescription>
                        Customize your project with additional features (optional)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {features.map((feature) => {
                          const isSelected = selectedFeatures.includes(feature.id);
                          
                          return (
                            <div
                              key={feature.id}
                              className={`p-4 rounded-lg border cursor-pointer hover:shadow-md ${
                                isSelected 
                                  ? 'border-[#8B5CF6] bg-[#8B5CF6]/5' 
                                  : 'border-border hover:border-[#8B5CF6]/50'
                              }`}
                              onClick={() => handleFeatureToggle(feature.id)}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{feature.name}</h4>
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {feature.category}
                                  </Badge>
                                  {isSelected && (
                                    <CheckCircle className="h-5 w-5 text-[#8B5CF6]" />
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {feature.description}
                              </p>
                              <span className="font-semibold text-[#8B5CF6]">
                                +${feature.price}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Step 3: Timeline */}
                {selectedType && (
                  <Card className="border-border/40 bg-card/50 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-[#8B5CF6] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                        Select Timeline
                      </CardTitle>
                      <CardDescription>
                        Choose your preferred delivery timeline
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {timelineOptions.map((option) => {
                          const isSelected = timeline === option.value;
                          
                          return (
                            <div
                              key={option.value}
                              className={`p-4 rounded-lg border cursor-pointer hover:shadow-md ${
                                isSelected 
                                  ? 'border-[#8B5CF6] bg-[#8B5CF6]/5' 
                                  : 'border-border hover:border-[#8B5CF6]/50'
                              }`}
                              onClick={() => setTimeline(option.value)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <Clock className="h-5 w-5 text-[#8B5CF6]" />
                                  <div>
                                    <h4 className="font-medium">{option.label}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {option.description}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {option.multiplier !== 1 && (
                                    <Badge 
                                      variant={option.multiplier > 1 ? "destructive" : "default"}
                                      className="text-xs"
                                    >
                                      {option.multiplier > 1 ? '+' : ''}{((option.multiplier - 1) * 100).toFixed(0)}%
                                    </Badge>
                                  )}
                                  {isSelected && (
                                    <CheckCircle className="h-5 w-5 text-[#8B5CF6]" />
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Quote Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card className="border-border/40 bg-card/50 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-[#8B5CF6]" />
                        Project Quote
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      
                      {/* Selected Project Type */}
                      {selectedType && (
                        <div>
                          <h4 className="font-medium mb-3">Project Type</h4>
                          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            {(() => {
                              const project = getSelectedProject();
                              if (project) {
                                const Icon = project.icon;
                                return (
                                  <>
                                    <div className={`w-10 h-10 rounded-lg ${project.color} flex items-center justify-center`}>
                                      <Icon className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="font-medium">{project.name}</p>
                                      <p className="text-sm text-muted-foreground">${project.basePrice}</p>
                                    </div>
                                  </>
                                );
                              }
                              return null;
                            })()}
                          </div>
                        </div>
                      )}

                      {/* Selected Features */}
                      {selectedFeatures.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-3">Added Features</h4>
                          <div className="space-y-2">
                            {selectedFeatures.map(featureId => {
                              const feature = features.find(f => f.id === featureId);
                              return feature ? (
                                <div key={featureId} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                                  <span className="text-sm">{feature.name}</span>
                                  <span className="text-sm font-medium text-[#8B5CF6]">+${feature.price}</span>
                                </div>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}

                      {/* Timeline */}
                      {timeline && (
                        <div>
                          <h4 className="font-medium mb-3">Timeline</h4>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm">
                              {timelineOptions.find(opt => opt.value === timeline)?.label}
                            </p>
                            {timeline !== 'standard' && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {timeline === 'rush' ? 'Rush fee applied' : 'Extended timeline discount'}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      <Separator />

                      {/* Total */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-lg font-bold">
                          <span>Total Investment</span>
                          <span className="text-2xl text-[#8B5CF6]">${totalPrice.toLocaleString()}</span>
                        </div>
                        
                        {selectedType && (
                          <div className="space-y-3">
                            <Button 
                              className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED]" 
                              size="lg"
                              onClick={() => navigate('/contact')}
                            >
                              Get Started Now
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => navigate('/marketplace')}
                            >
                              Browse Templates
                            </Button>
                          </div>
                        )}

                        {/* Trust Indicators */}
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                          <div className="text-center">
                            <Star className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
                            <p className="text-xs text-muted-foreground">4.9/5 Rating</p>
                          </div>
                          <div className="text-center">
                            <Shield className="h-5 w-5 text-green-500 mx-auto mb-1" />
                            <p className="text-xs text-muted-foreground">Money-back Guarantee</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Calculator;