
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/pc-components-manual/",
  assetsInclude: ["**/*.glb"],

  server: {
    fs: {
      allow: [".."],
    },
  },

  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "PC Components AR",
        short_name: "PC Components",
        description:
          "Interactive 3D learning application for computer hardware and networking.",
        theme_color: "#172554",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/pc-components-manual/",
        scope: "/pc-components-manual/",
      },
      workbox: {
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,glb,woff2}",
        ],
        navigateFallback: "index.html",
      },
    }),
  ],

  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames(assetInfo) {
          const sourceName = assetInfo.names[0] ?? "asset";

          if (sourceName.toLowerCase().endsWith(".glb")) {
            return "assets/models/[name][extname]";
          }

          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
