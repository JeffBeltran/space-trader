import { router } from "@inertiajs/react";

import { useShip } from "@/hooks/useShip";
import { useSystemWaypoints } from "@/hooks/useSystemWaypoints";
import { waypointColorMap } from "@/hooks/useWaypointColors";

import { BadgeButton } from "./catalyst/badge";
import { Button } from "./catalyst/button";
import { Link } from "./catalyst/link";
import { Listbox, ListboxLabel, ListboxOption } from "./catalyst/listbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./catalyst/table";
import { Navigate } from "./Navigate";

import type { Ship } from "@/types/space-traders-api/ship";
import type {
    Waypoint,
    WaypointTraitSymbol,
} from "@/types/space-traders-api/waypoint";

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

export function ShipSystemWaypointsCard({
    shipSymbol,
}: {
    shipSymbol: string;
}) {
    const shipDetails = useShip(shipSymbol);
    const systemWaypoints = useSystemWaypoints(
        shipDetails.data?.nav.systemSymbol,
    );

    const url = new URL(window.location.href);
    const selectedType = url.searchParams.get("type") || "";
    const selectedTraits = url.searchParams.getAll("traits");

    function handleTraitClick(trait: WaypointTraitSymbol) {
        if (selectedTraits.includes(trait)) {
            const newTraits = selectedTraits.filter((t) => t !== trait);
            url.searchParams.delete("traits");
            newTraits.forEach((t) => url.searchParams.append("traits", t));
            router.visit(url.toString(), { preserveScroll: true });
        } else {
            url.searchParams.append("traits", trait);
            router.visit(url.toString(), { preserveScroll: true });
        }
    }

    if (!shipDetails.data || !systemWaypoints.data) {
        return <div>Loading...</div>;
    }

    const pageTotal =
        systemWaypoints.data.meta.page * systemWaypoints.data.meta.limit;
    const totalWaypoints = systemWaypoints.data.meta.total;
    const pageRealTotal =
        pageTotal > totalWaypoints ? totalWaypoints : pageTotal;
    const pageStart = pageTotal - systemWaypoints.data.meta.limit + 1;

    return (
        <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-4">
                        <div className="flex items-center">
                            <div>
                                <h3 className="text-base font-semibold leading-6 text-gray-900">
                                    {shipDetails.data.nav.systemSymbol}
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
                            value={selectedType}
                            onChange={(type) => {
                                if (type) {
                                    url.searchParams.set("type", type);
                                    router.visit(url.toString(), {
                                        preserveScroll: true,
                                    });
                                } else {
                                    url.searchParams.delete("type");
                                    router.visit(url.toString(), {
                                        preserveScroll: true,
                                    });
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
            <div className="px-4 sm:px-6">
                <Table
                    bleed
                    className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]"
                >
                    <TableHead>
                        <TableRow>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Type</TableHeader>
                            <TableHeader>Construction</TableHeader>
                            <TableHeader>Traits</TableHeader>
                            <TableHeader>Distance</TableHeader>
                            <TableHeader className="relative w-0">
                                <span className="sr-only">Actions</span>
                            </TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {shipDetails.data &&
                            systemWaypoints.data?.data.map((waypoint) => (
                                <WaypointRow
                                    key={waypoint.symbol}
                                    waypoint={waypoint}
                                    shipDetails={shipDetails.data}
                                    onTraitClick={handleTraitClick}
                                />
                            ))}
                    </TableBody>
                </Table>
            </div>
            <nav
                className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                aria-label="Pagination"
            >
                <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{pageStart}</span>{" "}
                        to <span className="font-medium">{pageRealTotal}</span>{" "}
                        of <span className="font-medium">{totalWaypoints}</span>{" "}
                        results
                    </p>
                </div>
                <div className="flex flex-1 justify-between gap-2 sm:justify-end">
                    <PrevButton {...systemWaypoints.data.meta} />
                    <NextButton {...systemWaypoints.data.meta} />
                </div>
            </nav>
        </div>
    );
}

function WaypointRow({
    waypoint,
    shipDetails,
    onTraitClick,
}: {
    waypoint: Waypoint;
    shipDetails: Ship;
    onTraitClick: (trait: WaypointTraitSymbol) => void;
}) {
    const currentLocation = shipDetails.nav.route.destination;

    const url = new URL(window.location.href);

    const selectedTraits = url.searchParams.getAll("traits");

    const distance = Math.round(
        Math.sqrt(
            Math.pow(waypoint.x - currentLocation.x, 2) +
                Math.pow(waypoint.y - currentLocation.y, 2),
        ),
    );

    return (
        <TableRow>
            <TableCell>
                <Link
                    href={route("systems.waypoints.show", [
                        waypoint.systemSymbol,
                        waypoint.symbol,
                    ])}
                >
                    {waypoint.symbol}
                </Link>
            </TableCell>
            <TableCell className={waypointColorMap[waypoint.type].textClass}>
                {waypoint.type}
            </TableCell>
            <TableCell>{`${waypoint.isUnderConstruction}`}</TableCell>
            <TableCell className="flex flex-wrap gap-2">
                {waypoint.traits.map((trait) => {
                    return (
                        <BadgeButton
                            key={trait.symbol}
                            title={trait.description}
                            onClick={() => onTraitClick(trait.symbol)}
                            color={
                                selectedTraits.includes(trait.symbol)
                                    ? "lime"
                                    : "zinc"
                            }
                        >
                            {trait.name}
                        </BadgeButton>
                    );
                })}
            </TableCell>
            <TableCell>{distance} AU</TableCell>
            <TableCell>
                <Navigate
                    shipDetails={shipDetails}
                    waypointSymbol={waypoint.symbol}
                    canReach={distance <= shipDetails.fuel.current}
                />
            </TableCell>
        </TableRow>
    );
}

function NextButton({
    limit,
    page,
    total,
}: {
    limit: number;
    page: number;
    total: number;
}) {
    const hasNextPage = total > page * limit;
    const currentRoute = route().current();

    if (!currentRoute) {
        return null;
    }

    return (
        <Button
            disabled={!hasNextPage}
            onClick={() => {
                router.visit(
                    route(currentRoute, {
                        ship: route().params.ship,
                        type: route().params.type,
                        page: page + 1,
                    }),
                    { preserveScroll: true },
                );
            }}
            color={hasNextPage ? "dark" : "white"}
        >
            Next
        </Button>
    );
}

function PrevButton({ page }: { limit: number; page: number; total: number }) {
    const hasPrevPage = page > 1;

    const currentRoute = route().current();

    if (!currentRoute) {
        return null;
    }

    return (
        <Button
            disabled={!hasPrevPage}
            onClick={() => {
                if (page - 1 > 1) {
                    router.visit(
                        route(currentRoute, {
                            ship: route().params.ship,
                            type: route().params.type,
                            page: page - 1,
                        }),
                        { preserveScroll: true },
                    );
                } else {
                    router.visit(
                        route(currentRoute, {
                            ship: route().params.ship,
                            type: route().params.type,
                        }),
                        { preserveScroll: true },
                    );
                }
            }}
            color={hasPrevPage ? "dark" : "white"}
        >
            Previous
        </Button>
    );
}
