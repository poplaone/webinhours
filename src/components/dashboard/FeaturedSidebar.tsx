import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, TrendingUp, Clock, Users, ArrowRight, Zap, Flame, Crown, Search, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export const FeaturedSidebar: React.FC = () => {
  // Example data, replace with real data as needed
  const featuredTemplates = [
    {
      id: '1',
      title: 'SaaSify Pro',
      category: 'SaaS',
      price: 199.99,
      rating: 4.9,
      downloads: 1250,
      image: '/placeholder.svg',
      isFeatured: true,
      isTrending: true
    },
    {
      id: '2',
      title: 'TechStore Elite',
      category: 'E-Commerce',
      price: 299.99,
      rating: 4.8,
      downloads: 890,
      image: '/placeholder.svg',
      isNew: true
    },
    {
      id: '3',
      title: 'CreativeStudio',
      category: 'Portfolio',
      price: 149.99,
      rating: 4.9,
      downloads: 2100,
      image: '/placeholder.svg',
      isTrending: true
    }
  ];

  const trendingSearches = [
    { term: 'AI-powered websites', count: 1250, growth: 45 },
    { term: 'Dark mode templates', count: 980, growth: 32 },
    { term: 'E-commerce stores', count: 756, growth: 28 },
    { term: 'Portfolio designs', count: 642, growth: 15 },
    { term: 'SaaS landing pages', count: 534, growth: 22 }
  ];

  const quickLinks = [
    {
      title: 'Free Templates',
      description: 'High-quality free options',
      icon: <Zap className="w-4 h-4" />,
      href: '/templates?filter=free',
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Premium Collection',
      description: 'Best selling templates',
      icon: <Crown className="w-4 h-4" />,
      href: '/templates?filter=premium',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      title: 'New Arrivals',
      description: 'Latest additions',
      icon: <Flame className="w-4 h-4" />,
      href: '/templates?filter=new',
      color: 'from-red-500 to-pink-600'
    },
    {
      title: 'Custom Development',
      description: 'Tailored solutions',
      icon: <Users className="w-4 h-4" />,
      href: '/custom-development',
      color: 'from-blue-500 to-purple-600'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full"
    >
      <div className="flex flex-col items-center space-y-6 pb-6">
        {/* Featured Templates */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-transparent border-0 shadow-none rounded-2xl w-full max-w-[340px]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg text-primary">
                <Crown className="w-5 h-5 mr-2 text-primary" />
                Featured Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {featuredTemplates.map((template, index) => (
                <motion.div key={template.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * index }} className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/5 cursor-pointer group transition-colors">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{template.title.charAt(0)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm group-hover:text-primary transition-colors font-medium">{template.title}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-muted-foreground">{template.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs px-2 py-0 h-5 bg-primary/10 text-primary">${template.price}</Badge>
                    <span className="text-xs text-muted-foreground">{template.downloads}</span>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Trending Searches */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-transparent border-0 shadow-none rounded-2xl w-full max-w-[340px]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg text-primary">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Trending Searches
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {trendingSearches.map((search, index) => (
                <motion.div key={search.term} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * index }} className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/5 cursor-pointer group transition-colors">
                  <div className="flex items-center space-x-2">
                    <Search className="w-3 h-3 text-primary" />
                    <span className="text-sm group-hover:text-primary transition-colors">{search.term}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs px-2 py-0 h-5 bg-primary/10 text-primary">+{search.growth}%</Badge>
                    <span className="text-xs text-muted-foreground">{search.count}</span>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Links */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-transparent border-0 shadow-none rounded-2xl w-full max-w-[340px]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg text-primary">
                <Zap className="w-5 h-5 mr-2 text-primary" />
                Quick Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.div key={link.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }}>
                  <Button variant="ghost" className="w-full justify-start p-3 h-auto hover:bg-primary/5 group text-primary">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r from-primary/10 to-purple-500/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform`}>
                      {link.icon}
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-sm">{link.title}</p>
                      <p className="text-xs text-muted-foreground">{link.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};
