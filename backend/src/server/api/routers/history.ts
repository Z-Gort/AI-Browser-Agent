import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";
import { desc, eq } from "drizzle-orm";
import { memory } from "~/lib/memory";
import { mastraThreads } from "~/server/db/migrations/schema";

export const historyRouter = createTRPCRouter({
  getOrCreateThreadId: protectedProcedure
    .input(
      z.object({
        resourceId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const { resourceId } = input;

        const existingThreads = await db
          .select()
          .from(mastraThreads)
          .where(eq(mastraThreads.resourceId, resourceId))
          .orderBy(desc(mastraThreads.updatedAt))
          .limit(1);

        if (existingThreads.length > 0) {
          return { threadId: existingThreads[0]!.id };
        } else {
          const newThread = await memory.createThread({
            resourceId,
            title: "New Conversation",
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
});
