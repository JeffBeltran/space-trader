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

export type Agent = {
    accountId: string;
    symbol: string;
    headquarters: string;
    credits: number;
    startingFaction: string;
    shipCount: number;
};
