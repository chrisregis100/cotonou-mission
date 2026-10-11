"use client";

import { PLAYER_CONFIG, PLAYER_FEET_OFFSET } from "@/game/core/config";

/** Provisional stand-in for the player: a capsule with a marker showing the facing direction (+Z). */
export function PlaceholderCharacter() {
  return (
    <group position-y={PLAYER_FEET_OFFSET}>
      <mesh castShadow>
        <capsuleGeometry args={[PLAYER_CONFIG.capsuleRadius, PLAYER_CONFIG.capsuleHalfHeight * 2, 6, 16]} />
        <meshStandardMaterial color="#2f6fb0" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.45, PLAYER_CONFIG.capsuleRadius]} castShadow>
        <boxGeometry args={[0.2, 0.12, 0.2]} />
        <meshStandardMaterial color="#f2c14e" />
      </mesh>
    </group>
  );
}
