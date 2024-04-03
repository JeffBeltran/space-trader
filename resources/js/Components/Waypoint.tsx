import clsx from "clsx";

import { waypointColorMap } from "@/hooks/useWaypointColors";

import type { SystemWaypoint } from "@/types/space-traders-api/system";

export function Waypoint({ waypoint }: { waypoint: SystemWaypoint }) {
    return (
        <g>
            <circle
                key={waypoint.symbol}
                cx={waypoint.x}
                cy={waypoint.y}
                r={2}
                className={clsx(
                    "fill-current",
                    waypointColorMap[waypoint.type].textClass,
                )}
            />
            {waypoint.orbitals.length && (
                <circle
                    cx={waypoint.x}
                    cy={waypoint.y}
                    r={4}
                    className="stroke-current text-gray-500"
                    strokeWidth="0.05"
                    fill="none"
                />
            )}

            {waypoint.orbitals.map((orbital, index) => {
                const angle = (index * 2 * Math.PI) / waypoint.orbitals.length;
                const distance = 4;
                const dotX = waypoint.x + distance * Math.cos(angle);
                const dotY = waypoint.y + distance * Math.sin(angle);

                return (
                    <circle
                        key={orbital.symbol}
                        cx={dotX}
                        cy={dotY}
                        r={0.5}
                        className="fill-current text-white"
                    />
                );
            })}
        </g>
    );
}
