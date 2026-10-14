---
layout: ../../../layouts/DocPage.astro
title: Getting started
description: Run ARGOS against Zorvane. Rust tests run anywhere. The app needs a Mac with Xcode.
kicker: ARGOS
manualHref: https://super-yojan.dev/ARGOS/
manualLabel: ARGOS manual
repoHref: https://github.com/Super-Yojan/ARGOS
repoLabel: ARGOS repository
---

Rust tests run anywhere. The app needs a Mac with Xcode. Start Zorvane on `tcp/127.0.0.1:7447`. In ARGOS, set the prefix to `terra/rover` and the anchor to 38.8297, −77.3075.

The screenshots are a geographic simulator run from 2026-10-06. They are not a physical rover.

<figure>
<img src="/media/argos/macos-dashboard.jpg" alt="ARGOS on macOS during a geographic simulator run, with a rover pose and an accepted goal." width="1200" height="910">
<figcaption>Mac dashboard. Simulator run, 2026-10-06. A rover on the map, and a goal ARGOS has accepted.</figcaption>
</figure>

<figure class="shot-phone">
<img src="/media/argos/ios-dashboard.jpg" alt="ARGOS in the iOS simulator, with a fleet list and a cancelled goal." width="1170" height="2532">
<figcaption>The same session shape in the iOS simulator, after a waypoint run. The goal is cancelled.</figcaption>
</figure>

## Start Zorvane

[Zorvane](/docs/zorvane/running) is the world. Clone it with Git LFS. The geographic demo uses the bundled GMU anchor.

```sh
cd /path/to/Zorvane
TERRA_ROVER_COUNT=1 TERRA_TILES=1 TERRA_TILES_FETCH=0 cargo run -p zorvane
```

## Connect and send a waypoint

In ARGOS, open **Connection**.

| Field | Value |
| --- | --- |
| Endpoint | `tcp/127.0.0.1:7447` |
| Prefix | `terra/rover` |
| Geographic map | on |
| Anchor | 38.8297, −77.3075 |

Select the rover. Choose **Waypoint**. Send 38.82981, −77.3075. You should see the token, then active, then arrived. Cancel, and wait for idle.

Flat world: turn geographic mode off and type local metres. +x is north. +y is west.

The bus does not advertise the anchor. If the numbers disagree, the goal lands on the wrong patch.

## Mission smoke

Keep this off the interactive simulator. Use a second port.

```sh
TERRA_MISSION=1 TERRA_ZENOH_LISTEN=tcp/127.0.0.1:7448 cargo run -p zorvane
cargo run -p argos-zenoh --example mission_smoke -- tcp/127.0.0.1:7448
```

The example walks autonomy levels, a waypoint, a supervised approval, fleet takeover, and fleet stop. Run it alone. The UI test wants that same port.

## Rust checks

Edition 2024, Rust 1.85 or newer. These checks do not need the simulator.

```sh
cargo test --workspace --locked
cargo fmt --all -- --check
cargo clippy --workspace --all-targets --locked -- -D warnings
```

## Build the app

macOS 14 or newer. iOS 17 or newer. Apple Silicon slices for Mac, device, and simulator. A device build needs your signing team.

```sh
rustup target add aarch64-apple-darwin aarch64-apple-ios aarch64-apple-ios-sim
gem install xcodeproj
./scripts/build-apple.sh
open apps/apple/ARGOS.xcodeproj
```

Open scheme **ARGOSMac** or **ARGOSiOS**. Allow local network on the phone. The Mac target already has outgoing network.

```sh
./scripts/check-swift.sh
```

That script needs the geographic Zorvane demo already running. Regenerate the Xcode project only when sources change, with `ruby scripts/create-apple-project.rb`.

The rest of the manual, including Zenoh keys and deployment, stays at [super-yojan.dev/ARGOS](https://super-yojan.dev/ARGOS/).
