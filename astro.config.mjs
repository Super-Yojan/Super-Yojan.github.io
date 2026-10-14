// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
// 1. Import the math plugins
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  site: "https://super-yojan.dev",
  integrations: [mdx(), sitemap()],
  // 2. Configure Markdown
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    // Code blocks sit on the pitch panel. Shiki emits CSS variables and the
    // stylesheet maps every token onto the inverted grey ladder, so syntax
    // stays tonal. Lines stay on one row so a long command scrolls.
    shikiConfig: {
      theme: "css-variables",
      wrap: false,
    },
  },
});
