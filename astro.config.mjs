import { defineConfig } from "astro/config";

/**
 * CONFIGURATION NOTE FOR GITHUB PAGES:
 *
 * 1. If you are using a CUSTOM DOMAIN (e.g., dharmaputramaritime.co.id):
 *    - Set 'base' to "/"
 *    - Set 'site' to "https://dharmaputramaritime.co.id"
 *
 * 2. If you are using GITHUB SUB-DIRECTORY (e.g., username.github.io/repo-name):
 *    - Set 'base' to "/repo-name"
 *    - Set 'site' to "https://username.github.io"
 */

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repoName = "dharma-putra-maritim-landing";

// Change this to false if you are NOT using a custom domain yet
const hasCustomDomain = true;

export default defineConfig({
  // Your production URL
  site: hasCustomDomain
    ? "https://dharmaputramaritime.co.id"
    : `https://fadli271.github.io`,

  // Base path logic:
  // - Local dev: "/"
  // - Production with custom domain: "/"
  // - Production with GitHub URL: "/repo-name"
  base: isGitHubPages && !hasCustomDomain ? `/${repoName}` : "/",

  srcDir: "./src",
  publicDir: "./public",
  outDir: "./dist",

  // 'always' ensures that every page has a trailing slash,
  // which is highly recommended for GitHub Pages to avoid SEO and routing issues.
  trailingSlash: "always",

  server: {
    port: 3000,
    host: true,
  },

  build: {
    // Generates a directory with an index.html for each page (clean URLs)
    format: "directory",
  },
});
