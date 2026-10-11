"use client";

import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody, useRapier, type RapierCollider, type RapierRigidBody } from "@react-three/rapier";
import { Suspense, useEffect, useRef } from "react";
import type { Group } from "three";

import { createCameraRig, type CameraRig } from "@/game/camera/camera-rig";
import { ThirdPersonCamera } from "@/game/camera/third-person-camera";
import { INTERACTION_CONFIG, PLAYER_CONFIG, PLAYER_FEET_OFFSET } from "@/game/core/config";
import { debugState } from "@/game/core/debug";
import { useGameStore } from "@/game/core/game-store";
import { getMoveVector } from "@/game/core/input-manager";
import { cameraRelativeDirection, dampAngle } from "@/game/core/math";
import { useKeyboardInput } from "@/game/core/use-keyboard-input";
import { findNearestInteractable, interactionRegistry } from "@/game/interactions/interaction-system";
import type { PlayerMotion } from "@/game/player/animation-state";
import { PlaceholderCharacter } from "@/game/player/placeholder-character";
import { PlayerModel } from "@/game/player/player-model";

interface PlayerControllerProps {
  spawnPosition: [number, number, number];
}

type CharacterController = ReturnType<ReturnType<typeof useRapier>["world"]["createCharacterController"]>;

export function PlayerController({ spawnPosition }: PlayerControllerProps) {
  const { world } = useRapier();
  const bodyRef = useRef<RapierRigidBody>(null);
  const colliderRef = useRef<RapierCollider>(null);
  const visualRef = useRef<Group>(null);
  const controllerRef = useRef<CharacterController | null>(null);
  const rigRef = useRef<CameraRig>(createCameraRig());
  const verticalVelocityRef = useRef(0);
  const motionRef = useRef<PlayerMotion>({ horizontalSpeed: 0, isInDialogue: false });
  const probeElapsedRef = useRef(0);
  const inputRef = useKeyboardInput({ onInteract: handleInteract });

  useEffect(() => {
    const controller = world.createCharacterController(PLAYER_CONFIG.controllerOffset);
    controller.enableAutostep(PLAYER_CONFIG.autostepMaxHeight, PLAYER_CONFIG.autostepMinWidth, false);
    controller.enableSnapToGround(PLAYER_CONFIG.snapToGroundDistance);
    controller.setMaxSlopeClimbAngle(PLAYER_CONFIG.maxSlopeClimbAngle);
    controllerRef.current = controller;
    useGameStore.getState().setSceneReady(true);

    return () => {
      world.removeCharacterController(controller);
      controllerRef.current = null;
      useGameStore.getState().setSceneReady(false);
      useGameStore.getState().setNearbyInteractable(null);
    };
  }, [world]);

  useFrame((_, rawDelta) => {
    const body = bodyRef.current;
    const collider = colliderRef.current;
    const controller = controllerRef.current;
    const visual = visualRef.current;
    if (!body || !collider || !controller || !visual) return;

    const delta = Math.min(rawDelta, PLAYER_CONFIG.maxFrameDelta);
    const { dialogueSession, nearbyInteractable } = useGameStore.getState();
    const isInDialogue = dialogueSession !== null;
    const input = inputRef.current;
    const moveVector = isInDialogue ? { x: 0, z: 0 } : getMoveVector(input);
    const direction = cameraRelativeDirection(moveVector, rigRef.current.yaw);
    const speed = input.run ? PLAYER_CONFIG.runSpeed : PLAYER_CONFIG.walkSpeed;

    verticalVelocityRef.current = Math.max(
      verticalVelocityRef.current + PLAYER_CONFIG.gravity * delta,
      PLAYER_CONFIG.maxFallSpeed,
    );

    controller.computeColliderMovement(collider, {
      x: direction.x * speed * delta,
      y: verticalVelocityRef.current * delta,
      z: direction.z * speed * delta,
    });

    const movement = controller.computedMovement();
    const isGrounded = controller.computedGrounded();
    if (isGrounded) verticalVelocityRef.current = 0;

    const position = body.translation();
    const nextPosition = { x: position.x + movement.x, y: position.y + movement.y, z: position.z + movement.z };
    if (nextPosition.y < FALL_RESET_HEIGHT) Object.assign(nextPosition, toVector(spawnPosition));
    body.setNextKinematicTranslation(nextPosition);

    const facingTarget =
      isInDialogue && nearbyInteractable
        ? { x: nearbyInteractable.position[0] - nextPosition.x, z: nearbyInteractable.position[2] - nextPosition.z }
        : direction;
    if (facingTarget.x !== 0 || facingTarget.z !== 0) {
      const targetYaw = Math.atan2(facingTarget.x, facingTarget.z);
      visual.rotation.y = dampAngle(visual.rotation.y, targetYaw, PLAYER_CONFIG.turnSharpness, delta);
    }

    motionRef.current.horizontalSpeed = delta > 0 ? Math.hypot(movement.x, movement.z) / delta : 0;
    motionRef.current.isInDialogue = isInDialogue;

    debugState.playerPosition[0] = nextPosition.x;
    debugState.playerPosition[1] = nextPosition.y - PLAYER_FEET_OFFSET;
    debugState.playerPosition[2] = nextPosition.z;
    debugState.isPlayerGrounded = isGrounded;

    probeElapsedRef.current += rawDelta;
    if (probeElapsedRef.current >= INTERACTION_CONFIG.probeIntervalSeconds && !isInDialogue) {
      probeElapsedRef.current = 0;
      updateNearbyInteractable(debugState.playerPosition);
    }
  });

  return (
    <>
      <RigidBody
        ref={bodyRef}
        type="kinematicPosition"
        colliders={false}
        position={spawnPosition}
        enabledRotations={[false, false, false]}
        name="player"
      >
        <CapsuleCollider ref={colliderRef} args={[PLAYER_CONFIG.capsuleHalfHeight, PLAYER_CONFIG.capsuleRadius]} />
        <group ref={visualRef} position-y={-PLAYER_FEET_OFFSET} rotation-y={Math.PI}>
          <Suspense fallback={<PlaceholderCharacter />}>
            <PlayerModel motionRef={motionRef} />
          </Suspense>
        </group>
      </RigidBody>
      <ThirdPersonCamera rigRef={rigRef} targetRef={visualRef} canLockPointer={canLockPointer} />
    </>
  );
}

function handleInteract() {
  useGameStore.getState().interact();
}

function canLockPointer() {
  return useGameStore.getState().dialogueSession === null;
}

function updateNearbyInteractable(playerPosition: readonly [number, number, number]) {
  const { nearbyInteractable, setNearbyInteractable } = useGameStore.getState();
  const nearest = findNearestInteractable(interactionRegistry.list(), playerPosition);
  if (nearest?.id !== nearbyInteractable?.id) setNearbyInteractable(nearest);
}

function toVector([x, y, z]: [number, number, number]) {
  return { x, y, z };
}

const FALL_RESET_HEIGHT = -10;
