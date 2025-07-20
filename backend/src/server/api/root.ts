import { integrationsRouter } from "~/server/api/routers/integrations";
import { usersRouter } from "~/server/api/routers/users";
import { historyRouter } from "~/server/api/routers/history";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  integrations: integrationsRouter,
  users: usersRouter,
  history: historyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
