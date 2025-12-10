import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, webhook-id, webhook-signature, webhook-timestamp',
};

// Email template for order confirmation
const generateOrderConfirmationEmail = (data: {
  customerEmail: string;
  customerName: string;
  productName: string;
  amount: number;
  currency: string;
  orderId: string;
}) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
      <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%); border-radius: 16px 16px 0 0; padding: 40px 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Order Confirmed! 🎉</h1>
        </div>
        
        <div style="background: white; border-radius: 0 0 16px 16px; padding: 40px 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
            Hi ${data.customerName || 'there'},
          </p>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
            Thank you for your purchase! Your order has been confirmed and our team is getting started on your project.
          </p>
          
          <div style="background: #f9fafb; border-radius: 12px; padding: 24px; margin-bottom: 30px;">
            <h3 style="color: #111827; margin: 0 0 16px; font-size: 18px;">Order Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="color: #6b7280; padding: 8px 0; font-size: 14px;">Product</td>
                <td style="color: #111827; padding: 8px 0; font-size: 14px; text-align: right; font-weight: 600;">${data.productName}</td>
              </tr>
              <tr>
                <td style="color: #6b7280; padding: 8px 0; font-size: 14px;">Amount</td>
                <td style="color: #111827; padding: 8px 0; font-size: 14px; text-align: right; font-weight: 600;">$${(data.amount / 100).toFixed(2)} ${data.currency.toUpperCase()}</td>
              </tr>
              <tr>
                <td style="color: #6b7280; padding: 8px 0; font-size: 14px;">Order ID</td>
                <td style="color: #111827; padding: 8px 0; font-size: 12px; text-align: right; font-family: monospace;">${data.orderId}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; padding: 24px; margin-bottom: 30px; border-left: 4px solid #0ea5e9;">
            <h4 style="color: #0369a1; margin: 0 0 12px; font-size: 16px;">What's Next?</h4>
            <ul style="color: #374151; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li>Our team will review your order within 24 hours</li>
              <li>You'll receive a project kickoff email with next steps</li>
              <li>We'll start working on your website immediately</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://webinhours.com/contact" style="display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px;">
              Contact Support
            </a>
          </div>
          
          <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
            WebInHours - Professional Website Solutions<br>
            <a href="https://webinhours.com" style="color: #7c3aed; text-decoration: none;">webinhours.com</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Admin notification email
const generateAdminNotificationEmail = (data: {
  customerEmail: string;
  customerName: string;
  productName: string;
  amount: number;
  currency: string;
  orderId: string;
}) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px;">
      <h2 style="color: #22c55e;">💰 New Payment Received!</h2>
      
      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Customer:</strong> ${data.customerName || 'N/A'}</p>
        <p><strong>Email:</strong> ${data.customerEmail}</p>
        <p><strong>Product:</strong> ${data.productName}</p>
        <p><strong>Amount:</strong> $${(data.amount / 100).toFixed(2)} ${data.currency.toUpperCase()}</p>
        <p><strong>Order ID:</strong> ${data.orderId}</p>
      </div>
      
      <p>Please follow up with the customer to begin their project.</p>
    </body>
    </html>
  `;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawBody = await req.text();
    const payload = JSON.parse(rawBody);

    console.log('Received Dodo Payments webhook:', JSON.stringify(payload));

    // Webhook headers for verification
    const webhookId = req.headers.get('webhook-id');
    const webhookSignature = req.headers.get('webhook-signature');
    const webhookTimestamp = req.headers.get('webhook-timestamp');

    console.log('Webhook headers:', { webhookId, webhookSignature, webhookTimestamp });

    // Process the webhook based on event type
    const eventType = payload.type || payload.event_type;
    const data = payload.data || payload;
    
    switch (eventType) {
      case 'payment.succeeded':
      case 'payment.success':
      case 'payment_intent.succeeded':
        console.log('Payment successful:', data);
        
        // Extract customer and payment info
        const customerEmail = data.customer?.email || data.billing_details?.email || data.email;
        const customerName = data.customer?.name || data.billing_details?.name || data.name || '';
        const productName = data.product?.name || data.metadata?.product_name || 'Custom Website';
        const amount = data.amount || data.amount_total || 0;
        const currency = data.currency || 'usd';
        const orderId = data.payment_id || data.id || webhookId || 'N/A';

        if (customerEmail) {
          try {
            // Send confirmation email to customer
            const customerEmailResult = await resend.emails.send({
              from: "WebInHours <onboarding@resend.dev>",
              to: [customerEmail],
              subject: "Order Confirmed - WebInHours",
              html: generateOrderConfirmationEmail({
                customerEmail,
                customerName,
                productName,
                amount,
                currency,
                orderId,
              }),
            });
            console.log("Customer confirmation email sent:", customerEmailResult);

            // Send notification to admin
            const adminEmailResult = await resend.emails.send({
              from: "WebInHours Payments <onboarding@resend.dev>",
              to: ["admin@webinhours.com"], // Replace with actual admin email
              subject: `💰 New Payment: ${productName} - $${(amount / 100).toFixed(2)}`,
              html: generateAdminNotificationEmail({
                customerEmail,
                customerName,
                productName,
                amount,
                currency,
                orderId,
              }),
            });
            console.log("Admin notification email sent:", adminEmailResult);
          } catch (emailError) {
            console.error("Error sending emails:", emailError);
          }
        } else {
          console.log("No customer email found in webhook data");
        }
        break;
      
      case 'payment.failed':
      case 'payment_intent.payment_failed':
        console.log('Payment failed:', data);
        // Could send failure notification if needed
        break;
      
      case 'subscription.created':
      case 'customer.subscription.created':
        console.log('Subscription created:', data);
        break;
      
      default:
        console.log('Unhandled event type:', eventType);
    }

    return new Response(
      JSON.stringify({ received: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in dodo-webhook function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
