# Dodo Payments Integration Setup

## Overview
Your application is now integrated with Dodo Payments using the Checkout Sessions API (recommended).

## IMPORTANT: Setup Required

### Step 1: Create Products in Dodo Payments Dashboard

Before the integration will work, you **MUST** create products in your Dodo Payments dashboard:

1. Log in to [Dodo Payments Dashboard](https://dashboard.dodopayments.com)
2. Go to **Products** section
3. Create two products:
   - **Custom Lite Plan** - Price: $299 USD (one-time payment)
   - **Custom Pro Plan** - Price: $599 USD (one-time payment)
4. After creating each product, copy the **Product ID** (looks like `prod_xxxxx`)

### Step 2: Update Product IDs in Code

Edit `src/pages/Pricing.tsx` and replace the placeholder product IDs:

```typescript
const productIdMap: Record<string, string> = {
  'Custom Lite': 'prod_your_actual_custom_lite_id', // Replace with your Custom Lite product ID
  'Custom Pro': 'prod_your_actual_custom_pro_id',   // Replace with your Custom Pro product ID
};
```

## What's Been Implemented

### 1. Edge Functions
- **dodo-checkout**: Creates checkout sessions using product IDs
- **dodo-webhook**: Handles payment webhooks from Dodo Payments

### 2. Pricing Page Integration
- Custom Lite ($299) and Custom Pro ($599) redirect to Dodo Payments checkout
- Template plan redirects to marketplace (instant download)
- Loading states during checkout creation

## Setup Steps

### 1. Configure Webhook in Dodo Payments Dashboard

Add your webhook URL to the Dodo Payments dashboard:

**Webhook URL:**
```
https://dcsnxieqnpcjqqiajtvh.supabase.co/functions/v1/dodo-webhook
```

**Steps:**
1. Go to Settings → Webhooks in Dodo dashboard
2. Add the webhook URL above
3. Enable events:
   - `payment.success`
   - `payment.failed`
   - `subscription.created` (if using subscriptions)

### 2. Test the Integration

1. Make sure you've created products and updated product IDs in code
2. Go to the Pricing page
3. Click "Get Started" on Custom Lite or "Contact Sales" on Custom Pro
4. You'll be redirected to Dodo Payments checkout
5. Use Dodo's test card numbers to test payments

## Environment Variables

The integration uses:
- `DODO_PAYMENTS_API_KEY` - Your Dodo Payments test mode API key (already configured)

## API Endpoints

Currently using **Test Mode**:
- Test Mode URL: `https://test.dodopayments.com`
- Live Mode URL: `https://live.dodopayments.com`

To switch to Live Mode:
1. Update `baseUrl` in `supabase/functions/dodo-checkout/index.ts` to `https://live.dodopayments.com`
2. Update `DODO_PAYMENTS_API_KEY` with your live API key
3. Use live product IDs in the code

## Testing

**Test Mode (Current):**
- Uses `https://test.dodopayments.com`
- Use test API key (already configured)
- Use test card numbers from Dodo Payments docs
- Create test products in test mode dashboard

**Live Mode:**
- Change base URL to `https://live.dodopayments.com`
- Use production API key
- Use real product IDs from live dashboard

## Customization

### Modify Checkout Data
Edit `supabase/functions/dodo-checkout/index.ts` to add:
- Customer information
- Billing address
- Return URLs
- Metadata

### Handle Webhook Events
Edit `supabase/functions/dodo-webhook/index.ts` to add logic for:
- Successful payments
- Failed payments
- Subscription events
- Refunds

## Support

For Dodo Payments API documentation:
https://docs.dodopayments.com

For edge function logs:
https://supabase.com/dashboard/project/dcsnxieqnpcjqqiajtvh/functions
