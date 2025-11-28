# Dodo Payments Integration Setup

## Overview
Your application is now integrated with Dodo Payments for processing payments on the Pricing page.

## What's Been Implemented

### 1. Edge Functions
- **dodo-checkout**: Creates checkout sessions when users click purchase buttons
- **dodo-webhook**: Handles payment webhooks from Dodo Payments

### 2. Pricing Page Integration
- Custom Lite ($299) and Custom Pro ($599) plans now redirect to Dodo Payments checkout
- Template plan redirects to marketplace (instant download)
- Loading states while checkout session is being created

## Setup Steps

### 1. Configure Webhook in Dodo Payments Dashboard

You need to add your webhook URL to the Dodo Payments dashboard:

**Webhook URL:**
```
https://dcsnxieqnpcjqqiajtvh.supabase.co/functions/v1/dodo-webhook
```

**Steps:**
1. Log in to your Dodo Payments dashboard
2. Navigate to Settings → Webhooks
3. Add the webhook URL above
4. Enable the following events:
   - `payment.success`
   - `payment.failed`
   - `subscription.created` (if using subscriptions)

### 2. Test the Integration

1. Go to the Pricing page
2. Click "Get Started" on Custom Lite or "Contact Sales" on Custom Pro
3. You'll be redirected to Dodo Payments checkout
4. Use Dodo's test card numbers to test payments

### 3. Webhook Processing

The webhook handler currently logs all events. You can extend it to:
- Update user purchase records in your database
- Send confirmation emails
- Grant access to purchased products
- Update subscription status

## Environment Variables

The integration uses the following secret (already configured):
- `DODO_PAYMENTS_API_KEY` - Your Dodo Payments API key

## API Endpoints

The integration currently uses **Test Mode**:
- Test Mode URL: `https://test.dodopayments.com`
- Live Mode URL: `https://live.dodopayments.com`

To switch to Live Mode:
1. Update the `baseUrl` in `supabase/functions/dodo-checkout/index.ts` to `https://live.dodopayments.com`
2. Update the `DODO_PAYMENTS_API_KEY` secret with your live API key

## Testing

**Test Mode:**
- Currently configured to use `https://test.dodopayments.com`
- Use test API keys from Dodo Payments dashboard (Developer → API Keys)
- Use test card numbers provided by Dodo Payments

**Live Mode:**
- Change base URL to `https://live.dodopayments.com` in the edge function
- Switch to production API keys
- Update the `DODO_PAYMENTS_API_KEY` secret with your live key

## Customization

### Modify Checkout Data
Edit `supabase/functions/dodo-checkout/index.ts` to customize:
- Product metadata
- Customer information collection
- Return URLs after payment

### Handle Webhook Events
Edit `supabase/functions/dodo-webhook/index.ts` to add business logic for:
- Successful payments
- Failed payments
- Subscription events
- Refunds

## Support

For Dodo Payments API documentation, visit:
https://docs.dodopayments.com

For edge function logs, visit:
https://supabase.com/dashboard/project/dcsnxieqnpcjqqiajtvh/functions
