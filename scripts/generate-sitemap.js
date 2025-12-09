import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read blog posts from shared JSON source
const blogPostsPath = path.join(__dirname, '../src/data/blog-posts.json');
let blogSlugs = [];

try {
    const blogData = fs.readFileSync(blogPostsPath, 'utf8');
    const posts = JSON.parse(blogData);
    blogSlugs = posts.map(post => post.slug);
    console.log(`Found ${blogSlugs.length} blog posts to index.`);
} catch (error) {
    console.error('Error reading blog posts:', error);
    // Fallback to empty if file missing
}

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
