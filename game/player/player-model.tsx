"use client";

import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import type { Group, Mesh } from "three";

import { PLAYER_MODEL_CONFIG } from "@/game/core/config";
import {
  getAnimationTimeScale,
  selectAnimationState,
  type AnimationState,
  type PlayerMotion,
} from "@/game/player/animation-state";

interface PlayerModelProps {
  motionRef: RefObject<PlayerMotion>;
}

export function PlayerModel({ motionRef }: PlayerModelProps) {
  const groupRef = useRef<Group>(null);
  const { scene, animations } = useGLTF(PLAYER_MODEL_CONFIG.url);
  const { actions } = useAnimations(animations, groupRef);
  const currentStateRef = useRef<AnimationState | null>(null);

  const model = useMemo(() => {
    scene.traverse((object) => {
      if (!(object as Mesh).isMesh) return;
      object.castShadow = true;
      object.receiveShadow = true;
    });
    return scene;
  }, [scene]);

  useEffect(() => {
    return () => {
      Object.values(actions).forEach((action) => action?.stop());
      currentStateRef.current = null;
    };
  }, [actions]);

  useFrame(() => {
    const motion = motionRef.current;
    const nextState = selectAnimationState(motion);
    const nextAction = actions[PLAYER_MODEL_CONFIG.clips[nextState]];
    if (!nextAction) return;

    nextAction.setEffectiveTimeScale(getAnimationTimeScale(nextState, motion.horizontalSpeed));
    if (currentStateRef.current === nextState) return;

    const previousState = currentStateRef.current;
    const previousAction = previousState ? actions[PLAYER_MODEL_CONFIG.clips[previousState]] : null;
    previousAction?.fadeOut(PLAYER_MODEL_CONFIG.crossFadeSeconds);
    nextAction.reset().fadeIn(PLAYER_MODEL_CONFIG.crossFadeSeconds).play();
    currentStateRef.current = nextState;
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload(PLAYER_MODEL_CONFIG.url);
