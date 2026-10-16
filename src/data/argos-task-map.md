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
  - **Where:** ARGOS repo, Mac and iOS, Rust crates via UniFFI
  - **Connects:** Zenoh over TCP via argos-router (port 7448) or a hosted router
  - **Shows:** robots online; position and heading on a 2D/3D scene and map; occupancy grid; 3D point cloud; autonomy level and who has control; waypoint status and suggested targets; motor arm state and battery; target search status
  - **Sends:** goals, level changes, stop/reset, approvals, arm/disarm, teleop; never `cmd_vel`
  - **Not shown:** no camera feed
  - **DualSense:** GameController framework as a generic gamepad; hold L1 as a dead-man switch; left stick drives; 0.12 deadzone; full forward is linear 0.5; teleop at about 10 Hz only when in control and motors are armed; release sends zero; no other buttons are mapped; e-stop, level, and goals are on-screen only
- **Web ARGOS dashboard**
  - **Where:** `codex/browser-dashboard` branch, not in any PR; single commit Oct 15, nine days after the SwiftUI app merged in #5 on Oct 6
  - **Built with:** React and TypeScript in `apps/web/`, Vite, MapLibre; Rust backend `crates/argos-server/` with GitHub sign-in, sessions, and an audit log; Docker and Caddy; GitHub Actions
  - **Connects:** the browser never talks to Zenoh, only to argos-server, which pushes fleet updates about 5 times a second and serves maps once a second; the server uses the same Rust Zenoh client and topics over TCP or TLS; the router is on Tailscale when hosted
  - **Shows:** fleet map (local or geographic); per-robot panel with position and freshness, occupancy grid, autonomy level, and motor arm state
  - **Sends:** send or cancel waypoints, and tune the planner
  - **Level picker:** L0-L5 (L5 unavailable). Labels map onto Terra's named modes on the <a class="ladder-jump" href="#autonomy-ladder">autonomy ladder</a>.
  - **Missing:** no driving, no e-stop, no target search setup, no camera feed (the docs say use the native app); no controller support

## Software details

- **VLM:** runs in the mobile app
- **Sensors:** the phone has all of them: camera, LiDAR, IMU
- **Speed:** no wheel encoders; the phone's VIO odometry
- **Localization:** LiDAR + ARKit, GPS outdoors
- **Maps:** on the fly, and each match starts fresh
- **Autonomy logic:** Rust runs all of it, across 12 crates
- **Zenoh bus**
  - **Format:** every topic is `<prefix>/<robot id>/<name>`. All messages are JSON except `camera/depth` (a JSON header plus raw float pixels).
  - **Pi:** does not use Zenoh, only Bluetooth to the phone. The phone forwards arm/disarm and Pi status.
  - **`teleop`:** joystick input, with a session and a sequence number, sent by ARGOS
  - **`cmd_vel`:** linear and angular, capped at ±2. Simulator only, 20 Hz, valid for 250 ms, then zeros
  - **`autonomy`:** a level change and a token
  - **`safety`:** stop or reset, for one robot or the fleet
  - **`goal` and `goal/decision`:** a waypoint or a cancel; approve, reject, or resume
  - **`hardware`:** arm or disarm the motors
  - **`navigation/settings` and `search*`:** planner tuning and the L4 target search
  - **`autonomy/status`:** assigned, requested, and effective level, plus the safety state
  - **`pose` and `localization`:** x, y, and heading; the ARKit position
  - **`goal/status` and `goal/proposal`:** waypoint progress, and a suggested target
  - **`map/occupancy`:** at most every 200 ms
  - **`pointcloud`:** at most every 500 ms
  - **`hardware/status`:** Pi arm state and battery
  - **`fleet/state`:** robots online
  - **`camera/depth`:** Zorvane to the Simulator and to ARGOS, which keeps only the pose
  - **Timing:** status every 100 ms on a real phone, and it stops if the data is older than 500 ms. Stop commands are never dropped and always run first.
