import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { db, users } from "~/server/db";

export const usersRouter = createTRPCRouter({
  createUser: protectedProcedure
    .input(
      z.object({
        clerkId: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const { clerkId, name } = input;

        await db.insert(users).values({
          clerkId,
          name,
        });
      } catch (error) {
        console.error("Failed to create user:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create user",
        });
      }
    }),
});
