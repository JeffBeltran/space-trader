import clsx from "clsx";

import { systemTypeColorMap } from "@/hooks/useSystemColors";

import { Waypoint } from "./Waypoint";

import type { System } from "@/types/space-traders-api/system";

export function SystemMap({ system }: { system: System }) {
    const data = system.waypoints.filter((waypoint) => {
        return waypoint.type !== "ASTEROID" && waypoint.orbits === undefined;
    });

    // Calculate the maximum radius from the center
    const maxRadius =
        data.length > 0
            ? Math.max(
                  ...data.map((item) => Math.sqrt(item.x ** 2 + item.y ** 2)),
              )
            : 0;

    const padding = 5;

    // Calculate the canvas size based on the maximum radius and padding
    const canvasSize = (maxRadius + padding) * 2;
    const canvasSquare = canvasSize % 2 ? canvasSize + 1 : canvasSize;
    const center = canvasSquare / 2;

    // Map the original coordinates to the canvas coordinates
    const mappedData = data.map((item) => ({
        ...item,
        x: item.x + center,
        y: item.y + center,
    }));

    // Calculate the orbit radii
    const orbitRadii = [
        ...new Set(
            mappedData.map((item) =>
                Math.sqrt((item.x - center) ** 2 + (item.y - center) ** 2),
            ),
        ),
    ];

    return (
        <div className="w-full">
            <svg
                className="h-full w-full"
                width={canvasSquare}
                height={canvasSquare}
                viewBox={`0 0 ${canvasSquare} ${canvasSquare}`}
            >
                <rect
                    x="0"
                    y="0"
                    width={canvasSquare}
                    height={canvasSquare}
                    className="fill-current text-gray-700"
                />
                {orbitRadii.map((radius, index) => (
                    <circle
                        key={index}
                        cx={center}
                        cy={center}
                        r={radius}
                        className="stroke-current text-gray-500"
                        strokeWidth="0.05"
                        fill="none"
                    />
                ))}
                <circle
                    cx={canvasSquare / 2}
                    cy={canvasSquare / 2}
                    r={4}
                    className={clsx(
                        "fill-current",
                        systemTypeColorMap[system.type].textClass,
                    )}
                />
                {mappedData.map((item) => (
                    <Waypoint key={item.symbol} waypoint={item} />
                ))}
            </svg>
        </div>
    );
}
