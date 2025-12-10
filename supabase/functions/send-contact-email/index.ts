import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
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
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactEmailRequest = await req.json();
    console.log("Received contact form submission:", { name: data.name, email: data.email });

    // Render email templates
    const adminHtml = render(
      React.createElement(AdminNotification, {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        type: data.type,
        website: data.website,
        projectType: data.projectType,
      })
    );

    const userHtml = render(
      React.createElement(UserConfirmation, {
        name: data.name,
        message: data.message,
        services: data.services,
        budget: data.budget,
        timeline: data.timeline,
        customService: data.customService,
      })
    );

    // Send notification email to admin
    const adminEmail = await resend.emails.send({
      from: "WebInHours <hello@webinhour.com>",
      to: ["aaushpapta1010@gmail.com"],
      subject: `New Contact: ${data.type || 'General'} - ${data.name}`,
      html: adminHtml,
    });

    console.log("Admin notification sent:", adminEmail);

    // Send confirmation email to user
    const userEmail = await resend.emails.send({
      from: "WebInHours <hello@webinhour.com>",
      to: [data.email],
      subject: "We've Received Your Message - WebInHours",
      html: userHtml,
    });

    console.log("User confirmation sent:", userEmail);

    return new Response(
      JSON.stringify({ success: true, adminEmail, userEmail }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
