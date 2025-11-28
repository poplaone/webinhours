import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, webhook-id, webhook-signature, webhook-timestamp',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawBody = await req.text();
    const payload = JSON.parse(rawBody);

    console.log('Received Dodo Payments webhook:', JSON.stringify(payload));

    // Verify webhook signature
    const webhookId = req.headers.get('webhook-id');
    const webhookSignature = req.headers.get('webhook-signature');
    const webhookTimestamp = req.headers.get('webhook-timestamp');

    console.log('Webhook headers:', { webhookId, webhookSignature, webhookTimestamp });

    // Process the webhook based on event type
    const eventType = payload.event_type;
    
    switch (eventType) {
      case 'payment.success':
        console.log('Payment successful:', payload.data);
        // Here you can add logic to update your database, send confirmation emails, etc.
        // Example: Update user's purchase records in Supabase
        break;
      
      case 'payment.failed':
        console.log('Payment failed:', payload.data);
        // Handle failed payment
        break;
      
      case 'subscription.created':
        console.log('Subscription created:', payload.data);
        // Handle subscription creation
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
      JSON.stringify({ 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});