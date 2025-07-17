module.exports = {

"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/tslib.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "__classPrivateFieldGet": (()=>__classPrivateFieldGet),
    "__classPrivateFieldSet": (()=>__classPrivateFieldSet)
});
function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
;
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/uuid.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
/**
 * https://stackoverflow.com/a/2117523
 */ __turbopack_context__.s({
    "uuid4": (()=>uuid4)
});
let uuid4 = function() {
    const { crypto } = globalThis;
    if (crypto?.randomUUID) {
        uuid4 = crypto.randomUUID.bind(crypto);
        return crypto.randomUUID();
    }
    const u8 = new Uint8Array(1);
    const randomByte = crypto ? ()=>crypto.getRandomValues(u8)[0] : ()=>Math.random() * 0xff & 0xff;
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c)=>(+c ^ randomByte() & 15 >> +c / 4).toString(16));
}; //# sourceMappingURL=uuid.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/errors.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "castToError": (()=>castToError),
    "isAbortError": (()=>isAbortError)
});
function isAbortError(err) {
    return typeof err === 'object' && err !== null && // Spec-compliant fetch implementations
    ('name' in err && err.name === 'AbortError' || 'message' in err && String(err.message).includes('FetchRequestCanceledException'));
}
const castToError = (err)=>{
    if (err instanceof Error) return err;
    if (typeof err === 'object' && err !== null) {
        try {
            if (Object.prototype.toString.call(err) === '[object Error]') {
                // @ts-ignore - not all envs have native support for cause yet
                const error = new Error(err.message, err.cause ? {
                    cause: err.cause
                } : {});
                if (err.stack) error.stack = err.stack;
                // @ts-ignore - not all envs have native support for cause yet
                if (err.cause && !error.cause) error.cause = err.cause;
                if (err.name) error.name = err.name;
                return error;
            }
        } catch  {}
        try {
            return new Error(JSON.stringify(err));
        } catch  {}
    }
    return new Error(err);
}; //# sourceMappingURL=errors.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/error.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "APIConnectionError": (()=>APIConnectionError),
    "APIConnectionTimeoutError": (()=>APIConnectionTimeoutError),
    "APIError": (()=>APIError),
    "APIUserAbortError": (()=>APIUserAbortError),
    "AuthenticationError": (()=>AuthenticationError),
    "BadRequestError": (()=>BadRequestError),
    "ComposioError": (()=>ComposioError),
    "ConflictError": (()=>ConflictError),
    "InternalServerError": (()=>InternalServerError),
    "NotFoundError": (()=>NotFoundError),
    "PermissionDeniedError": (()=>PermissionDeniedError),
    "RateLimitError": (()=>RateLimitError),
    "UnprocessableEntityError": (()=>UnprocessableEntityError)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/errors.mjs [app-route] (ecmascript)");
;
class ComposioError extends Error {
}
class APIError extends ComposioError {
    constructor(status, error, message, headers){
        super(`${APIError.makeMessage(status, error, message)}`);
        this.status = status;
        this.headers = headers;
        this.error = error;
    }
    static makeMessage(status, error, message) {
        const msg = error?.message ? typeof error.message === 'string' ? error.message : JSON.stringify(error.message) : error ? JSON.stringify(error) : message;
        if (status && msg) {
            return `${status} ${msg}`;
        }
        if (status) {
            return `${status} status code (no body)`;
        }
        if (msg) {
            return msg;
        }
        return '(no status code or body)';
    }
    static generate(status, errorResponse, message, headers) {
        if (!status || !headers) {
            return new APIConnectionError({
                message,
                cause: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["castToError"])(errorResponse)
            });
        }
        const error = errorResponse;
        if (status === 400) {
            return new BadRequestError(status, error, message, headers);
        }
        if (status === 401) {
            return new AuthenticationError(status, error, message, headers);
        }
        if (status === 403) {
            return new PermissionDeniedError(status, error, message, headers);
        }
        if (status === 404) {
            return new NotFoundError(status, error, message, headers);
        }
        if (status === 409) {
            return new ConflictError(status, error, message, headers);
        }
        if (status === 422) {
            return new UnprocessableEntityError(status, error, message, headers);
        }
        if (status === 429) {
            return new RateLimitError(status, error, message, headers);
        }
        if (status >= 500) {
            return new InternalServerError(status, error, message, headers);
        }
        return new APIError(status, error, message, headers);
    }
}
class APIUserAbortError extends APIError {
    constructor({ message } = {}){
        super(undefined, undefined, message || 'Request was aborted.', undefined);
    }
}
class APIConnectionError extends APIError {
    constructor({ message, cause }){
        super(undefined, undefined, message || 'Connection error.', undefined);
        // in some environments the 'cause' property is already declared
        // @ts-ignore
        if (cause) this.cause = cause;
    }
}
class APIConnectionTimeoutError extends APIConnectionError {
    constructor({ message } = {}){
        super({
            message: message ?? 'Request timed out.'
        });
    }
}
class BadRequestError extends APIError {
}
class AuthenticationError extends APIError {
}
class PermissionDeniedError extends APIError {
}
class NotFoundError extends APIError {
}
class ConflictError extends APIError {
}
class UnprocessableEntityError extends APIError {
}
class RateLimitError extends APIError {
}
class InternalServerError extends APIError {
} //# sourceMappingURL=error.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/values.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "coerceBoolean": (()=>coerceBoolean),
    "coerceFloat": (()=>coerceFloat),
    "coerceInteger": (()=>coerceInteger),
    "ensurePresent": (()=>ensurePresent),
    "hasOwn": (()=>hasOwn),
    "isAbsoluteURL": (()=>isAbsoluteURL),
    "isArray": (()=>isArray),
    "isEmptyObj": (()=>isEmptyObj),
    "isObj": (()=>isObj),
    "isReadonlyArray": (()=>isReadonlyArray),
    "maybeCoerceBoolean": (()=>maybeCoerceBoolean),
    "maybeCoerceFloat": (()=>maybeCoerceFloat),
    "maybeCoerceInteger": (()=>maybeCoerceInteger),
    "maybeObj": (()=>maybeObj),
    "safeJSON": (()=>safeJSON),
    "validatePositiveInteger": (()=>validatePositiveInteger)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/error.mjs [app-route] (ecmascript)");
;
// https://url.spec.whatwg.org/#url-scheme-string
const startsWithSchemeRegexp = /^[a-z][a-z0-9+.-]*:/i;
const isAbsoluteURL = (url)=>{
    return startsWithSchemeRegexp.test(url);
};
let isArray = (val)=>(isArray = Array.isArray, isArray(val));
let isReadonlyArray = isArray;
function maybeObj(x) {
    if (typeof x !== 'object') {
        return {};
    }
    return x ?? {};
}
function isEmptyObj(obj) {
    if (!obj) return true;
    for(const _k in obj)return false;
    return true;
}
function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
function isObj(obj) {
    return obj != null && typeof obj === 'object' && !Array.isArray(obj);
}
const ensurePresent = (value)=>{
    if (value == null) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ComposioError"](`Expected a value to be given but received ${value} instead.`);
    }
    return value;
};
const validatePositiveInteger = (name, n)=>{
    if (typeof n !== 'number' || !Number.isInteger(n)) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ComposioError"](`${name} must be an integer`);
    }
    if (n < 0) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ComposioError"](`${name} must be a positive integer`);
    }
    return n;
};
const coerceInteger = (value)=>{
    if (typeof value === 'number') return Math.round(value);
    if (typeof value === 'string') return parseInt(value, 10);
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ComposioError"](`Could not coerce ${value} (type: ${typeof value}) into a number`);
};
const coerceFloat = (value)=>{
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseFloat(value);
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ComposioError"](`Could not coerce ${value} (type: ${typeof value}) into a number`);
};
const coerceBoolean = (value)=>{
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value === 'true';
    return Boolean(value);
};
const maybeCoerceInteger = (value)=>{
    if (value === undefined) {
        return undefined;
    }
    return coerceInteger(value);
};
const maybeCoerceFloat = (value)=>{
    if (value === undefined) {
        return undefined;
    }
    return coerceFloat(value);
};
const maybeCoerceBoolean = (value)=>{
    if (value === undefined) {
        return undefined;
    }
    return coerceBoolean(value);
};
const safeJSON = (text)=>{
    try {
        return JSON.parse(text);
    } catch (err) {
        return undefined;
    }
}; //# sourceMappingURL=values.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/sleep.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "sleep": (()=>sleep)
});
const sleep = (ms)=>new Promise((resolve)=>setTimeout(resolve, ms)); //# sourceMappingURL=sleep.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/version.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "VERSION": (()=>VERSION)
});
const VERSION = '0.1.0-alpha.27'; // x-release-please-version
 //# sourceMappingURL=version.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/detect-platform.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "getPlatformHeaders": (()=>getPlatformHeaders),
    "isRunningInBrowser": (()=>isRunningInBrowser)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$version$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/version.mjs [app-route] (ecmascript)");
