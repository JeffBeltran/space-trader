export type ContractDelivery = {
    tradeSymbol: string;
    destinationSymbol: string;
    unitsRequired: number;
    unitsFulfilled: number;
};

export type Contract = {
    id: string;
    factionSymbol: string;
    type: string;
    terms: {
        deadline: string;
        payment: {
            onAccepted: number;
            onFulfilled: number;
        };
        deliver: Array<ContractDelivery>;
    };
    accepted: boolean;
    fulfilled: boolean;
    expiration: string;
    deadlineToAccept: string;
};
