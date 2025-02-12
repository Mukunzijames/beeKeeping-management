import { NextResponse, NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/db";
import { colonyHealth } from "@/db/schema";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ colonyId: string }> }
  ) {
    try {
      const colonyId  = (await params).colonyId;
      const colony = await db.select().from(colonyHealth).where(eq(colonyHealth.id, parseInt(colonyId)));
      return NextResponse.json(colony);
    }
    catch (error) {
      return NextResponse.json(
        { error: "Error fetching colony" },
        { status: 500 }
      );
    }
  }
export async function PUT(request: Request, { params }: { params: Promise<{ colonyId: string }> }) {
    try {
      const colonyId = (await params).colonyId;
      console.log(colonyId);            
      if (!colonyId) {
        return NextResponse.json(
          { error: "Record ID is required" },
          { status: 400 }
        );
      }
  
      const body = await request.json();
      const { queenPresent, broodPattern, pestPresence, diseaseSymptoms, notes } = body;
  
      const updatedRecord = await db
        .update(colonyHealth)
        .set({
          queenPresent,
          broodPattern,
          pestPresence,
          diseaseSymptoms,
          notes,
        })
        .where(eq(colonyHealth.id, parseInt(colonyId)))
        .returning();
  
      if (!updatedRecord.length) {
        return NextResponse.json(
          { error: "Health record not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(updatedRecord[0]);
    } catch (error) {
      return NextResponse.json(
        { error: "Error updating colony health record" },
        { status: 500 }
      );
    }
  }
  
  export async function DELETE(request: Request, { params }: { params: Promise<{ colonyId: string }> }) {
    try {
      const colonyId = (await params).colonyId;
      console.log(colonyId);            
  
      if (!colonyId) {
        return NextResponse.json(
          { error: "Record ID is required" },
          { status: 400 }
        );
      }
  
      const deletedRecord = await db
        .delete(colonyHealth)
        .where(eq(colonyHealth.id, parseInt(colonyId)))
        .returning();
  
      if (!deletedRecord.length) {
        return NextResponse.json(
          { error: "Health record not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(deletedRecord[0]);
    } catch (error) {
      return NextResponse.json(
        { error: "Error deleting colony health record" },
        { status: 500 }
      );
    }
  }
  