import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";

import { useShip } from "@/hooks/useShip";

import { Button } from "./catalyst/button";

const fuelStatusColorMap = {
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

function getFuelStatus(percentage: number) {
    if (percentage >= 75) {
        return "good";
    } else if (percentage >= 35) {
        return "warning";
    } else {
        return "critical";
    }
}

export function ShipFuel({ shipSymbol }: { shipSymbol: string }) {
    const queryClient = useQueryClient();

    const ship = useShip(shipSymbol);

    const mutation = useMutation({
        mutationFn: () => {
            return window.axios.post(
                route("api.ships.refuel.store", shipSymbol),
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ships", shipSymbol] });
        },
    });

    if (ship.data === undefined) {
        return <div>Loading...</div>;
    }

    const canRefuel = ship.data.nav.status === "DOCKED";
    const fuelPercentage = Math.round(
        (ship.data.fuel.current / ship.data.fuel.capacity) * 100,
    );

    const fuelStatus = getFuelStatus(fuelPercentage);

    return (
        <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow">
            <div
                className={clsx(
                    "h-8 overflow-hidden rounded-lg border shadow-inner",
                    fuelStatusColorMap[fuelStatus].container,
                )}
            >
                <svg width="100%" height="100%">
                    <rect
                        x="0"
                        y="0"
                        width={`${fuelPercentage}%`}
                        height="100%"
                        className={fuelStatusColorMap[fuelStatus].progressBar}
                    />
                    <text
                        x="90%"
                        y="50%"
                        fontSize="1rem"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className={clsx(
                            "font-bold",
                            fuelStatusColorMap[fuelStatus].progressText,
                        )}
                    >
                        {fuelPercentage}%
                    </text>
                </svg>
            </div>
            <div className="flex items-center justify-between">
                <p className="flex gap-1 font-medium">
                    Fuel Units:
                    <span className="text-gray-600">
                        {`${ship.data.fuel.current} / ${ship.data.fuel.capacity}`}{" "}
                    </span>
                </p>

                <Button
                    type="submit"
                    disabled={mutation.isPending || !canRefuel}
                    onClick={() => {
                        mutation.mutate();
                    }}
                >
                    Refuel
                </Button>
            </div>
        </div>
    );
}
