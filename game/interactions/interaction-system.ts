import { INTERACTION_CONFIG } from "@/game/core/config";

export const INTERACTABLE_KINDS = ["npc", "object"] as const;

export type InteractableKind = (typeof INTERACTABLE_KINDS)[number];

export interface InteractableDescriptor {
  id: string;
  kind: InteractableKind;
  /** Action shown in the prompt, e.g. "Parler au commerçant". */
  label: string;
  /** World position of the interaction anchor (feet level). */
  position: readonly [number, number, number];
  radius?: number;
  dialogueId: string;
}

export interface InteractionRegistry {
  register: (descriptor: InteractableDescriptor) => () => void;
  list: () => InteractableDescriptor[];
}

export function createInteractionRegistry(): InteractionRegistry {
  const descriptors = new Map<string, InteractableDescriptor>();

  return {
    register: (descriptor) => {
      descriptors.set(descriptor.id, descriptor);
      return () => {
        if (descriptors.get(descriptor.id) === descriptor) descriptors.delete(descriptor.id);
      };
    },
    list: () => [...descriptors.values()],
  };
}

/** Closest interactable whose radius contains the player, measured on the ground plane. */
export function findNearestInteractable(
  descriptors: readonly InteractableDescriptor[],
  playerPosition: readonly [number, number, number],
): InteractableDescriptor | null {
  let nearest: InteractableDescriptor | null = null;
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const descriptor of descriptors) {
    const distance = Math.hypot(descriptor.position[0] - playerPosition[0], descriptor.position[2] - playerPosition[2]);
    const radius = descriptor.radius ?? INTERACTION_CONFIG.defaultRadius;
    if (distance > radius || distance >= nearestDistance) continue;

    nearest = descriptor;
    nearestDistance = distance;
  }

  return nearest;
}

export const interactionRegistry = createInteractionRegistry();
