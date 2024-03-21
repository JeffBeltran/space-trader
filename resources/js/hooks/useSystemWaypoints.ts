import { useQuery } from "@tanstack/react-query";

import type { SpaceTraderPaginationResponse } from "@/types/space-traders-api";
import type { Waypoint } from "@/types/space-traders-api/waypoint";

export function useSystemWaypoints(systemSymbol: string) {
    const url = new URL(window.location.href);

    return useQuery({
        queryKey: ["waypoints", systemSymbol],
        queryFn: () => {
            return window.axios
                .get<SpaceTraderPaginationResponse<Waypoint>>(
                    route("systems.waypoints.index", {
                        system: systemSymbol,
                        page: url.searchParams.get("page"),
                        limit: url.searchParams.get("limit"),
                        traits: url.searchParams.getAll("traits"),
                        type: url.searchParams.get("type"),
                    }),
                )
                .then((res) => res.data);
        },
    });
}
