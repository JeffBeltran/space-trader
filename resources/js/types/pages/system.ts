import type { SpaceTraderPaginationResponse } from "../space-traders-api";
import type { System } from "../space-traders-api/system";
import type { Waypoint } from "../space-traders-api/waypoint";

export type SystemIndexProps = {
    listSystems: SpaceTraderPaginationResponse<System>;
};

export type SystemShowProps = {
    systemDetails: System;
    waypoints: SpaceTraderPaginationResponse<Waypoint>;
    systemMap: System;
};
