import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: env.VITE_SUBFOLDER ? `/${env.VITE_SUBFOLDER}/` : "/",
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
        exclude: [],
      },
    },
    build: {
      outDir: path.resolve(__dirname, "build"),
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
