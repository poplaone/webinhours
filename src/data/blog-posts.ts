export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    category: string;
    readTime: string;
    image: string;
}

import blogPostsData from './blog-posts.json';

export const blogPosts: BlogPost[] = blogPostsData;
