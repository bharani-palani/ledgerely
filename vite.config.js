import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: env.VITE_SUBFOLDER ? `/${env.VITE_SUBFOLDER}/` : "/",
    plugins: [
      react(),
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
      cssCodeSplit: true,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      outDir: path.resolve(__dirname, "build"),
      modulePreload: {
        polyfill: false, // Slightly smaller bundles if targeting modern browsers
      },
      emptyOutDir: true,
      sourcemap: env.VITE_ENV === "production" ? false : true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
            router: ["react-router-dom"],
            charts: ["d3"],
            vendor: ["axios", "lodash"],
          },
        },
      },
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
