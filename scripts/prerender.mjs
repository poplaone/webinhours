import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllRoutes } from './routes.mjs';

/**
 * Real-browser prerender.
 *
 * Why a browser (Playwright) instead of Node SSG: this app uses GSAP, tsparticles,
 * a parallax hero, a service worker and analytics that touch `window`/`document` at
 * module load. Rendering in Node would crash; rendering in a real browser does not.
 *
 * What it does: serves the built `dist/` over http, visits every public route, lets
 * React + react-helmet-async fully render, then writes the resulting HTML to
 * dist/<route>/index.html. Crawlers (Googlebot AND JS-blind AI bots like GPTBot /
 * ClaudeBot / PerplexityBot) then receive real content + per-page meta instead of an
 * empty <div id="root">.
 *
 * It is intentionally NON-FATAL: if Chromium can't launch (e.g. missing libs in a CI
 * image), it logs a warning and exits 0 so the site still deploys as a normal SPA.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, '../dist');
const PORT = 4178;

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
};

function createServer(shell) {
  return http.createServer((req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      const filePath = path.join(DIST, urlPath);
      // Serve real static assets straight from disk.
      if (filePath.startsWith(DIST) && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        fs.createReadStream(filePath).pipe(res);
        return;
      }
      // SPA fallback — always the ORIGINAL empty shell (held in memory) so that
      // overwriting dist/index.html mid-run never poisons later routes.
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(shell);
    } catch {
      res.writeHead(500);
      res.end('prerender server error');
    }
  });
}

async function main() {
  const shellPath = path.join(DIST, 'index.html');
  if (!fs.existsSync(shellPath)) {
    console.warn('[prerender] dist/index.html not found — run `vite build` first. Skipping.');
    return;
  }
  const shell = fs.readFileSync(shellPath, 'utf8');

  // Import Playwright lazily so a missing/broken install degrades gracefully.
  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch (e) {
    console.warn('[prerender] Playwright not available — skipping prerender (deploys as SPA).');
    console.warn('[prerender] ' + e.message);
    return;
  }

  const routes = getAllRoutes();
  const server = createServer(shell);
  await new Promise((resolve) => server.listen(PORT, resolve));

  let browser;
  try {
    browser = await chromium.launch();
  } catch (e) {
    console.warn('[prerender] Could not launch Chromium — skipping prerender (deploys as SPA).');
    console.warn('[prerender] Hint: run `npx playwright install chromium`.');
    console.warn('[prerender] ' + e.message);
    server.close();
    return;
  }

  const page = await browser.newPage();
  let ok = 0;
  for (const route of routes) {
    const url = `http://localhost:${PORT}${route || '/'}`;
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      // Wait for the app to actually mount real content.
      await page.waitForSelector('#main-content', { timeout: 15000 }).catch(() => {});
      await page
        .waitForFunction(
          () => {
            const root = document.getElementById('root');
            return root && root.children.length > 0;
          },
          { timeout: 15000 }
        )
        .catch(() => {});

      const html = '<!DOCTYPE html>\n' + (await page.evaluate(() => document.documentElement.outerHTML));
      const outDir = route === '' ? DIST : path.join(DIST, route);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, 'index.html'), html);
      ok++;
      console.log(`[prerender] ✓ ${route || '/'}`);
    } catch (e) {
      console.warn(`[prerender] ✗ ${route || '/'} — ${e.message}`);
    }
  }

  await browser.close();
  server.close();
  console.log(`[prerender] Done: ${ok}/${routes.length} routes prerendered into dist/.`);
}

// Never fail the build because of prerendering.
main().catch((e) => {
  console.warn('[prerender] Skipped due to error:', e.message);
  process.exit(0);
});
