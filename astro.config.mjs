import { defineConfig } from "astro/config";

const rawBase = process.env.ASTRO_BASE?.trim() ?? "";
const normalizedBase =
  rawBase && rawBase !== "/"
    ? `/${rawBase.replace(/^\/+/, "").replace(/\/+$/, "")}`
    : undefined;

export default defineConfig({
  site: "https://dharmaputramaritime.co.id",
  base: normalizedBase,
  srcDir: "./src",
  publicDir: "./public",
  outDir: "./dist",
  trailingSlash: "never",
  server: {
    port: 3000,
    host: true,
  },
  build: {
    format: "directory",
  },
});
