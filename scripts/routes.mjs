import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Single source of truth for the public, crawlable routes.
// Used by both generate-sitemap.js and prerender.mjs so they never drift apart.
export const SITE_URL = 'https://webinhour.com';

export const STATIC_ROUTES = [
  '',
  '/about',
  '/services',
  '/contact',
  '/faq',
  '/how-it-works',
  '/pricing',
  '/privacy',
  '/terms',
  '/websites',
  '/calculator',
  '/blog',
  '/24-hour-website',
  '/same-day-delivery',
];

export function getBlogSlugs() {
  try {
    const p = path.join(__dirname, '../src/data/blog-posts.json');
    const posts = JSON.parse(fs.readFileSync(p, 'utf8'));
    return posts.map((post) => post.slug);
  } catch (error) {
    console.error('[routes] Error reading blog posts:', error.message);
    return [];
  }
}

export function getAllRoutes() {
  return [...STATIC_ROUTES, ...getBlogSlugs().map((slug) => `/blog/${slug}`)];
}
