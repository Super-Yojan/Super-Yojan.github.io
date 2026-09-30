---
title: "Blimp — Work Archive"
pubDate: 2026-09-30
description: "Organized archive of Yojan Gautam’s blimp work, led by differential drive / Differential Thrust Vectoring, then swing dampening, modeling, thrust modeling, and thrust vectoring."
---

# Blimp — Work Archive

**Compiled:** Wed Sep 30, 2026 (ET)  
**Subject:** Yojan Gautam — lighter-than-air / autonomous blimp projects and research  
**Method:** Evidence only from Drive, Gmail, Notion, GitHub, public web, and box workspace files. Gaps labeled. No invented facts.

---

## Overview

Yojan’s blimp work spans competition autonomy (Defend The Republic / DTR, championship software), CIAO Lab research at George Mason University, senior-design / Sano Blimp productization, ARCup education kits, and ongoing modeling–control work (Differential Thrust Vectoring, pitch swing reduction, thruster characterization).

This archive **leads with differential drive / Differential Thrust Vectoring (DTV)** — the priority control architecture across competition agents, senior-design vehicles, and the pitch-stabilization paper — then covers swing oscillation dampening, blimp modeling, thrust modeling, and thrust vectoring as dedicated threads. Remaining projects, tasks, decisions, and outcomes follow.

