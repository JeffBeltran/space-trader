import { router } from "@inertiajs/react";
import { DateTime } from "luxon";

import { useShip } from "@/hooks/useShip";
import { shipColorMap } from "@/hooks/useShipStatusColors";

import { Badge } from "./catalyst/badge";
import { Link } from "./catalyst/link";
import { Countdown } from "./Countdown";
import { Dock } from "./Dock";
import { Orbit } from "./Orbit";

export function ShipNavigation({ shipSymbol }: { shipSymbol: string }) {
    const ship = useShip(shipSymbol);

    if (ship.data === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center rounded-lg bg-white p-6 shadow">
            <div className="flex flex-1 flex-col gap-2">
                <div>
                    <Badge
                        className="inline-block"
                        color={
                            shipColorMap[ship.data.nav.status].tailwindPalette
                        }
                    >
                        {ship.data.nav.status}
                    </Badge>
                    {DateTime.fromISO(ship.data.nav.route.arrival).toRelative()}
                </div>

                <Link
                    href={route("systems.waypoints.show", [
                        ship.data.nav.systemSymbol,
                        ship.data.nav.waypointSymbol,
                    ])}
                >
                    {ship.data.nav.waypointSymbol}
                </Link>
                {ship.data.nav.status === "IN_TRANSIT" && (
                    <Countdown
                        endDateTimeStamp={ship.data.nav.route.arrival}
                        onFinish={() => {
                            router.reload();
                        }}
                    />
                )}
            </div>
            <div className="flex flex-none flex-col items-center gap-2">
                <Orbit shipSymbol={shipSymbol} />
                <Dock shipSymbol={shipSymbol} />
            </div>
        </div>
    );
}
