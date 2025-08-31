import { users } from "./users";
import { projects } from "./projects";
import * as t from "drizzle-orm/pg-core";

export const statusEnum = t.pgEnum("task_status", ["completed","not_completed"]);
export const tasks = t.pgTable("tasks",
    {
        id: t.serial("id").primaryKey(),
        title: t.varchar("title", { length: 255 }).notNull(),
        description: t.text("description").notNull(),
        projectId: t.integer("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
        status : statusEnum().notNull().default("not_completed"),
        employeeId: t.integer("employee_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    }
)