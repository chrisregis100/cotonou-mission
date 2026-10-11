"use client";

import { useEffect, useRef } from "react";

import {
  createEmptyInputState,
  pressKey,
  releaseKey,
  resolveInputAction,
  toInputState,
  type InputState,
  type PressedKeys,
} from "@/game/core/input-manager";

interface UseKeyboardInputOptions {
  onInteract?: () => void;
}

/** Keeps the keyboard state in a ref so the render loop can read it without re-rendering React. */
export function useKeyboardInput({ onInteract }: UseKeyboardInputOptions = {}) {
  const inputRef = useRef<InputState>(createEmptyInputState());
  const onInteractRef = useRef(onInteract);

  useEffect(() => {
    onInteractRef.current = onInteract;
  }, [onInteract]);

  useEffect(() => {
    let pressedKeys: PressedKeys = new Map();

    const syncInputState = (nextPressedKeys: PressedKeys) => {
      pressedKeys = nextPressedKeys;
      inputRef.current = toInputState(pressedKeys);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return;

      const action = resolveInputAction(event.key, event.code);
      if (!action) return;

      event.preventDefault();
      if (action === "interact" && !event.repeat) onInteractRef.current?.();
      syncInputState(pressKey(pressedKeys, event.key, event.code));
    };

    const handleKeyUp = (event: KeyboardEvent) => syncInputState(releaseKey(pressedKeys, event.code));
    const handleBlur = () => syncInputState(new Map());

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  return inputRef;
}

function isEditableTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
}
