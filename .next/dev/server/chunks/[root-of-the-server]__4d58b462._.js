module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/search/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const WP_API_BASE = "https://dir.lascrucesdirectory.com/wp-json/geodir/v2";
async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '10');
    if (!query || query.length < 2) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            results: []
        });
    }
    try {
        const endpoints = [
            {
                type: 'restaurant',
                label: 'Restaurant',
                url: `${WP_API_BASE}/restaurant?search=${encodeURIComponent(query)}&per_page=${limit}`
            },
            {
                type: 'business',
                label: 'Business',
                url: `${WP_API_BASE}/business?search=${encodeURIComponent(query)}&per_page=${limit}`
            },
            {
                type: 'accommodation',
                label: 'Accommodation',
                url: `${WP_API_BASE}/accommodation?search=${encodeURIComponent(query)}&per_page=${limit}`
            },
            {
                type: 'places',
                label: 'Place',
                url: `${WP_API_BASE}/places?search=${encodeURIComponent(query)}&per_page=${limit}`
            }
        ];
        const responses = await Promise.all(endpoints.map(async ({ type, label, url })=>{
            try {
                const res = await fetch(url, {
                    next: {
                        revalidate: 300
                    }
                });
                if (!res.ok) return [];
                const data = await res.json();
                return data.map((item)=>({
                        id: item.id,
                        slug: item.slug,
                        title: decodeHtmlEntities(item.title?.rendered || item.title || ''),
                        type,
                        typeLabel: label,
                        city: item.city || item.location?.city,
                        category: item.post_category?.[0]?.name?.replace(/&amp;/g, '&'),
                        image: getListingImage(item)
                    }));
            } catch  {
                return [];
            }
        }));
        const allResults = [];
        const perTypeLimit = Math.ceil(limit / 4);
        responses.forEach((typeResults)=>{
            allResults.push(...typeResults.slice(0, perTypeLimit));
        });
        const sortedResults = allResults.slice(0, limit);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            results: sortedResults
        });
    } catch (error) {
        console.error('Search error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            results: [],
            error: 'Search failed'
        }, {
            status: 500
        });
    }
}
function decodeHtmlEntities(text) {
    const entities = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#039;": "'",
        "&#8217;": "'",
        "&#8216;": "'",
        "&#8220;": '"',
        "&#8221;": '"',
        "&#038;": "&"
    };
    return text.replace(/&[#a-z0-9]+;/gi, (match)=>entities[match] || match);
}
function getListingImage(listing) {
    if (listing.featured_image?.src) {
        return `/api/image-proxy?url=${encodeURIComponent(listing.featured_image.src)}`;
    }
    if (listing.images?.[0]?.src) {
        return `/api/image-proxy?url=${encodeURIComponent(listing.images[0].src)}`;
    }
    return undefined;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4d58b462._.js.map