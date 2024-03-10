import { Head } from "@inertiajs/react";

import { Button } from "@/Components/catalyst/button";
import { ShipCard } from "@/Components/ShipCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import type { PageProps } from "@/types";
import type { ShipIndexProps } from "@/types/ships";

export default function Index({ auth, listShips }: PageProps<ShipIndexProps>) {
    console.log(listShips);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="md:flex md:items-center md:justify-between">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                            Ship Yard
                        </h2>
                    </div>
                    <div className="mt-4 flex gap-x-3 md:ml-4 md:mt-0">
                        <Button type="button">Purchase a Ship</Button>
                    </div>
                </div>
            }
        >
            <Head title="Agents" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {listShips.data.map((ship) => {
                            return (
                                <ShipCard
                                    key={ship.symbol}
                                    shipDetails={ship}
                                />
                            );
                        })}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
