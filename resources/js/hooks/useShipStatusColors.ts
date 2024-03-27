import type { ShipNavStatus } from "@/types/space-traders-api/ship";

type ColorInfo = {
    hex: string;
    rgb: string;
    textClass: string;
    bgClass: string;
    semanticName: string;
    tailwindPalette: "red" | "green" | "yellow";
};

export const shipColorMap: Record<ShipNavStatus, ColorInfo> = {
    IN_TRANSIT: {
        hex: "#ef4444",
        rgb: "ef4444",
        textClass: "text-red-500",
        bgClass: "bg-red-500",
        semanticName: "danger",
        tailwindPalette: "red",
    },
    DOCKED: {
        hex: "#22c55e",
        rgb: "22c55e",
        textClass: "text-green-500",
        bgClass: "bg-green-500",
        semanticName: "success",
        tailwindPalette: "green",
    },
    IN_ORBIT: {
        hex: "#eab308",
        rgb: "eab308",
        textClass: "text-yellow-500",
        bgClass: "bg-yellow-500",
        semanticName: "warning",
        tailwindPalette: "yellow",
    },
};

export function useShipStatusColors(status: ShipNavStatus) {
    const statusColor = shipColorMap[status];
    if (!statusColor) {
        throw new Error(`No color found for ship role ${status}`);
    }
    return statusColor;
}
