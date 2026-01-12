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
"[project]/app/components/ImageGallery.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/components/ImageGallery.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/components/ImageGallery.tsx <module evaluation>", "default");
}),
"[project]/app/components/ImageGallery.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/components/ImageGallery.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/components/ImageGallery.tsx", "default");
}),
"[project]/app/components/ImageGallery.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ImageGallery$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/components/ImageGallery.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ImageGallery$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/app/components/ImageGallery.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ImageGallery$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/[type]/[slug]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ListingPage,
    "generateMetadata",
    ()=>generateMetadata,
    "revalidate",
    ()=>revalidate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-rsc] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-rsc] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-rsc] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-rsc] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-rsc] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-rsc] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-rsc] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/facebook.js [app-rsc] (ecmascript) <export default as Facebook>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-rsc] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/twitter.js [app-rsc] (ecmascript) <export default as Twitter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-rsc] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/wordpress.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/seo.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ImageGallery$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ImageGallery.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
const revalidate = 3600;
const TYPE_LABELS = {
    restaurant: 'Restaurants',
    business: 'Businesses',
    accommodation: 'Accommodations',
    places: 'Places'
};
async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const { type, slug } = resolvedParams;
    const listing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCachedListingBySlug"])(type, slug);
    if (!listing) {
        return {
            title: 'Not Found'
        };
    }
    const headersList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])();
    const host = headersList.get('host') || '';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const currentUrl = `${protocol}://${host}/${type}/${slug}`;
    const seoData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCachedListingSEO"])(type, slug);
    const title = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeHtmlEntities"])(listing.title.rendered);
    const description = `Visit ${title} in Las Cruces, NM. Find contact info, hours, and reviews.`;
    const image = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getListingImage"])(listing, type);
    return {
        title: seoData.title || `${title} | Las Cruces Directory`,
        description: seoData.description || description,
        openGraph: {
            title: seoData.ogTitle || title,
            description: seoData.ogDescription || description,
            images: seoData.ogImage ? [
                seoData.ogImage
            ] : image ? [
                image
            ] : undefined,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: seoData.twitterTitle || title,
            description: seoData.twitterDescription || description,
            images: seoData.twitterImage ? [
                seoData.twitterImage
            ] : image ? [
                image
            ] : undefined
        },
        alternates: {
            canonical: currentUrl
        }
    };
}
async function ListingPage({ params }) {
    const resolvedParams = await params;
    const { type, slug } = resolvedParams;
    const listing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCachedListingBySlug"])(type, slug);
    if (!listing) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-bold text-slate-900 mb-4",
                        children: "Listing Not Found"
                    }, void 0, false, {
                        fileName: "[project]/app/[type]/[slug]/page.tsx",
                        lineNumber: 73,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "text-emerald-600 hover:text-emerald-700 font-medium",
                        children: "Return Home"
                    }, void 0, false, {
                        fileName: "[project]/app/[type]/[slug]/page.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/[type]/[slug]/page.tsx",
                lineNumber: 72,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/[type]/[slug]/page.tsx",
            lineNumber: 71,
            columnNumber: 7
        }, this);
    }
    const images = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllListingImages"])(listing, type);
    const content = listing.content?.rendered || listing.post_content || '';
    const getBusinessHours = ()=>{
        if (!listing.business_hours) return '';
        if (typeof listing.business_hours === 'string') return listing.business_hours;
        if (typeof listing.business_hours === 'object' && listing.business_hours.rendered) {
            const hoursData = listing.business_hours.rendered;
            if (hoursData.days) {
                return Object.entries(hoursData.days).map(([day, info])=>{
                    const dayName = info.day || day;
                    const slots = info.slots || [];
                    const range = slots[0]?.range || 'Closed';
                    return `${dayName}: ${range}`;
                }).join('\n');
            }
        }
        return '';
    };
    const businessHours = getBusinessHours();
    const title = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeHtmlEntities"])(listing.title.rendered);
    const description = listing.content?.rendered?.replace(/<[^>]*>/g, '').slice(0, 200).trim() || '';
    const image = images[0];
    const schemaData = {
        name: title,
        description: description,
        image: image,
        address: {
            streetAddress: listing.street,
            addressLocality: listing.city || 'Las Cruces',
            addressRegion: listing.region || 'NM',
            postalCode: listing.zip,
            addressCountry: 'US'
        },
        geo: listing.latitude && listing.longitude ? {
            latitude: listing.latitude,
            longitude: listing.longitude
        } : undefined,
        telephone: listing.phone,
        email: listing.email,
        url: listing.website,
        aggregateRating: listing.rating ? {
            ratingValue: listing.rating,
            reviewCount: listing.rating_count || 1
        } : undefined
    };
    let businessSchema;
    if (type === 'restaurant') {
        businessSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateRestaurantSchema"])(schemaData);
    } else if (type === 'accommodation') {
        businessSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateLodgingSchema"])(schemaData);
    } else {
        businessSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateLocalBusinessSchema"])(schemaData);
    }
    const breadcrumbSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateBreadcrumbSchema"])([
        {
            name: 'Home',
            url: 'https://lascrucesdirectory.com'
        },
        {
            name: TYPE_LABELS[type] || type,
            url: `https://lascrucesdirectory.com/${type}`
        },
        {
            name: title,
            url: `https://lascrucesdirectory.com/${type}/${slug}`
        }
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["JsonLdScript"], {
                data: [
                    businessSchema,
                    breadcrumbSchema
                ]
            }, void 0, false, {
                fileName: "[project]/app/[type]/[slug]/page.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "bg-white border-b border-slate-200 py-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-2 text-sm text-slate-600",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "hover:text-emerald-600 transition-colors",
                                children: "Home"
                            }, void 0, false, {
                                fileName: "[project]/app/[type]/[slug]/page.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/app/[type]/[slug]/page.tsx",
                                lineNumber: 158,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: `/${type}`,
                                className: "hover:text-emerald-600 transition-colors capitalize",
                                children: type
                            }, void 0, false, {
                                fileName: "[project]/app/[type]/[slug]/page.tsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/app/[type]/[slug]/page.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-900 font-medium",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeHtmlEntities"])(listing.title.rendered)
                            }, void 0, false, {
                                fileName: "[project]/app/[type]/[slug]/page.tsx",
                                lineNumber: 163,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/[type]/[slug]/page.tsx",
                        lineNumber: 154,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/[type]/[slug]/page.tsx",
                    lineNumber: 153,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/[type]/[slug]/page.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-3 gap-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-2 space-y-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start gap-4 mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: "text-5xl font-bold text-slate-900 flex-1",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeHtmlEntities"])(listing.title.rendered)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-2 pt-2",
                                                    children: [
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isListingClaimed"])(listing) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "px-4 py-2 bg-blue-500 rounded-full text-sm font-semibold text-white flex items-center gap-2 shadow-lg",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                    className: "w-5 h-5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                                    lineNumber: 177,
                                                                    columnNumber: 23
                                                                }, this),
                                                                "Claimed"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                            lineNumber: 176,
                                                            columnNumber: 21
                                                        }, this),
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isListingFeatured"])(listing) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "px-4 py-2 bg-amber-500 rounded-full text-sm font-semibold text-white flex items-center gap-2 shadow-lg",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                    className: "w-5 h-5 fill-white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                                    lineNumber: 183,
                                                                    columnNumber: 23
                                                                }, this),
                                                                "Featured"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                            lineNumber: 182,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                    lineNumber: 174,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[type]/[slug]/page.tsx",
                                            lineNumber: 172,
                                            columnNumber: 15
                                        }, this),
                                        listing.post_category && listing.post_category.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4 flex flex-wrap gap-2",
                                            children: listing.post_category.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-block px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-sm font-semibold",
                                                    children: category.name.replace(/&amp;/g, '&')
                                                }, category.id, false, {
                                                    fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/[type]/[slug]/page.tsx",
                                            lineNumber: 191,
                                            columnNumber: 17
                                        }, this),
                                        listing.rating && typeof listing.rating === 'number' && !isNaN(listing.rating) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-2 mb-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center space-x-1",
                                                    children: Array.from({
                                                        length: 5
                                                    }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                            className: `w-5 h-5 ${i < Math.floor(listing.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`
                                                        }, i, false, {
                                                            fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                            lineNumber: 207,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                    lineNumber: 205,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-lg font-semibold text-slate-900",
                                                    children: listing.rating.toFixed(1)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 19
                                                }, this),
                                                listing.rating_count && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-600",
                                                    children: [
                                                        "(",
                                                        listing.rating_count,
                                                        " reviews)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                    lineNumber: 219,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[type]/[slug]/page.tsx",
                                            lineNumber: 204,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[type]/[slug]/page.tsx",
                                    lineNumber: 171,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ImageGallery$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    images: images,
                                    altText: listing.title.rendered
                                }, void 0, false, {
                                    fileName: "[project]/app/[type]/[slug]/page.tsx",
                                    lineNumber: 225,
                                    columnNumber: 13
                                }, this),
                                content && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-2xl shadow-lg p-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-3xl font-bold text-slate-900 mb-6",
                                            children: "About"
                                        }, void 0, false, {
                                            fileName: "[project]/app/[type]/[slug]/page.tsx",
                                            lineNumber: 229,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "wp-content",
                                            dangerouslySetInnerHTML: {
                                                __html: content
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/[type]/[slug]/page.tsx",
                                            lineNumber: 230,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[type]/[slug]/page.tsx",
                                    lineNumber: 228,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/[type]/[slug]/page.tsx",
                            lineNumber: 170,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-lg p-6 sticky top-24",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-bold text-slate-900 mb-6",
                                        children: "Contact Information"
                                    }, void 0, false, {
                                        fileName: "[project]/app/[type]/[slug]/page.tsx",
                                        lineNumber: 240,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            (listing.street || listing.city) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start space-x-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                        className: "w-5 h-5 text-emerald-600 mt-1 flex-shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                        lineNumber: 245,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-slate-700",
                                                        children: [
                                                            listing.street && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: listing.street
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                                lineNumber: 247,
                                                                columnNumber: 42
                                                            }, this),
                                                            listing.city && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    listing.city,
                                                                    ", ",
                                                                    listing.region,
                                                                    " ",
                                                                    listing.zip
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                                lineNumber: 249,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                        lineNumber: 246,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                lineNumber: 244,
                                                columnNumber: 19
                                            }, this),
                                            listing.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                        className: "w-5 h-5 text-emerald-600 flex-shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                        lineNumber: 259,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: `tel:${listing.phone}`,
                                                        className: "text-slate-700 hover:text-emerald-600 transition-colors",
                                                        children: listing.phone
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                        lineNumber: 260,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                lineNumber: 258,
                                                columnNumber: 19
                                            }, this),
                                            listing.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                        className: "w-5 h-5 text-emerald-600 flex-shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                        lineNumber: 271,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: `mailto:${listing.email}`,
                                                        className: "text-slate-700 hover:text-emerald-600 transition-colors break-all",
                                                        children: listing.email
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                        lineNumber: 272,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                lineNumber: 270,
                                                columnNumber: 19
                                            }, this),
                                            listing.website && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                        className: "w-5 h-5 text-emerald-600 flex-shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                        lineNumber: 283,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: listing.website,
                                                        target: "_blank",
                                                        rel: "nofollow noopener noreferrer",
                                                        className: "text-slate-700 hover:text-emerald-600 transition-colors break-all",
                                                        children: "Visit Website"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                        lineNumber: 284,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                lineNumber: 282,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/[type]/[slug]/page.tsx",
                                        lineNumber: 242,
                                        columnNumber: 15
                                    }, this),
                                    (listing.facebook || listing.instagram || listing.twitter) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 pt-6 border-t border-slate-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-semibold text-slate-900 mb-4",
                                                children: "Follow Us"
                                            }, void 0, false, {
                                                fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                lineNumber: 298,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex space-x-3",
                                                children: [
                                                    listing.facebook && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: listing.facebook,
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        className: "w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__["Facebook"], {
                                                            className: "w-5 h-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                            lineNumber: 307,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                        lineNumber: 301,
                                                        columnNumber: 23
                                                    }, this),
                                                    listing.instagram && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: listing.instagram,
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        className: "w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                                                            className: "w-5 h-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                            lineNumber: 317,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                        lineNumber: 311,
                                                        columnNumber: 23
                                                    }, this),
                                                    listing.twitter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: listing.twitter,
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        className: "w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__["Twitter"], {
                                                            className: "w-5 h-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                            lineNumber: 327,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                        lineNumber: 321,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                lineNumber: 299,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/[type]/[slug]/page.tsx",
                                        lineNumber: 297,
                                        columnNumber: 17
                                    }, this),
                                    businessHours && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 pt-6 border-t border-slate-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-semibold text-slate-900 mb-4",
                                                children: "Hours of Operation"
                                            }, void 0, false, {
                                                fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                lineNumber: 336,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start space-x-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                        className: "w-5 h-5 text-emerald-600 mt-1 flex-shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                        lineNumber: 338,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-slate-700 text-sm whitespace-pre-line",
                                                        children: businessHours
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                        lineNumber: 339,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/[type]/[slug]/page.tsx",
                                                lineNumber: 337,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/[type]/[slug]/page.tsx",
                                        lineNumber: 335,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/[type]/[slug]/page.tsx",
                                lineNumber: 239,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/[type]/[slug]/page.tsx",
                            lineNumber: 238,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/[type]/[slug]/page.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/[type]/[slug]/page.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/app/[type]/[slug]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/[type]/[slug]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__fe8497dd._.js.map