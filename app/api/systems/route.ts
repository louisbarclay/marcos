import { NextResponse } from "next/server";
import { getSystems } from "@/lib/data";

export const runtime = 'edge';

export async function GET() {
  try {
    const systems = getSystems();
    return NextResponse.json(systems);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load systems" }, { status: 500 });
  }
}

