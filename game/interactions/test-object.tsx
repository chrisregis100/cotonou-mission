"use client";

import { CuboidCollider, RigidBody } from "@react-three/rapier";

import { InteractionMarker } from "@/game/interactions/interaction-marker";

interface TestObjectProps {
  interactableId: string;
}

/** Provisional parcel: a taped cardboard box. */
export function TestObject({ interactableId }: TestObjectProps) {
  return (
    <>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[BOX_SIZE[0] / 2, BOX_SIZE[1] / 2, BOX_SIZE[2] / 2]} position-y={BOX_SIZE[1] / 2} />
      </RigidBody>
      <mesh position-y={BOX_SIZE[1] / 2} castShadow receiveShadow>
        <boxGeometry args={BOX_SIZE} />
        <meshStandardMaterial color="#b98b5a" roughness={0.9} />
      </mesh>
      <mesh position-y={BOX_SIZE[1] + 0.002}>
        <boxGeometry args={[0.08, 0.004, BOX_SIZE[2] + 0.004]} />
        <meshStandardMaterial color="#d8c39a" />
      </mesh>
      <InteractionMarker interactableId={interactableId} height={1} />
    </>
  );
}

const BOX_SIZE: [number, number, number] = [0.5, 0.35, 0.4];
