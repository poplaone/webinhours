import { blogPosts } from '@/data/blog-posts';

// Utility to generate sitemap data
export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemapUrls = (): SitemapUrl[] => {
  const baseUrl = 'https://webinhours.com';
  const currentDate = new Date().toISOString().split('T')[0];

  const staticUrls: SitemapUrl[] = [
    { loc: `${baseUrl}/`, lastmod: currentDate, changefreq: 'daily', priority: 1.0 },
    { loc: `${baseUrl}/about`, lastmod: currentDate, changefreq: 'monthly', priority: 0.8 },
    { loc: `${baseUrl}/how-it-works`, lastmod: currentDate, changefreq: 'monthly', priority: 0.8 },
    { loc: `${baseUrl}/pricing`, lastmod: currentDate, changefreq: 'weekly', priority: 0.9 },
    { loc: `${baseUrl}/faq`, lastmod: currentDate, changefreq: 'monthly', priority: 0.7 },
    { loc: `${baseUrl}/contact`, lastmod: currentDate, changefreq: 'monthly', priority: 0.6 },
    { loc: `${baseUrl}/websites`, lastmod: currentDate, changefreq: 'daily', priority: 0.9 },
    { loc: `${baseUrl}/blog`, lastmod: currentDate, changefreq: 'daily', priority: 0.8 },
    { loc: `${baseUrl}/terms`, lastmod: currentDate, changefreq: 'yearly', priority: 0.3 },
    { loc: `${baseUrl}/privacy`, lastmod: currentDate, changefreq: 'yearly', priority: 0.3 },
  ];

  // Dynamically add blog post URLs
  const blogUrls: SitemapUrl[] = blogPosts.map(post => ({
    loc: `${baseUrl}/blog/${post.slug}`,
    lastmod: currentDate,
    changefreq: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticUrls, ...blogUrls];
};

export const generateSitemapXML = (urls: SitemapUrl[]): string => {
  const urlElements = urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
};

// Function to generate sitemap (XML is now in public/sitemap.xml)
export const generateSitemap = () => {
  const urls = generateSitemapUrls();
  const sitemapXML = generateSitemapXML(urls);
  return sitemapXML;
};
