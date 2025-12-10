import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import {
  Calculator as CalculatorIcon,
  DollarSign,
  CheckCircle,
  Globe,
  ShoppingCart,
  Zap,
  ArrowRight,
  Users,
  Crown
} from 'lucide-react';
import { PremiumServicesModal } from '@/components/modals/PremiumServicesModal';

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
      description: 'FREE website + branding + SEO & GEO',
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
      name: 'Advanced SEO & GEO Optimization',
      price: 149,
      description: 'Complete SEO & GEO setup and optimization',
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

  const handleContinue = () => {
    // Navigate to contact with the selected base package
    if (selectedType) {
      navigate(`/contact?service=${selectedType}`);
    } else {
      navigate('/contact');
    }
  };

  return (
    <AppLayout showMobileNav={false}>
      <SEOHead
        title="Project Cost Calculator - WebInHours"
        description="Estimate the cost of your custom website or app project. get an instant quote for our professional services."
      />

      <div className="container mx-auto p-4 lg:p-8 pb-32">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4">Instant Quote</Badge>
          <h1 className="text-3xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Project Cost Calculator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
            Customize your package to get an instant estimate for your project.
          </p>

          <PremiumServicesModal>
            <Button variant="outline" className="border-purple-500/30 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/10">
              <Crown className="w-4 h-4 mr-2" />
              Premium Digital Solutions
            </Button>
          </PremiumServicesModal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-8">

            {/* Step 1: Project Type */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">1</div>
                <h2 className="text-xl font-semibold">Select Base Package</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedType === type.id;

                  return (
                    <div
                      key={type.id}
                      className={cn(
                        "relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200",
                        isSelected
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-muted bg-transparent hover:border-primary/50"
                      )}
                      onClick={() => setSelectedType(type.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className={cn("font-semibold mb-1", isSelected && "text-primary")}>
                            {type.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                            {type.description}
                          </p>
                          <div className="flex items-center justify-between mt-auto">
                            <Badge variant="secondary" className="text-xs font-normal">
                              {type.timeframe}
                            </Badge>
                            <span className="font-bold text-lg">
                              ${type.basePrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Features */}
            {selectedType && (
              <div className="space-y-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">2</div>
                  <h2 className="text-xl font-semibold">Add Features</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature) => {
                    const isSelected = selectedFeatures.includes(feature.id);

                    return (
                      <div
                        key={feature.id}
                        className={cn(
                          "group p-4 rounded-lg border cursor-pointer transition-all duration-200",
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-muted bg-transparent hover:border-primary/50"
                        )}
                        onClick={() => handleFeatureToggle(feature.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {isSelected ? (
                              <CheckCircle className="h-5 w-5 text-primary" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border border-muted-foreground/30" />
                            )}
                            <h4 className={cn("font-medium", isSelected && "text-primary")}>{feature.name}</h4>
                          </div>
                          <span className="font-semibold text-sm">
                            +${feature.price}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground pl-7">
                          {feature.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Timeline */}
            {selectedType && (
              <div className="space-y-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">3</div>
                  <h2 className="text-xl font-semibold">Timeline Preference</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {timelineOptions.map((option) => {
                    const isSelected = timeline === option.value;

                    return (
                      <div
                        key={option.value}
                        className={cn(
                          "group p-4 rounded-lg border cursor-pointer transition-all duration-200 text-center",
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-muted bg-transparent hover:border-primary/50"
                        )}
                        onClick={() => setTimeline(option.value)}
                      >
                        <div className="font-semibold mb-1">{option.label}</div>
                        {option.multiplier !== 1 && (
                          <Badge variant={option.multiplier > 1 ? "destructive" : "secondary"} className="mb-2 text-xs">
                            {option.multiplier > 1 ? `+${((option.multiplier - 1) * 100).toFixed(0)}%` : `${((option.multiplier - 1) * 100).toFixed(0)}%`}
                          </Badge>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Summary Sidebar - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border border-border shadow-md overflow-hidden">
                <div className="bg-white/5 backdrop-blur-sm p-4 border-b border-border">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Estimated Cost
                  </CardTitle>
                </div>
                <CardContent className="p-6 space-y-6">

                  {/* Selected Project Type */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Package</h4>
                    {selectedType ? (
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{getSelectedProject()?.name}</p>
                          <p className="text-xs text-muted-foreground">{getSelectedProject()?.timeframe}</p>
                        </div>
                        <p className="font-medium">${getSelectedProject()?.basePrice}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">No package selected</p>
                    )}
                  </div>

                  <Separator />

                  {/* Selected Features */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Add-ons</h4>
                    {selectedFeatures.length > 0 ? (
                      <div className="space-y-2">
                        {selectedFeatures.map(featureId => {
                          const feature = features.find(f => f.id === featureId);
                          return feature ? (
                            <div key={featureId} className="flex justify-between text-sm">
                              <span>{feature.name}</span>
                              <span className="font-medium">+${feature.price}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">None selected</p>
                    )}
                  </div>

                  <Separator />

                  {/* Timeline Multiplier */}
                  {timeline !== 'standard' && (
                    <div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Timeline Adjustment</span>
                        <span className={timelineOptions.find(t => t.value === timeline)?.multiplier! > 1 ? "text-red-500" : "text-green-500"}>
                          {timelineOptions.find(t => t.value === timeline)?.multiplier! > 1 ? '+' : ''}
                          {((timelineOptions.find(t => t.value === timeline)?.multiplier! - 1) * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Separator className="mt-4" />
                    </div>
                  )}

                  {/* Total */}
                  <div className="pt-2">
                    <div className="flex items-end justify-between mb-2">
                      <span className="font-bold text-lg">Total</span>
                      <span className="text-4xl font-bold tracking-tight text-primary">
                        ${totalPrice.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground text-right">*Estimated investment</p>
                  </div>

                  <Button
                    className="w-full h-12 text-lg font-semibold shadow-lg"
                    onClick={handleContinue}
                    disabled={!selectedType}
                  >
                    Process Inquiry
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    No payment required to inquire.
                  </p>
                </CardContent>
              </Card>

              {/* Premium Solutions Section */}
              <div className="mt-6 p-6 rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-900/5 to-blue-900/5 backdrop-blur-sm text-center">
                <div className="flex justify-center mb-3">
                  <Badge variant="outline" className="border-purple-500/30 text-purple-600 bg-purple-500/5">Ecosystem Services</Badge>
                </div>
                <h3 className="text-lg font-bold mb-2">Premium Digital Solutions</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Access our vetted ecosystem of enterprise-grade services. From reputation defense to exclusive digital asset acquisition.
                </p>
                <PremiumServicesModal>
                  <Button variant="default" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md">
                    <Crown className="w-4 h-4 mr-2" />
                    View Premium Solutions
                  </Button>
                </PremiumServicesModal>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/20 backdrop-blur-md border-t border-border p-4 lg:hidden shadow-[0_-4px_12px_-5px_rgba(0,0,0,0.1)] z-50 animate-in slide-in-from-bottom transition-all">
        <div className="container mx-auto max-w-7xl flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Estimated Total</span>
            <span className="text-2xl font-bold text-primary">${totalPrice.toLocaleString()}</span>
          </div>
          <Button
            className="px-6 h-11 font-semibold shadow-md"
            onClick={handleContinue}
            disabled={!selectedType}
          >
            Process <ArrowRight className="ml-2 h-4 w-4 hidden sm:inline" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Calculator;