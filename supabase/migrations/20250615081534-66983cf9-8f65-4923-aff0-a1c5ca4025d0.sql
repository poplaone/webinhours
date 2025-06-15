
-- Remove the download_url column from websites table
ALTER TABLE public.websites DROP COLUMN IF EXISTS download_url;

-- Add inclusions column if it doesn't exist (it should already exist based on the schema)
-- This is just to ensure it's there
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='websites' AND column_name='inclusions') THEN
        ALTER TABLE public.websites ADD COLUMN inclusions TEXT[];
    END IF;
END $$;
