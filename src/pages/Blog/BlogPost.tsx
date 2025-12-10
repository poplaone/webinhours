import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import { blogPosts } from '@/data/blog-posts';
import ReactMarkdown from 'react-markdown';

export default function BlogPost() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = blogPosts.find(p => p.slug === slug);

    useEffect(() => {
        if (!post) {
            // In a real app, you might show a 404
            // navigate('/blog'); 
        } else {
            window.scrollTo(0, 0);
        }
    }, [post, navigate]);

    if (!post) {
        return (
            <AppLayout>
                <div className="pt-32 text-center">
                    <h1 className="text-2xl font-bold">Article not found</h1>
                    <Button onClick={() => navigate('/blog')} className="mt-4">Back to Blog</Button>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <SEOHead
                title={`${post.title} - WebInHour Blog`}
                description={post.excerpt}
                keywords={`${post.category}, web development, digital assets, ${post.title.toLowerCase()}`}
                ogType="article"
            />

            <div className="pt-24 pb-20 px-4">
                <article className="container mx-auto max-w-3xl">

                    {/* Navigation */}
                    <Button
                        variant="ghost"
                        className="mb-8 hover:bg-transparent pl-0 hover:text-purple-600 transition-colors"
                        onClick={() => navigate('/blog')}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Insights
                    </Button>

                    {/* Header */}
                    <div className="mb-12">
                        <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200 border-none">{post.category}</Badge>
                        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-y border-border/50 py-4">
                            <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-purple-600" />
                                <span className="font-medium text-foreground">{post.author}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                        {/* 
               We use simple newline replacement for 'markdown' for this demo.
               In a real implementation with 'react-markdown', we would just pass children={post.content}
            */}
                        <div className="whitespace-pre-line leading-relaxed">
                            {post.content.split('\n').map((line, i) => {
                                if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold mt-12 mb-6">{line.replace('# ', '')}</h1>;
                                if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-10 mb-5 text-gray-800">{line.replace('## ', '')}</h2>;
                                if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-8 mb-4 text-gray-800">{line.replace('### ', '')}</h3>;
                                if (line.startsWith('* ')) return <li key={i} className="ml-4 list-disc mb-2">{line.replace('* ', '')}</li>;
                                if (line.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-purple-500 pl-4 italic text-gray-600 my-8 py-2 bg-gray-50 rounded-r-lg">{line.replace('> ', '')}</blockquote>;
                                if (line.match(/^\d\./)) return <li key={i} className="ml-4 list-decimal mb-2">{line.substring(2)}</li>;

                                // Highlight bold text
                                const parts = line.split(/(\*\*.*?\*\*)/g);
                                return (
                                    <p key={i} className="mb-4 text-gray-700">
                                        {parts.map((part, index) => {
                                            if (part.startsWith('**') && part.endsWith('**')) {
                                                return <strong key={index} className="text-black font-semibold">{part.slice(2, -2)}</strong>;
                                            }
                                            return part;
                                        })}
                                    </p>
                                );
                            })}
                        </div>
                    </div>

                    <Separator className="my-12" />

                    {/* Related Posts - Internal Linking */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 text-foreground">Related Articles</h2>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {blogPosts
                                .filter(p => p.slug !== slug)
                                .slice(0, 3)
                                .map(relatedPost => (
                                    <button
                                        key={relatedPost.id}
                                        onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                                        className="text-left p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-muted/50 transition-all group"
                                    >
                                        <Badge variant="secondary" className="mb-2 text-xs">
                                            {relatedPost.category}
                                        </Badge>
                                        <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                            {relatedPost.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                            {relatedPost.excerpt}
                                        </p>
                                        <span className="text-xs text-primary mt-2 inline-block group-hover:underline">
                                            Read more →
                                        </span>
                                    </button>
                                ))}
                        </div>
                    </div>

                    {/* More from this category */}
                    {blogPosts.filter(p => p.category === post.category && p.slug !== slug).length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-xl font-bold mb-4 text-foreground">More in {post.category}</h2>
                            <div className="space-y-3">
                                {blogPosts
                                    .filter(p => p.category === post.category && p.slug !== slug)
                                    .slice(0, 2)
                                    .map(categoryPost => (
                                        <button
                                            key={categoryPost.id}
                                            onClick={() => navigate(`/blog/${categoryPost.slug}`)}
                                            className="w-full text-left flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                                        >
                                            <div className="flex-1">
                                                <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                                                    {categoryPost.title}
                                                </h3>
                                                <span className="text-xs text-muted-foreground">{categoryPost.readTime}</span>
                                            </div>
                                            <ArrowLeft className="h-4 w-4 rotate-180 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </button>
                                    ))}
                            </div>
                        </div>
                    )}

                    <Separator className="my-8" />

                    {/* Share / CTA */}
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
                        <h3 className="text-xl font-bold mb-2">Ready to implement this?</h3>
                        <p className="text-muted-foreground mb-6">Launch your high-performance website in 24 hours or acquire verified digital assets today.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button onClick={() => navigate('/contact')} className="bg-primary hover:bg-primary/90">
                                Start Project
                            </Button>
                            <Button variant="outline" onClick={() => navigate('/websites')}>
                                Browse Templates
                            </Button>
                        </div>
                    </div>

                    {/* Browse all posts link */}
                    <div className="mt-8 text-center">
                        <Button
                            variant="link"
                            onClick={() => navigate('/blog')}
                            className="text-primary hover:text-primary/80"
                        >
                            ← View all articles
                        </Button>
                    </div>

                </article>
            </div>
        </AppLayout>
    );
}
