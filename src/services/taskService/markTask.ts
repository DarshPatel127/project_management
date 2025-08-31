import { NextFunction } from "express";
import { db } from "../../db/db";
import { tasks } from "../../db/schema/tasks";
import { eq } from "drizzle-orm";

export const markTask = async(taskId:number,newStatus: "completed" | "not_completed",userId:number) =>{
    const [task] = await db.select().from(tasks).where((eq(tasks.id,taskId)));
    if (!task) {
        throw new Error("Task not found");
    }
    if (task.employeeId !== userId) {
        throw new Error("Not authorized to update this task");
    }
    await db.update(tasks).set({ status: newStatus }).where(eq(tasks.id, taskId));
    const [updatedTask] = await db.select().from(tasks).where(eq(tasks.id, taskId));
    if (!updatedTask) {
        throw new Error("Failed to update task");
    }
    return updatedTask;
}

