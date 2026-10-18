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
  - **Level picker:** L0-L5 (L5 unavailable). Labels map onto Terra's named modes on the <a class="ladder-jump node-jump" data-target="Autonomy ladder" href="#autonomy-ladder">autonomy ladder</a>.
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

## Competition

- **Goal:** collect tennis balls from a soccer field and dump them into a Home Depot bucket
- **Baskets:** ground level, and 1 m high. The higher bucket needs shooting, not dumping.
- **Size rule:** a 36 cubic inch limit, enforced at the start. Nothing may extend above it.
- **Collection:** passive. The robot drives over the balls. A human at the pit loads them into the dumping mechanism, and a servo opens to dump all of them.
- **Current approach:** drive a set pattern, or human-set waypoints. No ball detection yet.
- **Adversaries:** opponents can attack you, and you can attack them. Defense-bot and attack-bot roles. Opponents can shoot tennis balls. A ball that lands on a bot disables it for 15 minutes.
- **Match:** ideally 90 minutes, in 45-minute halves. The experiment uses one half.
- **Scoring:** only balls in the basket count. No points for disabling opponents.
- **Team:** six people. Two want software and four are on hardware. Software assignments are not decided, and the team started recently.
- **Phone:** the iPhone is a day-to-day phone, not dedicated to the robot. The minimum requirement is LiDAR. VLM performance depends on the iPhone model.

## Open questions

- **L4 search target.** On the <a class="node-jump" data-target="L4 Search" href="#l4">L4</a> rung.
- **L5 decision logic.** On the <a class="node-jump" data-target="L5 Decide" href="#l5">L5</a> rung.
- **Power-sharing** between the phone and the chassis battery. See <a class="node-jump" data-target="Power:" href="#power">Power</a>.
- **Software assignments** are not decided. See <a class="node-jump" data-target="Team:" href="#team">Team</a>.
