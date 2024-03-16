import type { WaypointType } from "@/types/space-traders-api/waypoint";
import type { ColorInfo } from "@/types/utils";

export const waypointColorMap: Record<WaypointType, ColorInfo> = {
    // Celestial Bodies
    PLANET: {
        hex: "#22c55e",
        rgb: "22c55e",
        textClass: "text-green-500",
        bgClass: "bg-green-500",
        semanticName: "planet",
        tailwindPalette: "green",
    },
    GAS_GIANT: {
        hex: "#06b6d4",
        rgb: "06b6d4",
        textClass: "text-cyan-500",
        bgClass: "bg-cyan-500",
        semanticName: "gasGiant",
        tailwindPalette: "cyan",
    },
    MOON: {
        hex: "#64748b",
        rgb: "64748b",
        textClass: "text-zinc-500",
        bgClass: "bg-zinc-500",
        semanticName: "moon",
        tailwindPalette: "zinc",
    },

    // Stations and Structures
    ORBITAL_STATION: {
        hex: "#a855f7",
        rgb: "a855f7",
        textClass: "text-purple-500",
        bgClass: "bg-purple-500",
        semanticName: "orbitalStation",
        tailwindPalette: "purple",
    },
    JUMP_GATE: {
        hex: "#f97316",
        rgb: "f97316",
        textClass: "text-orange-500",
        bgClass: "bg-orange-500",
        semanticName: "jumpGate",
        tailwindPalette: "orange",
    },
    ASTEROID_BASE: {
        hex: "#d97706",
        rgb: "d97706",
        textClass: "text-amber-600",
        bgClass: "bg-amber-600",
        semanticName: "asteroidBase",
        tailwindPalette: "amber",
    },

    // Asteroid and Debris Fields
    ASTEROID_FIELD: {
        hex: "#eab308",
        rgb: "eab308",
        textClass: "text-yellow-500",
        bgClass: "bg-yellow-500",
        semanticName: "asteroidField",
        tailwindPalette: "yellow",
    },
    ASTEROID: {
        hex: "#ca8a04",
        rgb: "ca8a04",
        textClass: "text-yellow-600",
        bgClass: "bg-yellow-600",
        semanticName: "asteroid",
        tailwindPalette: "yellow",
    },
    ENGINEERED_ASTEROID: {
        hex: "#a16207",
        rgb: "a16207",
        textClass: "text-yellow-800",
        bgClass: "bg-yellow-800",
        semanticName: "engineeredAsteroid",
        tailwindPalette: "yellow",
    },
    DEBRIS_FIELD: {
        hex: "#78350f",
        rgb: "78350f",
        textClass: "text-amber-900",
        bgClass: "bg-amber-900",
        semanticName: "debrisField",
        tailwindPalette: "amber",
    },

    // Nebulae and Gravity Wells
    NEBULA: {
        hex: "#c026d3",
        rgb: "c026d3",
        textClass: "text-fuchsia-600",
        bgClass: "bg-fuchsia-600",
        semanticName: "nebula",
        tailwindPalette: "fuchsia",
    },
    GRAVITY_WELL: {
        hex: "#7c3aed",
        rgb: "7c3aed",
        textClass: "text-violet-600",
        bgClass: "bg-violet-600",
        semanticName: "gravityWell",
        tailwindPalette: "violet",
    },
    ARTIFICIAL_GRAVITY_WELL: {
        hex: "#6d28d9",
        rgb: "6d28d9",
        textClass: "text-violet-700",
        bgClass: "bg-violet-700",
        semanticName: "artificialGravityWell",
        tailwindPalette: "violet",
    },

    // Fuel Station
    FUEL_STATION: {
        hex: "#f43f5e",
        rgb: "f43f5e",
        textClass: "text-rose-500",
        bgClass: "bg-rose-500",
        semanticName: "fuelStation",
        tailwindPalette: "rose",
    },
};

export function useWaypointColors(waypoint: WaypointType) {
    return waypointColorMap[waypoint];
}
