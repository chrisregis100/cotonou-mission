import { create } from "zustand";

interface GameState {
  isSceneReady: boolean;
  isPointerLocked: boolean;
  setSceneReady: (isSceneReady: boolean) => void;
  setPointerLocked: (isPointerLocked: boolean) => void;
}

/** Discrete game state shared with the DOM UI. High-frequency values stay in refs. */
export const useGameStore = create<GameState>()((set) => ({
  isSceneReady: false,
  isPointerLocked: false,
  setSceneReady: (isSceneReady) => set({ isSceneReady }),
  setPointerLocked: (isPointerLocked) => set({ isPointerLocked }),
}));
