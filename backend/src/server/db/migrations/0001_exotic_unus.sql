ALTER TABLE "resources" DROP CONSTRAINT "resources_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id");
ALTER TABLE "resources" ADD CONSTRAINT "resources_id_users_clerk_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("clerk_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resources" DROP COLUMN "user_id";--> statement-breakpoint