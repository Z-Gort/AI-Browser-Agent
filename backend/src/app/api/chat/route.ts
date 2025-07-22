import { auth } from "@clerk/nextjs/server";
import { NewAgentNetwork } from "@mastra/core/network/vNext";
import { type Message } from "ai";
import { type NextRequest } from "next/server";
import { memory, createAgent } from "~/lib/agentConfig";
import { anthropic } from "@ai-sdk/anthropic";
import { RuntimeContext } from "@mastra/core/runtime-context";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body: unknown = await req.json();
    const {
      message,
      threadId,
      resourceId,
      enabledToolSlugs = [],
    } = body as {
      message: Message | null;
      threadId: string;
      resourceId: string;
      enabledToolSlugs: string[];
    };

    if (!message) {
      return new Response("No message", { status: 400 });
    }

    console.log("Enabled tool slugs:", enabledToolSlugs);

    // Create agents for each enabled toolkit
    const agentPromises = enabledToolSlugs.map((toolkit) =>
      createAgent(userId, toolkit as "github" | "notion"),
    );

    // Always include a general assistant
    agentPromises.push(createAgent(userId, "none"));

    const agentList = await Promise.all(agentPromises);

    // Convert to agents object for network
    const agents = agentList.reduce(
      (acc, agent, index) => {
        const key =
          index < enabledToolSlugs.length
            ? enabledToolSlugs[index]!
            : "general";
        acc[key] = agent;
        return acc;
      },
      {} as Record<string, Awaited<ReturnType<typeof createAgent>>>,
    );

    const network = new NewAgentNetwork({
      id: "integrations-network",
      name: "Integrations Network",
      instructions:
        "You coordinate multiple specialized agents to complete tasks efficiently. Analyze the user's request and delegate to the most appropriate agent(s). Use the GitHub Agent for code, repository, and project management tasks. Use the Notion Agent for documentation, note-taking, and workspace organization. Use the General Assistant for conversation and tasks that don't require specific integrations.",
      model: anthropic("claude-sonnet-4-20250514"),
      agents,
      memory: memory,
    });

    const runtimeContext = new RuntimeContext();

    const result = await network.loopStream(message.content, {
      runtimeContext,
      maxIterations: 3,
      threadId,
      resourceId,
    });

    return result.stream();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
