import type { SpaceTraderResponse } from "../space-traders-api";
import type { Shipyard } from "../space-traders-api/ship";
import type { Waypoint } from "../space-traders-api/waypoint";

export type ShipyardIndexProps = {
    waypointDetails: SpaceTraderResponse<Waypoint>;
    shipyardDetails: SpaceTraderResponse<Shipyard>;
};
