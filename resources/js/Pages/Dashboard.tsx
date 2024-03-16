import { Head } from "@inertiajs/react";

import { Link } from "@/Components/catalyst/link";
import { ServerStatus } from "@/Components/ServerStatus";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import type { PageProps } from "@/types";
import type { GetStatusResponse } from "@/types/space-traders-api";
import type { Agent } from "@/types/space-traders-api/agent";

export default function Dashboard({
    auth,
    gameStatus,
    agentData,
}: PageProps<{ gameStatus: GetStatusResponse; agentData: Agent | null }>) {
    const [sector, system] = agentData?.headquarters.split("-") ?? [];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        {agentData && (
                            <>
                                <Link
                                    href={route(
                                        "agents.show",
                                        agentData.symbol,
                                    )}
                                >
                                    <div className="overflow-hidden bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                                        <dt className="truncate text-sm font-medium text-gray-500">
                                            Active Agent
                                        </dt>
                                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                                            {agentData.symbol}
                                        </dd>
                                    </div>
                                </Link>
                                <Link
                                    href={route("systems.waypoints.show", [
                                        `${sector}-${system}`,
                                        agentData.headquarters,
                                    ])}
                                >
                                    <div className="overflow-hidden bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                                        <dt className="truncate text-sm font-medium text-gray-500">
                                            Headquarters
                                        </dt>
                                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                                            {agentData.headquarters}
                                        </dd>
                                    </div>
                                </Link>
                                <div className="overflow-hidden bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                                    <dt className="truncate text-sm font-medium text-gray-500">
                                        Credits
                                    </dt>
                                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                                        {agentData.credits.toLocaleString()}
                                    </dd>
                                </div>
                            </>
                        )}
                    </dl>

                    <div className="mt-6 bg-white shadow sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <ServerStatus status={gameStatus} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
