import { NextResponse, NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/db";
import { equipment } from "@/db/schema";



export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ equipmentId: string }> }
  ) {
    try {
      const equipmentId = (await params).equipmentId;
      const equipmentItem = await db.select().from(equipment).where(eq(equipment.id, parseInt(equipmentId)));
      return NextResponse.json(equipmentItem);
    }
    catch (error) {
      return NextResponse.json(
        { error: "Error fetching equipment" },
        { status: 500 }
      );
    }
  }

export async function PUT(request: Request, { params }: { params: Promise<{ equipmentId: string }> }) {
    try {
      const { equipmentId } = await params;
      const body = await request.json();
      const { name, type, status, purchaseDate, lastMaintenance, notes } = body;
  
      if (!equipmentId) {
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
        .where(eq(equipment.id, parseInt(equipmentId)))
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
  
  export async function DELETE(request: Request, { params }: { params: Promise<{ equipmentId: string }> }) {
    try {
      const { equipmentId } = await params;
  
      if (!equipmentId) {
        return NextResponse.json(
          { error: "Equipment ID is required" },
          { status: 400 }
        );
      }
  
      const deletedEquipment = await db
        .delete(equipment)
        .where(eq(equipment.id, parseInt(equipmentId)))
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