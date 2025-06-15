
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Zap, DollarSign, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const ProjectCalculator = () => {
  const [projectType, setProjectType] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [pages, setPages] = useState('');
  const [timeline, setTimeline] = useState('');
  const [estimate, setEstimate] = useState({ price: 0, time: '', savings: 0 });

  const projectTypes = [
    { id: 'landing', name: 'Landing Page', basePrice: 149, time: '12 hours' },
    { id: 'business', name: 'Business Website', basePrice: 299, time: '24 hours' },
    { id: 'ecommerce', name: 'E-commerce Store', basePrice: 599, time: '48 hours' },
    { id: 'custom', name: 'Custom Application', basePrice: 999, time: '72 hours' }
  ];

  const featureOptions = [
    { id: 'seo', name: 'SEO Optimization', price: 99 },
    { id: 'cms', name: 'Content Management', price: 149 },
    { id: 'ecommerce', name: 'E-commerce Integration', price: 299 },
    { id: 'booking', name: 'Appointment Booking', price: 199 },
    { id: 'analytics', name: 'Advanced Analytics', price: 99 },
    { id: 'social', name: 'Social Media Integration', price: 79 },
    { id: 'multilingual', name: 'Multi-language Support', price: 199 },
    { id: 'mobile', name: 'Mobile App', price: 499 }
  ];

  const pageOptions = [
    { value: '1-3', multiplier: 1 },
    { value: '4-7', multiplier: 1.3 },
    { value: '8-15', multiplier: 1.6 },
    { value: '16+', multiplier: 2 }
  ];

  const timelineOptions = [
    { value: 'rush', name: 'Rush (12-24 hours)', multiplier: 1.5 },
    { value: 'standard', name: 'Standard (24-48 hours)', multiplier: 1 },
    { value: 'economy', name: 'Economy (3-5 days)', multiplier: 0.8 }
  ];

  useEffect(() => {
    if (projectType && pages && timeline) {
      const baseProject = projectTypes.find(p => p.id === projectType);
      const pageMultiplier = pageOptions.find(p => p.value === pages)?.multiplier || 1;
      const timeMultiplier = timelineOptions.find(t => t.value === timeline)?.multiplier || 1;
      
      const featuresPrice = features.reduce((total, featureId) => {
        const feature = featureOptions.find(f => f.id === featureId);
        return total + (feature?.price || 0);
      }, 0);

      const totalPrice = Math.round((baseProject!.basePrice + featuresPrice) * pageMultiplier * timeMultiplier);
      const marketPrice = totalPrice * 3; // Traditional agency pricing
      const savings = marketPrice - totalPrice;

      setEstimate({
        price: totalPrice,
        time: baseProject!.time,
        savings: savings
      });
    }
  }, [projectType, features, pages, timeline]);

  const handleFeatureChange = (featureId: string, checked: boolean) => {
    if (checked) {
      setFeatures([...features, featureId]);
    } else {
      setFeatures(features.filter(f => f !== featureId));
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-6">
            <Calculator className="h-4 w-4 text-[#8B5CF6]" />
            <span className="text-sm font-medium text-[#8B5CF6]">Project Calculator</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Get Your Project Estimate</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get an instant quote for your website project. See how much you save compared to traditional agencies.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-border/40 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[#8B5CF6]" />
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Project Type */}
                <div>
                  <Label className="text-base font-medium mb-3 block">What type of website do you need?</Label>
                  <RadioGroup value={projectType} onValueChange={setProjectType}>
                    {projectTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value={type.id} id={type.id} />
                        <Label htmlFor={type.id} className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <span>{type.name}</span>
                            <span className="text-sm text-muted-foreground">from ${type.basePrice}</span>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Number of Pages */}
                <div>
                  <Label className="text-base font-medium mb-3 block">How many pages?</Label>
                  <Select value={pages} onValueChange={setPages}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of pages" />
                    </SelectTrigger>
                    <SelectContent>
                      {pageOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.value} pages
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Features */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Additional Features</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {featureOptions.map((feature) => (
                      <div key={feature.id} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <Checkbox
                          id={feature.id}
                          checked={features.includes(feature.id)}
                          onCheckedChange={(checked) => handleFeatureChange(feature.id, checked as boolean)}
                        />
                        <Label htmlFor={feature.id} className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">{feature.name}</span>
                            <span className="text-sm text-muted-foreground">+${feature.price}</span>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Timeline Preference</Label>
                  <RadioGroup value={timeline} onValueChange={setTimeline}>
                    {timelineOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                          {option.name}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Estimate Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="border-[#8B5CF6]/20 bg-gradient-to-br from-[#8B5CF6]/5 to-[#A78BFA]/5 backdrop-blur sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-[#8B5CF6]" />
                  Your Project Estimate
                </CardTitle>
              </CardHeader>
              <CardContent>
                {estimate.price > 0 ? (
                  <div className="space-y-6">
                    {/* Price */}
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#8B5CF6] mb-2">
                        ${estimate.price.toLocaleString()}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Delivery in {estimate.time}</span>
                      </div>
                    </div>

                    {/* Savings */}
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                      <div className="text-green-600 font-medium">You Save</div>
                      <div className="text-2xl font-bold text-green-600">
                        ${estimate.savings.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600/80">vs traditional agencies</div>
                    </div>

                    {/* What's Included */}
                    <div>
                      <h4 className="font-medium mb-3">What's Included:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-green-500"></Badge>
                          <span>Professional design & development</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-green-500"></Badge>
                          <span>Mobile responsive design</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-green-500"></Badge>
                          <span>Free hosting setup</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-green-500"></Badge>
                          <span>SSL certificate included</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-green-500"></Badge>
                          <span>30-day money-back guarantee</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-lg py-3">
                      Start Your Project
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      *Final price may vary based on specific requirements. Free consultation included.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Fill out the form to get your instant estimate
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
