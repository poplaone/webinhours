// Service Worker for aggressive caching and lightning-fast performance
// IMPORTANT: Bump this version whenever you deploy critical fixes
const CACHE_VERSION = 'v5'; // Force cache refresh for all users
const CACHE_NAME = `webinhours-${CACHE_VERSION}`;
const STATIC_CACHE = `webinhours-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `webinhours-runtime-${CACHE_VERSION}`;

// Cache expiration times (in milliseconds)
const CACHE_MAX_AGE = {
  static: 365 * 24 * 60 * 60 * 1000, // 1 year for static assets with hash
  runtime: 7 * 24 * 60 * 60 * 1000,   // 1 week for runtime cache
  api: 5 * 60 * 1000,                  // 5 minutes for API responses
};

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/index.html',
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName.startsWith('webinhours-') && 
                     cacheName !== CACHE_NAME && 
                     cacheName !== STATIC_CACHE &&
                     cacheName !== RUNTIME_CACHE;
            })
            .map((cacheName) => {
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const { method, url } = request;

  // Only handle GET requests
  if (method !== 'GET') return;

  // Handle different types of requests with appropriate strategies
  if (isStaticAsset(url)) {
    // Static assets with hash: Cache First with long expiration
    event.respondWith(cacheFirstWithExpiration(request, STATIC_CACHE, CACHE_MAX_AGE.static));
  } else if (isAPIRequest(url)) {
    // API requests: Network First with short cache
    event.respondWith(networkFirstWithExpiration(request, RUNTIME_CACHE, CACHE_MAX_AGE.api));
  } else if (isPageRequest(url)) {
    // Pages: Network First with fallback
    event.respondWith(networkFirstWithExpiration(request, RUNTIME_CACHE, CACHE_MAX_AGE.runtime));
  }
});

// Helper functions
function isStaticAsset(url) {
  // Match hashed assets from Vite build and fonts
  return /\/(assets|fonts)\/.*\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico|webp)(\?.*)?$/i.test(url) ||
         /\.(woff2|woff)(\?.*)?$/i.test(url);
}

function isAPIRequest(url) {
  return url.includes('.supabase.co') || 
         url.includes('/api/') ||
         url.includes('/rest/v1/');
}

function isPageRequest(url) {
  return !isStaticAsset(url) && !isAPIRequest(url);
}

// Enhanced caching strategies with expiration
async function cacheFirstWithExpiration(request, cacheName, maxAge) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Check if cached response is still valid
  if (cachedResponse) {
    const cachedTime = new Date(cachedResponse.headers.get('sw-cache-time'));
    const now = new Date();
    
    if (cachedTime && (now - cachedTime) < maxAge) {
      return cachedResponse;
    }
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Clone and add cache timestamp
      const responseToCache = networkResponse.clone();
      const headers = new Headers(responseToCache.headers);
      headers.append('sw-cache-time', new Date().toISOString());
      
      const modifiedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers
      });
      
      cache.put(request, modifiedResponse);
    }
    return networkResponse;
  } catch (error) {
    // Return stale cache if network fails
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Offline', { status: 408 });
  }
}

async function networkFirstWithExpiration(request, cacheName, maxAge) {
  const cache = await caches.open(cacheName);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Clone and add cache timestamp
      const responseToCache = networkResponse.clone();
      const headers = new Headers(responseToCache.headers);
      headers.append('sw-cache-time', new Date().toISOString());
      
      const modifiedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers
      });
      
      cache.put(request, modifiedResponse);
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    
    // Check if cached response is still valid
    if (cachedResponse) {
      const cachedTime = new Date(cachedResponse.headers.get('sw-cache-time'));
      const now = new Date();
      
      if (!cachedTime || (now - cachedTime) < maxAge) {
        return cachedResponse;
      }
    }
    
    return cachedResponse || new Response('Offline', { status: 408 });
  }
}