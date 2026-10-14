/**
 * Living documentation for the current systems.
 *
 * These are GitHub project Pages on the super-yojan.dev user site, so the
 * path is the repository name and it is case-sensitive. They must stay
 * external URLs — an Astro route at /ARGOS, /Terra, or /Zorvane would
 * collide with the project site.
 *
 * ARGOS is the hub: its site links Terra and Zorvane.
 */
export type DocSite = {
    slug: string;
    title: string;
    /** Short mono role. ARGOS is the hub. */
    role: string;
    /** One line for the index. */
    blurb: string;
    hub: boolean;
    docsUrl: string;
    repoUrl: string;
    /** In-site pages linked from this project's row on /docs. */
    pages?: { href: string; label: string; aria?: string }[];
};

export const docSites: DocSite[] = [
    {
        slug: "argos",
        title: "ARGOS",
        role: "Hub",
        blurb: "The fleet operator. A native app on macOS 14 and iOS 17. Its manual is the index for the other two sites.",
        hub: true,
        docsUrl: "https://super-yojan.dev/ARGOS/",
        repoUrl: "https://github.com/Super-Yojan/ARGOS",
        pages: [
            {
                href: "/docs/argos/getting-started",
                label: "Getting started",
                aria: "ARGOS getting started",
            },
            {
                href: "/projects/argos",
                label: "Project",
                aria: "ARGOS project page",
            },
        ],
    },
    {
        slug: "terra",
        title: "Terra",
        role: "Vehicle",
        blurb: "Vehicle body: rover chassis, onboard autonomy, Raspberry Pi, and the TerraPhone iOS app.",
        hub: false,
        docsUrl: "https://super-yojan.dev/Terra/",
        repoUrl: "https://github.com/Super-Yojan/Terra",
        pages: [
            {
                href: "/projects/terra",
                label: "Project",
                aria: "Terra project page",
            },
            {
                href: "/docs/terra/flash-with-imager",
                label: "Flash with Imager",
                aria: "Flash Terra with Raspberry Pi Imager",
            },
        ],
    },
    {
        slug: "zorvane",
        title: "Zorvane",
        role: "Simulator",
        blurb: "The world simulator, split out of Terra. The default world is the practice town.",
        hub: false,
        docsUrl: "https://super-yojan.dev/Zorvane/",
        repoUrl: "https://github.com/Super-Yojan/Zorvane",
        pages: [
            {
                href: "/docs/zorvane/running",
                label: "Running",
                aria: "Run Zorvane",
            },
            {
                href: "/projects/zorvane",
                label: "Project",
                aria: "Zorvane project page",
            },
        ],
    },
];
