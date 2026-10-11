"use client";

import { useEffect, type ReactNode } from "react";

import { interactionRegistry, type InteractableDescriptor } from "@/game/interactions/interaction-system";

interface InteractableProps {
  descriptor: InteractableDescriptor;
  rotationY?: number;
  children: ReactNode;
}

/** Registers its descriptor with the interaction system while mounted and places its visual at the anchor. */
export function Interactable({ descriptor, rotationY = 0, children }: InteractableProps) {
  useEffect(() => interactionRegistry.register(descriptor), [descriptor]);

  return (
    <group position={[...descriptor.position]} rotation-y={rotationY} name={descriptor.id}>
      {children}
    </group>
  );
}
