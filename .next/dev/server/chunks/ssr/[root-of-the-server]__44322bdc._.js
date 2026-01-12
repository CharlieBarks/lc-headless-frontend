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
const WP_API_BASE = 'https://dir.lascrucesdirectory.com/wp-json/geodir/v2';
const WP_POSTS_API = 'https://dir.lascrucesdirectory.com/wp-json/wp/v2';
const WP_GRAPHQL_API = 'https://dir.lascrucesdirectory.com/graphql';
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
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'",
        '&#8217;': "'",
        '&#8216;': "'",
        '&#8220;': '"',
        '&#8221;': '"',
        '&#038;': '&'
    };
    return text.replace(/&[#a-z0-9]+;/gi, (match)=>entities[match] || match);
}
function isListingClaimed(listing) {
    if (typeof listing.claimed === 'boolean') return listing.claimed;
    if (typeof listing.claimed === 'object' && listing.claimed?.raw) {
        return listing.claimed.raw === '1' || listing.claimed.raw === 1 || listing.claimed.raw === true;
    }
    return listing.claimed === '1' || listing.claimed === 1 || listing.claimed === true;
}
function isListingFeatured(listing) {
    return listing.featured === true || listing.featured === 1 || listing.featured === '1';
}
const DEFAULT_IMAGES = {
    restaurant: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
    business: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800',
    accommodation: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    places: 'https://images.pexels.com/photos/2739664/pexels-photo-2739664.jpeg?auto=compress&cs=tinysrgb&w=800',
    blog: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=800'
};
function proxyImageUrl(url) {
    if (!url) return url;
    if (url.startsWith('https://dir.lascrucesdirectory.com/')) {
        return `/api/image-proxy?url=${encodeURIComponent(url)}`;
    }
    return url;
}
function getAllListingImages(listing, defaultType = 'business') {
    const imageSet = new Set();
    if (listing.featured_image && typeof listing.featured_image === 'object' && listing.featured_image.src) {
        imageSet.add(proxyImageUrl(listing.featured_image.src));
    }
    if (Array.isArray(listing.images) && listing.images.length > 0) {
        listing.images.forEach((img)=>{
            if (img?.src) {
                imageSet.add(proxyImageUrl(img.src));
            }
        });
    }
    if (listing._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
        const url = listing._embedded['wp:featuredmedia'][0].source_url;
        imageSet.add(proxyImageUrl(url));
    }
    const images = Array.from(imageSet);
    if (images.length === 0) {
        images.push(DEFAULT_IMAGES[defaultType]);
    }
    return images;
}
function getListingImage(listing, defaultType = 'business') {
    let imageUrl;
    if (listing.featured_image && typeof listing.featured_image === 'object' && listing.featured_image.src) {
        imageUrl = listing.featured_image.src;
        return proxyImageUrl(imageUrl);
    }
    if (Array.isArray(listing.images) && listing.images.length > 0 && listing.images[0]?.src) {
        imageUrl = listing.images[0].src;
        return proxyImageUrl(imageUrl);
    }
    if (listing._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
        imageUrl = listing._embedded['wp:featuredmedia'][0].source_url;
        return proxyImageUrl(imageUrl);
    }
    if (listing._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium?.source_url) {
        imageUrl = listing._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
        return proxyImageUrl(imageUrl);
    }
    imageUrl = DEFAULT_IMAGES[defaultType];
    return imageUrl;
}
function getBlogPostImage(post) {
    if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
        return proxyImageUrl(post._embedded['wp:featuredmedia'][0].source_url);
    }
    if (post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium?.source_url) {
        return proxyImageUrl(post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url);
    }
    return DEFAULT_IMAGES.blog;
}
// GraphQL query helper
async function fetchGraphQL(query, variables = {}) {
    try {
        const response = await fetch(WP_GRAPHQL_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query,
                variables
            }),
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) throw new Error('GraphQL request failed');
        const json = await response.json();
        if (json.errors) {
            console.error('GraphQL errors:', json.errors);
            throw new Error(json.errors[0]?.message || 'GraphQL query failed');
        }
        return json.data;
    } catch (error) {
        console.error('GraphQL fetch error:', error);
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
            if (!response.ok) throw new Error('Failed to fetch restaurants');
            return await response.json();
        } catch (error) {
            console.error('Error fetching restaurants:', error);
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
            if (!response.ok) throw new Error('Failed to fetch restaurant categories');
            const categories = await response.json();
            return categories.filter((cat)=>cat.count > 0);
        } catch (error) {
            console.error('Error fetching restaurant categories:', error);
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
            if (!response.ok) throw new Error('Failed to fetch businesses');
            return await response.json();
        } catch (error) {
            console.error('Error fetching businesses:', error);
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
            if (!response.ok) throw new Error('Failed to fetch business categories');
            const categories = await response.json();
            return categories.filter((cat)=>cat.count > 0);
        } catch (error) {
            console.error('Error fetching business categories:', error);
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
            if (!response.ok) throw new Error('Failed to fetch accommodations');
            return await response.json();
        } catch (error) {
            console.error('Error fetching accommodations:', error);
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
            if (!response.ok) throw new Error('Failed to fetch accommodation categories');
            const categories = await response.json();
            return categories.filter((cat)=>cat.count > 0);
        } catch (error) {
            console.error('Error fetching accommodation categories:', error);
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
            if (!response.ok) throw new Error('Failed to fetch places');
            return await response.json();
        } catch (error) {
            console.error('Error fetching places:', error);
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
            if (!response.ok) throw new Error('Failed to fetch place categories');
            const categories = await response.json();
            return categories.filter((cat)=>cat.count > 0);
        } catch (error) {
            console.error('Error fetching place categories:', error);
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
            console.error('Error fetching featured listings:', error);
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
            if (!response.ok) throw new Error('Failed to fetch blog posts');
            return await response.json();
        } catch (error) {
            console.error('Error fetching blog posts:', error);
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
                restaurants: parseInt(restaurants.headers.get('X-WP-Total') || '0'),
                businesses: parseInt(businesses.headers.get('X-WP-Total') || '0'),
                accommodations: parseInt(accommodations.headers.get('X-WP-Total') || '0'),
                places: parseInt(places.headers.get('X-WP-Total') || '0')
            };
        } catch (error) {
            console.error('Error fetching category counts:', error);
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
            console.error('Error searching listings:', error);
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
            if (!response.ok) throw new Error('Failed to fetch listing');
            const listings = await response.json();
            return listings.length > 0 ? listings[0] : null;
        } catch (error) {
            console.error('Error fetching listing:', error);
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
            if (!response.ok) throw new Error('Failed to fetch listing');
            return await response.json();
        } catch (error) {
            console.error('Error fetching listing:', error);
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
            if (!response.ok) throw new Error('Failed to fetch blog post');
            return await response.json();
        } catch (error) {
            console.error('Error fetching blog post:', error);
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
            if (!response.ok) throw new Error('Failed to fetch blog post');
            const posts = await response.json();
            return posts.length > 0 ? posts[0] : null;
        } catch (error) {
            console.error('Error fetching blog post:', error);
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
            if (!response.ok) throw new Error('Failed to fetch page');
            return await response.json();
        } catch (error) {
            console.error('Error fetching page:', error);
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
            if (!response.ok) throw new Error('Failed to fetch page');
            const pages = await response.json();
            return pages.length > 0 ? pages[0] : null;
        } catch (error) {
            console.error('Error fetching page:', error);
            return null;
        }
    }
};
}),
"[project]/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage,
    "dynamic",
    ()=>dynamic,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2d$crossed$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__UtensilsCrossed$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/utensils-crossed.js [app-rsc] (ecmascript) <export default as UtensilsCrossed>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-rsc] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bed$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Bed$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bed.js [app-rsc] (ecmascript) <export default as Bed>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/landmark.js [app-rsc] (ecmascript) <export default as Landmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-rsc] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-rsc] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-rsc] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/wordpress.ts [app-rsc] (ecmascript)");
