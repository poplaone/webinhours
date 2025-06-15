
-- Create a storage bucket for website images
INSERT INTO storage.buckets (id, name, public)
VALUES ('website-images', 'website-images', true);

-- Create storage policies for website images
CREATE POLICY "Anyone can view website images" ON storage.objects
FOR SELECT USING (bucket_id = 'website-images');

CREATE POLICY "Authenticated users can upload website images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'website-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own website images" ON storage.objects
FOR UPDATE USING (bucket_id = 'website-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete their own website images" ON storage.objects
FOR DELETE USING (bucket_id = 'website-images' AND auth.role() = 'authenticated');
