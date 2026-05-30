// src/service-worker.js
// Custom service worker for PWA with offline support for images, styles, JS, and font awesome icons

const CACHE_NAME = "ledgerely-pwa-cache-v1";
const OFFLINE_URL = "/index.html";

// List of file extensions to cache
const FILE_EXTENSIONS = [".js", ".css", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".ico", ".woff", ".woff2", ".ttf", ".eot", ".otf", ".json"];

// Font Awesome CDN pattern
const FONT_AWESOME_CDN = /use\.fontawesome\.com|cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome/;

// On install, cache all static assets and offline fallback
self.addEventListener("install", event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // Cache offline fallback and root
      await cache.addAll([OFFLINE_URL, "/", "/index.html", "/manifest.json", "/favIcon/greenIconNoBackground.png"]);
      // Optionally cache FontAwesome CDN
      await cache.add("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");
    })(),
  );
  self.skipWaiting();
});

// On activate, clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name)));
    }),
  );
  self.clients.claim();
});

// Improved fetch handler for SPA offline support
self.addEventListener("fetch", event => {
  const { request } = event;
  console.log("Fetch event for:", request);
  const url = request.url;
  // Handle navigation requests (SPA routing, including subpaths)
  if (
    request.mode === "navigate" ||
    (request.method === "GET" && request.headers.get("accept") && request.headers.get("accept").includes("text/html"))
  ) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // If we get a valid response, return it
          return response;
        })
        .catch(() => {
          // If offline, return cached offline page
          return caches.match(OFFLINE_URL);
        }),
    );
    return;
  }

  // Cache-first for static assets
  if (FILE_EXTENSIONS.some(ext => url.endsWith(ext)) || FONT_AWESOME_CDN.test(url)) {
    event.respondWith(
      caches.match(request).then(response => {
        return (
          response ||
          fetch(request).then(res => {
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(request, res.clone());
              return res;
            });
          })
        );
      }),
    );
  }
});
