import { Head } from "@inertiajs/react";
import clsx from "clsx";

import { SystemDetailsCard } from "@/Components/SystemDetailsCard";
import { SystemWaypointListItem } from "@/Components/WaypointListItem";
import { useSystemColors } from "@/hooks/useSystemColors";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import type { PageProps } from "@/types";
import type { SystemShowProps } from "@/types/system";

export default function Index({
    auth,
    systemDetails,
}: PageProps<SystemShowProps>) {
    const { textClass } = useSystemColors(systemDetails.type);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    System{" "}
                    <span className={clsx("font-mono", textClass)}>
                        {systemDetails.symbol}
                    </span>{" "}
                    Details
                </h2>
            }
        >
            <Head title={`${systemDetails.symbol} System`} />

            <main className="mt-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                            <section aria-labelledby="section-1-title">
                                <div className="overflow-hidden rounded-lg bg-white shadow">
                                    <ul className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                                        {systemDetails.waypoints.map(
                                            (systemWaypoint) => {
                                                return (
                                                    <SystemWaypointListItem
                                                        key={
                                                            systemWaypoint.symbol
                                                        }
                                                        systemWaypoint={
                                                            systemWaypoint
                                                        }
                                                    />
                                                );
                                            },
                                        )}
                                    </ul>
                                </div>
                            </section>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <section aria-labelledby="section-2-title">
                                <div className="overflow-hidden rounded-lg bg-white shadow">
                                    <SystemDetailsCard system={systemDetails} />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
