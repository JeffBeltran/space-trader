import type { TradeSymbol } from "./trade";
import type { WaypointType } from "./waypoint";

export type ShipNavStatus = "IN_TRANSIT" | "DOCKED" | "IN_ORBIT";

type ShipNavFlightMode = "CRUISE" | "DRIFT" | "STEALTH" | "BURN";

type ShipCrewRotation = "STRICT" | "RELAXED";

export type ShipRole =
    | "FABRICATOR"
    | "HARVESTER"
    | "HAULER"
    | "INTERCEPTOR"
    | "EXCAVATOR"
    | "TRANSPORT"
    | "REPAIR"
    | "SURVEYOR"
    | "COMMAND"
    | "CARRIER"
    | "PATROL"
    | "SATELLITE"
    | "EXPLORER"
    | "REFINERY";

type ShipType =
    | "SHIP_PROBE"
    | "SHIP_MINING_DRONE"
    | "SHIP_SIPHON_DRONE"
    | "SHIP_INTERCEPTOR"
    | "SHIP_LIGHT_HAULER"
    | "SHIP_COMMAND_FRIGATE"
    | "SHIP_EXPLORER"
    | "SHIP_HEAVY_FREIGHTER"
    | "SHIP_LIGHT_SHUTTLE"
    | "SHIP_ORE_HOUND"
    | "SHIP_REFINING_FREIGHTER"
    | "SHIP_SURVEYOR";

type SupplyLevel = "SCARCE" | "LIMITED" | "MODERATE" | "HIGH" | "ABUNDANT";

type ActivityLevel = "WEAK" | "GROWING" | "STRONG" | "RESTRICTED";

type ShipFrameSymbol =
    | "FRAME_PROBE"
    | "FRAME_DRONE"
    | "FRAME_INTERCEPTOR"
    | "FRAME_RACER"
    | "FRAME_FIGHTER"
    | "FRAME_FRIGATE"
    | "FRAME_SHUTTLE"
    | "FRAME_EXPLORER"
    | "FRAME_MINER"
    | "FRAME_LIGHT_FREIGHTER"
    | "FRAME_HEAVY_FREIGHTER"
    | "FRAME_TRANSPORT"
    | "FRAME_DESTROYER"
    | "FRAME_CRUISER"
    | "FRAME_CARRIER";

type ShipReactorSymbol =
    | "REACTOR_SOLAR_I"
    | "REACTOR_FUSION_I"
    | "REACTOR_FISSION_I"
    | "REACTOR_CHEMICAL_I"
    | "REACTOR_ANTIMATTER_I";

type ShipEngineSymbol =
    | "ENGINE_IMPULSE_DRIVE_I"
    | "ENGINE_ION_DRIVE_I"
    | "ENGINE_ION_DRIVE_II"
    | "ENGINE_HYPER_DRIVE_I";

type ShipModuleSymbol =
    | "MODULE_MINERAL_PROCESSOR_I"
    | "MODULE_GAS_PROCESSOR_I"
    | "MODULE_CARGO_HOLD_I"
    | "MODULE_CARGO_HOLD_II"
    | "MODULE_CARGO_HOLD_III"
    | "MODULE_CREW_QUARTERS_I"
    | "MODULE_ENVOY_QUARTERS_I"
    | "MODULE_PASSENGER_CABIN_I"
    | "MODULE_MICRO_REFINERY_I"
    | "MODULE_ORE_REFINERY_I"
    | "MODULE_FUEL_REFINERY_I"
    | "MODULE_SCIENCE_LAB_I"
    | "MODULE_JUMP_DRIVE_I"
    | "MODULE_JUMP_DRIVE_II"
    | "MODULE_JUMP_DRIVE_III"
    | "MODULE_WARP_DRIVE_I"
    | "MODULE_WARP_DRIVE_II"
    | "MODULE_WARP_DRIVE_III"
    | "MODULE_SHIELD_GENERATOR_I"
    | "MODULE_SHIELD_GENERATOR_II";

type ShipMountSymbol =
    | "MOUNT_GAS_SIPHON_I"
    | "MOUNT_GAS_SIPHON_II"
    | "MOUNT_GAS_SIPHON_III"
    | "MOUNT_SURVEYOR_I"
    | "MOUNT_SURVEYOR_II"
    | "MOUNT_SURVEYOR_III"
    | "MOUNT_SENSOR_ARRAY_I"
    | "MOUNT_SENSOR_ARRAY_II"
    | "MOUNT_SENSOR_ARRAY_III"
    | "MOUNT_MINING_LASER_I"
    | "MOUNT_MINING_LASER_II"
    | "MOUNT_MINING_LASER_III"
    | "MOUNT_LASER_CANNON_I"
    | "MOUNT_MISSILE_LAUNCHER_I"
    | "MOUNT_TURRET_I";

