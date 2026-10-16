# ARGOS

## Hardware

- Chassis stability
- Crash-proofing
- Design principles
- **Two chassis**
  - **Small, 3D-printed:** fits tight spaces, no suspension
  - **Bigger:** more payload, a scoring mechanism
- Both have a Pi
- Fixed phone mount
- **Power:** DeWalt 20V lithium-ion chassis battery; option to charge the phone; power-sharing undecided
- **Safety:** physical e-stop disconnects battery power (manual power cycle); remote kill switch designed but unused

## Autonomy ladder (canonical L0-L5)

- **L0** Fully teleoperated
- **L1** Teleop with assistance (for example, an obstacle stop)
- **L2** Waypoint without obstacle avoidance
- **L3** Waypoint with obstacle avoidance
- **L4** Search on its own
- **L5** Decide the best thing given all conditions
- **Current implementation (code)**
  - `Teleop`
  - `AssistedTeleop`
  - `Waypoint`
  - `WaypointDirect`
  - `Supervised`
  - `TargetSearch`
- **Open questions**
  - L4 search target
  - L5 decision logic

## Software

- **Phone:** Swift, custom Rust, and a UniFFI bridge. The phone is the main brain.
- **Pi:** overkill, kept from prior work
  - Takes motor commands over Bluetooth and relays them to the motor controller, because the phone can't generate PWM
  - `terra-motors` exists, but nothing uses it. Python on the Pi drives the Fusion HAT
  - The Pi doesn't use Zenoh. The phone forwards arm/disarm and Pi status over Bluetooth
- **Native ARGOS dashboard (SwiftUI)**
  - **Where:** ARGOS repo, Mac + iOS app on Rust crates via UniFFI
  - **Connects:** Zenoh directly over TCP via argos-router (port 7448) or a hosted router
  - **Shows:** robots online; position/heading on 2D/3D scene + map; occupancy grid; 3D point cloud; autonomy level + who has control; waypoint status + suggested targets; motor arm state + battery; target search status
  - **Sends:** goals, level changes, stop/reset, approvals, arm/disarm, teleop; never `cmd_vel`
  - **Not shown:** no camera feed
  - **DualSense:** Apple GameController framework as generic gamepad; hold L1 dead-man switch; left stick drives; 0.12 deadzone; full forward = linear 0.5; teleop ~10 Hz only when in control and motors armed; release sends zero; no other buttons mapped; e-stop/level/goals are on-screen only.
- **Web ARGOS dashboard**
  - **Where:** `codex/browser-dashboard` branch of ARGOS, not in any PR; single commit Oct 15, nine days after the SwiftUI app merged in #5 on Oct 6
  - **Built with:** React + TypeScript front end in `apps/web/`, Vite, MapLibre maps; Rust backend `crates/argos-server/` serves it, handles GitHub sign-in, sessions, audit log; Docker + Caddy hosting; GitHub Actions workflow
  - **Connects:** browser never talks to Zenoh, only to argos-server; server pushes fleet updates ~5x/s and serves maps 1x/s; server uses the same Rust Zenoh client and topics as the native app over TCP or TLS; router over Tailscale in the hosted setup
  - **Shows:** fleet map (local or geographic); per-robot panel with position + freshness, occupancy grid, autonomy level, motor arm state
  - **Sends:** send/cancel waypoints, planner tuning; level picker labeled L0-L5 (L5 unavailable), mapped onto Terra's named modes
  - **Missing:** no driving, no e-stop, no target search setup, no camera feed (docs say use the native app); no controller support.

## Software details

- **VLM:** runs in the mobile app
- **Sensors:** the phone has all of them: camera, LiDAR, IMU
- **Speed:** no wheel encoders; the phone's VIO odometry
- **Localization:** LiDAR + ARKit, GPS outdoors
- **Maps:** on the fly, and each match starts fresh
- **Autonomy logic:** Rust runs all of it, across 12 crates
