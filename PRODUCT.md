# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: technical hiring managers, graduate advisors and lab collaborators, and prospective
engineering partners who land on this site after seeing a résumé, a paper, a GitHub profile,
or a Glid listing. They arrive with a specific question — "is this person's work real, and how
deep does it go?" — and they are scanning fast, often on a phone, often between other tabs.

Secondary: engineers who arrive from the blog for a specific technical answer (BLDC motor
modeling, control theory) and may stay to find out who wrote it.

## Product Purpose

A personal portfolio for Yojan Gautam that establishes credibility across an unusually wide
technical range — analog and FPGA work at the bottom, shipped consumer apps at the top — and
converts that credibility into contact. Success is a visitor who understands the range within
one viewport and reaches the projects, the blog, or the email link.

## Positioning

Full-spectrum: the same person wrote the VHDL for a 5-stage pipelined MIPS processor and
shipped a published iOS/Android app on a Rust backend. Most portfolios in this space cover one
layer. The claim a neighboring portfolio could not truthfully copy is the vertical span —
bare metal to consumer — evidenced by competition records and shipped artifacts rather than
skill-bar graphics.

## Operating Context

Astro 5 static site, built to `dist/` and hosted at super-yojan.dev via GitHub Pages.
Content: two long-form engineering posts in `src/content/blog/` authored in Markdown, using
remark-math + rehype-katex for equation rendering. Six catalogued projects. Routes: `/`,
`/projects`, `/blog`, `/blog/[slug]`, `/about`, plus `/rss.xml` and a sitemap.

## Capabilities and Constraints

- Static output only — no server runtime, no database, no forms that post anywhere.
- KaTeX math rendering must keep working on blog posts.
- RSS feed and sitemap must keep working.
- Existing route URLs must not change; they are linked externally.
- Project data lives in `src/data/projects.ts` as a typed array shared by the landing grid, the marquee, and the work page.

## Brand Commitments

- Name: Yojan Gautam. Domain: super-yojan.dev.
- Links: github.com/Super-Yojan · linkedin.com/in/yojan-gautam · youtube.com/@Super-Yojan ·
  hi@super-yojan.dev
- The user pinned a binding visual brief on 2026-08-12: a bold editorial studio style, strict
  black-and-white palette, Inter typography, custom difference-blend cursor, marquee, and
  cubic-bezier(0.16, 1, 0.3, 1) easing. Recorded as binding; see DESIGN.md.

## Evidence on Hand

Real, verified from the repository and the user's own copy:

- Glid — published iOS/Android app; SwiftUI client, Rust/Axum + SurrealDB on GKE. Stated
  300+ DAU, 99.4% uptime, live beta in the DMV region.
- Autonomous blimp — 152–0 competition record; quantized YOLOv5 to ONNX for edge, 150 g
  airframe, decentralized acoustic tracking.
- Raytheon Drone Competition — 1st place; MAVLink autonomy with ArUco marker detection.
- Freedom CTF — built at 17; hosted 200+ international teams, 50k req/s.
- Pipelined MIPS — VHDL, 5-stage, hazard detection and forwarding.
- Graduate research — GMU CIAO Lab, 12-state nonlinear blimp dynamics, look-ahead pitch control.
- Prior embedded work at Databuoy: U-Boot, FPGA, gunshot detection.
- Educational blimp kit designed for 20 students.

**Absent — must not be fabricated:** there is no photography of any kind in this repository,
no headshot, no product screenshots, no testimonials, no press, no client list, and no
pricing. Project imagery is authored black-and-white technical plates, not photographs.
Any future claim of employers, revenue, or user counts beyond the figures above must come
from the user.

## Product Principles

1. **Evidence over adjectives.** Every claim on the site is attached to a number, an artifact,
   or a competition result. No skill bars, no self-rated proficiency.
2. **Show the span, then the depth.** The vertical range is the differentiator; a visitor
   should feel it before they read a single project description.
3. **Preserve the technical record.** Metrics, years, and project facts are load-bearing and
   survive any visual change.
4. **Fast and static.** The site must stay a static build that loads quickly on a phone on a
   bad connection.

## Accessibility & Inclusion

No formal standard was specified by the user. Baseline obligations for this project: keyboard
operability across all interactive elements, visible focus states, honored
`prefers-reduced-motion`, and no interaction that depends on a custom cursor being visible
(the site must remain fully usable on touch and with a standard pointer).
