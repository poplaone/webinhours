import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Supported currencies for Dodo Payments
const SUPPORTED_CURRENCIES = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'INR', 'JPY', 'CNY', 'BRL', 'MXN'];

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

    // Validate currency
    const normalizedCurrency = currency.toUpperCase();
    if (!SUPPORTED_CURRENCIES.includes(normalizedCurrency)) {
      console.warn(`Unsupported currency ${currency}, falling back to USD`);
    }

    const apiKey = Deno.env.get('DODO_PAYMENTS_API_KEY');
    if (!apiKey) {
      throw new Error('DODO_PAYMENTS_API_KEY not configured');
    }

    // Create checkout session with Dodo Payments
    const checkoutData = {
      billing: {
        country: "US",
        city: "New York", 
        state: "NY",
        street: "123 Main St",
        zipcode: 10001
      },
      customer: {
        email: "customer@example.com",
        name: "Customer"
      },
      payment_link: true,
      product_cart: [
        {
          product_id: productId,
          quantity: 1
        }
      ],
      return_url: `https://webinhours.com/payment/success?product_id=${productId}`,
      // Note: Dodo uses the product's configured price, currency selection happens in dashboard
    };

    console.log('Sending request to Dodo Payments:', JSON.stringify(checkoutData));

    // Use test mode URL - change to https://api.dodopayments.com for production
    const baseUrl = 'https://test.dodopayments.com';
    
    const response = await fetch(`${baseUrl}/payments`, {
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
        checkoutUrl: data.payment_link || data.checkout_url || data.url,
        paymentId: data.payment_id,
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
