"use client";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useEffect } from "react";

import { DialogueBox } from "@/components/game-ui/dialogue-box";
import { Hud } from "@/components/game-ui/hud";
import { LoadingScreen } from "@/components/game-ui/loading-screen";
import { CAMERA_CONFIG, PLAYER_FEET_OFFSET } from "@/game/core/config";
import { exposeDebugState } from "@/game/core/debug";
import { LocationInteractables } from "@/game/interactions/location-interactables";
import { PlayerController } from "@/game/player/player-controller";
import { Lighting } from "@/game/world/lighting";
import { testDistrict } from "@/game/world/locations";
import { TestDistrict } from "@/game/world/test-district";

export function GameRuntime() {
  const [spawnX, spawnY, spawnZ] = testDistrict.playerSpawn;
  const spawnBodyPosition: [number, number, number] = [spawnX, spawnY + PLAYER_FEET_OFFSET, spawnZ];

  useEffect(exposeDebugState, []);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-stone-900 select-none">
      <Canvas
        shadows="percentage"
        dpr={[1, 1.75]}
        camera={{ fov: CAMERA_CONFIG.fov, near: 0.1, far: 250, position: [0, 4, 20] }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        className="touch-none"
        aria-label="Scène 3D du quartier de test"
      >
        <Suspense fallback={null}>
          <Lighting />
          <Physics timeStep="vary">
            <TestDistrict location={testDistrict} />
            <LocationInteractables interactables={testDistrict.interactables} />
            <PlayerController spawnPosition={spawnBodyPosition} />
          </Physics>
        </Suspense>
      </Canvas>
      <Hud />
      <DialogueBox />
      <LoadingScreen />
    </div>
  );
}
