import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
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
  optimize: {
    esbuild: {
      exclude: ["react-linechart"],
    },
  },
  build: {
    outDir: path.resolve(__dirname, "build"),
    emptyOutDir: true,
    sourcemap: "hidden",
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
});
