import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/db";
import { colonyHealth } from "@/db/schema";



export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { hiveId, queenPresent, broodPattern, pestPresence, diseaseSymptoms, notes } = body;

    const newHealthRecord = await db.insert(colonyHealth).values({
      hiveId,
      queenPresent,
      broodPattern,
      pestPresence,
      diseaseSymptoms,
      notes,
    }).returning();

    return NextResponse.json(newHealthRecord[0], { status: 201 });
  } catch (error) {
   
    return NextResponse.json(
      { error: "Error creating colony health record" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hiveId = searchParams.get('hiveId');

    if (hiveId) {
      const healthRecords = await db
        .select()
        .from(colonyHealth)
        .where(eq(colonyHealth.hiveId, parseInt(hiveId)));
      return NextResponse.json(healthRecords);
    }

    const allHealthRecords = await db.select().from(colonyHealth);
    return NextResponse.json(allHealthRecords);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching colony health records" },
      { status: 500 }
    );
  }
}

