import { rolesEnum, users } from "./users";
import * as t from "drizzle-orm/pg-core"
import {sql} from "drizzle-orm"


export const projects = t.pgTable("projects",
    {
        id: t.serial("id").primaryKey(),
        name: t.varchar("name", { length: 255 }).notNull(),
        description: t.text("description").notNull(),
        managerId: t.integer("manager_id").notNull().references(() => users.id, {onDelete: "cascade",})
    }
)
