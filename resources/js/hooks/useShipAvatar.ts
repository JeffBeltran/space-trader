import { bottts } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { useMemo } from "react";

import { useShipRoleColors } from "./useShipRoleColors";

import type { ShipRole } from "@/types/ships";

export function useShipAvatar(role: ShipRole, name?: string) {
    const { rgb } = useShipRoleColors(role);

    return useMemo(() => {
        return createAvatar(bottts, {
            seed: name,
            baseColor: [rgb],
        }).toDataUriSync();
    }, [rgb, name]);
}
