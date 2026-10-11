export const PLAYER_CONFIG = {
  walkSpeed: 2.2,
  runSpeed: 5.5,
  gravity: -20,
  maxFallSpeed: -30,
  turnSharpness: 12,
  capsuleHalfHeight: 0.55,
  capsuleRadius: 0.35,
  controllerOffset: 0.02,
  autostepMaxHeight: 0.3,
  autostepMinWidth: 0.2,
  snapToGroundDistance: 0.3,
  maxSlopeClimbAngle: Math.PI / 4,
  maxFrameDelta: 1 / 20,
} as const;

/** Distance from the capsule center to the feet. */
export const PLAYER_FEET_OFFSET = PLAYER_CONFIG.capsuleHalfHeight + PLAYER_CONFIG.capsuleRadius;

export const CAMERA_CONFIG = {
  fov: 55,
  initialYaw: 0,
  initialPitch: 0.35,
  minPitch: -0.15,
  maxPitch: 1.2,
  initialDistance: 5,
  minDistance: 2.5,
  maxDistance: 9,
  mouseSensitivity: 0.0025,
  zoomSensitivity: 0.004,
  targetHeight: 1.5,
  followSharpness: 12,
} as const;

export const INTERACTION_CONFIG = {
  defaultRadius: 2,
  probeIntervalSeconds: 0.1,
} as const;
