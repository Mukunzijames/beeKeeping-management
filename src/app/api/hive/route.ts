import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/db";
import { hives } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { location, type, condition, colonyStrength } = body;

    const newHive = await db.insert(hives).values({
      location,
      type, 
      condition,
      colonyStrength,
    }).returning();

    return NextResponse.json(newHive[0], { status: 201 });
  } catch (error) {
    
    return NextResponse.json(
      { error: "Error creating hive" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allHives = await db.select().from(hives);
    return NextResponse.json(allHives);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching hives" },
      { status: 500 }
    );
  }
}

