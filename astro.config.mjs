import { defineConfig } from "astro/config";

// Detect if we are running in GitHub Actions for production build
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repoName = "dharma-putra-maritim-landing";

export default defineConfig({
  // Base URL for your site. Using the GitHub Pages default URL for debugging.
  site: "https://fadli271.github.io",

  // Base path must match the repository name for GitHub Pages sub-directory hosting.
  // This ensures assets are loaded from /dharma-putra-maritim-landing/ instead of root /.
  base: isGitHubPages ? `/${repoName}` : "/",

  srcDir: "./src",
  publicDir: "./public",
  outDir: "./dist",

  // GitHub Pages works best with trailing slashes for directory-style routing.
  trailingSlash: "always",

  server: {
    port: 3000,
    host: true,
  },

  build: {
    // Generates a directory with an index.html for each page, resulting in clean URLs.
    format: "directory",
  },
});
