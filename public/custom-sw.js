// public/custom-sw.js
self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Precache manifest will be injected here
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);
