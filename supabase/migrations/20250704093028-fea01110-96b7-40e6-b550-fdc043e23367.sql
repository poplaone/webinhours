-- Create AI agents table
CREATE TABLE public.ai_agents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  tags TEXT[],
  price NUMERIC NOT NULL DEFAULT 0,
  preview_url TEXT NOT NULL,
  demo_url TEXT,
  thumbnail_url TEXT,
  images TEXT[],
  technologies TEXT[],
  features TEXT[],
  inclusions TEXT[],
  agent_type TEXT NOT NULL DEFAULT 'chatbot', -- chatbot, assistant, automation, etc.
  model_info JSONB, -- model details, capabilities, etc.
  use_cases TEXT[],
  status TEXT NOT NULL DEFAULT 'pending',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  views_count INTEGER NOT NULL DEFAULT 0,
  usage_count INTEGER NOT NULL DEFAULT 0,
  rating_average NUMERIC,
  rating_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  featured_at TIMESTAMP WITH TIME ZONE,
  approved_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.ai_agents ENABLE ROW LEVEL SECURITY;

-- Create policies for ai_agents
CREATE POLICY "Users can view their own ai_agents" 
ON public.ai_agents 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own ai_agents" 
ON public.ai_agents 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ai_agents" 
ON public.ai_agents 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ai_agents" 
ON public.ai_agents 
FOR DELETE 
USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view approved/featured ai_agents" 
ON public.ai_agents 
FOR SELECT 
USING (status = ANY (ARRAY['approved'::text, 'featured'::text]));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_ai_agents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_ai_agents_updated_at
BEFORE UPDATE ON public.ai_agents
FOR EACH ROW
EXECUTE FUNCTION public.update_ai_agents_updated_at();

-- Create function to increment agent usage
CREATE OR REPLACE FUNCTION public.increment_agent_usage(agent_uuid UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.ai_agents 
  SET usage_count = usage_count + 1 
  WHERE id = agent_uuid;
END;
$$;