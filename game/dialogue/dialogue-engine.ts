import type { Dialogue, DialogueNode } from "@/game/dialogue/dialogue-schema";

export interface DialogueSession {
  dialogueId: string;
  nodeId: string;
  /** Ids of the choices picked so far, in order. */
  choiceHistory: string[];
}

export function startDialogue(dialogue: Dialogue): DialogueSession {
  return { dialogueId: dialogue.id, nodeId: dialogue.startNodeId, choiceHistory: [] };
}

export function getCurrentNode(dialogue: Dialogue, session: DialogueSession): DialogueNode {
  const node = dialogue.nodes[session.nodeId];
  if (!node) throw new Error(`Dialogue ${dialogue.id} : nœud ${session.nodeId} introuvable`);
  return node;
}

export function getNodeSpeaker(dialogue: Dialogue, node: DialogueNode): string {
  return node.speaker ?? dialogue.speaker;
}

/** Moves past a node without choices. Returns null when the dialogue ends; unchanged when a choice is required. */
export function advanceDialogue(dialogue: Dialogue, session: DialogueSession): DialogueSession | null {
  const node = getCurrentNode(dialogue, session);
  if (node.choices) return session;
  if (!node.next) return null;
  return { ...session, nodeId: node.next };
}

/** Applies a choice of the current node. Returns null when the choice ends the dialogue; unchanged for unknown choices. */
export function chooseDialogueOption(
  dialogue: Dialogue,
  session: DialogueSession,
  choiceId: string,
): DialogueSession | null {
  const choice = getCurrentNode(dialogue, session).choices?.find((candidate) => candidate.id === choiceId);
  if (!choice) return session;
  if (!choice.next) return null;
  return { ...session, nodeId: choice.next, choiceHistory: [...session.choiceHistory, choice.id] };
}
