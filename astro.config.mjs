import { defineConfig } from "astro/config";

/**
 * Astro Configuration for GitHub Pages
 *
 * Deployment URL: https://fadli271.github.io/dharma-putra-maritim-landing/
 * Base path MUST be the repository name starting with a forward slash.
 */

export default defineConfig({
  // Your GitHub Pages URL
  site: "https://fadli271.github.io",

  // The name of your repository
  base: "/dharma-putra-maritim-landing",

  srcDir: "./src",
  publicDir: "./public",
  outDir: "./dist",

  // Highly recommended for GitHub Pages to ensure consistent routing
  trailingSlash: "always",

  server: {
    port: 3000,
    host: true,
  },

  build: {
    // Generates a directory for each page with an index.html file
    format: "directory",
  },
});
