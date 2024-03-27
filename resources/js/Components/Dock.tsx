import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useShip } from "@/hooks/useShip";

import { Button } from "./catalyst/button";

export function Dock({ shipSymbol }: { shipSymbol: string }) {
    const queryClient = useQueryClient();
    const ship = useShip(shipSymbol);

    const mutation = useMutation({
        mutationFn: () => {
            return window.axios.post(route("api.ships.dock.store", shipSymbol));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ships", shipSymbol] });
        },
    });

    if (ship.data === undefined) {
        return <div>Loading...</div>;
    }

    const canDock = ship.data.nav.status === "IN_ORBIT";

    return (
        <Button
            type="submit"
            disabled={mutation.isPending || !canDock}
            onClick={() => {
                mutation.mutate();
            }}
        >
            Dock
        </Button>
    );
}
