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
};

export const docSites: DocSite[] = [
    {
        slug: "argos",
        title: "ARGOS",
        role: "Hub",
        blurb: "Operator and fleet supervision layer, and the index for the other sites.",
        hub: true,
        docsUrl: "https://super-yojan.dev/ARGOS/",
        repoUrl: "https://github.com/Super-Yojan/ARGOS",
    },
    {
        slug: "terra",
        title: "Terra",
        role: "Vehicle",
        blurb: "Vehicle body: rover chassis, onboard autonomy, Raspberry Pi, and the TerraPhone iOS app.",
        hub: false,
        docsUrl: "https://super-yojan.dev/Terra/",
        repoUrl: "https://github.com/Super-Yojan/Terra",
    },
    {
        slug: "zorvane",
        title: "Zorvane",
        role: "Simulator",
        blurb: "Platform-agnostic world simulator, split out of Terra.",
        hub: false,
        docsUrl: "https://super-yojan.dev/Zorvane/",
        repoUrl: "https://github.com/Super-Yojan/Zorvane",
    },
];
