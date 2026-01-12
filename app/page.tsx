import { UtensilsCrossed, Building2, Bed, Landmark, Calendar, CheckCircle, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getListingImage, getBlogPostImage, decodeHtmlEntities, isListingClaimed, isListingFeatured, getCachedHomePageData } from '../lib/wordpress';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Las Cruces Directory - Discover Local Businesses & Restaurants',
  description: 'Your complete guide to restaurants, businesses, accommodations, and places in Las Cruces, NM. Discover what makes our community special.',
};

export default async function HomePage() {
  const { featuredListings, blogPosts, categoryCounts } = await getCachedHomePageData();

  const categories = [
    {
      id: 'restaurant',
      name: 'Restaurants',
      icon: UtensilsCrossed,
      description: 'Discover local dining',
      color: 'from-emerald-500 to-green-600',
      count: categoryCounts.restaurants
    },
    {
      id: 'business',
      name: 'Businesses',
      icon: Building2,
      description: 'Find local services',
      color: 'from-emerald-500 to-green-600',
      count: categoryCounts.businesses
    },
    {
      id: 'accommodation',
      name: 'Accommodations',
      icon: Bed,
      description: 'Places to stay',
      color: 'from-emerald-500 to-green-600',
      count: categoryCounts.accommodations
    },
    {
      id: 'places',
      name: 'Places',
      icon: Landmark,
      description: 'Explore attractions',
      color: 'from-emerald-500 to-green-600',
      count: categoryCounts.places
    }
  ];

  const getCategoryType = (listing: any): string => {
    const url = listing.link || '';
    if (url.includes('/restaurant/')) return 'restaurant';
    if (url.includes('/business/')) return 'business';
    if (url.includes('/accommodation/')) return 'accommodation';
    if (url.includes('/places/')) return 'places';
    return 'business';
  };

  const getDefaultCategoryName = (listing: any): string => {
    if (listing.post_category && listing.post_category.length > 0) {
      const defaultCatId = listing.default_category;
      if (defaultCatId) {
        const defaultCat = listing.post_category.find((cat: any) => cat.id === parseInt(defaultCatId));
        if (defaultCat) {
          return decodeHtmlEntities(defaultCat.name);
        }
      }
      return decodeHtmlEntities(listing.post_category[0].name);
    }
    return 'Listing';
  };

  const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>/g, '').trim();
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-las-cruces.jpg"
            alt="Las Cruces cityscape with Organ Mountains"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-300 text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
              Your Local Community Guide
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Discover
              <span className="block bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">
                Las Cruces
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Your complete guide to local businesses, restaurants, accommodations, and hidden gems in our community.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="categories-heading" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 id="categories-heading" className="text-4xl font-bold text-slate-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-slate-600">Explore what makes Las Cruces special</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/${category.id}`}
                aria-label={`Browse ${category.name} - ${category.count} listings available`}
                className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <div className="p-8 relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <category.icon className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{category.name}</h3>
                  <p className="text-slate-600 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-emerald-600">{category.count} listings</span>
                    <span className="text-emerald-600 group-hover:translate-x-2 transition-transform" aria-hidden="true">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="featured-heading" className="py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 id="featured-heading" className="text-4xl font-bold text-slate-900 mb-4">Featured Listings</h2>
            <p className="text-xl text-slate-600">Discover popular local spots</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredListings.map((listing) => {
              const type = getCategoryType(listing);
              const categoryLabel = getDefaultCategoryName(listing);
              const imageUrl = getListingImage(listing, type as any);

              return (
                <article key={listing.id}>
                <Link
                  href={`/${type}/${listing.slug}`}
                  aria-label={`View ${decodeHtmlEntities(listing.title.rendered)} - ${categoryLabel}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={decodeHtmlEntities(listing.title.rendered)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {isListingClaimed(listing) && (
                        <div className="px-3 py-1 bg-blue-500/90 backdrop-blur-sm rounded-full text-sm font-semibold text-white flex items-center gap-1.5 shadow-lg">
                          <CheckCircle className="w-4 h-4" aria-hidden="true" />
                          Claimed
                        </div>
                      )}
                      {isListingFeatured(listing) && (
                        <div className="px-3 py-1 bg-amber-500/90 backdrop-blur-sm rounded-full text-sm font-semibold text-white flex items-center gap-1.5 shadow-lg">
                          <Star className="w-4 h-4 fill-white" aria-hidden="true" />
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-emerald-600">
                        {categoryLabel}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {decodeHtmlEntities(listing.title.rendered)}
                    </h3>
                    {listing.city && (
                      <p className="text-slate-600 text-sm">
                        {listing.city}, {listing.region}
                      </p>
                    )}
                  </div>
                </Link>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="articles-heading" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 id="articles-heading" className="text-4xl font-bold text-slate-900 mb-4">Latest Articles</h2>
              <p className="text-xl text-slate-600">Stories and updates from our community</p>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center space-x-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors group"
            >
              <span>View all</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => {
              const imageUrl = getBlogPostImage(post);
              const excerpt = stripHtml(post.excerpt.rendered);

              return (
                <article key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  aria-label={`Read article: ${decodeHtmlEntities(post.title.rendered)}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={decodeHtmlEntities(post.title.rendered)}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-slate-500 mb-3">
                      <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
                      {formatDate(post.date)}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                      {decodeHtmlEntities(post.title.rendered)}
                    </h3>
                    <p className="text-slate-600 line-clamp-2">{decodeHtmlEntities(excerpt)}</p>
                  </div>
                </Link>
              </article>
              );
            })}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
            >
              <span>View all articles</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
