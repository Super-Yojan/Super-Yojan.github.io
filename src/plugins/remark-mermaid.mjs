import { readFileSync } from "node:fs";
import puppeteer from "puppeteer-core";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const mermaidPath = require.resolve("mermaid/dist/mermaid.min.js");
const geistSansPath = join(
    dirname(fileURLToPath(import.meta.url)),
    "../../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2",
);

const themeVariables = {
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif",
    fontSize: "14px",
    primaryColor: "#ffffff",
    primaryTextColor: "#000000",
    primaryBorderColor: "#000000",
    secondaryColor: "#F4F4F6",
    secondaryTextColor: "#000000",
    secondaryBorderColor: "#000000",
    tertiaryColor: "#ffffff",
    tertiaryTextColor: "#000000",
    tertiaryBorderColor: "#000000",
    lineColor: "#000000",
    textColor: "#000000",
    mainBkg: "#ffffff",
    nodeBorder: "#000000",
    clusterBkg: "#ffffff",
    clusterBorder: "rgba(0,0,0,0.10)",
    titleColor: "#000000",
    edgeLabelBackground: "#ffffff",
    nodeTextColor: "#000000",
    defaultLinkColor: "#000000",
    background: "#ffffff",
};

let chain = Promise.resolve();
let pagePromise;

function getPage() {
    if (!pagePromise) {
        pagePromise = (async () => {
            const browser = await puppeteer.launch({
                executablePath:
                    process.env.CHROME_PATH ||
                    process.env.PUPPETEER_EXECUTABLE_PATH ||
                    "/usr/bin/google-chrome",
                headless: "new",
                args: ["--no-sandbox", "--disable-dev-shm-usage"],
            });
            const page = await browser.newPage();
            await page.setContent(
                "<!doctype html><html><body style=\"margin:0;background:#fff\"></body></html>",
            );
            await page.addScriptTag({ path: mermaidPath });
            const geistB64 = readFileSync(geistSansPath).toString("base64");
            await page.addStyleTag({
                content: `@font-face{font-family:Geist;src:url(data:font/woff2;base64,${geistB64}) format("woff2");font-weight:100 900;font-style:normal;font-display:block}`,
            });
            await page.evaluate(() => document.fonts.load("14px Geist"));
            await page.evaluate((variables) => {
                window.mermaid.initialize({
                    startOnLoad: false,
                    securityLevel: "loose",
                    theme: "base",
                    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif",
                    flowchart: { htmlLabels: false, curve: "basis", padding: 14 },
                    themeVariables: variables,
                });
            }, themeVariables);
            return page;
        })();
    }
    return pagePromise;
}

function render(source) {
    const run = chain.then(async () => {
        const page = await getPage();
        return page.evaluate(async (source) => {
            const id = `m${Math.random().toString(36).slice(2)}`;
            const { svg } = await window.mermaid.render(id, source);
            return svg;
        }, source);
    });
    chain = run.then(
        () => undefined,
        () => undefined,
    );
    return run;
}

function walk(node, visit) {
    visit(node);
    if (!node.children) return;
    for (const child of node.children) walk(child, visit);
}

/** Turn ```mermaid fences into inline SVG during the Astro build. */
export function remarkMermaid() {
    return async (tree) => {
        const blocks = [];
        walk(tree, (node) => {
            if (node.type === "code" && node.lang === "mermaid") blocks.push(node);
        });
        for (const node of blocks) {
            const svg = await render(node.value);
            node.type = "html";
            node.value = `<figure class="diagram">${svg}</figure>`;
            delete node.lang;
            delete node.meta;
        }
    };
}
