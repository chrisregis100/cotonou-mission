import { describe, expect, it } from "vitest";

import { createCameraRig, getCameraOffset, rotateCameraRig, zoomCameraRig } from "@/game/camera/camera-rig";
import { CAMERA_CONFIG } from "@/game/core/config";
import { cameraRelativeDirection, dampAngle, wrapAngle } from "@/game/core/math";

describe("cameraRelativeDirection", () => {
  it("moves towards -Z when pressing forward with the default camera", () => {
    const direction = cameraRelativeDirection({ x: 0, z: 1 }, 0);
    expect(direction.x).toBeCloseTo(0);
    expect(direction.z).toBeCloseTo(-1);
  });

  it("moves towards +X when pressing right with the default camera", () => {
    const direction = cameraRelativeDirection({ x: 1, z: 0 }, 0);
    expect(direction.x).toBeCloseTo(1);
    expect(direction.z).toBeCloseTo(0);
  });

  it("follows the camera when it turns right", () => {
    const direction = cameraRelativeDirection({ x: 0, z: 1 }, -Math.PI / 2);
    expect(direction.x).toBeCloseTo(1);
    expect(direction.z).toBeCloseTo(0);
  });
});

describe("angles", () => {
  it("wraps to [-PI, PI]", () => {
    expect(wrapAngle(3 * Math.PI)).toBeCloseTo(Math.PI);
    expect(wrapAngle(-Math.PI / 2 - 2 * Math.PI)).toBeCloseTo(-Math.PI / 2);
  });

  it("damps along the shortest arc", () => {
    const next = dampAngle(Math.PI - 0.1, -Math.PI + 0.1, 10, 0.016);
    expect(Math.abs(next)).toBeGreaterThan(Math.PI - 0.1);
  });
});

describe("camera rig", () => {
  it("places the default camera behind (+Z) and above the target", () => {
    const [x, y, z] = getCameraOffset(createCameraRig());
    expect(x).toBeCloseTo(0);
    expect(y).toBeGreaterThan(0);
    expect(z).toBeGreaterThan(0);
  });

  it("clamps pitch and distance", () => {
    const rig = rotateCameraRig(createCameraRig(), 0, 100_000);
    expect(rig.pitch).toBe(CAMERA_CONFIG.maxPitch);
    expect(zoomCameraRig(rig, 100_000).distance).toBe(CAMERA_CONFIG.maxDistance);
    expect(zoomCameraRig(rig, -100_000).distance).toBe(CAMERA_CONFIG.minDistance);
  });

  it("turns right when the mouse moves right", () => {
    const rig = rotateCameraRig(createCameraRig(), 100, 0);
    expect(rig.yaw).toBeLessThan(0);
  });
});
