import clsx from "clsx";
import { DateTime } from "luxon";
import Prando from "prando";

import { systemTypeColorMap } from "@/hooks/useSystemColors";
import { useWaypointColors, waypointColorMap } from "@/hooks/useWaypointColors";

import type { System, SystemWaypoint } from "@/types/space-traders-api/system";
import type {
    Waypoint,
    WaypointType,
} from "@/types/space-traders-api/waypoint";

const MAP_VALUES = {
    minX: -50,
    minY: -50,
    height: 100,
    width: 100,
};

export function WaypointMap({
    waypoint,
    system,
}: {
    waypoint: Waypoint;
    system: System;
}) {
    const orbitals = waypoint.orbitals.flatMap((orbital) => {
        const matchingWaypoint = system.waypoints.find(
            (waypoint) => waypoint.symbol === orbital.symbol,
        );

        if (!matchingWaypoint) {
            return [];
        }
        return matchingWaypoint;
    });

    const orbits = system.waypoints.find((systemWaypoint) => {
        return systemWaypoint.symbol === waypoint.orbits;
    });

    return (
        <div className="w-full">
            <svg
                className="h-full w-full"
                width={MAP_VALUES.width}
                height={MAP_VALUES.height}
                viewBox={`${MAP_VALUES.minX} ${MAP_VALUES.minY} ${MAP_VALUES.width} ${MAP_VALUES.height}`}
            >
                <BackDrop />
                <WaypointOrbit waypoint={orbits} />
                <WaypointSystemOrbit
                    system={system}
                    waypointOrbits={waypoint.orbits}
                />
                <MapFocus waypointType={waypoint.type} />
                <Orbitals orbitals={orbitals} waypoint={waypoint} />
            </svg>
        </div>
    );
}

function BackDrop() {
    return (
        <rect
            x={MAP_VALUES.minX}
            y={MAP_VALUES.minY}
            width={MAP_VALUES.width}
            height={MAP_VALUES.height}
            className="fill-current text-gray-700"
        />
    );
}

function MapFocus({ waypointType }: { waypointType: WaypointType }) {
    const { textClass } = useWaypointColors(waypointType);

    return (
        <circle
            cx="0"
            cy="0"
            r={15}
            className={clsx("fill-current", textClass)}
        />
    );
}

function WaypointSystemOrbit({
    system,
    waypointOrbits,
}: {
    system: System;
    waypointOrbits?: string;
}) {
    if (waypointOrbits) {
        return null;
    }

    const orbitingBody = { x: -system.x, y: -system.y };
    const orbitRadii = Math.sqrt(orbitingBody.x ** 2 + orbitingBody.y ** 2);

    return (
        <circle
            cx={orbitingBody.x}
            cy={orbitingBody.y}
            r={orbitRadii}
            className={clsx(
                "stroke-current",
                systemTypeColorMap[system.type].textClass,
            )}
            strokeWidth={"0.05"}
            fill="none"
        />
    );
}

function Orbitals({
    orbitals,
    waypoint,
}: {
    orbitals: Array<SystemWaypoint>;
    waypoint: Waypoint;
}) {
    if (orbitals.length === 0) {
        return null;
    }

    // Seed the PRNG with the waypoint symbol and the current time(hr)
    const currentTime = DateTime.now().hour;
    const seed = waypoint.symbol + currentTime;
    const prng = new Prando(seed);

    return (
        <g>
            <circle
                cx={0}
                cy={0}
                r={30}
                className={clsx(
                    "stroke-current",
                    waypointColorMap[waypoint.type].textClass,
                )}
                strokeWidth={"0.05"}
                fill="none"
            />
            {orbitals.map((orbital, idx) => {
                // Generate a random angle and use it to place the orbital
                // this should be deterministic based on the seed (waypoint symbol + current time)
                const angle = prng.next() * 2 * Math.PI;
                const x = 30 * Math.cos(angle);
                const y = 30 * Math.sin(angle);

                return (
                    <circle
                        key={orbital.symbol}
                        cx={x}
                        cy={y}
                        r={5}
                        className={clsx(
                            "fill-current",
                            waypointColorMap[orbital.type].textClass,
                        )}
                    />
                );
            })}
        </g>
    );
}

function WaypointOrbit({ waypoint }: { waypoint?: Waypoint | SystemWaypoint }) {
    if (!waypoint) {
        return null;
    }

    return (
        <circle
            cx={-100}
            cy={0}
            r={100}
            className={clsx(
                "stroke-current",
                waypointColorMap[waypoint.type].textClass,
            )}
            strokeWidth={"0.05"}
            fill="none"
        />
    );
}