;
const isRunningInBrowser = ()=>{
    return(// @ts-ignore
    "undefined" !== 'undefined' && // @ts-ignore
    typeof window.document !== 'undefined' && // @ts-ignore
    typeof navigator !== 'undefined');
};
/**
 * Note this does not detect 'browser'; for that, use getBrowserInfo().
 */ function getDetectedPlatform() {
    if (typeof Deno !== 'undefined' && Deno.build != null) {
        return 'deno';
    }
    if (typeof EdgeRuntime !== 'undefined') {
        return 'edge';
    }
    if (Object.prototype.toString.call(typeof globalThis.process !== 'undefined' ? globalThis.process : 0) === '[object process]') {
        return 'node';
    }
    return 'unknown';
}
const getPlatformProperties = ()=>{
    const detectedPlatform = getDetectedPlatform();
    if (detectedPlatform === 'deno') {
        return {
            'X-Stainless-Lang': 'js',
            'X-Stainless-Package-Version': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$version$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["VERSION"],
            'X-Stainless-OS': normalizePlatform(Deno.build.os),
            'X-Stainless-Arch': normalizeArch(Deno.build.arch),
            'X-Stainless-Runtime': 'deno',
            'X-Stainless-Runtime-Version': typeof Deno.version === 'string' ? Deno.version : Deno.version?.deno ?? 'unknown'
        };
    }
    if (typeof EdgeRuntime !== 'undefined') {
        return {
            'X-Stainless-Lang': 'js',
            'X-Stainless-Package-Version': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$version$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["VERSION"],
            'X-Stainless-OS': 'Unknown',
            'X-Stainless-Arch': `other:${EdgeRuntime}`,
            'X-Stainless-Runtime': 'edge',
            'X-Stainless-Runtime-Version': globalThis.process.version
        };
    }
    // Check if Node.js
    if (detectedPlatform === 'node') {
        return {
            'X-Stainless-Lang': 'js',
            'X-Stainless-Package-Version': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$version$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["VERSION"],
            'X-Stainless-OS': normalizePlatform(globalThis.process.platform ?? 'unknown'),
            'X-Stainless-Arch': normalizeArch(globalThis.process.arch ?? 'unknown'),
            'X-Stainless-Runtime': 'node',
            'X-Stainless-Runtime-Version': globalThis.process.version ?? 'unknown'
        };
    }
    const browserInfo = getBrowserInfo();
    if (browserInfo) {
        return {
            'X-Stainless-Lang': 'js',
            'X-Stainless-Package-Version': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$version$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["VERSION"],
            'X-Stainless-OS': 'Unknown',
            'X-Stainless-Arch': 'unknown',
            'X-Stainless-Runtime': `browser:${browserInfo.browser}`,
            'X-Stainless-Runtime-Version': browserInfo.version
        };
    }
    // TODO add support for Cloudflare workers, etc.
    return {
        'X-Stainless-Lang': 'js',
        'X-Stainless-Package-Version': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$version$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["VERSION"],
        'X-Stainless-OS': 'Unknown',
        'X-Stainless-Arch': 'unknown',
        'X-Stainless-Runtime': 'unknown',
        'X-Stainless-Runtime-Version': 'unknown'
    };
};
// Note: modified from https://github.com/JS-DevTools/host-environment/blob/b1ab79ecde37db5d6e163c050e54fe7d287d7c92/src/isomorphic.browser.ts
function getBrowserInfo() {
    if (typeof navigator === 'undefined' || !navigator) {
        return null;
    }
    // NOTE: The order matters here!
    const browserPatterns = [
        {
            key: 'edge',
            pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
        },
        {
            key: 'ie',
            pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
        },
        {
            key: 'ie',
            pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/
        },
        {
            key: 'chrome',
            pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
        },
        {
            key: 'firefox',
            pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
        },
        {
            key: 'safari',
            pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/
        }
    ];
    // Find the FIRST matching browser
    for (const { key, pattern } of browserPatterns){
        const match = pattern.exec(navigator.userAgent);
        if (match) {
            const major = match[1] || 0;
            const minor = match[2] || 0;
            const patch = match[3] || 0;
            return {
                browser: key,
                version: `${major}.${minor}.${patch}`
            };
        }
    }
    return null;
}
const normalizeArch = (arch)=>{
    // Node docs:
    // - https://nodejs.org/api/process.html#processarch
    // Deno docs:
    // - https://doc.deno.land/deno/stable/~/Deno.build
    if (arch === 'x32') return 'x32';
    if (arch === 'x86_64' || arch === 'x64') return 'x64';
    if (arch === 'arm') return 'arm';
    if (arch === 'aarch64' || arch === 'arm64') return 'arm64';
    if (arch) return `other:${arch}`;
    return 'unknown';
};
const normalizePlatform = (platform)=>{
    // Node platforms:
    // - https://nodejs.org/api/process.html#processplatform
    // Deno platforms:
    // - https://doc.deno.land/deno/stable/~/Deno.build
    // - https://github.com/denoland/deno/issues/14799
    platform = platform.toLowerCase();
    // NOTE: this iOS check is untested and may not work
    // Node does not work natively on IOS, there is a fork at
    // https://github.com/nodejs-mobile/nodejs-mobile
    // however it is unknown at the time of writing how to detect if it is running
    if (platform.includes('ios')) return 'iOS';
    if (platform === 'android') return 'Android';
    if (platform === 'darwin') return 'MacOS';
    if (platform === 'win32') return 'Windows';
    if (platform === 'freebsd') return 'FreeBSD';
    if (platform === 'openbsd') return 'OpenBSD';
    if (platform === 'linux') return 'Linux';
    if (platform) return `Other:${platform}`;
    return 'Unknown';
};
let _platformHeaders;
const getPlatformHeaders = ()=>{
    return _platformHeaders ?? (_platformHeaders = getPlatformProperties());
}; //# sourceMappingURL=detect-platform.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/shims.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "CancelReadableStream": (()=>CancelReadableStream),
    "ReadableStreamFrom": (()=>ReadableStreamFrom),
    "ReadableStreamToAsyncIterable": (()=>ReadableStreamToAsyncIterable),
    "getDefaultFetch": (()=>getDefaultFetch),
    "makeReadableStream": (()=>makeReadableStream)
});
function getDefaultFetch() {
    if (typeof fetch !== 'undefined') {
        return fetch;
    }
    throw new Error('`fetch` is not defined as a global; Either pass `fetch` to the client, `new Composio({ fetch })` or polyfill the global, `globalThis.fetch = fetch`');
}
function makeReadableStream(...args) {
    const ReadableStream = globalThis.ReadableStream;
    if (typeof ReadableStream === 'undefined') {
        // Note: All of the platforms / runtimes we officially support already define
        // `ReadableStream` as a global, so this should only ever be hit on unsupported runtimes.
        throw new Error('`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`');
    }
    return new ReadableStream(...args);
}
function ReadableStreamFrom(iterable) {
    let iter = Symbol.asyncIterator in iterable ? iterable[Symbol.asyncIterator]() : iterable[Symbol.iterator]();
    return makeReadableStream({
        start () {},
        async pull (controller) {
            const { done, value } = await iter.next();
            if (done) {
                controller.close();
            } else {
                controller.enqueue(value);
            }
        },
        async cancel () {
            await iter.return?.();
        }
    });
}
function ReadableStreamToAsyncIterable(stream) {
    if (stream[Symbol.asyncIterator]) return stream;
    const reader = stream.getReader();
    return {
        async next () {
            try {
                const result = await reader.read();
                if (result?.done) reader.releaseLock(); // release lock when stream becomes closed
                return result;
            } catch (e) {
                reader.releaseLock(); // release lock when stream becomes errored
                throw e;
            }
        },
        async return () {
            const cancelPromise = reader.cancel();
            reader.releaseLock();
            await cancelPromise;
            return {
                done: true,
                value: undefined
            };
        },
        [Symbol.asyncIterator] () {
            return this;
        }
    };
}
async function CancelReadableStream(stream) {
    if (stream === null || typeof stream !== 'object') return;
    if (stream[Symbol.asyncIterator]) {
        await stream[Symbol.asyncIterator]().return?.();
        return;
    }
    const reader = stream.getReader();
    const cancelPromise = reader.cancel();
    reader.releaseLock();
    await cancelPromise;
} //# sourceMappingURL=shims.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/request-options.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "FallbackEncoder": (()=>FallbackEncoder)
});
const FallbackEncoder = ({ headers, body })=>{
    return {
        bodyHeaders: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    };
}; //# sourceMappingURL=request-options.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/qs/formats.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "RFC1738": (()=>RFC1738),
    "RFC3986": (()=>RFC3986),
    "default_format": (()=>default_format),
    "default_formatter": (()=>default_formatter),
    "formatters": (()=>formatters)
});
const default_format = 'RFC3986';
const default_formatter = (v)=>String(v);
const formatters = {
    RFC1738: (v)=>String(v).replace(/%20/g, '+'),
    RFC3986: default_formatter
};
const RFC1738 = 'RFC1738';
const RFC3986 = 'RFC3986'; //# sourceMappingURL=formats.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/qs/utils.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "assign_single_source": (()=>assign_single_source),
    "combine": (()=>combine),
    "compact": (()=>compact),
    "decode": (()=>decode),
    "encode": (()=>encode),
    "has": (()=>has),
    "is_buffer": (()=>is_buffer),
    "is_regexp": (()=>is_regexp),
    "maybe_map": (()=>maybe_map),
    "merge": (()=>merge)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$formats$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/qs/formats.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/values.mjs [app-route] (ecmascript)");
;
;
let has = (obj, key)=>(has = Object.hasOwn ?? Function.prototype.call.bind(Object.prototype.hasOwnProperty), has(obj, key));
const hex_table = /* @__PURE__ */ (()=>{
    const array = [];
    for(let i = 0; i < 256; ++i){
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }
    return array;
})();
function compact_queue(queue) {
    while(queue.length > 1){
        const item = queue.pop();
        if (!item) continue;
        const obj = item.obj[item.prop];
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isArray"])(obj)) {
            const compacted = [];
            for(let j = 0; j < obj.length; ++j){
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }
            // @ts-ignore
            item.obj[item.prop] = compacted;
        }
    }
}
function array_to_object(source, options) {
    const obj = options && options.plainObjects ? Object.create(null) : {};
    for(let i = 0; i < source.length; ++i){
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }
    return obj;
}
function merge(target, source, options = {}) {
    if (!source) {
        return target;
    }
    if (typeof source !== 'object') {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isArray"])(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if (options && (options.plainObjects || options.allowPrototypes) || !has(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [
                target,
                source
            ];
        }
        return target;
    }
    if (!target || typeof target !== 'object') {
        return [
            target
        ].concat(source);
    }
    let mergeTarget = target;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isArray"])(target) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isArray"])(source)) {
        // @ts-ignore
        mergeTarget = array_to_object(target, options);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isArray"])(target) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isArray"])(source)) {
        source.forEach(function(item, i) {
            if (has(target, i)) {
                const targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }
    return Object.keys(source).reduce(function(acc, key) {
        const value = source[key];
        if (has(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
}
function assign_single_source(target, source) {
    return Object.keys(source).reduce(function(acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
}
function decode(str, _, charset) {
    const strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
}
const limit = 1024;
const encode = (str, _defaultEncoder, charset, _kind, format)=>{
    // This code was originally written by Brian White for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }
    let string = str;
    if (typeof str === 'symbol') {
        string = Symbol.prototype.toString.call(str);
    } else if (typeof str !== 'string') {
        string = String(str);
    }
    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }
    let out = '';
    for(let j = 0; j < string.length; j += limit){
        const segment = string.length >= limit ? string.slice(j, j + limit) : string;
        const arr = [];
        for(let i = 0; i < segment.length; ++i){
            let c = segment.charCodeAt(i);
            if (c === 0x2d || // -
            c === 0x2e || // .
            c === 0x5f || // _
            c === 0x7e || c >= 0x30 && c <= 0x39 || c >= 0x41 && c <= 0x5a || c >= 0x61 && c <= 0x7a || format === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$formats$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RFC1738"] && (c === 0x28 || c === 0x29) // ( )
            ) {
                arr[arr.length] = segment.charAt(i);
                continue;
            }
            if (c < 0x80) {
                arr[arr.length] = hex_table[c];
                continue;
            }
            if (c < 0x800) {
                arr[arr.length] = hex_table[0xc0 | c >> 6] + hex_table[0x80 | c & 0x3f];
                continue;
            }
            if (c < 0xd800 || c >= 0xe000) {
                arr[arr.length] = hex_table[0xe0 | c >> 12] + hex_table[0x80 | c >> 6 & 0x3f] + hex_table[0x80 | c & 0x3f];
                continue;
            }
            i += 1;
            c = 0x10000 + ((c & 0x3ff) << 10 | segment.charCodeAt(i) & 0x3ff);
            arr[arr.length] = hex_table[0xf0 | c >> 18] + hex_table[0x80 | c >> 12 & 0x3f] + hex_table[0x80 | c >> 6 & 0x3f] + hex_table[0x80 | c & 0x3f];
        }
        out += arr.join('');
    }
    return out;
};
function compact(value) {
    const queue = [
        {
            obj: {
                o: value
            },
            prop: 'o'
        }
    ];
    const refs = [];
    for(let i = 0; i < queue.length; ++i){
        const item = queue[i];
        // @ts-ignore
        const obj = item.obj[item.prop];
        const keys = Object.keys(obj);
        for(let j = 0; j < keys.length; ++j){
            const key = keys[j];
            const val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({
                    obj: obj,
                    prop: key
                });
                refs.push(val);
            }
        }
    }
    compact_queue(queue);
    return value;
}
function is_regexp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
}
function is_buffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }
    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
}
function combine(a, b) {
    return [].concat(a, b);
}
function maybe_map(val, fn) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isArray"])(val)) {
        const mapped = [];
        for(let i = 0; i < val.length; i += 1){
            mapped.push(fn(val[i]));
        }
        return mapped;
    }
    return fn(val);
} //# sourceMappingURL=utils.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/qs/stringify.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "stringify": (()=>stringify)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$utils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/qs/utils.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$formats$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/qs/formats.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/values.mjs [app-route] (ecmascript)");
;
;
;
const array_prefix_generators = {
    brackets (prefix) {
        return String(prefix) + '[]';
    },
    comma: 'comma',
    indices (prefix, key) {
        return String(prefix) + '[' + key + ']';
    },
    repeat (prefix) {
        return String(prefix);
    }
};
const push_to_array = function(arr, value_or_array) {
    Array.prototype.push.apply(arr, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isArray"])(value_or_array) ? value_or_array : [
        value_or_array
    ]);
};
let toISOString;
const defaults = {
    addQueryPrefix: false,
    allowDots: false,
    allowEmptyArrays: false,
    arrayFormat: 'indices',
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encodeDotInKeys: false,
    encoder: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$utils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encode"],
    encodeValuesOnly: false,
    format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$formats$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default_format"],
    formatter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$formats$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default_formatter"],
    /** @deprecated */ indices: false,
    serializeDate (date) {
        return (toISOString ?? (toISOString = Function.prototype.call.bind(Date.prototype.toISOString)))(date);
    },
    skipNulls: false,
    strictNullHandling: false
};
function is_non_nullish_primitive(v) {
    return typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || typeof v === 'symbol' || typeof v === 'bigint';
}
const sentinel = {};
function inner_stringify(object, prefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
    let obj = object;
    let tmp_sc = sideChannel;
    let step = 0;
    let find_flag = false;
    while((tmp_sc = tmp_sc.get(sentinel)) !== void undefined && !find_flag){
        // Where object last appeared in the ref tree
        const pos = tmp_sc.get(object);
        step += 1;
        if (typeof pos !== 'undefined') {
            if (pos === step) {
                throw new RangeError('Cyclic object value');
            } else {
                find_flag = true; // Break while
            }
        }
        if (typeof tmp_sc.get(sentinel) === 'undefined') {
            step = 0;
        }
    }
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate?.(obj);
    } else if (generateArrayPrefix === 'comma' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isArray"])(obj)) {
        obj = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$utils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["maybe_map"])(obj, function(value) {
            if (value instanceof Date) {
                return serializeDate?.(value);
            }
            return value;
        });
    }
    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? // @ts-expect-error
            encoder(prefix, defaults.encoder, charset, 'key', format) : prefix;
        }
        obj = '';
    }
    if (is_non_nullish_primitive(obj) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$utils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["is_buffer"])(obj)) {
        if (encoder) {
            const key_value = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key', format);
            return [
                formatter?.(key_value) + '=' + // @ts-expect-error
                formatter?.(encoder(obj, defaults.encoder, charset, 'value', format))
            ];
        }
        return [
            formatter?.(prefix) + '=' + formatter?.(String(obj))
        ];
    }
    const values = [];
    if (typeof obj === 'undefined') {
        return values;
    }
    let obj_keys;
    if (generateArrayPrefix === 'comma' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isArray"])(obj)) {
        // we need to join elements in
        if (encodeValuesOnly && encoder) {
            // @ts-expect-error values only
            obj = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$utils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["maybe_map"])(obj, encoder);
        }
        obj_keys = [
            {
                value: obj.length > 0 ? obj.join(',') || null : void undefined
            }
        ];
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isArray"])(filter)) {
        obj_keys = filter;
    } else {
        const keys = Object.keys(obj);
        obj_keys = sort ? keys.sort(sort) : keys;
    }
    const encoded_prefix = encodeDotInKeys ? String(prefix).replace(/\./g, '%2E') : String(prefix);
    const adjusted_prefix = commaRoundTrip && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isArray"])(obj) && obj.length === 1 ? encoded_prefix + '[]' : encoded_prefix;
    if (allowEmptyArrays && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isArray"])(obj) && obj.length === 0) {
        return adjusted_prefix + '[]';
    }
    for(let j = 0; j < obj_keys.length; ++j){
        const key = obj_keys[j];
        const value = // @ts-ignore
        typeof key === 'object' && typeof key.value !== 'undefined' ? key.value : obj[key];
        if (skipNulls && value === null) {
            continue;
        }
        // @ts-ignore
        const encoded_key = allowDots && encodeDotInKeys ? key.replace(/\./g, '%2E') : key;
        const key_prefix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isArray"])(obj) ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(adjusted_prefix, encoded_key) : adjusted_prefix : adjusted_prefix + (allowDots ? '.' + encoded_key : '[' + encoded_key + ']');
        sideChannel.set(object, step);
        const valueSideChannel = new WeakMap();
        valueSideChannel.set(sentinel, sideChannel);
        push_to_array(values, inner_stringify(value, key_prefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, // @ts-ignore
        generateArrayPrefix === 'comma' && encodeValuesOnly && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isArray"])(obj) ? null : encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, valueSideChannel));
    }
    return values;
}
function normalize_stringify_options(opts = defaults) {
    if (typeof opts.allowEmptyArrays !== 'undefined' && typeof opts.allowEmptyArrays !== 'boolean') {
        throw new TypeError('`allowEmptyArrays` option can only be `true` or `false`, when provided');
    }
    if (typeof opts.encodeDotInKeys !== 'undefined' && typeof opts.encodeDotInKeys !== 'boolean') {
        throw new TypeError('`encodeDotInKeys` option can only be `true` or `false`, when provided');
    }
    if (opts.encoder !== null && typeof opts.encoder !== 'undefined' && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }
    const charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    let format = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$formats$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default_format"];
    if (typeof opts.format !== 'undefined') {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$utils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["has"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$formats$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatters"], opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    const formatter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$formats$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatters"][format];
    let filter = defaults.filter;
    if (typeof opts.filter === 'function' || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isArray"])(opts.filter)) {
        filter = opts.filter;
    }
    let arrayFormat;
    if (opts.arrayFormat && opts.arrayFormat in array_prefix_generators) {
        arrayFormat = opts.arrayFormat;
    } else if ('indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = defaults.arrayFormat;
    }
    if ('commaRoundTrip' in opts && typeof opts.commaRoundTrip !== 'boolean') {
        throw new TypeError('`commaRoundTrip` must be a boolean, or absent');
    }
    const allowDots = typeof opts.allowDots === 'undefined' ? !!opts.encodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        // @ts-ignore
        allowDots: allowDots,
        allowEmptyArrays: typeof opts.allowEmptyArrays === 'boolean' ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
        arrayFormat: arrayFormat,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        commaRoundTrip: !!opts.commaRoundTrip,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encodeDotInKeys: typeof opts.encodeDotInKeys === 'boolean' ? opts.encodeDotInKeys : defaults.encodeDotInKeys,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        format: format,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        // @ts-ignore
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
}
function stringify(object, opts = {}) {
    let obj = object;
    const options = normalize_stringify_options(opts);
    let obj_keys;
    let filter;
    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isArray"])(options.filter)) {
        filter = options.filter;
        obj_keys = filter;
    }
    const keys = [];
    if (typeof obj !== 'object' || obj === null) {
        return '';
    }
    const generateArrayPrefix = array_prefix_generators[options.arrayFormat];
    const commaRoundTrip = generateArrayPrefix === 'comma' && options.commaRoundTrip;
    if (!obj_keys) {
        obj_keys = Object.keys(obj);
    }
    if (options.sort) {
        obj_keys.sort(options.sort);
    }
    const sideChannel = new WeakMap();
    for(let i = 0; i < obj_keys.length; ++i){
        const key = obj_keys[i];
        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        push_to_array(keys, inner_stringify(obj[key], key, // @ts-expect-error
        generateArrayPrefix, commaRoundTrip, options.allowEmptyArrays, options.strictNullHandling, options.skipNulls, options.encodeDotInKeys, options.encode ? options.encoder : null, options.filter, options.sort, options.allowDots, options.serializeDate, options.format, options.formatter, options.encodeValuesOnly, options.charset, sideChannel));
    }
    const joined = keys.join(options.delimiter);
    let prefix = options.addQueryPrefix === true ? '?' : '';
    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }
    return joined.length > 0 ? prefix + joined : '';
} //# sourceMappingURL=stringify.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/qs/index.mjs [app-route] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "formats": (()=>formats)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$formats$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/qs/formats.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$stringify$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/qs/stringify.mjs [app-route] (ecmascript)");
;
const formats = {
    formatters: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$formats$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatters"],
    RFC1738: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$formats$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RFC1738"],
    RFC3986: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$formats$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RFC3986"],
    default: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$formats$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default_format"]
};
;
;
 //# sourceMappingURL=index.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/qs/index.mjs [app-route] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$formats$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/qs/formats.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$stringify$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/qs/stringify.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/qs/index.mjs [app-route] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/uploads.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "checkFileSupport": (()=>checkFileSupport),
    "createForm": (()=>createForm),
    "getName": (()=>getName),
    "isAsyncIterable": (()=>isAsyncIterable),
    "makeFile": (()=>makeFile),
    "maybeMultipartFormRequestOptions": (()=>maybeMultipartFormRequestOptions),
    "multipartFormRequestOptions": (()=>multipartFormRequestOptions)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$shims$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/shims.mjs [app-route] (ecmascript)");
