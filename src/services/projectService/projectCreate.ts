import { db } from "../../db/db";
import { projects } from "../../db/schema/projects";
import { eq, and } from "drizzle-orm";
import APIError from "../../utils/apiError";

export const createProject = async (name: string, description: string, managerId: number) => {
    const existingProjects = await db.select().from(projects).where(and(eq(projects.name, name), eq(projects.managerId, managerId)));

    if (existingProjects.length > 0) {
        throw new APIError("A project with this name already exists for this manager", 409);
    }
    
    const [newProject] = await db.insert(projects).values({
        name: name,
        description: description,
        managerId: managerId
    }).returning();
    
    return newProject;
};
