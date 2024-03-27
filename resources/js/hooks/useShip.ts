import { useQuery } from "@tanstack/react-query";

import type { SpaceTraderResponse } from "@/types/space-traders-api";
import type { Ship } from "@/types/space-traders-api/ship";

export function useShipWithInitialData(shipSymbol: string, initialData: Ship) {
    return useQuery({
        queryKey: ["ships", shipSymbol],
        queryFn: () => {
            return window.axios
                .get<SpaceTraderResponse<Ship>>(
                    route("api.ships.show", {
                        ship: shipSymbol,
                    }),
                )
                .then((res) => res.data.data);
        },
        initialData,
    });
}

export function useShip(shipSymbol: string) {
    return useQuery({
        queryKey: ["ships", shipSymbol],
        queryFn: () => {
            return window.axios
                .get<SpaceTraderResponse<Ship>>(
                    route("api.ships.show", {
                        ship: shipSymbol,
                    }),
                )
                .then((res) => res.data.data);
        },
    });
}
