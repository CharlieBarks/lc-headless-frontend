import { MetadataRoute } from 'next';
import { wordpressAPI } from '../lib/wordpress';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

// WPGraphQL plugin now installed and active
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lascrucesdirectory.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/restaurant`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/business`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/accommodation`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/places`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  try {
    console.log('Sitemap: Starting to fetch listings...');
    
    // Fetch with increased limits and individual error handling
    const results = await Promise.allSettled([
      wordpressAPI.getRestaurants(1000).catch(err => {
        console.error('Error fetching restaurants:', err);
        return [];
      }),
      wordpressAPI.getBusinesses(1000).catch(err => {
        console.error('Error fetching businesses:', err);
        return [];
      }),
      wordpressAPI.getAccommodations(1000).catch(err => {
        console.error('Error fetching accommodations:', err);
        return [];
      }),
      wordpressAPI.getPlaces(1000).catch(err => {
        console.error('Error fetching places:', err);
        return [];
      }),
      wordpressAPI.getBlogPosts(500).catch(err => {
        console.error('Error fetching blog posts:', err);
        return [];
      }),
    ]);

    const restaurants = results[0].status === 'fulfilled' ? results[0].value : [];
    const businesses = results[1].status === 'fulfilled' ? results[1].value : [];
    const accommodations = results[2].status === 'fulfilled' ? results[2].value : [];
    const places = results[3].status === 'fulfilled' ? results[3].value : [];
    const blogPosts = results[4].status === 'fulfilled' ? results[4].value : [];

    console.log(`Sitemap: Fetched ${restaurants.length} restaurants`);
    console.log(`Sitemap: Fetched ${businesses.length} businesses`);
    console.log(`Sitemap: Fetched ${accommodations.length} accommodations`);
    console.log(`Sitemap: Fetched ${places.length} places`);
    console.log(`Sitemap: Fetched ${blogPosts.length} blog posts`);

    const restaurantRoutes: MetadataRoute.Sitemap = restaurants.map((listing: any) => ({
      url: `${baseUrl}/restaurant/${listing.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    const businessRoutes: MetadataRoute.Sitemap = businesses.map((listing: any) => ({
      url: `${baseUrl}/business/${listing.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    const accommodationRoutes: MetadataRoute.Sitemap = accommodations.map((listing: any) => ({
      url: `${baseUrl}/accommodation/${listing.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    const placeRoutes: MetadataRoute.Sitemap = places.map((listing: any) => ({
      url: `${baseUrl}/places/${listing.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    const allRoutes = [
      ...staticRoutes,
      ...restaurantRoutes,
      ...businessRoutes,
      ...accommodationRoutes,
      ...placeRoutes,
      ...blogRoutes,
    ];

    console.log(`Sitemap: Generated ${allRoutes.length} total URLs`);
    
    return allRoutes;
  } catch (error) {
    console.error('Sitemap: Critical error generating sitemap:', error);
    console.log('Sitemap: Falling back to static routes only');
    return staticRoutes;
  }
}
