"use client";

import { CapsuleCollider, RigidBody } from "@react-three/rapier";

import { InteractionMarker } from "@/game/interactions/interaction-marker";

interface TestNpcProps {
  interactableId: string;
}

/** Provisional NPC: a capsule with a head and a facing marker. Visuals are local to the Interactable anchor. */
export function TestNpc({ interactableId }: TestNpcProps) {
  return (
    <>
      <RigidBody type="fixed" colliders={false}>
        <CapsuleCollider args={[BODY_HALF_HEIGHT, BODY_RADIUS]} position-y={BODY_CENTER_Y} />
      </RigidBody>
      <mesh position-y={BODY_CENTER_Y} castShadow>
        <capsuleGeometry args={[BODY_RADIUS, BODY_HALF_HEIGHT * 2, 6, 16]} />
        <meshStandardMaterial color="#8a5a9e" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.45, BODY_RADIUS * 0.9]} castShadow>
        <boxGeometry args={[0.18, 0.1, 0.12]} />
        <meshStandardMaterial color="#f2e8cf" />
      </mesh>
      <InteractionMarker interactableId={interactableId} height={2.2} />
    </>
  );
}

const BODY_RADIUS = 0.33;
const BODY_HALF_HEIGHT = 0.55;
const BODY_CENTER_Y = BODY_HALF_HEIGHT + BODY_RADIUS;
