module.exports = {

"[project]/.next-internal/server/app/api/chat/route/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {
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
"[externals]/@mastra/core [external] (@mastra/core, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("@mastra/core");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/@mastra/core/agent [external] (@mastra/core/agent, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("@mastra/core/agent");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/mastra/agents/chat-agent.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "chatAgent": (()=>chatAgent)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$openai$40$1$2e$3$2e$23_zod$40$3$2e$25$2e$76$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@ai-sdk+openai@1.3.23_zod@3.25.76/node_modules/@ai-sdk/openai/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$mastra$2f$core$2f$agent__$5b$external$5d$__$2840$mastra$2f$core$2f$agent$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@mastra/core/agent [external] (@mastra/core/agent, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$mastra$2f$core$2f$agent__$5b$external$5d$__$2840$mastra$2f$core$2f$agent$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f40$mastra$2f$core$2f$agent__$5b$external$5d$__$2840$mastra$2f$core$2f$agent$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
const chatAgent = new __TURBOPACK__imported__module__$5b$externals$5d2f40$mastra$2f$core$2f$agent__$5b$external$5d$__$2840$mastra$2f$core$2f$agent$2c$__esm_import$29$__["Agent"]({
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
    model: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$openai$40$1$2e$3$2e$23_zod$40$3$2e$25$2e$76$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["openai"])("gpt-4o-mini")
});
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/mastra/index.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "mastra": (()=>mastra)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f40$mastra$2f$core__$5b$external$5d$__$2840$mastra$2f$core$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@mastra/core [external] (@mastra/core, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mastra$2f$agents$2f$chat$2d$agent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/mastra/agents/chat-agent.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$mastra$2f$core__$5b$external$5d$__$2840$mastra$2f$core$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mastra$2f$agents$2f$chat$2d$agent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f40$mastra$2f$core__$5b$external$5d$__$2840$mastra$2f$core$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mastra$2f$agents$2f$chat$2d$agent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
const mastra = new __TURBOPACK__imported__module__$5b$externals$5d2f40$mastra$2f$core__$5b$external$5d$__$2840$mastra$2f$core$2c$__esm_import$29$__["Mastra"]({
    agents: {
        chatAgent: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mastra$2f$agents$2f$chat$2d$agent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["chatAgent"]
    }
});
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/app/api/chat/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "POST": (()=>POST),
    "maxDuration": (()=>maxDuration)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ai$40$4$2e$3$2e$17_react$40$19$2e$1$2e$0_zod$40$3$2e$25$2e$76$2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ai@4.3.17_react@19.1.0_zod@3.25.76/node_modules/ai/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mastra$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/mastra/index.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mastra$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mastra$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
const maxDuration = 30;
async function POST(req) {
    try {
        const body = await req.json();
        const { messages } = body;
        // Convert AI SDK messages to format Mastra can understand
        const coreMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ai$40$4$2e$3$2e$17_react$40$19$2e$1$2e$0_zod$40$3$2e$25$2e$76$2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["convertToCoreMessages"])(messages);
        // Use Mastra agent with streaming
        const chatAgent = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mastra$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mastra"].getAgent("chatAgent");
        const result = await chatAgent.stream(coreMessages);
        // Return Mastra's streaming response
        return result.toDataStreamResponse();
    } catch (error) {
        console.error("Chat API error:", error);
        return new Response("Internal server error", {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__2fa1105e._.js.map