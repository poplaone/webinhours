import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
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
      className="h-[calc(100vh-4rem)] sticky top-[9.5rem] mt-4 px-4 z-10"
    >
      <ScrollArea className="h-full pr-2">
        <div className="flex flex-col items-center space-y-6">
          {/* Featured Templates */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-0 bg-white/90 shadow-md rounded-2xl w-full max-w-[340px]">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg text-[#6c63ff]">
                  <Crown className="w-5 h-5 mr-2 text-[#6c63ff]" />
                  Featured Templates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {featuredTemplates.map((template, index) => (
                  <motion.div key={template.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#ececff] cursor-pointer group transition-colors">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#6c63ff] to-[#8b7fff] rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{template.title.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1">
                        <p className="font-medium text-sm truncate">{template.title}</p>
                        {template.isFeatured && <Crown className="w-3 h-3 text-yellow-500" />}
                        {template.isTrending && <TrendingUp className="w-3 h-3 text-green-500" />}
                        {template.isNew && <Flame className="w-3 h-3 text-red-500" />}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs px-1 py-0 h-4 bg-[#e0e0ff] text-[#6c63ff]">{template.category}</Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">{template.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#6c63ff]">${template.price}</p>
                      <p className="text-xs text-gray-400">{template.downloads} downloads</p>
                    </div>
                  </motion.div>
                ))}
                <Button variant="outline" className="w-full mt-3 text-sm h-8 border-[#6c63ff] text-[#6c63ff]">
                  View All Featured
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trending Searches */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-0 bg-white/90 shadow-md rounded-2xl w-full max-w-[340px]">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg text-[#6c63ff]">
                  <TrendingUp className="w-5 h-5 mr-2 text-[#6c63ff]" />
                  Trending Searches
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {trendingSearches.map((search, index) => (
                  <motion.div key={search.term} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * index }} className="flex items-center justify-between p-2 rounded-lg hover:bg-[#ececff] cursor-pointer group transition-colors">
                    <div className="flex items-center space-x-2">
                      <Search className="w-3 h-3 text-[#6c63ff]" />
                      <span className="text-sm group-hover:text-[#6c63ff] transition-colors">{search.term}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs px-2 py-0 h-5 bg-[#e0e0ff] text-[#6c63ff]">+{search.growth}%</Badge>
                      <span className="text-xs text-gray-400">{search.count}</span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card className="border-0 bg-white/90 shadow-md rounded-2xl w-full max-w-[340px]">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg text-[#6c63ff]">
                  <Zap className="w-5 h-5 mr-2 text-[#6c63ff]" />
                  Quick Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.div key={link.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }}>
                    <Button variant="ghost" className="w-full justify-start p-3 h-auto hover:bg-[#ececff] group text-[#6c63ff]">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r from-[#e0e0ff] to-[#c3c3ff] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform`}>
                        {link.icon}
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-sm">{link.title}</p>
                        <p className="text-xs text-gray-500">{link.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </ScrollArea>
    </motion.div>
  );
};
