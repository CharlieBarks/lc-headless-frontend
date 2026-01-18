import type { Listing, BlogPost, Page, Category, CategoryCount } from './types';

const WP_API_BASE = "https://dir.lascrucesdirectory.com/wp-json/geodir/v2";
const WP_POSTS_API = "https://dir.lascrucesdirectory.com/wp-json/wp/v2";

async function fetchWp(url: string, options: RequestInit = {}) {
  if (typeof window === "undefined") {
    return fetch(url, options);
  }
  const urlObj = new URL(url);
  const pathAndQuery = urlObj.pathname + urlObj.search;
  const proxiedUrl = `/api/wp-proxy?path=${encodeURIComponent(pathAndQuery)}`;
  return fetch(proxiedUrl, options);
}

export const wordpressAPI = {
  async getRestaurants(
    limit = 3,
    category?: string | number,
    searchQuery?: string,
  ): Promise<Listing[]> {
    try {
      let url = `${WP_API_BASE}/restaurant?per_page=${limit}&_embed`;
      if (category) url += `&gd_restaurantcategory=${category}`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
      const response = await fetchWp(url, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error("Failed to fetch restaurants");
      return await response.json();
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      return [];
    }
  },

  async getRestaurantCategories(): Promise<Category[]> {
    try {
      const response = await fetchWp(
        `${WP_API_BASE}/restaurant/categories?per_page=100`,
        { next: { revalidate: 3600 } },
      );
      if (!response.ok) throw new Error("Failed to fetch restaurant categories");
      const categories = await response.json();
      return categories.filter((cat: Category & { count: number }) => cat.count > 0);
    } catch (error) {
      console.error("Error fetching restaurant categories:", error);
      return [];
    }
  },

  async getBusinesses(
    limit = 3,
    category?: string | number,
    searchQuery?: string,
  ): Promise<Listing[]> {
    try {
      let url = `${WP_API_BASE}/business?per_page=${limit}&_embed`;
      if (category) url += `&gd_businesscategory=${category}`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
      const response = await fetchWp(url, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error("Failed to fetch businesses");
      return await response.json();
    } catch (error) {
      console.error("Error fetching businesses:", error);
      return [];
    }
  },

  async getBusinessCategories(): Promise<Category[]> {
    try {
      const response = await fetchWp(
        `${WP_API_BASE}/business/categories?per_page=100`,
        { next: { revalidate: 3600 } },
      );
      if (!response.ok) throw new Error("Failed to fetch business categories");
      const categories = await response.json();
      return categories.filter((cat: Category & { count: number }) => cat.count > 0);
    } catch (error) {
      console.error("Error fetching business categories:", error);
      return [];
    }
  },

  async getAccommodations(
    limit = 3,
    category?: string | number,
    searchQuery?: string,
  ): Promise<Listing[]> {
    try {
      let url = `${WP_API_BASE}/accommodation?per_page=${limit}&_embed`;
      if (category) url += `&gd_accommodationcategory=${category}`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
      const response = await fetchWp(url, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error("Failed to fetch accommodations");
      return await response.json();
    } catch (error) {
      console.error("Error fetching accommodations:", error);
      return [];
    }
  },

  async getAccommodationCategories(): Promise<Category[]> {
    try {
      const response = await fetchWp(
        `${WP_API_BASE}/accommodation/categories?per_page=100`,
        { next: { revalidate: 3600 } },
      );
      if (!response.ok) throw new Error("Failed to fetch accommodation categories");
      const categories = await response.json();
      return categories.filter((cat: Category & { count: number }) => cat.count > 0);
    } catch (error) {
      console.error("Error fetching accommodation categories:", error);
      return [];
    }
  },

  async getPlaces(
    limit = 3,
    category?: string | number,
    searchQuery?: string,
  ): Promise<Listing[]> {
    try {
      let url = `${WP_API_BASE}/places?per_page=${limit}&_embed`;
      if (category) url += `&gd_placecategory=${category}`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
      const response = await fetchWp(url, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error("Failed to fetch places");
      return await response.json();
    } catch (error) {
      console.error("Error fetching places:", error);
      return [];
    }
  },

  async getPlaceCategories(): Promise<Category[]> {
    try {
      const response = await fetchWp(
        `${WP_API_BASE}/places/categories?per_page=100`,
        { next: { revalidate: 3600 } },
      );
      if (!response.ok) throw new Error("Failed to fetch place categories");
      const categories = await response.json();
      return categories.filter((cat: Category & { count: number }) => cat.count > 0);
    } catch (error) {
      console.error("Error fetching place categories:", error);
      return [];
    }
  },

  async getFeaturedListings(limit = 3): Promise<Listing[]> {
    try {
      const [restaurants, businesses] = await Promise.all([
        fetchWp(`${WP_API_BASE}/restaurant?per_page=100&_embed`, { next: { revalidate: 3600 } }),
        fetchWp(`${WP_API_BASE}/business?per_page=100&_embed`, { next: { revalidate: 3600 } }),
      ]);

      const results = await Promise.all([
        restaurants.ok ? restaurants.json() : [],
        businesses.ok ? businesses.json() : [],
      ]);

      const allListings = [...results[0], ...results[1]];
      const withFeaturedImages = allListings.filter(
        (listing: Listing) => listing.featured_image && typeof listing.featured_image === 'object' && listing.featured_image.src,
      );
      const shuffled = withFeaturedImages.sort(() => Math.random() - 0.5);
      return shuffled.slice(0, limit);
    } catch (error) {
      console.error("Error fetching featured listings:", error);
      return [];
    }
  },

  async getBlogPosts(limit = 3): Promise<BlogPost[]> {
    try {
      const response = await fetchWp(
        `${WP_POSTS_API}/posts?per_page=${limit}&_embed`,
        { next: { revalidate: 3600 } },
      );
      if (!response.ok) throw new Error("Failed to fetch blog posts");
      return await response.json();
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return [];
    }
  },

  async getCategoryCounts(): Promise<CategoryCount> {
    try {
      const [restaurants, businesses, accommodations, places] = await Promise.all([
        fetchWp(`${WP_API_BASE}/restaurant?per_page=1`, { next: { revalidate: 3600 } }),
        fetchWp(`${WP_API_BASE}/business?per_page=1`, { next: { revalidate: 3600 } }),
        fetchWp(`${WP_API_BASE}/accommodation?per_page=1`, { next: { revalidate: 3600 } }),
        fetchWp(`${WP_API_BASE}/places?per_page=1`, { next: { revalidate: 3600 } }),
      ]);

      return {
        restaurants: parseInt(restaurants.headers.get("X-WP-Total") || "0"),
        businesses: parseInt(businesses.headers.get("X-WP-Total") || "0"),
        accommodations: parseInt(accommodations.headers.get("X-WP-Total") || "0"),
        places: parseInt(places.headers.get("X-WP-Total") || "0"),
      };
    } catch (error) {
      console.error("Error fetching category counts:", error);
      return { restaurants: 0, businesses: 0, accommodations: 0, places: 0 };
    }
  },

  async searchListings(query: string, limit = 10): Promise<Listing[]> {
    try {
      const [restaurants, businesses, accommodations, places] = await Promise.all([
        fetchWp(`${WP_API_BASE}/restaurant?search=${encodeURIComponent(query)}&per_page=${limit}`, { next: { revalidate: 3600 } }),
        fetchWp(`${WP_API_BASE}/business?search=${encodeURIComponent(query)}&per_page=${limit}`, { next: { revalidate: 3600 } }),
        fetchWp(`${WP_API_BASE}/accommodation?search=${encodeURIComponent(query)}&per_page=${limit}`, { next: { revalidate: 3600 } }),
        fetchWp(`${WP_API_BASE}/places?search=${encodeURIComponent(query)}&per_page=${limit}`, { next: { revalidate: 3600 } }),
      ]);

      const results = await Promise.all([
        restaurants.json(),
        businesses.json(),
        accommodations.json(),
        places.json(),
      ]);

      return [...results[0], ...results[1], ...results[2], ...results[3]].slice(0, limit);
    } catch (error) {
      console.error("Error searching listings:", error);
      return [];
    }
  },

  async getListingBySlug(type: string, slug: string): Promise<Listing | null> {
    try {
      const response = await fetchWp(`${WP_API_BASE}/${type}?slug=${slug}&_embed`, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error("Failed to fetch listing");
      const listings = await response.json();
      return listings.length > 0 ? listings[0] : null;
    } catch (error) {
      console.error("Error fetching listing:", error);
      return null;
    }
  },

  async getListingById(type: string, id: string): Promise<Listing | null> {
    try {
      const response = await fetchWp(`${WP_API_BASE}/${type}/${id}?_embed`, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error("Failed to fetch listing");
      return await response.json();
    } catch (error) {
      console.error("Error fetching listing:", error);
      return null;
    }
  },

  async getBlogPostById(id: string): Promise<BlogPost | null> {
    try {
      const response = await fetchWp(`${WP_POSTS_API}/posts/${id}?_embed`, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error("Failed to fetch blog post");
      return await response.json();
    } catch (error) {
      console.error("Error fetching blog post:", error);
      return null;
    }
  },

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const response = await fetchWp(`${WP_POSTS_API}/posts?slug=${slug}&_embed`, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error("Failed to fetch blog post");
      const posts = await response.json();
      return posts.length > 0 ? posts[0] : null;
    } catch (error) {
      console.error("Error fetching blog post:", error);
      return null;
    }
  },

  async getPageById(id: string): Promise<Page | null> {
    try {
      const response = await fetchWp(`${WP_POSTS_API}/pages/${id}?_embed`, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error("Failed to fetch page");
      return await response.json();
    } catch (error) {
      console.error("Error fetching page:", error);
      return null;
    }
  },

  async getPageBySlug(slug: string): Promise<Page | null> {
    try {
      const response = await fetchWp(`${WP_POSTS_API}/pages?slug=${slug}&_embed`, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error("Failed to fetch page");
      const pages = await response.json();
      return pages.length > 0 ? pages[0] : null;
    } catch (error) {
      console.error("Error fetching page:", error);
      return null;
    }
  },
};
