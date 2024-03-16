import type { SpaceTraderPaginationResponse } from "../space-traders-api";
import type { ShipDetails } from "../space-traders-api/ship";

export type ShipIndexProps = {
    listShips: SpaceTraderPaginationResponse<ShipDetails>;
};
