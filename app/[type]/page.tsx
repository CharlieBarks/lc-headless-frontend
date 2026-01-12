import Link from 'next/link';
import { notFound } from 'next/navigation';
import { UtensilsCrossed, Building2, Bed, Landmark, ChevronRight } from 'lucide-react';
import { getCachedArchiveData } from '../../lib/wordpress';
import type { Metadata } from 'next';
import { ArchiveFilters } from '../components/ArchiveFilters';
import { ListingsGrid } from '../components/ListingsGrid';

export const revalidate = 3600;

type Props = {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ search?: string; category?: string }>;
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

export default async function ArchivePage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { type } = resolvedParams;
  const { search, category } = resolvedSearchParams;
  const config = typeConfig[type];

  if (!config) {
    notFound();
  }

  const { listings, categories } = await getCachedArchiveData(type, category, search);

  const IconComponent = config.icon;

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
              <IconComponent className="w-10 h-10 text-white" />
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
          <ArchiveFilters categories={categories} type={type} />

          <ListingsGrid
            listings={listings}
            type={type}
            config={{ title: config.title, description: config.description }}
          />
        </div>
      </section>
    </>
  );
}
