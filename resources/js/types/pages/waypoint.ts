import type { SpaceTraderResponse } from "../space-traders-api";
import type { Waypoint } from "../space-traders-api/waypoint";

export type WaypointShowProps = {
    waypointDetails: SpaceTraderResponse<Waypoint>;
};
