/** Frame-rate independent smoothing factor for exponential damping. */
export function getDampFactor(sharpness: number, deltaSeconds: number): number {
  return 1 - Math.exp(-sharpness * deltaSeconds);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Wraps an angle to the [-PI, PI] range. */
export function wrapAngle(angle: number): number {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

/** Damps an angle towards a target along the shortest arc. */
export function dampAngle(current: number, target: number, sharpness: number, deltaSeconds: number): number {
  const difference = wrapAngle(target - current);
  return wrapAngle(current + difference * getDampFactor(sharpness, deltaSeconds));
}

export interface PlanarVector {
  x: number;
  z: number;
}

/**
 * Converts a camera-relative move intent to a world-space direction.
 * At yaw 0 the camera looks towards -Z and its right is +X.
 */
export function cameraRelativeDirection(move: PlanarVector, cameraYaw: number): PlanarVector {
  const sinYaw = Math.sin(cameraYaw);
  const cosYaw = Math.cos(cameraYaw);
  return {
    x: move.z * -sinYaw + move.x * cosYaw,
    z: move.z * -cosYaw + move.x * -sinYaw,
  };
}
