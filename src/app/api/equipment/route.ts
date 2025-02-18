import { NextResponse, NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/db";
import { equipment } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, type, status, purchaseDate, lastMaintenance, notes } = body;

    const newEquipment = await db.insert(equipment).values({
      name,
      type, 
      status,
      purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
      lastMaintenance: lastMaintenance ? new Date(lastMaintenance) : null,
      notes
    }).returning();

    return NextResponse.json(newEquipment[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating equipment" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const equipmentList = await db.select().from(equipment);
    return NextResponse.json(equipmentList);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching equipment" },
      { status: 500 }
    );
  }
}


