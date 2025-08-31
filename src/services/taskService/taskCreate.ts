import { db } from "../../db/db";
import { tasks } from "../../db/schema/tasks";
import APIError from "../../utils/apiError";
import { eq,and } from "drizzle-orm";

export const createTask = async (title: string, description: string, projectId: number, employeeId: number) => {
    const existingtask =await db.select().from(tasks).where(and(eq(tasks.title, title),eq(tasks.projectId, projectId),eq(tasks.employeeId, employeeId)));
    if (existingtask.length > 0) {
        throw new APIError("Task already exists", 400);
    }
    const [newTask] = await db.insert(tasks).values({
        title: title,
        description:description,
        projectId: projectId,
        status: "not_completed",
        employeeId: employeeId
    }).returning();

    if (!newTask) {
        throw new APIError("Task creation failed", 500);
    }

    return newTask;
}
