"use client";

import Link from "next/link";

import { FpsMeter } from "@/components/game-ui/fps-meter";
import { useGameStore } from "@/game/core/game-store";

export function Hud() {
  const isPointerLocked = useGameStore((state) => state.isPointerLocked);
  const isInDialogue = useGameStore((state) => state.dialogueSession !== null);

  return (
    <div data-testid="game-hud" className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-4 text-stone-100">
      <div className="flex items-start justify-between gap-4">
        <section aria-label="Objectif" className="max-w-xs rounded-xl bg-stone-950/70 px-4 py-3 backdrop-blur-sm">
          <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase">Objectif (test)</p>
          <p className="text-sm">Parlez au commerçant, puis examinez le colis devant la boutique d&apos;en face.</p>
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

      {!isInDialogue && (
        <div className="flex flex-col items-center gap-3">
          <InteractionPrompt />
          {!isPointerLocked && (
            <p className="rounded-full bg-stone-950/70 px-4 py-2 text-sm">
              Cliquez sur la scène pour contrôler la caméra · Échap pour libérer la souris
            </p>
          )}
        </div>
      )}

      <p className="self-start rounded-lg bg-stone-950/60 px-3 py-2 font-mono text-xs text-stone-300">
        ZQSD/WASD/flèches : bouger · Maj : courir · E : interagir · Molette : zoom
      </p>
    </div>
  );
}

function InteractionPrompt() {
  const nearbyInteractable = useGameStore((state) => state.nearbyInteractable);
  const interact = useGameStore((state) => state.interact);
  if (!nearbyInteractable) return null;

  return (
    <button
      type="button"
      onClick={interact}
      className="pointer-events-auto flex items-center gap-3 rounded-full bg-stone-950/80 py-2 pr-5 pl-2 text-base shadow-lg hover:bg-stone-900 focus-visible:outline-2 focus-visible:outline-amber-300"
    >
      <kbd className="flex size-8 items-center justify-center rounded-full bg-amber-500 font-mono font-bold text-stone-950">E</kbd>
      {nearbyInteractable.label}
    </button>
  );
}
