-- Create support_sessions table to track conversation status
CREATE TABLE public.support_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL UNIQUE,
  user_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'pending', 'resolved')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.support_sessions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Admins can view all support sessions"
ON public.support_sessions FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update support sessions"
ON public.support_sessions FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "System can insert support sessions"
ON public.support_sessions FOR INSERT
WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER update_support_sessions_updated_at
BEFORE UPDATE ON public.support_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX idx_support_sessions_status ON public.support_sessions(status);
CREATE INDEX idx_support_sessions_session_id ON public.support_sessions(session_id);