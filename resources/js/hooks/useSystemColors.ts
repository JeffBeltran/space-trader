import type { SystemType } from "@/types/system";

type TailwindPalette =
    | "slate"
    | "gray"
    | "zinc"
    | "neutral"
    | "stone"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose";

type ColorInfo = {
    hex: string;
    rgb: string;
    textClass: string;
    bgClass: string;
    semanticName: string;
    tailwindPalette: TailwindPalette;
};

const systemTypeColorMap: Record<SystemType, ColorInfo> = {
    // Stars
    NEUTRON_STAR: {
        hex: "#60a5fa",
        rgb: "60a5fa",
        textClass: "text-blue-400",
        bgClass: "bg-blue-400",
        semanticName: "neutronStar",
        tailwindPalette: "blue",
    },
    RED_STAR: {
        hex: "#f87171",
        rgb: "f87171",
        textClass: "text-red-400",
        bgClass: "bg-red-400",
        semanticName: "redStar",
        tailwindPalette: "red",
    },
    ORANGE_STAR: {
        hex: "#fb923c",
        rgb: "fb923c",
        textClass: "text-orange-400",
        bgClass: "bg-orange-400",
        semanticName: "orangeStar",
        tailwindPalette: "orange",
    },
    BLUE_STAR: {
        hex: "#93c5fd",
        rgb: "93c5fd",
        textClass: "text-blue-300",
        bgClass: "bg-blue-300",
        semanticName: "blueStar",
        tailwindPalette: "blue",
    },
    YOUNG_STAR: {
        hex: "#fcd34d",
        rgb: "fcd34d",
        textClass: "text-yellow-300",
        bgClass: "bg-yellow-300",
        semanticName: "youngStar",
        tailwindPalette: "yellow",
    },
    WHITE_DWARF: {
        hex: "#e5e7eb",
        rgb: "e5e7eb",
        textClass: "text-gray-200",
        bgClass: "bg-gray-200",
        semanticName: "whiteDwarf",
        tailwindPalette: "gray",
    },

    // Black Hole and Hypergiant
    BLACK_HOLE: {
        hex: "#1f2937",
        rgb: "1f2937",
        textClass: "text-gray-800",
        bgClass: "bg-gray-800",
        semanticName: "blackHole",
        tailwindPalette: "gray",
    },
    HYPERGIANT: {
        hex: "#fbbf24",
        rgb: "fbbf24",
        textClass: "text-yellow-400",
        bgClass: "bg-yellow-400",
        semanticName: "hypergiant",
        tailwindPalette: "yellow",
    },

    // Nebula and Unstable
    NEBULA: {
        hex: "#f0abfc",
        rgb: "f0abfc",
        textClass: "text-purple-300",
        bgClass: "bg-purple-300",
        semanticName: "nebula",
        tailwindPalette: "purple",
    },
    UNSTABLE: {
        hex: "#f87171",
        rgb: "f87171",
        textClass: "text-red-400",
        bgClass: "bg-red-400",
        semanticName: "unstable",
        tailwindPalette: "red",
    },
};

export function useSystemColors(systemType: SystemType) {
    return systemTypeColorMap[systemType];
}
