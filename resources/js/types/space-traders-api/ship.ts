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

export type ShipDetails = {
    symbol: string;
    registration: {
        name: string;
        factionSymbol: string;
        role: ShipRole;
    };
    nav: {
        systemSymbol: string;
        waypointSymbol: string;
        route: {
            destination: {
                symbol: string;
                type: string;
                systemSymbol: string;
                x: number;
                y: number;
            };
            origin: {
                symbol: string;
                type: string;
                systemSymbol: string;
                x: number;
                y: number;
            };
            departureTime: string;
            arrival: string;
        };
        status: ShipNavStatus;
        flightMode: ShipNavFlightMode;
    };
    crew: {
        current: number;
        required: number;
        capacity: number;
        rotation: ShipCrewRotation;
        morale: number;
        wages: number;
    };
    frame: {
        symbol: string;
        name: string;
        description: string;
        condition: number;
        moduleSlots: number;
        mountingPoints: number;
        fuelCapacity: number;
        requirements: {
            power: number;
            crew: number;
            slots: number;
        };
    };
    reactor: {
        symbol: string;
        name: string;
        description: string;
        condition: number;
        powerOutput: number;
        requirements: {
            power: number;
            crew: number;
            slots: number;
        };
    };
    engine: {
        symbol: string;
        name: string;
        description: string;
        condition: number;
        speed: number;
        requirements: {
            power: number;
            crew: number;
            slots: number;
        };
    };
    cooldown: {
        shipSymbol: string;
        totalSeconds: number;
        remainingSeconds: number;
        expiration: string;
    };
    modules: [
        {
            symbol: string;
            capacity: number;
            range: number;
            name: string;
            description: string;
            requirements: {
                power: number;
                crew: number;
                slots: number;
            };
        },
    ];
    mounts: [
        {
            symbol: string;
            name: string;
            description: string;
            strength: number;
            deposits: Array<string>;
            requirements: {
                power: number;
                crew: number;
                slots: number;
            };
        },
    ];
    cargo: {
        capacity: number;
        units: number;
        inventory: [
            {
                symbol: string;
                name: string;
                description: string;
                units: number;
            },
        ];
    };
    fuel: {
        current: number;
        capacity: number;
        consumed: {
            amount: number;
            timestamp: string;
        };
    };
};
