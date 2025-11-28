import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

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
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactEmailRequest = await req.json();
    console.log("Received contact form submission:", { name: data.name, email: data.email });

    // Send notification email to admin
    const adminEmail = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["your-email@example.com"], // Replace with your actual email
      subject: `New Contact Form Submission ${data.type ? `- ${data.type}` : ''}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ''}
        ${data.type ? `<p><strong>Type:</strong> ${data.type}</p>` : ''}
        ${data.website ? `<p><strong>Website:</strong> ${data.website}</p>` : ''}
        ${data.projectType ? `<p><strong>Project Type:</strong> ${data.projectType}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log("Admin notification sent:", adminEmail);

    // Send confirmation email to user
    const userEmail = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: [data.email],
      subject: "We received your message!",
      html: `
        <h1>Thank you for contacting us, ${data.name}!</h1>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <blockquote style="border-left: 4px solid #ccc; padding-left: 16px; margin: 16px 0;">
          ${data.message.replace(/\n/g, '<br>')}
        </blockquote>
        <p>Best regards,<br>The Team</p>
      `,
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
