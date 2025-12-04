import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface LiveSupportNotificationRequest {
  userName: string;
  userEmail: string;
  message: string;
  sessionId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: LiveSupportNotificationRequest = await req.json();
    console.log("New live support message from:", data.userName, data.userEmail);

    const adminHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            .header { border-bottom: 2px solid #8B5CF6; padding-bottom: 16px; margin-bottom: 24px; }
            .header h1 { color: #8B5CF6; margin: 0; font-size: 24px; }
            .badge { display: inline-block; background: #8B5CF6; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
            .info { background: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 20px; }
            .info p { margin: 8px 0; color: #374151; }
            .info strong { color: #111827; }
            .message-box { background: #faf5ff; border-left: 4px solid #8B5CF6; padding: 16px; border-radius: 0 8px 8px 0; }
            .message-box p { margin: 0; color: #374151; white-space: pre-wrap; }
            .cta { margin-top: 24px; text-align: center; }
            .cta a { display: inline-block; background: #8B5CF6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
            .footer { margin-top: 32px; text-align: center; color: #9ca3af; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <span class="badge">LIVE SUPPORT</span>
              <h1>New Support Message</h1>
            </div>
            <div class="info">
              <p><strong>From:</strong> ${data.userName}</p>
              <p><strong>Email:</strong> ${data.userEmail}</p>
              <p><strong>Session ID:</strong> ${data.sessionId.slice(0, 8)}...</p>
              <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <div class="message-box">
              <p>${data.message}</p>
            </div>
            <div class="cta">
              <a href="${Deno.env.get("SITE_URL") || "https://webinhours.com"}/admin/live-support">Respond Now</a>
            </div>
            <div class="footer">
              <p>This notification was sent from WebInHours Live Support</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "WebInHours Support <onboarding@resend.dev>",
      to: ["your-email@example.com"], // Replace with your actual admin email
      subject: `🔴 Live Support: New message from ${data.userName}`,
      html: adminHtml,
    });

    console.log("Live support notification sent:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, emailResponse }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in live-support-notification function:", error);
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
