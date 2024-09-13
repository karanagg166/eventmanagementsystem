import { sentryVitePlugin } from "@sentry/vite-plugin";
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://iluvcollege.vercel.app/", // Replace with your domain
      outDir: "dist", // Output directory where the sitemap will be generated
    }),
    sentryVitePlugin({
      org: "poojan-goyani",
      project: "javascript-react",
      authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
    }),
  ],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
