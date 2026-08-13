export type PlateKey =
    | "glid"
    | "blimp"
    | "drone"
    | "ctf"
    | "mips"
    | "multiagent";

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
    },
];
