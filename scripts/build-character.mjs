// Converts the Quaternius Universal Animation Library (CC0) glTF into a trimmed GLB.
// Usage: node scripts/build-character.mjs <input.gltf> <output.glb>
import { NodeIO } from "@gltf-transform/core";
import { dedup, prune, resample } from "@gltf-transform/functions";

const KEPT_CLIPS = new Set([
  "Idle_Loop",
  "Walk_Loop",
  "Jog_Fwd_Loop",
  "Sprint_Loop",
  "Interact",
  "Idle_Talking_Loop",
  "Driving_Loop",
]);

const [inputPath, outputPath] = process.argv.slice(2);

if (!inputPath || !outputPath) {
  console.error("Usage: node scripts/build-character.mjs <input.gltf> <output.glb>");
  process.exit(1);
}

const io = new NodeIO();
const document = await io.read(inputPath);

for (const animation of document.getRoot().listAnimations()) {
  if (!KEPT_CLIPS.has(animation.getName())) animation.dispose();
}

await document.transform(resample(), dedup(), prune());
await io.write(outputPath, document);

const keptNames = document.getRoot().listAnimations().map((animation) => animation.getName());
console.log(`Wrote ${outputPath} with clips: ${keptNames.join(", ")}`);