type ShipMountDeposits =
    | "QUARTZ_SAND"
    | "SILICON_CRYSTALS"
    | "PRECIOUS_STONES"
    | "ICE_WATER"
    | "AMMONIA_ICE"
    | "IRON_ORE"
    | "COPPER_ORE"
    | "SILVER_ORE"
    | "ALUMINUM_ORE"
    | "GOLD_ORE"
    | "PLATINUM_ORE"
    | "DIAMONDS"
    | "URANITE_ORE"
    | "MERITIUM_ORE";

export type ShipRegistration = {
    name: string;
    factionSymbol: string;
    role: ShipRole;
};

type ShipNavRouteWaypoint = {
    symbol: string;
    type: WaypointType;
    systemSymbol: string;
    x: number;
    y: number;
};

type ShipNavRoute = {
    destination: ShipNavRouteWaypoint;
    origin: ShipNavRouteWaypoint;
    departureTime: string;
    arrival: string;
};

type ShipNav = {
    systemSymbol: string;
    waypointSymbol: string;
    route: ShipNavRoute;
    status: ShipNavStatus;
    flightMode: ShipNavFlightMode;
};

type ShipCrew = {
    current: number;
    required: number;
    capacity: number;
    rotation: ShipCrewRotation;
    morale: number;
    wages: number;
};

type ShipCargoItem = {
    symbol: TradeSymbol;
    name: string;
    description: string;
    units: number;
};

type ShipCargo = {
    capacity: number;
    units: number;
    inventory: Array<ShipCargoItem>;
};

type ShipFuel = {
    current: number;
    capacity: number;
    consumed: {
        amount: number;
        timestamp: string;
    };
};

export type Ship = {
    symbol: string;
    registration: ShipRegistration;
    nav: ShipNav;
    crew: ShipCrew;
    frame: ShipFrame;
    reactor: ShipReactor;
    engine: ShipEngine;
    cooldown: {
        shipSymbol: string;
        totalSeconds: number;
        remainingSeconds: number;
        expiration: string;
    };
    modules: Array<ShipModule>;
    mounts: Array<ShipMount>;
    cargo: ShipCargo;
    fuel: ShipFuel;
};

type ShipyardTransaction = {
    waypointSymbol: string;
    shipSymbol: string;
    shipType: ShipType;
    price: number;
    agentSymbol: string;
    timestamp: string;
};

type ShipFrame = {
    symbol: ShipFrameSymbol;
    name: string;
    description: string;
    condition: number;
    integrity: number;
    moduleSlots: number;
    mountingPoints: number;
    fuelCapacity: number;
    requirements: {
        power: number;
        crew: number;
        slots: number;
    };
};

type ShipReactor = {
    symbol: ShipReactorSymbol;
    name: string;
    description: string;
    condition: number;
    integrity: number;
    powerOutput: number;
    requirements: {
        power: number;
        crew: number;
        slots: number;
    };
};

type ShipEngine = {
    symbol: ShipEngineSymbol;
    name: string;
    description: string;
    condition: number;
    integrity: number;
    speed: number;
    requirements: {
        power: number;
        crew: number;
        slots: number;
    };
};

type ShipModule = {
    symbol: ShipModuleSymbol;
    capacity: number;
    range: number;
    name: string;
    description: string;
    requirements: {
        power: number;
        crew: number;
        slots: number;
    };
};

type ShipMount = {
    symbol: ShipMountSymbol;
    name: string;
    description: string;
    strength: number;
    deposits?: Array<ShipMountDeposits>;
    requirements: {
        power: number;
        crew: number;
        slots: number;
    };
};

export type ShipyardShip = {
    type: ShipType;
    name: string;
    description: string;
    supply: SupplyLevel;
    activity: ActivityLevel;
    purchasePrice: number;
    frame: ShipFrame;
    reactor: ShipReactor;
    engine: ShipEngine;
    modules: Array<ShipModule>;
    mounts: Array<ShipMount>;
    crew: {
        required: number;
        capacity: number;
    };
};

export type Shipyard = {
    symbol: string;
    shipTypes: Array<{
        type: ShipType;
    }>;
    transactions?: Array<ShipyardTransaction>;
    ships?: Array<ShipyardShip>;
    modificationsFee: number;
};
