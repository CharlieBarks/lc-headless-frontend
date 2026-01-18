import Link from 'next/link';
import { headers } from 'next/headers';
import { MapPin, Phone, Mail, Globe, Clock, Star, ChevronRight, Facebook, Instagram, Twitter, CheckCircle, Flag } from 'lucide-react';
import { getAllListingImages, getListingImage, decodeHtmlEntities, isListingClaimed, isListingFeatured, getCachedListingBySlug } from '../../../lib/wordpress';
import { getCachedListingSEO, generateLocalBusinessSchema, generateRestaurantSchema, generateLodgingSchema, generateBreadcrumbSchema, JsonLdScript } from '../../../lib/seo';
import type { Metadata } from 'next';
import ImageGallery from '../../components/ImageGallery';

export const revalidate = 3600;

type Props = {
  params: Promise<{ type: string; slug: string }>;
};

const TYPE_LABELS: Record<string, string> = {
  restaurant: 'Restaurants',
  business: 'Businesses',
  accommodation: 'Accommodations',
  places: 'Places',
};

function addReferrer(url: string): string {
  if (!url) return url;
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('referrer', 'lascrucesdirectory.com');
    return urlObj.toString();
  } catch {
    return url;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { type, slug } = resolvedParams;
  const listing = await getCachedListingBySlug(type, slug);

  if (!listing) {
    return {
      title: 'Not Found',
    };
  }

  const headersList = await headers();
  const host = headersList.get('host') || '';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const currentUrl = `${protocol}://${host}/${type}/${slug}`;

  const seoData = await getCachedListingSEO(type, slug);
  const title = decodeHtmlEntities(listing.title.rendered);
  const description = `Visit ${title} in Las Cruces, NM. Find contact info, hours, and reviews.`;
  const image = getListingImage(listing, type as any);

  return {
    title: seoData.title || `${title} | Las Cruces Directory`,
    description: seoData.description || description,
    openGraph: {
      title: seoData.ogTitle || title,
      description: seoData.ogDescription || description,
      images: seoData.ogImage ? [seoData.ogImage] : image ? [image] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.twitterTitle || title,
      description: seoData.twitterDescription || description,
      images: seoData.twitterImage ? [seoData.twitterImage] : image ? [image] : undefined,
    },
    alternates: {
      canonical: currentUrl,
    },
  };
}

