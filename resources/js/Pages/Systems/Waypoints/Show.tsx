import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Head } from "@inertiajs/react";
import clsx from "clsx";

import { Button } from "@/Components/catalyst/button";
import { Link } from "@/Components/catalyst/link";
import { WaypointDetailsCard } from "@/Components/WaypointDetailsCard";
import { useWaypointColors } from "@/hooks/useWaypointColors";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import type { PageProps } from "@/types";
import type { WaypointShowProps } from "@/types/pages/waypoint";

export default function Show({
    auth,
    waypointDetails,
    systemDetails,
}: PageProps<WaypointShowProps>) {
    console.log(waypointDetails);

    const { textClass } = useWaypointColors(waypointDetails.data.type);

    const hasShipyard = waypointDetails.data.traits.some(
        (trait) => trait.symbol === "SHIPYARD",
    );

    const hasMarket = waypointDetails.data.traits.some(
        (trait) => trait.symbol === "MARKETPLACE",
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <div>
                        <nav className="sm:hidden" aria-label="Back">
                            <Link
                                href={route(
                                    "systems.show",
                                    waypointDetails.data.systemSymbol,
                                )}
                                className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                            >
                                <ChevronLeftIcon
                                    className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
                                    aria-hidden="true"
                                />
                                System
                            </Link>
                        </nav>
                        <nav className="hidden sm:flex" aria-label="Breadcrumb">
                            <ol className="flex items-center space-x-4">
                                <li>
                                    <div className="flex">
                                        <Link
                                            href={route("systems.index")}
                                            className="text-sm font-medium text-gray-500 hover:text-gray-700"
                                        >
                                            Systems
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <ChevronRightIcon
                                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        <Link
                                            href={route(
                                                "systems.show",
                                                waypointDetails.data
                                                    .systemSymbol,
                                            )}
                                            className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                        >
                                            {waypointDetails.data.systemSymbol}
                                        </Link>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="mt-2 md:flex md:items-center md:justify-between">
                        <div className="min-w-0 flex-1">
                            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                                <span
                                    className={clsx(
                                        "mr-2 font-mono",
                                        textClass,
                                    )}
                                >
                                    {waypointDetails.data.type}
                                </span>
                                <span className="font-mono">
                                    {waypointDetails.data.symbol}
                                </span>
                            </h2>
                        </div>
                        <div className="mt-4 flex gap-x-3 md:ml-4 md:mt-0">
                            {hasShipyard ? (
                                <Button
                                    href={route(
                                        "systems.waypoints.shipyard.index",
                                        [
                                            waypointDetails.data.systemSymbol,
                                            waypointDetails.data.symbol,
                                        ],
                                    )}
                                >
                                    View Shipyard
                                </Button>
                            ) : (
                                <Button disabled>View Shipyard</Button>
                            )}

                            {hasMarket ? (
                                <Button
                                    href={route(
                                        "systems.waypoints.shipyard.index",
                                        [
                                            waypointDetails.data.systemSymbol,
                                            waypointDetails.data.symbol,
                                        ],
                                    )}
                                >
                                    View Market
                                </Button>
                            ) : (
                                <Button disabled>View Market</Button>
                            )}
                        </div>
                    </div>
                </div>
            }
        >
            <Head title={`${waypointDetails.data.symbol} System`} />

            <main className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                            <section aria-labelledby="section-1-title">
                                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                                    <div className="px-4 py-6 sm:px-6">
                                        <h3 className="text-base font-semibold leading-7 text-gray-900">
                                            Waypoint Traits
                                        </h3>
                                    </div>
                                    <div className="border-t border-gray-100">
                                        <dl className="divide-y divide-gray-100">
                                            {waypointDetails.data.traits.map(
                                                (trait) => {
                                                    return (
                                                        <div
                                                            key={trait.symbol}
                                                            className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                                                        >
                                                            <dt className="text-sm font-medium text-gray-900">
                                                                {trait.name}
                                                            </dt>
                                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                {
                                                                    trait.description
                                                                }
                                                            </dd>
                                                        </div>
                                                    );
                                                },
                                            )}
                                        </dl>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <section aria-labelledby="section-2-title">
                                <div className="overflow-hidden rounded-lg bg-white shadow">
                                    <WaypointDetailsCard
                                        system={systemDetails.data}
                                        waypoint={waypointDetails.data}
                                    />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
