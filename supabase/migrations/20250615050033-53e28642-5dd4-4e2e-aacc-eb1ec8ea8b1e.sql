
-- Enable RLS on websites table (if not already enabled)
ALTER TABLE public.websites ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Anyone can view approved/featured websites" ON public.websites;
DROP POLICY IF EXISTS "Users can view their own websites" ON public.websites;
DROP POLICY IF EXISTS "Users can create their own websites" ON public.websites;
DROP POLICY IF EXISTS "Users can update their own websites" ON public.websites;
DROP POLICY IF EXISTS "Users can delete their own websites" ON public.websites;

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
