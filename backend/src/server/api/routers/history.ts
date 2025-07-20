import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { db, mastraThreads } from "~/server/db";
import { desc, eq } from "drizzle-orm";
import { memory } from "~/lib/memory";

export const historyRouter = createTRPCRouter({
  getOrCreateThreadId: protectedProcedure
    .input(
      z.object({
        resourceId: z.string(),
        createNew: z.boolean().optional().default(false),
      }),
    )
    .query(async ({ input }) => {
      try {
        const { resourceId, createNew } = input;

        // If createNew is true, always create a new thread
        if (createNew) {
          const newThread = await memory.createThread({
            resourceId,
          });
          return { threadId: newThread.id };
        }

        // Otherwise, try to get the most recent thread
        const existingThreads = await db
          .select()
          .from(mastraThreads)
          .where(eq(mastraThreads.resourceId, resourceId))
          .orderBy(desc(mastraThreads.updatedAt))
          .limit(1);

        if (existingThreads.length > 0) {
          return { threadId: existingThreads[0]!.id };
        } else {
          // No existing threads, create a new one
          const newThread = await memory.createThread({
            resourceId,
          });
          return { threadId: newThread.id };
        }
      } catch (error) {
        console.error("Failed to get or create thread:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get or create thread",
        });
      }
    }),

  getMessages: protectedProcedure
    .input(
      z.object({
        threadId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const { threadId } = input;

        const { uiMessages } = await memory.query({
          threadId,
          selectBy: {
            last: 15,
          },
        });

        return { messages: uiMessages };
      } catch (error) {
        console.error("Failed to get messages:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get messages",
        });
      }
    }),
});
