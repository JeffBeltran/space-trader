import type { SpaceTraderPaginationResponse } from "./space-traders-api";

export type SystemType =
    | "NEUTRON_STAR"
    | "RED_STAR"
    | "ORANGE_STAR"
    | "BLUE_STAR"
    | "YOUNG_STAR"
    | "WHITE_DWARF"
    | "BLACK_HOLE"
    | "HYPERGIANT"
    | "NEBULA"
    | "UNSTABLE";

export type WaypointType =
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

export type SystemWaypoint = {
    symbol: string;
    type: WaypointType;
    x: number;
    y: number;
    orbitals: [
        {
            symbol: string;
        },
    ];
    orbits?: string;
};

export type System = {
    symbol: string;
    sectorSymbol: string;
    type: SystemType;
    x: number;
    y: number;
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
