import { useShip } from "@/hooks/useShip";

import { Badge } from "./catalyst/badge";
import { Button } from "./catalyst/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./catalyst/table";

export function ShipCargoListCard({ shipSymbol }: { shipSymbol: string }) {
    const shipDetails = useShip(shipSymbol);

    return (
        <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-4">
                        <div className="flex items-center">
                            <div>
                                <h3 className="text-base font-semibold leading-6 text-gray-900">
                                    Cargo Hold
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4 sm:px-6">
                <Table
                    bleed
                    className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]"
                >
                    <TableHead>
                        <TableRow>
                            <TableHeader className="w-3/4">Name</TableHeader>
                            <TableHeader>Amount</TableHeader>
                            <TableHeader className="relative w-0">
                                <span className="sr-only">Actions</span>
                            </TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {shipDetails?.data?.cargo.inventory.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    <Badge color="red">NO CARGO</Badge>
                                </TableCell>
                            </TableRow>
                        )}
                        {shipDetails.data &&
                            shipDetails.data.cargo.inventory.map((cargo) => {
                                return (
                                    <TableRow key={cargo.symbol}>
                                        <TableCell>
                                            <div className="flex flex-col text-wrap">
                                                <p className="font-medium text-gray-950">
                                                    {cargo.name}
                                                </p>
                                                <p className="text-gray-600">
                                                    {cargo.description}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>{cargo.units}</TableCell>
                                        <TableCell>
                                            <Button>Sell</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
