import { defineConfig } from "astro/config";

// Detect if we are running in GitHub Actions for production build
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repoName = "dharma-putra-maritim-landing";

export default defineConfig({
  // When deploying to GitHub Pages, site and base must be set.
  // In local development, Astro handles this automatically as "/".
  site: "https://fadli271.github.io",
  base: isGitHubPages ? `/${repoName}` : "/",

  srcDir: "./src",
  publicDir: "./public",
  outDir: "./dist",

  // GitHub Pages works better with trailing slashes for directory-style routing
  trailingSlash: "always",

  server: {
    port: 3000,
    host: true,
  },

  build: {
    format: "directory",
  },
});
