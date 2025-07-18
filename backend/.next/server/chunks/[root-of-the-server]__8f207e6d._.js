module.exports = {

"[project]/.next-internal/server/app/api/trpc/[trpc]/route/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/env.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "env": (()=>env)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$t3$2d$oss$2b$env$2d$nextjs$40$0$2e$12$2e$0_typescript$40$5$2e$8$2e$3_zod$40$3$2e$25$2e$76$2f$node_modules$2f40$t3$2d$oss$2f$env$2d$nextjs$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@t3-oss+env-nextjs@0.12.0_typescript@5.8.3_zod@3.25.76/node_modules/@t3-oss/env-nextjs/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
;
const env = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$t3$2d$oss$2b$env$2d$nextjs$40$0$2e$12$2e$0_typescript$40$5$2e$8$2e$3_zod$40$3$2e$25$2e$76$2f$node_modules$2f40$t3$2d$oss$2f$env$2d$nextjs$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createEnv"])({
    /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */ server: {
        NODE_ENV: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
            "development",
            "test",
            "production"
        ]),
        OPENAI_API_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
        COMPOSIO_API_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)
    },
    /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */ client: {
        // NEXT_PUBLIC_CLIENTVAR: z.string(),
        NEXT_PUBLIC_NOTION_AUTH_CONFIG_ID: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)
    },
    /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */ runtimeEnv: {
        NODE_ENV: ("TURBOPACK compile-time value", "development"),
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        COMPOSIO_API_KEY: process.env.COMPOSIO_API_KEY,
        NEXT_PUBLIC_NOTION_AUTH_CONFIG_ID: ("TURBOPACK compile-time value", "ac_zsrEgLnqePTH")
    },
    /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */ skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */ emptyStringAsUndefined: true
});
}}),
"[externals]/node:crypto [external] (node:crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/server/api/trpc.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */ __turbopack_context__.s({
    "createCallerFactory": (()=>createCallerFactory),
    "createTRPCContext": (()=>createTRPCContext),
    "createTRPCRouter": (()=>createTRPCRouter),
    "protectedProcedure": (()=>protectedProcedure),
    "publicProcedure": (()=>publicProcedure)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$superjson$40$2$2e$2$2e$2$2f$node_modules$2f$superjson$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/superjson@2.2.2/node_modules/superjson/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$ZodError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/ZodError.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$clerk$2b$nextjs$40$6$2e$25$2e$0_next$40$15$2e$3$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$_14ba89c6717cc21b4d3df1df2d53bd88$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@clerk+nextjs@6.25.0_next@15.3.5_@babel+core@7.28.0_@opentelemetry+api@1.9.0_react-dom@_14ba89c6717cc21b4d3df1df2d53bd88/node_modules/@clerk/nextjs/dist/esm/app-router/server/auth.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$4$2e$3_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$initTRPC$2d$IT_6ZYJd$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+server@11.4.3_typescript@5.8.3/node_modules/@trpc/server/dist/initTRPC-IT_6ZYJd.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$4$2e$3_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$gU3ttYjg$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+server@11.4.3_typescript@5.8.3/node_modules/@trpc/server/dist/tracked-gU3ttYjg.mjs [app-route] (ecmascript)");
