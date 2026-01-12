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
    "getListingImage",
    ()=>getListingImage,
    "isListingClaimed",
    ()=>isListingClaimed,
    "isListingFeatured",
    ()=>isListingFeatured,
    "wordpressAPI",
    ()=>wordpressAPI
]);
const WP_API_BASE = "https://dir.lascrucesdirectory.com/wp-json/geodir/v2";
const WP_POSTS_API = "https://dir.lascrucesdirectory.com/wp-json/wp/v2";
const WP_GRAPHQL_API = "https://dir.lascrucesdirectory.com/graphql";
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
}),
"[project]/lib/seo.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchRankMathSEO",
    ()=>fetchRankMathSEO
]);
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
async function fetchRankMathSEO(url) {
    return {};
}
}),
"[project]/app/blog/[slug]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlogPostPage,
    "dynamic",
    ()=>dynamic,
    "generateMetadata",
    ()=>generateMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-rsc] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-rsc] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-rsc] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/wordpress.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/seo.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
const dynamic = 'force-dynamic';
async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    const post = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["wordpressAPI"].getBlogPostBySlug(slug);
    if (!post) {
        return {
            title: 'Not Found'
        };
    }
    const headersList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])();
    const host = headersList.get('host') || '';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const currentUrl = `${protocol}://${host}/blog/${slug}`;
    const seoData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchRankMathSEO"])(post.link);
    const stripHtml = (html)=>{
        return html.replace(/<[^>]*>/g, '').trim();
    };
    const excerpt = stripHtml(post.excerpt.rendered);
    return {
        title: seoData.title || post.title.rendered,
        description: seoData.description || excerpt,
        openGraph: {
            title: seoData.ogTitle || post.title.rendered,
            description: seoData.ogDescription || excerpt,
            images: seoData.ogImage ? [
                seoData.ogImage
            ] : undefined,
            type: 'article'
        },
        twitter: {
            card: 'summary_large_image',
            title: seoData.twitterTitle || post.title.rendered,
            description: seoData.twitterDescription || excerpt,
            images: seoData.twitterImage ? [
                seoData.twitterImage
            ] : undefined
        },
        alternates: {
            canonical: seoData.canonical || currentUrl
        },
        robots: seoData.robots
    };
}
async function BlogPostPage({ params }) {
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    const post = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["wordpressAPI"].getBlogPostBySlug(slug);
    if (!post) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-bold text-slate-900 mb-4",
                        children: "Post Not Found"
                    }, void 0, false, {
                        fileName: "[project]/app/blog/[slug]/page.tsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: "/blog",
                        className: "text-emerald-600 hover:text-emerald-700 font-medium",
                        children: "Return to Blog"
                    }, void 0, false, {
                        fileName: "[project]/app/blog/[slug]/page.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/blog/[slug]/page.tsx",
                lineNumber: 68,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/blog/[slug]/page.tsx",
            lineNumber: 67,
            columnNumber: 7
        }, this);
    }
    const imageUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBlogPostImage"])(post);
    const formatDate = (dateString)=>{
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };
    const estimateReadingTime = (content)=>{
        const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
        return Math.ceil(words / 200);
    };
    const readingTime = post.content ? estimateReadingTime(post.content.rendered) : 5;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "bg-white border-b border-slate-200 py-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-2 text-sm text-slate-600",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "hover:text-emerald-600 transition-colors",
                                children: "Home"
                            }, void 0, false, {
                                fileName: "[project]/app/blog/[slug]/page.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/app/blog/[slug]/page.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: "/blog",
                                className: "hover:text-emerald-600 transition-colors",
                                children: "Blog"
                            }, void 0, false, {
                                fileName: "[project]/app/blog/[slug]/page.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/app/blog/[slug]/page.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-900 font-medium truncate",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeHtmlEntities"])(post.title.rendered)
                            }, void 0, false, {
                                fileName: "[project]/app/blog/[slug]/page.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/blog/[slug]/page.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/blog/[slug]/page.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/blog/[slug]/page.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "mb-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeHtmlEntities"])(post.title.rendered)
                            }, void 0, false, {
                                fileName: "[project]/app/blog/[slug]/page.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-6 text-slate-600 mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                className: "w-5 h-5 text-emerald-600"
                                            }, void 0, false, {
                                                fileName: "[project]/app/blog/[slug]/page.tsx",
                                                lineNumber: 118,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                                dateTime: post.date,
                                                children: formatDate(post.date)
                                            }, void 0, false, {
                                                fileName: "[project]/app/blog/[slug]/page.tsx",
                                                lineNumber: 119,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/blog/[slug]/page.tsx",
                                        lineNumber: 117,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                className: "w-5 h-5 text-emerald-600"
                                            }, void 0, false, {
                                                fileName: "[project]/app/blog/[slug]/page.tsx",
                                                lineNumber: 122,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    readingTime,
                                                    " min read"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/blog/[slug]/page.tsx",
                                                lineNumber: 123,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/blog/[slug]/page.tsx",
                                        lineNumber: 121,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/blog/[slug]/page.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this),
                            imageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-96 rounded-2xl overflow-hidden shadow-2xl mb-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: imageUrl,
                                    alt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeHtmlEntities"])(post.title.rendered),
                                    className: "w-full h-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/app/blog/[slug]/page.tsx",
                                    lineNumber: 129,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/blog/[slug]/page.tsx",
                                lineNumber: 128,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/blog/[slug]/page.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    post.content && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "wp-content",
                        dangerouslySetInnerHTML: {
                            __html: post.content.rendered
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/blog/[slug]/page.tsx",
                        lineNumber: 139,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "mt-16 pt-8 border-t border-slate-200",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/blog",
                                    className: "inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "group-hover:-translate-x-1 transition-transform",
                                            children: "←"
                                        }, void 0, false, {
                                            fileName: "[project]/app/blog/[slug]/page.tsx",
                                            lineNumber: 151,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Back to Blog"
                                        }, void 0, false, {
                                            fileName: "[project]/app/blog/[slug]/page.tsx",
                                            lineNumber: 152,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/blog/[slug]/page.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-slate-600",
                                            children: "Share:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/blog/[slug]/page.tsx",
                                            lineNumber: 156,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(post.link)}&text=${encodeURIComponent(post.title.rendered)}`,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "text-slate-600 hover:text-emerald-600 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "sr-only",
                                                    children: "Share on Twitter"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/blog/[slug]/page.tsx",
                                                    lineNumber: 163,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-6 h-6",
                                                    fill: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/blog/[slug]/page.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/blog/[slug]/page.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/blog/[slug]/page.tsx",
                                            lineNumber: 157,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(post.link)}`,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "text-slate-600 hover:text-emerald-600 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "sr-only",
                                                    children: "Share on Facebook"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/blog/[slug]/page.tsx",
                                                    lineNumber: 174,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-6 h-6",
                                                    fill: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/blog/[slug]/page.tsx",
                                                        lineNumber: 176,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/blog/[slug]/page.tsx",
                                                    lineNumber: 175,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/blog/[slug]/page.tsx",
                                            lineNumber: 168,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/blog/[slug]/page.tsx",
                                    lineNumber: 155,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/blog/[slug]/page.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/blog/[slug]/page.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/blog/[slug]/page.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/app/blog/[slug]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/blog/[slug]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c18a56c9._.js.map