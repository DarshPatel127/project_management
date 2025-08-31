import { eq } from "drizzle-orm";
import { db } from "../../db/db";
import { tasks } from "../../db/schema/tasks";
import APIError from "../../utils/apiError";

export const deleteTask = async (taskId: number) => {
    const deletedTask = await db.delete(tasks).where(eq(tasks.id, taskId)).returning();

    if (!deletedTask) {
        throw new APIError("Task deletion failed", 500);
    }

    return deletedTask;
}
