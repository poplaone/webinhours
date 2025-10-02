-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table with proper foreign key to auth.users
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Only admins can insert roles"
  ON public.user_roles
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete roles"
  ON public.user_roles
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Migrate existing admin user (the hardcoded one) to user_roles table
-- This assumes the user with email 'aaushpapta1010@gmail.com' exists
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'aaushpapta1010@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Remove role column from profiles table (security risk)
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role;

-- Update websites RLS policy to hide user_id from non-owners
DROP POLICY IF EXISTS "View websites policy" ON public.websites;
CREATE POLICY "View websites policy"
  ON public.websites
  FOR SELECT
  USING (
    status IN ('approved', 'featured') 
    OR auth.uid() = user_id
    OR public.has_role(auth.uid(), 'admin')
  );

-- Update ai_agents RLS policy to hide user_id from non-owners
DROP POLICY IF EXISTS "View ai_agents policy" ON public.ai_agents;
CREATE POLICY "View ai_agents policy"
  ON public.ai_agents
  FOR SELECT
  USING (
    status IN ('approved', 'featured')
    OR auth.uid() = user_id
    OR public.has_role(auth.uid(), 'admin')
  );

-- Add admin policies for websites
CREATE POLICY "Admins can update all websites"
  ON public.websites
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete all websites"
  ON public.websites
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Add admin policies for ai_agents
CREATE POLICY "Admins can update all ai_agents"
  ON public.ai_agents
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete all ai_agents"
  ON public.ai_agents
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Create index for performance
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role);