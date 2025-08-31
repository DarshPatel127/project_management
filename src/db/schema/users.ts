import * as t from "drizzle-orm/pg-core"

export const rolesEnum = t.pgEnum("roles", ["project_manager","employee"])

export const users = t.pgTable("users",
    {
        id: t.serial("id").primaryKey(),
        email: t.varchar("email", { length: 255 }).notNull().unique(),
        password: t.varchar("password", { length: 255 }).notNull(),
        name: t.varchar("name", { length: 255 }).notNull(),
        role: rolesEnum().default("employee").notNull(),
        refreshToken: t.varchar("refresh_token", { length: 256 }),
    }
)

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type UserWithoutPassword = Omit<User, "password">
export type UserWithToken = UserWithoutPassword & { access_token: string }