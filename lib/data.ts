import {
  systems,
  lines,
  stations,
  type SystemInfo,
  type LineInfo,
  type StationData,
} from "./generated-data";

// Re-export types
export type { SystemInfo, LineInfo, StationData };

// Get all available systems
export function getSystems(): SystemInfo[] {
  return systems;
}

// Get lines for a system
export function getLines(systemId: string): LineInfo[] {
  return lines[systemId] || [];
}

// Get all stations for a system
export function getStations(systemId: string): string[] {
  const systemStations = stations[systemId];
  if (!systemStations) {
    return [];
  }
  return Object.keys(systemStations);
}

// Get station data
export function getStationData(
  systemId: string,
  stationId: string
): StationData | null {
  const systemStations = stations[systemId];
  if (!systemStations) {
    return null;
  }
  return systemStations[stationId] || null;
}

// Parse carriage/door format (e.g., "4.2" = 4th carriage, 2nd door)
export function parseCarriageDoor(
  value: string | number
): { carriage: number; door: number } | null {
  const str = String(value);
  const parts = str.split(".");

  if (parts.length !== 2) {
    return null;
  }

  const carriage = parseInt(parts[0], 10);
  const door = parseInt(parts[1], 10);

  if (isNaN(carriage) || isNaN(door)) {
    return null;
  }

  return { carriage, door };
}

// Get exits for a specific route (from station -> to station)
export function getExitsForRoute(
  systemId: string,
  lineId: string,
  fromStationId: string,
  toStationId: string
): Array<{
  exitName: string;
  carriage: number;
  door: number;
  isDummy?: boolean;
}> {
  const toStationData = getStationData(systemId, toStationId);

  if (!toStationData || !toStationData.platforms[lineId]) {
    return [];
  }

  const isDummy = toStationData.status === "dummy";
  const exits: Array<{
    exitName: string;
    carriage: number;
    door: number;
    isDummy?: boolean;
  }> = [];

  // Check all directions for this line
  Object.entries(toStationData.platforms[lineId]).forEach(
    ([direction, platformData]) => {
      if (platformData.exits) {
        Object.entries(platformData.exits).forEach(([exitName, value]) => {
          const parsed = parseCarriageDoor(value);
          if (parsed) {
            exits.push({
              exitName,
              carriage: parsed.carriage,
              door: parsed.door,
              isDummy,
            });
          }
        });
      }
    }
  );

  return exits;
}

// Check if station is dummy
export function isStationDummy(systemId: string, stationId: string): boolean {
  const stationData = getStationData(systemId, stationId);
  return stationData?.status === "dummy";
}
