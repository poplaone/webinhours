-- Fix the overly permissive support_sessions INSERT policy
-- This allows any authenticated user to insert sessions with arbitrary user_id values

-- Drop the permissive policy
DROP POLICY IF EXISTS "System can insert support sessions" ON public.support_sessions;

-- Create a properly scoped INSERT policy that enforces owner validation
CREATE POLICY "Users can create their own support sessions"
ON public.support_sessions FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Update handle_new_user function to add input validation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_full_name TEXT;
BEGIN
  -- Extract and validate full_name
  v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', '');
  
  -- Trim whitespace
  v_full_name := TRIM(v_full_name);
  
  -- Validate length (max 100 chars)
  IF LENGTH(v_full_name) > 100 THEN
    v_full_name := SUBSTRING(v_full_name, 1, 100);
  END IF;
  
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    v_full_name
  );
  
  RETURN NEW;
END;
$$;

-- Update bootstrap_admin function to add input validation  
CREATE OR REPLACE FUNCTION public.bootstrap_admin(admin_email TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_user_id UUID;
BEGIN
  -- Validate email format
  IF admin_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format: %', admin_email;
  END IF;
  
  -- Validate email length
  IF LENGTH(admin_email) > 255 THEN
    RAISE EXCEPTION 'Email too long (max 255 characters)';
  END IF;
  
  -- Only allow if no admins exist
  IF EXISTS (SELECT 1 FROM user_roles WHERE role = 'admin') THEN
    RAISE EXCEPTION 'Admin users already exist. Use normal admin management.';
  END IF;
  
  -- Find user by email
  SELECT id INTO admin_user_id FROM auth.users WHERE email = admin_email;
  
  IF admin_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', admin_email;
  END IF;
  
  -- Create admin role
  INSERT INTO user_roles (user_id, role) 
  VALUES (admin_user_id, 'admin');
  
  RAISE NOTICE 'Admin role granted to user %', admin_email;
END;
$$;
