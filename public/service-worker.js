// This script will cache all JS, CSS, and asset files referenced in index.html for offline use.
// It will also cache all chunk files dynamically loaded by React.lazy/Suspense.

const CACHE_NAME = "ledgerely-pwa-cache-v2";
const OFFLINE_URL = "/index.html";

const FILE_EXTENSIONS = [".js", ".css", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".ico", ".woff", ".woff2", ".ttf", ".eot", ".otf", ".json"];

const FONT_AWESOME_CDN = /use\.fontawesome\.com|cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome/;

// Helper to fetch and cache all scripts/styles from index.html
async function cacheAssetsFromIndex(cache) {
  try {
    const response = await fetch(OFFLINE_URL);
    const text = await response.text();
    const assetUrls = [];
    // Find all src/href attributes for JS/CSS
    text.replace(/(?:src|href)="([^"]+\.(?:js|css))"/g, (m, p1) => {
      if (!assetUrls.includes(p1)) assetUrls.push(p1);
    });
    // Add images from known folders
    const imageAssets = [
      "/src/images/ban.svg",
      "/src/images/spinner-1.svg",
      "/src/images/charts/BoxPlotChart.svg",
      "/src/images/charts/CircleShape.svg",
      "/src/images/charts/CircularBarChart.svg",
      "/src/images/charts/CylinderShape.svg",
      "/src/images/charts/DensityChart.svg",
      "/src/images/charts/DiamondShape.svg",
      "/src/images/charts/DirectionArrowShape.svg",
      "/src/images/charts/DivergingChart.svg",
      "/src/images/charts/DonutChart.svg",
      "/src/images/charts/DoubleArrowShape.svg",
      "/src/images/charts/HorizontalArrowShape.svg",
      "/src/images/charts/HorizontalBarChart.svg",
      "/src/images/charts/LineChart.svg",
      "/src/images/charts/LineShape.svg",
      "/src/images/charts/PannableChart.svg",
      "/src/images/charts/ParllelogramShape.svg",
      "/src/images/charts/PieChart.svg",
      "/src/images/charts/ScatterPlotChart.svg",
      "/src/images/charts/SmileyEmoji.svg",
      "/src/images/charts/SquareShape.svg",
      "/src/images/charts/StackedVerticalChart.svg",
      "/src/images/charts/TableEERDiagram.png",
      "/src/images/charts/TriangleShape.svg",
      "/src/images/charts/Tshape.svg",
      "/src/images/charts/VerticalBarChart.svg",
      "/src/images/charts/VoronoiChart.svg",
      "/src/images/charts/WordCloudChart.svg",
      "/src/images/charts/ZoomableCirclePacking.svg",
      "/src/images/charts/table.svg",
    ];
    // Add font files
    const fontAssets = [
      "/src/fonts/Abel-Regular.ttf",
      "/src/fonts/FontAwesome.otf",
      "/src/fonts/fontawesome-webfont.eot",
      "/src/fonts/fontawesome-webfont.svg",
      "/src/fonts/fontawesome-webfont.ttf",
      "/src/fonts/fontawesome-webfont.woff",
      "/src/fonts/fontawesome-webfont.woff2",
      "/src/fonts/glyphicons-halflings-regular.eot",
      "/src/fonts/glyphicons-halflings-regular.svg",
      "/src/fonts/glyphicons-halflings-regular.ttf",
      "/src/fonts/glyphicons-halflings-regular.woff",
      "/src/fonts/glyphicons-halflings-regular.woff2",
    ];
    await cache.addAll([...assetUrls, ...imageAssets, ...fontAssets]);
  } catch (e) {
    // Ignore errors
  }
}

self.addEventListener("install", event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll([
        OFFLINE_URL,
        "/",
        "/index.html",
        "/manifest.json",
        "/favIcon/greenIconNoBackground.png",
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
      ]);
      await cacheAssetsFromIndex(cache);
    })(),
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name)));
    }),
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const { request } = event;
  const url = request.url;

  // SPA navigation fallback
  if (
    request.mode === "navigate" ||
    (request.method === "GET" && request.headers.get("accept") && request.headers.get("accept").includes("text/html"))
  ) {
    event.respondWith(
      fetch(request)
        .then(response => response)
        .catch(() => caches.match(OFFLINE_URL)),
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
    return;
  }
});
