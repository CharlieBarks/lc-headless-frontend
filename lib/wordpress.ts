const WP_API_BASE = 'https://dir.lascrucesdirectory.com/wp-json/geodir/v2';
const WP_POSTS_API = 'https://dir.lascrucesdirectory.com/wp-json/wp/v2';

export function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&#8217;': "'",
    '&#8216;': "'",
    '&#8220;': '"',
    '&#8221;': '"',
    '&#038;': '&',
  };

  return text.replace(/&[#a-z0-9]+;/gi, (match) => entities[match] || match);
}

export function isListingClaimed(listing: any): boolean {
  if (typeof listing.claimed === 'boolean') return listing.claimed;
  if (typeof listing.claimed === 'object' && listing.claimed?.raw) {
    return listing.claimed.raw === '1' || listing.claimed.raw === 1 || listing.claimed.raw === true;
  }
  return listing.claimed === '1' || listing.claimed === 1 || listing.claimed === true;
}

export function isListingFeatured(listing: any): boolean {
  return listing.featured === true || listing.featured === 1 || listing.featured === '1';
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Listing {
  id: number | string;
  slug: string;
  title: {
    rendered: string;
  };
  post_category?: Category[];
  default_category?: string;
  featured_image?: {
    id?: string;
    title?: string;
    src?: string;
    thumbnail?: string;
    width?: number;
    height?: number;
  } | false;
  images?: Array<{
    id?: string;
    title?: string;
    src?: string;
    thumbnail?: string;
    featured?: boolean;
    position?: string;
  }> | false;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url?: string;
      media_details?: {
        sizes?: {
          medium?: { source_url?: string };
          thumbnail?: { source_url?: string };
        };
      };
    }>;
  };
  street?: string;
  city?: string;
  region?: string;
  country?: string;
  zip?: string;
  latitude?: number;
  longitude?: number;
  location?: {
    city?: string;
    region?: string;
    country?: string;
  };
  rating?: number;
  rating_count?: number;
  link: string;
  phone?: string;
  email?: string;
  website?: string;
  post_content?: string;
  content?: {
    raw?: string;
    rendered?: string;
  };
  business_hours?: string | { raw?: string; rendered?: any };
  takeout?: boolean;
  drive_thru?: boolean;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  featured?: boolean;
  claimed?: { raw?: string; rendered?: string } | boolean | number | string;
}

export interface BlogPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content?: {
    rendered: string;
  };
  date: string;
  link: string;
  slug: string;
  featured_media?: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url?: string;
      media_details?: {
        sizes?: {
          medium?: { source_url?: string };
          thumbnail?: { source_url?: string };
        };
      };
    }>;
  };
}

export interface Page {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  modified: string;
  link: string;
  featured_media?: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url?: string;
      media_details?: {
        sizes?: {
          medium?: { source_url?: string };
          thumbnail?: { source_url?: string };
        };
      };
    }>;
  };
}

export interface CategoryCount {
  restaurants: number;
  businesses: number;
  accommodations: number;
  places: number;
}

const DEFAULT_IMAGES = {
  restaurant: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
  business: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800',
  accommodation: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
  places: 'https://images.pexels.com/photos/2739664/pexels-photo-2739664.jpeg?auto=compress&cs=tinysrgb&w=800',
  blog: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=800'
};

function proxyImageUrl(url: string): string {
  if (!url) return url;

  if (url.startsWith('https://dir.lascrucesdirectory.com/')) {
    return `/api/image-proxy?url=${encodeURIComponent(url)}`;
  }

  return url;
}

export function getAllListingImages(listing: Listing, defaultType: keyof typeof DEFAULT_IMAGES = 'business'): string[] {
  const imageSet = new Set<string>();

  if (listing.featured_image && typeof listing.featured_image === 'object' && listing.featured_image.src) {
    imageSet.add(proxyImageUrl(listing.featured_image.src));
  }

  if (Array.isArray(listing.images) && listing.images.length > 0) {
    listing.images.forEach(img => {
      if (img?.src) {
        imageSet.add(proxyImageUrl(img.src));
      }
    });
  }

  if (listing._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    const url = listing._embedded['wp:featuredmedia'][0].source_url;
    imageSet.add(proxyImageUrl(url));
  }

  const images = Array.from(imageSet);

  if (images.length === 0) {
    images.push(DEFAULT_IMAGES[defaultType]);
  }

  return images;
}

