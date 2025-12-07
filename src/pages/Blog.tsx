import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    image: string;
    linkedIn?: string;
  };
  category: string;
  tags: string[];
  image: string;
  publishedAt: string;
  readTime: number;
  featured: boolean;
}

// Blog posts data - SEO optimized for GEO
const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "how-to-get-free-professional-website",
    title: "How to Get a Free Professional Website in 2024: Complete Guide",
    excerpt: "Learn how to get a free, professionally designed website that looks like you paid thousands. Step-by-step guide with 500+ template options.",
    content: "Full content here...",
    author: {
      name: "Sarah Chen",
      role: "Head of Marketing",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      linkedIn: "https://linkedin.com/in/"
    },
    category: "Guides",
    tags: ["free website", "website builder", "templates", "startup"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    publishedAt: "2024-12-01",
    readTime: 8,
    featured: true
  },
  {
    id: "2",
    slug: "website-seo-optimization-2024",
    title: "Website SEO Optimization: 10 Essential Tips for 2024",
    excerpt: "Boost your website's search rankings with these proven SEO strategies. From technical SEO to content optimization, learn what works now.",
    content: "Full content here...",
    author: {
      name: "Michael Rodriguez",
      role: "SEO Specialist",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      linkedIn: "https://linkedin.com/in/"
    },
    category: "SEO",
    tags: ["SEO", "optimization", "rankings", "traffic"],
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&h=400&fit=crop",
    publishedAt: "2024-11-28",
    readTime: 12,
    featured: true
  },
  {
    id: "3",
    slug: "mobile-first-web-design-importance",
    title: "Why Mobile-First Web Design is No Longer Optional in 2024",
    excerpt: "60% of web traffic comes from mobile devices. Learn why mobile-first design is crucial and how to implement it effectively.",
    content: "Full content here...",
    author: {
      name: "Emily Watson",
      role: "UX Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    category: "Design",
    tags: ["mobile-first", "responsive design", "UX", "mobile optimization"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
    publishedAt: "2024-11-25",
    readTime: 6,
    featured: false
  },
  {
    id: "4",
    slug: "website-speed-optimization-guide",
    title: "Website Speed Optimization: The Ultimate Performance Guide",
    excerpt: "A slow website costs you customers. Learn how to achieve sub-2-second load times with these proven optimization techniques.",
    content: "Full content here...",
    author: {
      name: "David Park",
      role: "Performance Engineer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    category: "Performance",
    tags: ["performance", "speed", "Core Web Vitals", "optimization"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    publishedAt: "2024-11-20",
    readTime: 10,
    featured: false
  },
  {
    id: "5",
    slug: "ecommerce-website-conversion-tips",
    title: "E-commerce Website Conversion: 15 Tips to Boost Sales",
    excerpt: "Turn more visitors into customers with these conversion optimization strategies proven to increase e-commerce sales by up to 40%.",
    content: "Full content here...",
    author: {
      name: "Jessica Thompson",
      role: "E-commerce Consultant",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    category: "E-commerce",
    tags: ["e-commerce", "conversion", "sales", "CRO"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
    publishedAt: "2024-11-15",
    readTime: 15,
    featured: false
  },
  {
    id: "6",
    slug: "ai-web-development-future",
    title: "AI in Web Development: What the Future Holds for 2025",
    excerpt: "Explore how AI is revolutionizing web development, from automated coding to intelligent design suggestions and beyond.",
    content: "Full content here...",
    author: {
      name: "James Anderson",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    category: "Technology",
    tags: ["AI", "web development", "future tech", "automation"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    publishedAt: "2024-11-10",
    readTime: 9,
    featured: false
  }
];

// Generate BlogPosting schema for SEO
const generateBlogListSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "WebInHours Blog",
  "description": "Expert insights on web development, SEO, design, and digital marketing",
  "url": "https://webinhours.com/blog",
  "publisher": {
    "@type": "Organization",
    "name": "WebInHours",
    "logo": {
      "@type": "ImageObject",
      "url": "https://webinhours.com/logo.png"
    }
  },
  "blogPost": blogPosts.map(post => ({
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "datePublished": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role,
      "image": post.author.image,
      ...(post.author.linkedIn && { "sameAs": [post.author.linkedIn] })
    },
    "publisher": {
      "@type": "Organization",
      "name": "WebInHours"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://webinhours.com/blog/${post.slug}`
    }
  }))
});

const BlogCard = ({ post, index, featured = false }: { post: BlogPost; index: number; featured?: boolean }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      itemScope
      itemType="https://schema.org/BlogPosting"
      className={featured ? "md:col-span-2 lg:col-span-2" : ""}
    >
      <Link to={`/blog/${post.slug}`}>
        <Card className="h-full bg-white/5 backdrop-blur-md border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 overflow-hidden group">
          {/* Image */}
          <div className={`relative overflow-hidden ${featured ? "h-64 md:h-80" : "h-48"}`}>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              itemProp="image"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                {post.category}
              </Badge>
            </div>
          </div>

          <CardHeader className="pb-2">
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" aria-hidden="true" />
                <time itemProp="datePublished" dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" aria-hidden="true" />
                {post.readTime} min read
              </span>
            </div>
            <CardTitle
              className={`text-foreground group-hover:text-primary transition-colors ${featured ? "text-xl md:text-2xl" : "text-lg"}`}
              itemProp="headline"
            >
              {post.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p
              className="text-muted-foreground text-sm mb-4 line-clamp-2"
              itemProp="description"
            >
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  <Tag className="w-3 h-3 mr-1" aria-hidden="true" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Author */}
            <div
              className="flex items-center justify-between"
              itemProp="author"
              itemScope
              itemType="https://schema.org/Person"
            >
              <div className="flex items-center gap-3">
                <img
                  src={post.author.image}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full object-cover"
                  loading="lazy"
                  itemProp="image"
                />
                <div>
                  <p className="text-sm font-medium text-foreground" itemProp="name">
                    {post.author.name}
                  </p>
                  <p className="text-xs text-muted-foreground" itemProp="jobTitle">
                    {post.author.role}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.article>
  );
};

const Blog = () => {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);
  const categories = [...new Set(blogPosts.map(post => post.category))];

  return (
    <AppLayout>
      <SEOHead
        title="Blog - Web Development, SEO & Design Insights | WebInHours"
        description="Expert articles on web development, SEO optimization, responsive design, and digital marketing. Learn from industry professionals and boost your online presence."
        keywords="web development blog, SEO tips, website design, digital marketing, web performance, e-commerce optimization"
        canonicalUrl="https://webinhours.com/blog"
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generateBlogListSchema())}
        </script>
      </Helmet>

      <main className="min-h-screen pt-20 md:pt-24 pb-24 md:pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* TL;DR for AI */}
            <p className="text-primary font-medium text-sm mb-3">
              Expert Web Development Insights
            </p>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-foreground">WebInHours </span>
              <span className="text-primary">Blog</span>
            </h1>

            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Learn from industry experts. Get actionable tips on web development, SEO, design, and growing your online presence.
            </p>
          </motion.header>

          {/* Category Filters */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
            aria-label="Blog categories"
          >
            <Badge
              variant="secondary"
              className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
            >
              All Posts
            </Badge>
            {categories.map(category => (
              <Badge
                key={category}
                variant="outline"
                className="cursor-pointer hover:bg-primary/10"
              >
                {category}
              </Badge>
            ))}
          </motion.nav>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <section className="mb-12" aria-labelledby="featured-posts-heading">
              <h2 id="featured-posts-heading" className="text-xl font-semibold mb-6 text-foreground">
                Featured Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} featured />
                ))}
              </div>
            </section>
          )}

          {/* All Posts */}
          <section aria-labelledby="all-posts-heading">
            <h2 id="all-posts-heading" className="text-xl font-semibold mb-6 text-foreground">
              Latest Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          </section>

          {/* Newsletter CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center bg-white/5 backdrop-blur-md border border-border/50 rounded-2xl p-8 md:p-12"
            aria-labelledby="newsletter-heading"
          >
            <h2 id="newsletter-heading" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Get the latest web development tips and insights delivered to your inbox.
            </p>
          </motion.section>
        </div>
      </main>
    </AppLayout>
  );
};

export default Blog;