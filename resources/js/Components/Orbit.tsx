import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useShip } from "@/hooks/useShip";

import { Button } from "./catalyst/button";

export function Orbit({ shipSymbol }: { shipSymbol: string }) {
    const queryClient = useQueryClient();
    const ship = useShip(shipSymbol);

    const mutation = useMutation({
        mutationFn: () => {
            return window.axios.post(
                route("api.ships.orbit.store", shipSymbol),
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ships", shipSymbol] });
        },
    });

    if (ship.data === undefined) {
        return <div>Loading...</div>;
    }

    const canOrbit = ship.data.nav.status === "DOCKED";

    return (
        <Button
            type="submit"
            disabled={mutation.isPending || !canOrbit}
            onClick={() => {
                mutation.mutate();
            }}
        >
            Orbit
        </Button>
    );
}
