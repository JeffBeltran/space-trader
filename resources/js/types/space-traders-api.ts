export type GetStatusResponse = {
    status: "string";
    version: "string";
    resetDate: "string";
    description: "string";
    stats: {
        agents: number;
        ships: number;
        systems: number;
        waypoints: number;
    };
    leaderboards: {
        mostCredits: [
            {
                agentSymbol: "string";
                credits: number;
            },
        ];
        mostSubmittedCharts: [
            {
                agentSymbol: "string";
                chartCount: number;
            },
        ];
    };
    serverResets: {
        next: "string";
        frequency: "string";
    };
    announcements: [
        {
            title: "string";
            body: "string";
        },
    ];
    links: [
        {
            name: "string";
            url: "string";
        },
    ];
};
