import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, Clock, Send, Check, ChevronRight, Sparkles, Loader2, Crown, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { trackFormSubmission } from '@/utils/analytics';
import { cn } from '@/lib/utils';
import { PremiumServicesModal } from '@/components/modals/PremiumServicesModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// Service options
const serviceOptions = [
  { id: 'free-website', label: 'Free Website', description: 'Get a professional website at no cost' },
  { id: 'custom-website', label: 'Custom Website', description: 'Tailored design for your brand' },
  { id: 'ecommerce', label: 'E-commerce Store', description: 'Online store setup & management' },
  { id: 'seo-geo', label: 'SEO & GEO Optimization', description: 'Rank higher in search results' },
  { id: 'content-creation', label: 'Content Creation', description: 'Professional copywriting & media' },
  { id: 'social-media', label: 'Social Media Management', description: 'Grow your online presence' },
  { id: 'pr-marketing', label: 'PR & Marketing', description: 'Brand awareness campaigns' },
  { id: 'maintenance', label: 'Website Maintenance', description: 'Updates & technical support' },
  { id: 'other', label: 'Other', description: 'Something else? Tell us below' },
];

// Budget options
const budgetOptions = [
  { id: 'free', label: 'Free Tier', description: 'Basic features included' },
  { id: 'starter', label: '$500 - $2,000', description: 'Small business solutions' },
  { id: 'growth', label: '$2,000 - $5,000', description: 'Growing business needs' },
  { id: 'enterprise', label: '$5,000+', description: 'Enterprise solutions' },
  { id: 'not-sure', label: 'Not Sure Yet', description: 'Need consultation' },
];

// Timeline options
const timelineOptions = [
  { id: 'asap', label: 'ASAP', description: 'Within 1 week' },
  { id: '2-weeks', label: '2 Weeks', description: 'Standard timeline' },
  { id: '1-month', label: '1 Month', description: 'Flexible timeline' },
  { id: 'planning', label: 'Just Planning', description: 'No rush' },
];

interface OptionCardProps {
  id: string;
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  multi?: boolean;
}

const OptionCard: React.FC<OptionCardProps> = ({ label, description, selected, onClick, multi }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "relative p-4 rounded-lg border text-left transition-colors duration-200",
      selected
        ? "border-primary bg-primary/5 text-primary"
        : "border-border bg-transparent hover:border-primary/50 hover:bg-primary/5"
    )}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 space-y-1">
        <p className={cn("font-medium", selected ? "text-primary" : "text-foreground")}>{label}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div className={cn(
        "w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5",
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-muted-foreground/30"
      )}>
        {selected && <Check className="w-2.5 h-2.5" />}
      </div>
    </div>
  </button>
);

