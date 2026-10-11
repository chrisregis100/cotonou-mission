import { describe, expect, it } from "vitest";

import { getMoveVector, pressKey, releaseKey, resolveInputAction, toInputState } from "@/game/core/input-manager";

describe("resolveInputAction", () => {
  it.each([
    ["z", "KeyW", "forward"],
    ["w", "KeyW", "forward"],
    ["q", "KeyA", "left"],
    ["a", "KeyA", "left"],
    ["s", "KeyS", "backward"],
    ["d", "KeyD", "right"],
    ["e", "KeyE", "interact"],
    ["E", "KeyE", "interact"],
  ] as const)("maps key %s (code %s) to %s", (key, code, action) => {
    expect(resolveInputAction(key, code)).toBe(action);
  });

  it("maps arrows and both shift keys by physical code", () => {
    expect(resolveInputAction("ArrowUp", "ArrowUp")).toBe("forward");
    expect(resolveInputAction("ArrowLeft", "ArrowLeft")).toBe("left");
    expect(resolveInputAction("Shift", "ShiftLeft")).toBe("run");
    expect(resolveInputAction("Shift", "ShiftRight")).toBe("run");
  });

  it("falls back to the physical position for non-latin layouts", () => {
    expect(resolveInputAction("ц", "KeyW")).toBe("forward");
  });

  it("ignores unbound keys", () => {
    expect(resolveInputAction("x", "KeyX")).toBeUndefined();
  });
});

describe("pressKey / releaseKey", () => {
  it("releases the action captured at key down even if the printed key changed", () => {
    const pressed = pressKey(new Map(), "z", "KeyW");
    expect(toInputState(pressed).forward).toBe(true);

    const released = releaseKey(pressed, "KeyW");
    expect(toInputState(released).forward).toBe(false);
  });

  it("keeps an action active while another key bound to it is held", () => {
    const pressed = pressKey(pressKey(new Map(), "z", "KeyW"), "ArrowUp", "ArrowUp");
    expect(toInputState(releaseKey(pressed, "KeyW")).forward).toBe(true);
  });

  it("returns the same map for unbound or repeated keys", () => {
    const pressed = pressKey(new Map(), "d", "KeyD");
    expect(pressKey(pressed, "x", "KeyX")).toBe(pressed);
    expect(pressKey(pressed, "d", "KeyD")).toBe(pressed);
    expect(releaseKey(pressed, "KeyX")).toBe(pressed);
  });
});

describe("getMoveVector", () => {
  const idle = toInputState(new Map());

  it("is zero without input or when opposite keys cancel", () => {
    expect(getMoveVector(idle)).toEqual({ x: 0, z: 0 });
    expect(getMoveVector({ ...idle, forward: true, backward: true })).toEqual({ x: 0, z: 0 });
  });

  it("is normalized on diagonals", () => {
    const { x, z } = getMoveVector({ ...idle, forward: true, right: true });
    expect(Math.hypot(x, z)).toBeCloseTo(1);
    expect(x).toBeGreaterThan(0);
    expect(z).toBeGreaterThan(0);
  });
});
