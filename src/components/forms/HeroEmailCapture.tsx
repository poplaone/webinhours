import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from 'zod';

const emailSchema = z.string()
  .trim()
  .email({ message: "Please enter a valid email address" })
  .max(255, { message: "Email must be less than 255 characters" });

interface HeroEmailCaptureProps {
  className?: string;
}

/**
 * Inline, low-friction email capture for the hero. Captures the lead immediately
 * via the shared send-contact-email pipeline, then routes to the confirmation page
 * so the visitor can add project details there.
 */
export const HeroEmailCapture: React.FC<HeroEmailCaptureProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      toast({
        title: "Invalid email",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    const cleanEmail = validation.data;
    // Derive a name from the email local-part so the lead pipeline (which requires a name) is satisfied.
    const derivedName = cleanEmail.split('@')[0];

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: derivedName,
          email: cleanEmail,
          projectType: 'Hero Email Capture',
          subject: 'New Lead - Hero Email Capture',
          message: 'Visitor requested to get started from the homepage hero.',
        }
      });

      if (error) throw error;

      navigate(`/contact/confirmation?email=${encodeURIComponent(cleanEmail)}&type=lead`);
    } catch (error) {
      console.error("Error submitting hero email capture:", error);
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Couldn't submit your email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full flex-col gap-3 sm:flex-row sm:items-center ${className}`}
      aria-label="Get started - enter your email"
    >
      <Input
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isSubmitting}
        aria-label="Email address"
        className="h-14 flex-1 bg-background/70 text-base"
      />
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="h-14 w-full whitespace-nowrap bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl sm:w-auto sm:text-lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
            <span className="text-white">Sending...</span>
          </>
        ) : (
          <>
            <span className="text-white">Get My Web Presence Plan</span>
            <ArrowRight className="ml-2 h-5 w-5 text-white" aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
};
