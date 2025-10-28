import { MetadataRoute } from 'next';
import { wordpressAPI } from '../lib/wordpress';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lascrucesdirectory.com';

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/restaurant`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/business`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/accommodation`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/places`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  try {
    const [restaurants, businesses, accommodations, places, blogPosts] = await Promise.all([
      wordpressAPI.getRestaurants(500),
      wordpressAPI.getBusinesses(500),
      wordpressAPI.getAccommodations(500),
      wordpressAPI.getPlaces(500),
      wordpressAPI.getBlogPosts(500),
    ]);

    const restaurantRoutes = restaurants.map((listing) => ({
      url: `${baseUrl}/restaurant/${listing.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    const businessRoutes = businesses.map((listing) => ({
      url: `${baseUrl}/business/${listing.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    const accommodationRoutes = accommodations.map((listing) => ({
      url: `${baseUrl}/accommodation/${listing.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    const placeRoutes = places.map((listing) => ({
      url: `${baseUrl}/places/${listing.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    const blogRoutes = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [
      ...staticRoutes,
      ...restaurantRoutes,
      ...businessRoutes,
      ...accommodationRoutes,
      ...placeRoutes,
      ...blogRoutes,
    ];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticRoutes;
  }
}
