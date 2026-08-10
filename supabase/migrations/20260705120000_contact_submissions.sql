-- Store every contact/lead submission as a durable backup, independent of email delivery.
-- If the transactional email service (Resend) is down or rate-limited, the lead is still captured here.
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT,
  type TEXT,
  project_type TEXT,
  budget TEXT,
  timeline TEXT,
  services TEXT[],
  custom_service TEXT,
  website TEXT,
  email_sent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anonymous visitors must be able to submit the contact form.
CREATE POLICY "Anyone can submit a contact form"
ON public.contact_submissions FOR INSERT
WITH CHECK (true);

-- Only admins can read submitted leads.
CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Index for the admin lead list (newest first).
CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions (created_at DESC);
