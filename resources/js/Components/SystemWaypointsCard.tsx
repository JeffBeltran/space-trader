import { router } from "@inertiajs/react";

import { useSystemWaypoints } from "@/hooks/useSystemWaypoints";

import { Listbox, ListboxLabel, ListboxOption } from "./catalyst/listbox";

const WAYPOINT_TYPES = [
    "PLANET",
    "GAS_GIANT",
    "MOON",
    "ORBITAL_STATION",
    "JUMP_GATE",
    "ASTEROID_FIELD",
    "ASTEROID",
    "ENGINEERED_ASTEROID",
    "ASTEROID_BASE",
    "NEBULA",
    "DEBRIS_FIELD",
    "GRAVITY_WELL",
    "ARTIFICIAL_GRAVITY_WELL",
    "FUEL_STATION",
] as const;

export function SystemWaypointsCard({
    systemSymbol,
}: {
    systemSymbol: string;
}) {
    const systemWaypoints = useSystemWaypoints(systemSymbol);

    console.log(systemWaypoints.data);
    const url = new URL(window.location.href);
    return (
        <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-4">
                        <div className="flex items-center">
                            <div>
                                <h3 className="text-base font-semibold leading-6 text-gray-900">
                                    {systemSymbol}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Waypoints
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="ml-4 mt-2 flex-shrink-0">
                        <Listbox
                            name="type"
                            defaultValue={url.searchParams.get("type") || ""}
                            value={url.searchParams.get("type") || ""}
                            onChange={(type) => {
                                const currentRoute = route().current();

                                if (currentRoute) {
                                    if (type) {
                                        router.get(
                                            route(currentRoute, {
                                                ship: route().params.ship,
                                                type,
                                            }),
                                        );
                                    } else {
                                        router.get(
                                            route(currentRoute, {
                                                ship: route().params.ship,
                                            }),
                                        );
                                    }
                                }
                            }}
                        >
                            <ListboxOption value="">
                                <ListboxLabel>Select Filter</ListboxLabel>
                            </ListboxOption>
                            {WAYPOINT_TYPES.map((type) => {
                                return (
                                    <ListboxOption key={type} value={type}>
                                        <ListboxLabel>{type}</ListboxLabel>
                                    </ListboxOption>
                                );
                            })}
                        </Listbox>
                    </div>
                </div>
            </div>
            <div className="px-4 py-5 sm:p-6">{/* Content goes here */}</div>
            <nav
                className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                aria-label="Pagination"
            >
                <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to{" "}
                        <span className="font-medium">10</span> of{" "}
                        <span className="font-medium">
                            {systemWaypoints.data?.meta.total}
                        </span>{" "}
                        results
                    </p>
                </div>
                <div className="flex flex-1 justify-between sm:justify-end">
                    <a
                        href="#"
                        className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                    >
                        Previous
                    </a>
                    <a
                        href="#"
                        className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                    >
                        Next
                    </a>
                </div>
            </nav>
        </div>
    );
}
