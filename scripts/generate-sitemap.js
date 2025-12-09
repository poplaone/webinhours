import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import blog posts data
// Since this is a Node script running in ESM, we might need to adjust how we import the TS file data
// or just duplicate the slugs here for simplicity if TS import is complex without build step.
// For robustness in this environment, I'll extract slugs from value or use a hardcoded list for now, 
// ensuring to note that this should be dynamic in a full CI/CD pipeline.
const blogSlugs = [
    "future-of-24-hour-web-deployment",
    "roi-of-premium-digital-assets",
    "geo-vs-seo-optimizing-for-ai"
];

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
