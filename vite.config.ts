import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig as defineVitestConfig } from "vitest/config";
import { version } from "./package.json";

export default defineConfig({
  ...defineVitestConfig({
    test: {
      environment: "node",
      globals: true,
    },
  }),
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: false,
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    }),
  ],
  define: {
    "import.meta.env.APP_VERSION": JSON.stringify(version),
  },
});
