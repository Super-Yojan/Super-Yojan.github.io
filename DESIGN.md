---
name: Yojan Gautam
description: A bold editorial studio identity in strict black and white, where the plates are engineering drawings.
colors:
  ink: "#000000"
  paper: "#FFFFFF"
  graphite: "#525252"
  ash: "#737373"
  rule: "rgba(0, 0, 0, 0.10)"
  pitch: "#0A0A0A"
  rule-inverse: "rgba(255, 255, 255, 0.10)"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "12vw"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.05em"
  statement:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(28px, 4.4vw, 60px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  subhead:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(19px, 2vw, 24px)"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "-0.02em"
  label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.1em"
rounded:
  none: "0"
  slight: "8px"
  soft: "40px"
  sweep: "100px"
  pill: "999px"
spacing:
  hair: "4px"
  tight: "8px"
  snug: "16px"
  base: "24px"
  wide: "32px"
  section: "clamp(96px, 12vw, 200px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "20px 40px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  link-underline:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  card-project:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.slight}"
    padding: "0"
  meta-row:
    textColor: "{colors.graphite}"
    typography: "{typography.label}"
    padding: "16px 0 0"
---

# Design System: Yojan Gautam

## Overview

**Creative North Star: "The Engineering Monograph"**

A studio monograph printed in one ink. The pages are white, the type is enormous and set
tight, and every image is a plate — a black-and-white technical drawing of a real system this
person built. The register is a design studio's, not a lab's: the confidence comes from scale
and restraint, not from terminal chrome or dashboard furniture.

Discipline is the whole argument. With no color available, hierarchy has to come from size,
weight, and the amount of white space around a thing — which is exactly the constraint that
makes the type do real work. A 12vw headline against a 14px tracked mono label is the system's
entire dynamic range, and it is enough. Motion is the second material: everything eases on
`cubic-bezier(0.16, 1, 0.3, 1)` and nothing snaps, so the page feels weighted rather than
animated.

The plates are the counterweight to all that type. Each project carries a drawn figure —
a blimp envelope with its EKF trace, five pipeline stages, a network graph, a step response
curve — in hairline black on white. They read as evidence, not decoration, and they are the
only place the page gets busy.

**Key Characteristics:**
- Strict monochrome; the palette has no accent and does not want one.
- Type at two extremes — enormous display, small tracked mono — with little in between.
- Hairline rules (1px) as the only dividing device.
- Asymmetric corner radii on marquee plates; near-square everywhere else.
- Continuous horizontal motion in the marquee; slow reveals everywhere else.
- A custom difference-blend cursor replaces the system pointer on fine-pointer devices.

## Colors

A two-value palette — paper and ink — with three neutral greys for demotion and a near-black
for the one inverted region.

