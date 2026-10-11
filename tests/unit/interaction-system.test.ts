import { describe, expect, it } from "vitest";

import { INTERACTION_CONFIG } from "@/game/core/config";
import {
  createInteractionRegistry,
  findNearestInteractable,
  type InteractableDescriptor,
} from "@/game/interactions/interaction-system";

function createDescriptor(id: string, position: [number, number, number], radius?: number): InteractableDescriptor {
  return { id, kind: "npc", label: id, position, radius, dialogueId: `${id}-dialogue` };
}

describe("findNearestInteractable", () => {
  const merchant = createDescriptor("merchant", [0, 0, 0]);
  const parcel = createDescriptor("parcel", [1.5, 0, 0], 1);

  it("returns null when nothing is in range", () => {
    expect(findNearestInteractable([merchant, parcel], [10, 0, 10])).toBeNull();
    expect(findNearestInteractable([], [0, 0, 0])).toBeNull();
  });

  it("uses the default radius when none is given", () => {
    expect(findNearestInteractable([merchant], [INTERACTION_CONFIG.defaultRadius - 0.01, 0, 0])).toBe(merchant);
    expect(findNearestInteractable([merchant], [INTERACTION_CONFIG.defaultRadius + 0.01, 0, 0])).toBeNull();
  });

  it("picks the closest candidate among those in range", () => {
    expect(findNearestInteractable([merchant, parcel], [1.2, 0, 0])).toBe(parcel);
    expect(findNearestInteractable([merchant, parcel], [0.3, 0, 0])).toBe(merchant);
  });

  it("measures distance on the ground plane only", () => {
    expect(findNearestInteractable([merchant], [0.5, 5, 0])).toBe(merchant);
  });
});

describe("createInteractionRegistry", () => {
  it("registers and unregisters descriptors", () => {
    const registry = createInteractionRegistry();
    const unregister = registry.register(createDescriptor("merchant", [0, 0, 0]));
    expect(registry.list().map((descriptor) => descriptor.id)).toEqual(["merchant"]);

    unregister();
    expect(registry.list()).toEqual([]);
  });

  it("does not remove a newer descriptor that reused the same id", () => {
    const registry = createInteractionRegistry();
    const unregisterOld = registry.register(createDescriptor("merchant", [0, 0, 0]));
    const newer = createDescriptor("merchant", [5, 0, 5]);
    registry.register(newer);

    unregisterOld();
    expect(registry.list()).toEqual([newer]);
  });
});