export default async function ListingPage({ params }: Props) {
  const resolvedParams = await params;
  const { type, slug } = resolvedParams;
  const listing = await getCachedListingBySlug(type, slug);

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Listing Not Found</h1>
          <Link href="/" className="text-emerald-600 hover:text-emerald-700 font-medium">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const images = getAllListingImages(listing, type as any);
  const content = listing.content?.rendered || listing.post_content || '';

  const getBusinessHours = (): string => {
    if (!listing.business_hours) return '';
    if (typeof listing.business_hours === 'string') return listing.business_hours;
    if (typeof listing.business_hours === 'object' && listing.business_hours.rendered) {
      const hoursData = listing.business_hours.rendered;
      if (typeof hoursData === 'string') return hoursData;
      if (typeof hoursData === 'object' && hoursData.days) {
        return Object.entries(hoursData.days)
          .map(([day, info]) => {
            const dayName = info.day || day;
            const slots = info.slots || [];
            const range = slots[0]?.range || 'Closed';
            return `${dayName}: ${range}`;
          })
          .join('\n');
      }
    }
    return '';
  };

  const businessHours = getBusinessHours();

  const title = decodeHtmlEntities(listing.title.rendered);
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
      addressCountry: 'US',
    },
    geo: listing.latitude && listing.longitude ? {
      latitude: listing.latitude,
      longitude: listing.longitude,
    } : undefined,
    telephone: listing.phone,
    email: listing.email,
    url: listing.website,
    aggregateRating: (listing.rating && listing.rating >= 1 && listing.rating <= 5) ? {
      ratingValue: listing.rating,
      reviewCount: listing.rating_count || 1,
    } : undefined,
  };

  let businessSchema;
  if (type === 'restaurant') {
    businessSchema = generateRestaurantSchema(schemaData);
  } else if (type === 'accommodation') {
    businessSchema = generateLodgingSchema(schemaData);
  } else {
    businessSchema = generateLocalBusinessSchema(schemaData);
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://lascrucesdirectory.com' },
    { name: TYPE_LABELS[type] || type, url: `https://lascrucesdirectory.com/${type}` },
    { name: title, url: `https://lascrucesdirectory.com/${type}/${slug}` },
  ]);

  return (
    <>
      <JsonLdScript data={[businessSchema, breadcrumbSchema]} />
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
            <Link href={`/${type}`} className="hover:text-emerald-600 transition-colors capitalize">
              {type}
            </Link>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
            <span className="text-slate-900 font-medium">{decodeHtmlEntities(listing.title.rendered)}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-start gap-4 mb-4">
                <h1 className="text-5xl font-bold text-slate-900 flex-1">{decodeHtmlEntities(listing.title.rendered)}</h1>
                <div className="flex gap-2 pt-2">
                  {isListingClaimed(listing) && (
                    <div className="px-4 py-2 bg-blue-500 rounded-full text-sm font-semibold text-white flex items-center gap-2 shadow-lg">
                      <CheckCircle className="w-5 h-5" aria-hidden="true" />
                      Claimed
                    </div>
                  )}
                  {isListingFeatured(listing) && (
                    <div className="px-4 py-2 bg-amber-500 rounded-full text-sm font-semibold text-white flex items-center gap-2 shadow-lg">
                      <Star className="w-5 h-5 fill-white" aria-hidden="true" />
                      Featured
                    </div>
                  )}
                </div>
              </div>

              {listing.post_category && listing.post_category.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {listing.post_category.map((category) => (
                    <span
                      key={category.id}
                      className="inline-block px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-sm font-semibold"
                    >
                      {category.name.replace(/&amp;/g, '&')}
                    </span>
                  ))}
                </div>
              )}

              {listing.rating && typeof listing.rating === 'number' && !isNaN(listing.rating) && (
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(listing.rating!)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-slate-900">{listing.rating.toFixed(1)}</span>
                  {listing.rating_count && (
                    <span className="text-slate-600">({listing.rating_count} reviews)</span>
                  )}
                </div>
              )}
            </div>

            <ImageGallery images={images} altText={listing.title.rendered} />

            {content && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">About</h2>
                <div
                  className="wp-content"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h3>

              <div className="space-y-4">
                {(listing.street || listing.city) && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" aria-hidden="true" />
                    <div className="text-slate-700">
                      {listing.street && <div>{listing.street}</div>}
                      {listing.city && (
                        <div>
                          {listing.city}, {listing.region} {listing.zip}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {listing.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" aria-hidden="true" />
                    <a
                      href={`tel:${listing.phone}`}
                      className="text-slate-700 hover:text-emerald-600 transition-colors"
                    >
                      {listing.phone}
                    </a>
                  </div>
                )}

                {listing.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0" aria-hidden="true" />
                    <a
                      href={`mailto:${listing.email}`}
                      className="text-slate-700 hover:text-emerald-600 transition-colors break-all"
                    >
                      {listing.email}
                    </a>
                  </div>
                )}

                {listing.website && (
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-emerald-600 flex-shrink-0" aria-hidden="true" />
                    <a
                      href={addReferrer(listing.website)}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="text-slate-700 hover:text-emerald-600 transition-colors break-all"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>

              {(listing.facebook || listing.instagram || listing.twitter) && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-4">Follow Us</h4>
                  <div className="flex space-x-3">
                    {listing.facebook && (
                      <a
                        href={addReferrer(listing.facebook)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Follow on Facebook"
                        className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                      >
                        <Facebook className="w-5 h-5" aria-hidden="true" />
                      </a>
                    )}
                    {listing.instagram && (
                      <a
                        href={addReferrer(listing.instagram)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Follow on Instagram"
                        className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                      >
                        <Instagram className="w-5 h-5" aria-hidden="true" />
                      </a>
                    )}
                    {listing.twitter && (
                      <a
                        href={addReferrer(listing.twitter)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Follow on Twitter"
                        className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                      >
                        <Twitter className="w-5 h-5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {businessHours && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-4">Hours of Operation</h4>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" aria-hidden="true" />
                    <div className="text-slate-700 text-sm whitespace-pre-line">{businessHours}</div>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-slate-200">
                <a
                  href={`mailto:support@lascrucesdirectory.com?subject=Claim Listing: ${encodeURIComponent(title)}&body=I would like to claim this listing:%0A%0ABusiness: ${encodeURIComponent(title)}%0AURL: https://lascrucesdirectory.com/${type}/${slug}%0A%0APlease provide verification that you are the owner or authorized representative of this business.`}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors"
                >
                  <Flag className="w-4 h-4" aria-hidden="true" />
                  Claim This Listing
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
