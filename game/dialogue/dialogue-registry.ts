import testNpcDialogueJson from "@/data/dialogues/test-npc.json";
import testParcelDialogueJson from "@/data/dialogues/test-parcel.json";
import { dialogueSchema, type Dialogue } from "@/game/dialogue/dialogue-schema";

export function parseDialogues(sources: readonly unknown[]): ReadonlyMap<string, Dialogue> {
  const dialogues = new Map<string, Dialogue>();
  for (const source of sources) {
    const dialogue = dialogueSchema.parse(source);
    if (dialogues.has(dialogue.id)) throw new Error(`Dialogue en double : ${dialogue.id}`);
    dialogues.set(dialogue.id, dialogue);
  }
  return dialogues;
}

export const dialogues = parseDialogues([testNpcDialogueJson, testParcelDialogueJson]);

export function getDialogue(dialogueId: string): Dialogue {
  const dialogue = dialogues.get(dialogueId);
  if (!dialogue) throw new Error(`Dialogue introuvable : ${dialogueId}`);
  return dialogue;
}
