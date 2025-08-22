// Service Worker for aggressive caching and lightning-fast performance
const CACHE_NAME = 'webinhours-v1';
const STATIC_CACHE = 'webinhours-static-v1';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/index.html',
  '/manifest.json',
  // Add critical CSS and JS files here when available
];

// API endpoints to cache with network-first strategy
const API_CACHE_PATTERNS = [
  /^https:\/\/dcsnxieqnpcjqqiajtvh\.supabase\.co\/rest\/v1\//,
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
              return cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE;
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
    // Static assets: Cache First strategy
    event.respondWith(cacheFirst(request));
  } else if (isAPIRequest(url)) {
    // API requests: Network First strategy
    event.respondWith(networkFirst(request));
  } else if (isPageRequest(url)) {
    // Pages: Stale While Revalidate strategy
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Helper functions
function isStaticAsset(url) {
  return /\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/i.test(url);
}

function isAPIRequest(url) {
  return API_CACHE_PATTERNS.some(pattern => pattern.test(url));
}

function isPageRequest(url) {
  return !isStaticAsset(url) && !isAPIRequest(url);
}

// Caching strategies
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Return fallback for offline scenarios
    return new Response('Offline', { status: 408 });
  }
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Offline', { status: 408 });
  }
}

async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  
  // Background fetch to update cache
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      const cache = caches.open(CACHE_NAME);
      cache.then(c => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  });

  // Return cached version immediately, or wait for network
  return cachedResponse || fetchPromise;
}