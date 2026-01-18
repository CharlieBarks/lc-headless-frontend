import { NextRequest, NextResponse } from 'next/server';

const WP_API_BASE = "https://dir.lascrucesdirectory.com/wp-json/geodir/v2";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_SIZE = 100;

interface SearchResult {
  id: number;
  slug: string;
  title: string;
  type: string;
  typeLabel: string;
  city?: string;
  category?: string;
  image?: string;
}

interface CacheEntry {
  results: SearchResult[];
  timestamp: number;
}

const searchCache = new Map<string, CacheEntry>();

function getCacheKey(query: string, limit: number): string {
  return `${query.toLowerCase().trim()}:${limit}`;
}

function cleanupCache(): void {
  const now = Date.now();
  for (const [key, entry] of searchCache.entries()) {
    if (now - entry.timestamp > CACHE_TTL_MS) {
      searchCache.delete(key);
    }
  }
  if (searchCache.size > MAX_CACHE_SIZE) {
    const oldest = [...searchCache.entries()]
      .sort((a, b) => a[1].timestamp - b[1].timestamp)
      .slice(0, searchCache.size - MAX_CACHE_SIZE);
    oldest.forEach(([key]) => searchCache.delete(key));
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const limit = parseInt(searchParams.get('limit') || '10');

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const cacheKey = getCacheKey(query, limit);
  const cached = searchCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return NextResponse.json({ results: cached.results });
  }

  try {
    cleanupCache();
    
    const endpoints = [
      { type: 'restaurant', label: 'Restaurant', url: `${WP_API_BASE}/restaurant?search=${encodeURIComponent(query)}&per_page=${limit}` },
      { type: 'business', label: 'Business', url: `${WP_API_BASE}/business?search=${encodeURIComponent(query)}&per_page=${limit}` },
      { type: 'accommodation', label: 'Accommodation', url: `${WP_API_BASE}/accommodation?search=${encodeURIComponent(query)}&per_page=${limit}` },
      { type: 'places', label: 'Place', url: `${WP_API_BASE}/places?search=${encodeURIComponent(query)}&per_page=${limit}` },
    ];

    const responses = await Promise.all(
      endpoints.map(async ({ type, label, url }) => {
        try {
          const res = await fetch(url, { next: { revalidate: 300 } });
          if (!res.ok) return [];
          const data = await res.json();
          return data.map((item: any) => ({
            id: item.id,
            slug: item.slug,
            title: decodeHtmlEntities(item.title?.rendered || item.title || ''),
            type,
            typeLabel: label,
            city: item.city || item.location?.city,
            category: item.post_category?.[0]?.name?.replace(/&amp;/g, '&'),
            image: getListingImage(item),
          }));
        } catch {
          return [];
        }
      })
    );

    const allResults: SearchResult[] = [];
    const perTypeLimit = Math.ceil(limit / 4);
    
    responses.forEach((typeResults) => {
      allResults.push(...typeResults.slice(0, perTypeLimit));
    });
    
    const sortedResults = allResults.slice(0, limit);

    searchCache.set(cacheKey, {
      results: sortedResults,
      timestamp: Date.now(),
    });

    return NextResponse.json({ results: sortedResults });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ results: [], error: 'Search failed' }, { status: 500 });
  }
}

function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#039;": "'",
    "&#8217;": "'",
    "&#8216;": "'",
    "&#8220;": '"',
    "&#8221;": '"',
    "&#038;": "&",
  };
  return text.replace(/&[#a-z0-9]+;/gi, (match) => entities[match] || match);
}

function getListingImage(listing: any): string | undefined {
  if (listing.featured_image?.src) {
    return listing.featured_image.src;
  }
  if (listing.images?.[0]?.src) {
    return listing.images[0].src;
  }
  return undefined;
}
