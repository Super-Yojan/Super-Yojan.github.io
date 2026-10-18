// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
// 1. Import the math plugins
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { remarkMermaid } from "./src/plugins/remark-mermaid.mjs";
import pitchTheme from "./src/styles/shiki-pitch.json" with { type: "json" };
import { remarkCallout } from "./src/plugins/remark-callout.mjs";

export default defineConfig({
  site: "https://super-yojan.dev",
  integrations: [mdx(), sitemap()],
  // 2. Configure Markdown
  markdown: {
    remarkPlugins: [remarkMermaid, remarkCallout, remarkMath],
    rehypePlugins: [rehypeKatex],
    // Shiki highlights at build time. The pitch theme keeps github-dark-dimmed
    // greys and moves every chromatic token onto the teal ramp, so a listing
    // never sets Safelight beside teal. The panel is forced to ink in CSS.
    // Lines stay on one row so a long command scrolls.
    shikiConfig: {
      theme: pitchTheme,
      wrap: false,
    },
  },
});
