import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { composio } from "~/lib/agentInstructions";
import { env } from "~/env";
import { TRPCError } from "@trpc/server";

type ToolkitResponse = {
  name: string;
  slug: string;
  meta?: {
    description?: string;
    logo?: string;
    categories?: Array<{
      name: string;
      slug: string;
    }>;
  };
};

type ConnectedAccount = {
  id: string;
  toolkit: {
    slug: string;
  };
  status?: string;
};

// Type for the connection status response
type ConnectionStatus = {
  id: string;
  status: "INITIALIZING" | "INITIATED" | "ACTIVE" | "FAILED" | "EXPIRED";
  authConfig: {
    id: string;
    isComposioManaged: boolean;
    isDisabled: boolean;
  };
  data: Record<string, unknown>;
  params?: Record<string, unknown>;
};

const SUPPORTED_TOOLKITS = [
  {
    slug: "NOTION",
    authConfigId: env.NEXT_PUBLIC_NOTION_AUTH_CONFIG_ID,
  },
  {
    slug: "GITHUB",
    authConfigId: env.NEXT_PUBLIC_GITHUB_AUTH_CONFIG_ID,
  },
];

export const integrationsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const userId = ctx.auth.userId;

      const connectedAccounts = await composio.connectedAccounts.list({
        userIds: [userId],
      });

      const connectedToolkitMap = new Map<string, string>(); // slug -> connectionId

      connectedAccounts.items.forEach((account: ConnectedAccount) => {
        // Only consider connections that are active, not just initiated
        if (account.status === "ACTIVE") {
          connectedToolkitMap.set(
            account.toolkit.slug.toUpperCase(),
            account.id,
          );
        }
      });

      // Fetch all toolkits in parallel
      const toolkitPromises = SUPPORTED_TOOLKITS.map(async (toolkitConfig) => {
        try {
          const toolkit = (await composio.toolkits.get(
            toolkitConfig.slug,
          )) as ToolkitResponse;
          const upperSlug = toolkitConfig.slug.toUpperCase();
          const connectionId = connectedToolkitMap.get(upperSlug);

          const isConnected = !!connectionId;

          return {
            id: toolkit.slug.toLowerCase(),
            name: toolkit.name,
            slug: toolkit.slug,
            description: toolkit.meta?.description,
            logo: toolkit.meta?.logo,
            categories: toolkit.meta?.categories,
            isConnected,
            connectionId: connectionId ?? undefined,
          };
        } catch (error) {
          console.error(
            `Failed to fetch toolkit ${toolkitConfig.slug}:`,
            error,
          );
          return null;
        }
      });

      const results = await Promise.all(toolkitPromises);
      const integrations = results.filter((t) => t !== null);

      return { integrations };
    } catch (error) {
      console.error("Failed to fetch toolkits:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch integrations.",
      });
    }
  }),

  getConnectionStatus: protectedProcedure
    .input(z.object({ connectionId: z.string() }))
    .query(async ({ input }) => {
      const { connectionId } = input;

      try {
        // Wait for connection to complete (with timeout)
        const connection = (await composio.connectedAccounts.waitForConnection(
          connectionId,
        )) as ConnectionStatus;

        return {
          id: connection.id,
          status: connection.status,
          authConfig: connection.authConfig,
          data: connection.data,
          params: connection.params,
        };
      } catch (error) {
        console.error("Failed to get connection status:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get connection status",
        });
      }
    }),

  connect: protectedProcedure
    .input(z.object({ integrationId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const userId = ctx.auth.userId;
        const { integrationId } = input;

        const toolkitConfig = SUPPORTED_TOOLKITS.find(
          (config) => config.slug.toLowerCase() === integrationId.toLowerCase(),
        );

        if (!toolkitConfig) {
          throw new Error(`Integration ${integrationId} not found.`);
        }

        // Check for any existing connections for this user and toolkit
        const existingConnections = await composio.connectedAccounts.list({
          userIds: [userId],
        });

        const existingConnection = existingConnections.items.find(
          (account: ConnectedAccount) =>
            account.toolkit.slug.toUpperCase() ===
            toolkitConfig.slug.toUpperCase(),
        );

        // If there's an existing connection (regardless of status), delete it first
        if (existingConnection) {
          await composio.connectedAccounts.delete(existingConnection.id);
        }

        // Initiate connection with Composio
        const connectionRequest = await composio.connectedAccounts.initiate(
          userId,
          toolkitConfig.authConfigId,
        );

        return {
          redirectUrl: connectionRequest.redirectUrl,
          connectionId: connectionRequest.id,
        };
      } catch (error) {
        console.error("Failed to initiate connection:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to initiate connection",
        });
      }
    }),

  disconnect: protectedProcedure
    .input(z.object({ connectionId: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const { connectionId } = input;
        await composio.connectedAccounts.delete(connectionId);
      } catch (error) {
        console.error("Failed to delete connection:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete connection",
        });
      }
    }),
});
