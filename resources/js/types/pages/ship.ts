import type {
    SpaceTraderPaginationResponse,
    SpaceTraderResponse,
} from "../space-traders-api";
import type { Ship } from "../space-traders-api/ship";

export type ShipIndexProps = {
    listShips: SpaceTraderPaginationResponse<Ship>;
};

export type ShipShowProps = {
    shipDetails: SpaceTraderResponse<Ship>;
};
