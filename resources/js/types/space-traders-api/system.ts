import type { WaypointType } from "./waypoint";

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
