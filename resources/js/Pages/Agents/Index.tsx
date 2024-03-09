import { Head, Link } from "@inertiajs/react";

import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import type { PageProps } from "@/types";
import type { AgentIndexProps } from "@/types/agent";

export default function Index({
    auth,
    listAgents,
}: PageProps<AgentIndexProps>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Agents" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-end py-4">
                        <Link href={route("agents.create")}>
                            <PrimaryButton>Create Agent</PrimaryButton>
                        </Link>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            TODO: Build Agents Table
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
