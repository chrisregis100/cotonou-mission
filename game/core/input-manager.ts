export const INPUT_ACTIONS = ["forward", "backward", "left", "right", "run", "interact"] as const;

export type InputAction = (typeof INPUT_ACTIONS)[number];

export interface InputState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  run: boolean;
  interact: boolean;
}

export interface MoveVector {
  /** Positive towards the right of the camera. */
  x: number;
  /** Positive towards the front of the camera. */
  z: number;
}

/** Map of physical key code to the action captured when the key went down. */
export type PressedKeys = ReadonlyMap<string, InputAction>;

/**
 * Accepts the ZQSD (AZERTY) and WASD (QWERTY) layouts at the same time: letters are resolved
 * from the printed character, with the physical position as fallback for non-latin layouts.
 */
export function resolveInputAction(key: string, code: string): InputAction | undefined {
  return CODE_BINDINGS[code] ?? KEY_BINDINGS[key.toLowerCase()] ?? LETTER_CODE_FALLBACK[code];
}

export function pressKey(pressedKeys: PressedKeys, key: string, code: string): PressedKeys {
  const action = resolveInputAction(key, code);
  if (!action || pressedKeys.get(code) === action) return pressedKeys;

  const nextPressedKeys = new Map(pressedKeys);
  nextPressedKeys.set(code, action);
  return nextPressedKeys;
}

export function releaseKey(pressedKeys: PressedKeys, code: string): PressedKeys {
  if (!pressedKeys.has(code)) return pressedKeys;

  const nextPressedKeys = new Map(pressedKeys);
  nextPressedKeys.delete(code);
  return nextPressedKeys;
}

export function toInputState(pressedKeys: PressedKeys): InputState {
  const inputState = createEmptyInputState();
  for (const action of pressedKeys.values()) inputState[action] = true;
  return inputState;
}

export function createEmptyInputState(): InputState {
  return { forward: false, backward: false, left: false, right: false, run: false, interact: false };
}

/** Normalized movement intent relative to the camera; zero when opposite keys cancel out. */
export function getMoveVector(inputState: InputState): MoveVector {
  const x = Number(inputState.right) - Number(inputState.left);
  const z = Number(inputState.forward) - Number(inputState.backward);
  const length = Math.hypot(x, z);
  if (length === 0) return { x: 0, z: 0 };
  return { x: x / length, z: z / length };
}

const CODE_BINDINGS: Readonly<Record<string, InputAction>> = {
  ArrowUp: "forward",
  ArrowDown: "backward",
  ArrowLeft: "left",
  ArrowRight: "right",
  ShiftLeft: "run",
  ShiftRight: "run",
};

const KEY_BINDINGS: Readonly<Record<string, InputAction>> = {
  z: "forward",
  w: "forward",
  s: "backward",
  q: "left",
  a: "left",
  d: "right",
  e: "interact",
};

const LETTER_CODE_FALLBACK: Readonly<Record<string, InputAction>> = {
  KeyW: "forward",
  KeyS: "backward",
  KeyA: "left",
  KeyD: "right",
  KeyE: "interact",
};