;
;
;
;
const createTRPCContext = async (opts)=>{
    return {
        ...opts,
        auth: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$clerk$2b$nextjs$40$6$2e$25$2e$0_next$40$15$2e$3$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$_14ba89c6717cc21b4d3df1df2d53bd88$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["auth"])()
    };
};
/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */ const t = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$4$2e$3_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$initTRPC$2d$IT_6ZYJd$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["initTRPC"].context().create({
    transformer: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$superjson$40$2$2e$2$2e$2$2f$node_modules$2f$superjson$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
    errorFormatter ({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError: error.cause instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$ZodError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodError"] ? error.cause.flatten() : null
            }
        };
    }
});
const isAuthed = t.middleware(({ next, ctx })=>{
    if (!ctx.auth.userId) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$4$2e$3_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$gU3ttYjg$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRPCError"]({
            code: 'UNAUTHORIZED'
        });
    }
    return next({
        ctx: {
            auth: ctx.auth
        }
    });
});
const createCallerFactory = t.createCallerFactory;
const createTRPCRouter = t.router;
const publicProcedure = t.procedure;
const protectedProcedure = t.procedure.use(isAuthed);
}}),
"[project]/src/server/api/routers/integrations.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "integrationsRouter": (()=>integrationsRouter)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-route] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '~/mastra'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/env.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$4$2e$3_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$gU3ttYjg$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+server@11.4.3_typescript@5.8.3/node_modules/@trpc/server/dist/tracked-gU3ttYjg.mjs [app-route] (ecmascript)");
;
;
;
;
;
const SUPPORTED_TOOLKITS = [
    {
        slug: "NOTION",
        authConfigId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].NEXT_PUBLIC_NOTION_AUTH_CONFIG_ID
    }
];
const integrationsRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createTRPCRouter"])({
    getAll: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["protectedProcedure"].query(async ({ ctx })=>{
        try {
            const userId = ctx.auth.userId;
            const connectedAccounts = await composio.connectedAccounts.list({
                userIds: [
                    userId
                ]
            });
            const connectedToolkitMap = new Map(); // slug -> connectionId
            connectedAccounts.items.forEach((account)=>{
                connectedToolkitMap.set(account.toolkit.slug.toUpperCase(), account.id);
            });
            // Fetch all toolkits in parallel
            const toolkitPromises = SUPPORTED_TOOLKITS.map(async (toolkitConfig)=>{
                try {
                    const toolkit = await composio.toolkits.get(toolkitConfig.slug);
                    const upperSlug = toolkitConfig.slug.toUpperCase();
                    const connectionId = connectedToolkitMap.get(upperSlug);
                    return {
                        id: toolkit.slug.toLowerCase(),
                        name: toolkit.name,
                        slug: toolkit.slug,
                        description: toolkit.meta?.description,
                        logo: toolkit.meta?.logo,
                        categories: toolkit.meta?.categories,
                        isConnected: !!connectionId,
                        connectionId: connectionId ?? undefined
                    };
                } catch (error) {
                    console.error(`Failed to fetch toolkit ${toolkitConfig.slug}:`, error);
                    return null;
                }
            });
            const results = await Promise.all(toolkitPromises);
            const integrations = results.filter((t)=>t !== null);
            return {
                integrations
            };
        } catch (error) {
            console.error("Failed to fetch toolkits:", error);
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$4$2e$3_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$gU3ttYjg$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to fetch integrations."
            });
        }
    }),
    getConnectionStatus: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        connectionId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).query(async ({ input })=>{
        const { connectionId } = input;
        try {
            // Wait for connection to complete (with timeout)
            const connection = await composio.connectedAccounts.waitForConnection(connectionId);
            return {
                id: connection.id,
                status: connection.status,
                authConfig: connection.authConfig,
                data: connection.data,
                params: connection.params
            };
        } catch (error) {
            console.error("Failed to get connection status:", error);
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$4$2e$3_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$gU3ttYjg$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to get connection status"
            });
        }
    }),
    connect: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        integrationId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).mutation(async ({ input, ctx })=>{
        try {
            const userId = ctx.auth.userId;
            const { integrationId } = input;
            const toolkitConfig = SUPPORTED_TOOLKITS.find((config)=>config.slug.toLowerCase() === integrationId.toLowerCase());
            if (!toolkitConfig) {
                throw new Error(`Integration ${integrationId} not found.`);
            }
            // Initiate connection with Composio
            const connectionRequest = await composio.connectedAccounts.initiate(userId, toolkitConfig.authConfigId);
            return {
                redirectUrl: connectionRequest.redirectUrl,
                connectionId: connectionRequest.id
            };
        } catch (error) {
            console.error("Failed to initiate connection:", error);
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$4$2e$3_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$gU3ttYjg$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to initiate connection"
            });
        }
    }),
    disconnect: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        connectionId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).mutation(async ({ input })=>{
        try {
            const { connectionId } = input;
            await composio.connectedAccounts.delete(connectionId);
        } catch (error) {
            console.error("Failed to delete connection:", error);
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$4$2e$3_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$gU3ttYjg$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to delete connection"
            });
        }
    })
});
}}),
"[project]/src/server/api/root.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "appRouter": (()=>appRouter),
    "createCaller": (()=>createCaller)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$integrations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/integrations.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-route] (ecmascript)");
;
;
const appRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createTRPCRouter"])({
    integrations: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$integrations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integrationsRouter"]
});
const createCaller = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createCallerFactory"])(appRouter);
}}),
"[project]/src/app/api/trpc/[trpc]/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>handler),
    "POST": (()=>handler)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$4$2e$3_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$adapters$2f$fetch$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@trpc+server@11.4.3_typescript@5.8.3/node_modules/@trpc/server/dist/adapters/fetch/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/env.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$root$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/root.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-route] (ecmascript)");
;
;
;
;
/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */ const createContext = async (req)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createTRPCContext"])({
        headers: req.headers
    });
};
const handler = (req)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$trpc$2b$server$40$11$2e$4$2e$3_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$adapters$2f$fetch$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchRequestHandler"])({
        endpoint: "/api/trpc",
        req,
        router: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$root$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appRouter"],
        createContext: ()=>createContext(req),
        onError: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].NODE_ENV === "development" ? ({ path, error })=>{
            console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`);
        } : undefined
    });
};
;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__8f207e6d._.js.map