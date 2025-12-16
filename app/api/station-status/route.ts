import { NextResponse } from "next/server";
import { isStationDummy } from "@/lib/data";

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const systemId = searchParams.get("systemId");
    const stationId = searchParams.get("stationId");
    
    if (!systemId || !stationId) {
      return NextResponse.json({ error: "systemId and stationId are required" }, { status: 400 });
    }
    
    const dummy = isStationDummy(systemId, stationId);
    return NextResponse.json({ isDummy: dummy });
  } catch (error) {
    return NextResponse.json({ error: "Failed to check station status" }, { status: 500 });
  }
}

