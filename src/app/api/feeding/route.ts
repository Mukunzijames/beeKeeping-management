import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/db";
import { feeding } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { hiveId, feedType, quantity, feedingDate, notes } = body;

    const newFeeding = await db.insert(feeding).values({
      hiveId,
      feedType,
      quantity,
      feedingDate: feedingDate ? new Date(feedingDate) : null,
      notes
    }).returning();

    return NextResponse.json(newFeeding[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating feeding record" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const feedingLogs = await db.select().from(feeding);
    return NextResponse.json(feedingLogs);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching feeding logs" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, hiveId, feedType, quantity, feedingDate, notes } = body;

    if (!id) {
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
      .where(eq(feeding.id, id))
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

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "Feeding ID is required" },
        { status: 400 }
      );
    }

    const deletedFeeding = await db
      .delete(feeding)
      .where(eq(feeding.id, parseInt(id)))
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
