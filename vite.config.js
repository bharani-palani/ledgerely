import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import viteCompression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isCapacitor = mode === "capacitor";
  return {
    base: isCapacitor ? "./" : env.VITE_SUBFOLDER ? `/${env.VITE_SUBFOLDER}/` : "/",
    mode: env.VITE_ENV === "production" ? "production" : "development",
    plugins: [
      react(),
      command === "build" &&
        !isCapacitor &&
        VitePWA({
          registerType: "autoUpdate",
          strategies: "generateSW",
          devOptions: {
            enabled: false,
          },
          workbox: {
            globDirectory: path.resolve(__dirname, "build"),
            navigateFallback: isCapacitor ? "./index.html" : `${env.VITE_SUBFOLDER}/index.html`,
            globPatterns: ["**/*.{js,wasm,css,html,ico,png,svg,woff,woff2,json}"],
            cleanupOutdatedCaches: false,
            sourcemap: true,
            runtimeCaching: [
              {
                urlPattern: ({ request }) => request.mode === "navigate",
                handler: "NetworkFirst",
              },
            ],
          },
          manifest: {
            name: env.VITE_APP_NAME,
            short_name: env.VITE_APP_NAME,
            description: "Your financial assist application",
            theme_color: "#ffffff",
            display: "standalone",
            icons: [
              {
                src: `/favIcon/greenIconNoBackground.png`,
                sizes: "192x192",
                type: "image/png",
                purpose: "any",
              },
              {
                src: "/favIcon/ledgerely-mask-icon.svg",
                sizes: "512x512",
                type: "image/svg",
                purpose: "maskable",
              },
            ],
          },
        }),
      command === "build" && !isCapacitor && viteCompression(),
    ].filter(Boolean),
    root: path.resolve(__dirname),
    publicDir: "public",
    resolve: {
      alias:
        isCapacitor || command !== "build"
          ? {
              "virtual:pwa-register": path.resolve(__dirname, "src/pwa-register-noop.js"),
            }
          : {},
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
        },
        sass: {
          api: "modern",
        },
      },
    },
    optimizeDeps: {
      include: ["react", "react-dom", "axios"],
    },
    optimize: {
      esbuild: {
        exclude: [],
      },
    },
    build: {
      target: "es2022",
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      outDir: path.resolve(__dirname, "build"),
      modulePreload: {
        polyfill: false,
      },
      emptyOutDir: true,
      sourcemap: env.VITE_ENV === "production" ? false : true,
    },
    server: {
      host: true,
      port: 5173,
      strictPort: true,
      open: "https://ledgerely.localhost/dev/",
      origin: "https://ledgerely.localhost",
      cors: true,
      hmr: {
        protocol: "wss",
        host: "ledgerely.localhost",
        clientPort: 443,
      },
      watch: {
        ignored: ["**/android/**", "**/ios/**", "**/build/**", "**/dev-dist/**", "**/services/**"],
      },
    },
    define: {
      "process.env": JSON.stringify(process.env),
    },
  };
});
