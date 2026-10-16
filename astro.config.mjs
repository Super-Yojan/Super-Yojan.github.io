// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
// 1. Import the math plugins
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { remarkMermaid } from "./src/plugins/remark-mermaid.mjs";
import { remarkCallout } from "./src/plugins/remark-callout.mjs";

export default defineConfig({
  site: "https://super-yojan.dev",
  integrations: [mdx(), sitemap()],
  // 2. Configure Markdown
  markdown: {
    remarkPlugins: [remarkMermaid, remarkCallout, remarkMath],
    rehypePlugins: [rehypeKatex],
    // Shiki highlights at build time. github-dark-dimmed clears 4.5:1 on
    // #0A0A0A for every text token; the stylesheet forces that panel over
    // the theme's own #22272e. Lines stay on one row so a long command scrolls.
    shikiConfig: {
      theme: "github-dark-dimmed",
      wrap: false,
    },
  },
});
