-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"clerk_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id")
);
--> statement-breakpoint
CREATE TABLE "mastra_evals" (
	"input" text NOT NULL,
	"output" text NOT NULL,
	"result" jsonb NOT NULL,
	"agent_name" text NOT NULL,
	"metric_name" text NOT NULL,
	"instructions" text NOT NULL,
	"test_info" jsonb,
	"global_run_id" text NOT NULL,
	"run_id" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"createdAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "mastra_workflow_snapshot" (
	"workflow_name" text NOT NULL,
	"run_id" text NOT NULL,
	"resourceId" text,
	"snapshot" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "mastra_workflow_snapshot_workflow_name_run_id_key" UNIQUE("workflow_name","run_id")
);
--> statement-breakpoint
CREATE TABLE "mastra_traces" (
	"id" text PRIMARY KEY NOT NULL,
	"parentSpanId" text,
	"name" text NOT NULL,
	"traceId" text NOT NULL,
	"scope" text NOT NULL,
	"kind" integer NOT NULL,
	"attributes" jsonb,
	"status" jsonb,
	"events" jsonb,
	"links" jsonb,
	"other" text,
	"startTime" bigint NOT NULL,
	"endTime" bigint NOT NULL,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mastra_threads" (
	"id" text PRIMARY KEY NOT NULL,
	"resourceId" text NOT NULL,
	"title" text NOT NULL,
	"metadata" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mastra_resources" (
	"id" text PRIMARY KEY NOT NULL,
	"workingMemory" text,
	"metadata" jsonb,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mastra_messages" (
	"id" text PRIMARY KEY NOT NULL,
	"thread_id" text NOT NULL,
	"content" text NOT NULL,
	"role" text NOT NULL,
	"type" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"resourceId" text
);

*/