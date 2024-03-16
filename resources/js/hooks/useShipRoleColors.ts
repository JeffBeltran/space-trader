import type { ShipRole } from "@/types/space-traders-api/ship";

type TailwindPalette =
    | "lime"
    | "emerald"
    | "gray"
    | "slate"
    | "cyan"
    | "sky"
    | "blue"
    | "red"
    | "orange"
    | "purple"
    | "fuchsia"
    | "yellow"
    | "amber"
    | "rose";

type ColorInfo = {
    hex: string;
    rgb: string;
    textClass: string;
    bgClass: string;
    semanticName: string;
    tailwindPalette: TailwindPalette;
};

const shipRoleColorMap: Record<ShipRole, ColorInfo> = {
    // Resource Collection (Green)
    HARVESTER: {
        hex: "#84cc16",
        rgb: "84cc16",
        textClass: "text-lime-500",
        bgClass: "bg-lime-500",
        semanticName: "harvester",
        tailwindPalette: "lime",
    },
    EXCAVATOR: {
        hex: "#10b981",
        rgb: "10b981",
        textClass: "text-emerald-500",
        bgClass: "bg-emerald-500",
        semanticName: "excavator",
        tailwindPalette: "emerald",
    },

    // Resource Processing (Gray)
    REFINERY: {
        hex: "#6b7280",
        rgb: "6b7280",
        textClass: "text-gray-500",
        bgClass: "bg-gray-500",
        semanticName: "refinery",
        tailwindPalette: "gray",
    },
    FABRICATOR: {
        hex: "#64748b",
        rgb: "64748b",
        textClass: "text-slate-500",
        bgClass: "bg-slate-500",
        semanticName: "fabricator",
        tailwindPalette: "slate",
    },

    // Transportation (Blue)
    HAULER: {
        hex: "#06b6d4",
        rgb: "06b6d4",
        textClass: "text-cyan-500",
        bgClass: "bg-cyan-500",
        semanticName: "hauler",
        tailwindPalette: "cyan",
    },
    TRANSPORT: {
        hex: "#0ea5e9",
        rgb: "0ea5e9",
        textClass: "text-sky-500",
        bgClass: "bg-sky-500",
        semanticName: "transport",
        tailwindPalette: "sky",
    },
    CARRIER: {
        hex: "#3b82f6",
        rgb: "3b82f6",
        textClass: "text-blue-500",
        bgClass: "bg-blue-500",
        semanticName: "carrier",
        tailwindPalette: "blue",
    },

    // Combat (Red)
    INTERCEPTOR: {
        hex: "#ef4444",
        rgb: "ef4444",
        textClass: "text-red-500",
        bgClass: "bg-red-500",
        semanticName: "interceptor",
        tailwindPalette: "red",
    },
    PATROL: {
        hex: "#f43f5e",
        rgb: "f43f5e",
        textClass: "text-rose-500",
        bgClass: "bg-rose-500",
        semanticName: "patrol",
        tailwindPalette: "rose",
    },

    // Support (Purple)
    REPAIR: {
        hex: "#a855f7",
        rgb: "a855f7",
        textClass: "text-purple-500",
        bgClass: "bg-purple-500",
        semanticName: "repair",
        tailwindPalette: "purple",
    },
    COMMAND: {
        hex: "#d946ef",
        rgb: "d946ef",
        textClass: "text-fuchsia-500",
        bgClass: "bg-fuchsia-500",
        semanticName: "command",
        tailwindPalette: "fuchsia",
    },

    // Exploration (Yellow)
    SURVEYOR: {
        hex: "#eab308",
        rgb: "eab308",
        textClass: "text-yellow-500",
        bgClass: "bg-yellow-500",
        semanticName: "surveyor",
        tailwindPalette: "yellow",
    },
    SATELLITE: {
        hex: "#fbbf24",
        rgb: "fbbf24",
        textClass: "text-amber-400",
        bgClass: "bg-amber-400",
        semanticName: "satellite",
        tailwindPalette: "amber",
    },
    EXPLORER: {
        hex: "#f97316",
        rgb: "f97316",
        textClass: "text-orange-400",
        bgClass: "bg-orange-400",
        semanticName: "explorer",
        tailwindPalette: "orange",
    },
};

export function useShipRoleColors(role: ShipRole) {
    const roleColor = shipRoleColorMap[role];
    if (!roleColor) {
        throw new Error(`No color found for ship role ${role}`);
    }
    return roleColor;
}
