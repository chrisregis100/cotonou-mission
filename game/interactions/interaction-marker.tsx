"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

import { useGameStore } from "@/game/core/game-store";

interface InteractionMarkerProps {
  interactableId: string;
  height: number;
}

/** Floating diamond above an interactable; highlighted when the player is in range. */
export function InteractionMarker({ interactableId, height }: InteractionMarkerProps) {
  const markerRef = useRef<Mesh>(null);
  const isNearby = useGameStore((state) => state.nearbyInteractable?.id === interactableId);

  useFrame(({ clock }) => {
    const marker = markerRef.current;
    if (!marker) return;
    marker.position.y = height + Math.sin(clock.elapsedTime * 2.5) * 0.08;
    marker.rotation.y = clock.elapsedTime * 1.5;
  });

  return (
    <mesh ref={markerRef} position-y={height}>
      <octahedronGeometry args={[0.16]} />
      <meshStandardMaterial
        color={isNearby ? "#ffd166" : "#f4a261"}
        emissive={isNearby ? "#ffb703" : "#7a3e12"}
        emissiveIntensity={isNearby ? 1.2 : 0.4}
      />
    </mesh>
  );
}
