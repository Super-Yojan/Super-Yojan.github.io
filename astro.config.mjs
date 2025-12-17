// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
// 1. Import the math plugins
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  site: "https://super-yojan.github.io",
  integrations: [mdx(), sitemap()],
  // 2. Configure Markdown
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    // Use a dark theme for code blocks
    shikiConfig: {
      theme: "material-theme-palenight",
      wrap: true,
    },
  },
});
