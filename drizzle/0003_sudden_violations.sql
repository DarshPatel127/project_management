ALTER TABLE "tasks" RENAME COLUMN "assigned_to" TO "employee_id";--> statement-breakpoint
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_assigned_to_users_id_fk";
--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_employee_id_users_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;