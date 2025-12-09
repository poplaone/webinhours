import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { productId, currency = 'USD' } = await req.json();

    console.log('Creating Dodo Payments checkout for product:', productId, 'currency:', currency);

    if (!productId) {
      throw new Error('Product ID is required');
    }

    const apiKey = Deno.env.get('DODO_PAYMENTS_API_KEY');
    if (!apiKey) {
      throw new Error('DODO_PAYMENTS_API_KEY not configured');
    }

    // Create checkout session with Dodo Payments - using Checkout Sessions API
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

    console.log('Sending request to Dodo Payments:', JSON.stringify(checkoutData));

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
      console.error('Dodo Payments API error:', errorText);
      throw new Error(`Dodo Payments API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Dodo Payments checkout created successfully:', data);

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
    console.error('Error in dodo-checkout function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
