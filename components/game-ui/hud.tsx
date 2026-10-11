"use client";

import Link from "next/link";

import { FpsMeter } from "@/components/game-ui/fps-meter";
import { useGameStore } from "@/game/core/game-store";

export function Hud() {
  const isPointerLocked = useGameStore((state) => state.isPointerLocked);

  return (
    <div data-testid="game-hud" className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-4 text-stone-100">
      <div className="flex items-start justify-between gap-4">
        <section aria-label="Objectif" className="max-w-xs rounded-xl bg-stone-950/70 px-4 py-3 backdrop-blur-sm">
          <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase">Objectif (test)</p>
          <p className="text-sm">Explorez le quartier de test et vérifiez les collisions.</p>
        </section>
        <div className="flex items-center gap-2">
          <FpsMeter />
          <Link
            href="/"
            className="pointer-events-auto rounded-full bg-stone-950/70 px-4 py-2 text-sm hover:bg-stone-800 focus-visible:outline-2 focus-visible:outline-amber-300"
          >
            Menu
          </Link>
        </div>
      </div>

      {!isPointerLocked && (
        <p className="self-center rounded-full bg-stone-950/70 px-4 py-2 text-sm">
          Cliquez sur la scène pour contrôler la caméra · Échap pour libérer la souris
        </p>
      )}

      <p className="self-start rounded-lg bg-stone-950/60 px-3 py-2 font-mono text-xs text-stone-300">
        ZQSD/WASD/flèches : bouger · Maj : courir · Molette : zoom
      </p>
    </div>
  );
}
