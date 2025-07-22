import { Memory } from "@mastra/memory";
import { PostgresStore } from "@mastra/pg";
import { TokenLimiter, ToolCallFilter } from "@mastra/memory/processors";
import { env } from "~/env";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { Agent } from "@mastra/core/agent";
import {
  CHAT_AGENT_INSTRUCTIONS_NO_TOOLS,
  CHAT_AGENT_INSTRUCTIONS_NOTION,
  CHAT_AGENT_INSTRUCTIONS_GITHUB,
  composio,
} from "./agentInstructions";

export const memory = new Memory({
  storage: new PostgresStore({
    connectionString: env.NEON_URL,
  }),
  options: {
    lastMessages: 15,
    semanticRecall: false,
    threads: {
      generateTitle: {
        model: openai("gpt-4.1-nano"), // Use cheaper model for titles
        instructions:
          "Generate a concise title for this conversation based on the first user message.",
      },
    },
  },
  processors: [
    new ToolCallFilter(),
    new TokenLimiter({
      limit: 100_000, // limiting at 100k OpenAI tokens (~10-20% inaccurate for Claude)
    }),
  ],
});

export async function getGitHubTools(userId: string) {
  return await composio.tools.get(
    userId,
    {
      tools: [
        "GITHUB_USERS_GET_AUTHENTICATED",
        // "GITHUB_LIST_REPOSITORIES_FOR_THE_AUTHENTICATED_USER", //broken right now
        "GITHUB_LIST_ORGANIZATION_REPOSITORIES",
        "GITHUB_GET_A_REPOSITORY",
        "GITHUB_LIST_BRANCHES",
        "GITHUB_LIST_REPOSITORY_ISSUES",
        "GITHUB_GET_AN_ISSUE",
        "GITHUB_CREATE_AN_ISSUE",
        "GITHUB_UPDATE_AN_ISSUE",
        "GITHUB_ADD_ASSIGNEES_TO_AN_ISSUE",
        "GITHUB_ADD_LABELS_TO_AN_ISSUE",
        "GITHUB_LIST_PULL_REQUESTS",
        "GITHUB_GET_A_PULL_REQUEST",
        "GITHUB_CREATE_A_PULL_REQUEST",
        "GITHUB_MERGE_A_PULL_REQUEST",
        "GITHUB_LIST_REPOSITORY_PROJECTS",
        "GITHUB_LIST_PROJECT_COLUMNS",
        "GITHUB_MOVE_A_PROJECT_CARD",
        "GITHUB_SEARCH_ISSUES_AND_PULL_REQUESTS",
        "GITHUB_LIST_ISSUE_COMMENTS",
        "GITHUB_CREATE_AN_ISSUE_COMMENT",
        "GITHUB_REQUEST_REVIEWERS_FOR_A_PULL_REQUEST",
        "GITHUB_CREATE_A_PROJECT_CARD",
        "GITHUB_CREATE_A_REVIEW_COMMENT",
      ],
    },
    {
      beforeExecute: ({ toolSlug, toolkitSlug, params }) => {
        console.log("Tool about to execute:", toolSlug, toolkitSlug, params);
        return params;
      },
    },
  );
}

export async function getNotionTools(userId: string) {
  return await composio.tools.get(
    userId,
    {
      toolkits: ["NOTION"],
    },
    {
      beforeExecute: ({ toolSlug, toolkitSlug, params }) => {
        console.log("Tool about to execute:", toolSlug, toolkitSlug, params);
        return params;
      },
    },
  );
}

export async function createAgent(
  userId: string,
  integration: "notion" | "github" | "none",
) {
  let tools;
  let instructions;
  let name;
  let description;

  switch (integration) {
    case "github":
      tools = await getGitHubTools(userId);
      instructions = CHAT_AGENT_INSTRUCTIONS_GITHUB;
      name = "GitHub Agent";
      description =
        "Use this agent for all GitHub-related tasks: managing repositories, creating/updating issues and pull requests, working with project boards, searching code, and any Git/version control operations.";
      break;
    case "notion":
      tools = await getNotionTools(userId);
      instructions = CHAT_AGENT_INSTRUCTIONS_NOTION;
      name = "Notion Agent";
      description =
        "Use this agent for all Notion-related tasks: creating/editing pages, managing databases, organizing content, and working with Notion workspaces.";
      break;
    case "none":
    default:
      tools = {};
      instructions = CHAT_AGENT_INSTRUCTIONS_NO_TOOLS;
      name = "General Assistant";
      description =
        "Use this agent for general conversation, questions, and tasks that don't require specific integrations or tools.";
      break;
  }

  return new Agent({
    name,
    description,
    instructions,
    model: anthropic("claude-sonnet-4-20250514"),
    tools,
    memory,
  });
}
