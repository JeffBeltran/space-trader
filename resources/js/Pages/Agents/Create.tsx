import { Head, useForm } from "@inertiajs/react";

import { Button } from "@/Components/catalyst/button";
import {
    Description,
    ErrorMessage,
    Field,
    FieldGroup,
    Fieldset,
    Label,
    Legend,
} from "@/Components/catalyst/fieldset";
import { Input } from "@/Components/catalyst/input";
import { Select } from "@/Components/catalyst/select";
import { Text } from "@/Components/catalyst/text";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import type { PageProps } from "@/types";
import type { AgentCreateProps } from "@/types/agent";

export default function Create({
    auth,
    listFactions,
}: PageProps<AgentCreateProps>) {
    const { data, setData, post, processing, errors } = useForm({
        faction: "",
        symbol: "",
        email: "",
    });

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
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    post(route("agents.store"));
                                }}
                            >
                                <Fieldset>
                                    <Legend>Create Game Agent</Legend>
                                    <Text>
                                        This creates a Game Agent for you to
                                        play the game with
                                    </Text>
                                    <FieldGroup>
                                        <Field>
                                            <Label>Faction</Label>
                                            <Select
                                                name="faction"
                                                value={data.faction}
                                                onChange={(e) => {
                                                    setData(
                                                        "faction",
                                                        e.target.value,
                                                    );
                                                }}
                                                invalid={!!errors.faction}
                                            >
                                                <option value="">
                                                    Select a Faction
                                                </option>
                                                {listFactions.data.map(
                                                    (faction) => {
                                                        return (
                                                            <option
                                                                key={
                                                                    faction.symbol
                                                                }
                                                                value={
                                                                    faction.symbol
                                                                }
                                                                disabled={
                                                                    !faction.isRecruiting
                                                                }
                                                            >
                                                                {faction.name}
                                                            </option>
                                                        );
                                                    },
                                                )}
                                            </Select>
                                            {errors.faction && (
                                                <ErrorMessage>
                                                    {errors.faction}
                                                </ErrorMessage>
                                            )}
                                        </Field>
                                        <Field>
                                            <Label>Symbol</Label>
                                            <Input
                                                value={data.symbol}
                                                onChange={(e) =>
                                                    setData(
                                                        "symbol",
                                                        e.target.value,
                                                    )
                                                }
                                                name="symbol"
                                                invalid={!!errors.symbol}
                                            />
                                            {errors.symbol && (
                                                <ErrorMessage>
                                                    {errors.symbol}
                                                </ErrorMessage>
                                            )}
                                        </Field>
                                        <Field>
                                            <Label>Email</Label>
                                            <Description>
                                                This is used if you reserved
                                                your call sign between resets.
                                            </Description>
                                            <Input
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value,
                                                    )
                                                }
                                                name="email"
                                                invalid={!!errors.email}
                                            />
                                            {errors.email && (
                                                <ErrorMessage>
                                                    {errors.email}
                                                </ErrorMessage>
                                            )}
                                        </Field>
                                        <div className="flex items-center justify-end gap-x-4">
                                            <Button
                                                href={route("agents.index")}
                                                outline
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                            >
                                                Create Agent
                                            </Button>
                                        </div>
                                    </FieldGroup>
                                </Fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
