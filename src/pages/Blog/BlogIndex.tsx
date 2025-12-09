import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blog-posts';

export default function BlogIndex() {
    const navigate = useNavigate();

    return (
        <AppLayout>
            <SEOHead
                title="Blog - WebInHour | Industry Insights & News"
                description="Latest insights on web development, digital assets, and Generative Engine Optimization (GEO). Stay ahead of the curve."
                keywords="web development blog, digital asset news, SEO tips, GEO optimization, tech insights"
            />

            <div className="pt-24 pb-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <Badge variant="secondary" className="mb-4">Ecosystem Intelligence</Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Insights & Updates
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Deep dives into the future of digital deployment, asset value, and the AI search revolution.
                        </p>
                    </div>

                    {/* Blog Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <Card
                                key={post.id}
                                className="bg-white/5 backdrop-blur-md border border-border/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group flex flex-col h-full"
                                onClick={() => navigate(`/blog/${post.slug}`)}
                            >
                                {/* Image Placeholder - In real app, use actual images */}
                                <div className="h-48 bg-gradient-to-br from-purple-900/20 to-blue-900/20 w-full rounded-t-xl relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                    <Badge className="absolute top-4 right-4 bg-background/80 backdrop-blur-md text-foreground">
                                        {post.category}
                                    </Badge>
                                </div>

                                <CardContent className="p-6 flex-grow flex flex-col">
                                    <div className="flex items-center text-sm text-gray-500 mb-4 gap-4">
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-1" />
                                            {post.readTime}
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text group-hover:text-purple-600 transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/20">
                                        <div className="flex items-center text-sm font-medium text-foreground">
                                            <User className="h-4 w-4 mr-2 text-purple-600" />
                                            {post.author}
                                        </div>
                                        <span className="text-purple-600 text-sm font-semibold group-hover:translate-x-1 transition-transform flex items-center">
                                            Read Article <ArrowRight className="h-4 w-4 ml-1" />
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
