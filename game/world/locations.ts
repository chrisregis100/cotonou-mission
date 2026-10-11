import testDistrictJson from "@/data/locations/test-district.json";
import { locationSchema } from "@/game/world/location-schema";

export const testDistrict = locationSchema.parse(testDistrictJson);
