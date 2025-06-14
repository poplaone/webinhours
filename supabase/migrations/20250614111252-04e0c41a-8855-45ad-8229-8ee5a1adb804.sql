
-- Create enum types for better data consistency
CREATE TYPE public.idea_status AS ENUM ('draft', 'in_review', 'approved', 'rejected');
CREATE TYPE public.concept_status AS ENUM ('draft', 'testing', 'completed', 'archived');
CREATE TYPE public.test_status AS ENUM ('pending', 'running', 'completed', 'failed');

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  company TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ideas table
CREATE TABLE public.ideas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  tags TEXT[],
  status idea_status DEFAULT 'draft',
  market_potential INTEGER CHECK (market_potential >= 1 AND market_potential <= 10),
  feasibility_score INTEGER CHECK (feasibility_score >= 1 AND feasibility_score <= 10),
  competition_level TEXT,
  target_audience TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create concepts table
CREATE TABLE public.concepts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  idea_id UUID REFERENCES public.ideas ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  value_proposition TEXT,
  target_market TEXT,
  key_features TEXT[],
  status concept_status DEFAULT 'draft',
  ai_generated BOOLEAN DEFAULT FALSE,
  ai_prompt TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create concept tests table
CREATE TABLE public.concept_tests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  concept_id UUID REFERENCES public.concepts ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  test_name TEXT NOT NULL,
  test_type TEXT NOT NULL, -- 'survey', 'interview', 'landing_page', 'prototype'
  target_audience TEXT,
  sample_size INTEGER,
  status test_status DEFAULT 'pending',
  results JSONB,
  insights TEXT,
  recommendations TEXT,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create test responses table for storing individual responses
CREATE TABLE public.test_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  test_id UUID REFERENCES public.concept_tests ON DELETE CASCADE NOT NULL,
  respondent_id TEXT, -- Can be anonymous or user ID
  responses JSONB NOT NULL,
  demographic_data JSONB,
  completion_time INTEGER, -- in seconds
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('concept-assets', 'concept-assets', true);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.concept_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_responses ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for ideas
CREATE POLICY "Users can view their own ideas" ON public.ideas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own ideas" ON public.ideas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ideas" ON public.ideas
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ideas" ON public.ideas
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for concepts
CREATE POLICY "Users can view their own concepts" ON public.concepts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own concepts" ON public.concepts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own concepts" ON public.concepts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own concepts" ON public.concepts
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for concept tests
CREATE POLICY "Users can view their own concept tests" ON public.concept_tests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own concept tests" ON public.concept_tests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own concept tests" ON public.concept_tests
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own concept tests" ON public.concept_tests
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for test responses (more permissive for public tests)
CREATE POLICY "Anyone can create test responses" ON public.test_responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Test owners can view responses" ON public.test_responses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.concept_tests 
      WHERE concept_tests.id = test_responses.test_id 
      AND concept_tests.user_id = auth.uid()
    )
  );

-- Create storage policies for concept assets
CREATE POLICY "Users can upload their own assets" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'concept-assets' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can view their own assets" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'concept-assets' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Anyone can view public assets" ON storage.objects
  FOR SELECT USING (bucket_id = 'concept-assets');

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to all tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ideas_updated_at BEFORE UPDATE ON public.ideas
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_concepts_updated_at BEFORE UPDATE ON public.concepts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_concept_tests_updated_at BEFORE UPDATE ON public.concept_tests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
