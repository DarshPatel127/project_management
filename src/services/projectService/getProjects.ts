import { db } from "../../db/db";
import { projects } from "../../db/schema/projects";
import { eq } from "drizzle-orm";
import APIError from "../../utils/apiError";

export const getManagerProjects = async (managerId: number) => {
    const allProjects = await db.select().from(projects).where(eq(projects.managerId, managerId));
    if (allProjects.length == 0){
        return new APIError("No project found",404);
    }
    return allProjects;
};