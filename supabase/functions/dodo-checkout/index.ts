import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Safe user-facing error messages
const getSafeErrorMessage = (status: number): string => {
  const errorMessages: Record<number, string> = {
    400: 'Invalid request. Please check your input.',
    401: 'Authentication required. Please sign in.',
    403: 'Access denied.',
    404: 'Product not found.',
    429: 'Too many requests. Please try again in a few minutes.',
    500: 'Payment service temporarily unavailable. Please try again later.',
    502: 'Payment service temporarily unavailable. Please try again later.',
    503: 'Payment service temporarily unavailable. Please try again later.',
  };
  return errorMessages[status] || errorMessages[500];
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ success: false, error: 'Authentication required. Please sign in.' }),
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
        JSON.stringify({ success: false, error: 'Invalid authentication. Please sign in again.' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { productId, currency = 'USD' } = await req.json();

    console.log('[SERVER] Creating checkout for user:', user.id, 'product:', productId);

    // Validate product ID
    if (!productId || typeof productId !== 'string') {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid product. Please try again.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate product ID format (basic validation)
    if (productId.length > 100) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid product ID.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('DODO_PAYMENTS_API_KEY');
    if (!apiKey) {
      console.error('[SERVER] DODO_PAYMENTS_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Payment service configuration error. Please contact support.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create checkout session with Dodo Payments
    const checkoutData = {
      product_cart: [
        {
          product_id: productId,
          quantity: 1
        }
      ],
      success_url: `https://webinhours.com/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://webinhours.com/payment/cancel`,
    };

    console.log('[SERVER] Sending request to Dodo Payments');

    // TEST MODE - use test.dodopayments.com
    const baseUrl = 'https://test.dodopayments.com';
    
    const response = await fetch(`${baseUrl}/checkouts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkoutData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[SERVER] Dodo Payments API error:', response.status, errorText);
      
      // Return safe error message to client
      const safeMessage = getSafeErrorMessage(response.status);
      return new Response(
        JSON.stringify({ success: false, error: safeMessage }),
        { status: response.status >= 500 ? 502 : response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('[SERVER] Dodo Payments checkout created successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        checkoutUrl: data.checkout_url,
        sessionId: data.session_id
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('[SERVER] Error in dodo-checkout function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'An error occurred processing your payment request. Please try again.' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
