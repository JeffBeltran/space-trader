import type { ContractDelivery } from "@/types/contract";

export function DeliveryItem({
    deliveryItem,
}: {
    deliveryItem: ContractDelivery;
}) {
    return (
        <tr>
            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none">
                {deliveryItem.tradeSymbol}
                <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Destination</dt>
                    <dd className="mt-1 truncate text-gray-700">
                        {deliveryItem.destinationSymbol}
                    </dd>
                </dl>
            </td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                {deliveryItem.destinationSymbol}
            </td>
            <td className="px-3 py-4 text-sm text-gray-500">{`${deliveryItem.unitsFulfilled} / ${deliveryItem.unitsRequired}`}</td>
        </tr>
    );
}
