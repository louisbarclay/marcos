import { NextResponse } from "next/server";
import { getExitsForRoute } from "@/lib/data";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const systemId = searchParams.get("systemId");
    const lineId = searchParams.get("lineId");
    const fromStationId = searchParams.get("fromStationId");
    const toStationId = searchParams.get("toStationId");

    if (!systemId || !lineId || !fromStationId || !toStationId) {
      return NextResponse.json(
        {
          error:
            "systemId, lineId, fromStationId, and toStationId are required",
        },
        { status: 400 }
      );
    }

    const exits = getExitsForRoute(
      systemId,
      lineId,
      fromStationId,
      toStationId
    );
    return NextResponse.json(exits);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load exits" },
      { status: 500 }
    );
  }
}
