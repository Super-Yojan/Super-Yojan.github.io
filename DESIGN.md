---
name: Yojan Gautam
description: A bold editorial studio identity in ink on paper, with Safelight red as the lead accent and teal kept secondary.
colors:
  ink: "#0B0B0B"
  ink-raised: "#1A1A1A"
  paper: "#FAFAF8"
  white: "#FFFFFF"
  graphite: "#6B6B6B"
  mist: "#BDBDBD"
  rule: "#BDBDBD"
  pitch: "#0B0B0B"
  rule-inverse: "#6B6B6B"
  graphite-inverse: "#BDBDBD"
  soft: "#FFFFFF"
  edge: "#BDBDBD"
  edge-strong: "#6B6B6B"
  safelight: "#EE3B1B"
  safelight-deep: "#5C1206"
  safelight-pressed: "#9E1F0B"
  safelight-link: "#C72C12"
  safelight-light: "#F58A75"
  safelight-wash: "#FDE7E2"
  teal: "#1B7F86"
  teal-deep: "#0F4C52"
  teal-light: "#7CC4C6"
  teal-wash: "#E3F2F2"
typography:
  display:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(2rem, 8vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.06em"
  headline:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.055em"
  statement:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(28px, 4.4vw, 60px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.05em"
  subhead:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(19px, 2vw, 24px)"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "-0.02em"
  label:
    fontFamily: "Iosevka, Iosevka Nerd Font, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
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
    backgroundColor: "{colors.ink-raised}"
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
    backgroundColor: "{colors.safelight-wash}"
    textColor: "{colors.safelight-pressed}"
    borderColor: "{colors.safelight-wash}"
    rounded: "{rounded.pill}"
    height: "30px"
    fontSize: "11px"
    fontWeight: 500
  link-underline:
    textColor: "{colors.safelight-link}"
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

A studio monograph. The pages are paper, the type is enormous and set tight, and every
image is a plate — a black-and-white technical drawing of a real system this person built.
The register is a design studio's, not a lab's: the confidence comes from scale and
restraint, not from terminal chrome or dashboard furniture.

Discipline is still the argument. Hierarchy comes from size, weight, and the amount of
paper around a thing. Display type is set heavy (Geist 700) and large, with tight
tracking; a headline at that weight against an 11px pill label is the system's entire dynamic
range. Big headings are 700, the 32px subhead is 600, titles and controls
are 500, and prose is 400. Safelight is a thin accent on top of that — links, labels, one
rule — and teal is a second voice that never shares a component with Safelight at full
strength. Motion is the other material: everything eases on
`cubic-bezier(0.16, 1, 0.3, 1)` and nothing snaps, so the page feels weighted rather than
animated.

The plates are the counterweight to all that type. Each project carries a drawn figure —
a blimp envelope with its EKF trace, five pipeline stages, a network graph, a step response
curve — in hairline black on white. They read as evidence, not decoration, and they are the
only place the page gets busy.

**Key Characteristics:**
- Ink and paper for body copy. Safelight leads; teal is secondary and sparse.
- Type at two extremes — large heavy display, small tracked mono — with little in between.
- Hairline rules (1px) as the only dividing device, and full-round pills as the only control.
- One moving frontispiece: the landing hero's footage, held to the page's ink.
- Asymmetric corner radii on marquee plates; near-square everywhere else.
- Continuous horizontal motion in the marquee; slow reveals everywhere else.
- A custom difference-blend cursor replaces the system pointer on fine-pointer devices.

## Colors

Paper and ink carry the page. Safelight is the lead accent, used in small amounts. Teal is
the complement, and it stays secondary. Body copy is never set in either accent. There is
no theme toggle: pitch surfaces (footer, menu, code) are the dark ground, and they use the
light tints of the same ramps.

### Primary
- **Ink** (#0B0B0B): Display type, body copy, plate strokes, and the primary button fill.
- **Raised ink** (#1A1A1A): The pressed ground of a filled button, and a dark grey for rules
  that need to sit just off pitch.
- **Paper** (#FAFAF8): The page ground. Also the fade under the hero.
- **White** (#FFFFFF): Soft pills, the cursor fill, and reversed type inside filled buttons.

### Neutral
- **Graphite** (#6B6B6B): Secondary text on paper — ledes, descriptions, margin notes.
  5.1:1 on paper. On pitch it is only a rule (3.7:1, too low for small text).
- **Mist** (#BDBDBD): Hairline rules and borders on paper. 1.8:1 on paper, so it is never
  small text there. On pitch it is the muted text step, at 10.5:1.
- **Rule** (#BDBDBD): Dividers, card borders, and metadata separators on paper. The section
  rule under a heading is the one exception, and it is Safelight.
- **Rule Inverse** (#6B6B6B): The footer and menu divider.
- **Soft** (#FFFFFF): The ground of a secondary pill. A mist hairline keeps it legible on paper.
- **Edge** (#BDBDBD) / **Edge Strong** (#6B6B6B): The soft-pill hairline, and the ghost button.

### Safelight
The lead accent. Quiet, and never a large fill.
- **Deep** (#5C1206): Selection on pitch.
- **Pressed / visited** (#9E1F0B): Link hover and visited on paper, and chip text on the wash.
  7.6:1 on paper, 6.7:1 on the wash.
- **Link** (#C72C12): Small text on paper — links, labels, list markers. 5.3:1 on paper.
- **Primary** (#EE3B1B): The 1px section rule, the hero dot, the favicon square, large
  underlines. 3.8:1 on paper, so it is not used for small text. It clears AA for large text
  and for a non-text rule.
- **Light** (#F58A75): Small text and focus on pitch. 8.2:1 on ink.
- **Wash** (#FDE7E2): Chips and text selection on paper. Ink text on the wash.

### Teal
Opposite Safelight on the wheel. Used for code syntax, diagram lines, and info notes.
Never placed beside Safelight at full strength.
- **Deep** (#0F4C52): Info-note labels and links. 9.2:1 on paper.
- **Primary** (#1B7F86): Diagram lines. 4.5:1 on paper.
- **Light** (#7CC4C6): Syntax accents on pitch. 9.9:1 on ink.
- **Wash** (#E3F2F2): Inline code chips on paper.

### Pitch
**Pitch** (#0B0B0B): The footer, the full-viewport menu, and code blocks. The same value as
ink, used as a ground. A code block is that panel at the size of a command. Syntax accents
are the teal ramp on top of the github-dark-dimmed greys; the panel is forced to pitch.
The hero stays paper.

### Named Rules
**The Safelight Rule.** Body copy stays ink on paper, or paper on pitch. Safelight marks
links, hover, focus, selection, the active menu item, small labels, list markers, chips,
and one thin rule. It is not a fill for buttons, cards, or sections, and it never means an
error. #EE3B1B is for graphics and for type large enough to clear 3:1. Small text on paper
uses #C72C12 or #9E1F0B. Small text on pitch uses #F58A75. Teal does the jobs Safelight
does not: a second category would take a teal chip, and code, diagram lines, and info notes
take teal. A component that already carries Safelight does not also carry full-strength teal.
Footage stays a black subject on a light ground. Colour footage is desaturated in CSS.

**The Grain Rule.** A fixed SVG noise field sits over the page at very low opacity, blended
with overlay, so paper and pitch both take a faint analog grain. There is no grid.

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

**The Grey Ladder Rule.** On paper: ink, then graphite for support text. Mist is a rule, not
a text color. On pitch the readable muted step is mist (#BDBDBD). Graphite on pitch fails
small-text contrast and is reserved for rules.

**The Figure Rule.** Every plate is numbered and the number is printed. `Fig. 01` leads the
metadata row on the landing grid, the marquee caption, and the work-page entry; on the work
page the figure also carries a written caption. An unnumbered plate is decoration, which is
the one thing the plates are not.

## Typography

**Display Font:** Geist (with system-ui, sans-serif)
**Body Font:** Geist (with system-ui, sans-serif)
**Label/Mono Font:** Iosevka (with Iosevka Nerd Font, ui-monospace, SFMono-Regular, Menlo, Consolas)

**Character:** One family carrying the whole page, worked at its extremes, in the manner of
a heavy editorial sans. Geist at 700 and about -0.06em tracking is dense at display size —
the heavy stroke and the tight fit are the identity; the same family at 400 and -0.02em is
quiet and highly readable at body size, and at 500 it becomes a control label. The 32px
subhead sits between them at 600. Iosevka is the only foreign voice. It appears as small
tracked uppercase metadata and as code, which keeps it reading as a caption system rather
than as a terminal.

Geist is a self-hosted variable font. One latin file covers weights 100–900 and is
preloaded. A metric-matched Arial fallback holds the line box still until it arrives.
Iosevka is self-hosted at 400 and 500, `font-display: swap`, and those two files are
preloaded. The stack continues through Iosevka Nerd Font, then the platform monos.

### Hierarchy
- **Display** (700, clamp(2.5rem, 5.5vw, 4.5rem), 1.0, -0.06em): The landing hero only. One per site.
  Two hard-broken lines, entering as one block rather than per-character — the heavy weight
  and the tight tracking do the work the stagger used to. Drops to clamp(2rem, 8vw, 4.5rem) below 768px.
- **Headline** (700, clamp(2.5rem, 6vw, 5rem), 0.95, -0.055em): Page titles. The footer brand mark runs a
  wider clamp(2.5rem, 7vw, 6rem) at -0.06em and the menu overlay clamp(2.5rem, 9vw, 7rem) at
  -0.06em, since each owns its whole region.
- **Statement** (700, clamp(28px, 4.4vw, 60px), 1.05, -0.05em): The one centered thesis line on a page.
- **Subhead** (600, 32px, 1.1, -0.04em): `h2` inside long-form prose.
- **Title** (500, 24px, 1.1): Project names and article titles in listings.
- **Control** (500, 11–13px): Pill labels, tags, and buttons. Heavier than that is reserved
  for headings: 600 on the subhead, 700 on display.
- **Lede** (400, clamp(19px, 2vw, 24px), 1.4, graphite): The hero sub-headline and page
  standfirsts.
- **Body** (400, 18px, 1.5): Running prose at every breakpoint — there is no smaller mobile
  body step. Measure capped at 68ch.
- **Label** (mono, 14px, uppercase, 0.1em, Safelight link on paper, Safelight light on pitch):
  Categories, years, counts, and figure numbers. Captions are the same face at 400, set in
  lower case and graphite, and they read as margin notes rather than as labels.

Plate annotation sizes (13 and 15) are **viewBox user units inside the SVG**, not screen
pixels. They scale with the frame and are not a step on this ramp.

### Named Rules
**The Two Extremes Rule.** Type is either very large or very small. Statement and Subhead are
the only steps that sit between Title (24px) and Headline, and both are reserved: Statement for
a page's single thesis line, Subhead for prose `h2`. A page wanting another size in that band
is a page whose hierarchy needs rethinking, not a new step in the scale.

**The Tracking Inversion Rule.** Tracking runs negative as size runs up (-0.06em at display)
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
- **Hover / Focus:** Primary steps to raised ink; ghost fills to ink with paper text. Both
  over 500ms on the house easing. Focus-visible adds a 2px Safelight outline at 3px offset
  (#C72C12 on paper, #F58A75 on pitch).

### Cards / Containers
- **Corner Style:** 8px on grid plates; the asymmetric cycle on marquee plates.
- **Background:** Paper. Plates draw in ink on paper.
- **Shadow Strategy:** None — see Elevation & Depth.
- **Border:** A 1px Rule line around the plate frame, and a second above the metadata row.
- **Internal Padding:** 0 on the plate; 16px above the metadata row.

### Long-form prose
Reading pages narrow the shell to 860px so the head and the 68ch column read as one
document rather than a text block pinned to the left of a 1600px page.

- **Code blocks:** Shiki highlights at build time with a pitch theme derived from
  `github-dark-dimmed`. Chromatic tokens are moved onto the teal ramp so a listing never
  sets Safelight next to teal. The panel is pitch (#0B0B0B), forced over the theme
  background, at an 8px radius, with a copy control that copies the plain listing. Every
  text token clears 4.5:1 on pitch. Every fence carries a language tag. Inline code is a
  teal wash chip with ink text.
- **Data tables:** header row in 13px mono uppercase Safelight over a 1px ink rule; body rows
  separated by 1px Rule lines with the last row unruled. Figures are set
  `tabular-nums lining-nums` so columns align. The table scrolls inside itself rather than
  widening the page.

### Navigation
Fixed to the top at `z-index: 50`, `pointer-events: none` on the bar itself and `auto` on the
controls, so it never swallows a click meant for the hero. Left group: the name "Yojan Gautam"
at 15px / 600 — the name is the mark, and there is no monogram — an ink Menu pill whose knob rotates 45° to a close glyph,
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
- **Do** set labels in 14px mono, uppercase, 0.1em tracking, in Safelight. Set captions in
  the same face, lower case, in graphite.
- **Do** give the marquee plates their three-card asymmetric radius cycle; the irregularity is
  the point.
- **Do** gate the custom cursor behind `(hover: hover) and (pointer: fine)` and collapse every
  animation under `prefers-reduced-motion: reduce`.
- **Do** let sections breathe at `clamp(96px, 12vw, 200px)`.

### Don't:
- **Don't** fill a region with Safelight or teal, set body copy in either, or put the two at
  full strength side by side. See The Safelight Rule. Don't use Safelight to mean an error.
- **Don't** use a border heavier than 1px anywhere.
- **Don't** add a `box-shadow`; this system has no elevation vocabulary.
- **Don't** use the platform's default easing (`ease`, `ease-in-out`, `linear` for anything but
  the marquee track).
- **Don't** let mono type run longer than a short label — it is a caption voice, not a body
  voice.
- **Don't** reintroduce the retired terminal world: no window chrome, no prompt glyphs, no
  status LEDs, no blueprint grid, no theme toggle.
