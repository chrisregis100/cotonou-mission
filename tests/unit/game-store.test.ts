import { beforeEach, describe, expect, it } from "vitest";

import { useGameStore } from "@/game/core/game-store";
import type { InteractableDescriptor } from "@/game/interactions/interaction-system";

const merchant: InteractableDescriptor = {
  id: "test-merchant",
  kind: "npc",
  label: "Parler au commerçant",
  position: [0, 0, 0],
  dialogueId: "test-npc-intro",
};

const initialState = useGameStore.getState();

describe("game store interaction flow", () => {
  beforeEach(() => useGameStore.setState(initialState, true));

  it("does nothing when nothing is nearby", () => {
    useGameStore.getState().interact();
    expect(useGameStore.getState().dialogueSession).toBeNull();
  });

  it("opens the nearby dialogue, advances it, then follows a choice to the end", () => {
    const store = useGameStore.getState();
    store.setNearbyInteractable(merchant);

    store.interact();
    expect(useGameStore.getState().dialogueSession?.nodeId).toBe("greeting");

    store.interact();
    expect(useGameStore.getState().dialogueSession?.nodeId).toBe("question");

    store.interact();
    expect(useGameStore.getState().dialogueSession?.nodeId).toBe("question");

    store.chooseDialogueOption("leave");
    expect(useGameStore.getState().dialogueSession?.nodeId).toBe("goodbye");

    store.interact();
    expect(useGameStore.getState().dialogueSession).toBeNull();
  });

  it("records each triggered dialogue once", () => {
    const store = useGameStore.getState();
    store.openDialogue("test-npc-intro");
    store.closeDialogue();
    store.openDialogue("test-npc-intro");
    store.openDialogue("test-parcel");
    expect(useGameStore.getState().triggeredDialogueIds).toEqual(["test-npc-intro", "test-parcel"]);
  });
});
