import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, MapPin, Search } from 'lucide-react';
import type { Metadata } from 'next';

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

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const query = params.q || '';
  
  return {
    title: query ? `Search results for "${query}"` : 'Search',
    description: `Find local businesses, restaurants, accommodations, and places in Las Cruces${query ? ` matching "${query}"` : ''}.`,
  };
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

async function searchListings(query: string): Promise<SearchResult[]> {
  if (!query || query.length < 2) return [];

  const endpoints = [
    { type: 'restaurant', label: 'Restaurant', url: `${WP_API_BASE}/restaurant?search=${encodeURIComponent(query)}&per_page=50` },
    { type: 'business', label: 'Business', url: `${WP_API_BASE}/business?search=${encodeURIComponent(query)}&per_page=50` },
    { type: 'accommodation', label: 'Accommodation', url: `${WP_API_BASE}/accommodation?search=${encodeURIComponent(query)}&per_page=50` },
    { type: 'places', label: 'Place', url: `${WP_API_BASE}/places?search=${encodeURIComponent(query)}&per_page=50` },
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

  return responses.flat();
}

const typeColors: Record<string, string> = {
  restaurant: 'bg-orange-100 text-orange-700',
  business: 'bg-blue-100 text-blue-700',
  accommodation: 'bg-purple-100 text-purple-700',
  places: 'bg-green-100 text-green-700',
};

const defaultImages: Record<string, string> = {
  restaurant: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
  business: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=400',
  accommodation: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400',
  places: 'https://images.pexels.com/photos/2739664/pexels-photo-2739664.jpeg?auto=compress&cs=tinysrgb&w=400',
};

async function SearchResultsContent({ query }: { query: string }) {
  const results = await searchListings(query);

  if (!query) {
    return (
      <div className="text-center py-16">
        <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" aria-hidden="true" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Search the Directory</h2>
        <p className="text-slate-600">Enter a search term to find local businesses, restaurants, and more.</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" aria-hidden="true" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">No results found</h2>
        <p className="text-slate-600">Try a different search term or browse our categories.</p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link href="/restaurant" className="px-6 py-3 bg-orange-100 text-orange-700 rounded-xl font-medium hover:bg-orange-200 transition-colors">
            Restaurants
          </Link>
          <Link href="/business" className="px-6 py-3 bg-blue-100 text-blue-700 rounded-xl font-medium hover:bg-blue-200 transition-colors">
            Businesses
          </Link>
          <Link href="/accommodation" className="px-6 py-3 bg-purple-100 text-purple-700 rounded-xl font-medium hover:bg-purple-200 transition-colors">
            Accommodations
          </Link>
          <Link href="/places" className="px-6 py-3 bg-green-100 text-green-700 rounded-xl font-medium hover:bg-green-200 transition-colors">
            Places
          </Link>
        </div>
      </div>
    );
  }

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) acc[result.type] = [];
    acc[result.type].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  return (
    <div className="space-y-12">
      <p className="text-slate-600">
        Found <span className="font-semibold text-slate-900">{results.length}</span> results for "{query}"
      </p>

      {Object.entries(groupedResults).map(([type, items]) => (
        <section key={type}>
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm ${typeColors[type]}`}>
              {items[0].typeLabel}s
            </span>
            <span className="text-slate-400 font-normal text-base">({items.length})</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((result) => (
              <article key={`${result.type}-${result.id}`}>
                <Link
                  href={`/${result.type}/${result.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={result.image || defaultImages[result.type]}
                      alt={result.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors truncate">
                      {result.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      {result.city && (
                        <span className="text-sm text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" aria-hidden="true" />
                          {result.city}
                        </span>
                      )}
                      {result.category && (
                        <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                          {result.category}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.q || '';

  return (
    <main>
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-slate-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
            <span className="text-white">Search</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {query ? `Results for "${query}"` : 'Search'}
          </h1>
          <p className="text-xl text-slate-300">
            Find businesses, restaurants, accommodations, and places in Las Cruces
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={
            <div className="text-center py-16">
              <div className="animate-pulse">
                <div className="h-8 w-48 bg-slate-200 rounded mx-auto mb-4"></div>
                <div className="h-4 w-64 bg-slate-100 rounded mx-auto"></div>
              </div>
            </div>
          }>
            <SearchResultsContent query={query} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
