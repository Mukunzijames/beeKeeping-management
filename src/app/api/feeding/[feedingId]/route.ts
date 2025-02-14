import { NextResponse, NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/db";
import { feeding } from "@/db/schema";


export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ feedingId: string }> }
  ) {
    try {
      const feedingId = (await params).feedingId;
      const feedingItem = await db.select().from(feeding).where(eq(feeding.id, parseInt(feedingId)));
      return NextResponse.json(feedingItem);
    }
    catch (error) {
      return NextResponse.json(
        { error: "Error fetching feeding record" },
        { status: 500 }
      );
    }
  }

export async function PUT(request: Request, { params }: { params: Promise<{ feedingId: string }> }) {
    try {
      const feedingId = (await params).feedingId;
      const body = await request.json();
      const { hiveId, feedType, quantity, feedingDate, notes } = body;
  
      if (!feedingId) {
        return NextResponse.json(
          { error: "Feeding ID is required" },
          { status: 400 }
        );
      }
  
      const updatedFeeding = await db
        .update(feeding)
        .set({
          hiveId,
          feedType,
          quantity,
          feedingDate: feedingDate ? new Date(feedingDate) : null,
          notes,
        })
        .where(eq(feeding.id, parseInt(feedingId)))
        .returning();
  
      if (!updatedFeeding.length) {
        return NextResponse.json(
          { error: "Feeding record not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(updatedFeeding[0]);
    } catch (error) {
      return NextResponse.json(
        { error: "Error updating feeding record" },
        { status: 500 }
      );
    }
  }
  
  export async function DELETE(request: Request, { params }: { params: Promise<{ feedingId: string }> }) {
    try {
      const  feedingId  = (await params).feedingId;
  
      if (!feedingId) {
        return NextResponse.json(
          { error: "Feeding ID is required" },
          { status: 400 }
        );
      }
  
      const deletedFeeding = await db
        .delete(feeding)
        .where(eq(feeding.id, parseInt(feedingId)))
        .returning();
  
      if (!deletedFeeding.length) {
        return NextResponse.json(
          { error: "Feeding record not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(deletedFeeding[0]);
    } catch (error) {
      return NextResponse.json(
        { error: "Error deleting feeding record" },
        { status: 500 }
      );
    }
  }