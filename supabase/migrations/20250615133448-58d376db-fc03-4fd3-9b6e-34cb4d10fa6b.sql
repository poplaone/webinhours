
-- Insert sample website data for testing the marketplace
INSERT INTO websites (
  user_id,
  title,
  description,
  category,
  tags,
  price,
  preview_url,
  demo_url,
  thumbnail_url,
  technologies,
  features,
  inclusions,
  status,
  is_featured,
  views_count,
  downloads_count,
  rating_average,
  rating_count
) VALUES 
(
  (SELECT id FROM profiles LIMIT 1),
  'Modern E-commerce Store',
  'A sleek and responsive e-commerce website template with shopping cart functionality, product catalog, and payment integration.',
  'E-commerce',
  ARRAY['React', 'Tailwind CSS', 'Responsive', 'Shopping Cart'],
  99.99,
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&h=600&q=80',
  'https://example.com/demo/ecommerce',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&h=300&q=80',
  ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Stripe'],
  ARRAY['Responsive Design', 'Shopping Cart', 'Product Search', 'Payment Integration', 'Admin Dashboard'],
  ARRAY['Source Code', 'Documentation', 'Assets', '6 Months Support'],
  'approved',
  true,
  1250,
  89,
  4.8,
  34
),
(
  (SELECT id FROM profiles LIMIT 1),
  'Corporate Business Website',
  'Professional corporate website template perfect for businesses, agencies, and consulting firms.',
  'Corporate',
  ARRAY['Professional', 'Clean', 'Corporate', 'Business'],
  79.99,
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&h=600&q=80',
  'https://example.com/demo/corporate',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&h=300&q=80',
  ARRAY['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
  ARRAY['Responsive Layout', 'Contact Forms', 'Team Section', 'Services Pages', 'Blog Integration'],
  ARRAY['HTML/CSS Files', 'JavaScript', 'Images', 'Fonts', 'Documentation'],
  'approved',
  false,
  890,
  67,
  4.6,
  28
),
(
  (SELECT id FROM profiles LIMIT 1),
  'SaaS Landing Page',
  'Convert visitors into customers with this high-converting SaaS landing page template.',
  'SaaS',
  ARRAY['Landing Page', 'Conversion', 'SaaS', 'Marketing'],
  59.99,
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=600&q=80',
  'https://example.com/demo/saas',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&h=300&q=80',
  ARRAY['React', 'Next.js', 'Tailwind CSS'],
  ARRAY['Hero Section', 'Feature Showcase', 'Pricing Tables', 'Testimonials', 'CTA Sections'],
  ARRAY['React Components', 'Tailwind Config', 'Assets', 'Setup Guide'],
  'featured',
  true,
  2100,
  156,
  4.9,
  67
),
(
  (SELECT id FROM profiles LIMIT 1),
  'Creative Portfolio',
  'Showcase your work with this stunning portfolio template designed for creatives and freelancers.',
  'Portfolio',
  ARRAY['Creative', 'Portfolio', 'Photography', 'Design'],
  49.99,
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&h=600&q=80',
  'https://example.com/demo/portfolio',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=300&q=80',
  ARRAY['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
  ARRAY['Image Gallery', 'Smooth Animations', 'Contact Form', 'About Section', 'Project Details'],
  ARRAY['Source Files', 'Images', 'Fonts', 'Animation Scripts'],
  'approved',
  false,
  645,
  43,
  4.7,
  19
),
(
  (SELECT id FROM profiles LIMIT 1),
  'Restaurant Website',
  'Delicious website template for restaurants, cafes, and food businesses with online menu and reservations.',
  'Restaurant',
  ARRAY['Restaurant', 'Food', 'Menu', 'Reservations'],
  69.99,
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&h=600&q=80',
  'https://example.com/demo/restaurant',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&h=300&q=80',
  ARRAY['WordPress', 'PHP', 'MySQL', 'CSS3'],
  ARRAY['Online Menu', 'Reservation System', 'Gallery', 'Location Map', 'Contact Info'],
  ARRAY['WordPress Theme', 'Database Setup', 'Images', 'Setup Instructions'],
  'approved',
  false,
  432,
  31,
  4.5,
  15
),
(
  (SELECT id FROM profiles LIMIT 1),
  'Real Estate Platform',
  'Complete real estate website with property listings, search functionality, and agent profiles.',
  'Real Estate',
  ARRAY['Real Estate', 'Properties', 'Search', 'Listings'],
  129.99,
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&h=600&q=80',
  'https://example.com/demo/realestate',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&h=300&q=80',
  ARRAY['React', 'Node.js', 'MongoDB', 'Express'],
  ARRAY['Property Search', 'Listing Management', 'Agent Profiles', 'Map Integration', 'Contact System'],
  ARRAY['Full Stack Code', 'Database Schema', 'API Documentation', 'Deployment Guide'],
  'approved',
  false,
  789,
  52,
  4.4,
  22
);

-- Update the websites table to ensure we have proper sample data
UPDATE websites SET 
  approved_at = CASE 
    WHEN status IN ('approved', 'featured') THEN NOW() - INTERVAL '7 days'
    ELSE NULL 
  END,
  featured_at = CASE 
    WHEN is_featured = true THEN NOW() - INTERVAL '3 days'
    ELSE NULL 
  END
WHERE id IN (SELECT id FROM websites ORDER BY created_at DESC LIMIT 6);
