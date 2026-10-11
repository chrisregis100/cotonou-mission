"use client";

import { CuboidCollider, RigidBody } from "@react-three/rapier";

import type { BuildingData, LocationData, SurfaceData } from "@/game/world/location-schema";

interface TestDistrictProps {
  location: LocationData;
}

/** Provisional blockout: simple volumes with colliders, not a representation of a real place. */
export function TestDistrict({ location }: TestDistrictProps) {
  const [groundWidth, groundDepth] = location.groundSize;

  return (
    <group name={location.id}>
      <RigidBody type="fixed" colliders={false} name="ground">
        <CuboidCollider args={[groundWidth / 2, 0.5, groundDepth / 2]} position={[0, -0.5, 0]} />
        <mesh rotation-x={-Math.PI / 2} receiveShadow>
          <planeGeometry args={[groundWidth, groundDepth]} />
          <meshStandardMaterial color={GROUND_COLOR} roughness={1} />
        </mesh>
      </RigidBody>

      {location.roads.map((road, index) => (
        <Road key={road.id} road={road} elevation={0.01 + index * 0.002} />
      ))}

      {location.sidewalks.map((sidewalk) => (
        <Sidewalk key={sidewalk.id} sidewalk={sidewalk} height={location.sidewalkHeight} />
      ))}

      {location.buildings.map((building) => (
        <Building key={building.id} building={building} baseHeight={location.sidewalkHeight} />
      ))}

      <BoundaryWalls width={groundWidth} depth={groundDepth} />
    </group>
  );
}

function Road({ road, elevation }: { road: SurfaceData; elevation: number }) {
  const [x, z] = road.position;
  const [width, depth] = road.size;

  return (
    <mesh position={[x, elevation, z]} rotation-x={-Math.PI / 2} receiveShadow>
      <planeGeometry args={[width, depth]} />
      <meshStandardMaterial color={ROAD_COLOR} roughness={0.95} />
    </mesh>
  );
}

function Sidewalk({ sidewalk, height }: { sidewalk: SurfaceData; height: number }) {
  const [x, z] = sidewalk.position;
  const [width, depth] = sidewalk.size;

  return (
    <RigidBody type="fixed" colliders={false} position={[x, height / 2, z]} name={sidewalk.id}>
      <CuboidCollider args={[width / 2, height / 2, depth / 2]} />
      <mesh receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={SIDEWALK_COLOR} roughness={0.9} />
      </mesh>
    </RigidBody>
  );
}

function Building({ building, baseHeight }: { building: BuildingData; baseHeight: number }) {
  const [x, z] = building.position;
  const [width, height, depth] = building.size;

  return (
    <RigidBody
      type="fixed"
      colliders={false}
      position={[x, baseHeight + height / 2, z]}
      rotation-y={building.rotationY}
      name={building.id}
    >
      <CuboidCollider args={[width / 2, height / 2, depth / 2]} />
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={building.color} roughness={0.85} />
      </mesh>
      <mesh position={[0, height / 2 + ROOF_LIP_HEIGHT / 2, 0]} castShadow>
        <boxGeometry args={[width + 0.3, ROOF_LIP_HEIGHT, depth + 0.3]} />
        <meshStandardMaterial color={ROOF_LIP_COLOR} roughness={0.9} />
      </mesh>
    </RigidBody>
  );
}

function BoundaryWalls({ width, depth }: { width: number; depth: number }) {
  const halfWidth = width / 2;
  const halfDepth = depth / 2;

  return (
    <RigidBody type="fixed" colliders={false} name="boundary">
      <CuboidCollider args={[halfWidth, BOUNDARY_HEIGHT, 0.5]} position={[0, BOUNDARY_HEIGHT, halfDepth + 0.5]} />
      <CuboidCollider args={[halfWidth, BOUNDARY_HEIGHT, 0.5]} position={[0, BOUNDARY_HEIGHT, -halfDepth - 0.5]} />
      <CuboidCollider args={[0.5, BOUNDARY_HEIGHT, halfDepth]} position={[halfWidth + 0.5, BOUNDARY_HEIGHT, 0]} />
      <CuboidCollider args={[0.5, BOUNDARY_HEIGHT, halfDepth]} position={[-halfWidth - 0.5, BOUNDARY_HEIGHT, 0]} />
    </RigidBody>
  );
}

const GROUND_COLOR = "#b9a07a";
const ROAD_COLOR = "#5a5650";
const SIDEWALK_COLOR = "#a39e93";
const ROOF_LIP_COLOR = "#6f675d";
const ROOF_LIP_HEIGHT = 0.25;
const BOUNDARY_HEIGHT = 5;
