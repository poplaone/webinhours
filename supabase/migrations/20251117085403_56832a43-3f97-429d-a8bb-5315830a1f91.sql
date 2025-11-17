-- Create enum for AI action types
CREATE TYPE public.ai_action_type AS ENUM (
  'create_ticket',
  'update_ticket',
  'recommend_content',
  'moderate_content',
  'send_notification',
  'read_data',
  'analyze_user'
);

-- Create enum for AI action status
CREATE TYPE public.ai_action_status AS ENUM (
  'pending',
  'executing',
  'completed',
  'failed',
  'cancelled'
);

-- Create AI audit logs table
CREATE TABLE public.ai_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action_type ai_action_type NOT NULL,
  input_data JSONB NOT NULL,
  ai_decision JSONB NOT NULL,
  output_data JSONB,
  status ai_action_status NOT NULL DEFAULT 'pending',
  error_message TEXT,
  execution_time_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create support tickets table
CREATE TABLE public.support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'open',
  category TEXT,
  ai_generated BOOLEAN NOT NULL DEFAULT false,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Create AI rate limiting table
CREATE TABLE public.ai_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type ai_action_type NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_request_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, action_type, window_start)
);

-- Enable RLS
ALTER TABLE public.ai_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_rate_limits ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ai_audit_logs
CREATE POLICY "Users can view their own audit logs"
  ON public.ai_audit_logs
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all audit logs"
  ON public.ai_audit_logs
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for support_tickets
CREATE POLICY "Users can view their own tickets"
  ON public.support_tickets
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tickets"
  ON public.support_tickets
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tickets"
  ON public.support_tickets
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all tickets"
  ON public.support_tickets
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all tickets"
  ON public.support_tickets
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for ai_rate_limits
CREATE POLICY "Users can view their own rate limits"
  ON public.ai_rate_limits
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_ai_audit_logs_user_id ON public.ai_audit_logs(user_id);
CREATE INDEX idx_ai_audit_logs_created_at ON public.ai_audit_logs(created_at DESC);
CREATE INDEX idx_support_tickets_user_id ON public.support_tickets(user_id);
CREATE INDEX idx_support_tickets_status ON public.support_tickets(status);
CREATE INDEX idx_ai_rate_limits_user_action ON public.ai_rate_limits(user_id, action_type);

-- Create trigger for updating support_tickets updated_at
CREATE TRIGGER update_support_tickets_updated_at
  BEFORE UPDATE ON public.support_tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to check rate limits (returns true if within limit)
CREATE OR REPLACE FUNCTION public.check_ai_rate_limit(
  _user_id UUID,
  _action_type ai_action_type,
  _max_requests INTEGER DEFAULT 10,
  _window_minutes INTEGER DEFAULT 60
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _window_start TIMESTAMP WITH TIME ZONE;
  _request_count INTEGER;
BEGIN
  _window_start := date_trunc('hour', now());
  
  -- Get or create rate limit record
  INSERT INTO public.ai_rate_limits (user_id, action_type, window_start, request_count)
  VALUES (_user_id, _action_type, _window_start, 1)
  ON CONFLICT (user_id, action_type, window_start)
  DO UPDATE SET 
    request_count = ai_rate_limits.request_count + 1,
    last_request_at = now()
  RETURNING request_count INTO _request_count;
  
  -- Check if within limit
  RETURN _request_count <= _max_requests;
END;
$$;