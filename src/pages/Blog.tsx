
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

export default function Blog() {
  // Mock blog posts data - in real app this would come from backend
  const featuredPost = {
    id: 1,
    title: "The Future of Rapid Web Development: AI and Automation",
    excerpt: "Discover how artificial intelligence and automation are revolutionizing the way we build websites, making professional web development accessible to everyone.",
    content: "Full content would be loaded from backend...",
    author: "Sarah Johnson",
    date: "2024-12-10",
    readTime: "5 min read",
    image: "/placeholder.svg",
    category: "Technology",
    featured: true
  };

  const blogPosts = [
    {
      id: 2,
      title: "10 Essential Features Every Business Website Needs",
      excerpt: "From contact forms to SEO optimization, learn about the must-have features that make business websites successful.",
      author: "Mike Chen",
      date: "2024-12-08",
      readTime: "7 min read",
      category: "Business"
    },
    {
      id: 3,
      title: "How to Choose the Perfect Website Template",
      excerpt: "A comprehensive guide to selecting the right template for your business, considering design, functionality, and customization options.",
      author: "Emily Rodriguez",
      date: "2024-12-05",
      readTime: "4 min read",
      category: "Design"
    },
    {
      id: 4,
      title: "Marketplace Success Stories: Developers Earning $10k+ Monthly",
      excerpt: "Meet the independent developers who've built successful businesses selling website templates on our marketplace.",
      author: "David Kim",
      date: "2024-12-03",
      readTime: "6 min read",
      category: "Success Stories"
    },
    {
      id: 5,
      title: "SEO Best Practices for New Websites",
      excerpt: "Get your website discovered with these essential SEO strategies that every new website owner should implement.",
      author: "Lisa Taylor",
      date: "2024-12-01",
      readTime: "8 min read",
      category: "SEO"
    },
    {
      id: 6,
      title: "The Rise of No-Code Website Builders",
      excerpt: "Exploring how no-code solutions are democratizing web development and empowering non-technical users.",
      author: "Alex Thompson",
      date: "2024-11-28",
      readTime: "5 min read",
      category: "Technology"
    }
  ];

  const categories = ["All", "Technology", "Business", "Design", "SEO", "Success Stories"];

  return (
    <AppLayout>
      <SEOHead 
        title="Blog - WebInHours | Web Development Insights & Tips"
        description="Stay updated with the latest trends, tips, and success stories in rapid web development."
        keywords="web development blog, website tips, development insights"
      />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Blog & Insights</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Web Development<br />Insights & Tips
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest trends, tips, and success stories in rapid web development.
          </p>
        </div>

        {/* Featured Post */}
        <Card className="mb-12 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title}
                className="w-full h-64 md:h-full object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-purple-600">Featured</Badge>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <Badge variant="outline" className="w-fit mb-4">{featuredPost.category}</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h2>
              <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <User className="h-4 w-4 mr-2" />
                <span className="mr-4">{featuredPost.author}</span>
                <Calendar className="h-4 w-4 mr-2" />
                <span className="mr-4">{featuredPost.date}</span>
                <Clock className="h-4 w-4 mr-2" />
                <span>{featuredPost.readTime}</span>
              </div>
              <Button className="w-fit">
                Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Badge 
              key={category}
              variant="outline" 
              className="cursor-pointer hover:bg-purple-100 hover:border-purple-300"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="group-hover:text-purple-600 transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <User className="h-4 w-4 mr-2" />
                  <span className="mr-4">{post.author}</span>
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{post.date}</span>
                </div>
                <Button variant="ghost" className="p-0 h-auto text-purple-600 hover:text-purple-700">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-6">
              Get the latest web development tips and insights delivered to your inbox.
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </AppLayout>
  );
}