export default function Contact() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    services: [] as string[],
    budget: '',
    timeline: '',
    otherDetails: '',
    customService: '',
  });
  
  // Validation states
  const [touched, setTouched] = useState({ name: false, email: false });
  const [validationErrors, setValidationErrors] = useState({ name: '', email: '' });

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Real-time validation
  useEffect(() => {
    const errors = { name: '', email: '' };
    
    if (touched.name && !formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (touched.email) {
      if (!formData.email.trim()) {
        errors.email = 'Email is required';
      } else if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }
    
    setValidationErrors(errors);
  }, [formData.name, formData.email, touched]);

  // Pre-select service from URL parameter
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam && serviceOptions.some(s => s.id === serviceParam)) {
      setFormData(prev => ({
        ...prev,
        services: prev.services.includes(serviceParam) ? prev.services : [...prev.services, serviceParam]
      }));
    }
  }, [searchParams]);

  const toggleService = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  // Helper function to get service display label
  const getServiceLabel = (id: string): string => {
    if (id === 'other') return formData.customService ? `Other: ${formData.customService}` : 'Other';
    if (id === 'premium-solutions') return 'Premium Digital Solutions';
    return serviceOptions.find(s => s.id === id)?.label || id;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({
        title: "Required Fields",
        description: "Please enter your name and email.",
        variant: "destructive",
      });
      return;
    }

    if (formData.services.length === 0) {
      toast({
        title: "Select a Service",
        description: "Please select at least one service you're interested in.",
        variant: "destructive",
      });
      return;
    }

    // Build compiled message
    const selectedServices = formData.services.map(id => getServiceLabel(id)).join(', ');

    const selectedBudget = budgetOptions.find(b => b.id === formData.budget)?.label || 'Not specified';
    const selectedTimeline = timelineOptions.find(t => t.id === formData.timeline)?.label || 'Not specified';

    const compiledMessage = `
📋 LEAD INQUIRY SUMMARY
━━━━━━━━━━━━━━━━━━━━━━

👤 Contact: ${formData.name}
📧 Email: ${formData.email}

🎯 Services Interested:
${formData.services.map(id => `   • ${getServiceLabel(id)}`).join('\n')}

💰 Budget Range: ${selectedBudget}
⏰ Timeline: ${selectedTimeline}

${formData.otherDetails ? `📝 Additional Details:\n${formData.otherDetails}` : ''}
━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          subject: `New Lead: ${selectedServices}`,
          message: compiledMessage,
          type: 'lead-capture',
          projectType: selectedServices,
          budget: formData.budget,
          timeline: formData.timeline,
          services: formData.services,
          customService: formData.customService,
        }
      });

      if (error) throw error;

      trackFormSubmission('contact_form', true);
      navigate(`/contact/confirmation?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&type=lead`);
    } catch (error) {
      console.error("Error sending message:", error);
      trackFormSubmission('contact_form', false);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.services.length > 0;
    if (step === 2) return formData.budget !== '';
    if (step === 3) return formData.name.trim() !== '' && formData.email.trim() !== '';
    return true;
  };

  return (
    <AppLayout>
      <SEOHead
        title="Contact Us - WebInHours | Get Started Today"
        description="Get in touch with our team for your website project. We're here to help you build your dream website."
      />

      <div className="container mx-auto p-4 lg:p-8 pb-32">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">Start Your Project</h1>
            <p className="text-lg text-muted-foreground">
              Tell us about your needs and we'll help you get started.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 text-sm font-medium">
              <div className={cn("flex items-center gap-2 transition-colors", step >= 1 && "text-primary")}>
                <span className={cn("w-6 h-6 rounded-full flex items-center justify-center border text-xs", step >= 1 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30")}>1</span>
                Services
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/30" />
              <div className={cn("flex items-center gap-2 transition-colors", step >= 2 && "text-primary")}>
                <span className={cn("w-6 h-6 rounded-full flex items-center justify-center border text-xs", step >= 2 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30")}>2</span>
                Details
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/30" />
              <div className={cn("flex items-center gap-2 transition-colors", step >= 3 && "text-primary")}>
                <span className={cn("w-6 h-6 rounded-full flex items-center justify-center border text-xs", step >= 3 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30")}>3</span>
                Info
              </div>
            </div>
          </div>

          {/* Form Card */}
          <Card className="border border-border/50 shadow-sm bg-white/5 backdrop-blur-md">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Services */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground mb-1">Select Services</h2>
                      <p className="text-sm text-muted-foreground mb-4">Choose all that apply to your project.</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {serviceOptions.filter(s => s.id !== 'other').map((service) => (
                          <OptionCard
                            key={service.id}
                            {...service}
                            selected={formData.services.includes(service.id)}
                            onClick={() => toggleService(service.id)}
                            multi
                          />
                        ))}
                      </div>

                      {/* Premium Digital Solutions Banner */}
                      <div
                        className={cn(
                          "mt-4 mb-4 p-6 rounded-xl border transition-all duration-200 cursor-pointer relative",
                          formData.services.includes('premium-solutions')
                            ? "border-purple-500 bg-purple-500/5"
                            : "border-purple-500/20 bg-gradient-to-br from-purple-900/5 to-blue-900/5 backdrop-blur-sm hover:border-purple-500/40"
                        )}
                        onClick={() => toggleService('premium-solutions')}
                      >
                        {/* Selection Checkmark */}
                        <div className={cn(
                          "absolute top-4 right-4 w-6 h-6 rounded-full border flex items-center justify-center transition-all",
                          formData.services.includes('premium-solutions')
                            ? "border-purple-500 bg-purple-500 text-white"
                            : "border-purple-500/30 bg-transparent"
                        )}>
                          {formData.services.includes('premium-solutions') && <Check className="w-4 h-4" />}
                        </div>

                        <div className="flex items-start justify-between gap-4 flex-col sm:flex-row sm:items-center pr-8">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="border-purple-500/30 text-purple-600 bg-purple-500/5">Ecosystem Services</Badge>
                            </div>
                            <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                              Premium Digital Solutions
                            </h3>
                            <p className="text-sm text-muted-foreground max-w-xl">
                              Access our vetted ecosystem of enterprise-grade services. From reputation defense to exclusive digital asset acquisition.
                            </p>
                          </div>
                          <PremiumServicesModal>
                            <Button
                              type="button"
                              onClick={(e) => e.stopPropagation()}
                              className="shrink-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md"
                            >
                              <Crown className="w-4 h-4 mr-2" />
                              View Premium Solutions
                            </Button>
                          </PremiumServicesModal>
                        </div>
                      </div>

                      {/* Other Option */}
                      <div className="mb-2">
                        {serviceOptions.filter(s => s.id === 'other').map((service) => (
                          <OptionCard
                            key={service.id}
                            {...service}
                            selected={formData.services.includes(service.id)}
                            onClick={() => toggleService(service.id)}
                            multi
                          />
                        ))}
                      </div>
                    </div>

                    {/* Custom service text field */}
                    {formData.services.includes('other') && (
                      <div className="pt-2">
                        <Label htmlFor="customService">Please specify</Label>
                        <Input
                          id="customService"
                          value={formData.customService}
                          onChange={(e) => setFormData(prev => ({ ...prev, customService: e.target.value }))}
                          placeholder="Describe the service..."
                          className="mt-1.5"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Budget & Timeline */}
                {step === 2 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground mb-1">Project Details</h2>
                      <p className="text-sm text-muted-foreground mb-4">Help us understand your scope.</p>

                      <div className="space-y-6">
                        <div>
                          <Label className="mb-2 block text-sm font-medium">Budget Range</Label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {budgetOptions.map((budget) => (
                              <OptionCard
                                key={budget.id}
                                {...budget}
                                selected={formData.budget === budget.id}
                                onClick={() => setFormData(prev => ({ ...prev, budget: budget.id }))}
                              />
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label className="mb-2 block text-sm font-medium">Timeline</Label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {timelineOptions.map((timeline) => (
                              <OptionCard
                                key={timeline.id}
                                {...timeline}
                                selected={formData.timeline === timeline.id}
                                onClick={() => setFormData(prev => ({ ...prev, timeline: timeline.id }))}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Contact Details */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground mb-1">Your Information</h2>
                      <p className="text-sm text-muted-foreground mb-4">Where should we send the plan?</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
                            placeholder="John Doe"
                            required
                            className={cn("bg-background", validationErrors.name && touched.name && "border-destructive focus-visible:ring-destructive")}
                          />
                          {validationErrors.name && touched.name && (
                            <p className="text-xs text-destructive flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {validationErrors.name}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                            placeholder="john@company.com"
                            required
                            className={cn("bg-background", validationErrors.email && touched.email && "border-destructive focus-visible:ring-destructive")}
                          />
                          {validationErrors.email && touched.email && (
                            <p className="text-xs text-destructive flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {validationErrors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-5 space-y-2">
                        <Label htmlFor="details">Additional Notes (Optional)</Label>
                        <Textarea
                          id="details"
                          value={formData.otherDetails}
                          onChange={(e) => setFormData(prev => ({ ...prev, otherDetails: e.target.value }))}
                          placeholder="Any specific requirements or questions?"
                          rows={4}
                          className="bg-background resize-none"
                        />
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-muted/30 rounded-lg p-4 border border-border/50 text-sm">
                      <h3 className="font-semibold mb-3">Summary</h3>
                      <dl className="space-y-3">
                        <div>
                          <dt className="text-muted-foreground mb-1">Services:</dt>
                          <dd className="flex flex-wrap gap-1">
                            {formData.services.map(id => (
                              <Badge key={id} variant="secondary" className="text-xs">
                                {getServiceLabel(id)}
                              </Badge>
                            ))}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Budget:</dt>
                          <dd className="font-medium">{budgetOptions.find(b => b.id === formData.budget)?.label || '-'}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Timeline:</dt>
                          <dd className="font-medium">{timelineOptions.find(t => t.id === formData.timeline)?.label || '-'}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                )}

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-border/50">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(s => s - 1)}
                    >
                      Back
                    </Button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={() => setStep(s => s + 1)}
                      disabled={!canProceed()}
                      className="min-w-[120px]"
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => {
                        // Mark fields as touched for validation
                        setTouched({ name: true, email: true });
                        // Check if valid before showing modal
                        if (formData.name.trim() && formData.email.trim() && emailRegex.test(formData.email)) {
                          setShowConfirmModal(true);
                        }
                      }}
                      disabled={!canProceed() || isSubmitting || !!validationErrors.name || !!validationErrors.email}
                      className="min-w-[140px]"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Review & Submit
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Clean Contact Footer */}
          <div className="mt-12 border-t border-border/40 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              <div className="flex flex-col items-center md:items-start gap-1">
                <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Mail className="w-4 h-4" /> Email Us
                </span>
                <span className="text-sm text-muted-foreground">support@webinhour.com</span>
              </div>
              <div className="flex flex-col items-center md:items-start gap-1">
                <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Phone className="w-4 h-4" /> Call Us
                </span>
                <span className="text-sm text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex flex-col items-center md:items-start gap-1">
                <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Clock className="w-4 h-4" /> Support
                </span>
                <span className="text-sm text-muted-foreground">24/7 Priority Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AlertDialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <AlertDialogContent className="max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Check className="w-5 h-5 text-primary" />
              Confirm Your Submission
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-4 pt-2">
                <p className="text-muted-foreground">Please review your selections before submitting:</p>
                
                <div className="bg-muted/50 rounded-lg p-4 space-y-3 text-sm">
                  <div className="flex justify-between items-start">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium text-foreground">{formData.name}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium text-foreground">{formData.email}</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <span className="text-muted-foreground">Services:</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {formData.services.map(id => (
                        <Badge key={id} variant="secondary" className="text-xs">
                          {getServiceLabel(id)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="font-medium text-foreground">
                      {budgetOptions.find(b => b.id === formData.budget)?.label || 'Not specified'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timeline:</span>
                    <span className="font-medium text-foreground">
                      {timelineOptions.find(t => t.id === formData.timeline)?.label || 'Not specified'}
                    </span>
                  </div>
                  {formData.otherDetails && (
                    <div className="border-t border-border pt-3">
                      <span className="text-muted-foreground">Additional Notes:</span>
                      <p className="mt-1 text-foreground text-xs">{formData.otherDetails}</p>
                    </div>
                  )}
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Edit Details</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                setShowConfirmModal(false);
                handleSubmit(e as unknown as React.FormEvent);
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Confirm & Submit
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}
