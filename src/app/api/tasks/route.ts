import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/db";
import { tasks } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { hiveId, taskType, description, assignedTo, dueDate, status, notes } = body;

    const newTask = await db.insert(tasks).values({
      hiveId: hiveId ? parseInt(hiveId) : null,
      taskType,
      description,
      assignedTo,
      dueDate: dueDate ? new Date(dueDate) : null,
      status,
      notes,
    }).returning();

    return NextResponse.json(newTask[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating task" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hiveId = searchParams.get('hiveId');
    const status = searchParams.get('status');

    let conditions = [];
    if (hiveId) {
      conditions.push(eq(tasks.hiveId, parseInt(hiveId)));
    }
    if (status) {
      conditions.push(eq(tasks.status, status));
    }

    const taskList = await db
      .select()
      .from(tasks)
      .where(conditions.length > 0 ? conditions[0] : undefined)
      .execute();

    return NextResponse.json(taskList);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching tasks" },
      { status: 500 }
    );
  }
}
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, hiveId, taskType, description, assignedTo, dueDate, status, notes, completedAt } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }

    const updatedTask = await db
      .update(tasks)
      .set({
        hiveId: hiveId ? parseInt(hiveId) : null,
        taskType,
        description,
        assignedTo,
        dueDate: dueDate ? new Date(dueDate) : null,
        status,
        completedAt: completedAt ? new Date(completedAt) : null,
        notes
      })
      .where(eq(tasks.id, id))
      .returning();

    if (!updatedTask.length) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTask[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating task" },
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
        { error: "Task ID is required" },
        { status: 400 }
      );
    }

    const deletedTask = await db
      .delete(tasks)
      .where(eq(tasks.id, parseInt(id)))
      .returning();

    if (!deletedTask.length) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(deletedTask[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting task" },
      { status: 500 }
    );
  }
}
