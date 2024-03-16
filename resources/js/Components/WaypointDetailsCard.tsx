import clsx from "clsx";

import { systemTypeColorMap } from "@/hooks/useSystemColors";
import { useWaypointColors, waypointColorMap } from "@/hooks/useWaypointColors";

import { Badge, BadgeButton } from "./catalyst/badge";
import { WaypointMap } from "./WaypointMap";

import type { System } from "@/types/space-traders-api/system";
import type { Waypoint } from "@/types/space-traders-api/waypoint";

export function WaypointDetailsCard({
    system,
    waypoint,
}: {
    system: System;
    waypoint: Waypoint;
}) {
    const { textClass } = useWaypointColors(waypoint.type);

    const orbitals = waypoint.orbitals.flatMap((orbital) => {
        const matchingWaypoint = system.waypoints.find(
            (waypoint) => waypoint.symbol === orbital.symbol,
        );

        if (!matchingWaypoint) {
            return [];
        }
        return matchingWaypoint;
    });

    return (
        <>
            <WaypointMap system={system} waypoint={waypoint} />
            <dl className="divide-y divide-gray-100">
                <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                        Type
                    </dt>
                    <dd
                        className={clsx(
                            "mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0",
                            textClass,
                        )}
                    >
                        {waypoint.type}
                    </dd>
                </div>
                <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                        Orbits
                    </dt>
                    <dd className="mt-1 flex flex-wrap gap-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                        <OrbitBadge system={system} waypoint={waypoint} />
                    </dd>
                </div>
                <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                        Orbitals
                    </dt>
                    <dd
                        className={clsx(
                            "mt-1 flex flex-wrap gap-1 text-sm leading-6 sm:col-span-2 sm:mt-0",
                            textClass,
                        )}
                    >
                        {orbitals.length === 0 && (
                            <Badge color="amber">No orbitals</Badge>
                        )}
                        {orbitals.map((orbital) => {
                            return (
                                <BadgeButton
                                    key={orbital.symbol}
                                    color={
                                        waypointColorMap[orbital.type]
                                            .tailwindPalette
                                    }
                                    href={route("systems.waypoints.show", [
                                        waypoint.systemSymbol,
                                        orbital.symbol,
                                    ])}
                                >
                                    {orbital.symbol}
                                </BadgeButton>
                            );
                        })}
                    </dd>
                </div>
            </dl>
        </>
    );
}

function OrbitBadge({
    system,
    waypoint,
}: {
    system: System;
    waypoint: Waypoint;
}) {
    const orbitWaypoint = system.waypoints.find(
        (systemWaypoint) => systemWaypoint.symbol === waypoint.orbits,
    );

    if (orbitWaypoint) {
        return (
            <BadgeButton
                color={waypointColorMap[orbitWaypoint.type].tailwindPalette}
                href={route("systems.waypoints.show", [
                    waypoint.systemSymbol,
                    orbitWaypoint.symbol,
                ])}
            >
                {waypoint.orbits}
            </BadgeButton>
        );
    }

    // must orbit the system's star

    return (
        <BadgeButton
            color={systemTypeColorMap[system.type].tailwindPalette}
            href={route("systems.show", [system.symbol])}
        >
            {system.symbol}
        </BadgeButton>
    );
}
