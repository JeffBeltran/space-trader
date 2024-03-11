import type { SpaceTraderPaginationResponse } from "./space-traders-api";

type Waypoint =
    | "PLANET"
    | "GAS_GIANT"
    | "MOON"
    | "ORBITAL_STATION"
    | "JUMP_GATE"
    | "ASTEROID_FIELD"
    | "ASTEROID"
    | "ENGINEERED_ASTEROID"
    | "ASTEROID_BASE"
    | "NEBULA"
    | "DEBRIS_FIELD"
    | "GRAVITY_WELL"
    | "ARTIFICIAL_GRAVITY_WELL"
    | "FUEL_STATION";

type SystemWaypoint = {
    symbol: string;
    type: Waypoint;
    x: 0;
    y: 0;
    orbitals: [
        {
            symbol: string;
        },
    ];
    orbits: string;
};

type System = {
    symbol: string;
    sectorSymbol: string;
    type: string;
    x: 0;
    y: 0;
    waypoints: Array<SystemWaypoint>;
    factions: [
        {
            symbol: string;
        },
    ];
};

export type SystemIndexProps = {
    listSystems: SpaceTraderPaginationResponse<System>;
};
export type SystemShowProps = {
    systemDetails: System;
};
