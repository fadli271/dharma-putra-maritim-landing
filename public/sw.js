/**
 * Service Worker for Dharma Putra Maritime
 * Provides offline support, caching, and PWA features
 * Version: 1.0.0
 */

const CACHE_NAME = 'dharma-putra-maritime-v1.0.0';
const RUNTIME_CACHE = 'dharma-putra-maritime-runtime-v1.0.0';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/manifest.json',
  // CSS
  '/assets/main.css',
  // JS
  '/src/index.js',
  // Images
  '/assets/images/favicon.svg',
  '/assets/images/logo.png',
  // External fonts (if cached locally)
  // '/assets/fonts/inter.woff2',
  // '/assets/fonts/playfair.woff2',
];

// URLs to skip from caching
const EXCLUDED_URLS = [
  '/api/',
  '/admin/',
  '/config.json',
  '/.env',
  '/sw.js',
];

// URL patterns to cache differently
const CACHE_PATTERNS = {
  // Static assets that rarely change
  static: /\.(png|jpg|jpeg|gif|webp|svg|ico|woff2|woff|ttf|eot)$/i,
  // HTML pages that can be stale-while-revalidate
  html: /\.html$/i,
  // API requests that should be network-first
  api: /\/api\//i,
  // External CDN resources
  external: /https:\/\/(fonts\.googleapis\.com|cdnjs\.cloudflare\.com)/i,
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');

  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        console.log('[SW] Caching static assets:', STATIC_ASSETS.length);
        await cache.addAll(STATIC_ASSETS);
        console.log('[SW] Static assets cached successfully');

        // Force the waiting service worker to become the active service worker
        await self.skipWaiting();
      } catch (error) {
        console.error('[SW] Install failed:', error);
      }
    })()
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');

  event.waitUntil(
    (async () => {
      try {
        // Get all cache names
        const cacheNames = await caches.keys();

        // Delete old caches
        await Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE)
            .map((cacheName) => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );

        // Take control of all pages immediately
        await self.clients.claim();
        console.log('[SW] Service worker activated and claimed clients');
      } catch (error) {
        console.error('[SW] Activation failed:', error);
      }
    })()
  );
});

// Fetch event - handle requests with caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip excluded URLs
  if (EXCLUDED_URLS.some(pattern => url.pathname.startsWith(pattern))) {
    return;
  }

  // Skip chrome extensions
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  event.respondWith(handleRequest(request, url));
});

/**
 * Handle incoming requests with appropriate caching strategy
 */
async function handleRequest(request, url) {
  // Strategy 1: API requests - Network First
  if (CACHE_PATTERNS.api.test(url.pathname)) {
    return networkFirst(request, RUNTIME_CACHE);
  }

  // Strategy 2: Static assets - Cache First
  if (CACHE_PATTERNS.static.test(url.pathname)) {
    return cacheFirst(request, CACHE_NAME);
  }

  // Strategy 3: HTML pages - Stale While Revalidate
  if (CACHE_PATTERNS.html.test(url.pathname) || url.pathname === '/') {
    return staleWhileRevalidate(request, RUNTIME_CACHE);
  }

  // Strategy 4: External resources - Cache First with network fallback
  if (CACHE_PATTERNS.external.test(url.href)) {
    return cacheFirst(request, RUNTIME_CACHE);
  }

  // Default: Network First for everything else
  return networkFirst(request, RUNTIME_CACHE);
}

/**
 * Cache First Strategy
 * Serves from cache if available, otherwise fetches from network
 */
async function cacheFirst(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      console.log('[SW] Cache hit:', request.url);
      return cachedResponse;
    }

    console.log('[SW] Cache miss, fetching:', request.url);
    const networkResponse = await fetch(request);

    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache First error:', error);
    throw error;
  }
}

/**
 * Network First Strategy
 * Tries network first, falls back to cache
 */
async function networkFirst(request, cacheName) {
  try {
    console.log('[SW] Network first, fetching:', request.url);
    const networkResponse = await fetch(request);

    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline fallback for HTML pages
    if (request.headers.get('accept').includes('text/html')) {
      return caches.match('/offline.html') || new Response('Offline - No network connection', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: new Headers({
          'Content-Type': 'text/plain',
        }),
      });
    }

    throw error;
  }
}

/**
 * Stale While Revalidate Strategy
 * Serves from cache immediately, then updates in background
 */
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  // Fetch in background to update cache
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });

  // Return cached response immediately or wait for network
  return cachedResponse || fetchPromise;
}

/**
 * Background Sync for offline form submissions
 */
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);

  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

/**
 * Sync contact form submissions
 */
async function syncContactForm() {
  try {
    // Get pending submissions from IndexedDB
    const pendingSubmissions = await getPendingSubmissions();

    for (const submission of pendingSubmissions) {
      try {
        // Try to send the submission
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submission.data),
        });

        if (response.ok) {
          // Remove successfully synced submission
          await removePendingSubmission(submission.id);
        }
      } catch (error) {
        console.error('[SW] Failed to sync submission:', error);
      }
    }
  } catch (error) {
    console.error('[SW] Background sync failed:', error);
  }
}

/**
 * Handle push notifications (optional)
 */
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');

  const options = {
    body: event.data ? event.data.text() : 'New notification from Dharma Putra Maritime',
    icon: '/assets/images/favicon.svg',
    badge: '/assets/images/badge-icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/assets/images/explore-icon.png',
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/assets/images/close-icon.png',
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification('Dharma Putra Maritime', options)
  );
});

/**
 * Handle notification clicks
 */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

/**
 * IndexedDB helpers for offline form submissions
 */
async function getPendingSubmissions() {
  // Implement IndexedDB operations
  return [];
}

async function removePendingSubmission(id) {
  // Implement IndexedDB operations
  return;
}

/**
 * Periodic cache cleanup
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );
    }));
  }
});

/**
 * Handle clients claiming
 */
self.addEventListener('controllerchange', () => {
  console.log('[SW] New controller claimed');
  // Reload the page to load new assets
  window.location.reload();
});

// Log service worker state
console.log('[SW] Service worker loaded successfully');
