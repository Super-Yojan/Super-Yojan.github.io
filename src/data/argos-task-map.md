# Goal: Four chassis controlled from one dashboard, 30-minute run.

## Chassis (x4)

### Mechanical

- GoBuilda frame
- Wheels
- Motors
- Phone mount

### Electrical

- Phone as compute
- Motor wiring
- Battery

### Software

- **Dashboard:** React + TypeScript frontend, Rust axum backend. A human sets each rover's autonomy level and assigns tasks.
- **Zenoh router:** connects the dashboard to each rover.
- **Swift app on iPhone:** observes the environment, builds an occupancy graph, and runs a local planner to the assigned waypoint.
- **Autonomy ladder:**
  - **L0** Fully teleoperated — Demo
  - **L1** Assisted teleop: brakes near obstacles — Demo
  - **L2** Waypoint navigation, no obstacle avoidance — Demo
  - **L3** Obstacle-aware navigation: A* on a map, plus DWA for imminent crashes — Demo
  - **L4** Searching without a map — Stretch (research)
  - **L5** VLM on the phone decides actions from the overall fleet goal — Stretch (research)
  - **Demo needs:** L0–L3. **Stretch goals:** L4, L5 (research track).

## Who does what

- **Students (high school interns)** Hardware only: assemble the GoBuilda chassis, wire the motors, mount the phones
- **Yojan** All software: dashboard, Zenoh router, Swift app, autonomy ladder
- ⚠️ **Integration point: phone-to-motor wiring.** This is where hardware and software meet. If a student's wiring is off, the software can't compensate, so the wiring on all four chassis needs a check before the demo.

## Supporting pieces

- Swift dashboard app (teleop, stop-all, takeover, Arm/Disarm): ARGOS #25 / PR #54
- Four phones, each with a distinct ID: ARGOS #43 checklist
- Hosted router on GCP with the `terra/phone` prefix (settled; not the local network)

## Not needed

- 2-hour soak (replaced by the 30-minute run)
- Sensors (everything is on the phone)
- Map merging (Zorvane #8, #10–#14): student learning steps
- VLM research (Terra #49): offline

## Open questions

- The software stack is mostly in Yojan's head. Capture it first.
- PR #54 is blocked on the Mac build check.
- Zorvane #19 is on the critical path.
