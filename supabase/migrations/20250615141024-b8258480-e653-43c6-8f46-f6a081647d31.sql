
-- First, let's clear any existing test data and add proper real listings
DELETE FROM websites WHERE title IN ('Modern E-commerce Store', 'Corporate Business Website', 'SaaS Landing Page', 'Creative Portfolio', 'Restaurant Website', 'Real Estate Platform');

-- Insert 6 real website listings with proper data
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
  (SELECT id FROM profiles ORDER BY created_at DESC LIMIT 1),
  'TechStore - Modern E-commerce Platform',
  'Complete e-commerce solution with advanced shopping cart, payment processing, inventory management, and customer dashboard. Built with modern technologies for scalability.',
  'E-commerce',
  ARRAY['E-commerce', 'Shopping Cart', 'Payment Gateway', 'Inventory', 'React'],
  299.99,
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&h=600&q=80',
  'https://demo.techstore.example.com',
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=400&h=300&q=80',
  ARRAY['React', 'TypeScript', 'Node.js', 'Stripe', 'PostgreSQL'],
  ARRAY['Multi-vendor Support', 'Advanced Search', 'Wishlist', 'Order Tracking', 'Admin Dashboard', 'Mobile Responsive'],
  ARRAY['Complete Source Code', 'Database Schema', 'API Documentation', 'Setup Guide', '3 Months Support'],
  'featured',
  true,
  2847,
  124,
  4.9,
  45
),
(
  (SELECT id FROM profiles ORDER BY created_at DESC LIMIT 1),
  'CreativeStudio - Portfolio & Agency Website',
  'Stunning portfolio template for creative agencies, photographers, and designers. Features smooth animations, project galleries, and client testimonials.',
  'Portfolio',
  ARRAY['Portfolio', 'Creative', 'Agency', 'Photography', 'Animation'],
  149.99,
  'https://images.unsplash.com/photo-1545665277-5937750782ef?auto=format&fit=crop&w=800&h=600&q=80',
  'https://demo.creativestudio.example.com',
  'https://images.unsplash.com/photo-1545665277-5937750782ef?auto=format&fit=crop&w=400&h=300&q=80',
  ARRAY['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Three.js'],
  ARRAY['3D Animations', 'Project Gallery', 'Contact Forms', 'Blog Integration', 'SEO Optimized'],
  ARRAY['HTML/CSS Files', 'JavaScript Files', 'Image Assets', 'Font Files', 'Documentation'],
  'approved',
  false,
  1653,
  89,
  4.7,
  32
),
(
  (SELECT id FROM profiles ORDER BY created_at DESC LIMIT 1),
  'SaaSify - Complete SaaS Landing Page',
  'High-converting SaaS landing page with pricing tables, feature showcases, customer testimonials, and integrated analytics. Perfect for software companies.',
  'SaaS',
  ARRAY['SaaS', 'Landing Page', 'Conversion', 'Analytics', 'Marketing'],
  199.99,
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=600&q=80',
  'https://demo.saasify.example.com',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&h=300&q=80',
  ARRAY['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  ARRAY['Pricing Calculator', 'Feature Comparison', 'Customer Reviews', 'Analytics Dashboard', 'A/B Testing'],
  ARRAY['React Components', 'Next.js Setup', 'Tailwind Config', 'Animation Library', '60 Days Support'],
  'approved',
  true,
  3421,
  167,
  4.8,
  78
),
(
  (SELECT id FROM profiles ORDER BY created_at DESC LIMIT 1),
  'CorpBiz - Professional Business Website',
  'Clean and professional corporate website template ideal for consulting firms, law offices, and business services. Includes team pages and service catalogs.',
  'Corporate',
  ARRAY['Corporate', 'Business', 'Professional', 'Consulting', 'Services'],
  179.99,
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&h=600&q=80',
  'https://demo.corpbiz.example.com',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&h=300&q=80',
  ARRAY['WordPress', 'PHP', 'MySQL', 'Bootstrap', 'jQuery'],
  ARRAY['Team Management', 'Service Catalog', 'Appointment Booking', 'Newsletter', 'Multi-language'],
  ARRAY['WordPress Theme', 'PHP Files', 'MySQL Database', 'Admin Panel', 'Installation Guide'],
  'approved',
  false,
  945,
  56,
  4.6,
  23
),
(
  (SELECT id FROM profiles ORDER BY created_at DESC LIMIT 1),
  'FoodiePlace - Restaurant & Cafe Website',
  'Delicious restaurant website with online menu, table reservations, food delivery integration, and customer reviews. Perfect for restaurants and cafes.',
  'Restaurant',
  ARRAY['Restaurant', 'Food', 'Menu', 'Reservations', 'Delivery'],
  129.99,
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&h=600&q=80',
  'https://demo.foodieplace.example.com',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&h=300&q=80',
  ARRAY['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io'],
  ARRAY['Online Ordering', 'Table Booking', 'Menu Management', 'Customer Reviews', 'Delivery Tracking'],
  ARRAY['Full Stack Code', 'Database Setup', 'API Integration', 'Admin Dashboard', '90 Days Support'],
  'approved',
  false,
  756,
  34,
  4.5,
  18
),
(
  (SELECT id FROM profiles ORDER BY created_at DESC LIMIT 1),
  'PropMaster - Real Estate Platform',
  'Comprehensive real estate website with property listings, advanced search, virtual tours, and agent management system. Built for real estate agencies.',
  'Real Estate',
  ARRAY['Real Estate', 'Properties', 'Search', 'Virtual Tours', 'Agents'],
  399.99,
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&h=600&q=80',
  'https://demo.propmaster.example.com',
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=400&h=300&q=80',
  ARRAY['Vue.js', 'Laravel', 'MySQL', 'Google Maps API', 'AWS S3'],
  ARRAY['Property Search', 'Virtual Tours', 'Agent Profiles', 'Mortgage Calculator', 'Lead Management'],
  ARRAY['Vue.js Frontend', 'Laravel Backend', 'Database Schema', 'API Documentation', '6 Months Support'],
  'featured',
  true,
  1234,
  67,
  4.7,
  29
);

-- Set proper timestamps for the new listings
UPDATE websites SET 
  approved_at = NOW() - INTERVAL '3 days',
  featured_at = CASE 
    WHEN is_featured = true THEN NOW() - INTERVAL '1 day'
    ELSE NULL 
  END
WHERE title IN ('TechStore - Modern E-commerce Platform', 'CreativeStudio - Portfolio & Agency Website', 'SaaSify - Complete SaaS Landing Page', 'CorpBiz - Professional Business Website', 'FoodiePlace - Restaurant & Cafe Website', 'PropMaster - Real Estate Platform');
