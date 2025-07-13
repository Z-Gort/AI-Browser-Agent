import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";

export const chatAgent = new Agent({
  name: "Chat Agent",
  instructions: `
    You are a helpful AI assistant. You can have conversations with users and answer questions.
    
    Be friendly, helpful, and concise in your responses. If you don't know something, 
    say so honestly. You can help with a wide variety of topics including:
    - General questions and information
    - Coding and programming help
    - Creative writing and brainstorming
    - Problem-solving and analysis
    
    Always aim to be accurate and helpful.
  `,
  model: openai("gpt-4o-mini"),
});
