-- Support IP-based rate limiting on the public contact endpoint.
-- We store a salted SHA-256 hash of the client IP (never the raw IP) so we can
-- count recent submissions per origin without retaining personal data.
ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS ip_hash TEXT;

-- Index the rate-limit lookup: "how many rows from this ip_hash since T".
CREATE INDEX IF NOT EXISTS idx_contact_submissions_ip_hash_created_at
  ON public.contact_submissions (ip_hash, created_at DESC);
