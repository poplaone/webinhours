import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import * as React from "npm:react@18.3.1";
import { render } from "npm:@react-email/render@0.0.12";
import { AdminNotification } from "./_templates/admin-notification.tsx";
import { UserConfirmation } from "./_templates/user-confirmation.tsx";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject?: string;
  message: string;
  type?: string;
  website?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  services?: string[];
  customService?: string;
  honeypot?: string;
}

// Safe user-facing error messages
const getSafeErrorMessage = (status: number): string => {
  const errorMessages: Record<number, string> = {
    400: 'Invalid request. Please check your input.',
    401: 'Authentication required. Please sign in.',
    403: 'Access denied.',
    404: 'Resource not found.',
    429: 'Too many requests. Please try again in a few minutes.',
    500: 'Service temporarily unavailable. Please try again later.',
    502: 'Service temporarily unavailable. Please try again later.',
    503: 'Service temporarily unavailable. Please try again later.',
  };
  return errorMessages[status] || errorMessages[500];
};

// Input validation
const validateInput = (data: ContactEmailRequest): { valid: boolean; error?: string } => {
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    return { valid: false, error: 'Name is required' };
  }
  if (data.name.length > 100) {
    return { valid: false, error: 'Name must be less than 100 characters' };
  }
  if (!data.email || typeof data.email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  if (data.email.length > 255) {
    return { valid: false, error: 'Email must be less than 255 characters' };
  }
  if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
    return { valid: false, error: 'Message is required' };
  }
  if (data.message.length > 5000) {
    return { valid: false, error: 'Message must be less than 5000 characters' };
  }
  return { valid: true };
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Public lead-capture endpoint — no auth required (anonymous visitors must be able to submit).
    // Spam is mitigated via a honeypot field + input validation below.
    const data: ContactEmailRequest = await req.json();

    // Honeypot: bots fill every field. Real users never see/fill `honeypot`.
    // Silently return success so bots don't learn they were blocked.
    if (data.honeypot && data.honeypot.trim().length > 0) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate input
    const validation = validateInput(data);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log("[SERVER] Received contact form submission from:", data.email);

    // Sanitize inputs for display
    const sanitizedName = data.name.trim().slice(0, 100);
    const sanitizedEmail = data.email.trim().slice(0, 255);
    const sanitizedMessage = data.message.trim().slice(0, 5000);
    const sanitizedSubject = data.subject?.trim().slice(0, 200);

    // Persist the lead first so it survives even if email delivery fails below.
    let submissionId: string | null = null;
    try {
      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );
      const { data: inserted, error: insertError } = await supabaseAdmin
        .from("contact_submissions")
        .insert({
          name: sanitizedName,
          email: sanitizedEmail,
          subject: sanitizedSubject,
          message: sanitizedMessage,
          type: data.type?.slice(0, 50),
          project_type: data.projectType?.slice(0, 100),
          budget: data.budget?.slice(0, 50),
          timeline: data.timeline?.slice(0, 50),
          services: data.services?.slice(0, 10),
          custom_service: data.customService?.slice(0, 100),
          website: data.website?.slice(0, 200),
        })
        .select("id")
        .single();
      if (insertError) {
        console.error("[SERVER] Failed to persist contact submission:", insertError.message);
      } else {
        submissionId = inserted?.id ?? null;
      }
    } catch (persistError: any) {
      // Never block the user on a persistence failure — the email path is the fallback.
      console.error("[SERVER] Error persisting contact submission:", persistError?.message);
    }

    // Render email templates with sanitized data
    const adminHtml = render(
      React.createElement(AdminNotification, {
        name: sanitizedName,
        email: sanitizedEmail,
        subject: sanitizedSubject,
        message: sanitizedMessage,
        type: data.type?.slice(0, 50),
        website: data.website?.slice(0, 200),
        projectType: data.projectType?.slice(0, 100),
      })
    );

    const userHtml = render(
      React.createElement(UserConfirmation, {
        name: sanitizedName,
        message: sanitizedMessage,
        services: data.services?.slice(0, 10),
        budget: data.budget?.slice(0, 50),
        timeline: data.timeline?.slice(0, 50),
        customService: data.customService?.slice(0, 100),
      })
    );

    // Get admin email from environment variable (secure)
    const adminEmail = Deno.env.get("ADMIN_EMAIL");
    if (!adminEmail) {
      console.error("[SERVER] ADMIN_EMAIL not configured");
      return new Response(
        JSON.stringify({ error: 'Service configuration error. Please try again later.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Send notification email to admin
    const adminEmailResult = await resend.emails.send({
      from: "WebInHour <team@webinhour.com>",
      to: [adminEmail],
      subject: `New Lead: ${data.type?.slice(0, 50) || 'General'} - ${sanitizedName} | WebInHour`,
      html: adminHtml,
    });

    console.log("[SERVER] Admin notification sent successfully");

    // Send confirmation email to user
    const userEmailResult = await resend.emails.send({
      from: "WebInHour <team@webinhour.com>",
      to: [sanitizedEmail],
      subject: "We Have Received Your Message - WebInHour",
      html: userHtml,
    });

    console.log("[SERVER] User confirmation sent successfully");

    // Flag the stored lead as emailed (best-effort; failure here is non-fatal).
    if (submissionId) {
      try {
        const supabaseAdmin = createClient(
          Deno.env.get("SUPABASE_URL") ?? "",
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
        );
        await supabaseAdmin
          .from("contact_submissions")
          .update({ email_sent: true })
          .eq("id", submissionId);
      } catch (_) {
        // ignore — the lead is already captured
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("[SERVER] Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: 'An error occurred processing your request. Please try again later.' }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
