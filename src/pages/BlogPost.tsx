import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, Share2, Linkedin, Twitter, Facebook } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { trackButtonClick } from '@/utils/analytics';

// Full blog post content with SEO-optimized structure
const blogPostsContent: Record<string, {
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    bio: string;
    image: string;
    linkedIn?: string;
    twitter?: string;
  };
  category: string;
  tags: string[];
  image: string;
  publishedAt: string;
  modifiedAt: string;
  readTime: number;
}> = {
  "how-to-get-free-professional-website": {
    title: "How to Get a Free Professional Website in 2024: Complete Guide",
    excerpt: "Learn how to get a free, professionally designed website that looks like you paid thousands. Step-by-step guide with 500+ template options.",
    content: `
## TL;DR
You can get a free professional website at WebInHours by choosing from 500+ templates. Premium branding upgrades start at $299.

## Why Most Free Website Options Fall Short

Most free website builders come with significant limitations: forced ads, limited customization, poor performance, and unprofessional subdomains. These issues can hurt your brand credibility and SEO rankings.

### The WebInHours Difference

WebInHours solves these problems by offering:

- **500+ Professional Templates**: Designed by experts, not generic drag-and-drop layouts
- **No Forced Ads**: Your website, your brand
- **Custom Domain Support**: Use your own domain for a professional look
- **Built-in SEO**: Every template is optimized for search engines
- **Mobile-First Design**: 60%+ of visitors browse on mobile devices

## Step-by-Step: Getting Your Free Website

### Step 1: Browse the Template Marketplace

Visit our [websites](/websites) and browse through 500+ professionally designed templates. Filter by:

- Industry (e-commerce, portfolio, business, blog)
- Style (modern, minimalist, bold)
- Features (contact forms, galleries, booking systems)

### Step 2: Preview and Select

Click on any template to see a live preview. Check how it looks on different devices and explore the built-in features.

### Step 3: Claim Your Free Website

Click "Get This Template" and we'll set up your website within 24 hours. You'll receive:

- Fully configured website
- Basic customization (your logo, colors, content)
- Mobile-responsive design
- SEO-optimized structure

### Step 4: Optional Premium Upgrades

Want to take your website further? Consider our premium options:

- **Custom Branding ($299)**: Unique design tailored to your brand
- **E-commerce Integration ($499)**: Full online store functionality
- **Advanced SEO Package ($199)**: Enhanced optimization for competitive keywords

## What's Included in Your Free Website

| Feature | Free | Premium |
|---------|------|---------|
| Professional Template | ✓ | ✓ |
| Mobile Responsive | ✓ | ✓ |
| Basic SEO | ✓ | ✓ |
| Custom Domain | ✓ | ✓ |
| Custom Branding | - | ✓ |
| Priority Support | - | ✓ |
| E-commerce | - | ✓ |

## Frequently Asked Questions

**Q: Is it really free?**
A: Yes, basic website templates are completely free. You only pay for premium upgrades if you want them.

**Q: How long until my website is ready?**
A: We deliver within 24 hours of your request.

**Q: Can I use my own domain?**
A: Absolutely. We'll help you connect your domain at no extra cost.

## Conclusion

Getting a professional website doesn't have to cost thousands or take months. With WebInHours, you can have a beautiful, functional website ready in 24 hours - for free.

[Browse Templates Now →](/websites)
    `,
    author: {
      name: "Sarah Chen",
      role: "Head of Marketing",
      bio: "Sarah has 10+ years of experience in digital marketing and web strategy. She helps businesses establish their online presence effectively.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      linkedIn: "https://linkedin.com/in/",
      twitter: "https://twitter.com/"
    },
    category: "Guides",
    tags: ["free website", "website builder", "templates", "startup", "small business"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    publishedAt: "2024-12-01",
    modifiedAt: "2024-12-05",
    readTime: 8
  }
};

// Default post for other slugs
const defaultPost = {
  title: "Article Coming Soon",
  excerpt: "This article is being written by our expert team.",
  content: "Full content coming soon. Check back later!",
  author: {
    name: "WebInHours Team",
    role: "Content Team",
    bio: "Expert web development and marketing insights.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  category: "General",
  tags: ["web development"],
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
  publishedAt: "2024-12-01",
  modifiedAt: "2024-12-01",
  readTime: 5
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? (blogPostsContent[slug] || defaultPost) : defaultPost;

  const handleShare = (platform: string) => {
    trackButtonClick(`share_${platform}`, 'blog_post');
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);
    
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  // Generate Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "datePublished": post.publishedAt,
    "dateModified": post.modifiedAt,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role,
      "description": post.author.bio,
      "image": post.author.image,
      ...((post.author as any).linkedIn && { "sameAs": [(post.author as any).linkedIn, (post.author as any).twitter].filter(Boolean) })
    },
    "publisher": {
      "@type": "Organization",
      "name": "WebInHours",
      "logo": {
        "@type": "ImageObject",
        "url": "https://webinhours.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://webinhours.com/blog/${slug}`
    }
  };

  // Generate BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://webinhours.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://webinhours.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://webinhours.com/blog/${slug}`
      }
    ]
  };

  return (
    <AppLayout>
      <SEOHead
        title={`${post.title} | WebInHours Blog`}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        canonicalUrl={`https://webinhours.com/blog/${slug}`}
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <article 
        className="min-h-screen pt-20 md:pt-24 pb-24 md:pb-12"
        itemScope
        itemType="https://schema.org/Article"
      >
        {/* Hero Image */}
        <div className="relative h-64 md:h-96 w-full overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            itemProp="image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Link */}
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Category Badge */}
            <Badge variant="secondary" className="mb-4 bg-primary text-primary-foreground">
              {post.category}
            </Badge>

            {/* Title */}
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
              itemProp="headline"
            >
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <time itemProp="datePublished" dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </time>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </span>
              <meta itemProp="dateModified" content={post.modifiedAt} />
            </div>

            {/* Author Card */}
            <div 
              className="bg-card/60 backdrop-blur-md border border-border/50 rounded-xl p-6 mb-8"
              itemProp="author"
              itemScope
              itemType="https://schema.org/Person"
            >
              <div className="flex items-start gap-4">
                <img
                  src={post.author.image}
                  alt={post.author.name}
                  className="w-16 h-16 rounded-full object-cover"
                  itemProp="image"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground" itemProp="name">
                    {post.author.name}
                  </h3>
                  <p className="text-sm text-primary" itemProp="jobTitle">
                    {post.author.role}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2" itemProp="description">
                    {post.author.bio}
                  </p>
                  {((post.author as any).linkedIn || (post.author as any).twitter) && (
                    <div className="flex gap-3 mt-3">
                      {(post.author as any).linkedIn && (
                        <a 
                          href={(post.author as any).linkedIn} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label={`${post.author.name}'s LinkedIn profile`}
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {(post.author as any).twitter && (
                        <a 
                          href={(post.author as any).twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label={`${post.author.name}'s Twitter profile`}
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share:
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('twitter')}
                aria-label="Share on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('linkedin')}
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('facebook')}
                aria-label="Share on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div 
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-foreground prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-foreground/80 prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-ul:text-foreground/80 prose-ol:text-foreground/80
                prose-li:marker:text-primary
                prose-table:border-border
                prose-th:bg-card prose-th:text-foreground prose-th:p-3
                prose-td:border-border prose-td:p-3
              "
              itemProp="articleBody"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
              {post.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-primary/10 rounded-2xl text-center">
              <h3 className="text-xl font-bold text-foreground mb-3">
                Ready to Get Your Free Website?
              </h3>
              <p className="text-muted-foreground mb-6">
                Choose from 500+ professional templates and launch in 24 hours.
              </p>
              <Link to="/websites">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Browse Templates
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </article>
    </AppLayout>
  );
};

export default BlogPost;