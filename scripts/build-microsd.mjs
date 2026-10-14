import { writeFileSync } from "node:fs";
import * as k from "../.agents/skills/anatomy/kit/iso-kit.mjs";

const card = [
    [1.6, 0],
    [15, 0],
    [15, 11],
    [0, 11],
    [0, 1.6],
];
const points = [];
const pushBox = (plan, z0, z1) => {
    for (const [x, y] of k.corners(plan)) {
        points.push([x, y, z0], [x, y, z1]);
    }
};
const plate = { x: -18, y: -16, w: 52, d: 40, r: 3 };
pushBox(plate, 4, 10);
for (const [x, y] of card) points.push([x, y, 10], [x, y, 11.1]);

const P = k.fitProjection(points, 720, 460, { pad: 48, azimuth: 38, elevation: 32 });

const parts = [];
const add = (point, svg) => parts.push({ depth: k.depthOf(point, P), svg });

add([8, 4, 4], k.solidSvg(k.slabOf(plate, 4, 6, P, 8, 0.6), { tone: "mid" }));

for (const [x, y] of k.corners(plate, 4)) {
    add([x, y, 0], k.solidSvg(k.cylinder(x, y, 2.2, 0, 4, P, 20), { tone: "lo" }));
    add([x, y, 10], k.solidSvg(k.cylinder(x, y, 0.7, 10, 0.45, P, 12), { tone: "hi" }));
}

const railA = { x: -1.2, y: -2.2, w: 17.4, d: 1.3, r: 0.2 };
const railB = { x: -1.2, y: 11.9, w: 17.4, d: 1.3, r: 0.2 };
add([8, -1, 10], k.solidSvg(k.slabOf(railA, 10, 1.4, P), { tone: "mid" }));
add([8, 12, 10], k.solidSvg(k.slabOf(railB, 10, 1.4, P), { tone: "mid" }));
for (const x of [-1.2, 16.2]) {
    add([x, 5, 10], k.solidSvg(k.cylinder(x, -1.5, 0.55, 10, 1.5, P, 10), { tone: "hi" }));
    add([x, 12, 10], k.solidSvg(k.cylinder(x, 12.6, 0.55, 10, 1.5, P, 10), { tone: "hi" }));
}

add([7.5, 5.5, 10], k.solidSvg(k.extrude(card, 10, 1.05, P, { bevel: 0.15 }), { tone: "hi", lit: true }));

const padW = 1.15;
const padD = 3.1;
const padGap = 1.55;
for (let i = 0; i < 8; i++) {
    const x = 1.35 + i * padGap;
    const plan = { x, y: 0.7, w: padW, d: padD, r: 0.12 };
    add([x, 2, 11.05], k.solidSvg(k.slabOf(plan, 11.05, 0.12, P, 4), { tone: "lo", flat: false }));
}

const notch = { x: 13.2, y: 8.6, w: 1.8, d: 2.4, r: 0.2 };
add([14, 9.5, 11.05], k.solidSvg(k.slabOf(notch, 11.05, 0.08, P, 4), { tone: "lo" }));

const ruler = [];
for (let i = 0; i <= 12; i++) {
    const x0 = -12 + i * 3;
    const long = i % 4 === 0;
    ruler.push(k.lineOnTop([x0, 20.5], [x0, long ? 22.4 : 21.6], 10, P));
}
ruler.push(k.lineOnTop([-12, 20.5], [24, 20.5], 10, P));
add([0, 21, 10], ruler.map((d) => k.lineSvg(d, { tone: longTone(d) })).join(""));

function longTone() {
    return "mid";
}

const label = { x: 22, y: -10, w: 8, d: 14, r: 0.4 };
add([26, -3, 10], k.solidSvg(k.slabOf(label, 10, 0.35, P), { tone: "lo", flat: true }));
add(
    [26, -3, 10.4],
    [
        k.lineOnTop([23.2, -8.2], [28.8, -8.2], 10.36, P),
        k.lineOnTop([23.2, -6.4], [28.8, -6.4], 10.36, P),
        k.lineOnTop([23.2, -4.6], [27.2, -4.6], 10.36, P),
    ]
        .map((d) => k.lineSvg(d, { tone: "hi" }))
        .join(""),
);

parts.sort((a, b) => a.depth - b.depth);
const svg = k.figureSvg({
    width: 720,
    height: 460,
    label: "Drawing of a microSD card on a small tray. A Pi 4 or Pi 5 reads a card of this kind.",
    body: parts.map((part) => part.svg),
    standalone: "light",
});

const inked = svg
    .replaceAll("--anatomy-page:#f2f2ef", "--anatomy-page:#ffffff")
    .replaceAll("--anatomy-card:#fbfbfa", "--anatomy-card:#ffffff")
    .replaceAll("--anatomy-paper:#fbfbfa", "--anatomy-paper:#ffffff")
    .replaceAll("--anatomy-face:#ffffff", "--anatomy-face:#ffffff")
    .replaceAll("--anatomy-strong:#18181a", "--anatomy-strong:#000000")
    .replaceAll("--anatomy-hi:#26262a", "--anatomy-hi:#000000")
    .replaceAll("--anatomy-text:#57575a", "--anatomy-text:#525252")
    .replaceAll("--anatomy-mid:#8a8a8f", "--anatomy-mid:#525252")
    .replaceAll("--anatomy-muted:#8c8c90", "--anatomy-muted:#737373")
    .replaceAll("--anatomy-lit:#000000", "--anatomy-lit:#000000");

writeFileSync("public/media/docs/microsd.svg", inked);
console.log("wrote", inked.length);
