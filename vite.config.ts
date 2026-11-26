import adapter from "@sveltejs/adapter-static";
import { mdsvex } from "mdsvex";
import { relative, sep } from "node:path";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import fs from "fs";
import path from "path";
import sharp from "sharp";

async function resizeStaticImages() {
  const outDir = path.resolve("build/images/projects");

  if (!fs.existsSync(outDir)) {
    throw new Error(`No se encontró la carpeta de imágenes: ${outDir}`);
  }

  let resized = 0;

  const resizeImagesRecursively = async (dir: string): Promise<void> => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        await resizeImagesRecursively(fullPath);
      } else if (file.toLowerCase().endsWith(".webp")) {
        try {
          const originalBuffer = await fs.promises.readFile(fullPath);
          const metadata = await sharp(originalBuffer).metadata();

          if (metadata.width && metadata.width > 1200) {
            const resizedBuffer = await sharp(originalBuffer)
              .resize({ width: 1200, withoutEnlargement: true })
              .webp()
              .toBuffer();

            await fs.promises.writeFile(fullPath, resizedBuffer);
            resized++;
          }
        } catch (err) {
          console.error(`Error redimensionando: ${file}`, err);
          throw err;
        }
      }
    }
  };

  console.log("Redimensionando imágenes WebP de proyectos...");

  await resizeImagesRecursively(outDir);

  console.log(`${resized} imágenes redimensionadas.`);
  console.log("Redimensionamiento completado con éxito.");
}

const staticAdapter = adapter({
  pages: "build",
  assets: "build",
  fallback: "404.html",
});

const resizeAdapter = {
  ...staticAdapter,
  async adapt(builder: Parameters<typeof staticAdapter.adapt>[0]) {
    await staticAdapter.adapt(builder);
    await resizeStaticImages();
  },
};

export default defineConfig({
  logLevel: process.env.NODE_ENV === "production" ? "warn" : "info",

  plugins: [
    sveltekit({
      extensions: [".svelte", ".md", ".svx"],
      compilerOptions: {
        runes: ({ filename }) => {
          const relativePath = relative(import.meta.dirname, filename);
          const pathSegments = relativePath.toLowerCase().split(sep);
          const isExternalLibrary = pathSegments.includes("node_modules");

          return isExternalLibrary ? undefined : true;
        },
      },
      preprocess: [mdsvex({ extensions: [".md"] })],
      adapter: resizeAdapter,
      paths: { base: "/porfolio" },
      prerender: {
        handleHttpError: "warn",
        handleUnseenRoutes: "ignore",
      },
    }),

    ViteImageOptimizer({
      png: { compressionLevel: 9, palette: true },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 80 },
    }),
  ],
});
