-- Defense-in-depth for the lead table.
--
-- Context: the contact form is a PUBLIC endpoint, so `anon` legitimately needs
-- INSERT. It was also carrying DELETE/UPDATE/TRUNCATE/REFERENCES/TRIGGER from
-- the default grant. RLS already blocked those (no policy permits them), but
-- table grants are the layer *underneath* RLS: if RLS were ever disabled on
-- this table by mistake, anon could wipe every captured lead. Leads are
-- unrecoverable business data, so the grant is removed rather than relied upon.
--
-- Reads stay admin-only via the existing "Admins can view contact submissions"
-- policy; the edge function writes with the service_role key, which bypasses
-- both grants and RLS and is therefore unaffected.

REVOKE DELETE, UPDATE, TRUNCATE, REFERENCES, TRIGGER
  ON public.contact_submissions FROM anon;

REVOKE DELETE, UPDATE, TRUNCATE, REFERENCES, TRIGGER
  ON public.contact_submissions FROM authenticated;

-- Anonymous visitors submit the form; signed-in users may also submit.
GRANT INSERT ON public.contact_submissions TO anon, authenticated;

-- SELECT remains granted so the admin dashboard can read, but every row is
-- still filtered by the admin-only RLS policy.
GRANT SELECT ON public.contact_submissions TO authenticated;
REVOKE SELECT ON public.contact_submissions FROM anon;
