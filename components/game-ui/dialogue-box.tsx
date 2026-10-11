"use client";

import { useEffect } from "react";

import { useGameStore } from "@/game/core/game-store";
import { getCurrentNode, getNodeSpeaker } from "@/game/dialogue/dialogue-engine";
import { getDialogue } from "@/game/dialogue/dialogue-registry";

export function DialogueBox() {
  const dialogueSession = useGameStore((state) => state.dialogueSession);
  const advanceDialogue = useGameStore((state) => state.advanceDialogue);
  const chooseDialogueOption = useGameStore((state) => state.chooseDialogueOption);
  const closeDialogue = useGameStore((state) => state.closeDialogue);

  const dialogue = dialogueSession ? getDialogue(dialogueSession.dialogueId) : null;
  const node = dialogue && dialogueSession ? getCurrentNode(dialogue, dialogueSession) : null;
  const choices = node?.choices;
  const isOpen = node !== null;

  useEffect(() => {
    if (isOpen && document.pointerLockElement) document.exitPointerLock();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLButtonElement) return;

      if (event.key === "Escape") return closeDialogue();

      const choiceIndex = Number.parseInt(event.key, 10) - 1;
      if (choices && choices[choiceIndex]) {
        event.preventDefault();
        return chooseDialogueOption(choices[choiceIndex].id);
      }

      if (!choices && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        advanceDialogue();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, choices, advanceDialogue, chooseDialogueOption, closeDialogue]);

  if (!dialogue || !node) return null;

  return (
    <section
      role="dialog"
      aria-label={`Dialogue : ${getNodeSpeaker(dialogue, node)}`}
      className="absolute inset-x-0 bottom-0 z-10 flex justify-center p-4 sm:p-6"
    >
      <div className="w-full max-w-2xl rounded-2xl border border-stone-700 bg-stone-950/90 p-5 text-stone-100 shadow-2xl backdrop-blur">
        <div className="mb-2 flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-amber-400">{getNodeSpeaker(dialogue, node)}</p>
          <button
            type="button"
            onClick={closeDialogue}
            aria-label="Fermer le dialogue"
            className="rounded-full px-2 text-stone-400 hover:text-stone-100 focus-visible:outline-2 focus-visible:outline-amber-300"
          >
            Échap ✕
          </button>
        </div>
        <p className="text-lg leading-relaxed">{node.text}</p>

        {choices ? (
          <ol className="mt-4 flex flex-col gap-2">
            {choices.map((choice, index) => (
              <li key={choice.id}>
                <button
                  type="button"
                  onClick={() => chooseDialogueOption(choice.id)}
                  className="w-full rounded-xl bg-stone-800 px-4 py-2 text-left hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-amber-300"
                >
                  <span className="mr-2 font-mono text-amber-300">{index + 1}.</span>
                  {choice.text}
                </button>
              </li>
            ))}
          </ol>
        ) : (
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={advanceDialogue}
              className="rounded-full bg-amber-500 px-5 py-2 font-semibold text-stone-950 hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
            >
              {node.next ? "Continuer" : "Terminer"} <span className="font-mono text-sm">(E / Entrée)</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
