import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

// Input validation
const validateInput = (data: LiveSupportNotificationRequest): { valid: boolean; error?: string } => {
  if (!data.userName || typeof data.userName !== 'string' || data.userName.trim().length === 0) {
    return { valid: false, error: 'User name is required' };
  }
  if (data.userName.length > 100) {
    return { valid: false, error: 'User name must be less than 100 characters' };
  }
  if (!data.userEmail || typeof data.userEmail !== 'string') {
    return { valid: false, error: 'Email is required' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.userEmail)) {
    return { valid: false, error: 'Invalid email format' };
  }
  if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
    return { valid: false, error: 'Message is required' };
  }
  if (data.message.length > 5000) {
    return { valid: false, error: 'Message must be less than 5000 characters' };
  }
  if (!data.sessionId || typeof data.sessionId !== 'string') {
    return { valid: false, error: 'Session ID is required' };
  }
  return { valid: true };
};

// HTML escape to prevent XSS in emails
const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify user token
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authentication' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data: LiveSupportNotificationRequest = await req.json();
    
    // Validate input
    const validation = validateInput(data);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log("[SERVER] New live support message from authenticated user:", user.id);

    // Sanitize and escape inputs for HTML email
    const sanitizedUserName = escapeHtml(data.userName.trim().slice(0, 100));
    const sanitizedUserEmail = escapeHtml(data.userEmail.trim().slice(0, 255));
    const sanitizedMessage = escapeHtml(data.message.trim().slice(0, 5000));
    const sanitizedSessionId = data.sessionId.slice(0, 36); // UUID length

    // Get admin email from environment variable (secure)
    const adminEmail = Deno.env.get("ADMIN_EMAIL");
    if (!adminEmail) {
      console.error("[SERVER] ADMIN_EMAIL not configured");
      return new Response(
        JSON.stringify({ error: 'Service configuration error. Please try again later.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const siteUrl = Deno.env.get("SITE_URL") || "https://webinhours.com";

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
              <p><strong>From:</strong> ${sanitizedUserName}</p>
              <p><strong>Email:</strong> ${sanitizedUserEmail}</p>
              <p><strong>Session ID:</strong> ${sanitizedSessionId.slice(0, 8)}...</p>
              <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <div class="message-box">
              <p>${sanitizedMessage}</p>
            </div>
            <div class="cta">
              <a href="${siteUrl}/admin/live-support">Respond Now</a>
            </div>
            <div class="footer">
              <p>This notification was sent from WebInHours Live Support</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "WebInHours Support <team@webinhour.com>",
      to: [adminEmail],
      subject: `🔴 Live Support: New message from ${sanitizedUserName}`,
      html: adminHtml,
    });

    console.log("[SERVER] Live support notification sent successfully");

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
    console.error("[SERVER] Error in live-support-notification function:", error);
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
