import { useForm } from "@inertiajs/react";
import { DateTime } from "luxon";

import { Badge } from "./catalyst/badge";
import { Button } from "./catalyst/button";
import { DeliveryItem } from "./DeliveryItem";

import type { Contract } from "@/types/contract";

export function Contract({ contract }: { contract: Contract }) {
    const { post, processing } = useForm({
        contract_id: contract.id,
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                post(route("accepted-contracts.store"));
            }}
        >
            <div className="m-4 px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                    Contract Details
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                    Full Details of the contract
                </p>
            </div>
            <div className="mt-6">
                <dl className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt className="mx-4 text-sm font-medium leading-6 text-gray-900">
                            Accepted
                        </dt>
                        <dd className="mx-4 mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                            {contract.accepted ? (
                                <Badge color="green">Yes</Badge>
                            ) : (
                                <Badge color="red">No</Badge>
                            )}
                        </dd>
                    </div>
                    <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt className="mx-4 text-sm font-medium leading-6 text-gray-900">
                            Fulfilled
                        </dt>
                        <dd className="mx-4 mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                            {contract.fulfilled ? (
                                <Badge color="green">Yes</Badge>
                            ) : (
                                <Badge color="red">No</Badge>
                            )}
                        </dd>
                    </div>
                    <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt className="mx-4 text-sm font-medium leading-6 text-gray-900">
                            Deadline To Accept
                        </dt>
                        <dd className="mx-4 mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                            {DateTime.fromISO(
                                contract.deadlineToAccept,
                            ).toRelativeCalendar({
                                unit: "hours",
                            })}
                        </dd>
                    </div>
                    <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt className="mx-4 text-sm font-medium leading-6 text-gray-900">
                            Expires
                        </dt>
                        <dd className="mx-4 mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                            {DateTime.fromISO(
                                contract.expiration,
                            ).toRelativeCalendar({
                                unit: "hours",
                            })}
                        </dd>
                    </div>
                    <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt className="mx-4 text-sm font-medium leading-6 text-gray-900">
                            Faction
                        </dt>
                        <dd className="mx-4 mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                            {contract.factionSymbol}
                        </dd>
                    </div>
                    <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt className="mx-4 text-sm font-medium leading-6 text-gray-900">
                            Type
                        </dt>
                        <dd className="mx-4 mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                            {contract.type}
                        </dd>
                    </div>
                    <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt className="mx-4 text-sm font-medium leading-6 text-gray-900">
                            Payment on Accepted
                        </dt>
                        <dd className="mx-4 mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                            {contract.terms.payment.onAccepted.toLocaleString()}
                        </dd>
                    </div>
                    <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt className="mx-4 text-sm font-medium leading-6 text-gray-900">
                            Payment on Fulfilled
                        </dt>
                        <dd className="mx-4 mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                            {contract.terms.payment.onFulfilled.toLocaleString()}
                        </dd>
                    </div>
                </dl>

                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                    <h1 className="px-4 text-sm font-medium leading-6 text-gray-900">
                        Delivery Requirements
                    </h1>
                    <div className="mx-4 mt-1 rounded-md border border-gray-200 sm:mt-2">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Item
                                    </th>
                                    <th
                                        scope="col"
                                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                                    >
                                        Destination
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {contract.terms.deliver.map((item) => {
                                    return (
                                        <DeliveryItem
                                            key={item.tradeSymbol}
                                            deliveryItem={item}
                                        />
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="m-4 flex justify-end">
                <Button
                    type="submit"
                    disabled={processing || contract.accepted}
                >
                    Accept
                </Button>
            </div>
        </form>
    );
}
