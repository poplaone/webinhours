-- Harden contact_submissions: remove the public INSERT policy.
-- All legitimate writes go through the send-contact-email Edge Function using the
-- service_role key (which bypasses RLS), so no anon/public INSERT policy is required.
-- Dropping it prevents direct inserts via the public Data API that would bypass the
-- function's honeypot + IP rate-limiting. RLS stays enabled; the admin-only SELECT
-- policy is unchanged.
DROP POLICY IF EXISTS "Anyone can submit a contact form" ON public.contact_submissions;
