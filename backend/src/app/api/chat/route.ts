import { convertToCoreMessages, type Message } from "ai";
import { mastra } from "~/mastra";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      console.log("Unauthorized");
      return new Response("Unauthorized", { status: 401 });
    }

    const body: unknown = await req.json();
    const { messages } = body as { messages: Message[] };

    // Convert AI SDK messages to format Mastra can understand
    const coreMessages = convertToCoreMessages(messages);

    // Use Mastra agent with streaming
    const chatAgent = mastra.getAgent("chatAgent");
    const result = await chatAgent.stream(coreMessages);

    // Return Mastra's streaming response
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
