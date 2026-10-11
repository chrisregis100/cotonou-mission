import { z } from "zod";

const dialogueChoiceSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  /** Node to jump to, or null to end the dialogue. */
  next: z.string().min(1).nullable(),
});

const dialogueNodeSchema = z.object({
  speaker: z.string().min(1).optional(),
  text: z.string().min(1),
  /** Node shown after "continue"; omitted or null ends the dialogue. */
  next: z.string().min(1).nullable().optional(),
  choices: z.array(dialogueChoiceSchema).min(1).optional(),
});

export const dialogueSchema = z
  .object({
    id: z.string().min(1),
    speaker: z.string().min(1),
    startNodeId: z.string().min(1),
    nodes: z.record(z.string(), dialogueNodeSchema),
  })
  .superRefine((dialogue, context) => {
    const nodeIds = new Set(Object.keys(dialogue.nodes));
    const reportMissingNode = (nodeId: string, path: (string | number)[]) =>
      context.addIssue({ code: "custom", message: `Nœud inconnu : ${nodeId}`, path });

    if (!nodeIds.has(dialogue.startNodeId)) reportMissingNode(dialogue.startNodeId, ["startNodeId"]);

    for (const [nodeId, node] of Object.entries(dialogue.nodes)) {
      if (node.next && node.choices) {
        context.addIssue({ code: "custom", message: "Un nœud ne peut pas avoir à la fois next et choices", path: ["nodes", nodeId] });
      }
      if (node.next && !nodeIds.has(node.next)) reportMissingNode(node.next, ["nodes", nodeId, "next"]);
      node.choices?.forEach((choice, index) => {
        if (choice.next && !nodeIds.has(choice.next)) reportMissingNode(choice.next, ["nodes", nodeId, "choices", index]);
      });
    }
  });

export type Dialogue = z.infer<typeof dialogueSchema>;
export type DialogueNode = Dialogue["nodes"][string];
export type DialogueChoice = NonNullable<DialogueNode["choices"]>[number];
