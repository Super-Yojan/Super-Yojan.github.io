export type PlateKey =
    | "glid"
    | "blimp"
    | "drone"
    | "ctf"
    | "mips"
    | "multiagent"
    | "terra"
    | "argos"
    | "zorvane";

export type Project = {
    index: string;
    slug: string;
    title: string;
    category: string;
    year: string;
    /** One line for the grid. Full sentence, no trailing period stacking. */
    blurb: string;
    /** Longer body for the projects index. */
    detail: string;
    metrics: { value: string; label: string }[];
    stack: string[];
    plate: PlateKey;
    /** Marquee cards cycle three radius treatments; see DESIGN.md → Shapes. */
    featured: boolean;
    /**
     * Where a card opens. Work-page anchors stay the default; a project
     * with its own page sets this instead.
     */
    href?: string;
};

export const projects: Project[] = [
    {
        index: "01",
        slug: "glid",
        title: "Glid",
        category: "Consumer",
        year: "2026–",
        blurb: "A published iOS and Android sports coordination app, built and shipped solo.",
        detail: "Founder and sole engineer. Native SwiftUI client against a Rust and Axum backend on SurrealDB, running on GKE. Every layer — schema, API, client, deploy pipeline — is mine.",
        metrics: [
            { value: "300+", label: "Daily active" },
            { value: "99.4%", label: "Uptime" },
            { value: "Rust", label: "Backend" },
        ],
        stack: ["Rust", "SwiftUI", "SurrealDB", "Kubernetes"],
        plate: "glid",
        featured: true,
        href: "/projects/glid",
    },
    {
        index: "02",
        slug: "autonomous-blimp",
        title: "Autonomous Blimp",
        category: "Robotics",
        year: "2023–24",
        blurb: "Championship autonomy software with a 152–0 competition record.",
        detail: "Led software for a championship-winning robotics team. Quantized YOLOv5 to ONNX for edge inference on a 150 g airframe, and designed decentralized acoustic tracking for position hold.",
        metrics: [
            { value: "152–0", label: "Record" },
            { value: "150 g", label: "Airframe" },
            { value: "ONNX", label: "Quantized" },
        ],
        stack: ["Rust", "ROS 2", "YOLOv5", "ONNX"],
        plate: "blimp",
        featured: true,
        href: "/projects/autonomous-blimp",
    },
    {
        index: "03",
        slug: "raytheon-drone",
        title: "Raytheon Drone Competition",
        category: "Robotics",
        year: "2024",
        blurb: "First place — autonomous payload delivery onto a moving target.",
        detail: "Designed autonomous flight paths over MAVLink with ArUco marker detection, placing a payload on a moving target with repeatable precision. Led the team to first place.",
        metrics: [
            { value: "1st", label: "Place" },
            { value: "MAVLink", label: "Autonomy" },
        ],
        stack: ["Python", "MAVLink", "OpenCV"],
        plate: "drone",
        featured: true,
        href: "/projects/raytheon-drone",
    },
    {
        index: "04",
        slug: "freedom-ctf",
        title: "Freedom CTF",
        category: "Security",
        year: "2020–21",
        blurb: "A capture-the-flag platform built at 17, hosting 200+ international teams.",
        detail: "Built a cybersecurity competition platform from scratch and ran international events on it. Handled 200+ registered teams and sustained 50k requests per second at peak.",
        metrics: [
            { value: "200+", label: "Teams" },
            { value: "50k", label: "Req/sec" },
        ],
        stack: ["Go", "Flask", "Infrastructure"],
        plate: "ctf",
        featured: true,
        href: "/projects/freedom-ctf",
    },
    {
        index: "05",
        slug: "pipelined-mips",
        title: "Pipelined MIPS",
        category: "Embedded",
        year: "2023",
        blurb: "A five-stage pipelined processor in VHDL, hazards and all.",
        detail: "A 5-stage pipelined MIPS implementation in VHDL with hazard detection, forwarding logic, and custom peripherals — written down to the register transfer level.",
        metrics: [
            { value: "5", label: "Stages" },
            { value: "VHDL", label: "Register level" },
        ],
        stack: ["VHDL", "FPGA", "Architecture"],
        plate: "mips",
        featured: true,
        href: "/projects/pipelined-mips",
    },
    {
        index: "06",
        slug: "multi-agent-systems",
        title: "Multi-Agent Systems",
        category: "Research",
        year: "2025–",
        blurb: "Graduate work on twelve-state nonlinear blimp dynamics and look-ahead control.",
        detail: "Graduate research at GMU's CIAO Lab. Modeling 12-state nonlinear blimp dynamics and implementing look-ahead pitch controllers in Rust for coordinated multi-agent flight.",
        metrics: [
            { value: "12", label: "State model" },
            { value: "Rust", label: "Control" },
        ],
        stack: ["Rust", "Control theory", "Research"],
        plate: "multiagent",
        featured: true,
        href: "/projects/multi-agent-systems",
    },
    {
        index: "07",
        slug: "terra",
        title: "Terra",
        category: "Robotics",
        year: "2026–",
        blurb: "A Raspberry Pi rover, the phone mounted on it, and the Rust crates they share.",
        detail: "The vehicle in ARGOS. A Raspberry Pi and a SunFounder Fusion HAT run terra-rover. TerraPhone, on the robot, drives it through the shared Rust autonomy crates. ARGOS is the fleet side: one operator, more than one rover. The Pi image is a pre-release and has not been verified on hardware.",
        metrics: [
            { value: "Pi 4–5", label: "Computer" },
            { value: "iOS 17", label: "TerraPhone" },
            { value: "teleop", label: "Manual drive" },
        ],
        stack: ["Rust", "SwiftUI", "Raspberry Pi", "Bluetooth"],
        plate: "terra",
        featured: true,
        href: "/projects/terra",
    },
    {
        index: "08",
        slug: "argos",
        title: "ARGOS",
        category: "Robotics",
        year: "2026–",
        blurb: "A native fleet operator for Terra, on Mac and iPhone.",
        detail: "Adaptive Robotic Group Operator System. Rust and Swift through UniFFI. ARGOS supervises the fleet and sends high-level goals. Terra owns the vehicle. The dashboard figure is a simulator run from 2026-10-06, not hardware.",
        metrics: [
            { value: "macOS 14", label: "Mac app" },
            { value: "iOS 17", label: "Phone app" },
            { value: "terra/rover", label: "Prefix" },
        ],
        stack: ["Rust", "SwiftUI", "Zenoh", "UniFFI"],
        plate: "argos",
        featured: true,
        href: "/projects/argos",
    },
    {
        index: "09",
        slug: "zorvane",
        title: "Zorvane",
        category: "Robotics",
        year: "2026–",
        blurb: "The world simulator split out of Terra: terrain, physics, cameras, Zenoh.",
        detail: "Platform-agnostic simulator. The default world is the practice town and the default body is terra-ground. TERRA_NEXT=1 loads a practice pitch and does not score a match.",
        metrics: [
            { value: "7447", label: "Zenoh port" },
            { value: "32", label: "Rover cap" },
            { value: "terra-ground", label: "Default body" },
        ],
        stack: ["Rust", "Bevy", "Zenoh"],
        plate: "zorvane",
        featured: true,
        href: "/projects/zorvane",
    },
];

/** Card destination. A project page wins over the work-page anchor. */
export function projectHref(project: Project): string {
    return project.href ?? `/projects#${project.slug}`;
}
