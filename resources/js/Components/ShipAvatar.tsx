import { useShip } from "@/hooks/useShip";
import { useShipAvatar } from "@/hooks/useShipAvatar";
import { cn } from "@/utils";

export function ShipAvatar({
    shipSymbol,
    className,
}: {
    shipSymbol: string;
    className?: string;
}) {
    const ship = useShip(shipSymbol);

    const avatar = useShipAvatar(
        ship.data?.registration.role,
        ship.data?.registration.name,
    );

    if (!avatar) {
        return (
            <div
                className={cn(
                    "h-16 w-16 animate-pulse rounded-full bg-gray-200",
                    className,
                )}
            />
        );
    }

    return (
        <img
            className={cn("h-16 w-16 rounded-full", className)}
            src={avatar}
            alt={`${name} avatar`}
        />
    );
}
