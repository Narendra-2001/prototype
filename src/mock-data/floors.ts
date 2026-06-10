import type { Floor } from "@/types"

function generateFloors(
  buildingId: string,
  count: number,
  roomsPerFloor: number
): Floor[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${buildingId}-f${i + 1}`,
    buildingId,
    name: `Floor ${i + 1}`,
    number: i + 1,
    totalRooms: roomsPerFloor,
  }))
}

export const floors: Floor[] = [
  ...generateFloors("blr-a", 3, 6),
  ...generateFloors("blr-b", 3, 5),
  ...generateFloors("blr-c", 2, 7),
  ...generateFloors("hyd-a", 3, 7),
  ...generateFloors("hyd-b", 2, 8),
  ...generateFloors("del-a", 3, 7),
  ...generateFloors("del-b", 3, 6),
  ...generateFloors("del-c", 2, 8),
  ...generateFloors("che-a", 3, 8),
  ...generateFloors("che-b", 2, 10),
]
