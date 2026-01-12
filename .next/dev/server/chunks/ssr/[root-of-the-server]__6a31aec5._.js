module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/not-found.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/not-found.tsx [app-rsc] (ecmascript)"));
}),
"[project]/lib/wordpress.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
;
const WP_API_BASE = "https://dir.lascrucesdirectory.com/wp-json/geodir/v2";
const WP_POSTS_API = "https://dir.lascrucesdirectory.com/wp-json/wp/v2";
const WP_GRAPHQL_API = "https://dir.lascrucesdirectory.com/graphql";
const CACHE_REVALIDATE = 3600;
async function fetchWp(url, options = {}) {
    // For server-side rendering, bypass the proxy and fetch directly
    // The CORS restriction only applies to browser requests
    if ("TURBOPACK compile-time truthy", 1) {
        return fetch(url, options);
    }
    //TURBOPACK unreachable
    ;
    // For client-side requests, use the proxy to avoid CORS
    const urlObj = undefined;
    const pathAndQuery = undefined;
    const proxiedUrl = undefined;
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
const getCachedListingBySlug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async (type, slug)=>{
    return wordpressAPI.getListingBySlug(type, slug);
});
const getCachedBlogPostBySlug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async (slug)=>{
    return wordpressAPI.getBlogPostBySlug(slug);
});
const getCachedHomePageData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async ()=>{
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
const getCachedArchiveData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async (type, category, search)=>{
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
const getCachedBlogPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async (limit = 50)=>{
    return wordpressAPI.getBlogPosts(limit);
});
}),
"[project]/app/components/ArchiveFilters.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ArchiveFilters",
    ()=>ArchiveFilters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ArchiveFilters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ArchiveFilters() from the server but ArchiveFilters is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/components/ArchiveFilters.tsx <module evaluation>", "ArchiveFilters");
}),
"[project]/app/components/ArchiveFilters.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ArchiveFilters",
    ()=>ArchiveFilters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ArchiveFilters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ArchiveFilters() from the server but ArchiveFilters is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/components/ArchiveFilters.tsx", "ArchiveFilters");
}),
"[project]/app/components/ArchiveFilters.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ArchiveFilters$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/components/ArchiveFilters.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ArchiveFilters$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/app/components/ArchiveFilters.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ArchiveFilters$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/components/ListingsGrid.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ListingsGrid",
    ()=>ListingsGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ListingsGrid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ListingsGrid() from the server but ListingsGrid is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/components/ListingsGrid.tsx <module evaluation>", "ListingsGrid");
}),
"[project]/app/components/ListingsGrid.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ListingsGrid",
    ()=>ListingsGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ListingsGrid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ListingsGrid() from the server but ListingsGrid is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/components/ListingsGrid.tsx", "ListingsGrid");
}),
"[project]/app/components/ListingsGrid.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ListingsGrid$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/components/ListingsGrid.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ListingsGrid$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/app/components/ListingsGrid.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ListingsGrid$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/[type]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ArchivePage,
    "generateMetadata",
    ()=>generateMetadata,
    "revalidate",
    ()=>revalidate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2d$crossed$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__UtensilsCrossed$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/utensils-crossed.js [app-rsc] (ecmascript) <export default as UtensilsCrossed>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-rsc] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bed$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Bed$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bed.js [app-rsc] (ecmascript) <export default as Bed>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/landmark.js [app-rsc] (ecmascript) <export default as Landmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-rsc] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/wordpress.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ArchiveFilters$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ArchiveFilters.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ListingsGrid$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ListingsGrid.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
const revalidate = 3600;
const typeConfig = {
    restaurant: {
        title: 'Restaurants',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2d$crossed$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__UtensilsCrossed$3e$__["UtensilsCrossed"],
        description: 'Discover the best dining experiences in Las Cruces'
    },
    business: {
        title: 'Businesses',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"],
        description: 'Find local services and businesses'
    },
    accommodation: {
        title: 'Accommodations',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bed$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Bed$3e$__["Bed"],
        description: 'Places to stay in Las Cruces'
    },
    places: {
        title: 'Places',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__["Landmark"],
        description: 'Explore attractions and points of interest'
    }
};
async function generateMetadata({ params }) {
    const { type } = await params;
    const config = typeConfig[type];
    if (!config) {
        return {
            title: 'Not Found'
        };
    }
    return {
        title: `${config.title} in Las Cruces - Las Cruces Directory`,
        description: `${config.description}. Browse our complete directory of ${config.title.toLowerCase()} in Las Cruces, New Mexico.`,
        openGraph: {
            title: `${config.title} in Las Cruces`,
            description: config.description,
            type: 'website'
        }
    };
}
async function ArchivePage({ params, searchParams }) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const { type } = resolvedParams;
    const { search, category } = resolvedSearchParams;
    const config = typeConfig[type];
    if (!config) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    const { listings, categories } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCachedArchiveData"])(type, category, search);
    const IconComponent = config.icon;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 py-24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            "aria-label": "Breadcrumb",
                            className: "flex items-center space-x-2 text-sm text-slate-300 mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "hover:text-white transition-colors",
                                    children: "Home"
                                }, void 0, false, {
                                    fileName: "[project]/app/[type]/page.tsx",
                                    lineNumber: 80,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                    className: "w-4 h-4",
                                    "aria-hidden": "true"
                                }, void 0, false, {
                                    fileName: "[project]/app/[type]/page.tsx",
                                    lineNumber: 83,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white",
                                    children: config.title
                                }, void 0, false, {
                                    fileName: "[project]/app/[type]/page.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/[type]/page.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-6 mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                                        className: "w-10 h-10 text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/app/[type]/page.tsx",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/[type]/page.tsx",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-5xl font-bold text-white mb-2",
                                            children: config.title
                                        }, void 0, false, {
                                            fileName: "[project]/app/[type]/page.tsx",
                                            lineNumber: 92,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xl text-slate-300",
                                            children: config.description
                                        }, void 0, false, {
                                            fileName: "[project]/app/[type]/page.tsx",
                                            lineNumber: 93,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[type]/page.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/[type]/page.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-4 text-slate-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20",
                                    children: [
                                        listings.length,
                                        " listings"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[type]/page.tsx",
                                    lineNumber: 98,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20",
                                    children: [
                                        categories.length,
                                        " categories"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[type]/page.tsx",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/[type]/page.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/[type]/page.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/[type]/page.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 px-4 sm:px-6 lg:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ArchiveFilters$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ArchiveFilters"], {
                            categories: categories,
                            type: type
                        }, void 0, false, {
                            fileName: "[project]/app/[type]/page.tsx",
                            lineNumber: 110,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ListingsGrid$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ListingsGrid"], {
                            listings: listings,
                            type: type,
                            config: {
                                title: config.title,
                                description: config.description
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/[type]/page.tsx",
                            lineNumber: 112,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/[type]/page.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/[type]/page.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/app/[type]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/[type]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6a31aec5._.js.map