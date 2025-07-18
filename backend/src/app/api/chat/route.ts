import { auth } from "@clerk/nextjs/server";
import { convertToCoreMessages, type Message } from "ai";
import { Composio } from "@composio/core";
import { MastraProvider } from "@composio/mastra";
import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { CHAT_AGENT_INSTRUCTIONS } from "~/lib/agent-instructions";

export const composio = new Composio({
  provider: new MastraProvider(),
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      console.log("Unauthorized");
      return new Response("Unauthorized", { status: 401 });
    }

    const body: unknown = await req.json();
    const { messages, enabledToolSlugs = [] } = body as {
      messages: Message[];
      enabledToolSlugs: string[];
    };

    // Gets 20 tools from Notion by default
    const tools = await composio.tools.get(userId, { toolkits: enabledToolSlugs })

    const coreMessages = convertToCoreMessages(messages);

    const chatAgent = new Agent({
      name: "Chat Agent",
      instructions: CHAT_AGENT_INSTRUCTIONS,
      model: openai("gpt-4o-mini"),
      tools,
    });

    const result = await chatAgent.stream(coreMessages);
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
