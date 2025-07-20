import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { db, mastraThreads, mastraMessages } from "~/server/db";
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
        console.log("create new", input.createNew);
        const { resourceId, createNew } = input;

        // If createNew is true, always create a new thread
        if (createNew) {
          const newThread = await memory.createThread({
            resourceId,
          });
          return { threadId: newThread.id };
        }

        // Find the most recent thread by querying the most recent message from this user
        const mostRecentMessage = await db
          .select({
            threadId: mastraMessages.threadId,
            createdAt: mastraMessages.createdAt,
          })
          .from(mastraMessages)
          .where(eq(mastraMessages.resourceId, resourceId))
          .orderBy(desc(mastraMessages.createdAt))
          .limit(1);

        // Also find the most recently created thread by this user
        const mostRecentThread = await db
          .select({
            id: mastraThreads.id,
            createdAt: mastraThreads.createdAt,
          })
          .from(mastraThreads)
          .where(eq(mastraThreads.resourceId, resourceId))
          .orderBy(desc(mastraThreads.createdAt))
          .limit(1);

        // Compare timestamps to determine which is more recent
        const messageDate = mostRecentMessage[0]?.createdAt;
        const threadDate = mostRecentThread[0]?.createdAt;

        if (threadDate && messageDate) {
          // Both exist - use whichever is more recent
          if (new Date(threadDate) > new Date(messageDate)) {
            // Thread is newer than the most recent message, use the empty thread
            return { threadId: mostRecentThread[0]!.id };
          } else {
            // Message is newer, use its thread
            return { threadId: mostRecentMessage[0]!.threadId };
          }
        } else if (mostRecentMessage.length > 0) {
          // Only messages exist
          return { threadId: mostRecentMessage[0]!.threadId };
        } else if (mostRecentThread.length > 0) {
          // Only threads exist (empty thread case)
          return { threadId: mostRecentThread[0]!.id };
        } else {
          // No existing messages/threads, create a new one
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
