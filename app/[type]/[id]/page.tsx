import Link from 'next/link';
import { MapPin, Phone, Mail, Globe, Clock, Star, ChevronRight, Facebook, Instagram, Twitter } from 'lucide-react';
import { wordpressAPI, getAllListingImages } from '../../../lib/wordpress';
import { fetchRankMathSEO } from '../../../lib/seo';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ type: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { type, id } = resolvedParams;
  const listing = await wordpressAPI.getListingById(type, id);

  if (!listing) {
    return {
      title: 'Not Found',
    };
  }

  const seoData = await fetchRankMathSEO(listing.link);

  return {
    title: seoData.title || listing.title.rendered,
    description: seoData.description || `Visit ${listing.title.rendered} in Las Cruces, NM.`,
    openGraph: {
      title: seoData.ogTitle || listing.title.rendered,
      description: seoData.ogDescription || `Visit ${listing.title.rendered} in Las Cruces, NM.`,
      images: seoData.ogImage ? [seoData.ogImage] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.twitterTitle || listing.title.rendered,
      description: seoData.twitterDescription || `Visit ${listing.title.rendered} in Las Cruces, NM.`,
      images: seoData.twitterImage ? [seoData.twitterImage] : undefined,
    },
    alternates: {
      canonical: seoData.canonical,
    },
    robots: seoData.robots,
  };
}

export default async function ListingPage({ params }: Props) {
  const resolvedParams = await params;
  const { type, id } = resolvedParams;
  const listing = await wordpressAPI.getListingById(type, id);

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
      if (hoursData.days) {
        return Object.entries(hoursData.days)
          .map(([day, info]: [string, any]) => {
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

  return (
    <>
      <nav className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/archive/${type}`} className="hover:text-emerald-600 transition-colors capitalize">
              {type}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium">{listing.title.rendered}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-5xl font-bold text-slate-900 mb-4">{listing.title.rendered}</h1>

              {listing.default_category && (
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-sm font-semibold">
                    {listing.default_category}
                  </span>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-2xl shadow-lg ${
                    index === 0 ? 'md:col-span-2 h-96' : 'h-64'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${listing.title.rendered} - Image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>

            {content && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">About</h2>
                <div
                  className="wp-content"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            )}

            {businessHours && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Hours</h2>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-emerald-600 mt-1" />
                  <div className="text-slate-700 whitespace-pre-line">{businessHours}</div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h3>

              <div className="space-y-4">
                {(listing.street || listing.city) && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
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
                    <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
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
                    <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0" />
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
                    <Globe className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <a
                      href={listing.website}
                      target="_blank"
                      rel="noopener noreferrer"
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
                        href={listing.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-colors"
                      >
                        <Facebook className="w-5 h-5" />
                      </a>
                    )}
                    {listing.instagram && (
                      <a
                        href={listing.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-colors"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                    {listing.twitter && (
                      <a
                        href={listing.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
