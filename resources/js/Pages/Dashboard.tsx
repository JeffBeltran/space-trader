import { Head } from "@inertiajs/react";

import { ServerStatus } from "@/Components/ServerStatus";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import type { PageProps } from "@/types";
import type { GetStatusResponse } from "@/types/space-traders-api";

export default function Dashboard({
    auth,
    gameStatus,
}: PageProps<{ gameStatus: GetStatusResponse }>) {
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
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <ServerStatus status={gameStatus} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
