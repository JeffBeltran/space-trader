import type { Contract } from "../space-traders-api/contract";

export type ContractIndexProps = {
    listContracts: {
        data: Array<Contract>;
        meta: {
            total: number;
            page: number;
            limit: number;
        };
    };
};