;
const checkFileSupport = ()=>{
    if (typeof File === 'undefined') {
        const { process } = globalThis;
        const isOldNode = typeof process?.versions?.node === 'string' && parseInt(process.versions.node.split('.')) < 20;
        throw new Error('`File` is not defined as a global, which is required for file uploads.' + (isOldNode ? " Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`." : ''));
    }
};
function makeFile(fileBits, fileName, options) {
    checkFileSupport();
    return new File(fileBits, fileName ?? 'unknown_file', options);
}
function getName(value) {
    return (typeof value === 'object' && value !== null && ('name' in value && value.name && String(value.name) || 'url' in value && value.url && String(value.url) || 'filename' in value && value.filename && String(value.filename) || 'path' in value && value.path && String(value.path)) || '').split(/[\\/]/).pop() || undefined;
}
const isAsyncIterable = (value)=>value != null && typeof value === 'object' && typeof value[Symbol.asyncIterator] === 'function';
const maybeMultipartFormRequestOptions = async (opts, fetch)=>{
    if (!hasUploadableValue(opts.body)) return opts;
    return {
        ...opts,
        body: await createForm(opts.body, fetch)
    };
};
const multipartFormRequestOptions = async (opts, fetch)=>{
    return {
        ...opts,
        body: await createForm(opts.body, fetch)
    };
};
const supportsFormDataMap = /* @__PURE__ */ new WeakMap();
/**
 * node-fetch doesn't support the global FormData object in recent node versions. Instead of sending
 * properly-encoded form data, it just stringifies the object, resulting in a request body of "[object FormData]".
 * This function detects if the fetch function provided supports the global FormData object to avoid
 * confusing error messages later on.
 */ function supportsFormData(fetchObject) {
    const fetch = typeof fetchObject === 'function' ? fetchObject : fetchObject.fetch;
    const cached = supportsFormDataMap.get(fetch);
    if (cached) return cached;
    const promise = (async ()=>{
        try {
            const FetchResponse = 'Response' in fetch ? fetch.Response : (await fetch('data:,')).constructor;
            const data = new FormData();
            if (data.toString() === await new FetchResponse(data).text()) {
                return false;
            }
            return true;
        } catch  {
            // avoid false negatives
            return true;
        }
    })();
    supportsFormDataMap.set(fetch, promise);
    return promise;
}
const createForm = async (body, fetch)=>{
    if (!await supportsFormData(fetch)) {
        throw new TypeError('The provided fetch function does not support file uploads with the current global FormData class.');
    }
    const form = new FormData();
    await Promise.all(Object.entries(body || {}).map(([key, value])=>addFormValue(form, key, value)));
    return form;
};
// We check for Blob not File because Bun.File doesn't inherit from File,
// but they both inherit from Blob and have a `name` property at runtime.
const isNamedBlob = (value)=>value instanceof Blob && 'name' in value;
const isUploadable = (value)=>typeof value === 'object' && value !== null && (value instanceof Response || isAsyncIterable(value) || isNamedBlob(value));
const hasUploadableValue = (value)=>{
    if (isUploadable(value)) return true;
    if (Array.isArray(value)) return value.some(hasUploadableValue);
    if (value && typeof value === 'object') {
        for(const k in value){
            if (hasUploadableValue(value[k])) return true;
        }
    }
    return false;
};
const addFormValue = async (form, key, value)=>{
    if (value === undefined) return;
    if (value == null) {
        throw new TypeError(`Received null for "${key}"; to pass null in FormData, you must use the string 'null'`);
    }
    // TODO: make nested formats configurable
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        form.append(key, String(value));
    } else if (value instanceof Response) {
        form.append(key, makeFile([
            await value.blob()
        ], getName(value)));
    } else if (isAsyncIterable(value)) {
        form.append(key, makeFile([
            await new Response((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$shims$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReadableStreamFrom"])(value)).blob()
        ], getName(value)));
    } else if (isNamedBlob(value)) {
        form.append(key, value, getName(value));
    } else if (Array.isArray(value)) {
        await Promise.all(value.map((entry)=>addFormValue(form, key + '[]', entry)));
    } else if (typeof value === 'object') {
        await Promise.all(Object.entries(value).map(([name, prop])=>addFormValue(form, `${key}[${name}]`, prop)));
    } else {
        throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${value} instead`);
    }
}; //# sourceMappingURL=uploads.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/to-file.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "toFile": (()=>toFile)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$uploads$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/uploads.mjs [app-route] (ecmascript)");
;
;
/**
 * This check adds the arrayBuffer() method type because it is available and used at runtime
 */ const isBlobLike = (value)=>value != null && typeof value === 'object' && typeof value.size === 'number' && typeof value.type === 'string' && typeof value.text === 'function' && typeof value.slice === 'function' && typeof value.arrayBuffer === 'function';
/**
 * This check adds the arrayBuffer() method type because it is available and used at runtime
 */ const isFileLike = (value)=>value != null && typeof value === 'object' && typeof value.name === 'string' && typeof value.lastModified === 'number' && isBlobLike(value);
const isResponseLike = (value)=>value != null && typeof value === 'object' && typeof value.url === 'string' && typeof value.blob === 'function';
async function toFile(value, name, options) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$uploads$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkFileSupport"])();
    // If it's a promise, resolve it.
    value = await value;
    // If we've been given a `File` we don't need to do anything
    if (isFileLike(value)) {
        if (value instanceof File) {
            return value;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$uploads$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["makeFile"])([
            await value.arrayBuffer()
        ], value.name);
    }
    if (isResponseLike(value)) {
        const blob = await value.blob();
        name || (name = new URL(value.url).pathname.split(/[\\/]/).pop());
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$uploads$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["makeFile"])(await getBytes(blob), name, options);
    }
    const parts = await getBytes(value);
    name || (name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$uploads$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getName"])(value));
    if (!options?.type) {
        const type = parts.find((part)=>typeof part === 'object' && 'type' in part && part.type);
        if (typeof type === 'string') {
            options = {
                ...options,
                type
            };
        }
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$uploads$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["makeFile"])(parts, name, options);
}
async function getBytes(value) {
    let parts = [];
    if (typeof value === 'string' || ArrayBuffer.isView(value) || // includes Uint8Array, Buffer, etc.
    value instanceof ArrayBuffer) {
        parts.push(value);
    } else if (isBlobLike(value)) {
        parts.push(value instanceof Blob ? value : await value.arrayBuffer());
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$uploads$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAsyncIterable"])(value) // includes Readable, ReadableStream, etc.
    ) {
        for await (const chunk of value){
            parts.push(...await getBytes(chunk)); // TODO, consider validating?
        }
    } else {
        const constructor = value?.constructor?.name;
        throw new Error(`Unexpected data type: ${typeof value}${constructor ? `; constructor: ${constructor}` : ''}${propsForError(value)}`);
    }
    return parts;
}
function propsForError(value) {
    if (typeof value !== 'object' || value === null) return '';
    const props = Object.getOwnPropertyNames(value);
    return `; props: [${props.map((p)=>`"${p}"`).join(', ')}]`;
} //# sourceMappingURL=to-file.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/uploads.mjs [app-route] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$to$2d$file$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/to-file.mjs [app-route] (ecmascript)"); //# sourceMappingURL=uploads.mjs.map
;
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/uploads.mjs [app-route] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$to$2d$file$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/to-file.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$uploads$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/uploads.mjs [app-route] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/resource.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "APIResource": (()=>APIResource)
});
class APIResource {
    constructor(client){
        this._client = client;
    }
} //# sourceMappingURL=resource.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/path.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createPathTagFunction": (()=>createPathTagFunction),
    "encodeURIPath": (()=>encodeURIPath),
    "path": (()=>path)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/error.mjs [app-route] (ecmascript)");
;
function encodeURIPath(str) {
    return str.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g, encodeURIComponent);
}
const EMPTY = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.create(null));
const createPathTagFunction = (pathEncoder = encodeURIPath)=>function path(statics, ...params) {
        // If there are no params, no processing is needed.
        if (statics.length === 1) return statics[0];
        let postPath = false;
        const invalidSegments = [];
        const path1 = statics.reduce((previousValue, currentValue, index)=>{
            if (/[?#]/.test(currentValue)) {
                postPath = true;
            }
            const value = params[index];
            let encoded = (postPath ? encodeURIComponent : pathEncoder)('' + value);
            if (index !== params.length && (value == null || typeof value === 'object' && // handle values from other realms
            value.toString === Object.getPrototypeOf(Object.getPrototypeOf(value.hasOwnProperty ?? EMPTY) ?? EMPTY)?.toString)) {
                encoded = value + '';
                invalidSegments.push({
                    start: previousValue.length + currentValue.length,
                    length: encoded.length,
                    error: `Value of type ${Object.prototype.toString.call(value).slice(8, -1)} is not a valid path parameter`
                });
            }
            return previousValue + currentValue + (index === params.length ? '' : encoded);
        }, '');
        const pathOnly = path1.split(/[?#]/, 1)[0];
        const invalidSegmentPattern = /(?<=^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi;
        let match;
        // Find all invalid segments
        while((match = invalidSegmentPattern.exec(pathOnly)) !== null){
            invalidSegments.push({
                start: match.index,
                length: match[0].length,
                error: `Value "${match[0]}" can\'t be safely passed as a path parameter`
            });
        }
        invalidSegments.sort((a, b)=>a.start - b.start);
        if (invalidSegments.length > 0) {
            let lastEnd = 0;
            const underline = invalidSegments.reduce((acc, segment)=>{
                const spaces = ' '.repeat(segment.start - lastEnd);
                const arrows = '^'.repeat(segment.length);
                lastEnd = segment.start + segment.length;
                return acc + spaces + arrows;
            }, '');
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ComposioError"](`Path parameters result in path with invalid segments:\n${invalidSegments.map((e)=>e.error).join('\n')}\n${path1}\n${underline}`);
        }
        return path1;
    };