**Personal site already features** “Autonomous Blimp” (2023–24) and “Multi-Agent Systems” (12-state nonlinear blimp dynamics) at [super-yojan.dev](https://super-yojan.dev).

### Search coverage / gaps

| Source | Result |
|--------|--------|
| Google Drive | Many blimp research notes, Swing-Reducing paper, thruster characterization, system updates, assets |
| Gmail | Outreach (Freedom HS kits), shared BLIMP / Sano Blimp folders, ICRA/arXiv draft mail, resume threads |
| Notion | Calendar “Work on Blimp Paragraph” (Oct 1, 2026 ET); Glid spec mentions blimp dynamics / thrust vectoring; NEXT curriculum differential-drive material (ground robots, not aerial) |
| GitHub (`Super-Yojan`) | Private: `blimp-actuator`, `Blimp-Connect`, `blimp-simulator`, `Emergent-Behavior-In-Blimp` |
| Web | arXiv:2309.06352; CIAO Lab bio; ARCup organizer page |
| Box workspace | Prior agent materials: electronics diagrams, lessons-learned section, lab PDF text, related phone differential-drive robot |
| User Mac (`ListMachines`) | **Disconnected** — local Documents/Desktop search not possible this run |
| Browser history | **Skipped** (not available without excessive effort) |
| Overleaf live project | **No blimp Overleaf URL found**; Drive Typst/PDF draft used; Drive `overleaf_package` is ECE623 (non-blimp) |
| GitHub private code | Inventoried via MCP `get_file_contents` (actuator, simulator, emergent README); `git clone` HTTPS unauthenticated |

---

## 1. Differential drive (priority thread)

Differential allocation of left/right thrusters (and, in later work, Differential Thrust Vectoring with gimbaled thrusters) is the recurring actuation motif across Yojan’s blimp platforms.

### 1.1 Competition agent (DTR / arXiv 2023)

**Source:** [arXiv:2309.06352](https://arxiv.org/html/2309.06352v1) — *Lighter-Than-Air Autonomous Ball Capture and Scoring Robot* (co-author Yojan Gautam).

- **Decision:** Yaw via **differential drive** using motors/propellers $m_1, m_2$ placed **1000 mm** apart; altitude via $m_3$; forward thrust via $m_4$ to **decouple** yaw from surge.
- **Control:** In search modes, full-throttle spin on $u_2$; when a target is visible, **PD on yaw error** $e_{\text{yaw}}$ using differential drive; PD on vertical error via $u_3$.
- **Outcome:** Documented minimum-viable scoring agent for April 2023 DTR; homogeneous fleet strategy; LinkedIn/CIAO framing credits Yojan with PD programming, electronics maintenance, and performance testing.
- **Kinematic model:** Reduced 2.5D model maps $m_1,m_2$ → yaw $u_2$.

### 1.2 Senior-design / competition flight stack (DifferentialBlimp)

**Source:** Box `/workspace/blimp-paper/lessons-learned-platform-section.md` and Drive doc [Blimp Paper — Lessons Learned from Function Allocation](https://docs.google.com/document/d/1C-YKyzx2S-e0-iTqcpptyM79yK1j7qiA2q3h75c3Gi4/edit).

- **Decision:** Prefer a **differential-drive underactuated blimp** with left/right thrusters and **thrust-vectoring servos**, as in the competition mixer and **DifferentialBlimp** simulation geometry — not a quadrotor-like layout.
- **Rationale:** Two lateral thrusters give yaw + surge within buoyancy limits; maps to the function-allocation lab’s two-propeller scheme; mass budget favors Pi Zero 2 W + Grove Vision AI V2 + custom PCB (PCA9685, IMU/ToF).

### 1.3 Differential Thrust Vectoring (DTV) architecture

**Source:** Drive `Swing-Reducing-Paper.pdf` — *Pitch Stabilization of an Autonomous Blimp Using Onboard Measurements* (Yojan Gautam, Ningshi Yao).

- **Architecture:** Two independently controlled motors with variable thrust; **servo-actuated gimbals** for pitch-plane vectoring; **differential thrust for yaw**.
- **Claimed gap addressed:** Small indoor-capable blimps are usually underpowered/slow; DTV aims for responsive 6-DOF control at low speed where aero surfaces fail.
- **Site metric alignment:** Portfolio “Multi-Agent Systems” blurb cites **12-state nonlinear blimp dynamics** and look-ahead pitch control in Rust ([projects.ts](https://github.com/Super-Yojan/Super-Yojan.github.io/blob/main/src/data/projects.ts)).

### 1.4 Related differential-drive hardware (ground, not aerial)

**Source:** Box `/workspace/xiao-phone-vehicle/` (XIAO ESP32-C3 + 2× N20, primary **DIFF_DRIVE** mode). Educational / phone-vehicle prototype; **not** a blimp airframe, but reuses the same differential-drive command pattern (`M <left> <right>`).

### 1.5 Actuation software supporting differential + servo mix

**Source:** Private GitHub `Super-Yojan/blimp-actuator` (Rust / Zenoh; README dated 2025-11-11).

- Subscribes to `blimp/actuator/controls`; drives **4 motors + 4 servos** via PCA9685 (PWM 1000–2000 µs motors; servo channels for vectoring-capable hardware).
- Workspace config notes elsewhere name packages `thrust-allocator`, `blimp-simulator`, `ObjectFollower`, `blimp-manual` (Drive robot-framework note).

### Differential-drive tasks / outcomes (summary)

| Item | Status (as evidenced) |
|------|------------------------|
| Competition differential yaw + PD | Documented in arXiv; competition deployment Apr 2023 |
| DifferentialBlimp / mixer rationale | Written into lessons-learned platform section |
| DTV pitch paper model | 96% NRMSE fit; underdamped $\omega_n=5.09$ rad/s, $\zeta=0.0198$ |
| `blimp-actuator` node | Repo present; ESC arming + Zenoh commands |
| Xiao phone vehicle DIFF_DRIVE | Firmware/docs on box; separate from blimp airframe |

---

## 2. Swing oscillation dampening

### Problem (observed across sources)

- Function-allocation lab PDF (box `blimp-lab-full.txt`): gondola/mass distribution makes the blimp behave like a **natural pendulum** with **no control surface to dampen oscillation**.
- Swing-Reducing paper: gondola thrust below center of buoyancy creates pitch-up moment → **unstable feedback** and **sustained oscillations** without active control; open-loop settling $\approx 40$ s given $\zeta \approx 0.0198$.

### Work found

| Artifact | What it contains |
|----------|------------------|
| Drive `Swing-Reducing-Paper.pdf` / `.typ` | Full pitch-dynamics model, ID, linearization, control recommendations (PID / LQR / MPC / **thrust vectoring**) |
| Drive `20251125T234855--swing-reduction__blimp_research_swingreduction.html` | Quarto/digital-garden export of swing-reduction research |
| Drive motor/thruster notes under path `…/Swing-Reducing/Experiments/MotorData` | Local Mac path referenced in notebooks (Mac offline this run — files not re-read from disk) |
| Existing blog post | [Modeling Motor Thrust…](https://super-yojan.dev/blog/bldc-motors/) ties BLDC rise-time delay to blimp/drone stability |

### Decisions / outcomes

- **Decision:** Treat pitch as highly underdamped second-order plant; prioritize **active damping** via feedback (and eventually gimbal vectoring), not passive aero surfaces.
- **Outcome (modeling):** Free-response simulation matches experiment at **96%** fit; natural frequency **0.81 Hz**.
- **Outcome (control):** Paper’s future-work list includes onboard PID/state-feedback implementation and **with/without gimbal** comparison — **controller flight results not found as completed** in searched sources (gap).

### Gap

No separate Drive/Notion page titled solely “swing dampening controller results” with closed-loop flight metrics was found beyond the paper’s modeling + planned controller work.

---

## 3. Modeling of the blimp

### Competition kinematic model

arXiv reduced model (position + yaw + altitude); explicitly noted as **not** a high-fidelity dynamic model — used to frame PD modes.

### Pitch / DTV dynamic model (primary research thread)

From Swing-Reducing paper:

- Frames: inertial, body (origin at center of buoyancy/volume), gondola (IMU + thrust).
- Pitch EOM about CM: inertia, aero damping $b\dot\theta$, buoyancy–gravity restoring $d_{VM} mg \sin\theta$, thrust torque with lever $(d_{VT}-d_{VM})f(u)$.
- Geometry: ellipsoid $a,b,c$; $d_{VT}\approx 0.300$ m; mass via buoyancy equilibrium $\approx 0.187$ kg.
- $I_{CM}$, $d_{VM}$ from SolidWorks then refined by ID.
- Linearized state-space; poles yield $\omega_n=5.09$ rad/s, $\zeta=0.0198$.

### Other modeling artifacts (Drive)

| File | Role |
|------|------|
| `20251112T173626--blimpmodel__blimp.typ` / `.html` | Digital-garden blimp model note |
| `blimp-dynamics.qmd` | Dynamics notebook (mime blocked for plain `read_file_content`; present in Drive) |
| `mathematical-model.qmd` / `.html` | Mathematical model export |
| `20251124T220948--pitch-data-analyze__…` | Pitch data analysis garden page |
| Private `blimp-simulator` | Rust simulator package (paired with thrust-allocator in robot.toml design) |

### Robot framework modeling/integration design

Drive `20251113T164930--robotframework__blimp_research_robot.md`: Zenoh-based `blimp-workspace` with packages `thrust-allocator`, `blimp-simulator`, `actuator`, etc.; author `ygautam2@gmu.edu`. Phase checklist shows MVP CLI items checked; Zenoh integration and later phases largely unchecked (design-forward).

### Gap

Full 12-state nonlinear multi-agent model source code was **not** opened in this pass (private repos / local Mac). Portfolio text asserts the work; cite as **portfolio claim** pending deeper repo read.

---

## 4. Thrust modeling

### Steady-state force vs PWM

Drive thruster characterization (`20251204T103847--thruster-characterization__…`):

- Sweep PWM **1000–2000 µs**; fit **asymmetric cubic + quadratic** about neutral 1500 µs (separate forward/reverse coeffs for blade asymmetry).
- Example fitted constants reported in notes:  
  $k_\text{pos}=-1.77\times10^{-8}$, $b_\text{pos}=1.09\times10^{-5}$,  
  $k_\text{neg}=1.37\times10^{-8}$, $b_\text{neg}=-7.22\times10^{-6}$.

### Transition / rise-time dynamics

- First-order: $F(t)=F_\text{final}+(F_\text{init}-F_\text{final})e^{-t/\tau}$.
- Metrics: $\tau$, rise $t_{10–90}\approx 2.2\tau$, settle $\approx 4\tau$, zero-crossing time on reversals.
- Empirical asymmetry: e.g. Full Fwd→Full Rev $\tau\approx 1114$ ms vs Full Rev→Full Fwd $\tau\approx 514$ ms (table in notes / blog).
- Linear models: Fwd→Rev $\tau(\text{ms})=1.7084\,\Delta\text{PWM}-593.96$; Rev→Fwd $0.5459\,\Delta\text{PWM}-31.46$.
- Motor-modeling note: rise $\sim 0.5$ s → $\tau\approx 0.227$ s; Python sim vs `thrust_vs_time.csv`.

### Public write-up

Blog already published: [Modeling Motor Thrust: Why BLDC Systems Have a Rise Time Delay](https://super-yojan.dev/blog/bldc-motors/) (2025-12-17) — same thruster tables and first-order model.

### Swing paper thrust section

Load-cell stand (0–100 g), CW/CCW characterization, nonlinear $f(u)$ into pitch EOM — consistent with the Drive characterization pipeline.

### Gap

Raw CSV datasets live under Mac path `…/Swing-Reducing/Experiments/MotorData` (referenced in notebooks); **not accessible** while Mac is disconnected.

---

## 5. Thrust vectoring

### What was found

1. **DTV paper:** Servo gimbals vector thrust in the **pitch plane**; differential thrust for yaw; future work explicitly lists thrust-vectoring control strategies and with/without gimbal comparison.
2. **Lessons-learned section:** Senior-design vehicle includes **thrust-vectoring servos** alongside differential thrusters (Competition mixer / DifferentialBlimp).
3. **`blimp-actuator`:** Hardware path for **4 servos** (channels 4–7) plus 4 ESCs — necessary substrate for vectoring + differential mix.
4. **Notion (Glid archive spec):** Mentions experience with “blimp dynamics, **thrust vectoring** control, sensor fusion (OptiTrack/IMU)” as transferable skill language — not a thruster-design doc itself.

### Decisions

- Vector direction rather than only magnitude → control at low airspeed.
- Keep mass low: servos on gondola rather than large aero surfaces.

### Gap

No searched source showed a completed closed-loop **thrust-vectoring controller flight report** with metrics; evidence is architecture + actuation software + planned experiments.

---

## 6. Other projects, tasks, decisions, outcomes

### 6.1 Autonomous competition / research software

- Co-author on DTR scoring-agent paper; YOLOv5/Coral perception pipeline documented in arXiv appendix.
- Portfolio: quantized YOLOv5→ONNX on ~150 g airframe; **152–0** competition record claim on [super-yojan.dev](https://super-yojan.dev).
- Private repos: `Emergent-Behavior-In-Blimp` (created Dec 2023), `Blimp-Connect` (Flutter/Bluetooth app tree `namer_app`, 2025), `blimp-simulator`, `blimp-actuator`.

### 6.2 Sano Blimp / education product

- Gmail (2024-02-18): shared presentation **“Senior Design: Sano Blimp”**.
- Gmail (2024-08-21): Laghima shared Drive folder **“BLIMP”**.
- Gmail (2024-09-04): Outreach to Freedom HS teachers to place **blimp kits** in curriculum; product URL `https://sano-blimp.web.app/`; self-described co-founder.
- Drive: **Blimp System Update Announcements** (Jul 7 & Jul 20, 2025) — Pi image flash, web terminal (`tilde`), PS4/BLE UI redesign, holographic joystick HUD; assets folder [Blimp-Assets](https://drive.google.com/drive/folders/1-DcvBWs7becYWvGiDrIMTASt9sECtVdo).
- Drive: `BlimpBLE.swift`; electronics diagrams on box (`BlimpElectronics.png`, `BlimpSideView.png`, `SanoPilot.png`).

### 6.3 HRI / function-allocation lab

- Co-author Yang et al. function-allocation blimp lab (NASA-TLX; manual 65% vs autonomy 46.1% success). Pendular dynamics and soft indoor platform rationale feed senior-design electronics choices.

### 6.4 ARCup / CIAO Lab

- [ARCup about](https://arcup.ai/about): Yojan listed as PhD-student organizer.
- [CIAO Lab members](https://ciaolab.org/member/): blimp research since Spring 2023; interests include online learning-based modeling/ID and LTA hardware+software.

### 6.5 Calendar / writing

- Notion Calendar: **“Work on Blimp Paragraph”** — Thu Oct 1, 2026, 4:00–7:00 PM ET (stored as 8:00–11:00 PM UTC).

### 6.6 Paper logistics

- Gmail 2023-09-12: Joseph Prince Mathew circulated **ICRA and arXiv** drafts to `ygautam2@gmu.edu` et al.

---

## 7. Decisions (cross-cutting)

1. Prefer **underactuated differential (+ vectoring)** LTA over multirotor for indoor HRI/competition safety and endurance.
2. **Decouple** yaw vs forward thrust with dedicated motors when mass allows (DTR $m_4$).
3. Move from motion-capture-dependent demos toward **onboard IMU-only** pitch stabilization (Swing-Reducing paper motivation).
4. Characterize thrusters with **load-cell + asymmetric polynomials + first-order τ**, then publish educational write-up.
5. Productize classroom kits (**Sano Blimp**) with Pi-based control stack and mobile BLE UI.
6. Build a Zenoh/`robo` workspace rather than full ROS for distributed blimp packages (design doc; partial implementation).

---

## 8. Outcomes (cross-cutting)

| Outcome | Evidence |
|---------|----------|
| Published competition design paper | arXiv:2309.06352 |
| Championship / record claims on personal site | super-yojan.dev projects |
| Pitch model 96% fit; underdamped ID | Swing-Reducing-Paper.pdf |
| Thruster steady-state + transition models | Drive characterization notes + blog |
| Kit outreach + Sano site | Gmail + sano-blimp.web.app |
| Software releases for classroom blimps | System update announcements Jul 2025 |
| Actuator/simulator/connect codebases | Private GitHub repos |
| Ongoing thesis/writing | Calendar blimp paragraph; CIAO PhD bio |

---



---

## Source deep-dive: GitHub (`Super-Yojan`)

Account: **Super-Yojan** (drMoscovium). Code search returned **0** indexed hits (private repos often excluded from code search). Repository search found **4** private blimp repos; issues search **0**.

### `blimp-actuator` (Rust, Dec 2025)
- Zenoh subscriber → PCA9685 I2C; **4 ESCs + 4 servos** (channels 0–3 motors, 4–7 servos).
- Motor PWM **1000–2000 µs** @ 60 Hz; servo **500–2500 µs**; ESC arming sequence (max→min→neutral).
- Supports blimp hardware v1/v2 addressing; emergency stop to mid/neutral.
- **Relevance:** Hardware path for **differential motors + thrust-vectoring servos**.

### `blimp-simulator` (Rust, Dec 2025) — read `src/main.rs`
- Implements pitch dynamics matching the Swing-Reducing paper coefficients:  
  `θ̈ = -0.201 θ̇ - 25.9 θ - (-49.1) f_pitch` with `f_pitch = m1 + m2`.
- **ThrustModel** with **transport delay** (default **0.5 s**) via PWM command buffer; separate CW/CCW piecewise-linear PWM→thrust maps with deadzone ~1450–1550 µs.
- RK4 integration @ **50 Hz**; Zenoh topics `blimp/sim/controls` → `blimp/sim/pose`.
- **Relevance:** Direct software embodiment of **modeling + thrust modeling + differential pitch actuation**.

### `Blimp-Connect` (C++/Flutter tree, Mar–Jun 2025)
- Branch `bluetooth_test`; Flutter `namer_app` present — mobile BLE connect companion (pairs with system-update announcements).

### `Emergent-Behavior-In-Blimp` (Dec 2023)
- README: run MuJoCo `./simulate ../model/scene.xml` from `build/bin/` — multi-agent / emergent behavior sim (Makefile project).

### Public site repo
- `Super-Yojan/Super-Yojan.github.io` — Astro site; already lists Autonomous Blimp + Multi-Agent (12-state) projects; blog post `bldc-motors.md` documents thruster τ models.

---

## Source deep-dive: Google Drive

Thorough `search_files` hits (non-exhaustive of duplicates):

| Cluster | Examples |
|---------|----------|
| Pitch / swing paper | `Swing-Reducing-Paper.pdf`, `Swing-Reducing-Paper.typ`, swing-reduction garden HTML |
| Thrust / motor | thruster-characterization md/html, motor-modeling md/pdf, `motor-models.qmd`, `How to Calculate & Measure Propeller Thrust.html` |
| Dynamics / model | `blimp-dynamics.qmd`, `mathematical-model.qmd`, `blimpmodel` typ/html, pitch-data-analyze |
| Product / ops | Blimp System Update Announcements, Blimp-Assets, BlimpBLE.swift, fig-01-blimp.svg |
| Framework | robotframework blimp research md/html |
| Lessons learned | Google Doc *Blimp Paper — Lessons Learned from Function Allocation* |
| Folders | QuadBlimp, Blimp-Assets, BLIMP (shared) |
| Overleaf export | `overleaf_package/` + zip — **see Overleaf section (not blimp)** |

Local Mac paths referenced inside Drive notebooks (e.g. `…/Swing-Reducing/Experiments/MotorData`) were **not** re-read (Mac disconnected).

---

## Source deep-dive: Overleaf / paper drafts

### What was searched
- Gmail: `from:overleaf.com`, `overleaf.com/project` → **no threads**.
- Drive: title/fullText `overleaf` → `overleaf_package.zip` / folder with `main.tex`.
- Notion: no Overleaf project URL for a blimp paper.
- Web: no public Overleaf link for Yojan’s pitch-stabilization draft.

### Drive `overleaf_package` (read `main.tex`)
- **Not a blimp paper.** Title: *A Decentralized Recycling-Driven Dynamic Budget Allocation* — authors Rajul Kumar and **Yojan Gautam**, **ECE 623 Project Report**.  
- **Do not treat as Blimp source content.**

### Blimp paper draft actually found (Drive, Typst — not live Overleaf URL)
- **`Swing-Reducing-Paper.typ`** + compiled **`Swing-Reducing-Paper.pdf`** — IEEE Typst template (`@preview/charged-ieee`).
- Title: *Pitch Stabilization of an Autonomous Blimp Using Onboard Measurements* — **Yojan Gautam**, **Ningshi Yao** (GMU).
- Content covers DTV (differential + gimbal vectoring), pitch EOM, thrust characterization, system ID (avg **96.04%** NRMSE across 7 free-oscillation trials), linearization ($\omega_n=5.09$, $\zeta=0.0198$), control recommendations.
- **Gap:** No authenticated Overleaf project URL located this run. Draft is archived on Drive (and mirrored under `/workspace/blimp-archive/`). Live Overleaf login via browser was not completed.


## Sources (links where real)

### Public

- https://arxiv.org/abs/2309.06352 / https://arxiv.org/html/2309.06352v1  
- https://super-yojan.dev  
- https://super-yojan.dev/blog/bldc-motors/  
- https://ciaolab.org/member/  
- https://arcup.ai/about  
- https://sano-blimp.web.app/  
- https://github.com/Super-Yojan/Super-Yojan.github.io  

### Google Drive (examples)

- [Blimp Paper — Lessons Learned…](https://docs.google.com/document/d/1C-YKyzx2S-e0-iTqcpptyM79yK1j7qiA2q3h75c3Gi4/edit)  
- [Blimp System Update Announcements.md](https://drive.google.com/file/d/1HUt1m43e28ek7FzIWZhkiuYDK3LOZXy4/view)  
- [Thruster characterization md](https://drive.google.com/file/d/14qhE-wq_saxHaS1_sdJXmTYcqHFZgUyN/view)  
- [Swing-reduction garden HTML](https://drive.google.com/file/d/1t5GSTvxUzRPIhJN7jxbRevXhIla90PYt/view)  
- [Robot framework research md](https://drive.google.com/file/d/1CMI4Y-ttdxL-g4wHjjlMsfFGfglOiAij/view)  
- [Blimp-Assets folder](https://drive.google.com/drive/folders/1-DcvBWs7becYWvGiDrIMTASt9sECtVdo)  
- Swing-Reducing-Paper.pdf (Drive id `19vjKXSWSDGkQrPrJD0XLUMSuJ1gRtWSH`; local copy under this archive folder)

### Gmail threads (view URLs)

- Freedom HS kit outreach (Cunningham): thread `191bf3d774201079`  
- Senior Design: Sano Blimp share: `18dbe5dfec4274a0`  
- BLIMP folder share: `19175be2019f6243`  
- ICRA/arXiv drafts: `18a89fd3fba6e5e0`  

### GitHub (private; metadata only here)

- `Super-Yojan/blimp-actuator` — Zenoh PCA9685 actuator node  
- `Super-Yojan/blimp-simulator` — blimp simulator research code  
- `Super-Yojan/Blimp-Connect` — Bluetooth/mobile connect app  
- `Super-Yojan/Emergent-Behavior-In-Blimp`  

### Box workspace

- `/workspace/blimp-archive/` (this document)  
- `/workspace/blimp-paper/lessons-learned-platform-section.md`  
- `/workspace/blimp-electronics/`  
- `/workspace/blimp-lab/` + `blimp-lab-full.txt`  
- `/workspace/xiao-phone-vehicle/` (related differential-drive car)

### Explicit gaps

- User Mac offline → no live search of `Documents/Research Projects/Swing-Reducing/…`  
- Browser history not searched  
- Closed-loop swing-dampening / thrust-vectoring **flight result reports** not found  
- Full text of private simulator / Emergent-Behavior repos not fully inventoried beyond listings/READMEs

---

## Publish status (this run)

| Destination | Status |
|-------------|--------|
| Box | `/workspace/blimp-archive/blimp-work-archive.md` |
| Google Drive (Markdown) | [Blimp Work Archive.md](https://drive.google.com/file/d/1JoTsHQxrC9_SJ55guDVqXGX9qC5bqpsE/view) |
| Notion draft | [Blimp — Work Archive](https://app.notion.com/p/3eb15222a7158119b6a6e8136785af84) |
| Personal site blog | **Prepared locally** on branch `add/blimp-work-archive` in `/workspace/site-blimp-pub`; **`git push` blocked** (no GitHub credentials / `gh` not logged in on the box). Intended live URL after push+merge: https://super-yojan.dev/blog/blimp-work-archive/ |
| Google Doc (compiled summary) | https://docs.google.com/document/d/100QhIKhGDmQcH11pzqJ4XHgVpcRyknuTkJKE68R3TQs/edit |
| GitHub issue (push instructions) | https://github.com/Super-Yojan/Super-Yojan.github.io/issues/2 |
