import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";

import { useShip } from "@/hooks/useShip";

import { Button } from "./catalyst/button";
import { Countdown } from "./Countdown";

const cargoStatusColorMap = {
    good: {
        container: "border-green-500 bg-green-50",
        progressBar: "fill-green-300",
        progressText: "fill-green-700",
    },
    warning: {
        container: "border-yellow-500 bg-yellow-50",
        progressBar: "fill-yellow-300",
        progressText: "fill-yellow-700",
    },
    critical: {
        container: "border-red-500 bg-red-50",
        progressBar: "fill-red-300",
        progressText: "fill-red-700",
    },
};

function getCargoStatus(percentage: number) {
    if (percentage >= 75) {
        return "critical";
    } else if (percentage >= 55) {
        return "warning";
    } else {
        return "good";
    }
}

export function ShipCargo({ shipSymbol }: { shipSymbol: string }) {
    const queryClient = useQueryClient();

    const ship = useShip(shipSymbol);

    console.log(ship.data);

    const mutation = useMutation({
        mutationFn: () => {
            return window.axios.post(
                route("api.ships.extract.store", shipSymbol),
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ships", shipSymbol] });
        },
    });

    if (ship.data === undefined) {
        return <div>Loading...</div>;
    }

    const canExtract =
        ship.data.nav.status === "IN_ORBIT" && !ship.data.cooldown.expiration;

    const cargoPercentage = Math.round(
        (ship.data.cargo.units / ship.data.cargo.capacity) * 100,
    );

    const fuelStatus = getCargoStatus(cargoPercentage);

    return (
        <div className="relative flex flex-col gap-4 overflow-hidden rounded-lg bg-white p-6 shadow">
            <div
                className={clsx(
                    "h-8 overflow-hidden rounded-lg border shadow-inner",
                    cargoStatusColorMap[fuelStatus].container,
                )}
            >
                <svg width="100%" height="100%">
                    <rect
                        x="0"
                        y="0"
                        width={`${cargoPercentage}%`}
                        height="100%"
                        className={cargoStatusColorMap[fuelStatus].progressBar}
                    />
                    <text
                        x="90%"
                        y="50%"
                        fontSize="1rem"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className={clsx(
                            "font-bold",
                            cargoStatusColorMap[fuelStatus].progressText,
                        )}
                    >
                        {cargoPercentage}%
                    </text>
                </svg>
            </div>
            <div className="flex items-center justify-between">
                <p className="flex gap-1 font-medium">
                    Cargo Units:
                    <span className="text-gray-600">
                        {`${ship.data.cargo.units} / ${ship.data.cargo.capacity}`}{" "}
                    </span>
                </p>

                <Button
                    type="submit"
                    disabled={mutation.isPending || !canExtract}
                    onClick={() => {
                        mutation.mutate();
                    }}
                >
                    Extract
                </Button>
            </div>
            {ship.data.cooldown.expiration && (
                <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-gray-800/60 text-2xl font-bold text-gray-50">
                    <Countdown
                        endDateTimeStamp={ship.data.cooldown.expiration}
                        onFinish={() => {
                            queryClient.invalidateQueries({
                                queryKey: ["ships", shipSymbol],
                            });
                        }}
                    />
                </div>
            )}
        </div>
    );
}