export function getListingImage(listing: Listing, defaultType: keyof typeof DEFAULT_IMAGES = 'business'): string {
  let imageUrl: string | undefined;

  if (listing.featured_image && typeof listing.featured_image === 'object' && listing.featured_image.src) {
    imageUrl = listing.featured_image.src;
    return proxyImageUrl(imageUrl);
  }

  if (Array.isArray(listing.images) && listing.images.length > 0 && listing.images[0]?.src) {
    imageUrl = listing.images[0].src;
    return proxyImageUrl(imageUrl);
  }

  if (listing._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    imageUrl = listing._embedded['wp:featuredmedia'][0].source_url;
    return proxyImageUrl(imageUrl);
  }

  if (listing._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium?.source_url) {
    imageUrl = listing._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
    return proxyImageUrl(imageUrl);
  }

  imageUrl = DEFAULT_IMAGES[defaultType];
  return imageUrl;
}

export function getBlogPostImage(post: BlogPost): string {
  if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    return proxyImageUrl(post._embedded['wp:featuredmedia'][0].source_url);
  }

  if (post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium?.source_url) {
    return proxyImageUrl(post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url);
  }

  return DEFAULT_IMAGES.blog;
}

export const wordpressAPI = {
  async getRestaurants(limit = 3, category?: string | number, searchQuery?: string): Promise<Listing[]> {
    try {
      let url = `${WP_API_BASE}/restaurant?per_page=${limit}&_embed`;
      if (category) {
        url += `&gd_restaurantcategory=${category}`;
      }
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }
      const response = await fetch(url, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error('Failed to fetch restaurants');
      return await response.json();
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      return [];
    }
  },

  async getRestaurantCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${WP_API_BASE}/restaurant/categories?per_page=100`, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error('Failed to fetch restaurant categories');
      const categories = await response.json();
      return categories.filter((cat: Category & { count: number }) => cat.count > 0);
    } catch (error) {
      console.error('Error fetching restaurant categories:', error);
      return [];
    }
  },

  async getBusinesses(limit = 3, category?: string | number, searchQuery?: string): Promise<Listing[]> {
    try {
      let url = `${WP_API_BASE}/business?per_page=${limit}&_embed`;
      if (category) {
        url += `&gd_businesscategory=${category}`;
      }
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }
      const response = await fetch(url, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error('Failed to fetch businesses');
      return await response.json();
    } catch (error) {
      console.error('Error fetching businesses:', error);
      return [];
    }
  },

  async getBusinessCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${WP_API_BASE}/business/categories?per_page=100`, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error('Failed to fetch business categories');
      const categories = await response.json();
      return categories.filter((cat: Category & { count: number }) => cat.count > 0);
    } catch (error) {
      console.error('Error fetching business categories:', error);
      return [];
    }
  },

  async getAccommodations(limit = 3, category?: string | number, searchQuery?: string): Promise<Listing[]> {
    try {
      let url = `${WP_API_BASE}/accommodation?per_page=${limit}&_embed`;
      if (category) {
        url += `&gd_accommodationcategory=${category}`;
      }
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }
      const response = await fetch(url, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error('Failed to fetch accommodations');
      return await response.json();
    } catch (error) {
      console.error('Error fetching accommodations:', error);
      return [];
    }
  },

  async getAccommodationCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${WP_API_BASE}/accommodation/categories?per_page=100`, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error('Failed to fetch accommodation categories');
      const categories = await response.json();
      return categories.filter((cat: Category & { count: number }) => cat.count > 0);
    } catch (error) {
      console.error('Error fetching accommodation categories:', error);
      return [];
    }
  },

  async getPlaces(limit = 3, category?: string | number, searchQuery?: string): Promise<Listing[]> {
    try {
      let url = `${WP_API_BASE}/places?per_page=${limit}&_embed`;
      if (category) {
        url += `&gd_placecategory=${category}`;
      }
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }
      const response = await fetch(url, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error('Failed to fetch places');
      return await response.json();
    } catch (error) {
      console.error('Error fetching places:', error);
      return [];
    }
  },

  async getPlaceCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${WP_API_BASE}/places/categories?per_page=100`, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error('Failed to fetch place categories');
      const categories = await response.json();
      return categories.filter((cat: Category & { count: number }) => cat.count > 0);
    } catch (error) {
      console.error('Error fetching place categories:', error);
      return [];
    }
  },

  async getFeaturedListings(limit = 3): Promise<Listing[]> {
    try {
      const [restaurants, businesses] = await Promise.all([
        fetch(`${WP_API_BASE}/restaurant?per_page=100&_embed`, { next: { revalidate: 3600 } }),
        fetch(`${WP_API_BASE}/business?per_page=100&_embed`, { next: { revalidate: 3600 } })
      ]);

      const results = await Promise.all([
        restaurants.ok ? restaurants.json() : [],
        businesses.ok ? businesses.json() : []
      ]);

      const allListings = [...results[0], ...results[1]];

      // Filter only listings that have a featured image
      const withFeaturedImages = allListings.filter((listing: Listing) =>
        listing.featured_image && listing.featured_image.src
      );

      // Randomly shuffle and select the specified limit
      const shuffled = withFeaturedImages.sort(() => Math.random() - 0.5);
      return shuffled.slice(0, limit);
    } catch (error) {
      console.error('Error fetching featured listings:', error);
      return [];
    }
  },

  async getBlogPosts(limit = 3): Promise<BlogPost[]> {
    try {
      const response = await fetch(`${WP_POSTS_API}/posts?per_page=${limit}&_embed`, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return await response.json();
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  },

  async getCategoryCounts(): Promise<CategoryCount> {
    try {
      const [restaurants, businesses, accommodations, places] = await Promise.all([
        fetch(`${WP_API_BASE}/restaurant?per_page=1`, { next: { revalidate: 3600 } }),
        fetch(`${WP_API_BASE}/business?per_page=1`, { next: { revalidate: 3600 } }),
        fetch(`${WP_API_BASE}/accommodation?per_page=1`, { next: { revalidate: 3600 } }),
        fetch(`${WP_API_BASE}/places?per_page=1`, { next: { revalidate: 3600 } })
      ]);

      return {
        restaurants: parseInt(restaurants.headers.get('X-WP-Total') || '0'),
        businesses: parseInt(businesses.headers.get('X-WP-Total') || '0'),
        accommodations: parseInt(accommodations.headers.get('X-WP-Total') || '0'),
        places: parseInt(places.headers.get('X-WP-Total') || '0')
      };
    } catch (error) {
      console.error('Error fetching category counts:', error);
      return {
        restaurants: 0,
        businesses: 0,
        accommodations: 0,
        places: 0
      };
    }
  },

  async searchListings(query: string, limit = 10): Promise<Listing[]> {
    try {
      const [restaurants, businesses, accommodations, places] = await Promise.all([
        fetch(`${WP_API_BASE}/restaurant?search=${encodeURIComponent(query)}&per_page=${limit}`, { next: { revalidate: 3600 } }),
        fetch(`${WP_API_BASE}/business?search=${encodeURIComponent(query)}&per_page=${limit}`, { next: { revalidate: 3600 } }),
        fetch(`${WP_API_BASE}/accommodation?search=${encodeURIComponent(query)}&per_page=${limit}`, { next: { revalidate: 3600 } }),
        fetch(`${WP_API_BASE}/places?search=${encodeURIComponent(query)}&per_page=${limit}`, { next: { revalidate: 3600 } })
      ]);

      const results = await Promise.all([
        restaurants.json(),
        businesses.json(),
        accommodations.json(),
        places.json()
      ]);

      return [...results[0], ...results[1], ...results[2], ...results[3]].slice(0, limit);
    } catch (error) {
      console.error('Error searching listings:', error);
      return [];
    }
  },

  async getListingBySlug(type: string, slug: string): Promise<Listing | null> {
    try {
      const response = await fetch(`${WP_API_BASE}/${type}?slug=${slug}&_embed`, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error('Failed to fetch listing');
      const listings = await response.json();
      return listings.length > 0 ? listings[0] : null;
    } catch (error) {
      console.error('Error fetching listing:', error);
      return null;
    }
  },

  async getListingById(type: string, id: string): Promise<Listing | null> {
    try {
      const response = await fetch(`${WP_API_BASE}/${type}/${id}?_embed`, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error('Failed to fetch listing');
      return await response.json();
    } catch (error) {
      console.error('Error fetching listing:', error);
      return null;
    }
  },

  async getBlogPostById(id: string): Promise<BlogPost | null> {
    try {
      const response = await fetch(`${WP_POSTS_API}/posts/${id}?_embed`, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error('Failed to fetch blog post');
      return await response.json();
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  },

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const response = await fetch(`${WP_POSTS_API}/posts?slug=${slug}&_embed`, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error('Failed to fetch blog post');
      const posts = await response.json();
      return posts.length > 0 ? posts[0] : null;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  },

  async getPageById(id: string): Promise<Page | null> {
    try {
      const response = await fetch(`${WP_POSTS_API}/pages/${id}?_embed`, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error('Failed to fetch page');
      return await response.json();
    } catch (error) {
      console.error('Error fetching page:', error);
      return null;
    }
  },

  async getPageBySlug(slug: string): Promise<Page | null> {
    try {
      const response = await fetch(`${WP_POSTS_API}/pages?slug=${slug}&_embed`, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error('Failed to fetch page');
      const pages = await response.json();
      return pages.length > 0 ? pages[0] : null;
    } catch (error) {
      console.error('Error fetching page:', error);
      return null;
    }
  }
};
