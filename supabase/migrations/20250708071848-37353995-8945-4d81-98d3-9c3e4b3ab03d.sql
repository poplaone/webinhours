-- Add slug field to websites table for SEO-friendly URLs
ALTER TABLE public.websites 
ADD COLUMN slug text UNIQUE;

-- Create index for faster slug lookups
CREATE INDEX idx_websites_slug ON public.websites(slug);

-- Create function to generate slug from title
CREATE OR REPLACE FUNCTION public.generate_slug(title text)
RETURNS text AS $$
BEGIN
  RETURN lower(
    trim(
      regexp_replace(
        regexp_replace(
          regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
          '\s+', '-', 'g'
        ),
        '-+', '-', 'g'
      ),
      '-'
    )
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;