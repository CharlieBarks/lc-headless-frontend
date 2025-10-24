import Link from 'next/link';
import { UtensilsCrossed, Building2, Bed, Landmark, ChevronRight } from 'lucide-react';
import { wordpressAPI, getListingImage, type Category } from '../../../lib/wordpress';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ type: string }>;
};

const typeConfig: Record<string, { title: string; icon: any; description: string }> = {
  restaurant: {
    title: 'Restaurants',
    icon: UtensilsCrossed,
    description: 'Discover the best dining experiences in Las Cruces'
  },
  business: {
    title: 'Businesses',
    icon: Building2,
    description: 'Find local services and businesses'
  },
  accommodation: {
    title: 'Accommodations',
    icon: Bed,
    description: 'Places to stay in Las Cruces'
  },
  places: {
    title: 'Places',
    icon: Landmark,
    description: 'Explore attractions and points of interest'
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const config = typeConfig[type];

  if (!config) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${config.title} in Las Cruces - Las Cruces Directory`,
    description: `${config.description}. Browse our complete directory of ${config.title.toLowerCase()} in Las Cruces, New Mexico.`,
    openGraph: {
      title: `${config.title} in Las Cruces`,
      description: config.description,
      type: 'website',
    },
  };
}

export default async function ArchivePage({ params }: Props) {
  const resolvedParams = await params;
  const { type } = resolvedParams;
  const config = typeConfig[type];

  if (!config) {
    return <div>Type not found</div>;
  }

  const Icon = config.icon;

  let listings: any[] = [];
  let categories: Category[] = [];

  try {
    switch (type) {
      case 'restaurant':
        [listings, categories] = await Promise.all([
          wordpressAPI.getRestaurants(50),
          wordpressAPI.getRestaurantCategories()
        ]);
        break;
      case 'business':
        [listings, categories] = await Promise.all([
          wordpressAPI.getBusinesses(50),
          wordpressAPI.getBusinessCategories()
        ]);
        break;
      case 'accommodation':
        [listings, categories] = await Promise.all([
          wordpressAPI.getAccommodations(50),
          wordpressAPI.getAccommodationCategories()
        ]);
        break;
      case 'places':
        [listings, categories] = await Promise.all([
          wordpressAPI.getPlaces(50),
          wordpressAPI.getPlaceCategories()
        ]);
        break;
    }
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
  }

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-slate-300 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{config.title}</span>
          </nav>

          <div className="flex items-center space-x-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Icon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">{config.title}</h1>
              <p className="text-xl text-slate-300">{config.description}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-slate-300">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              {listings.length} listings
            </span>
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              {categories.length} categories
            </span>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {categories.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Browse by Category</h2>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/archive/${type}?category=${category.id}`}
                    className="px-4 py-2 bg-white border-2 border-slate-200 rounded-lg hover:border-emerald-500 hover:text-emerald-600 transition-all font-medium text-slate-700"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing) => {
              const imageUrl = getListingImage(listing, type as any);

              return (
                <Link
                  key={listing.id}
                  href={`/${type}/${listing.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={listing.title.rendered}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {listing.rating && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-slate-900">
                        ⭐ {listing.rating.toFixed(1)}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {listing.title.rendered}
                    </h3>
                    {listing.city && (
                      <p className="text-slate-600 text-sm mb-2">
                        {listing.city}, {listing.region}
                      </p>
                    )}
                    {listing.default_category && (
                      <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-semibold">
                        {listing.default_category}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {listings.length === 0 && (
            <div className="text-center py-16">
              <Icon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No listings found</h3>
              <p className="text-slate-600">Check back soon for new {config.title.toLowerCase()}!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
