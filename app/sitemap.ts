import { MetadataRoute } from 'next';
// Removed - using GraphQL directly instead

export const revalidate = 3600;

// GraphQL helper function
async function fetchGraphQL(query: string) {
  const response = await fetch('https://dir.lascrucesdirectory.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 }
  });
  const json = await response.json();
  if (json.errors) {
    console.error('GraphQL errors:', json.errors);
    throw new Error(json.errors[0]?.message || 'GraphQL error');
  }
  return json.data;
}

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
    console.log('Sitemap: Starting to fetch listings via GraphQL...');
    
    // GraphQL queries for each post type
    const queries = {
      restaurants: `{
        restaurants(first: 1000) {
          edges {
            node {
              slug
              modified
            }
          }
        }
      }`,
      businesses: `{
        businesses(first: 1000) {
          edges {
            node {
              slug
              modified
            }
          }
        }
      }`,
      accommodations: `{
        accommodations(first: 1000) {
          edges {
            node {
              slug
              modified
            }
          }
        }
      }`,
      places: `{
        places(first: 1000) {
          edges {
            node {
              slug
              modified
            }
          }
        }
      }`,
      posts: `{
        posts(first: 500) {
          edges {
            node {
              slug
              modified
            }
          }
        }
      }`
    };

    // Fetch all data with error handling
    const results = await Promise.allSettled([
      fetchGraphQL(queries.restaurants).catch(err => { console.error('Error fetching restaurants:', err); return null; }),
      fetchGraphQL(queries.businesses).catch(err => { console.error('Error fetching businesses:', err); return null; }),
      fetchGraphQL(queries.accommodations).catch(err => { console.error('Error fetching accommodations:', err); return null; }),
      fetchGraphQL(queries.places).catch(err => { console.error('Error fetching places:', err); return null; }),
      fetchGraphQL(queries.posts).catch(err => { console.error('Error fetching posts:', err); return null; }),
    ]);

    const restaurantData = results[0].status === 'fulfilled' && results[0].value ? results[0].value : null;
    const businessData = results[1].status === 'fulfilled' && results[1].value ? results[1].value : null;
    const accommodationData = results[2].status === 'fulfilled' && results[2].value ? results[2].value : null;
    const placeData = results[3].status === 'fulfilled' && results[3].value ? results[3].value : null;
    const postData = results[4].status === 'fulfilled' && results[4].value ? results[4].value : null;

    // Extract edges and map to routes
    const restaurants = restaurantData?.restaurants?.edges || [];
    const businesses = businessData?.businesses?.edges || [];
    const accommodations = accommodationData?.accommodations?.edges || [];
    const places = placeData?.places?.edges || [];
    const blogPosts = postData?.posts?.edges || [];

    console.log(`Sitemap: Fetched ${restaurants.length} restaurants`);
    console.log(`Sitemap: Fetched ${businesses.length} businesses`);
    console.log(`Sitemap: Fetched ${accommodations.length} accommodations`);
    console.log(`Sitemap: Fetched ${places.length} places`);
    console.log(`Sitemap: Fetched ${blogPosts.length} blog posts`);

    const restaurantRoutes: MetadataRoute.Sitemap = restaurants.map((item: any) => ({
      url: `${baseUrl}/restaurant/${item.node.slug}`,
      lastModified: new Date(item.node.modified),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    const businessRoutes: MetadataRoute.Sitemap = businesses.map((item: any) => ({
      url: `${baseUrl}/business/${item.node.slug}`,
      lastModified: new Date(item.node.modified),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    const accommodationRoutes: MetadataRoute.Sitemap = accommodations.map((item: any) => ({
      url: `${baseUrl}/accommodation/${item.node.slug}`,
      lastModified: new Date(item.node.modified),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    const placeRoutes: MetadataRoute.Sitemap = places.map((item: any) => ({
      url: `${baseUrl}/places/${item.node.slug}`,
      lastModified: new Date(item.node.modified),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((item: any) => ({
      url: `${baseUrl}/blog/${item.node.slug}`,
      lastModified: new Date(item.node.modified),
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
