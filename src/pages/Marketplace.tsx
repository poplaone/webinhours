
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Eye, Download, Heart, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', name: 'All Templates', count: 150 },
    { id: 'ecommerce', name: 'E-commerce', count: 45 },
    { id: 'business', name: 'Business', count: 60 },
    { id: 'portfolio', name: 'Portfolio', count: 25 },
    { id: 'blog', name: 'Blog', count: 20 }
  ];

  const templates = [
    {
      id: 1,
      title: "Modern E-commerce Store",
      category: "ecommerce",
      price: 299,
      rating: 4.9,
      reviews: 156,
      views: 2840,
      downloads: 234,
      image: "/placeholder.svg",
      tags: ["React", "Stripe", "Mobile-First", "SEO"],
      description: "Complete e-commerce solution with payment integration and inventory management",
      features: ["Payment Integration", "Inventory Management", "Mobile Responsive", "SEO Optimized"],
      isFeatured: true,
      deliveryTime: "24 hours"
    },
    {
      id: 2,
      title: "Professional Law Firm",
      category: "business",
      price: 199,
      rating: 4.8,
      reviews: 89,
      views: 1650,
      downloads: 167,
      image: "/placeholder.svg",
      tags: ["Professional", "Contact Forms", "Booking", "CMS"],
      description: "Professional website for law firms with client portal and case management",
      features: ["Client Portal", "Appointment Booking", "Case Management", "Contact Forms"],
      isFeatured: false,
      deliveryTime: "24 hours"
    },
    {
      id: 3,
      title: "Creative Portfolio",
      category: "portfolio",
      price: 149,
      rating: 4.7,
      reviews: 203,
      views: 3200,
      downloads: 412,
      image: "/placeholder.svg",
      tags: ["Creative", "Gallery", "Animation", "Portfolio"],
      description: "Stunning portfolio website for creatives and designers",
      features: ["Image Gallery", "Smooth Animations", "Contact Forms", "Social Integration"],
      isFeatured: true,
      deliveryTime: "12 hours"
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AppLayout>
      <SEOHead 
        title="Website Template Marketplace - Choose Your Perfect Design"
        description="Browse 150+ professional website templates. E-commerce, business, portfolio designs ready in 24 hours. All templates include hosting, SSL, and mobile optimization."
        keywords="website templates, web design marketplace, professional websites, e-commerce templates, business websites"
      />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Website Template <span className="text-[#8B5CF6]">Marketplace</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Choose from 150+ professionally designed templates. Each comes with 24-hour delivery, 
              hosting setup, and mobile optimization included.
            </p>
            
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span>4.8/5 Average Rating</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-4 w-4 text-green-500" />
                <span>2000+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-1">
                <ExternalLink className="h-4 w-4 text-blue-500" />
                <span>24hr Delivery Guaranteed</span>
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="bg-card/50 backdrop-blur rounded-xl p-6 mb-8 border border-border/40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Templates Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden border-border/40 bg-card/50 backdrop-blur hover:shadow-xl transition-all duration-500 hover:border-[#8B5CF6]/30 hover:-translate-y-2">
                  <div className="relative">
                    {template.isFeatured && (
                      <Badge className="absolute top-3 left-3 z-10 bg-[#8B5CF6] text-white">
                        Featured
                      </Badge>
                    )}
                    <div className="absolute top-3 right-3 z-10">
                      <Button size="icon" variant="secondary" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <img 
                      src={template.image} 
                      alt={template.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-[#8B5CF6] hover:bg-[#7C3AED]">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button size="sm" variant="secondary" className="flex-1">
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {template.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-[#8B5CF6] transition-colors">
                      {template.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                      {template.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{template.rating}</span>
                        <span>({template.reviews})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{template.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          <span>{template.downloads}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Price & CTA */}
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-[#8B5CF6]">${template.price}</span>
                        <div className="text-xs text-muted-foreground">{template.deliveryTime}</div>
                      </div>
                      <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
                        Select Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 border-[#8B5CF6]/20 bg-gradient-to-br from-[#8B5CF6]/5 to-[#A78BFA]/5">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-4">Don't See What You Need?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Our team can create a completely custom website tailored to your specific requirements. 
                  Get a personalized quote and timeline for your unique project.
                </p>
                <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
                  Request Custom Design
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Marketplace;
