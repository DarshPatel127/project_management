import { eq } from "drizzle-orm";
import { db } from "../../db/db";
import { projects } from "../../db/schema/projects";

export const deleteProject =async (projectId: number) => {
    const [deletedProject]= await db.delete(projects).where(eq(projects.id, projectId)).returning(
        {
            id: projects.id,
            name: projects.name,
            description: projects.description,
            managerId: projects.managerId
        }
    );
    if (!deletedProject) throw new Error("Project not found");
    return deletedProject;
}