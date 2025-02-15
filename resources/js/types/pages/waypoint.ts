import type { SpaceTraderResponse } from "../space-traders-api";
import type { System } from "../space-traders-api/system";
import type { Waypoint } from "../space-traders-api/waypoint";

export type WaypointShowProps = {
    waypointDetails: SpaceTraderResponse<Waypoint>;
    systemDetails: SpaceTraderResponse<System>;
};
