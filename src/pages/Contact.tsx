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
import { Mail, Phone, Clock, Send, Check, ChevronRight, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { trackFormSubmission } from '@/utils/analytics';
import { cn } from '@/lib/utils';

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
      "relative p-4 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.02]",
      selected
        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
        : "border-border/50 bg-card/50 hover:border-primary/50 hover:bg-card"
    )}
  >
    <div className="flex items-start justify-between gap-2">
      <div className="flex-1">
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <div className={cn(
        "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors",
        selected
          ? "border-primary bg-primary"
          : "border-muted-foreground/30"
      )}>
        {selected && <Check className="w-3 h-3 text-primary-foreground" />}
      </div>
    </div>
  </button>
);

export default function Contact() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    services: [] as string[],
    budget: '',
    timeline: '',
    otherDetails: '',
  });

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
    const selectedServices = formData.services.map(id => 
      serviceOptions.find(s => s.id === id)?.label || id
    ).join(', ');
    
    const selectedBudget = budgetOptions.find(b => b.id === formData.budget)?.label || 'Not specified';
    const selectedTimeline = timelineOptions.find(t => t.id === formData.timeline)?.label || 'Not specified';

    const compiledMessage = `
📋 LEAD INQUIRY SUMMARY
━━━━━━━━━━━━━━━━━━━━━━

👤 Contact: ${formData.name}
📧 Email: ${formData.email}

🎯 Services Interested:
${formData.services.map(id => `   • ${serviceOptions.find(s => s.id === id)?.label}`).join('\n')}

💰 Budget Range: ${selectedBudget}
⏰ Timeline: ${selectedTimeline}

${formData.otherDetails ? `📝 Additional Details:\n${formData.otherDetails}` : ''}
━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          subject: `New Lead: ${selectedServices}`,
          message: compiledMessage,
          type: 'lead-capture',
          projectType: selectedServices,
          budget: selectedBudget,
          timeline: selectedTimeline,
          services: formData.services,
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
        title="Contact Us - WebInHours | Free Website & Premium Services"
        description="Get your free professional website or explore our premium services. Quick form, instant response within 2 hours."
        keywords="free website, contact web agency, premium web services, seo optimization"
      />

      <div className="min-h-screen pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 gap-2">
              <Sparkles className="w-3 h-3" />
              Quick & Easy
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Let's Build Something Amazing
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select what you need, and we'll get back to you within 2 hours with a personalized plan.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <button
                  onClick={() => s < step && setStep(s)}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                    step === s
                      ? "bg-primary text-primary-foreground scale-110"
                      : step > s
                      ? "bg-primary/20 text-primary cursor-pointer hover:bg-primary/30"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </button>
                {s < 3 && (
                  <div className={cn(
                    "w-12 h-1 rounded-full transition-colors",
                    step > s ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Form Card */}
          <Card className="border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Services */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-semibold mb-2">What are you looking for?</h2>
                      <p className="text-sm text-muted-foreground">Select all that apply</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {serviceOptions.map((service) => (
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
                )}

                {/* Step 2: Budget & Timeline */}
                {step === 2 && (
                  <div className="space-y-8">
                    <div>
                      <div className="text-center mb-6">
                        <h2 className="text-xl font-semibold mb-2">What's your budget?</h2>
                        <p className="text-sm text-muted-foreground">This helps us recommend the best options</p>
                      </div>
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
                      <div className="text-center mb-6">
                        <h2 className="text-xl font-semibold mb-2">When do you need this?</h2>
                        <p className="text-sm text-muted-foreground">Choose your preferred timeline</p>
                      </div>
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
                )}

                {/* Step 3: Contact Details */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-semibold mb-2">Almost there!</h2>
                      <p className="text-sm text-muted-foreground">Where should we send your personalized plan?</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="John Doe"
                          className="mt-1.5 bg-background/50"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="john@company.com"
                          className="mt-1.5 bg-background/50"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="details">Anything else? (Optional)</Label>
                      <Textarea
                        id="details"
                        value={formData.otherDetails}
                        onChange={(e) => setFormData(prev => ({ ...prev, otherDetails: e.target.value }))}
                        placeholder="Tell us more about your project, specific requirements, or any questions..."
                        rows={3}
                        className="mt-1.5 bg-background/50"
                      />
                    </div>

                    {/* Summary */}
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                      <h3 className="font-medium mb-3 text-sm">Your Selection Summary</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-muted-foreground">Services:</span> {formData.services.map(id => serviceOptions.find(s => s.id === id)?.label).join(', ')}</p>
                        <p><span className="text-muted-foreground">Budget:</span> {budgetOptions.find(b => b.id === formData.budget)?.label || 'Not selected'}</p>
                        <p><span className="text-muted-foreground">Timeline:</span> {timelineOptions.find(t => t.id === formData.timeline)?.label || 'Not selected'}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="ghost"
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
                      className="gap-2"
                    >
                      Continue
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!canProceed()}
                      className="gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                    >
                      <Send className="w-4 h-4" />
                      Get My Free Plan
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Quick Contact Info */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>support@webinhours.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Response within 2 hours</span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
