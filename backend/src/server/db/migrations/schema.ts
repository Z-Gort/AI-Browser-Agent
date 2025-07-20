import {
  pgTable,
  unique,
  uuid,
  text,
  timestamp,
  jsonb,
  integer,
  bigint,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable(
  "users",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    name: text().notNull(),
    clerkId: text("clerk_id").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [unique("users_clerk_id_unique").on(table.clerkId)],
);

export const mastraEvals = pgTable("mastra_evals", {
  input: text().notNull(),
  output: text().notNull(),
  result: jsonb().notNull(),
  agentName: text("agent_name").notNull(),
  metricName: text("metric_name").notNull(),
  instructions: text().notNull(),
  testInfo: jsonb("test_info"),
  globalRunId: text("global_run_id").notNull(),
  runId: text("run_id").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull(),
  createdAtNullable: timestamp("createdAt", { mode: "string" }),
});

export const mastraWorkflowSnapshot = pgTable(
  "mastra_workflow_snapshot",
  {
    workflowName: text("workflow_name").notNull(),
    runId: text("run_id").notNull(),
    resourceId: text(),
    snapshot: text().notNull(),
    createdAt: timestamp({ mode: "string" }).notNull(),
    updatedAt: timestamp({ mode: "string" }).notNull(),
  },
  (table) => [
    unique("mastra_workflow_snapshot_workflow_name_run_id_key").on(
      table.workflowName,
      table.runId,
    ),
  ],
);

export const mastraTraces = pgTable("mastra_traces", {
  id: text().primaryKey().notNull(),
  parentSpanId: text(),
  name: text().notNull(),
  traceId: text().notNull(),
  scope: text().notNull(),
  kind: integer().notNull(),
  attributes: jsonb(),
  status: jsonb(),
  events: jsonb(),
  links: jsonb(),
  other: text(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  startTime: bigint({ mode: "number" }).notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  endTime: bigint({ mode: "number" }).notNull(),
  createdAt: timestamp({ mode: "string" }).notNull(),
});

export const mastraThreads = pgTable("mastra_threads", {
  id: text().primaryKey().notNull(),
  resourceId: text().notNull(),
  title: text().notNull(),
  metadata: text(),
  createdAt: timestamp({ mode: "string" }).notNull(),
  updatedAt: timestamp({ mode: "string" }).notNull(),
});

export const mastraResources = pgTable("mastra_resources", {
  id: text().primaryKey().notNull(),
  workingMemory: text(),
  metadata: jsonb(),
  createdAt: timestamp({ mode: "string" }).notNull(),
  updatedAt: timestamp({ mode: "string" }).notNull(),
});

export const mastraMessages = pgTable("mastra_messages", {
  id: text().primaryKey().notNull(),
  threadId: text("thread_id").notNull(),
  content: text().notNull(),
  role: text().notNull(),
  type: text().notNull(),
  createdAt: timestamp({ mode: "string" }).notNull(),
  resourceId: text(),
});
