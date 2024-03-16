import clsx from "clsx";

import { useSystemColors } from "@/hooks/useSystemColors";

import { SystemMap } from "./SystemMap";

import type { System } from "@/types/space-traders-api/system";

export function SystemDetailsCard({ system }: { system: System }) {
    const { textClass } = useSystemColors(system.type);

    const waypointTypes = [
        ...new Set(
            system.waypoints.map((waypoint) => {
                return waypoint.type;
            }),
        ),
    ];

    return (
        <>
            <SystemMap system={system} />
            <dl className="divide-y divide-gray-100">
                <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                        Sector
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {system.sectorSymbol}
                    </dd>
                </div>
                <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                        Symbol
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {system.symbol}
                    </dd>
                </div>
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
                        {system.type}
                    </dd>
                </div>
                <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                        Waypoints
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {system.waypoints.length.toLocaleString()}
                    </dd>
                </div>
                <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                        Waypoint Types
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {waypointTypes.join(", ")}
                    </dd>
                </div>
            </dl>
        </>
    );
}