const path = /* @__PURE__ */ createPathTagFunction(encodeURIPath); //# sourceMappingURL=path.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/auth-configs.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "AuthConfigs": (()=>AuthConfigs)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/resource.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/path.mjs [app-route] (ecmascript)");
;
;
class AuthConfigs extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIResource"] {
    /**
     * Create new authentication configuration
     *
     * @example
     * ```ts
     * const authConfig = await client.authConfigs.create({
     *   toolkit: { slug: 'slug' },
     * });
     * ```
     */ create(body, options) {
        return this._client.post('/api/v3/auth_configs', {
            body,
            ...options
        });
    }
    /**
     * Retrieves detailed information about a specific authentication configuration
     * using its unique identifier.
     *
     * @example
     * ```ts
     * const authConfig = await client.authConfigs.retrieve(
     *   'nanoid',
     * );
     * ```
     */ retrieve(nanoid, options) {
        return this._client.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/auth_configs/${nanoid}`, options);
    }
    /**
     * Modifies an existing authentication configuration with new credentials or other
     * settings. Only specified fields will be updated.
     *
     * @example
     * ```ts
     * const authConfig = await client.authConfigs.update(
     *   'nanoid',
     *   { credentials: { foo: 'bar' }, type: 'custom' },
     * );
     * ```
     */ update(nanoid, body, options) {
        return this._client.patch(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/auth_configs/${nanoid}`, {
            body,
            ...options
        });
    }
    /**
     * List authentication configurations with optional filters
     *
     * @example
     * ```ts
     * const authConfigs = await client.authConfigs.list();
     * ```
     */ list(query = {}, options) {
        return this._client.get('/api/v3/auth_configs', {
            query,
            ...options
        });
    }
    /**
     * Soft-deletes an authentication configuration by marking it as deleted in the
     * database. This operation cannot be undone.
     *
     * @example
     * ```ts
     * const authConfig = await client.authConfigs.delete(
     *   'nanoid',
     * );
     * ```
     */ delete(nanoid, options) {
        return this._client.delete(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/auth_configs/${nanoid}`, options);
    }
    /**
     * Updates the status of an authentication configuration to either enabled or
     * disabled. Disabled configurations cannot be used for new connections.
     *
     * @example
     * ```ts
     * const response = await client.authConfigs.updateStatus(
     *   'ENABLED',
     *   { nanoid: 'nanoid' },
     * );
     * ```
     */ updateStatus(status, params, options) {
        const { nanoid } = params;
        return this._client.patch(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/auth_configs/${nanoid}/${status}`, options);
    }
} //# sourceMappingURL=auth-configs.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/cli.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "Cli": (()=>Cli)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/resource.mjs [app-route] (ecmascript)");
;
class Cli extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIResource"] {
    /**
     * Generates a new CLI session with a random 6-character code. This endpoint is the
     * first step in the CLI authentication flow, creating a session that can later be
     * linked to a user account. The generated code is displayed to the user in the CLI
     * and should be entered in the web interface to complete authentication.
     *
     * @example
     * ```ts
     * const response = await client.cli.createSession();
     * ```
     */ createSession(options) {
        return this._client.post('/api/v3/cli/create-session', options);
    }
    /**
     * Retrieves the current state of a CLI session using either the session ID (UUID)
     * or the 6-character code. This endpoint is used by both the CLI client to check
     * if the session has been linked, and by the web interface to display session
     * details before linking.
     *
     * @example
     * ```ts
     * const response = await client.cli.getSession({
     *   id: 'ABC123',
     * });
     * ```
     */ getSession(query, options) {
        return this._client.get('/api/v3/cli/get-session', {
            query,
            ...options
        });
    }
    /**
     * Links a pending CLI session to the currently authenticated user. This is the
     * final step in the CLI authentication flow, where the user enters the code in the
     * web interface and their account is associated with the CLI session, allowing the
     * CLI to act on their behalf.
     *
     * @example
     * ```ts
     * const response = await client.cli.linkSession({
     *   id: 'ABC123',
     * });
     * ```
     */ linkSession(body, options) {
        return this._client.put('/api/v3/cli/link-session', {
            body,
            ...options
        });
    }
} //# sourceMappingURL=cli.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/connected-accounts.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "ConnectedAccounts": (()=>ConnectedAccounts)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/resource.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/path.mjs [app-route] (ecmascript)");
;
;
class ConnectedAccounts extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIResource"] {
    /**
     * Create a new connected account
     *
     * @example
     * ```ts
     * const connectedAccount =
     *   await client.connectedAccounts.create({
     *     auth_config: { id: 'id' },
     *     connection: {},
     *   });
     * ```
     */ create(body, options) {
        return this._client.post('/api/v3/connected_accounts', {
            body,
            ...options
        });
    }
    /**
     * Retrieves comprehensive details of a connected account, including authentication
     * configuration, connection status, and all parameters needed for API requests.
     *
     * @example
     * ```ts
     * const connectedAccount =
     *   await client.connectedAccounts.retrieve(
     *     'con_1a2b3c4d5e6f',
     *   );
     * ```
     */ retrieve(nanoid, options) {
        return this._client.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/connected_accounts/${nanoid}`, options);
    }
    /**
     * List connected accounts with optional filters
     *
     * @example
     * ```ts
     * const connectedAccounts =
     *   await client.connectedAccounts.list();
     * ```
     */ list(query = {}, options) {
        return this._client.get('/api/v3/connected_accounts', {
            query,
            ...options
        });
    }
    /**
     * Soft-deletes a connected account by marking it as deleted in the database. This
     * prevents the account from being used for API calls but preserves the record for
     * audit purposes.
     *
     * @example
     * ```ts
     * const connectedAccount =
     *   await client.connectedAccounts.delete('con_1a2b3c4d5e6f');
     * ```
     */ delete(nanoid, options) {
        return this._client.delete(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/connected_accounts/${nanoid}`, options);
    }
    /**
     * Initiates a new authentication flow for a connected account when credentials
     * have expired or become invalid. This may generate a new authentication URL for
     * OAuth flows or refresh tokens for other auth schemes.
     *
     * @example
     * ```ts
     * const response = await client.connectedAccounts.refresh(
     *   'con_1a2b3c4d5e6f',
     * );
     * ```
     */ refresh(nanoid, params = {}, options) {
        const { query_redirect_url, ...body } = params ?? {};
        return this._client.post(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/connected_accounts/${nanoid}/refresh`, {
            query: {
                redirect_url: query_redirect_url
            },
            body,
            ...options
        });
    }
    /**
     * Updates the status of a connected account to either enabled (active) or disabled
     * (inactive). Disabled accounts cannot be used for API calls but remain in the
     * database.
     *
     * @example
     * ```ts
     * const response =
     *   await client.connectedAccounts.updateStatus(
     *     'con_1a2b3c4d5e6f',
     *     { enabled: true },
     *   );
     * ```
     */ updateStatus(nanoID, body, options) {
        return this._client.patch(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/connected_accounts/${nanoID}/status`, {
            body,
            ...options
        });
    }
} //# sourceMappingURL=connected-accounts.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/files.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "Files": (()=>Files)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/resource.mjs [app-route] (ecmascript)");
;
class Files extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIResource"] {
    /**
     * Retrieves a list of files associated with the authenticated project. Results can
     * be filtered by toolkit and tool slugs.
     *
     * @example
     * ```ts
     * const files = await client.files.list();
     * ```
     */ list(query = {}, options) {
        return this._client.get('/api/v3/files/list', {
            query,
            ...options
        });
    }
    /**
     * Generates a presigned URL for uploading a file to S3. This endpoint handles
     * deduplication by checking if a file with the same MD5 hash already exists.
     *
     * @example
     * ```ts
     * const response = await client.files.createPresignedURL({
     *   filename: 'photo.jpg',
     *   md5: 'd41d8cd98f00b204e9800998ecf8427e',
     *   mimetype: 'image/jpeg',
     *   tool_slug: 'resize-image',
     *   toolkit_slug: 'image-processing',
     * });
     * ```
     */ createPresignedURL(body, options) {
        return this._client.post('/api/v3/files/upload/request', {
            body,
            ...options
        });
    }
} //# sourceMappingURL=files.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/mcp/custom.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "Custom": (()=>Custom)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/resource.mjs [app-route] (ecmascript)");
;
class Custom extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIResource"] {
    /**
     * Creates a new Model Control Protocol (MCP) server instance that can integrate
     * with multiple applications or toolkits simultaneously. This endpoint allows you
     * to create a server that can access tools from different applications, making it
     * suitable for complex workflows that span multiple services.
     *
     * @example
     * ```ts
     * const custom = await client.mcp.custom.create({
     *   name: 'Development Integration Server',
     *   toolkits: ['github', 'jira'],
     * });
     * ```
     */ create(body, options) {
        return this._client.post('/api/v3/mcp/servers/custom', {
            body,
            ...options
        });
    }
} //# sourceMappingURL=custom.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/mcp/generate.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "Generate": (()=>Generate)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/resource.mjs [app-route] (ecmascript)");
;
class Generate extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIResource"] {
    /**
     * Generates a Model Control Protocol (MCP) URL for an existing server with custom
     * query parameters. The URL includes user-specific parameters and configuration
     * flags that control the behavior of the MCP connection.
     *
     * @example
     * ```ts
     * const response = await client.mcp.generate.url({
     *   mcp_server_id: '550e8400-e29b-41d4-a716-446655440000',
     *   connected_account_ids: ['account_1', 'account_2'],
     *   user_ids: ['user_123456'],
     * });
     * ```
     */ url(body, options) {
        return this._client.post('/api/v3/mcp/servers/generate', {
            body,
            ...options
        });
    }
} //# sourceMappingURL=generate.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/headers.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "buildHeaders": (()=>buildHeaders),
    "isEmptyHeaders": (()=>isEmptyHeaders)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/values.mjs [app-route] (ecmascript)");
