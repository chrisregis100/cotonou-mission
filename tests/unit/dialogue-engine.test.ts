import { describe, expect, it } from "vitest";

import { advanceDialogue, chooseDialogueOption, getCurrentNode, getNodeSpeaker, startDialogue } from "@/game/dialogue/dialogue-engine";
import { dialogues, parseDialogues } from "@/game/dialogue/dialogue-registry";
import { dialogueSchema, type Dialogue } from "@/game/dialogue/dialogue-schema";

const sampleDialogue: Dialogue = dialogueSchema.parse({
  id: "sample",
  speaker: "PNJ",
  startNodeId: "hello",
  nodes: {
    hello: { text: "Bonjour", next: "ask" },
    ask: {
      text: "Une question ?",
      choices: [
        { id: "yes", text: "Oui", next: "answer" },
        { id: "no", text: "Non", next: null },
      ],
    },
    answer: { speaker: "Vous", text: "Merci" },
  },
});

describe("dialogue engine", () => {
  it("starts at the start node with the default speaker", () => {
    const session = startDialogue(sampleDialogue);
    const node = getCurrentNode(sampleDialogue, session);
    expect(node.text).toBe("Bonjour");
    expect(getNodeSpeaker(sampleDialogue, node)).toBe("PNJ");
  });

  it("advances through linear nodes and ends after the last one", () => {
    const answerSession = { dialogueId: "sample", nodeId: "answer", choiceHistory: [] };
    expect(getNodeSpeaker(sampleDialogue, getCurrentNode(sampleDialogue, answerSession))).toBe("Vous");
    expect(advanceDialogue(sampleDialogue, answerSession)).toBeNull();

    const askSession = advanceDialogue(sampleDialogue, startDialogue(sampleDialogue));
    expect(askSession?.nodeId).toBe("ask");
  });

  it("does not skip a node that requires a choice", () => {
    const askSession = { dialogueId: "sample", nodeId: "ask", choiceHistory: [] };
    expect(advanceDialogue(sampleDialogue, askSession)).toBe(askSession);
  });

  it("follows choices, records them and ends on a null target", () => {
    const askSession = { dialogueId: "sample", nodeId: "ask", choiceHistory: [] };
    const answered = chooseDialogueOption(sampleDialogue, askSession, "yes");
    expect(answered).toEqual({ dialogueId: "sample", nodeId: "answer", choiceHistory: ["yes"] });
    expect(chooseDialogueOption(sampleDialogue, askSession, "no")).toBeNull();
  });

  it("ignores unknown choices", () => {
    const askSession = { dialogueId: "sample", nodeId: "ask", choiceHistory: [] };
    expect(chooseDialogueOption(sampleDialogue, askSession, "maybe")).toBe(askSession);
  });
});

describe("dialogue schema", () => {
  it("rejects references to unknown nodes", () => {
    const result = dialogueSchema.safeParse({
      id: "broken",
      speaker: "PNJ",
      startNodeId: "missing",
      nodes: { hello: { text: "Bonjour", next: "nowhere" } },
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues).toHaveLength(2);
  });

  it("rejects nodes with both next and choices", () => {
    const result = dialogueSchema.safeParse({
      id: "ambiguous",
      speaker: "PNJ",
      startNodeId: "hello",
      nodes: {
        hello: { text: "Bonjour", next: "hello", choices: [{ id: "a", text: "A", next: null }] },
      },
    });
    expect(result.success).toBe(false);
  });

  it("rejects duplicate dialogue ids", () => {
    expect(() => parseDialogues([sampleDialogue, sampleDialogue])).toThrow(/double/);
  });

  it("loads every dialogue shipped in data/dialogues", () => {
    expect([...dialogues.keys()].sort()).toEqual(["test-npc-intro", "test-parcel"]);
  });
});
