import { db } from "../../db/db"
import { tasks } from "../../db/schema/tasks"
import { eq } from "drizzle-orm"

export const employeeTasks = async(employeeId:number)=>{
    const getTasks = await db.select().from(tasks).where(eq(tasks.employeeId, employeeId));
    return getTasks;
}