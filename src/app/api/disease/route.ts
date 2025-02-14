import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/db";
import { pestDiseaseManagement } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { hiveId, type, name, treatmentApplied, treatmentDate, outcome, followUpDate } = body;

    const newRecord = await db.insert(pestDiseaseManagement).values({
      hiveId,
      type,
      name,
      treatmentApplied,
      treatmentDate: treatmentDate ? new Date(treatmentDate) : null,
      outcome,
      followUpDate: followUpDate ? new Date(followUpDate) : null
    }).returning();

    return NextResponse.json(newRecord[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating pest/disease record" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const records = await db.select().from(pestDiseaseManagement);
    return NextResponse.json(records);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching pest/disease records" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, hiveId, type, name, treatmentApplied, treatmentDate, outcome, followUpDate } = body;

    if (!id) {
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
      .where(eq(pestDiseaseManagement.id, id))
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

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "Record ID is required" },
        { status: 400 }
      );
    }

    const deletedRecord = await db
      .delete(pestDiseaseManagement)
      .where(eq(pestDiseaseManagement.id, parseInt(id)))
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
