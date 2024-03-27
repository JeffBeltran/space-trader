import { Head } from "@inertiajs/react";

import { ShipAvatar } from "@/Components/ShipAvatar";
import { ShipCargo } from "@/Components/ShipCargo";
import { ShipFuel } from "@/Components/ShipFuel";
import { ShipNavigation } from "@/Components/ShipNavigation";
import { ShipSystemWaypointsCard } from "@/Components/ShipSystemWaypointsCard";
import { useShipWithInitialData } from "@/hooks/useShip";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import type { PageProps } from "@/types";
import type { ShipShowProps } from "@/types/pages/ship";

export default function Index({ auth, shipDetails }: PageProps<ShipShowProps>) {
    const ship = useShipWithInitialData(
        shipDetails.data.symbol,
        shipDetails.data,
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="md:flex md:items-center md:justify-between md:space-x-5">
                    <div className="flex items-start space-x-5">
                        <div className="flex-shrink-0">
                            <div className="relative">
                                <ShipAvatar
                                    shipSymbol={ship.data.registration.name}
                                />
                            </div>
                        </div>
                        <div className="pt-1.5">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {ship.data.registration.name}
                            </h1>
                            <p className="text-sm font-medium text-gray-500">
                                {ship.data.registration.role}
                            </p>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title={ship.data.registration.name} />

            <div className="py-6">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-3 gap-6">
                        <ShipFuel shipSymbol={ship.data.registration.name} />
                        <ShipCargo shipSymbol={ship.data.registration.name} />
                        <ShipNavigation
                            shipSymbol={ship.data.registration.name}
                        />
                    </div>
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <ShipSystemWaypointsCard
                            shipSymbol={ship.data.symbol}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
