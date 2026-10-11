"use client";

import { useProgress } from "@react-three/drei";

import { useGameStore } from "@/game/core/game-store";

/** Overlay shown while 3D assets and the physics engine load. */
export function LoadingScreen() {
  const { active, progress } = useProgress();
  const isSceneReady = useGameStore((state) => state.isSceneReady);
  if (isSceneReady && !active) return null;

  return <LoadingOverlay progress={progress} />;
}

export function LoadingOverlay({ progress }: { progress?: number }) {
  const hasProgress = typeof progress === "number";

  return (
    <div
      role="status"
      aria-live="polite"
      className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-stone-950 text-stone-100"
    >
      <p className="text-xl font-semibold">Chargement du quartier…</p>
      <div className="h-2 w-64 overflow-hidden rounded-full bg-stone-800">
        <div
          className="h-full rounded-full bg-amber-500 transition-[width]"
          style={{ width: hasProgress ? `${Math.round(progress)}%` : "15%" }}
        />
      </div>
      {hasProgress && <p className="font-mono text-sm text-stone-400">{Math.round(progress)} %</p>}
    </div>
  );
}
