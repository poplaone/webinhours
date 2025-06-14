
-- Create the websites table for the marketplace
CREATE TABLE public.websites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  tags TEXT[],
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  preview_url TEXT NOT NULL,
  demo_url TEXT,
  download_url TEXT,
  thumbnail_url TEXT,
  images TEXT[],
  technologies TEXT[],
  features TEXT[],
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'featured', 'archived')),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  views_count INTEGER NOT NULL DEFAULT 0,
  downloads_count INTEGER NOT NULL DEFAULT 0,
  rating_average DECIMAL(3,2),
  rating_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  featured_at TIMESTAMP WITH TIME ZONE,
  approved_at TIMESTAMP WITH TIME ZONE
);

-- Add Row Level Security (RLS)
ALTER TABLE public.websites ENABLE ROW LEVEL SECURITY;

-- Create policies for website access
CREATE POLICY "Anyone can view approved/featured websites" 
  ON public.websites 
  FOR SELECT 
  USING (status IN ('approved', 'featured'));

CREATE POLICY "Users can view their own websites" 
  ON public.websites 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own websites" 
  ON public.websites 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own websites" 
  ON public.websites 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own websites" 
  ON public.websites 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create function to increment website views
CREATE OR REPLACE FUNCTION public.increment_website_views(website_uuid UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.websites 
  SET views_count = views_count + 1 
  WHERE id = website_uuid;
END;
$$;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_websites_updated_at
  BEFORE UPDATE ON public.websites
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
