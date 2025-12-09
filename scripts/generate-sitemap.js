import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamically extract blog slugs from blog-posts.ts
const extractBlogSlugs = () => {
    const blogPostsPath = path.join(__dirname, '../src/data/blog-posts.ts');
    const content = fs.readFileSync(blogPostsPath, 'utf-8');
    
    // Extract all slug values using regex
    const slugRegex = /slug:\s*["']([^"']+)["']/g;
    const slugs = [];
    let match;
    
    while ((match = slugRegex.exec(content)) !== null) {
        slugs.push(match[1]);
    }
    
    return slugs;
};

const baseUrl = 'https://webinhours.com';

const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/faq',
    '/how-it-works',
    '/pricing',
    '/privacy',
    '/terms',
    '/websites',
    '/calculator',
    '/blog'
];

const generateSitemap = () => {
    const blogSlugs = extractBlogSlugs();
    console.log(`📝 Found ${blogSlugs.length} blog posts: ${blogSlugs.join(', ')}`);
    
    const allRoutes = [
        ...staticRoutes,
        ...blogSlugs.map(slug => `/blog/${slug}`)
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
            .map(route => {
                return `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '' || route === '/blog' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '' ? '1.0' : route.startsWith('/blog/') ? '0.7' : '0.8'}</priority>
  </url>`;
            })
            .join('')}
</urlset>`;

    const publicDir = path.join(__dirname, '../public');

    // Ensure public dir exists
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap generated successfully at public/sitemap.xml');
};

generateSitemap();
