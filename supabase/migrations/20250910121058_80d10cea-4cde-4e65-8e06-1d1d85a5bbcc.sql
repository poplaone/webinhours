-- Fix function search_path security issues by setting search_path for all functions
CREATE OR REPLACE FUNCTION public.update_ai_agents_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.increment_agent_usage(agent_uuid uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  UPDATE public.ai_agents 
  SET usage_count = usage_count + 1 
  WHERE id = agent_uuid;
END;
$function$;

CREATE OR REPLACE FUNCTION public.generate_slug(title text)
 RETURNS text
 LANGUAGE plpgsql
 IMMUTABLE
 SET search_path = public
AS $function$
BEGIN
  RETURN lower(
    trim(
      regexp_replace(
        regexp_replace(
          regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
          '\s+', '-', 'g'
        ),
        '-+', '-', 'g'
      ),
      '-'
    )
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.increment_website_views(website_uuid uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  UPDATE public.websites 
  SET views_count = views_count + 1 
  WHERE id = website_uuid;
END;
$function$;

-- Fix RLS performance issues by optimizing auth function calls
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING ((select auth.uid()) = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING ((select auth.uid()) = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK ((select auth.uid()) = id);

-- Fix ideas table RLS policies
DROP POLICY IF EXISTS "Users can view their own ideas" ON public.ideas;
DROP POLICY IF EXISTS "Users can create their own ideas" ON public.ideas;
DROP POLICY IF EXISTS "Users can update their own ideas" ON public.ideas;
DROP POLICY IF EXISTS "Users can delete their own ideas" ON public.ideas;

CREATE POLICY "Users can view their own ideas" 
ON public.ideas 
FOR SELECT 
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can create their own ideas" 
ON public.ideas 
FOR INSERT 
WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update their own ideas" 
ON public.ideas 
FOR UPDATE 
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete their own ideas" 
ON public.ideas 
FOR DELETE 
USING ((select auth.uid()) = user_id);

-- Fix concepts table RLS policies
DROP POLICY IF EXISTS "Users can view their own concepts" ON public.concepts;
DROP POLICY IF EXISTS "Users can create their own concepts" ON public.concepts;
DROP POLICY IF EXISTS "Users can update their own concepts" ON public.concepts;
DROP POLICY IF EXISTS "Users can delete their own concepts" ON public.concepts;

CREATE POLICY "Users can view their own concepts" 
ON public.concepts 
FOR SELECT 
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can create their own concepts" 
ON public.concepts 
FOR INSERT 
WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update their own concepts" 
ON public.concepts 
FOR UPDATE 
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete their own concepts" 
ON public.concepts 
FOR DELETE 
USING ((select auth.uid()) = user_id);

-- Fix concept_tests table RLS policies
DROP POLICY IF EXISTS "Users can view their own concept tests" ON public.concept_tests;
DROP POLICY IF EXISTS "Users can create their own concept tests" ON public.concept_tests;
DROP POLICY IF EXISTS "Users can update their own concept tests" ON public.concept_tests;
DROP POLICY IF EXISTS "Users can delete their own concept tests" ON public.concept_tests;

CREATE POLICY "Users can view their own concept tests" 
ON public.concept_tests 
FOR SELECT 
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can create their own concept tests" 
ON public.concept_tests 
FOR INSERT 
WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update their own concept tests" 
ON public.concept_tests 
FOR UPDATE 
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete their own concept tests" 
ON public.concept_tests 
FOR DELETE 
USING ((select auth.uid()) = user_id);

-- Fix test_responses table RLS policy
DROP POLICY IF EXISTS "Test owners can view responses" ON public.test_responses;

CREATE POLICY "Test owners can view responses" 
ON public.test_responses 
FOR SELECT 
USING (EXISTS ( 
  SELECT 1
  FROM concept_tests
  WHERE concept_tests.id = test_responses.test_id 
  AND concept_tests.user_id = (select auth.uid())
));

-- Consolidate websites table RLS policies to avoid multiple permissive policies
DROP POLICY IF EXISTS "Anyone can view approved/featured websites" ON public.websites;
DROP POLICY IF EXISTS "Users can view their own websites" ON public.websites;
DROP POLICY IF EXISTS "Users can create their own websites" ON public.websites;
DROP POLICY IF EXISTS "Users can update their own websites" ON public.websites;
DROP POLICY IF EXISTS "Users can delete their own websites" ON public.websites;

CREATE POLICY "View websites policy" 
ON public.websites 
FOR SELECT 
USING (
  status IN ('approved', 'featured') 
  OR (select auth.uid()) = user_id
);

CREATE POLICY "Users can create their own websites" 
ON public.websites 
FOR INSERT 
WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update their own websites" 
ON public.websites 
FOR UPDATE 
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete their own websites" 
ON public.websites 
FOR DELETE 
USING ((select auth.uid()) = user_id);

-- Consolidate ai_agents table RLS policies to avoid multiple permissive policies  
DROP POLICY IF EXISTS "Anyone can view approved/featured ai_agents" ON public.ai_agents;
DROP POLICY IF EXISTS "Users can view their own ai_agents" ON public.ai_agents;
DROP POLICY IF EXISTS "Users can create their own ai_agents" ON public.ai_agents;
DROP POLICY IF EXISTS "Users can update their own ai_agents" ON public.ai_agents;
DROP POLICY IF EXISTS "Users can delete their own ai_agents" ON public.ai_agents;

CREATE POLICY "View ai_agents policy" 
ON public.ai_agents 
FOR SELECT 
USING (
  status IN ('approved', 'featured') 
  OR (select auth.uid()) = user_id
);

CREATE POLICY "Users can create their own ai_agents" 
ON public.ai_agents 
FOR INSERT 
WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update their own ai_agents" 
ON public.ai_agents 
FOR UPDATE 
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete their own ai_agents" 
ON public.ai_agents 
FOR DELETE 
USING ((select auth.uid()) = user_id);

-- Add indexes for foreign keys to improve performance
CREATE INDEX IF NOT EXISTS idx_concept_tests_concept_id ON public.concept_tests(concept_id);
CREATE INDEX IF NOT EXISTS idx_concept_tests_user_id ON public.concept_tests(user_id);
CREATE INDEX IF NOT EXISTS idx_concepts_idea_id ON public.concepts(idea_id);
CREATE INDEX IF NOT EXISTS idx_concepts_user_id ON public.concepts(user_id);
CREATE INDEX IF NOT EXISTS idx_ideas_user_id ON public.ideas(user_id);
CREATE INDEX IF NOT EXISTS idx_test_responses_test_id ON public.test_responses(test_id);
CREATE INDEX IF NOT EXISTS idx_websites_user_id ON public.websites(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_agents_user_id ON public.ai_agents(user_id);