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

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, type, status, purchaseDate, lastMaintenance, notes } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Equipment ID is required" },
        { status: 400 }
      );
    }

    const updatedEquipment = await db
      .update(equipment)
      .set({
        name,
        type,
        status,
        purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
        lastMaintenance: lastMaintenance ? new Date(lastMaintenance) : null,
        notes,
      })
      .where(eq(equipment.id, id))
      .returning();

    if (!updatedEquipment.length) {
      return NextResponse.json(
        { error: "Equipment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedEquipment[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating equipment" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "Equipment ID is required" },
        { status: 400 }
      );
    }

    const deletedEquipment = await db
      .delete(equipment)
      .where(eq(equipment.id, parseInt(id)))
      .returning();

    if (!deletedEquipment.length) {
      return NextResponse.json(
        { error: "Equipment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(deletedEquipment[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting equipment" },
      { status: 500 }
    );
  }
}
