-- Add safeguards for admin role management

-- Function to prevent deletion of the last admin
CREATE OR REPLACE FUNCTION prevent_last_admin_deletion()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if this is an admin role being deleted
  IF OLD.role = 'admin' THEN
    -- Count remaining admins (excluding the one being deleted)
    IF (SELECT COUNT(*) FROM user_roles WHERE role = 'admin' AND id != OLD.id) = 0 THEN
      RAISE EXCEPTION 'Cannot delete the last admin. At least one admin must exist.';
    END IF;
  END IF;
  RETURN OLD;
END;
$$;

-- Create trigger to protect last admin
DROP TRIGGER IF EXISTS protect_last_admin ON user_roles;
CREATE TRIGGER protect_last_admin
BEFORE DELETE ON user_roles
FOR EACH ROW EXECUTE FUNCTION prevent_last_admin_deletion();

-- Function to bootstrap first admin (callable via service role only)
CREATE OR REPLACE FUNCTION bootstrap_admin(admin_email TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_user_id UUID;
BEGIN
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