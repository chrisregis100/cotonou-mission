import { describe, expect, it } from "vitest";

import { PLAYER_CONFIG } from "@/game/core/config";
import { getAnimationTimeScale, selectAnimationState } from "@/game/player/animation-state";

describe("selectAnimationState", () => {
  it("idles when (almost) still", () => {
    expect(selectAnimationState({ horizontalSpeed: 0, isInDialogue: false })).toBe("idle");
    expect(selectAnimationState({ horizontalSpeed: 0.05, isInDialogue: false })).toBe("idle");
  });

  it("walks at walking speed and runs at running speed", () => {
    expect(selectAnimationState({ horizontalSpeed: PLAYER_CONFIG.walkSpeed, isInDialogue: false })).toBe("walk");
    expect(selectAnimationState({ horizontalSpeed: PLAYER_CONFIG.runSpeed, isInDialogue: false })).toBe("run");
  });

  it("uses the achieved speed, so running into a wall falls back to idle", () => {
    expect(selectAnimationState({ horizontalSpeed: 0.01, isInDialogue: false })).toBe("idle");
  });

  it("talks during dialogues regardless of speed", () => {
    expect(selectAnimationState({ horizontalSpeed: PLAYER_CONFIG.runSpeed, isInDialogue: true })).toBe("talk");
  });
});

describe("getAnimationTimeScale", () => {
  it("plays at normal rate at the reference speed", () => {
    expect(getAnimationTimeScale("walk", PLAYER_CONFIG.walkSpeed)).toBe(1);
    expect(getAnimationTimeScale("run", PLAYER_CONFIG.runSpeed)).toBe(1);
  });

  it("clamps the rate and ignores speed for static clips", () => {
    expect(getAnimationTimeScale("walk", 100)).toBe(1.4);
    expect(getAnimationTimeScale("walk", 0.2)).toBe(0.6);
    expect(getAnimationTimeScale("idle", 3)).toBe(1);
  });
});
