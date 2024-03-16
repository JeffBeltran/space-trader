import { Head } from "@inertiajs/react";

import { Contract } from "@/Components/Contract";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import type { PageProps } from "@/types";
import type { ContractIndexProps } from "@/types/pages/contract";

export default function Index({
    auth,
    listContracts,
}: PageProps<ContractIndexProps>) {
    console.log(listContracts);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Available Contracts
                </h2>
            }
        >
            <Head title="Agents" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        {listContracts.data.map((contract) => {
                            return (
                                <Contract
                                    key={contract.id}
                                    contract={contract}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
