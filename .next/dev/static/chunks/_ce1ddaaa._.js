(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/ArchiveFilters.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArchiveFilters",
    ()=>ArchiveFilters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ArchiveFilters({ categories, type }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(searchParams.get('search') || '');
    const [showCategories, setShowCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const selectedCategory = searchParams.get('category') || '';
    const handleSearchChange = (value)=>{
        setSearchTerm(value);
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set('search', value);
        } else {
            params.delete('search');
        }
        router.push(`/${type}?${params.toString()}`);
    };
    const handleCategoryClick = (categoryId)=>{
        const params = new URLSearchParams(searchParams.toString());
        if (selectedCategory === categoryId.toString()) {
            params.delete('category');
        } else {
            params.set('category', categoryId.toString());
        }
        router.push(`/${type}?${params.toString()}`);
    };
    const clearFilters = ()=>{
        setSearchTerm('');
        router.push(`/${type}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-12 space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative max-w-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                        className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/app/components/ArchiveFilters.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: searchTerm,
                        onChange: (e)=>handleSearchChange(e.target.value),
                        placeholder: "Search listings...",
                        className: "w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                    }, void 0, false, {
                        fileName: "[project]/app/components/ArchiveFilters.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/ArchiveFilters.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            categories.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowCategories(!showCategories),
                        className: "flex items-center gap-2 text-slate-700 font-medium hover:text-emerald-600 transition-colors mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Filter by Category"
                            }, void 0, false, {
                                fileName: "[project]/app/components/ArchiveFilters.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this),
                            showCategories ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/app/components/ArchiveFilters.tsx",
                                lineNumber: 67,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/app/components/ArchiveFilters.tsx",
                                lineNumber: 69,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/ArchiveFilters.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    showCategories && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-3 animate-in fade-in slide-in-from-top-2 duration-200",
                        children: categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleCategoryClick(category.id.toString()),
                                className: `px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category.id.toString() ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-600'}`,
                                children: category.name
                            }, category.id, false, {
                                fileName: "[project]/app/components/ArchiveFilters.tsx",
                                lineNumber: 76,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/ArchiveFilters.tsx",
                        lineNumber: 74,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/ArchiveFilters.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this),
            (searchTerm || selectedCategory) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-slate-600",
                        children: "Active filters:"
                    }, void 0, false, {
                        fileName: "[project]/app/components/ArchiveFilters.tsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this),
                    searchTerm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium",
                        children: [
                            "Search: ",
                            searchTerm
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/ArchiveFilters.tsx",
                        lineNumber: 97,
                        columnNumber: 13
                    }, this),
                    selectedCategory && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium",
                        children: categories.find((c)=>c.id.toString() === selectedCategory)?.name
                    }, void 0, false, {
                        fileName: "[project]/app/components/ArchiveFilters.tsx",
                        lineNumber: 102,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: clearFilters,
                        className: "text-sm text-slate-600 hover:text-emerald-600 underline",
                        children: "Clear all"
                    }, void 0, false, {
                        fileName: "[project]/app/components/ArchiveFilters.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/ArchiveFilters.tsx",
                lineNumber: 94,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/ArchiveFilters.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_s(ArchiveFilters, "tW990SWJopiBPQypcSrD3UoQWjI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = ArchiveFilters;
var _c;
__turbopack_context__.k.register(_c, "ArchiveFilters");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/wordpress.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decodeHtmlEntities",
    ()=>decodeHtmlEntities,
    "getAllListingImages",
    ()=>getAllListingImages,
    "getBlogPostImage",
    ()=>getBlogPostImage,
    "getCachedArchiveData",
    ()=>getCachedArchiveData,
    "getCachedBlogPostBySlug",
    ()=>getCachedBlogPostBySlug,
    "getCachedBlogPosts",
    ()=>getCachedBlogPosts,
    "getCachedHomePageData",
    ()=>getCachedHomePageData,
    "getCachedListingBySlug",
    ()=>getCachedListingBySlug,
    "getListingImage",
    ()=>getListingImage,
    "isListingClaimed",
    ()=>isListingClaimed,
    "isListingFeatured",
    ()=>isListingFeatured,
    "wordpressAPI",
    ()=>wordpressAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
const WP_API_BASE = "https://dir.lascrucesdirectory.com/wp-json/geodir/v2";
const WP_POSTS_API = "https://dir.lascrucesdirectory.com/wp-json/wp/v2";
const WP_GRAPHQL_API = "https://dir.lascrucesdirectory.com/graphql";
const CACHE_REVALIDATE = 3600;
async function fetchWp(url, options = {}) {
    // For server-side rendering, bypass the proxy and fetch directly
    // The CORS restriction only applies to browser requests
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // For client-side requests, use the proxy to avoid CORS
    const urlObj = new URL(url);
    const pathAndQuery = urlObj.pathname + urlObj.search;
    const proxiedUrl = `/api/wp-proxy?path=${encodeURIComponent(pathAndQuery)}`;
    return fetch(proxiedUrl, options);
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
function isListingClaimed(listing) {
    if (typeof listing.claimed === "boolean") return listing.claimed;
    if (typeof listing.claimed === "object" && listing.claimed?.raw) {
        return listing.claimed.raw === "1" || listing.claimed.raw === 1 || listing.claimed.raw === true;
    }
    return listing.claimed === "1" || listing.claimed === 1 || listing.claimed === true;
}
function isListingFeatured(listing) {
    return listing.featured === true || listing.featured === 1 || listing.featured === "1";
}
const DEFAULT_IMAGES = {
    restaurant: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
    business: "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800",
    accommodation: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
    places: "https://images.pexels.com/photos/2739664/pexels-photo-2739664.jpeg?auto=compress&cs=tinysrgb&w=800",
    blog: "https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=800"
};
function proxyImageUrl(url) {
    if (!url) return url;
    if (url.startsWith("https://dir.lascrucesdirectory.com/")) {
        return `/api/image-proxy?url=${encodeURIComponent(url)}`;
    }
    return url;
}
function getAllListingImages(listing, defaultType = "business") {
    const imageSet = new Set();
    if (listing.featured_image && typeof listing.featured_image === "object" && listing.featured_image.src) {
        imageSet.add(proxyImageUrl(listing.featured_image.src));
    }
    if (Array.isArray(listing.images) && listing.images.length > 0) {
        listing.images.forEach((img)=>{
            if (img?.src) {
                imageSet.add(proxyImageUrl(img.src));
            }
        });
    }
    if (listing._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
        const url = listing._embedded["wp:featuredmedia"][0].source_url;
        imageSet.add(proxyImageUrl(url));
    }
    const images = Array.from(imageSet);
    if (images.length === 0) {
        images.push(DEFAULT_IMAGES[defaultType]);
    }
    return images;
}
function getListingImage(listing, defaultType = "business") {
    let imageUrl;
    if (listing.featured_image && typeof listing.featured_image === "object" && listing.featured_image.src) {
        imageUrl = listing.featured_image.src;
        return proxyImageUrl(imageUrl);
    }
    if (Array.isArray(listing.images) && listing.images.length > 0 && listing.images[0]?.src) {
        imageUrl = listing.images[0].src;
        return proxyImageUrl(imageUrl);
    }
    if (listing._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
        imageUrl = listing._embedded["wp:featuredmedia"][0].source_url;
        return proxyImageUrl(imageUrl);
    }
    if (listing._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium?.source_url) {
        imageUrl = listing._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
        return proxyImageUrl(imageUrl);
    }
    imageUrl = DEFAULT_IMAGES[defaultType];
    return imageUrl;
}
function getBlogPostImage(post) {
    if (post._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
        return proxyImageUrl(post._embedded["wp:featuredmedia"][0].source_url);
    }
    if (post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium?.source_url) {
        return proxyImageUrl(post._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
    }
    return DEFAULT_IMAGES.blog;
}
// GraphQL query helper
async function fetchGraphQL(query, variables = {}) {
    try {
        const response = await fetch(WP_GRAPHQL_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query,
                variables
            }),
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) throw new Error("GraphQL request failed");
        const json = await response.json();
        if (json.errors) {
            console.error("GraphQL errors:", json.errors);
            throw new Error(json.errors[0]?.message || "GraphQL query failed");
        }
        return json.data;
    } catch (error) {
        console.error("GraphQL fetch error:", error);
        throw error;
    }
}
const wordpressAPI = {
    async getRestaurants (limit = 3, category, searchQuery) {
        try {
            let url = `${WP_API_BASE}/restaurant?per_page=${limit}&_embed`;
            if (category) {
                url += `&gd_restaurantcategory=${category}`;
            }
            if (searchQuery) {
                url += `&search=${encodeURIComponent(searchQuery)}`;
            }
            const response = await fetchWp(url, {
                next: {
                    revalidate: 3600
                }
            });
            if (!response.ok) throw new Error("Failed to fetch restaurants");
            return await response.json();
        } catch (error) {
            console.error("Error fetching restaurants:", error);
            return [];
        }
    },
    async getRestaurantCategories () {
        try {
            const response = await fetchWp(`${WP_API_BASE}/restaurant/categories?per_page=100`, {
                next: {
                    revalidate: 3600
                }
            });
            if (!response.ok) throw new Error("Failed to fetch restaurant categories");
            const categories = await response.json();
            return categories.filter((cat)=>cat.count > 0);
        } catch (error) {
            console.error("Error fetching restaurant categories:", error);
            return [];
        }
    },
    async getBusinesses (limit = 3, category, searchQuery) {
        try {
            let url = `${WP_API_BASE}/business?per_page=${limit}&_embed`;
            if (category) {
                url += `&gd_businesscategory=${category}`;
            }
            if (searchQuery) {
                url += `&search=${encodeURIComponent(searchQuery)}`;
            }
            const response = await fetchWp(url, {
                next: {
                    revalidate: 3600
                }
            });
            if (!response.ok) throw new Error("Failed to fetch businesses");
            return await response.json();
        } catch (error) {
            console.error("Error fetching businesses:", error);
            return [];
        }
    },
    async getBusinessCategories () {
        try {
            const response = await fetchWp(`${WP_API_BASE}/business/categories?per_page=100`, {
                next: {
                    revalidate: 3600
                }
            });
            if (!response.ok) throw new Error("Failed to fetch business categories");
            const categories = await response.json();
            return categories.filter((cat)=>cat.count > 0);
        } catch (error) {
            console.error("Error fetching business categories:", error);
            return [];
        }
    },
    async getAccommodations (limit = 3, category, searchQuery) {
        try {
            let url = `${WP_API_BASE}/accommodation?per_page=${limit}&_embed`;
            if (category) {
                url += `&gd_accommodationcategory=${category}`;
            }
            if (searchQuery) {
                url += `&search=${encodeURIComponent(searchQuery)}`;
            }
            const response = await fetchWp(url, {
                next: {
                    revalidate: 3600
                }
            });
            if (!response.ok) throw new Error("Failed to fetch accommodations");
            return await response.json();
        } catch (error) {
            console.error("Error fetching accommodations:", error);
            return [];
        }
    },
    async getAccommodationCategories () {
        try {
            const response = await fetchWp(`${WP_API_BASE}/accommodation/categories?per_page=100`, {
                next: {
                    revalidate: 3600
                }
            });
            if (!response.ok) throw new Error("Failed to fetch accommodation categories");
            const categories = await response.json();
            return categories.filter((cat)=>cat.count > 0);
        } catch (error) {
            console.error("Error fetching accommodation categories:", error);
            return [];
        }
    },
    async getPlaces (limit = 3, category, searchQuery) {
        try {
            let url = `${WP_API_BASE}/places?per_page=${limit}&_embed`;
            if (category) {
                url += `&gd_placecategory=${category}`;
            }
            if (searchQuery) {
                url += `&search=${encodeURIComponent(searchQuery)}`;
            }
            const response = await fetchWp(url, {
                next: {
                    revalidate: 3600
                }
            });
            if (!response.ok) throw new Error("Failed to fetch places");
            return await response.json();
        } catch (error) {
            console.error("Error fetching places:", error);
            return [];
        }
    },
    async getPlaceCategories () {
        try {
            const response = await fetchWp(`${WP_API_BASE}/places/categories?per_page=100`, {
                next: {
                    revalidate: 3600
                }
            });
            if (!response.ok) throw new Error("Failed to fetch place categories");
            const categories = await response.json();
            return categories.filter((cat)=>cat.count > 0);
        } catch (error) {
            console.error("Error fetching place categories:", error);
            return [];
        }
    },
    async getFeaturedListings (limit = 3) {
        try {
            const [restaurants, businesses] = await Promise.all([
                fetchWp(`${WP_API_BASE}/restaurant?per_page=100&_embed`, {
                    next: {
                        revalidate: 3600
                    }
                }),
                fetchWp(`${WP_API_BASE}/business?per_page=100&_embed`, {
                    next: {
                        revalidate: 3600
                    }
                })
            ]);
            const results = await Promise.all([
                restaurants.ok ? restaurants.json() : [],
                businesses.ok ? businesses.json() : []
            ]);
            const allListings = [
                ...results[0],
                ...results[1]
            ];
            // Filter only listings that have a featured image
            const withFeaturedImages = allListings.filter((listing)=>listing.featured_image && listing.featured_image.src);
            // Randomly shuffle and select the specified limit
            const shuffled = withFeaturedImages.sort(()=>Math.random() - 0.5);
            return shuffled.slice(0, limit);
        } catch (error) {
            console.error("Error fetching featured listings:", error);
            return [];
        }
    },
    async getBlogPosts (limit = 3) {
        try {
            const response = await fetchWp(`${WP_POSTS_API}/posts?per_page=${limit}&_embed`, {
                next: {
                    revalidate: 3600
                }
            });
            if (!response.ok) throw new Error("Failed to fetch blog posts");
            return await response.json();
        } catch (error) {
            console.error("Error fetching blog posts:", error);
            return [];
        }
    },
    async getCategoryCounts () {
        try {
            const [restaurants, businesses, accommodations, places] = await Promise.all([
                fetchWp(`${WP_API_BASE}/restaurant?per_page=1`, {
                    next: {
                        revalidate: 3600
                    }
                }),
                fetchWp(`${WP_API_BASE}/business?per_page=1`, {
                    next: {
                        revalidate: 3600
                    }
                }),
                fetchWp(`${WP_API_BASE}/accommodation?per_page=1`, {
                    next: {
                        revalidate: 3600
                    }
                }),
                fetchWp(`${WP_API_BASE}/places?per_page=1`, {
                    next: {
                        revalidate: 3600
                    }
                })
            ]);
            return {
                restaurants: parseInt(restaurants.headers.get("X-WP-Total") || "0"),
                businesses: parseInt(businesses.headers.get("X-WP-Total") || "0"),
                accommodations: parseInt(accommodations.headers.get("X-WP-Total") || "0"),
                places: parseInt(places.headers.get("X-WP-Total") || "0")
            };
        } catch (error) {
            console.error("Error fetching category counts:", error);
            return {
                restaurants: 0,
                businesses: 0,
                accommodations: 0,
                places: 0
            };
        }
    },
    async searchListings (query, limit = 10) {
        try {
            const [restaurants, businesses, accommodations, places] = await Promise.all([
                fetchWp(`${WP_API_BASE}/restaurant?search=${encodeURIComponent(query)}&per_page=${limit}`, {
                    next: {
                        revalidate: 3600
                    }
                }),
                fetchWp(`${WP_API_BASE}/business?search=${encodeURIComponent(query)}&per_page=${limit}`, {
                    next: {
                        revalidate: 3600
                    }
                }),
                fetchWp(`${WP_API_BASE}/accommodation?search=${encodeURIComponent(query)}&per_page=${limit}`, {
                    next: {
                        revalidate: 3600
                    }
                }),
                fetchWp(`${WP_API_BASE}/places?search=${encodeURIComponent(query)}&per_page=${limit}`, {
                    next: {
                        revalidate: 3600
                    }
                })
            ]);
            const results = await Promise.all([
                restaurants.json(),
                businesses.json(),
                accommodations.json(),
                places.json()
            ]);
            return [
                ...results[0],
                ...results[1],
                ...results[2],
                ...results[3]
            ].slice(0, limit);
        } catch (error) {
            console.error("Error searching listings:", error);
            return [];
        }
    },
    async getListingBySlug (type, slug) {
        try {
            const response = await fetchWp(`${WP_API_BASE}/${type}?slug=${slug}&_embed`, {
                next: {
                    revalidate: 3600
                }
            });
            if (!response.ok) throw new Error("Failed to fetch listing");
            const listings = await response.json();
            return listings.length > 0 ? listings[0] : null;
        } catch (error) {
            console.error("Error fetching listing:", error);
            return null;
        }
    },
    async getListingById (type, id) {
        try {
            const response = await fetchWp(`${WP_API_BASE}/${type}/${id}?_embed`, {
                next: {
                    revalidate: 3600
                }
            });
            if (!response.ok) throw new Error("Failed to fetch listing");
            return await response.json();
        } catch (error) {
            console.error("Error fetching listing:", error);
            return null;
        }
    },
    async getBlogPostById (id) {
        try {
            const response = await fetchWp(`${WP_POSTS_API}/posts/${id}?_embed`, {
                next: {
                    revalidate: 3600
                }
            });
            if (!response.ok) throw new Error("Failed to fetch blog post");
            return await response.json();
        } catch (error) {
            console.error("Error fetching blog post:", error);
            return null;
        }
    },
    async getBlogPostBySlug (slug) {
        try {
            const response = await fetchWp(`${WP_POSTS_API}/posts?slug=${slug}&_embed`, {
                next: {
                    revalidate: 3600
                }
            });
            if (!response.ok) throw new Error("Failed to fetch blog post");
            const posts = await response.json();
            return posts.length > 0 ? posts[0] : null;
        } catch (error) {
            console.error("Error fetching blog post:", error);
            return null;
        }
    },
    async getPageById (id) {
        try {
            const response = await fetchWp(`${WP_POSTS_API}/pages/${id}?_embed`, {
                next: {
                    revalidate: 3600
                }
            });
            if (!response.ok) throw new Error("Failed to fetch page");
            return await response.json();
        } catch (error) {
            console.error("Error fetching page:", error);
            return null;
        }
    },
    async getPageBySlug (slug) {
        try {
            const response = await fetchWp(`${WP_POSTS_API}/pages?slug=${slug}&_embed`, {
                next: {
                    revalidate: 3600
                }
            });
            if (!response.ok) throw new Error("Failed to fetch page");
            const pages = await response.json();
            return pages.length > 0 ? pages[0] : null;
        } catch (error) {
            console.error("Error fetching page:", error);
            return null;
        }
    }
};
const getCachedListingBySlug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cache"])(async (type, slug)=>{
    return wordpressAPI.getListingBySlug(type, slug);
});
const getCachedBlogPostBySlug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cache"])(async (slug)=>{
    return wordpressAPI.getBlogPostBySlug(slug);
});
const getCachedHomePageData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cache"])(async ()=>{
    const fetchWithTimeout = async (promise, timeoutMs = 5000)=>{
        const timeout = new Promise((resolve)=>setTimeout(()=>resolve(null), timeoutMs));
        return Promise.race([
            promise,
            timeout
        ]);
    };
    const [featuredListings, blogPosts, categoryCounts] = await Promise.all([
        fetchWithTimeout(wordpressAPI.getFeaturedListings(3)).then((r)=>r || []),
        fetchWithTimeout(wordpressAPI.getBlogPosts(3)).then((r)=>r || []),
        fetchWithTimeout(wordpressAPI.getCategoryCounts()).then((r)=>r || {
                restaurants: 0,
                businesses: 0,
                accommodations: 0,
                places: 0
            })
    ]);
    return {
        featuredListings,
        blogPosts,
        categoryCounts
    };
});
const getCachedArchiveData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cache"])(async (type, category, search)=>{
    let listings = [];
    let categories = [];
    try {
        switch(type){
            case "restaurant":
                [listings, categories] = await Promise.all([
                    wordpressAPI.getRestaurants(100, category, search),
                    wordpressAPI.getRestaurantCategories()
                ]);
                break;
            case "business":
                [listings, categories] = await Promise.all([
                    wordpressAPI.getBusinesses(100, category, search),
                    wordpressAPI.getBusinessCategories()
                ]);
                break;
            case "accommodation":
                [listings, categories] = await Promise.all([
                    wordpressAPI.getAccommodations(100, category, search),
                    wordpressAPI.getAccommodationCategories()
                ]);
                break;
            case "places":
                [listings, categories] = await Promise.all([
                    wordpressAPI.getPlaces(100, category, search),
                    wordpressAPI.getPlaceCategories()
                ]);
                break;
        }
    } catch (error) {
        console.error(`Error fetching ${type}:`, error);
    }
    return {
        listings,
        categories
    };
});
const getCachedBlogPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cache"])(async (limit = 50)=>{
    return wordpressAPI.getBlogPosts(limit);
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/ListingsGrid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ListingsGrid",
    ()=>ListingsGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/wordpress.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ListingsGrid({ listings, type, config }) {
    _s();
    const [displayCount, setDisplayCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(12);
    const visibleListings = listings.slice(0, displayCount);
    const hasMore = displayCount < listings.length;
    const showMore = ()=>{
        setDisplayCount((prev)=>Math.min(prev + 12, listings.length));
    };
    if (listings.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-16",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-2xl font-bold text-slate-900 mb-2",
                    children: "No listings found"
                }, void 0, false, {
                    fileName: "[project]/app/components/ListingsGrid.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-slate-600",
                    children: [
                        "Check back soon for new ",
                        config.title.toLowerCase(),
                        "!"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/ListingsGrid.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/ListingsGrid.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                children: visibleListings.map((listing)=>{
                    const imageUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getListingImage"])(listing, type);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: `/${type}/${listing.slug}`,
                            "aria-label": `View ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeHtmlEntities"])(listing.title.rendered)}`,
                            className: "group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative h-56 overflow-hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: imageUrl,
                                            alt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeHtmlEntities"])(listing.title.rendered),
                                            fill: true,
                                            sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
                                            className: "object-cover group-hover:scale-110 transition-transform duration-500"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/ListingsGrid.tsx",
                                            lineNumber: 51,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute top-4 left-4 flex gap-2",
                                            children: [
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isListingClaimed"])(listing) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "px-3 py-1 bg-blue-500/90 backdrop-blur-sm rounded-full text-sm font-semibold text-white flex items-center gap-1.5 shadow-lg",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                            className: "w-4 h-4",
                                                            "aria-hidden": "true"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/ListingsGrid.tsx",
                                                            lineNumber: 61,
                                                            columnNumber: 23
                                                        }, this),
                                                        "Claimed"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/ListingsGrid.tsx",
                                                    lineNumber: 60,
                                                    columnNumber: 21
                                                }, this),
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isListingFeatured"])(listing) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "px-3 py-1 bg-amber-500/90 backdrop-blur-sm rounded-full text-sm font-semibold text-white flex items-center gap-1.5 shadow-lg",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                            className: "w-4 h-4 fill-white",
                                                            "aria-hidden": "true"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/ListingsGrid.tsx",
                                                            lineNumber: 67,
                                                            columnNumber: 23
                                                        }, this),
                                                        "Featured"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/ListingsGrid.tsx",
                                                    lineNumber: 66,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/ListingsGrid.tsx",
                                            lineNumber: 58,
                                            columnNumber: 17
                                        }, this),
                                        listing.rating && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-slate-900",
                                            children: [
                                                "⭐ ",
                                                typeof listing.rating === 'number' ? listing.rating.toFixed(1) : parseFloat(listing.rating).toFixed(1)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/ListingsGrid.tsx",
                                            lineNumber: 73,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/ListingsGrid.tsx",
                                    lineNumber: 50,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeHtmlEntities"])(listing.title.rendered)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/ListingsGrid.tsx",
                                            lineNumber: 79,
                                            columnNumber: 17
                                        }, this),
                                        listing.city && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-slate-600 text-sm mb-2",
                                            children: [
                                                listing.city,
                                                ", ",
                                                listing.region
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/ListingsGrid.tsx",
                                            lineNumber: 83,
                                            columnNumber: 19
                                        }, this),
                                        listing.post_category && listing.post_category.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-block px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-semibold",
                                            children: listing.post_category[0].name.replace(/&amp;/g, '&')
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/ListingsGrid.tsx",
                                            lineNumber: 88,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/ListingsGrid.tsx",
                                    lineNumber: 78,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/ListingsGrid.tsx",
                            lineNumber: 45,
                            columnNumber: 13
                        }, this)
                    }, listing.id, false, {
                        fileName: "[project]/app/components/ListingsGrid.tsx",
                        lineNumber: 44,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/components/ListingsGrid.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            hasMore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-12 text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: showMore,
                    className: "px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
                    children: [
                        "Show More (",
                        listings.length - displayCount,
                        " remaining)"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/ListingsGrid.tsx",
                    lineNumber: 101,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/ListingsGrid.tsx",
                lineNumber: 100,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(ListingsGrid, "gQ/pgpLn/yK+W+G17pLX5FQaHsg=");
_c = ListingsGrid;
var _c;
__turbopack_context__.k.register(_c, "ListingsGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronDown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m6 9 6 6 6-6",
            key: "qrunsl"
        }
    ]
];
const ChevronDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("chevron-down", __iconNode);
;
 //# sourceMappingURL=chevron-down.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronDown",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronUp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m18 15-6-6-6 6",
            key: "153udz"
        }
    ]
];
const ChevronUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("chevron-up", __iconNode);
;
 //# sourceMappingURL=chevron-up.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronUp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>CircleCheckBig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M21.801 10A10 10 0 1 1 17 3.335",
            key: "yps3ct"
        }
    ],
    [
        "path",
        {
            d: "m9 11 3 3L22 4",
            key: "1pflzl"
        }
    ]
];
const CircleCheckBig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("circle-check-big", __iconNode);
;
 //# sourceMappingURL=circle-check-big.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Star
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
            key: "r04s7s"
        }
    ]
];
const Star = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("star", __iconNode);
;
 //# sourceMappingURL=star.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Star",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_ce1ddaaa._.js.map