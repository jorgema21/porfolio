import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import fs from "fs";
import path from "path";
import sharp from "sharp";

function ViteStaticResize() {
  return {
    name: "vite-plugin-static-resize",
    async closeBundle() {
      const outDir = path.resolve("build/images");

      if (!fs.existsSync(outDir)) {
        console.log("No se encontró la carpeta de imágenes en el build final:", outDir);
        return;
      }

      const resizeImagesRecursively = async (dir: string) => {
        const files = fs.readdirSync(dir);

        for (const file of files) {
          const fullPath = path.join(dir, file);
          const stat = fs.statSync(fullPath);

          if (stat.isDirectory()) {
            await resizeImagesRecursively(fullPath);
          } else if (file.endsWith(".webp")) {
            try {
              const image = sharp(fullPath);
              const metadata = await image.metadata();

              if (metadata.width && metadata.width > 1200) {
                const buffer = await image
                  .resize({ width: 1200, withoutEnlargement: true })
                  .toBuffer();
                
                fs.writeFileSync(fullPath, buffer);
              }
            } catch (err) {
              console.error(`Error optimizando dimensiones de: ${file}`, err);
            }
          }
        }
      };

      console.log("Redimensionando imágenes WebP estáticas a un máximo de 1200px");
      await resizeImagesRecursively(outDir);
      console.log("Redimensionamiento completado con éxito");
    }
  };
}

export default defineConfig({
  plugins: [
    sveltekit(),
    ViteImageOptimizer({
      png: { compressionLevel: 9, palette: true },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 80 },
    }),
    ViteStaticResize()
  ],
});
