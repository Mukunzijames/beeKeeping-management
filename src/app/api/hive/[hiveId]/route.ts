import { NextResponse, NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/db";
import { hives } from "@/db/schema";
import { revalidatePath } from "next/cache";



export async function GET(
  req: NextRequest,
  { params }: { params: { hiveId: string } } & { params: Record<string, string | string[]> }
) {
  try {
    const { hiveId } = params;
    const hive = await db.select().from(hives).where(eq(hives.id, parseInt(hiveId)));
    return NextResponse.json(hive);
  }
  catch (error) {
    return NextResponse.json(
      { error: "Error fetching hive" },
      { status: 500 }
    );
  }
}


export async function PUT(
  req: NextRequest,
  { params }: { params: { hiveId: string } } & { params: Record<string, string | string[]> }
) {
  try {
    const { hiveId } = params;
    const body = await req.json();
    const { condition, colonyStrength, location, type } = body;

    const updatedHive = await db
      .update(hives)
      .set({
        condition,
        colonyStrength,
        location,
        type,
        updatedAt: new Date(),
      })
      .where(eq(hives.id, parseInt(hiveId)))
      .returning();

    if (!updatedHive.length) {
      return NextResponse.json(
        { error: "Hive not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedHive[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating hive" },
      { status: 500 }
    );
  }
}
  export async function DELETE(
    req: NextRequest,
    { params }: { params: { hiveId: string } } & { params: Record<string, string | string[]> }
  ) {
    try {
      const { hiveId } = params;
  
      const deletedHive = await db
        .delete(hives)
        .where(eq(hives.id, parseInt(hiveId)))
        .returning();
  
      if (!deletedHive.length) {
        return NextResponse.json(
          { error: "Hive not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(deletedHive[0]);
    } catch (error) {
      return NextResponse.json(
        { error: "Error deleting hive" },
        { status: 500 }
      );
    }
  }
  