### Primary
- **Ink** (#000000): All display type, body copy, plate strokes, rules, and the primary button
  fill. True black, never softened to a dark grey.
- **Paper** (#FFFFFF): The ground for every page except the footer. Also the cursor fill and
  the reversed type inside filled buttons.

### Neutral
- **Graphite** (#525252): Secondary text — the hero sub-headline, project descriptions,
  standfirsts. The workhorse demotion.
- **Ash** (#737373): Tertiary metadata only — years, categories, counts, timestamps. Never
  used for anything a visitor must read to understand the page.
- **Rule** (rgba(0,0,0,0.10)): Every divider, card border, and metadata separator on paper.
- **Rule Inverse** (rgba(255,255,255,0.10)): The same device inside the footer.

### Tertiary
- **Pitch** (#0A0A0A): The footer ground, and nothing else. Its job is to close the page with
  a hard tonal flip.

### Named Rules
**The One Ink Rule.** The interface is black on white. Color enters the page only through
project imagery — and while the plates are monochrome line art, that channel stays closed.
Introducing an accent to signal state, category, or emphasis is a system violation; use
weight, size, or a rule instead.

**The Grey Ladder Rule.** Three steps and no more: ink for what matters, graphite for support,
ash for metadata. A fourth grey means the hierarchy failed upstream. On pitch the ladder
inverts rather than extending — Graphite Inverse (rgba(255,255,255,0.72)) and Ash Inverse
(rgba(255,255,255,0.62)) are the same two demotion steps read against a dark ground, and both
clear 4.5:1 on #0A0A0A.

**The Figure Rule.** Every plate is numbered and the number is printed. `Fig. 01` leads the
metadata row on the landing grid, the marquee caption, and the work-page entry; on the work
page the figure also carries a written caption. An unnumbered plate is decoration, which is
the one thing the plates are not.

## Typography

**Display Font:** Inter (with system-ui, sans-serif)
**Body Font:** Inter (with system-ui, sans-serif)
**Label/Mono Font:** ui-monospace / SFMono-Regular / Menlo

**Character:** One family carrying the whole page, worked at its extremes. Inter at 700 and
-0.05em tracking is dense and architectural at display size; the same family at 400 and
-0.02em is quiet and highly readable at body size. The monospace is the only foreign voice and
it appears only as small tracked uppercase metadata, which keeps it reading as a caption
system rather than as a terminal.

### Hierarchy
- **Display** (700, 12vw, 0.9): The landing hero only. One per site. Set in per-character
  spans for the staggered reveal. Rises to 17vw below 600px so the name still fills the frame.
- **Headline** (700, clamp(2.5rem, 6vw, 5rem), 0.9): Page titles. The footer brand mark runs a
  wider clamp(2.5rem, 7vw, 6rem) and the menu overlay clamp(2.5rem, 9vw, 7rem), since each
  owns its whole region.
- **Statement** (700, clamp(28px, 4.4vw, 60px), 1.05): The one centered thesis line on a page.
- **Subhead** (700, 32px, 1.1): `h2` inside long-form prose.
- **Title** (700, 24px, 1.1): Project names and article titles in listings.
- **Lede** (400, clamp(19px, 2vw, 24px), 1.4, graphite): The hero sub-headline and page
  standfirsts.
- **Body** (400, 18px, 1.5): Running prose at every breakpoint — there is no smaller mobile
  body step. Measure capped at 68ch.
- **Label** (mono, 14px, uppercase, 0.1em, ash): Categories, years, counts, nav items, button
  text, and figure captions.

Plate annotation sizes (13 and 15) are **viewBox user units inside the SVG**, not screen
pixels. They scale with the frame and are not a step on this ramp.

### Named Rules
**The Two Extremes Rule.** Type is either very large or very small. Statement and Subhead are
the only steps that sit between Title (24px) and Headline, and both are reserved: Statement for
a page's single thesis line, Subhead for prose `h2`. A page wanting another size in that band
is a page whose hierarchy needs rethinking, not a new step in the scale.

**The Tracking Inversion Rule.** Tracking runs negative as size runs up (-0.05em at display)
and positive as size runs down (+0.1em on 14px mono). The two never meet in the middle.

## Layout

A single centered column with a wide gutter: `max-width: 1600px`, padding `clamp(24px, 5vw, 64px)`.
Sections are separated by `clamp(96px, 12vw, 200px)` of vertical space — the rhythm is
deliberately larger than feels comfortable, because the emptiness is what makes the display
type land.

The project grid is two columns on desktop (`minmax(0, 1fr)` twice, `64px` gap), collapsing to
one below 900px. The footer is three tracks on desktop (`2fr 1fr 1fr`) — brand and bio in the wide first track, then socials,
then contact — collapsing to two below 900px and one below 600px.

The marquee is the one full-bleed element: it breaks the container, overflows hidden, and
scrolls its track continuously. Its cards are fixed-width (`clamp(240px, 28vw, 380px)`) with a
5:7 aspect ratio.

Spacing rhythm: more space above a heading than below it, always. Groups tighten to 8–16px
internally and separate at 64px or more.

## Elevation & Depth

**No shadows anywhere.** This system is flat by construction. Depth comes from three devices
instead: the tonal flip of the footer against the page, the 1px rule that separates a plate
from its metadata, and the `mix-blend-mode: difference` cursor and header, which sit optically
above the page by inverting whatever is under them rather than by casting anything.

### Named Rules
**The No-Shadow Rule.** A `box-shadow` in this system is a bug. If an element needs to feel
lifted, give it space or a rule; if it needs to feel above the page, use difference blending.

## Shapes

Corners are square by default (0). Four deliberate exceptions:

- **Grid plates** take a slight radius (8px) — just enough to read as a printed plate rather
  than a raw crop.
- **Marquee plates** take asymmetric radii on a repeating three-card cycle: card A sweeps its
  top-left (100px), card B sweeps top-right (100px) with a softened bottom-left (40px), card C
  softens uniformly (40px). The cycle is what breaks the marquee's monotony.
- **The cursor** is a full circle (pill, 999px).
- **The card hover arrow** is the same pill (999px) — the only filled ink disc in the system.

Borders are 1px, always, in Rule or Rule Inverse. There is no second border weight.

## Components

### Buttons
- **Shape:** Square (0 radius).
- **Primary:** Ink fill, paper text, 20px 40px padding, mono label at 14px / 0.1em uppercase.
- **Hover / Focus:** Inverts to paper fill with ink text and a 1px ink border, over 500ms on
  the house easing. Focus-visible adds a 2px ink outline at 3px offset.
- **Ghost:** No fill; ink text with a 1px bottom rule that wipes from left to right on hover.

### Cards / Containers
- **Corner Style:** 8px on grid plates; the asymmetric cycle on marquee plates.
- **Background:** Paper. Plates draw in ink on paper.
- **Shadow Strategy:** None — see Elevation & Depth.
- **Border:** A 1px Rule line around the plate frame, and a second above the metadata row.
- **Internal Padding:** 0 on the plate; 16px above the metadata row.

### Long-form prose
Reading pages narrow the shell to 860px so the head and the 68ch column read as one
document rather than a text block pinned to the left of a 1600px page.

- **Code blocks:** Shiki runs in `css-variables` mode and every token maps onto the grey
  ladder — keywords and identifiers in ink, strings and parameters in graphite, comments and
  punctuation in ash — on a paper ground inside a 1px rule at 8px radius. Syntax highlighting
  is tonal here; a themed, coloured code block violates The One Ink Rule.
- **Data tables:** header row in 13px mono uppercase ash over a 1px ink rule; body rows
  separated by 1px Rule lines with the last row unruled. Figures are set
  `tabular-nums lining-nums` so columns align. The table scrolls inside itself rather than
  widening the page.

### Navigation
Fixed to the top, `mix-blend-mode: difference` on the container so it reads against both paper
and the pitch footer without needing a scroll listener. Lowercase wordmark `yg` at 24px / 700 /
-0.05em on the left; a rotating plus-glyph menu toggle on the right; 24px padding. The open
menu is a full-viewport pitch panel with the routes set at headline scale.

### Signature Component — The Difference Cursor
A 32px circle, `position: fixed`, `pointer-events: none`, `z-index: 9999`, paper fill, 1px ink
border, `mix-blend-mode: difference`. Its position is interpolated toward the true pointer at
~0.18 per frame in a `requestAnimationFrame` loop, producing a deliberate lag. Over any `a`,
`button`, or `[data-cursor="grow"]` element it scales 2.5×. The native cursor is hidden
(`cursor: none`) **only** under `@media (hover: hover) and (pointer: fine)`; touch and
coarse-pointer devices keep their native pointer and never instantiate the element.

### Signature Component — Engineering Plates
Hand-authored inline SVG figures, one per project, drawn in hairline ink (1–1.5px) on paper
with mono annotation labels. They occupy the image slots a photograph would: 5:7 in the
marquee, 4:3 in the grid. Each is `preserveAspectRatio="xMidYMid meet"` so the figure is never cropped in either frame — the letterbox is white on white and therefore invisible —
and each carries the grayscale-to-color and 1.05× scale hover treatment so real photography can
replace it later without any layout change.

## Do's and Don'ts

### Do:
- **Do** keep every transition at 500ms or longer on `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Do** use the 1px Rule line as the only divider, on paper or inverse.
- **Do** set metadata in 14px mono, uppercase, 0.1em tracking, in ash.
- **Do** give the marquee plates their three-card asymmetric radius cycle; the irregularity is
  the point.
- **Do** gate the custom cursor behind `(hover: hover) and (pointer: fine)` and collapse every
  animation under `prefers-reduced-motion: reduce`.
- **Do** let sections breathe at `clamp(96px, 12vw, 200px)`.

### Don't:
- **Don't** introduce any accent color, including for status, category, or error. See The One
  Ink Rule.
- **Don't** use a border heavier than 1px anywhere.
- **Don't** add a `box-shadow`; this system has no elevation vocabulary.
- **Don't** use the platform's default easing (`ease`, `ease-in-out`, `linear` for anything but
  the marquee track).
- **Don't** let mono type run longer than a short label — it is a caption voice, not a body
  voice.
- **Don't** reintroduce the retired terminal world: no window chrome, no prompt glyphs, no
  status LEDs, no blueprint grid, no theme toggle.
