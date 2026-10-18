# 3 ground vehicles, 1 person

## Mechanical

- **3 dumpers**
  - Define the goals
  - **Mechanical dumper.** A hinged flap, pushed by the bucket rim, on a rail guide.
  - **No bucket vision.** The flap removes the need to see the bucket.
  - Robust structure
  - The dumper covers the phone mount, and the forces from the phone mount
  - Drivetrain changes necessary?
- **Offense.** Define the needs. Unassigned.
- **Vibration mitigation**
  - Phone-mount dampers this week. James.
  - The whole structure comes later
- **Fabrication**
  - Plasma cutting is on hold
  - Laser cutting through James, not MIX

## Algorithm

- **Auto routines.** What is necessary.
  - Waypoint
  - Search, then CV of the balls, then collect
  - **Dump (stretch).** <a class="node-jump" data-target="No bucket vision" href="#bucket-vision">CV of the bucket</a>, then dump.
  - Tested in sim, then on the phone
- **Separately**
  - 4 working bots
  - Fix local positioning errors

## C3 station. Yojan

- **ONE station.** One C3, not multiple versions.
- **Design**
  - Human needs, from a survey
  - **Simplicity.** Select, take control, arm, level, click, review, send. Too many steps.
  - **Camera.** Visuals depend on the autonomy level. Needed at L0–L1, and on fallback.
- **Recommendation system.** It <a class="node-jump" data-target="Hypothesis" href="#hypothesis">recommends a level per vehicle</a>.
  - Inputs: balls held, balls scored, battery life, and the mission

## Experiment

- **Dr. Yao.** The independent variable is autonomy level.
- **Single C3.** Not multiple C3 versions. <a class="node-jump" data-target="ONE station" href="#one-station">One station.</a>
- **Hypothesis.** The recommendation system helps, or hurts, one person controlling a fleet.
- **A fleet, not a swarm.**
- **Testers.** Random psychology participants, with no engineering background.

## Owners panel. Week of 10/19–10/25

- **Kaichen.** CT scoring and structure, and the <a class="node-jump" data-target="Mechanical dumper" href="#dumper">mechanical dumper</a>.
- **James.** <a class="node-jump" data-target="Vibration mitigation" href="#vibration">Phone-mount dampers</a> this week.
- Organization, supplies, and the bill of materials
- **Lucas L**
  - Run the sim locally with C3
  - Import the new CT model into the sim
  - **Flap-opening physics.** <a class="node-jump" data-target="Mechanical dumper" href="#dumper">The hinged flap.</a>
- **Lucas S.** <a class="node-jump clash" data-target="ONE station" href="#one-station">3 different models</a>. **Confirm.**
  - Human survey
  - Write up 3 different C3 models
- **Patrick.** Complete the previous assignment.
- **Aaron.** Replicate the shooter.
