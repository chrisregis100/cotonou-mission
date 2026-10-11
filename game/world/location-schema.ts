import { z } from "zod";

const vector2Schema = z.tuple([z.number(), z.number()]);
const vector3Schema = z.tuple([z.number(), z.number(), z.number()]);
const colorSchema = z.string().regex(/^#[0-9a-fA-F]{6}$/);

const buildingSchema = z.object({
  id: z.string().min(1),
  /** Center of the footprint on the ground plane: [x, z]. */
  position: vector2Schema,
  /** [width, height, depth] in meters. */
  size: vector3Schema,
  rotationY: z.number().default(0),
  color: colorSchema,
});

const surfaceSchema = z.object({
  id: z.string().min(1),
  position: vector2Schema,
  /** [width, depth] in meters. */
  size: vector2Schema,
});

export const locationSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  /** True when the place does not reproduce a real documented location. */
  isFictional: z.boolean(),
  groundSize: vector2Schema,
  sidewalkHeight: z.number().nonnegative(),
  playerSpawn: vector3Schema,
  roads: z.array(surfaceSchema),
  sidewalks: z.array(surfaceSchema),
  buildings: z.array(buildingSchema),
});

export type LocationData = z.infer<typeof locationSchema>;
export type BuildingData = z.infer<typeof buildingSchema>;
export type SurfaceData = z.infer<typeof surfaceSchema>;
