"use client";

import { Sky } from "@react-three/drei";

/** Single fixed time of day for the MVP: late afternoon, warm low sun. */
export function Lighting() {
  return (
    <>
      <Sky sunPosition={SUN_POSITION} turbidity={6} rayleigh={1.6} mieCoefficient={0.006} mieDirectionalG={0.85} />
      <fog attach="fog" args={[FOG_COLOR, 45, 120]} />
      <hemisphereLight args={[SKY_COLOR, GROUND_BOUNCE_COLOR, 1.8]} />
      <ambientLight intensity={0.35} color={SKY_COLOR} />
      <directionalLight
        position={SUN_POSITION}
        color={SUN_COLOR}
        intensity={2.6}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.03}
        shadow-camera-left={-45}
        shadow-camera-right={45}
        shadow-camera-top={45}
        shadow-camera-bottom={-45}
        shadow-camera-near={1}
        shadow-camera-far={140}
      />
    </>
  );
}

const SUN_POSITION: [number, number, number] = [-40, 28, 30];
const SUN_COLOR = "#ffd7a3";
const SKY_COLOR = "#bcd4f0";
const GROUND_BOUNCE_COLOR = "#8a6f4e";
const FOG_COLOR = "#e9d3b5";