;
;
;
;
const dynamic = 'force-dynamic';
const metadata = {
    title: 'Las Cruces Directory - Discover Local Businesses & Restaurants',
    description: 'Your complete guide to restaurants, businesses, accommodations, and places in Las Cruces, NM. Discover what makes our community special.'
};
async function HomePage() {
    // Add timeout wrapper for API calls
    const fetchWithTimeout = async (promise, timeoutMs = 5000)=>{
        const timeout = new Promise((resolve)=>setTimeout(()=>resolve(null), timeoutMs));
        return Promise.race([
            promise,
            timeout
        ]);
    };
    const [featuredListings, blogPosts, categoryCounts] = await Promise.all([
        fetchWithTimeout(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["wordpressAPI"].getFeaturedListings(3)).then((r)=>r || []),
        fetchWithTimeout(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["wordpressAPI"].getBlogPosts(3)).then((r)=>r || []),
        fetchWithTimeout(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["wordpressAPI"].getCategoryCounts()).then((r)=>r || {
                restaurants: 0,
                businesses: 0,
                accommodations: 0,
                places: 0
            })
    ]);
    const categories = [
        {
            id: 'restaurant',
            name: 'Restaurants',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2d$crossed$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__UtensilsCrossed$3e$__["UtensilsCrossed"],
            description: 'Discover local dining',
            color: 'from-emerald-500 to-green-600',
            count: categoryCounts.restaurants
        },
        {
            id: 'business',
            name: 'Businesses',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"],
            description: 'Find local services',
            color: 'from-emerald-500 to-green-600',
            count: categoryCounts.businesses
        },
        {
            id: 'accommodation',
            name: 'Accommodations',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bed$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Bed$3e$__["Bed"],
            description: 'Places to stay',
            color: 'from-emerald-500 to-green-600',
            count: categoryCounts.accommodations
        },
        {
            id: 'places',
            name: 'Places',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__["Landmark"],
            description: 'Explore attractions',
            color: 'from-emerald-500 to-green-600',
            count: categoryCounts.places
        }
    ];
    const getCategoryType = (listing)=>{
        const url = listing.link || '';
        if (url.includes('/restaurant/')) return 'restaurant';
        if (url.includes('/business/')) return 'business';
        if (url.includes('/accommodation/')) return 'accommodation';
        if (url.includes('/places/')) return 'places';
        return 'business';
    };
    const getDefaultCategoryName = (listing)=>{
        if (listing.post_category && listing.post_category.length > 0) {
            const defaultCatId = listing.default_category;
            if (defaultCatId) {
                const defaultCat = listing.post_category.find((cat)=>cat.id === parseInt(defaultCatId));
                if (defaultCat) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeHtmlEntities"])(defaultCat.name);
                }
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeHtmlEntities"])(listing.post_category[0].name);
        }
        return 'Listing';
    };
    const stripHtml = (html)=>{
        return html.replace(/<[^>]*>/g, '').trim();
    };
    const formatDate = (dateString)=>{
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMCAxOGMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNi0yLjY4NiA2LTYgNnoiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMDUiLz48L2c+PC9zdmc+')] opacity-30"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex items-center px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-300 text-sm font-medium mb-8 backdrop-blur-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 103,
                                            columnNumber: 15
                                        }, this),
                                        "Your Local Community Guide"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-5xl md:text-7xl font-bold text-white mb-6 leading-tight",
                                    children: [
                                        "Discover",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent",
                                            children: "Las Cruces"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 109,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed",
                                    children: "Your complete guide to local businesses, restaurants, accommodations, and hidden gems in our community."
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-24 px-4 sm:px-6 lg:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-4xl font-bold text-slate-900 mb-4",
                                    children: "Browse by Category"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 124,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl text-slate-600",
                                    children: "Explore what makes Las Cruces special"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 123,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
                            children: categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/${category.id}`,
                                    className: "group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 135,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-8 relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(category.icon, {
                                                        className: "w-8 h-8 text-white"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 138,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-bold text-slate-900 mb-2",
                                                    children: category.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-slate-600 mb-4",
                                                    children: category.description
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-semibold text-emerald-600",
                                                            children: [
                                                                category.count,
                                                                " listings"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 143,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-emerald-600 group-hover:translate-x-2 transition-transform",
                                                            children: "→"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 144,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 142,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 136,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, category.id, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 130,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 128,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 122,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-24 bg-white px-4 sm:px-6 lg:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-4xl font-bold text-slate-900 mb-4",
                                    children: "Featured Listings"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl text-slate-600",
                                    children: "Discover popular local spots"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 157,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 155,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                            children: featuredListings.map((listing)=>{
                                const type = getCategoryType(listing);
                                const categoryLabel = getDefaultCategoryName(listing);
                                const imageUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getListingImage"])(listing, type);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/${type}/${listing.slug}`,
                                    className: "group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative h-56 overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: imageUrl,
                                                    alt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeHtmlEntities"])(listing.title.rendered),
                                                    className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute top-4 left-4 flex gap-2",
                                                    children: [
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isListingClaimed"])(listing) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "px-3 py-1 bg-blue-500/90 backdrop-blur-sm rounded-full text-sm font-semibold text-white flex items-center gap-1.5 shadow-lg",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 181,
                                                                    columnNumber: 27
                                                                }, this),
                                                                "Claimed"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 180,
                                                            columnNumber: 25
                                                        }, this),
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isListingFeatured"])(listing) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "px-3 py-1 bg-amber-500/90 backdrop-blur-sm rounded-full text-sm font-semibold text-white flex items-center gap-1.5 shadow-lg",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                    className: "w-4 h-4 fill-white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 187,
                                                                    columnNumber: 27
                                                                }, this),
                                                                "Featured"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 186,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute top-4 right-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-emerald-600",
                                                        children: categoryLabel
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 193,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 192,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 172,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeHtmlEntities"])(listing.title.rendered)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 21
                                                }, this),
                                                listing.city && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-slate-600 text-sm",
                                                    children: [
                                                        listing.city,
                                                        ", ",
                                                        listing.region
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 203,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 198,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, listing.id, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 167,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 160,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 154,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-24 px-4 sm:px-6 lg:px-8 bg-slate-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-4xl font-bold text-slate-900 mb-4",
                                            children: "Latest Articles"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 219,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xl text-slate-600",
                                            children: "Stories and updates from our community"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 220,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 218,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/blog",
                                    className: "hidden md:flex items-center space-x-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "View all"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 226,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "group-hover:translate-x-1 transition-transform",
                                            children: "→"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 227,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 222,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 217,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-3 gap-8",
                            children: blogPosts.map((post)=>{
                                const imageUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBlogPostImage"])(post);
                                const excerpt = stripHtml(post.excerpt.rendered);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/blog/${post.slug}`,
                                    className: "group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative h-48 overflow-hidden",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: imageUrl,
                                                alt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeHtmlEntities"])(post.title.rendered),
                                                className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 243,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 242,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center text-sm text-slate-500 mb-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                            className: "w-4 h-4 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 251,
                                                            columnNumber: 23
                                                        }, this),
                                                        formatDate(post.date)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeHtmlEntities"])(post.title.rendered)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 254,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-slate-600 line-clamp-2",
                                                    children: excerpt
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 257,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 249,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, post.id, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 237,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 231,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mt-12 md:hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: "/blog",
                                className: "inline-flex items-center space-x-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "View all articles"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 269,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "→"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 270,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 265,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 264,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 216,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 215,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__44322bdc._.js.map