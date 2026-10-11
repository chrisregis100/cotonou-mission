import { CAMERA_CONFIG } from "@/game/core/config";
import { clamp, wrapAngle } from "@/game/core/math";

export interface CameraRig {
  /** Rotation around the vertical axis; 0 looks towards -Z. */
  yaw: number;
  /** Elevation angle; positive places the camera above the target. */
  pitch: number;
  distance: number;
}

export function createCameraRig(): CameraRig {
  return {
    yaw: CAMERA_CONFIG.initialYaw,
    pitch: CAMERA_CONFIG.initialPitch,
    distance: CAMERA_CONFIG.initialDistance,
  };
}

/** Moving the mouse right turns the view right; moving it down raises the camera to look down. */
export function rotateCameraRig(rig: CameraRig, movementX: number, movementY: number): CameraRig {
  return {
    ...rig,
    yaw: wrapAngle(rig.yaw - movementX * CAMERA_CONFIG.mouseSensitivity),
    pitch: clamp(rig.pitch + movementY * CAMERA_CONFIG.mouseSensitivity, CAMERA_CONFIG.minPitch, CAMERA_CONFIG.maxPitch),
  };
}

export function zoomCameraRig(rig: CameraRig, wheelDeltaY: number): CameraRig {
  return {
    ...rig,
    distance: clamp(
      rig.distance + wheelDeltaY * CAMERA_CONFIG.zoomSensitivity,
      CAMERA_CONFIG.minDistance,
      CAMERA_CONFIG.maxDistance,
    ),
  };
}

/** Camera position relative to the look target. */
export function getCameraOffset(rig: CameraRig): [number, number, number] {
  const horizontalDistance = Math.cos(rig.pitch) * rig.distance;
  return [
    Math.sin(rig.yaw) * horizontalDistance,
    Math.sin(rig.pitch) * rig.distance,
    Math.cos(rig.yaw) * horizontalDistance,
  ];
}
