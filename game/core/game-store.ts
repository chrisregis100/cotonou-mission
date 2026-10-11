import { create } from "zustand";

import { advanceDialogue, chooseDialogueOption, startDialogue, type DialogueSession } from "@/game/dialogue/dialogue-engine";
import { getDialogue } from "@/game/dialogue/dialogue-registry";
import type { InteractableDescriptor } from "@/game/interactions/interaction-system";

interface GameState {
  isSceneReady: boolean;
  isPointerLocked: boolean;
  nearbyInteractable: InteractableDescriptor | null;
  dialogueSession: DialogueSession | null;
  /** Dialogue ids opened at least once; kept for the future save system. */
  triggeredDialogueIds: string[];
  setSceneReady: (isSceneReady: boolean) => void;
  setPointerLocked: (isPointerLocked: boolean) => void;
  setNearbyInteractable: (interactable: InteractableDescriptor | null) => void;
  /** Contextual action: advances the open dialogue, otherwise starts the nearby interaction. */
  interact: () => void;
  openDialogue: (dialogueId: string) => void;
  advanceDialogue: () => void;
  chooseDialogueOption: (choiceId: string) => void;
  closeDialogue: () => void;
}

/** Discrete game state shared with the DOM UI. High-frequency values stay in refs. */
export const useGameStore = create<GameState>()((set, get) => ({
  isSceneReady: false,
  isPointerLocked: false,
  nearbyInteractable: null,
  dialogueSession: null,
  triggeredDialogueIds: [],
  setSceneReady: (isSceneReady) => set({ isSceneReady }),
  setPointerLocked: (isPointerLocked) => set({ isPointerLocked }),
  setNearbyInteractable: (nearbyInteractable) => set({ nearbyInteractable }),
  interact: () => {
    const { dialogueSession, nearbyInteractable } = get();
    if (dialogueSession) return get().advanceDialogue();
    if (nearbyInteractable) get().openDialogue(nearbyInteractable.dialogueId);
  },
  openDialogue: (dialogueId) =>
    set(({ triggeredDialogueIds }) => ({
      dialogueSession: startDialogue(getDialogue(dialogueId)),
      triggeredDialogueIds: triggeredDialogueIds.includes(dialogueId)
        ? triggeredDialogueIds
        : [...triggeredDialogueIds, dialogueId],
    })),
  advanceDialogue: () =>
    set(({ dialogueSession }) =>
      dialogueSession ? { dialogueSession: advanceDialogue(getDialogue(dialogueSession.dialogueId), dialogueSession) } : {},
    ),
  chooseDialogueOption: (choiceId) =>
    set(({ dialogueSession }) =>
      dialogueSession
        ? { dialogueSession: chooseDialogueOption(getDialogue(dialogueSession.dialogueId), dialogueSession, choiceId) }
        : {},
    ),
  closeDialogue: () => set({ dialogueSession: null }),
}));
