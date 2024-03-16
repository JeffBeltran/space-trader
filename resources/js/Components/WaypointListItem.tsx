import { ChevronRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

import { useWaypointColors } from "@/hooks/useWaypointColors";

import { Badge } from "./catalyst/badge";
import { Link } from "./catalyst/link";

import type { Waypoint } from "@/types/space-traders-api/waypoint";

export function WaypointListItem({ waypoint }: { waypoint: Waypoint }) {
    const { textClass, bgClass } = useWaypointColors(waypoint.type);
    return (
        <li
            key={waypoint.symbol}
            className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
        >
            <div className="flex min-w-0 gap-x-4">
                <div
                    className={clsx(
                        "h-12 w-12 flex-none rounded-full",
                        bgClass,
                    )}
                />
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        <Link
                            href={route("systems.waypoints.show", [
                                waypoint.systemSymbol,
                                waypoint.symbol,
                            ])}
                        >
                            <span className="absolute inset-x-0 -top-px bottom-0" />
                            {waypoint.symbol}
                        </Link>
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1">
                        {waypoint.traits.map((trait) => {
                            return (
                                <Badge key={trait.symbol}>{trait.name}</Badge>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-4">
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className={clsx("text-sm leading-6 ", textClass)}>
                        {waypoint.type}
                    </p>
                    {waypoint.orbitals.length ? (
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                            {waypoint.orbitals.length} orbital(s)
                        </p>
                    ) : (
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                            No orbitals
                        </p>
                    )}
                </div>
                <ChevronRightIcon
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                />
            </div>
        </li>
    );
}
