import clsx from "clsx";

import { useShipAvatar } from "@/hooks/useShipAvatar";
import { useShipRoleColors } from "@/hooks/useShipRoleColors";
import { useShipStatusColors } from "@/hooks/useShipStatusColors";

import { Badge } from "./catalyst/badge";
import { Link } from "./catalyst/link";

import type { ShipDetails } from "@/types/ships";

export function ShipCard({ shipDetails }: { shipDetails: ShipDetails }) {
    const avatar = useShipAvatar(
        shipDetails.registration.role,
        shipDetails.registration.name,
    );

    const { tailwindPalette } = useShipStatusColors(shipDetails.nav.status);
    const { textClass: roleTextClass } = useShipRoleColors(
        shipDetails.registration.role,
    );

    return (
        <li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
            <div className="flex flex-1 flex-col p-8">
                <img
                    className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                    src={avatar}
                    alt={`Avatar for ${shipDetails.registration.name}`}
                />
                <h3 className="mt-6 text-sm font-medium text-gray-900">
                    {shipDetails.registration.name}
                </h3>
                <dl className="mt-1 flex flex-grow flex-col justify-between">
                    <dt className="sr-only">Title</dt>
                    <dd className={clsx("text-sm", roleTextClass)}>
                        {shipDetails.registration.role}
                    </dd>
                    <dt className="sr-only">Role</dt>
                    <dd className="mt-3">
                        <Badge color={tailwindPalette}>
                            {shipDetails.nav.status}
                        </Badge>
                    </dd>
                </dl>
            </div>
            <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="flex w-0 flex-1">
                        <div className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                            ????
                        </div>
                    </div>
                    <div className="-ml-px flex w-0 flex-1">
                        <div className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                            <Link
                                href={route("ships.show", shipDetails.symbol)}
                            >
                                Details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}
