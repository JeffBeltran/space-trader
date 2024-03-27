import { bottts } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

import { shipRoleColorMap } from "./useShipRoleColors";

import type { ShipRole } from "@/types/space-traders-api/ship";

export function useShipAvatar(role?: ShipRole, name?: string) {
    if (!role) {
        return null;
    }

    const rgb = shipRoleColorMap[role].rgb;

    return createAvatar(bottts, {
        seed: name,
        baseColor: [rgb],
    }).toDataUriSync();
}
