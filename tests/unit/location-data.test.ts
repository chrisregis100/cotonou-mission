import { describe, expect, it } from "vitest";

import testDistrictJson from "@/data/locations/test-district.json";
import { dialogues } from "@/game/dialogue/dialogue-registry";
import { locationSchema } from "@/game/world/location-schema";

describe("test district data", () => {
  const location = locationSchema.parse(testDistrictJson);

  it("is flagged as fictional", () => {
    expect(location.isFictional).toBe(true);
  });

  it("uses unique building ids", () => {
    const ids = location.buildings.map((building) => building.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("only references dialogues that exist", () => {
    for (const interactable of location.interactables) {
      expect(dialogues.has(interactable.dialogueId), interactable.id).toBe(true);
    }
  });

  it("spawns the player inside the ground bounds", () => {
    const [spawnX, , spawnZ] = location.playerSpawn;
    const [width, depth] = location.groundSize;
    expect(Math.abs(spawnX)).toBeLessThan(width / 2);
    expect(Math.abs(spawnZ)).toBeLessThan(depth / 2);
  });
});
