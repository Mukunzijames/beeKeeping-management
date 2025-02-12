import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/db";
import { honeyProduction } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { hiveId, harvestDate, quantity, quality, batchNumber } = body;

    const newHarvestRecord = await db.insert(honeyProduction).values({
      hiveId,
      harvestDate: new Date(harvestDate),
      quantity,
      quality,
      batchNumber,
    }).returning();

    return NextResponse.json(newHarvestRecord[0], { status: 201 });
  } catch (error) {
   
    return NextResponse.json(
      { error: "Error creating honey production record" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hiveId = searchParams.get('hiveId');

    if (hiveId) {
      const harvestRecords = await db
        .select()
        .from(honeyProduction)
        .where(eq(honeyProduction.hiveId, parseInt(hiveId)));
      return NextResponse.json(harvestRecords);
    }

    const allHarvestRecords = await db.select().from(honeyProduction);
    return NextResponse.json(allHarvestRecords);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching honey production records" },
      { status: 500 }
    );
  }
}

