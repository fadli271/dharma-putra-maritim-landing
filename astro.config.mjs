import { defineConfig } from "astro/config";

// Detect if we are running in GitHub Actions to set the base path correctly
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repoName = "dharma-putra-maritim-landing";

export default defineConfig({
  // If you are using a custom domain, set it here.
  // Otherwise, use your GitHub Pages URL: https://<username>.github.io
  site: "https://fadli271.github.io",

  // Base path must match the repository name for GitHub Pages sub-directory hosting
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
