import { PLAYER_CONFIG } from "@/game/core/config";

export const ANIMATION_STATES = ["idle", "walk", "run", "talk"] as const;

export type AnimationState = (typeof ANIMATION_STATES)[number];

export interface PlayerMotion {
  /** Horizontal speed actually achieved after collisions, in m/s. */
  horizontalSpeed: number;
  isInDialogue: boolean;
}

export function selectAnimationState({ horizontalSpeed, isInDialogue }: PlayerMotion): AnimationState {
  if (isInDialogue) return "talk";
  if (horizontalSpeed < IDLE_SPEED_THRESHOLD) return "idle";
  if (horizontalSpeed >= RUN_SPEED_THRESHOLD) return "run";
  return "walk";
}

/** Playback rate keeping the feet roughly in sync with the ground speed. */
export function getAnimationTimeScale(state: AnimationState, horizontalSpeed: number): number {
  const referenceSpeed = REFERENCE_SPEEDS[state];
  if (!referenceSpeed) return 1;
  return Math.min(Math.max(horizontalSpeed / referenceSpeed, MIN_TIME_SCALE), MAX_TIME_SCALE);
}

const IDLE_SPEED_THRESHOLD = 0.15;
const RUN_SPEED_THRESHOLD = (PLAYER_CONFIG.walkSpeed + PLAYER_CONFIG.runSpeed) / 2;
const MIN_TIME_SCALE = 0.6;
const MAX_TIME_SCALE = 1.4;

const REFERENCE_SPEEDS: Readonly<Record<AnimationState, number | null>> = {
  idle: null,
  walk: PLAYER_CONFIG.walkSpeed,
  run: PLAYER_CONFIG.runSpeed,
  talk: null,
};
