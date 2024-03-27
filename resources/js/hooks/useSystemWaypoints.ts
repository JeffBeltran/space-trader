import { useQuery } from "@tanstack/react-query";

import type { SpaceTraderPaginationResponse } from "@/types/space-traders-api";
import type { Waypoint } from "@/types/space-traders-api/waypoint";

export function useSystemWaypoints(systemSymbol?: string) {
    const url = new URL(window.location.href);

    const type = url.searchParams.get("type");
    const page = url.searchParams.get("page");
    const limit = url.searchParams.get("limit");
    const traits = url.searchParams.getAll("traits");

    return useQuery({
        queryKey: ["waypoints", systemSymbol, type],
        queryFn: () => {
            return window.axios
                .get<SpaceTraderPaginationResponse<Waypoint>>(
                    route("api.systems.waypoints.index", {
                        system: systemSymbol,
                        page,
                        limit,
                        traits,
                        type,
                    }),
                )
                .then((res) => res.data);
        },
        enabled: !!systemSymbol,
    });
}
