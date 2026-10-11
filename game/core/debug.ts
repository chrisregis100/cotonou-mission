export interface DebugState {
  playerPosition: [number, number, number];
  isPlayerGrounded: boolean;
}

declare global {
  interface Window {
    __cotonouDebug?: DebugState;
  }
}

/** Read-only runtime snapshot exposed on `window.__cotonouDebug` for browser tests and manual checks. */
export const debugState: DebugState = {
  playerPosition: [0, 0, 0],
  isPlayerGrounded: false,
};

export function exposeDebugState() {
  if (typeof window === "undefined") return;
  window.__cotonouDebug = debugState;
}
