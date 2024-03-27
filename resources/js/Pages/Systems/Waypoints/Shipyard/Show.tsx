import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Head } from "@inertiajs/react";
import clsx from "clsx";
import { DateTime } from "luxon";

import { Link } from "@/Components/catalyst/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/catalyst/table";
import { ShipyardSlideOver } from "@/Components/ShipyardSlideOver";
import { waypointColorMap } from "@/hooks/useWaypointColors";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import type { PageProps } from "@/types";
import type { ShipyardIndexProps } from "@/types/pages/shipyard";

export default function Show({
    auth,
    waypointDetails,
    shipyardDetails,
}: PageProps<ShipyardIndexProps>) {
    const totalShips = shipyardDetails.data.ships?.length ?? 0;

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
                                <li>
                                    <div className="flex items-center">
                                        <ChevronRightIcon
                                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        <Link
                                            href={route(
                                                "systems.waypoints.show",
                                                [
                                                    waypointDetails.data
                                                        .systemSymbol,
                                                    waypointDetails.data.symbol,
                                                ],
                                            )}
                                            className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                        >
                                            {waypointDetails.data.symbol}
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
                                        waypointColorMap[
                                            waypointDetails.data.type
                                        ].textClass,
                                    )}
                                >
                                    {waypointDetails.data.type} Shipyard
                                </span>
                            </h2>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title={`${waypointDetails.data.symbol} System`} />

            <main className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">
                                Available Ships
                            </h3>
                        </div>
                        <div className="px-4 py-4 sm:px-6">
                            <Table
                                bleed
                                className="[--gutter:theme(spacing.4)] sm:[--gutter:theme(spacing.6)]"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableHeader>Name</TableHeader>
                                        <TableHeader>Type</TableHeader>
                                        <TableHeader>Supply</TableHeader>
                                        <TableHeader>
                                            Purchase Price
                                        </TableHeader>
                                        <TableHeader />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {totalShips === 0 && (
                                        <TableRow>
                                            <TableCell
                                                className="bg-yellow-50 text-center font-medium text-yellow-700"
                                                colSpan={5}
                                            >
                                                No Ships Available for Purchase
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {shipyardDetails.data.ships?.map((ship) => (
                                        <TableRow key={ship.name}>
                                            <TableCell className="font-medium">
                                                {ship.name}
                                            </TableCell>
                                            <TableCell>{ship.type}</TableCell>
                                            <TableCell>{ship.supply}</TableCell>
                                            <TableCell>
                                                {ship.purchasePrice.toLocaleString()}
                                            </TableCell>
                                            <ShipyardSlideOver
                                                shipyardDetails={
                                                    shipyardDetails.data
                                                }
                                                shipDetails={ship}
                                            />
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    <div className="mt-8 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">
                                Shipyard Transactions
                            </h3>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                            <ul className="space-y-6">
                                {shipyardDetails.data.transactions?.map(
                                    (transaction, idx, allTransactions) => (
                                        <li
                                            key={transaction.timestamp}
                                            className="relative flex gap-x-4"
                                        >
                                            <div
                                                className={clsx(
                                                    idx ===
                                                        allTransactions.length -
                                                            1
                                                        ? "h-6"
                                                        : "-bottom-6",
                                                    "absolute left-0 top-0 flex w-6 justify-center",
                                                )}
                                            >
                                                <div className="w-px bg-gray-200" />
                                            </div>

                                            <>
                                                <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                                                </div>
                                                <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                                                    <span className="font-medium text-gray-900">
                                                        {
                                                            transaction.agentSymbol
                                                        }
                                                    </span>{" "}
                                                    purchased{" "}
                                                    {transaction.shipType}.
                                                </p>
                                                <time
                                                    dateTime={
                                                        transaction.timestamp
                                                    }
                                                    className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                                                >
                                                    {DateTime.fromISO(
                                                        transaction.timestamp,
                                                    ).toRelativeCalendar()}
                                                </time>
                                            </>
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
