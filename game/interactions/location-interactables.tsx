"use client";

import { useMemo } from "react";

import { Interactable } from "@/game/interactions/interactable";
import type { InteractableDescriptor, InteractableKind } from "@/game/interactions/interaction-system";
import { TestNpc } from "@/game/interactions/test-npc";
import { TestObject } from "@/game/interactions/test-object";
import type { InteractableData } from "@/game/world/location-schema";

interface LocationInteractablesProps {
  interactables: readonly InteractableData[];
}

export function LocationInteractables({ interactables }: LocationInteractablesProps) {
  return interactables.map((interactable) => <LocationInteractable key={interactable.id} interactable={interactable} />);
}

function LocationInteractable({ interactable }: { interactable: InteractableData }) {
  const descriptor = useMemo<InteractableDescriptor>(
    () => ({
      id: interactable.id,
      kind: interactable.kind,
      label: interactable.label,
      position: interactable.position,
      radius: interactable.radius,
      dialogueId: interactable.dialogueId,
    }),
    [interactable],
  );
  const Visual = VISUALS_BY_KIND[interactable.kind];

  return (
    <Interactable descriptor={descriptor} rotationY={interactable.rotationY}>
      <Visual interactableId={interactable.id} />
    </Interactable>
  );
}

const VISUALS_BY_KIND: Readonly<Record<InteractableKind, typeof TestNpc>> = {
  npc: TestNpc,
  object: TestObject,
};
