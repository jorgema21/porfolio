import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  plugins: [
    sveltekit(),
    ViteImageOptimizer({
      png: { compressionLevel: 9, palette: true },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 80 },
    }),
  ],
});
