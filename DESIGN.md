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
  soft: "#F4F4F6"
  edge: "rgba(0, 0, 0, 0.12)"
  edge-strong: "rgba(0, 0, 0, 0.35)"
  quiet: "rgba(0, 0, 0, 0.55)"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2rem, 8vw, 4.5rem)"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 300
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  statement:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(28px, 4.4vw, 60px)"
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  subhead:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 500
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
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "44px"
    fontSize: "13px"
    fontWeight: 500
  button-primary-hover:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.paper}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    borderColor: "{colors.edge-strong}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "44px"
    fontSize: "13px"
    fontWeight: 500
  pill-soft:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "40px"
    fontSize: "11px"
    fontWeight: 500
  tag:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    borderColor: "{colors.edge}"
    rounded: "{rounded.pill}"
    height: "30px"
    fontSize: "11px"
    fontWeight: 500
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
makes the type do real work. Display type is set LIGHT (Inter 300) and large; a 12vw headline
at hairline weight against an 11px pill label is the system's entire dynamic range, and it is
enough. Weight climbs only as size falls — 300 for display, 500 for titles and controls, 400
for prose. There is no 700 anywhere in the system; bold display type is what this refresh
deliberately left behind. Motion is the second material: everything eases on
`cubic-bezier(0.16, 1, 0.3, 1)` and nothing snaps, so the page feels weighted rather than
animated.

The plates are the counterweight to all that type. Each project carries a drawn figure —
a blimp envelope with its EKF trace, five pipeline stages, a network graph, a step response
curve — in hairline black on white. They read as evidence, not decoration, and they are the
only place the page gets busy.

**Key Characteristics:**
- Strict monochrome; the palette has no accent and does not want one.
- Type at two extremes — large LIGHT display, small tracked mono — with little in between.
- Hairline rules (1px) as the only dividing device, and full-round pills as the only control.
- One moving frontispiece: the landing hero's footage, held to the page's ink.
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
- **Soft** (#F4F4F6): The ground of a secondary pill in the navbar. The only fill between
  paper and ink, and it exists so a control can read as a control without a border.
- **Edge** (rgba(0,0,0,0.12)) / **Edge Strong** (rgba(0,0,0,0.35)): The hairline on a white
  tag, and the heavier one on a ghost button.
- **Quiet** (rgba(0,0,0,0.55)): The hero eyebrow, and nothing else.

### Tertiary
- **Pitch** (#0A0A0A): The footer ground and the full-viewport menu, and nothing else. Its job
  is to close the page with a hard tonal flip. The hero is paper, not pitch — the footage
  supplies its own black.

### Named Rules
**The One Ink Rule.** The interface is black on white. Color enters the page only through
project imagery — and while the plates are monochrome line art, that channel stays closed.
Introducing an accent to signal state, category, or emphasis is a system violation; use
weight, size, or a rule instead. Footage obeys the same rule as a drawing: the hero's moving
plate is a black subject on a white ground, so it needs no grading to belong. Footage that
arrives in colour is desaturated in CSS rather than baked, so the source stays unmodified.

**The Frontispiece Rule.** Exactly one moving plate exists, and it is the landing hero: a
black manipulator opening and closing on white, looping by ping-pong so there is no cut. It
is silent, `aria-hidden` (it states nothing the copy does not), and it pauses off-screen and
under reduced motion, falling back to its own poster frame. It is full-bleed on desktop and
an 80% frame on mobile, where a radial mask feathers its edges — the footage's ground is a
light grey, not paper, so an unmasked inset frame would read as a pasted rectangle. A second
video anywhere on the site turns the device into wallpaper and forfeits the effect.

**The Fade-Up Rule.** Type never sits directly on footage. A white gradient of fixed height
rises from the base of the hero and lands the copy on paper; the subject dissolves into it.
The fade is pinned in pixels, not tied to the height of the copy — tied to the copy it grows
with the text and washes the subject out to a smudge.

**The Pill Rule.** Every control is a full-round capsule, and the set is three parts: a pill
(the capsule), a knob (the 28/32px circle inside it), and a tag (a bare chip). They are shared
between the navbar, the hero and the page furniture so the site reads as one set of hardware.
Controls carry their own ground, which is what lets the fixed bar survive the pitch footer
scrolling under it — the bare wordmark is the exception, and is told explicitly to invert.

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

**Character:** One family carrying the whole page, worked at its extremes. Inter at 300 and
-0.03em tracking is open and architectural at display size — the thin stroke at scale is the
identity, and the reason the page reads as a studio rather than a poster; the same family at
400 and -0.02em is quiet and highly readable at body size, and at 500 it becomes a control
label. The weight axis only ever moves in one direction: heavier as the type gets smaller. The monospace is the only foreign voice and
it appears only as small tracked uppercase metadata, which keeps it reading as a caption
system rather than as a terminal.

### Hierarchy
- **Display** (300, clamp(2.5rem, 5.5vw, 4.5rem), 1.0): The landing hero only. One per site.
  Two hard-broken lines, entering as one block rather than per-character — the light weight is
  doing the work the stagger used to. Drops to clamp(2rem, 8vw, 4.5rem) below 768px.
- **Headline** (300, clamp(2.5rem, 6vw, 5rem), 0.95): Page titles. The footer brand mark runs a
  wider clamp(2.5rem, 7vw, 6rem) and the menu overlay clamp(2.5rem, 9vw, 7rem), since each
  owns its whole region.
- **Statement** (300, clamp(28px, 4.4vw, 60px), 1.05): The one centered thesis line on a page.
- **Subhead** (300, 32px, 1.1): `h2` inside long-form prose.
- **Title** (500, 24px, 1.1): Project names and article titles in listings.
- **Control** (500, 11–13px): Pill labels, tags, and buttons. The only place weight rises
  above 500, and it never does.
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
- **Shape:** Full-round pill (999px). Nothing in the control set is square.
- **Primary:** Ink fill, paper text, 44px tall, 0 22px padding, 13px / 500 label — sentence
  case, not the tracked mono used for metadata.
- **Ghost:** No fill; ink text inside a 1px Edge Strong (rgba(0,0,0,0.35)) hairline.
- **Hover / Focus:** Primary softens to graphite; ghost fills to ink with paper text. Both
  over 500ms on the house easing. Focus-visible adds a 2px ink outline at 3px offset.

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
Fixed to the top at `z-index: 50`, `pointer-events: none` on the bar itself and `auto` on the
controls, so it never swallows a click meant for the hero. Left group: the two-blade wordmark
plus "Yojan Gautam" at 15px / 600, an ink Menu pill whose knob rotates 45° to a close glyph,
and a soft pill carrying two discipline labels. Right group: a soft pill with an ink knob
linking to the work, plus an availability label. Padding steps 16px → 24px/32px at 768px; the
brand name, the discipline labels and the availability label all drop below it.

Because the bar has no ground of its own, two pitch surfaces can end up behind it — the open
menu (`z-index: 40`, below the bar so the control that opened it can close it) and the footer
on a short viewport. A scroll/resize listener adds `.is-inverse`, which flips the wordmark to
paper and the ink pill to paper-on-ink. Difference blending cannot do this job here: the bar
forms its own stacking context, so there is nothing behind it to blend against.

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
