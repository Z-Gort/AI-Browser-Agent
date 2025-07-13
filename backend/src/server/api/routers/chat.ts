import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { mastra } from "~/mastra";

export const chatRouter = createTRPCRouter({
  sendMessage: publicProcedure
    .input(
      z.object({
        message: z.string().min(1, "Message cannot be empty"),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const chatAgent = mastra.getAgent("chatAgent");
        const result = await chatAgent.generate(input.message);

        return {
          response: result.text,
        };
      } catch (error) {
        console.error("Chat error:", error);
        throw new Error("Failed to process chat message");
      }
    }),
});
