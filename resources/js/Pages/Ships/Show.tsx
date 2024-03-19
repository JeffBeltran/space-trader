import { Head } from "@inertiajs/react";

import { useShipAvatar } from "@/hooks/useShipAvatar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import type { PageProps } from "@/types";
import type { ShipShowProps } from "@/types/pages/ship";

export default function Index({ auth, shipDetails }: PageProps<ShipShowProps>) {
    const avatar = useShipAvatar(
        shipDetails.data.registration.role,
        shipDetails.data.registration.name,
    );

    console.log(shipDetails);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="md:flex md:items-center md:justify-between md:space-x-5">
                    <div className="flex items-start space-x-5">
                        <div className="flex-shrink-0">
                            <div className="relative">
                                <img
                                    className="h-16 w-16 rounded-full"
                                    src={avatar}
                                    alt={`${shipDetails.data.registration.name} avatar`}
                                />
                            </div>
                        </div>
                        <div className="pt-1.5">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {shipDetails.data.registration.name}
                            </h1>
                            <p className="text-sm font-medium text-gray-500">
                                {shipDetails.data.registration.role}
                            </p>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title={shipDetails.data.registration.name} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="px-4 py-5 sm:p-6">
                            {/* Content goes here */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
