import { DateTime } from "luxon";

import { Link } from "./catalyst/link";

import type { GetStatusResponse } from "@/types/space-traders-api";

export function ServerStatus({ status }: { status: GetStatusResponse }) {
    return (
        <div>
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                    SpaceTraders Server Status
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                    {status.status}
                </p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Version
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {status.version}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Last Reset
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {DateTime.fromISO(status.resetDate).toRelative()}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Resets
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {DateTime.fromISO(
                                status.serverResets.next,
                            ).toRelativeCalendar()}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Total Agents
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {status.stats.agents.toLocaleString()}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Total Ships
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {status.stats.ships.toLocaleString()}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Total Systems
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {status.stats.systems.toLocaleString()}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Total Waypoints
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {status.stats.waypoints.toLocaleString()}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Most Submitted Charts
                        </dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {status.leaderboards.mostSubmittedCharts.length >
                            0 ? (
                                <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                    {status.leaderboards.mostSubmittedCharts.map(
                                        (mostSubmittedChart, idx) => {
                                            return (
                                                <li
                                                    key={
                                                        mostSubmittedChart.agentSymbol +
                                                        idx
                                                    }
                                                    className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                                                >
                                                    <div className="flex w-0 flex-1 items-center">
                                                        <div className="flex min-w-0 flex-1 gap-2">
                                                            <Link
                                                                className="truncate font-medium"
                                                                href={route(
                                                                    "agents.show",
                                                                    mostSubmittedChart.agentSymbol,
                                                                )}
                                                            >
                                                                {
                                                                    mostSubmittedChart.agentSymbol
                                                                }
                                                            </Link>
                                                            <span className="flex-shrink-0 text-gray-400">
                                                                {mostSubmittedChart.chartCount.toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        },
                                    )}
                                </ul>
                            ) : (
                                <NoData />
                            )}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Most Credits
                        </dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                {status.leaderboards.mostCredits.length > 0 ? (
                                    status.leaderboards.mostCredits.map(
                                        (mostCredit, idx) => {
                                            return (
                                                <li
                                                    key={
                                                        mostCredit.agentSymbol +
                                                        idx
                                                    }
                                                    className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                                                >
                                                    <div className="flex w-0 flex-1 items-center">
                                                        <div className="flex min-w-0 flex-1 gap-2">
                                                            <Link
                                                                preserveScroll
                                                                className="truncate font-medium"
                                                                href={route(
                                                                    "agents.show",
                                                                    mostCredit.agentSymbol,
                                                                )}
                                                            >
                                                                {
                                                                    mostCredit.agentSymbol
                                                                }
                                                            </Link>
                                                            <span className="flex-shrink-0 text-gray-400">
                                                                {mostCredit.credits.toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        },
                                    )
                                ) : (
                                    <NoData />
                                )}
                            </ul>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}

function NoData() {
    return (
        <div className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center">
            <span className="mt-2 block text-sm font-semibold text-gray-700">
                No Data
            </span>
        </div>
    );
}
