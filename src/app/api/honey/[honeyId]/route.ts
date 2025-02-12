import { NextResponse , NextRequest} from "next/server";
import { eq } from "drizzle-orm";
import db from "@/db";
import { honeyProduction } from "@/db/schema";



export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ honeyId: string }> }
  ) {
    try {
      const honeyId  = (await params).honeyId;
      const honey = await db.select().from(honeyProduction).where(eq(honeyProduction.id, parseInt(honeyId)));
      return NextResponse.json(honey);
    }
    catch (error) {
      return NextResponse.json(
        { error: "Error fetching colony" },
        { status: 500 }
      );
    }
  }

export async function PUT(request: Request, { params }: { params: Promise<{ honeyId: string }> }) {
    try {
      const honeyId = (await params).honeyId;
  
      if (!honeyId) {
        return NextResponse.json(
          { error: "Record ID is required" },
          { status: 400 }
        );
      }
  
      const body = await request.json();
      const { quantity, quality, batchNumber } = body;
  
      const updatedRecord = await db
        .update(honeyProduction)
        .set({
          quantity,
          quality,
          batchNumber,
        })
        .where(eq(honeyProduction.id, parseInt(honeyId)))
        .returning();
  
      if (!updatedRecord.length) {
        return NextResponse.json(
          { error: "Production record not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(updatedRecord[0]);
    } catch (error) {
      return NextResponse.json(
        { error: "Error updating honey production record" },
        { status: 500 }
      );
    }
  }
  
  export async function DELETE(request: Request, { params }: { params: Promise<{ honeyId: string }> }) {
    try {
      const honeyId = (await params).honeyId;
  
      if (!honeyId) {
        return NextResponse.json(
          { error: "Record ID is required" },
          { status: 400 }
        );
      }
  
      const deletedRecord = await db
        .delete(honeyProduction)
        .where(eq(honeyProduction.id, parseInt(honeyId)))
        .returning();
  
      if (!deletedRecord.length) {
        return NextResponse.json(
          { error: "Production record not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(deletedRecord[0]);
    } catch (error) {
      return NextResponse.json(
        { error: "Error deleting honey production record" },
        { status: 500 }
      );
    }
  }
  