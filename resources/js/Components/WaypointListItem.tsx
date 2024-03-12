import { ChevronRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

import { useWaypointColors } from "@/hooks/useWaypointColors";

import type { SystemWaypoint } from "@/types/system";

export function SystemWaypointListItem({
    systemWaypoint,
}: {
    systemWaypoint: SystemWaypoint;
}) {
    const { textClass, bgClass } = useWaypointColors(systemWaypoint.type);
    return (
        <li
            key={systemWaypoint.symbol}
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
                        <a href={systemWaypoint.symbol}>
                            <span className="absolute inset-x-0 -top-px bottom-0" />
                            {systemWaypoint.symbol}
                        </a>
                    </p>
                    <p
                        className={clsx(
                            "mt-1 flex text-xs leading-5",
                            textClass,
                        )}
                    >
                        {systemWaypoint.type}
                    </p>
                </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-4">
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                        {systemWaypoint.x} / {systemWaypoint.y}
                    </p>
                    {systemWaypoint.orbitals.length ? (
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                            {systemWaypoint.orbitals.length} orbital(s)
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
