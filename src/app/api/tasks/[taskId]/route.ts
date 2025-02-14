import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/db";
import { tasks } from "@/db/schema";




export async function PUT(request: Request, { params }:     { params: Promise<{ taskId: string }> }) {
    try {
      const taskId = (await params).taskId ;
      const body = await request.json();
      const { id, hiveId, taskType, description, assignedTo, dueDate, status, notes, completedAt } = body;
  
      if (!taskId) {
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
        .where(eq(tasks.id, parseInt(taskId)))
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
  
  export async function DELETE(request: Request, { params }: { params: Promise<{ taskId: string }> }) {
    try {
      const taskId = (await params).taskId;
  
      if (!taskId) {
        return NextResponse.json(
          { error: "Task ID is required" },
          { status: 400 }
        );
      }
  
      const deletedTask = await db
        .delete(tasks)
        .where(eq(tasks.id, parseInt(taskId)))
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