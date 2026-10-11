"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, type RefObject } from "react";
import { Vector3, type Object3D } from "three";

import { getCameraOffset, rotateCameraRig, zoomCameraRig, type CameraRig } from "@/game/camera/camera-rig";
import { CAMERA_CONFIG } from "@/game/core/config";
import { useGameStore } from "@/game/core/game-store";
import { getDampFactor } from "@/game/core/math";

interface ThirdPersonCameraProps {
  rigRef: RefObject<CameraRig>;
  targetRef: RefObject<Object3D | null>;
  /** Pointer lock is refused while this returns false (e.g. a dialogue is open). */
  canLockPointer?: () => boolean;
}

export function ThirdPersonCamera({ rigRef, targetRef, canLockPointer }: ThirdPersonCameraProps) {
  const canvas = useThree((state) => state.gl.domElement);
  const lookTargetRef = useRef(new Vector3());
  const desiredPositionRef = useRef(new Vector3());
  const hasSnappedRef = useRef(false);
  const canLockPointerRef = useRef(canLockPointer);

  useEffect(() => {
    canLockPointerRef.current = canLockPointer;
  }, [canLockPointer]);

  useEffect(() => {
    const { setPointerLocked } = useGameStore.getState();

    const handleClick = () => {
      if (document.pointerLockElement === canvas) return;
      if (canLockPointerRef.current && !canLockPointerRef.current()) return;
      // Browsers reject the request when the page lost focus or the user just exited; nothing to recover.
      Promise.resolve(canvas.requestPointerLock()).catch(() => undefined);
    };

    const handlePointerLockChange = () => setPointerLocked(document.pointerLockElement === canvas);

    const handleMouseMove = (event: MouseEvent) => {
      if (document.pointerLockElement !== canvas) return;
      rigRef.current = rotateCameraRig(rigRef.current, event.movementX, event.movementY);
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      rigRef.current = zoomCameraRig(rigRef.current, event.deltaY);
    };

    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("pointerlockchange", handlePointerLockChange);
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("wheel", handleWheel);
      document.removeEventListener("pointerlockchange", handlePointerLockChange);
      document.removeEventListener("mousemove", handleMouseMove);
      if (document.pointerLockElement === canvas) document.exitPointerLock();
      setPointerLocked(false);
    };
  }, [canvas, rigRef]);

  useFrame((state, delta) => {
    const target = targetRef.current;
    if (!target) return;

    const lookTarget = lookTargetRef.current;
    const desiredPosition = desiredPositionRef.current;
    const [offsetX, offsetY, offsetZ] = getCameraOffset(rigRef.current);

    target.getWorldPosition(desiredPosition);
    desiredPosition.y += CAMERA_CONFIG.targetHeight;

    if (!hasSnappedRef.current) {
      lookTarget.copy(desiredPosition);
      state.camera.position.set(lookTarget.x + offsetX, lookTarget.y + offsetY, lookTarget.z + offsetZ);
      hasSnappedRef.current = true;
    }

    const dampFactor = getDampFactor(CAMERA_CONFIG.followSharpness, delta);
    lookTarget.lerp(desiredPosition, dampFactor);
    desiredPosition.set(lookTarget.x + offsetX, lookTarget.y + offsetY, lookTarget.z + offsetZ);
    state.camera.position.lerp(desiredPosition, dampFactor);
    state.camera.lookAt(lookTarget);
  });

  return null;
}
