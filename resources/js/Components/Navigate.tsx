import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Badge } from "./catalyst/badge";
import { Button } from "./catalyst/button";

import type { Ship } from "@/types/space-traders-api/ship";

export function Navigate({
    shipDetails,
    waypointSymbol,
    canReach,
}: {
    shipDetails: Ship;
    waypointSymbol: string;
    canReach: boolean;
}) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: () => {
            return window.axios.post(
                route("api.ships.navigate.store", shipDetails.symbol),
                {
                    waypointSymbol,
                },
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["ships", shipDetails.symbol],
            });
        },
    });

    const canNavigate = shipDetails.nav.status === "IN_ORBIT";

    if (canReach) {
        return (
            <Button
                type="submit"
                disabled={mutation.isPending || !canNavigate}
                onClick={() => {
                    mutation.mutate();
                }}
            >
                Navigate
            </Button>
        );
    }

    return <Badge color="red">Out of Range</Badge>;
}
