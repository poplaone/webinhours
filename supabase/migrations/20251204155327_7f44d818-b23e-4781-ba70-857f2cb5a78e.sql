-- Create chat_messages table for live support
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  session_id UUID NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'support')),
  content TEXT NOT NULL,
  is_live_support BOOLEAN NOT NULL DEFAULT false,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ai_usage_limits table for rate limiting
CREATE TABLE public.ai_usage_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  daily_count INTEGER NOT NULL DEFAULT 0,
  last_reset_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_chat_messages_user_session ON public.chat_messages(user_id, session_id);
CREATE INDEX idx_chat_messages_live_support ON public.chat_messages(is_live_support, is_read) WHERE is_live_support = true;
CREATE INDEX idx_ai_usage_limits_user ON public.ai_usage_limits(user_id);

-- Enable Row Level Security
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage_limits ENABLE ROW LEVEL SECURITY;

-- Chat messages policies - users can view their own messages
CREATE POLICY "Users can view their own chat messages"
ON public.chat_messages FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own messages
CREATE POLICY "Users can insert their own chat messages"
ON public.chat_messages FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Support staff (admins) can view all live support messages
CREATE POLICY "Admins can view all live support messages"
ON public.chat_messages FOR SELECT
USING (
  is_live_support = true 
  AND public.has_role(auth.uid(), 'admin')
);

-- Admins can insert support responses
CREATE POLICY "Admins can insert support messages"
ON public.chat_messages FOR INSERT
WITH CHECK (
  role = 'support' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Admins can update message read status
CREATE POLICY "Admins can update message read status"
ON public.chat_messages FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- AI usage limits policies
CREATE POLICY "Users can view their own usage limits"
ON public.ai_usage_limits FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own usage limits"
ON public.ai_usage_limits FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own usage limits"
ON public.ai_usage_limits FOR UPDATE
USING (auth.uid() = user_id);

-- Function to check and increment AI usage (returns true if allowed)
CREATE OR REPLACE FUNCTION public.check_and_increment_ai_usage(p_user_id UUID, p_daily_limit INTEGER DEFAULT 10)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current_count INTEGER;
  v_last_reset DATE;
BEGIN
  -- Get or create usage record
  INSERT INTO public.ai_usage_limits (user_id, daily_count, last_reset_date)
  VALUES (p_user_id, 0, CURRENT_DATE)
  ON CONFLICT (user_id) DO NOTHING;

  -- Get current values
  SELECT daily_count, last_reset_date INTO v_current_count, v_last_reset
  FROM public.ai_usage_limits
  WHERE user_id = p_user_id;

  -- Reset count if new day
  IF v_last_reset < CURRENT_DATE THEN
    UPDATE public.ai_usage_limits
    SET daily_count = 1, last_reset_date = CURRENT_DATE, updated_at = now()
    WHERE user_id = p_user_id;
    RETURN true;
  END IF;

  -- Check if under limit
  IF v_current_count >= p_daily_limit THEN
    RETURN false;
  END IF;

  -- Increment count
  UPDATE public.ai_usage_limits
  SET daily_count = daily_count + 1, updated_at = now()
  WHERE user_id = p_user_id;

  RETURN true;
END;
$$;

-- Function to get remaining AI credits
CREATE OR REPLACE FUNCTION public.get_remaining_ai_credits(p_user_id UUID, p_daily_limit INTEGER DEFAULT 10)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current_count INTEGER;
  v_last_reset DATE;
BEGIN
  SELECT daily_count, last_reset_date INTO v_current_count, v_last_reset
  FROM public.ai_usage_limits
  WHERE user_id = p_user_id;

  IF NOT FOUND THEN
    RETURN p_daily_limit;
  END IF;

  IF v_last_reset < CURRENT_DATE THEN
    RETURN p_daily_limit;
  END IF;

  RETURN GREATEST(0, p_daily_limit - v_current_count);
END;
$$;

-- Enable realtime for live support chat
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;