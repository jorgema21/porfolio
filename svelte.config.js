import adapter from "@sveltejs/adapter-static";
import { mdsvex } from "mdsvex";
import { relative, sep } from "node:path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md", ".svx"],

  compilerOptions: {
    runes: ({ filename }) => {
      const relativePath = relative(import.meta.dirname, filename);
      const pathSegments = relativePath.toLowerCase().split(sep);
      const isExternalLibrary = pathSegments.includes("node_modules");

      return isExternalLibrary ? undefined : true;
    },
  },

  preprocess: [
    mdsvex({
      extensions: [".md"],
    }),
  ],

  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "404.html",
    }),

    paths: {
      base: "/porfolio",
    },
    prerender: {
      handleHttpError: "warn",
      handleUnseenRoutes: "ignore",
    },
  },
};

export default config;
