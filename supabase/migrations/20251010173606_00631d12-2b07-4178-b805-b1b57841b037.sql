-- Drop the overly permissive test_responses insert policy
DROP POLICY IF EXISTS "Anyone can create test responses" ON public.test_responses;

-- Create a secure policy that requires authentication
CREATE POLICY "Authenticated users can submit test responses"
ON public.test_responses
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

-- Add a unique constraint to prevent duplicate submissions from the same respondent
ALTER TABLE public.test_responses
ADD CONSTRAINT test_responses_test_respondent_unique 
UNIQUE (test_id, respondent_id);

-- Add an index on created_at for efficient cleanup queries
CREATE INDEX IF NOT EXISTS idx_test_responses_created_at 
ON public.test_responses(created_at);