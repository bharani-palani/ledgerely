import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: env.VITE_SUBFOLDER ? `/${env.VITE_SUBFOLDER}/` : "/",
    mode: env.VITE_ENV === "production" ? "production" : "development",
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        strategies: "generateSW",
        devOptions: {
          enabled: true,
        },
        workbox: {
          globDirectory: path.resolve(__dirname, "build"),
          // maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
          // navigateFallbackAllowlist: [/\/index.html$/],
          navigateFallback: `${env.VITE_SUBFOLDER}/index.html`,
          // globPatterns: ["**/*.{js,wasm,css,html,ico,png,svg}"],
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
          name: "Ledgerely",
          short_name: "Ledgerely",
          description: "Your financial assist application",
          theme_color: "#ffffff",
          icons: [
            {
              src: "/favIcon/greenIconNoBackground.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "/favIcon/greenIconNoBackground.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        },
      }),
      viteCompression(),
      visualizer({
        open: true,
      }),
    ],
    root: path.resolve(__dirname),
    publicDir: "public",
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
      port: 3000,
      open: true,
      proxy: {
        "/services": {
          target: "http://localhost:5001",
          changeOrigin: true,
        },
      },
    },
    define: {
      "process.env": JSON.stringify(process.env),
    },
  };
});
