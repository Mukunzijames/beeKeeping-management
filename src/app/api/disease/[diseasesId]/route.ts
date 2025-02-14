import { NextResponse, NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/db";
import { pestDiseaseManagement } from "@/db/schema";



export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ diseasesId: string }> }
  ) {
    try {
      const diseasesId  = (await params).diseasesId;
      const diseases = await db.select().from(pestDiseaseManagement).where(eq(pestDiseaseManagement.id, parseInt(diseasesId)));
      return NextResponse.json(diseases);
    }
    catch (error) {
      return NextResponse.json(
        { error: "Error fetching diseases" },
        { status: 500 }
      );
    }
  }


export async function PUT(request: Request, { params }: { params: Promise<{ diseasesId: string }> }) {
    try {
      const diseasesId = (await params).diseasesId;
      const body = await request.json();
      const { id, hiveId, type, name, treatmentApplied, treatmentDate, outcome, followUpDate } = body;
  
      if (!diseasesId) {
        return NextResponse.json(
          { error: "Record ID is required" },
          { status: 400 }
        );
      }
  
      const updatedRecord = await db
        .update(pestDiseaseManagement)
        .set({
          hiveId,
          type,
          name,
          treatmentApplied,
          treatmentDate: treatmentDate ? new Date(treatmentDate) : null,
          outcome,
          followUpDate: followUpDate ? new Date(followUpDate) : null
        })
        .where(eq(pestDiseaseManagement.id, parseInt(diseasesId)))
        .returning();
  
      if (!updatedRecord.length) {
        return NextResponse.json(
          { error: "Record not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(updatedRecord[0]);
    } catch (error) {
      return NextResponse.json(
        { error: "Error updating pest/disease record" },
        { status: 500 }
      );
    }
  }
  
  export async function DELETE(request: Request , { params }: { params: Promise<{ diseasesId: string }> }) {
    try {
      const diseasesId = (await params).diseasesId;
  
      if (!diseasesId) {
        return NextResponse.json(
          { error: "Record ID is required" },
          { status: 400 }
        );
      }
  
      const deletedRecord = await db
        .delete(pestDiseaseManagement)
        .where(eq(pestDiseaseManagement.id, parseInt(diseasesId)))
        .returning();
  
      if (!deletedRecord.length) {
        return NextResponse.json(
          { error: "Record not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(deletedRecord[0]);
    } catch (error) {
      return NextResponse.json(
        { error: "Error deleting pest/disease record" },
        { status: 500 }
      );
    }
  }