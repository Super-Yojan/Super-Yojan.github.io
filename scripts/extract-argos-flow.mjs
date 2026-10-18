/**
 * Pull the pinned ARGOS excerpts into src/data/argos-data-flow.json.
 *
 *   ARGOS_ROOT=/tmp/ARGOS node scripts/extract-argos-flow.mjs
 *
 * The JSON is what the site builds. Re-run only when the pin moves.
 */
import fs from "node:fs";
import { edges, nodes, path, ancestor, ref, sha } from "./argos-flow-manifest.mjs";

const root = process.env.ARGOS_ROOT ?? "/tmp/ARGOS";
const head = fs.readFileSync(`${root}/.git/HEAD`, "utf8").trim();
let got = head;
if (head.startsWith("ref:")) {
    got = fs.readFileSync(`${root}/.git/${head.slice(5)}`, "utf8").trim();
}
if (got !== sha) {
    throw new Error(`ARGOS checkout is ${got}, manifest is pinned to ${sha}`);
}

const files = new Map();
const failures = [];
function lines(file) {
    if (!files.has(file)) {
        const text = fs.readFileSync(`${root}/${file}`, "utf8");
        files.set(file, text.split("\n"));
    }
    return files.get(file);
}

function spans(file, ranges, quote, hot) {
    const src = lines(file);
    const out = ranges.map(([start, end]) => {
        if (start < 1 || end > src.length || end < start) {
            throw new Error(`${file}:${start}-${end} outside ${src.length} lines`);
        }
        return {
            start,
            end,
            text: src.slice(start - 1, end).join("\n"),
        };
    });
    if (!out.some((span) => span.text.includes(quote))) {
        failures.push(`${file}:${ranges[0][0]} missing ${JSON.stringify(quote)}\n${out[0].text.slice(0, 180)}`);
    }
    const marked = new Set(hot ?? ranges.flatMap(([a, b]) => Array.from({ length: b - a + 1 }, (_, i) => a + i)));
    return out.map((span) => ({
        ...span,
        hot: Array.from({ length: span.end - span.start + 1 }, (_, i) => span.start + i).filter((n) => marked.has(n)),
    }));
}

const ids = new Set(nodes.map((node) => node.id));
if (ids.size !== nodes.length) throw new Error("duplicate node id");
const edgeIds = new Set();
for (const edge of edges) {
    if (!ids.has(edge.from) || !ids.has(edge.to)) {
        throw new Error(`edge ${edge.from} -> ${edge.to} missing endpoint`);
    }
    if (edgeIds.has(edge.id)) throw new Error(`duplicate edge id ${edge.id}`);
    edgeIds.add(edge.id);
}
for (const step of path) {
    if (!ids.has(step.node)) throw new Error(`path node ${step.node} missing`);
}

const data = {
    sha,
    ref,
    ancestor,
    nodes: nodes.map((node) => ({
        id: node.id,
        col: node.col,
        row: node.row,
        symbol: node.symbol,
        file: node.file,
        blurb: node.blurb,
        spans: spans(node.file, node.ranges, node.quote, node.hot),
    })),
    edges: edges.map((edge) => ({
        id: edge.id,
        from: edge.from,
        to: edge.to,
        label: edge.label,
        file: edge.file,
        blurb: edge.blurb,
        spans: spans(edge.file, edge.ranges, edge.quote, edge.hot),
    })),
    path: path.map((step, index) => ({ step: index + 1, ...step })),
};

if (failures.length) {
    console.error(failures.join("\n---\n"));
    throw new Error(`${failures.length} excerpts failed`);
}
const out = "src/data/argos-data-flow.json";
fs.writeFileSync(out, JSON.stringify(data));
const linked = [...new Set([...data.nodes, ...data.edges].map((item) => item.file))].sort();
console.log(`nodes ${data.nodes.length} edges ${data.edges.length} files ${linked.length} steps ${data.path.length}`);
console.log(linked.join("\n"));
