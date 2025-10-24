'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getListingImage } from '../../lib/wordpress';

interface ListingsGridProps {
  listings: any[];
  type: string;
  Icon: any;
  config: {
    title: string;
    description: string;
  };
}

export function ListingsGrid({ listings, type, Icon, config }: ListingsGridProps) {
  const [displayCount, setDisplayCount] = useState(12);

  const visibleListings = listings.slice(0, displayCount);
  const hasMore = displayCount < listings.length;

  const showMore = () => {
    setDisplayCount(prev => Math.min(prev + 12, listings.length));
  };

  if (listings.length === 0) {
    return (
      <div className="text-center py-16">
        <Icon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-slate-900 mb-2">No listings found</h3>
        <p className="text-slate-600">Check back soon for new {config.title.toLowerCase()}!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleListings.map((listing) => {
          const imageUrl = getListingImage(listing, type as any);

          return (
            <Link
              key={listing.id}
              href={`/${type}/${listing.slug}`}
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
                    ⭐ {typeof listing.rating === 'number' ? listing.rating.toFixed(1) : parseFloat(listing.rating).toFixed(1)}
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
                {(listing.post_category && listing.post_category.length > 0) && (
                  <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-semibold">
                    {listing.post_category[0].name.replace(/&amp;/g, '&')}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-12 text-center">
          <button
            onClick={showMore}
            className="px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Show More ({listings.length - displayCount} remaining)
          </button>
        </div>
      )}
    </>
  );
}
