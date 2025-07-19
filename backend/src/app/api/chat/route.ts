import { anthropic } from "@ai-sdk/anthropic";
import { auth } from "@clerk/nextjs/server";
import { Agent } from "@mastra/core/agent";
import { convertToCoreMessages, type Message } from "ai";
import { type NextRequest } from "next/server";
import { CHAT_AGENT_INSTRUCTIONS, composio } from "~/lib/agent-instructions";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body: unknown = await req.json();
    const { messages, enabledToolSlugs = [] } = body as {
      messages: Message[];
      enabledToolSlugs: string[];
    };

    const tools = await composio.tools.get(
      userId,
      {
        toolkits: enabledToolSlugs,
        limit: 30,
      },
      {
        beforeExecute: ({ toolSlug, toolkitSlug, params }) => {
          console.log(
            `🔧 Tool about to execute: ${toolSlug} from ${toolkitSlug}`,
          );
          return params;
        },
      },
    );

    console.log("🔍 Tools:", Object.keys(tools));

    const coreMessages = convertToCoreMessages(messages);

    const chatAgent = new Agent({
      name: "Chat Agent",
      instructions: CHAT_AGENT_INSTRUCTIONS,
      model: anthropic("claude-sonnet-4-20250514"),
      tools,
    });

    const result = await chatAgent.stream(coreMessages);
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
