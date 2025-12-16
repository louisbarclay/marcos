import { NextResponse } from "next/server";
import { getStations } from "@/lib/data";

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const systemId = searchParams.get("systemId");
    
    if (!systemId) {
      return NextResponse.json({ error: "systemId is required" }, { status: 400 });
    }
    
    const stations = getStations(systemId);
    return NextResponse.json(stations);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load stations" }, { status: 500 });
  }
}

