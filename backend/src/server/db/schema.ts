import { pgTable, text, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name").notNull(),
  clerkId: text("clerk_id").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const resources = pgTable("resources", {
  id: text("id")
    .primaryKey()
    .notNull()
    .references(() => users.clerkId, { onDelete: "cascade" }),
  workingMemory: text("working_memory"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const threads = pgTable("threads", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  resourceId: text("resource_id")
    .notNull()
    .references(() => resources.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  metadata: text("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  threadId: uuid("thread_id")
    .notNull()
    .references(() => threads.id, { onDelete: "cascade" }),
  resourceId: text("resource_id").references(() => resources.id, {
    onDelete: "cascade",
  }),
  content: text("content").notNull(),
  role: text("role").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
