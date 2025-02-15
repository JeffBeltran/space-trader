import type { FactionSymbol } from "./faction";

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

export type WaypointTraitSymbol =
    | "UNCHARTED"
    | "UNDER_CONSTRUCTION"
    | "MARKETPLACE"
    | "SHIPYARD"
    | "OUTPOST"
    | "SCATTERED_SETTLEMENTS"
    | "SPRAWLING_CITIES"
    | "MEGA_STRUCTURES"
    | "PIRATE_BASE"
    | "OVERCROWDED"
    | "HIGH_TECH"
    | "CORRUPT"
    | "BUREAUCRATIC"
    | "TRADING_HUB"
    | "INDUSTRIAL"
    | "BLACK_MARKET"
    | "RESEARCH_FACILITY"
    | "MILITARY_BASE"
    | "SURVEILLANCE_OUTPOST"
    | "EXPLORATION_OUTPOST"
    | "MINERAL_DEPOSITS"
    | "COMMON_METAL_DEPOSITS"
    | "PRECIOUS_METAL_DEPOSITS"
    | "RARE_METAL_DEPOSITS"
    | "METHANE_POOLS"
    | "ICE_CRYSTALS"
    | "EXPLOSIVE_GASES"
    | "STRONG_MAGNETOSPHERE"
    | "VIBRANT_AURORAS"
    | "SALT_FLATS"
    | "CANYONS"
    | "PERPETUAL_DAYLIGHT"
    | "PERPETUAL_OVERCAST"
    | "DRY_SEABEDS"
    | "MAGMA_SEAS"
    | "SUPERVOLCANOES"
    | "ASH_CLOUDS"
    | "VAST_RUINS"
    | "MUTATED_FLORA"
    | "TERRAFORMED"
    | "EXTREME_TEMPERATURES"
    | "EXTREME_PRESSURE"
    | "DIVERSE_LIFE"
    | "SCARCE_LIFE"
    | "FOSSILS"
    | "WEAK_GRAVITY"
    | "STRONG_GRAVITY"
    | "CRUSHING_GRAVITY"
    | "TOXIC_ATMOSPHERE"
    | "CORROSIVE_ATMOSPHERE"
    | "BREATHABLE_ATMOSPHERE"
    | "THIN_ATMOSPHERE"
    | "JOVIAN"
    | "ROCKY"
    | "VOLCANIC"
    | "FROZEN"
    | "SWAMP"
    | "BARREN"
    | "TEMPERATE"
    | "JUNGLE"
    | "OCEAN"
    | "RADIOACTIVE"
    | "MICRO_GRAVITY_ANOMALIES"
    | "DEBRIS_CLUSTER"
    | "DEEP_CRATERS"
    | "SHALLOW_CRATERS"
    | "UNSTABLE_COMPOSITION"
    | "HOLLOWED_INTERIOR"
    | "STRIPPED";

type WaypointModifierSymbol =
    | "STRIPPED"
    | "UNSTABLE"
    | "RADIATION_LEAK"
    | "CRITICAL_LIMIT"
    | "CIVIL_UNREST";

type WaypointModifier = {
    symbol: WaypointModifierSymbol;
    name: string;
    description: string;
};

type WaypointTrait = {
    symbol: WaypointTraitSymbol;
    name: string;
    description: string;
};

export type WaypointOrbital = {
    symbol: string;
};

export type Waypoint = {
    symbol: string;
    type: WaypointType;
    systemSymbol: string;
    x: number;
    y: number;
    orbitals: Array<WaypointOrbital>;
    orbits?: string;
    faction: {
        symbol: FactionSymbol;
    };
    traits: Array<WaypointTrait>;
    modifiers: Array<WaypointModifier>;
    chart: {
        waypointSymbol: string;
        submittedBy: string;
        submittedOn: string;
    };
    isUnderConstruction: boolean;
};
