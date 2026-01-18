import { cache } from "react";
import { wordpressAPI } from './api';
import type { Listing, BlogPost, Category } from './types';

export const getCachedListingBySlug = cache(
  async (type: string, slug: string): Promise<Listing | null> => {
    return wordpressAPI.getListingBySlug(type, slug);
  }
);

export const getCachedBlogPostBySlug = cache(
  async (slug: string): Promise<BlogPost | null> => {
    return wordpressAPI.getBlogPostBySlug(slug);
  }
);

export const getCachedHomePageData = cache(async () => {
  const fetchWithTimeout = async <T,>(
    promise: Promise<T>,
    timeoutMs = 5000
  ): Promise<T | null> => {
    const timeout = new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), timeoutMs)
    );
    return Promise.race([promise, timeout]) as Promise<T | null>;
  };

  const [featuredListings, blogPosts, categoryCounts] = await Promise.all([
    fetchWithTimeout(wordpressAPI.getFeaturedListings(3)).then((r) => r || []),
    fetchWithTimeout(wordpressAPI.getBlogPosts(3)).then((r) => r || []),
    fetchWithTimeout(wordpressAPI.getCategoryCounts()).then(
      (r) => r || { restaurants: 0, businesses: 0, accommodations: 0, places: 0 }
    ),
  ]);

  return { featuredListings, blogPosts, categoryCounts };
});

export const getCachedArchiveData = cache(
  async (
    type: string,
    category?: string,
    search?: string
  ): Promise<{ listings: Listing[]; categories: Category[] }> => {
    let listings: Listing[] = [];
    let categories: Category[] = [];

    try {
      switch (type) {
        case "restaurant":
          [listings, categories] = await Promise.all([
            wordpressAPI.getRestaurants(100, category, search),
            wordpressAPI.getRestaurantCategories(),
          ]);
          break;
        case "business":
          [listings, categories] = await Promise.all([
            wordpressAPI.getBusinesses(100, category, search),
            wordpressAPI.getBusinessCategories(),
          ]);
          break;
        case "accommodation":
          [listings, categories] = await Promise.all([
            wordpressAPI.getAccommodations(100, category, search),
            wordpressAPI.getAccommodationCategories(),
          ]);
          break;
        case "places":
          [listings, categories] = await Promise.all([
            wordpressAPI.getPlaces(100, category, search),
            wordpressAPI.getPlaceCategories(),
          ]);
          break;
      }
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    }

    return { listings, categories };
  }
);

export const getCachedBlogPosts = cache(
  async (limit: number = 50): Promise<BlogPost[]> => {
    return wordpressAPI.getBlogPosts(limit);
  }
);
