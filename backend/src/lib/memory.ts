import { Memory } from "@mastra/memory";
import { PostgresStore } from "@mastra/pg";
import { TokenLimiter, ToolCallFilter } from "@mastra/memory/processors";
import { env } from "~/env";

export const memory =  new Memory({
    storage: new PostgresStore({
      connectionString: env.NEON_URL,
    }),
    options: {
      lastMessages: 15,
      semanticRecall: false,
    },
    processors: [
      new ToolCallFilter(),
      new TokenLimiter({
        limit: 100_000, // limiting at 100k OpenAI tokens (~10-20% inaccurate for Claude)
      }),
    ],
  });
