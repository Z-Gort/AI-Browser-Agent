import { Mastra } from "@mastra/core";
import { chatAgent } from "./agents/chat-agent";
import { Composio } from "@composio/core";
import { MastraProvider } from "@composio/mastra";

export const mastra = new Mastra({
  agents: { chatAgent: chatAgent },
});

export const composio = new Composio({
  provider: new MastraProvider(),
});