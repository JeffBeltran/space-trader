import { Head } from "@inertiajs/react";

import { SystemMap } from "@/Components/SystemMap";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import type { PageProps } from "@/types";
import type { SystemShowProps } from "@/types/system";

export default function Index({
    auth,
    systemDetails,
}: PageProps<SystemShowProps>) {
    console.log(systemDetails);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    System{" "}
                    <span className="font-mono text-gray-500">
                        {systemDetails.symbol}
                    </span>{" "}
                    Details
                </h2>
            }
        >
            <Head title={`${systemDetails.symbol} System`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <SystemMap waypoints={systemDetails.waypoints} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
