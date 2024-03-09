export type AgentIndexProps = {
    listAgents: {
        data: Array<{
            accountId: string;
            symbol: string;
            headquarters: string;
            credits: number;
            startingFaction: string;
            shipCount: number;
        }>;
        meta: {
            total: number;
            page: number;
            limit: number;
        };
    };
};

export type AgentCreateProps = {
    listFactions: {
        data: Array<{
            symbol: string;
            name: string;
            description: string;
            headquarters: string;
            traits: [
                {
                    symbol: string;
                    name: string;
                    description: string;
                },
            ];
            isRecruiting: boolean;
        }>;
        meta: {
            total: number;
            page: number;
            limit: number;
        };
    };
};

export type AgentShowProps = {
    agentDetails: {
        data: {
            accountId?: string;
            symbol: string;
            headquarters: string;
            credits: number;
            startingFaction: string;
            shipCount: number;
        };
    };
};
