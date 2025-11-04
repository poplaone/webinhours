-- Optimize RLS policies for performance
-- This migration fixes two types of performance issues:
-- 1. Auth function re-evaluation on each row
-- 2. Multiple permissive policies for the same action

-- ============================================
-- WEBSITES TABLE - Optimize policies
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "View websites policy" ON public.websites;
DROP POLICY IF EXISTS "Users can update their own websites" ON public.websites;
DROP POLICY IF EXISTS "Admins can update all websites" ON public.websites;
DROP POLICY IF EXISTS "Users can delete their own websites" ON public.websites;
DROP POLICY IF EXISTS "Admins can delete all websites" ON public.websites;

-- Recreate optimized policies
CREATE POLICY "View websites policy" 
ON public.websites 
FOR SELECT 
USING (
  status IN ('approved', 'featured') 
  OR (SELECT auth.uid()) = user_id 
  OR has_role((SELECT auth.uid()), 'admin')
);

-- Combine UPDATE policies into one
CREATE POLICY "Users and admins can update websites" 
ON public.websites 
FOR UPDATE 
USING (
  (SELECT auth.uid()) = user_id 
  OR has_role((SELECT auth.uid()), 'admin')
);

-- Combine DELETE policies into one
CREATE POLICY "Users and admins can delete websites" 
ON public.websites 
FOR DELETE 
USING (
  (SELECT auth.uid()) = user_id 
  OR has_role((SELECT auth.uid()), 'admin')
);

-- ============================================
-- AI_AGENTS TABLE - Optimize policies
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "View ai_agents policy" ON public.ai_agents;
DROP POLICY IF EXISTS "Users can update their own ai_agents" ON public.ai_agents;
DROP POLICY IF EXISTS "Admins can update all ai_agents" ON public.ai_agents;
DROP POLICY IF EXISTS "Users can delete their own ai_agents" ON public.ai_agents;
DROP POLICY IF EXISTS "Admins can delete all ai_agents" ON public.ai_agents;

-- Recreate optimized policies
CREATE POLICY "View ai_agents policy" 
ON public.ai_agents 
FOR SELECT 
USING (
  status IN ('approved', 'featured') 
  OR (SELECT auth.uid()) = user_id 
  OR has_role((SELECT auth.uid()), 'admin')
);

-- Combine UPDATE policies into one
CREATE POLICY "Users and admins can update ai_agents" 
ON public.ai_agents 
FOR UPDATE 
USING (
  (SELECT auth.uid()) = user_id 
  OR has_role((SELECT auth.uid()), 'admin')
);

-- Combine DELETE policies into one
CREATE POLICY "Users and admins can delete ai_agents" 
ON public.ai_agents 
FOR DELETE 
USING (
  (SELECT auth.uid()) = user_id 
  OR has_role((SELECT auth.uid()), 'admin')
);

-- ============================================
-- USER_ROLES TABLE - Optimize policies
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can delete roles" ON public.user_roles;

-- Recreate optimized policies
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Only admins can insert roles" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM user_roles
    WHERE user_id = (SELECT auth.uid()) 
      AND role = 'admin'
  )
);

CREATE POLICY "Only admins can delete roles" 
ON public.user_roles 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1
    FROM user_roles
    WHERE user_id = (SELECT auth.uid()) 
      AND role = 'admin'
  )
);

-- ============================================
-- TEST_RESPONSES TABLE - Optimize policies
-- ============================================

-- Drop existing policy
DROP POLICY IF EXISTS "Authenticated users can submit test responses" ON public.test_responses;

-- Recreate optimized policy
CREATE POLICY "Authenticated users can submit test responses" 
ON public.test_responses 
FOR INSERT 
WITH CHECK ((SELECT auth.uid()) IS NOT NULL);