;
const brand_privateNullableHeaders = /* @__PURE__ */ Symbol('brand.privateNullableHeaders');
function* iterateHeaders(headers) {
    if (!headers) return;
    if (brand_privateNullableHeaders in headers) {
        const { values, nulls } = headers;
        yield* values.entries();
        for (const name of nulls){
            yield [
                name,
                null
            ];
        }
        return;
    }
    let shouldClear = false;
    let iter;
    if (headers instanceof Headers) {
        iter = headers.entries();
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isReadonlyArray"])(headers)) {
        iter = headers;
    } else {
        shouldClear = true;
        iter = Object.entries(headers ?? {});
    }
    for (let row of iter){
        const name = row[0];
        if (typeof name !== 'string') throw new TypeError('expected header name to be a string');
        const values = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isReadonlyArray"])(row[1]) ? row[1] : [
            row[1]
        ];
        let didClear = false;
        for (const value of values){
            if (value === undefined) continue;
            // Objects keys always overwrite older headers, they never append.
            // Yield a null to clear the header before adding the new values.
            if (shouldClear && !didClear) {
                didClear = true;
                yield [
                    name,
                    null
                ];
            }
            yield [
                name,
                value
            ];
        }
    }
}
const buildHeaders = (newHeaders)=>{
    const targetHeaders = new Headers();
    const nullHeaders = new Set();
    for (const headers of newHeaders){
        const seenHeaders = new Set();
        for (const [name, value] of iterateHeaders(headers)){
            const lowerName = name.toLowerCase();
            if (!seenHeaders.has(lowerName)) {
                targetHeaders.delete(name);
                seenHeaders.add(lowerName);
            }
            if (value === null) {
                targetHeaders.delete(name);
                nullHeaders.add(lowerName);
            } else {
                targetHeaders.append(name, value);
                nullHeaders.delete(lowerName);
            }
        }
    }
    return {
        [brand_privateNullableHeaders]: true,
        values: targetHeaders,
        nulls: nullHeaders
    };
};
const isEmptyHeaders = (headers)=>{
    for (const _ of iterateHeaders(headers))return false;
    return true;
}; //# sourceMappingURL=headers.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/mcp/mcp.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "Mcp": (()=>Mcp)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/resource.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$mcp$2f$custom$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/mcp/custom.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$mcp$2f$generate$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/mcp/generate.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$headers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/headers.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/path.mjs [app-route] (ecmascript)");
;
;
;
;
;
;
;
class Mcp extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIResource"] {
    constructor(){
        super(...arguments);
        this.custom = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$mcp$2f$custom$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Custom"](this._client);
        this.generate = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$mcp$2f$generate$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Generate"](this._client);
    }
    /**
     * Creates a new Model Control Protocol (MCP) server instance for the authenticated
     * project. An MCP server provides a connection point for AI assistants to access
     * your applications and services. The server is configured with specific
     * authentication and tool permissions that determine what actions the connected
     * assistants can perform.
     *
     * @example
     * ```ts
     * const mcp = await client.mcp.create({
     *   auth_config_ids: ['auth_cfg_abc123def456'],
     *   name: 'GitHub Integration Server',
     * });
     * ```
     */ create(body, options) {
        return this._client.post('/api/v3/mcp/servers', {
            body,
            ...options
        });
    }
    /**
     * Retrieves detailed configuration information for a specific Model Control
     * Protocol (MCP) server. The returned data includes connection details, associated
     * applications, enabled tools, and authentication configuration.
     *
     * @example
     * ```ts
     * const mcp = await client.mcp.retrieve(
     *   '550e8400-e29b-41d4-a716-446655440000',
     * );
     * ```
     */ retrieve(id, options) {
        return this._client.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/mcp/${id}`, options);
    }
    /**
     * Updates the configuration of an existing Model Control Protocol (MCP) server.
     * You can modify the server name, associated applications, and enabled tools. Only
     * the fields included in the request will be updated.
     *
     * @example
     * ```ts
     * const mcp = await client.mcp.update(
     *   '550e8400-e29b-41d4-a716-446655440000',
     *   { name: 'Updated GitHub Integration Server' },
     * );
     * ```
     */ update(id, body = {}, options) {
        return this._client.patch(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/mcp/${id}`, {
            body,
            ...options
        });
    }
    /**
     * Retrieves a paginated list of MCP servers associated with the authenticated
     * project. Results can be filtered by name, toolkit, or authentication
     * configuration ID. MCP servers are used to provide Model Control Protocol
     * integration points for connecting AI assistants to your applications and
     * services.
     *
     * @example
     * ```ts
     * const mcps = await client.mcp.list();
     * ```
     */ list(query = {}, options) {
        return this._client.get('/api/v3/mcp/servers', {
            query,
            ...options
        });
    }
    /**
     * Performs a soft delete on a Model Control Protocol (MCP) server, making it
     * unavailable for future use. This operation is reversible in the database but
     * cannot be undone through the API. Any applications or services connected to this
     * server will lose access after deletion.
     *
     * @example
     * ```ts
     * const mcp = await client.mcp.delete(
     *   '550e8400-e29b-41d4-a716-446655440000',
     * );
     * ```
     */ delete(id, options) {
        return this._client.delete(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/mcp/${id}`, options);
    }
    /**
     * Retrieves a paginated list of Model Control Protocol (MCP) servers that are
     * configured for a specific application or toolkit. This endpoint allows you to
     * find all MCP server instances that have access to a particular application, such
     * as GitHub, Slack, or Jira.
     *
     * @example
     * ```ts
     * const response = await client.mcp.retrieveApp('github');
     * ```
     */ retrieveApp(appKey, query = {}, options) {
        return this._client.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/mcp/app/${appKey}`, {
            query,
            ...options
        });
    }
    /**
     * Admin-only endpoint that validates a Model Control Protocol (MCP) server and
     * retrieves its complete configuration details, including authentication
     * information. This endpoint is typically used by the MCP service itself to
     * authenticate and authorize connection requests from clients.
     *
     * @example
     * ```ts
     * const response = await client.mcp.validate(
     *   '550e8400-e29b-41d4-a716-446655440000',
     *   { 'x-composio-admin-token': 'admin_tk_12345abcdef' },
     * );
     * ```
     */ validate(uuid, params, options) {
        const { 'x-composio-admin-token': xComposioAdminToken } = params;
        return this._client.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/mcp/validate/${uuid}`, {
            ...options,
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$headers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildHeaders"])([
                {
                    'x-composio-admin-token': xComposioAdminToken
                },
                options?.headers
            ])
        });
    }
}
Mcp.Custom = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$mcp$2f$custom$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Custom"];
Mcp.Generate = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$mcp$2f$generate$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Generate"]; //# sourceMappingURL=mcp.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/migration.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "Migration": (()=>Migration)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/resource.mjs [app-route] (ecmascript)");
;
class Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIResource"] {
    /**
     * Convert a legacy UUID to its corresponding NanoId for migration purposes. This
     * endpoint facilitates the transition from UUID-based identifiers to the more
     * compact NanoId format used in the v3 API.
     */ retrieveNanoid(query, options) {
        return this._client.get('/api/v3/migration/get-nanoid', {
            query,
            ...options
        });
    }
} //# sourceMappingURL=migration.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/org/api-key.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "APIKey": (()=>APIKey)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/resource.mjs [app-route] (ecmascript)");
;
class APIKey extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIResource"] {
    /**
     * Retrieve the API key for the current organization. This endpoint is restricted
     * to organization administrators only. The returned API key can be used for
     * authenticating organization-level API requests.
     *
     * @example
     * ```ts
     * const apiKey = await client.org.apiKey.retrieve();
     * ```
     */ retrieve(options) {
        return this._client.get('/api/v3/org/api_key', options);
    }
    /**
     * Generate a new API key for the organization, invalidating the previous one
     * (admin only). This operation cannot be undone and will immediately invalidate
     * the previous API key.
     *
     * @example
     * ```ts
     * const response = await client.org.apiKey.regenerate();
     * ```
     */ regenerate(options) {
        return this._client.post('/api/v3/org/api_key/regenerate', options);
    }
} //# sourceMappingURL=api-key.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/org/project/api-keys.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "APIKeys": (()=>APIKeys)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/resource.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/path.mjs [app-route] (ecmascript)");
;
;
class APIKeys extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIResource"] {
    /**
     * Creates a new API key for the specified project. API keys are used for
     * authenticating requests to the API. This endpoint generates a new key with the
     * provided name and returns the complete key details including the actual key
     * value. Note that the full API key value is only returned once at creation time
     * and cannot be retrieved later, so it should be securely stored immediately.
     *
     * @example
     * ```ts
     * const apiKey = await client.org.project.apiKeys.create(
     *   'proj_abc123xyz456',
     *   { name: 'Production API Key' },
     * );
     * ```
     */ create(projectID, body, options) {
        return this._client.post(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/org/project/${projectID}/api_keys/create`, {
            body,
            ...options
        });
    }
    /**
     * Retrieves all API keys associated with the specified project. This endpoint
     * returns details about each API key including its name, creation date, and last
     * used information. Use this endpoint to audit which keys exist for a project or
     * to manage key rotation policies.
     *
     * @example
     * ```ts
     * const apiKeys = await client.org.project.apiKeys.list(
     *   'proj_abc123xyz456',
     * );
     * ```
     */ list(projectID, options) {
        return this._client.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/org/project/${projectID}/api_keys/list`, options);
    }
    /**
     * Permanently deletes an API key from the specified project. Once deleted, the API
     * key can no longer be used for authentication and any services using it will need
     * to be updated with a new key. This operation cannot be undone, so it should be
     * used with caution.
     *
     * @example
     * ```ts
     * const apiKey = await client.org.project.apiKeys.delete(
     *   '01H4DKRF5SMP7NQCA3BWT0JYB6',
     *   { projectId: 'proj_abc123xyz456' },
     * );
     * ```
     */ delete(id, params, options) {
        const { projectId } = params;
        return this._client.delete(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/org/project/${projectId}/api_keys/remove/${id}`, options);
    }
    /**
     * Retrieves an existing API key for the project or creates a new one if none
     * exists. This endpoint is useful for ensuring a project always has at least one
     * API key without the risk of creating duplicates. If an API key already exists,
     * it returns the existing key. If no API keys exist for the project, it creates a
     * new one with an automatically generated name.
     *
     * @example
     * ```ts
     * const response =
     *   await client.org.project.apiKeys.createAPIKey(
     *     'proj_abc123xyz456',
     *   );
     * ```
     */ createAPIKey(projectID, options) {
        return this._client.post(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/org/project/${projectID}/api_keys/create-api-key`, options);
    }
} //# sourceMappingURL=api-keys.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/org/project/trigger.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "Trigger": (()=>Trigger)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/resource.mjs [app-route] (ecmascript)");
;
class Trigger extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIResource"] {
    /**
     * Updates the trigger enablement status for the current project. Use this endpoint
     * to enable or disable triggers for automated workflows within a project.
     *
     * @example
     * ```ts
     * const trigger = await client.org.project.trigger.update();
     * ```
     */ update(params = {}, options) {
        const { enabled } = params ?? {};
        return this._client.patch('/api/v3/org/project/trigger', {
            query: {
                enabled
            },
            ...options
        });
    }
    /**
     * Retrieves the current project details including its trigger enablement status.
     * Use this endpoint to check whether triggers are currently enabled or disabled
     * for a project.
     *
     * @example
     * ```ts
     * const triggers = await client.org.project.trigger.list();
     * ```
     */ list(options) {
        return this._client.get('/api/v3/org/project/trigger', options);
    }
} //# sourceMappingURL=trigger.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/org/project/webhook.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "Webhook": (()=>Webhook)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/resource.mjs [app-route] (ecmascript)");
;
class Webhook extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIResource"] {
    /**
     * Retrieves the webhook URL and secret for the current project. Webhooks come in
     * two types: "trigger" webhooks are used for integration trigger events, while
     * "event" webhooks receive system notifications about project events. The response
     * includes both the URL and the secret key used to verify webhook signatures.
     *
     * @example
     * ```ts
     * const webhook = await client.org.project.webhook.retrieve({
     *   type: 'trigger',
     * });
     * ```
     */ retrieve(query, options) {
        return this._client.get('/api/v3/org/project/webhook', {
            query,
            ...options
        });
    }
    /**
     * Updates the webhook URL for the current project based on the specified type
     * (trigger or event). Webhook URLs are endpoints that receive notifications about
     * events in your project. "Trigger" webhooks receive integration trigger events,
     * while "event" webhooks receive system notifications. This endpoint allows you to
     * set or change these notification destinations.
     *
     * @example
     * ```ts
     * const webhook = await client.org.project.webhook.update({
     *   type: 'trigger',
     *   webhook_url: 'https://example.com/api/webhooks/triggers',
     * });
     * ```
     */ update(body, options) {
        return this._client.post('/api/v3/org/project/webhook/update', {
            body,
            ...options
        });
    }
    /**
     * Removes a webhook URL (trigger or event) from the project configuration. This
     * operation sets the specified webhook URL to null in the database but preserves
     * the webhook secret. After deletion, the project will no longer receive webhook
     * notifications of the specified type until a new URL is configured.
     *
     * @example
     * ```ts
     * const webhook = await client.org.project.webhook.delete({
     *   type: 'trigger',
     * });
     * ```
     */ delete(body, options) {
        return this._client.delete('/api/v3/org/project/webhook', {
            body,
            ...options
        });
    }
    /**
     * Generates a new webhook secret for the project, invalidating the previous one.
     * Webhook secrets are used to verify the authenticity of incoming webhook payloads
     * through signature verification. This endpoint should be used when you need to
     * rotate your webhook secret for security purposes. After refreshing, you must
     * update your webhook verification logic to use the new secret.
     *
     * @example
     * ```ts
     * const response = await client.org.project.webhook.refresh();
     * ```
     */ refresh(options) {
        return this._client.post('/api/v3/org/project/webhook/refresh', options);
    }
} //# sourceMappingURL=webhook.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/org/project/project.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "Project": (()=>Project)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/resource.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$org$2f$project$2f$api$2d$keys$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/org/project/api-keys.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$org$2f$project$2f$trigger$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/org/project/trigger.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$org$2f$project$2f$webhook$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/org/project/webhook.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/path.mjs [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
class Project extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIResource"] {
    constructor(){
        super(...arguments);
        this.apiKeys = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$org$2f$project$2f$api$2d$keys$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIKeys"](this._client);
        this.webhook = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$org$2f$project$2f$webhook$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Webhook"](this._client);
        this.trigger = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$org$2f$project$2f$trigger$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Trigger"](this._client);
    }
    /**
     * Creates a new project within the authenticated user's organization using the
     * specified name. Projects are isolated environments within your organization,
     * each with their own API keys, webhook configurations, and resources. Use this
     * endpoint to create additional projects for different environments (e.g.,
     * development, staging, production) or for separate applications.
     *
     * @example
     * ```ts
     * const project = await client.org.project.create({
     *   name: 'my-production-api',
     * });
     * ```
     */ create(body, options) {
        return this._client.post('/api/v3/org/project/new', {
            body,
            ...options
        });
    }
    /**
     * Retrieves detailed information about a specific project using its unique
     * identifier. This endpoint provides complete project configuration including
     * webhook URLs, creation and update timestamps, and webhook secrets. Use this
     * endpoint to inspect project settings or verify project configuration.
     *
     * @example
     * ```ts
     * const project = await client.org.project.retrieve(
     *   'proj_abc123xyz456',
     * );
     * ```
     */ retrieve(projectID, options) {
        return this._client.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/org/project/${projectID}`, options);
    }
    /**
     * Retrieves all projects belonging to the authenticated user's organization.
     * Projects are returned in descending order of creation date (newest first). This
     * endpoint is useful for displaying project selection in dashboards or for
     * integrations that need to list all available projects.
     *
     * @example
     * ```ts
     * const projects = await client.org.project.list();
     * ```
     */ list(options) {
        return this._client.get('/api/v3/org/project/list', options);
    }
    /**
     * Soft-deletes a project within the organization by its unique identifier. When a
     * project is deleted, it is marked as deleted but not immediately removed from the
     * database. This operation affects all resources associated with the project
     * including API keys, webhook configurations, and connected services. This action
     * cannot be undone through the API.
     *
     * @example
     * ```ts
     * const project = await client.org.project.delete(
     *   'proj_abc123xyz456',
     * );
     * ```
     */ delete(projectID, options) {
        return this._client.delete(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/org/project/delete/${projectID}`, options);
    }
}
Project.APIKeys = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$org$2f$project$2f$api$2d$keys$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIKeys"];
Project.Webhook = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$org$2f$project$2f$webhook$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Webhook"];
Project.Trigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$org$2f$project$2f$trigger$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Trigger"]; //# sourceMappingURL=project.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/org/org.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "Org": (()=>Org)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/resource.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$org$2f$api$2d$key$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/org/api-key.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$org$2f$project$2f$project$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/org/project/project.mjs [app-route] (ecmascript)");
;
;
;
;
;
class Org extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIResource"] {
    constructor(){
        super(...arguments);
        this.apiKey = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$org$2f$api$2d$key$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIKey"](this._client);
        this.project = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$org$2f$project$2f$project$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Project"](this._client);
    }
}
Org.APIKey = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$org$2f$api$2d$key$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIKey"];
Org.Project = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$org$2f$project$2f$project$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Project"]; //# sourceMappingURL=org.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/team-members.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "TeamMembers": (()=>TeamMembers)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/resource.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/path.mjs [app-route] (ecmascript)");
;
;
class TeamMembers extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIResource"] {
    /**
     * Update the details of an existing team member
     */ update(id, body, options) {
        return this._client.put(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/team-members/update/${id}`, {
            body,
            ...options
        });
    }
    /**
     * Retrieve a list of all team members in the current organization
     */ list(options) {
        return this._client.get('/api/v3/team-members/list', options);
    }
    /**
     * Send an invitation to a new team member to join the organization
     */ invite(body, options) {
        return this._client.post('/api/v3/team-members/invite', {
            body,
            ...options
        });
    }
    /**
     * Remove a team member from the organization and revoke their access
     */ remove(id, options) {
        return this._client.delete(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/team-members/remove/${id}`, options);
    }
} //# sourceMappingURL=team-members.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/toolkits.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "Toolkits": (()=>Toolkits)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/resource.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/path.mjs [app-route] (ecmascript)");
;
;
class Toolkits extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIResource"] {
    /**
     * Retrieves comprehensive information about a specific toolkit using its unique
     * slug identifier. This endpoint provides detailed metadata, authentication
     * configuration options, and feature counts for the requested toolkit.
     */ retrieve(slug, options) {
        return this._client.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/toolkits/${slug}`, options);
    }
    /**
     * Retrieves a comprehensive list of toolkits that are available to the
     * authenticated project. Toolkits represent integration points with external
     * services and applications, each containing a collection of tools and triggers.
     * This endpoint supports filtering by category, management type, and local
     * availability, as well as different sorting options.
     */ list(query = {}, options) {
        return this._client.get('/api/v3/toolkits', {
            query,
            ...options
        });
    }
    /**
     * Retrieves a comprehensive list of all available toolkit categories. These
     * categories can be used to filter toolkits by type or purpose when using the
     * toolkit listing endpoint. Categories help organize toolkits into logical groups
     * based on their functionality or industry focus.
     */ retrieveCategories(query = {}, options) {
        return this._client.get('/api/v3/toolkits/categories', {
            query,
            ...options
        });
    }
} //# sourceMappingURL=toolkits.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/tools.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "Tools": (()=>Tools)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/resource.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/path.mjs [app-route] (ecmascript)");
;
;
class Tools extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIResource"] {
    /**
     * Retrieve detailed information about a specific tool using its slug identifier.
     * This endpoint returns full metadata about a tool including input/output
     * parameters, versions, and toolkit information.
     *
     * @example
     * ```ts
     * const tool = await client.tools.retrieve('tool_slug');
     * ```
     */ retrieve(toolSlug, options) {
        return this._client.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/tools/${toolSlug}`, options);
    }
    /**
     * Retrieve a paginated list of available tools with comprehensive filtering,
     * sorting and search capabilities. Use query parameters to narrow down results by
     * toolkit, tags, or search terms.
     *
     * @example
     * ```ts
     * const tools = await client.tools.list();
     * ```
     */ list(query = {}, options) {
        return this._client.get('/api/v3/tools', {
            query,
            ...options
        });
    }
    /**
     * Execute a specific tool operation with provided arguments and authentication.
     * This is the primary endpoint for integrating with third-party services and
     * executing tools. You can provide structured arguments or use natural language
     * processing by providing a text description of what you want to accomplish.
     *
     * @example
     * ```ts
     * const response = await client.tools.execute('tool_slug');
     * ```
     */ execute(toolSlug, body = {}, options) {
        return this._client.post(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/tools/execute/${toolSlug}`, {
            body,
            ...options
        });
    }
    /**
     * Uses AI to translate a natural language description into structured arguments
     * for a specific tool. This endpoint is useful when you want to let users describe
     * what they want to do in plain language instead of providing structured
     * parameters.
     *
     * @example
     * ```ts
     * const response = await client.tools.getInput('tool_slug', {
     *   text: 'I need to trigger the main workflow in the octocat/Hello-World repository to deploy to production',
     * });
     * ```
     */ getInput(toolSlug, body, options) {
        return this._client.post(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/tools/execute/${toolSlug}/input`, {
            body,
            ...options
        });
    }
    /**
     * Proxy an HTTP request to a third-party API using connected account credentials.
     * This endpoint allows making authenticated API calls to external services while
     * abstracting away authentication details.
     *
     * @example
     * ```ts
     * const response = await client.tools.proxy({
     *   endpoint: '/api/v1/resources',
     *   method: 'GET',
     * });
     * ```
     */ proxy(body, options) {
        return this._client.post('/api/v3/tools/execute/proxy', {
            body,
            ...options
        });
    }
    /**
     * Retrieve a list of all available tool enumeration values (tool slugs) for the
     * project. This endpoint returns a comma-separated string of tool slugs that can
     * be used in other API calls.
     *
     * @example
     * ```ts
     * const response = await client.tools.retrieveEnum();
     * ```
     */ retrieveEnum(options) {
        return this._client.get('/api/v3/tools/enum', options);
    }
} //# sourceMappingURL=tools.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/trigger-instances/handle.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "Handle": (()=>Handle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/resource.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/path.mjs [app-route] (ecmascript)");
;
;
class Handle extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIResource"] {
    retrieve(projectID, params, options) {
        const { slug } = params;
        return this._client.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/trigger_instances/${slug}/${projectID}/handle`, options);
    }
    execute(projectID, params, options) {
        const { slug } = params;
        return this._client.post(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/trigger_instances/${slug}/${projectID}/handle`, options);
    }
} //# sourceMappingURL=handle.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/trigger-instances/manage.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "Manage": (()=>Manage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/resource.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/path.mjs [app-route] (ecmascript)");
;
;
class Manage extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIResource"] {
    update(triggerID, body, options) {
        return this._client.patch(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/trigger_instances/manage/${triggerID}`, {
            body,
            ...options
        });
    }
    delete(triggerID, options) {
        return this._client.delete(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/trigger_instances/manage/${triggerID}`, options);
    }
} //# sourceMappingURL=manage.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/trigger-instances/trigger-instances.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "TriggerInstances": (()=>TriggerInstances)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/resource.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$trigger$2d$instances$2f$handle$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/trigger-instances/handle.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$trigger$2d$instances$2f$manage$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/trigger-instances/manage.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/path.mjs [app-route] (ecmascript)");
;
;
;
;
;
;
class TriggerInstances extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIResource"] {
    constructor(){
        super(...arguments);
        this.handle = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$trigger$2d$instances$2f$handle$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Handle"](this._client);
        this.manage = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$trigger$2d$instances$2f$manage$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Manage"](this._client);
    }
    listActive(query = {}, options) {
        return this._client.get('/api/v3/trigger_instances/active', {
            query,
            ...options
        });
    }
    upsert(slug, body = {}, options) {
        return this._client.post(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/trigger_instances/${slug}/upsert`, {
            body,
            ...options
        });
    }
}
TriggerInstances.Handle = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$trigger$2d$instances$2f$handle$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Handle"];
TriggerInstances.Manage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$trigger$2d$instances$2f$manage$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Manage"]; //# sourceMappingURL=trigger-instances.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/triggers-types.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "TriggersTypes": (()=>TriggersTypes)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/resource.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/path.mjs [app-route] (ecmascript)");
;
;
class TriggersTypes extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$resource$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIResource"] {
    /**
     * Retrieve detailed information about a specific trigger type using its slug
     * identifier
     *
     * @example
     * ```ts
     * const triggersType = await client.triggersTypes.retrieve(
     *   'SLACK_NEW_MESSAGE',
     * );
     * ```
     */ retrieve(slug, options) {
        return this._client.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$path$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["path"]`/api/v3/triggers_types/${slug}`, options);
    }
    /**
     * Retrieve a list of available trigger types with optional filtering by toolkit.
     * Results are paginated and can be filtered by toolkit.
     *
     * @example
     * ```ts
     * const triggersTypes = await client.triggersTypes.list();
     * ```
     */ list(query = {}, options) {
        return this._client.get('/api/v3/triggers_types', {
            query,
            ...options
        });
    }
    /**
     * Retrieves a list of all available trigger type enum values that can be used
     * across the API
     *
     * @example
     * ```ts
     * const response = await client.triggersTypes.retrieveEnum();
     * ```
     */ retrieveEnum(options) {
        return this._client.get('/api/v3/triggers_types/list/enum', options);
    }
} //# sourceMappingURL=triggers-types.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/index.mjs [app-route] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$auth$2d$configs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/auth-configs.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$cli$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/cli.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$connected$2d$accounts$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/connected-accounts.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$files$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/files.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$mcp$2f$mcp$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/mcp/mcp.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$migration$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/migration.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$org$2f$org$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/org/org.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$team$2d$members$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/team-members.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$toolkits$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/toolkits.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$tools$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/tools.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$trigger$2d$instances$2f$trigger$2d$instances$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/trigger-instances/trigger-instances.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$triggers$2d$types$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/triggers-types.mjs [app-route] (ecmascript)"); //# sourceMappingURL=index.mjs.map
;
;
;
;
;
;
;
;
;
;
;
;
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/index.mjs [app-route] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$auth$2d$configs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/auth-configs.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$cli$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/cli.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$connected$2d$accounts$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/connected-accounts.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$files$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/files.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$mcp$2f$mcp$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/mcp/mcp.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$migration$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/migration.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$org$2f$org$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/org/org.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$team$2d$members$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/team-members.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$toolkits$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/toolkits.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$tools$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/tools.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$trigger$2d$instances$2f$trigger$2d$instances$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/trigger-instances/trigger-instances.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$triggers$2d$types$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/triggers-types.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/index.mjs [app-route] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/log.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "formatRequestDetails": (()=>formatRequestDetails),
    "loggerFor": (()=>loggerFor),
    "parseLogLevel": (()=>parseLogLevel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/values.mjs [app-route] (ecmascript)");
;
const levelNumbers = {
    off: 0,
    error: 200,
    warn: 300,
    info: 400,
    debug: 500
};
const parseLogLevel = (maybeLevel, sourceName, client)=>{
    if (!maybeLevel) {
        return undefined;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasOwn"])(levelNumbers, maybeLevel)) {
        return maybeLevel;
    }
    loggerFor(client).warn(`${sourceName} was set to ${JSON.stringify(maybeLevel)}, expected one of ${JSON.stringify(Object.keys(levelNumbers))}`);
    return undefined;
};
function noop() {}
function makeLogFn(fnLevel, logger, logLevel) {
    if (!logger || levelNumbers[fnLevel] > levelNumbers[logLevel]) {
        return noop;
    } else {
        // Don't wrap logger functions, we want the stacktrace intact!
        return logger[fnLevel].bind(logger);
    }
}
const noopLogger = {
    error: noop,
    warn: noop,
    info: noop,
    debug: noop
};
let cachedLoggers = /* @__PURE__ */ new WeakMap();
function loggerFor(client) {
    const logger = client.logger;
    const logLevel = client.logLevel ?? 'off';
    if (!logger) {
        return noopLogger;
    }
    const cachedLogger = cachedLoggers.get(logger);
    if (cachedLogger && cachedLogger[0] === logLevel) {
        return cachedLogger[1];
    }
    const levelLogger = {
        error: makeLogFn('error', logger, logLevel),
        warn: makeLogFn('warn', logger, logLevel),
        info: makeLogFn('info', logger, logLevel),
        debug: makeLogFn('debug', logger, logLevel)
    };
    cachedLoggers.set(logger, [
        logLevel,
        levelLogger
    ]);
    return levelLogger;
}
const formatRequestDetails = (details)=>{
    if (details.options) {
        details.options = {
            ...details.options
        };
        delete details.options['headers']; // redundant + leaks internals
    }
    if (details.headers) {
        details.headers = Object.fromEntries((details.headers instanceof Headers ? [
            ...details.headers
        ] : Object.entries(details.headers)).map(([name, value])=>[
                name,
                name.toLowerCase() === 'x-api-key' || name.toLowerCase() === 'authorization' || name.toLowerCase() === 'cookie' || name.toLowerCase() === 'set-cookie' ? '***' : value
            ]));
    }
    if ('retryOfRequestLogID' in details) {
        if (details.retryOfRequestLogID) {
            details.retryOf = details.retryOfRequestLogID;
        }
        delete details.retryOfRequestLogID;
    }
    return details;
}; //# sourceMappingURL=log.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/parse.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "defaultParseResponse": (()=>defaultParseResponse)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/log.mjs [app-route] (ecmascript)");
;
async function defaultParseResponse(client, props) {
    const { response, requestLogID, retryOfRequestLogID, startTime } = props;
    const body = await (async ()=>{
        // fetch refuses to read the body when the status code is 204.
        if (response.status === 204) {
            return null;
        }
        if (props.options.__binaryResponse) {
            return response;
        }
        const contentType = response.headers.get('content-type');
        const mediaType = contentType?.split(';')[0]?.trim();
        const isJSON = mediaType?.includes('application/json') || mediaType?.endsWith('+json');
        if (isJSON) {
            const json = await response.json();
            return json;
        }
        const text = await response.text();
        return text;
    })();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(client).debug(`[${requestLogID}] response parsed`, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatRequestDetails"])({
        retryOfRequestLogID,
        url: response.url,
        status: response.status,
        body,
        durationMs: Date.now() - startTime
    }));
    return body;
} //# sourceMappingURL=parse.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/api-promise.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "APIPromise": (()=>APIPromise)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/tslib.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$parse$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/parse.mjs [app-route] (ecmascript)");
var _APIPromise_client;
;
;
class APIPromise extends Promise {
    constructor(client, responsePromise, parseResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$parse$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultParseResponse"]){
        super((resolve)=>{
            // this is maybe a bit weird but this has to be a no-op to not implicitly
            // parse the response body; instead .then, .catch, .finally are overridden
            // to parse the response
            resolve(null);
        });
        this.responsePromise = responsePromise;
        this.parseResponse = parseResponse;
        _APIPromise_client.set(this, void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _APIPromise_client, client, "f");
    }
    _thenUnwrap(transform) {
        return new APIPromise((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _APIPromise_client, "f"), this.responsePromise, async (client, props)=>transform(await this.parseResponse(client, props), props));
    }
    /**
     * Gets the raw `Response` instance instead of parsing the response
     * data.
     *
     * If you want to parse the response body but still get the `Response`
     * instance, you can use {@link withResponse()}.
     *
     * 👋 Getting the wrong TypeScript type for `Response`?
     * Try setting `"moduleResolution": "NodeNext"` or add `"lib": ["DOM"]`
     * to your `tsconfig.json`.
     */ asResponse() {
        return this.responsePromise.then((p)=>p.response);
    }
    /**
     * Gets the parsed response data and the raw `Response` instance.
     *
     * If you just want to get the raw `Response` instance without parsing it,
     * you can use {@link asResponse()}.
     *
     * 👋 Getting the wrong TypeScript type for `Response`?
     * Try setting `"moduleResolution": "NodeNext"` or add `"lib": ["DOM"]`
     * to your `tsconfig.json`.
     */ async withResponse() {
        const [data, response] = await Promise.all([
            this.parse(),
            this.asResponse()
        ]);
        return {
            data,
            response
        };
    }
    parse() {
        if (!this.parsedPromise) {
            this.parsedPromise = this.responsePromise.then((data)=>this.parseResponse((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _APIPromise_client, "f"), data));
        }
        return this.parsedPromise;
    }
    then(onfulfilled, onrejected) {
        return this.parse().then(onfulfilled, onrejected);
    }
    catch(onrejected) {
        return this.parse().catch(onrejected);
    }
    finally(onfinally) {
        return this.parse().finally(onfinally);
    }
}
_APIPromise_client = new WeakMap(); //# sourceMappingURL=api-promise.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/env.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
/**
 * Read an environment variable.
 *
 * Trims beginning and trailing whitespace.
 *
 * Will return undefined if the environment variable doesn't exist or cannot be accessed.
 */ __turbopack_context__.s({
    "readEnv": (()=>readEnv)
});
const readEnv = (env)=>{
    if (typeof globalThis.process !== 'undefined') {
        return globalThis.process.env?.[env]?.trim() ?? undefined;
    }
    if (typeof globalThis.Deno !== 'undefined') {
        return globalThis.Deno.env?.get?.(env)?.trim();
    }
    return undefined;
}; //# sourceMappingURL=env.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/client.mjs [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({
    "Composio": (()=>Composio)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/tslib.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$uuid$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/uuid.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/values.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$sleep$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/sleep.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/errors.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$detect$2d$platform$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/detect-platform.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$shims$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/shims.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$request$2d$options$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/request-options.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/qs/index.mjs [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$stringify$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/qs/stringify.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$version$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/version.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/error.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$uploads$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/uploads.mjs [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$to$2d$file$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/to-file.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/index.mjs [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$auth$2d$configs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/auth-configs.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$connected$2d$accounts$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/connected-accounts.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$org$2f$org$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/org/org.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$team$2d$members$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/team-members.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$toolkits$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/toolkits.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$tools$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/tools.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$trigger$2d$instances$2f$trigger$2d$instances$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/trigger-instances/trigger-instances.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$triggers$2d$types$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/triggers-types.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$mcp$2f$mcp$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/mcp/mcp.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$files$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/files.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$migration$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/migration.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$cli$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/resources/cli.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$api$2d$promise$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/api-promise.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$headers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/headers.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$env$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/env.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/internal/utils/log.mjs [app-route] (ecmascript)");
var _Composio_instances, _a, _Composio_encoder, _Composio_baseURLOverridden;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const environments = {
    production: 'https://backend.composio.dev',
    staging: 'https://staging-backend.composio.dev',
    local: 'http://localhost:9900'
};
class Composio {
    /**
     * API Client for interfacing with the Composio API.
     *
     * @param {string | null | undefined} [opts.apiKey=process.env['COMPOSIO_API_KEY'] ?? null]
     * @param {Environment} [opts.environment=production] - Specifies the environment URL to use for the API.
     * @param {string} [opts.baseURL=process.env['COMPOSIO_BASE_URL'] ?? https://backend.composio.dev] - Override the default base URL for the API.
     * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
     * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
     * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
     * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
     * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
     * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
     */ constructor({ baseURL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$env$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readEnv"])('COMPOSIO_BASE_URL'), apiKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$env$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readEnv"])('COMPOSIO_API_KEY') ?? null, ...opts } = {}){
        _Composio_instances.add(this);
        _Composio_encoder.set(this, void 0);
        this.authConfigs = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$auth$2d$configs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthConfigs"](this);
        this.connectedAccounts = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$connected$2d$accounts$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConnectedAccounts"](this);
        this.org = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$org$2f$org$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Org"](this);
        this.teamMembers = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$team$2d$members$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TeamMembers"](this);
        this.toolkits = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$toolkits$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Toolkits"](this);
        this.tools = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$tools$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Tools"](this);
        this.triggerInstances = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$trigger$2d$instances$2f$trigger$2d$instances$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TriggerInstances"](this);
        this.triggersTypes = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$triggers$2d$types$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TriggersTypes"](this);
        this.mcp = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$mcp$2f$mcp$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Mcp"](this);
        this.files = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$files$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Files"](this);
        this.migration = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$migration$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Migration"](this);
        this.cli = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$cli$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Cli"](this);
        const options = {
            apiKey,
            ...opts,
            baseURL,
            environment: opts.environment ?? 'production'
        };
        if (baseURL && opts.environment) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ComposioError"]('Ambiguous URL; The `baseURL` option (or COMPOSIO_BASE_URL env var) and the `environment` option are given. If you want to use the environment you must pass baseURL: null');
        }
        this.baseURL = options.baseURL || environments[options.environment || 'production'];
        this.timeout = options.timeout ?? _a.DEFAULT_TIMEOUT /* 1 minute */ ;
        this.logger = options.logger ?? console;
        const defaultLogLevel = 'warn';
        // Set default logLevel early so that we can log a warning in parseLogLevel.
        this.logLevel = defaultLogLevel;
        this.logLevel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseLogLevel"])(options.logLevel, 'ClientOptions.logLevel', this) ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseLogLevel"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$env$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readEnv"])('COMPOSIO_LOG'), "process.env['COMPOSIO_LOG']", this) ?? defaultLogLevel;
        this.fetchOptions = options.fetchOptions;
        this.maxRetries = options.maxRetries ?? 2;
        this.fetch = options.fetch ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$shims$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultFetch"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _Composio_encoder, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$request$2d$options$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FallbackEncoder"], "f");
        this._options = options;
        this.apiKey = apiKey;
    }
    /**
     * Create a new client instance re-using the same options given to the current client with optional overriding.
     */ withOptions(options) {
        return new this.constructor({
            ...this._options,
            environment: options.environment ? options.environment : undefined,
            baseURL: options.environment ? undefined : this.baseURL,
            maxRetries: this.maxRetries,
            timeout: this.timeout,
            logger: this.logger,
            logLevel: this.logLevel,
            fetch: this.fetch,
            fetchOptions: this.fetchOptions,
            apiKey: this.apiKey,
            ...options
        });
    }
    defaultQuery() {
        return this._options.defaultQuery;
    }
    validateHeaders({ values, nulls }) {
        return;
    }
    authHeaders(opts) {
        if (this.apiKey == null) {
            return undefined;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$headers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildHeaders"])([
            {
                'x-api-key': this.apiKey
            }
        ]);
    }
    stringifyQuery(query) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$qs$2f$stringify$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stringify"])(query, {
            arrayFormat: 'comma'
        });
    }
    getUserAgent() {
        return `${this.constructor.name}/JS ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$version$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["VERSION"]}`;
    }
    defaultIdempotencyKey() {
        return `stainless-node-retry-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$uuid$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uuid4"])()}`;
    }
    makeStatusError(status, error, message, headers) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"].generate(status, error, message, headers);
    }
    buildURL(path, query, defaultBaseURL) {
        const baseURL = !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _Composio_instances, "m", _Composio_baseURLOverridden).call(this) && defaultBaseURL || this.baseURL;
        const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAbsoluteURL"])(path) ? new URL(path) : new URL(baseURL + (baseURL.endsWith('/') && path.startsWith('/') ? path.slice(1) : path));
        const defaultQuery = this.defaultQuery();
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isEmptyObj"])(defaultQuery)) {
            query = {
                ...defaultQuery,
                ...query
            };
        }
        if (typeof query === 'object' && query && !Array.isArray(query)) {
            url.search = this.stringifyQuery(query);
        }
        return url.toString();
    }
    /**
     * Used as a callback for mutating the given `FinalRequestOptions` object.
     */ async prepareOptions(options) {}
    /**
     * Used as a callback for mutating the given `RequestInit` object.
     *
     * This is useful for cases where you want to add certain headers based off of
     * the request properties, e.g. `method` or `url`.
     */ async prepareRequest(request, { url, options }) {}
    get(path, opts) {
        return this.methodRequest('get', path, opts);
    }
    post(path, opts) {
        return this.methodRequest('post', path, opts);
    }
    patch(path, opts) {
        return this.methodRequest('patch', path, opts);
    }
    put(path, opts) {
        return this.methodRequest('put', path, opts);
    }
    delete(path, opts) {
        return this.methodRequest('delete', path, opts);
    }
    methodRequest(method, path, opts) {
        return this.request(Promise.resolve(opts).then((opts)=>{
            return {
                method,
                path,
                ...opts
            };
        }));
    }
    request(options, remainingRetries = null) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$api$2d$promise$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIPromise"](this, this.makeRequest(options, remainingRetries, undefined));
    }
    async makeRequest(optionsInput, retriesRemaining, retryOfRequestLogID) {
        const options = await optionsInput;
        const maxRetries = options.maxRetries ?? this.maxRetries;
        if (retriesRemaining == null) {
            retriesRemaining = maxRetries;
        }
        await this.prepareOptions(options);
        const { req, url, timeout } = this.buildRequest(options, {
            retryCount: maxRetries - retriesRemaining
        });
        await this.prepareRequest(req, {
            url,
            options
        });
        /** Not an API request ID, just for correlating local log entries. */ const requestLogID = 'log_' + (Math.random() * (1 << 24) | 0).toString(16).padStart(6, '0');
        const retryLogStr = retryOfRequestLogID === undefined ? '' : `, retryOf: ${retryOfRequestLogID}`;
        const startTime = Date.now();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(this).debug(`[${requestLogID}] sending request`, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatRequestDetails"])({
            retryOfRequestLogID,
            method: options.method,
            url,
            options,
            headers: req.headers
        }));
        if (options.signal?.aborted) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIUserAbortError"]();
        }
        const controller = new AbortController();
        const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["castToError"]);
        const headersTime = Date.now();
        if (response instanceof Error) {
            const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
            if (options.signal?.aborted) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIUserAbortError"]();
            }
            // detect native connection timeout errors
            // deno throws "TypeError: error sending request for url (https://example/): client error (Connect): tcp connect error: Operation timed out (os error 60): Operation timed out (os error 60)"
            // undici throws "TypeError: fetch failed" with cause "ConnectTimeoutError: Connect Timeout Error (attempted address: example:443, timeout: 1ms)"
            // others do not provide enough information to distinguish timeouts from other connection errors
            const isTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAbortError"])(response) || /timed? ?out/i.test(String(response) + ('cause' in response ? String(response.cause) : ''));
            if (retriesRemaining) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(this).info(`[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - ${retryMessage}`);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(this).debug(`[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (${retryMessage})`, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatRequestDetails"])({
                    retryOfRequestLogID,
                    url,
                    durationMs: headersTime - startTime,
                    message: response.message
                }));
                return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID);
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(this).info(`[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - error; no more retries left`);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(this).debug(`[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (error; no more retries left)`, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatRequestDetails"])({
                retryOfRequestLogID,
                url,
                durationMs: headersTime - startTime,
                message: response.message
            }));
            if (isTimeout) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIConnectionTimeoutError"]();
            }
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIConnectionError"]({
                cause: response
            });
        }
        const responseInfo = `[${requestLogID}${retryLogStr}] ${req.method} ${url} ${response.ok ? 'succeeded' : 'failed'} with status ${response.status} in ${headersTime - startTime}ms`;
        if (!response.ok) {
            const shouldRetry = this.shouldRetry(response);
            if (retriesRemaining && shouldRetry) {
                const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
                // We don't need the body of this response.
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$shims$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CancelReadableStream"])(response.body);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(this).info(`${responseInfo} - ${retryMessage}`);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(this).debug(`[${requestLogID}] response error (${retryMessage})`, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatRequestDetails"])({
                    retryOfRequestLogID,
                    url: response.url,
                    status: response.status,
                    headers: response.headers,
                    durationMs: headersTime - startTime
                }));
                return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID, response.headers);
            }
            const retryMessage = shouldRetry ? `error; no more retries left` : `error; not retryable`;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(this).info(`${responseInfo} - ${retryMessage}`);
            const errText = await response.text().catch((err)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["castToError"])(err).message);
            const errJSON = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["safeJSON"])(errText);
            const errMessage = errJSON ? undefined : errText;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(this).debug(`[${requestLogID}] response error (${retryMessage})`, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatRequestDetails"])({
                retryOfRequestLogID,
                url: response.url,
                status: response.status,
                headers: response.headers,
                message: errMessage,
                durationMs: Date.now() - startTime
            }));
            const err = this.makeStatusError(response.status, errJSON, errMessage, response.headers);
            throw err;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(this).info(responseInfo);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(this).debug(`[${requestLogID}] response start`, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatRequestDetails"])({
            retryOfRequestLogID,
            url: response.url,
            status: response.status,
            headers: response.headers,
            durationMs: headersTime - startTime
        }));
        return {
            response,
            options,
            controller,
            requestLogID,
            retryOfRequestLogID,
            startTime
        };
    }
    async fetchWithTimeout(url, init, ms, controller) {
        const { signal, method, ...options } = init || {};
        if (signal) signal.addEventListener('abort', ()=>controller.abort());
        const timeout = setTimeout(()=>controller.abort(), ms);
        const isReadableBody = globalThis.ReadableStream && options.body instanceof globalThis.ReadableStream || typeof options.body === 'object' && options.body !== null && Symbol.asyncIterator in options.body;
        const fetchOptions = {
            signal: controller.signal,
            ...isReadableBody ? {
                duplex: 'half'
            } : {},
            method: 'GET',
            ...options
        };
        if (method) {
            // Custom methods like 'patch' need to be uppercased
            // See https://github.com/nodejs/undici/issues/2294
            fetchOptions.method = method.toUpperCase();
        }
        try {
            // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
            return await this.fetch.call(undefined, url, fetchOptions);
        } finally{
            clearTimeout(timeout);
        }
    }
    shouldRetry(response) {
        // Note this is not a standard header.
        const shouldRetryHeader = response.headers.get('x-should-retry');
        // If the server explicitly says whether or not to retry, obey.
        if (shouldRetryHeader === 'true') return true;
        if (shouldRetryHeader === 'false') return false;
        // Retry on request timeouts.
        if (response.status === 408) return true;
        // Retry on lock timeouts.
        if (response.status === 409) return true;
        // Retry on rate limits.
        if (response.status === 429) return true;
        // Retry internal errors.
        if (response.status >= 500) return true;
        return false;
    }
    async retryRequest(options, retriesRemaining, requestLogID, responseHeaders) {
        let timeoutMillis;
        // Note the `retry-after-ms` header may not be standard, but is a good idea and we'd like proactive support for it.
        const retryAfterMillisHeader = responseHeaders?.get('retry-after-ms');
        if (retryAfterMillisHeader) {
            const timeoutMs = parseFloat(retryAfterMillisHeader);
            if (!Number.isNaN(timeoutMs)) {
                timeoutMillis = timeoutMs;
            }
        }
        // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
        const retryAfterHeader = responseHeaders?.get('retry-after');
        if (retryAfterHeader && !timeoutMillis) {
            const timeoutSeconds = parseFloat(retryAfterHeader);
            if (!Number.isNaN(timeoutSeconds)) {
                timeoutMillis = timeoutSeconds * 1000;
            } else {
                timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
            }
        }
        // If the API asks us to wait a certain amount of time (and it's a reasonable amount),
        // just do what it says, but otherwise calculate a default
        if (!(timeoutMillis && 0 <= timeoutMillis && timeoutMillis < 60 * 1000)) {
            const maxRetries = options.maxRetries ?? this.maxRetries;
            timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$sleep$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sleep"])(timeoutMillis);
        return this.makeRequest(options, retriesRemaining - 1, requestLogID);
    }
    calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries) {
        const initialRetryDelay = 0.5;
        const maxRetryDelay = 8.0;
        const numRetries = maxRetries - retriesRemaining;
        // Apply exponential backoff, but not more than the max.
        const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);
        // Apply some jitter, take up to at most 25 percent of the retry time.
        const jitter = 1 - Math.random() * 0.25;
        return sleepSeconds * jitter * 1000;
    }
    buildRequest(inputOptions, { retryCount = 0 } = {}) {
        const options = {
            ...inputOptions
        };
        const { method, path, query, defaultBaseURL } = options;
        const url = this.buildURL(path, query, defaultBaseURL);
        if ('timeout' in options) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validatePositiveInteger"])('timeout', options.timeout);
        options.timeout = options.timeout ?? this.timeout;
        const { bodyHeaders, body } = this.buildBody({
            options
        });
        const reqHeaders = this.buildHeaders({
            options: inputOptions,
            method,
            bodyHeaders,
            retryCount
        });
        const req = {
            method,
            headers: reqHeaders,
            ...options.signal && {
                signal: options.signal
            },
            ...globalThis.ReadableStream && body instanceof globalThis.ReadableStream && {
                duplex: 'half'
            },
            ...body && {
                body
            },
            ...this.fetchOptions ?? {},
            ...options.fetchOptions ?? {}
        };
        return {
            req,
            url,
            timeout: options.timeout
        };
    }
    buildHeaders({ options, method, bodyHeaders, retryCount }) {
        let idempotencyHeaders = {};
        if (this.idempotencyHeader && method !== 'get') {
            if (!options.idempotencyKey) options.idempotencyKey = this.defaultIdempotencyKey();
            idempotencyHeaders[this.idempotencyHeader] = options.idempotencyKey;
        }
        const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$headers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildHeaders"])([
            idempotencyHeaders,
            {
                Accept: 'application/json',
                'User-Agent': this.getUserAgent(),
                'X-Stainless-Retry-Count': String(retryCount),
                ...options.timeout ? {
                    'X-Stainless-Timeout': String(Math.trunc(options.timeout / 1000))
                } : {},
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$detect$2d$platform$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPlatformHeaders"])()
            },
            this.authHeaders(options),
            this._options.defaultHeaders,
            bodyHeaders,
            options.headers
        ]);
        this.validateHeaders(headers);
        return headers.values;
    }
    buildBody({ options: { body, headers: rawHeaders } }) {
        if (!body) {
            return {
                bodyHeaders: undefined,
                body: undefined
            };
        }
        const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$headers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildHeaders"])([
            rawHeaders
        ]);
        if (// Pass raw type verbatim
        ArrayBuffer.isView(body) || body instanceof ArrayBuffer || body instanceof DataView || typeof body === 'string' && // Preserve legacy string encoding behavior for now
        headers.values.has('content-type') || // `Blob` is superset of `File`
        body instanceof Blob || // `FormData` -> `multipart/form-data`
        body instanceof FormData || // `URLSearchParams` -> `application/x-www-form-urlencoded`
        body instanceof URLSearchParams || globalThis.ReadableStream && body instanceof globalThis.ReadableStream) {
            return {
                bodyHeaders: undefined,
                body: body
            };
        } else if (typeof body === 'object' && (Symbol.asyncIterator in body || Symbol.iterator in body && 'next' in body && typeof body.next === 'function')) {
            return {
                bodyHeaders: undefined,
                body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$shims$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReadableStreamFrom"])(body)
            };
        } else {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _Composio_encoder, "f").call(this, {
                body,
                headers
            });
        }
    }
}
_a = Composio, _Composio_encoder = new WeakMap(), _Composio_instances = new WeakSet(), _Composio_baseURLOverridden = function _Composio_baseURLOverridden() {
    return this.baseURL !== environments[this._options.environment || 'production'];
};
Composio.Composio = _a;
Composio.DEFAULT_TIMEOUT = 60000; // 1 minute
Composio.ComposioError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ComposioError"];
Composio.APIError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"];
Composio.APIConnectionError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIConnectionError"];
Composio.APIConnectionTimeoutError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIConnectionTimeoutError"];
Composio.APIUserAbortError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIUserAbortError"];
Composio.NotFoundError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NotFoundError"];
Composio.ConflictError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConflictError"];
Composio.RateLimitError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RateLimitError"];
Composio.BadRequestError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BadRequestError"];
Composio.AuthenticationError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthenticationError"];
Composio.InternalServerError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InternalServerError"];
Composio.PermissionDeniedError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PermissionDeniedError"];
Composio.UnprocessableEntityError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UnprocessableEntityError"];
Composio.toFile = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$internal$2f$to$2d$file$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toFile"];
Composio.AuthConfigs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$auth$2d$configs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthConfigs"];
Composio.ConnectedAccounts = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$connected$2d$accounts$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConnectedAccounts"];
Composio.Org = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$org$2f$org$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Org"];
Composio.TeamMembers = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$team$2d$members$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TeamMembers"];
Composio.Toolkits = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$toolkits$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Toolkits"];
Composio.Tools = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$tools$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Tools"];
Composio.TriggerInstances = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$trigger$2d$instances$2f$trigger$2d$instances$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TriggerInstances"];
Composio.TriggersTypes = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$triggers$2d$types$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TriggersTypes"];
Composio.Mcp = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$mcp$2f$mcp$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Mcp"];
Composio.Files = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$files$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Files"];
Composio.Migration = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$migration$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Migration"];
Composio.Cli = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$resources$2f$cli$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Cli"]; //# sourceMappingURL=client.mjs.map
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/index.mjs [app-route] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/client.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$uploads$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/uploads.mjs [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$api$2d$promise$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/api-promise.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/error.mjs [app-route] (ecmascript)"); //# sourceMappingURL=index.mjs.map
;
;
;
;
;
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/index.mjs [app-route] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/client.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$uploads$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/uploads.mjs [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$api$2d$promise$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/api-promise.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/core/error.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/index.mjs [app-route] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/client.mjs [app-route] (ecmascript) <export Composio as default>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Composio"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$composio$2b$client$40$0$2e$1$2e$0$2d$alpha$2e$27$2f$node_modules$2f40$composio$2f$client$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@composio+client@0.1.0-alpha.27/node_modules/@composio/client/client.mjs [app-route] (ecmascript)");
}}),

};

//# sourceMappingURL=04763_%40composio_client_d8e70d34._.js.map