import { NextRequest, NextResponse } from 'next/server';

const WP_API_BASE = "https://dir.lascrucesdirectory.com/wp-json/geodir/v2";

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

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const limit = parseInt(searchParams.get('limit') || '10');

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
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

    const allResults: SearchResult[] = responses.flat();
    const sortedResults = allResults.slice(0, limit);

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
    return `/api/image-proxy?url=${encodeURIComponent(listing.featured_image.src)}`;
  }
  if (listing.images?.[0]?.src) {
    return `/api/image-proxy?url=${encodeURIComponent(listing.images[0].src)}`;
  }
  return undefined;
}
