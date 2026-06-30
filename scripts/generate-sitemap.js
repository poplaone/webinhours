import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SITE_URL, getAllRoutes } from './routes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const generateSitemap = () => {
    const allRoutes = getAllRoutes();
    const today = new Date().toISOString().split('T')[0];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
            .map((route) => {
                return `
  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route === '' || route === '/blog' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '' ? '1.0' : route.startsWith('/blog/') ? '0.7' : '0.8'}</priority>
  </url>`;
            })
            .join('')}
</urlset>`;

    // Write to public/ (source) and, when present, dist/ (deployed output) so the
    // live sitemap always reflects the current route list.
    const targets = [path.join(__dirname, '../public')];
    const distDir = path.join(__dirname, '../dist');
    if (fs.existsSync(distDir)) targets.push(distDir);

    for (const dir of targets) {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'sitemap.xml'), sitemap);
        console.log(`✅ Sitemap (${allRoutes.length} urls) written to ${path.relative(path.join(__dirname, '..'), dir)}/sitemap.xml`);
    }
};

generateSitemap();
