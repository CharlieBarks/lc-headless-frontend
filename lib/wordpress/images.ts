import type { Listing, BlogPost } from './types';

export const DEFAULT_IMAGES = {
  restaurant:
    "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
  business:
    "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800",
  accommodation:
    "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
  places:
    "https://images.pexels.com/photos/2739664/pexels-photo-2739664.jpeg?auto=compress&cs=tinysrgb&w=800",
  blog: "https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=800",
};

export function getAllListingImages(
  listing: Listing,
  defaultType: keyof typeof DEFAULT_IMAGES = "business",
): string[] {
  const imageSet = new Set<string>();

  if (
    listing.featured_image &&
    typeof listing.featured_image === "object" &&
    listing.featured_image.src
  ) {
    imageSet.add(listing.featured_image.src);
  }

  if (Array.isArray(listing.images) && listing.images.length > 0) {
    listing.images.forEach((img) => {
      if (img?.src) {
        imageSet.add(img.src);
      }
    });
  }

  if (listing._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
    const url = listing._embedded["wp:featuredmedia"][0].source_url;
    imageSet.add(url);
  }

  const images = Array.from(imageSet);

  if (images.length === 0) {
    images.push(DEFAULT_IMAGES[defaultType]);
  }

  return images;
}

export function getListingImage(
  listing: Listing,
  defaultType: keyof typeof DEFAULT_IMAGES = "business",
): string {
  if (
    listing.featured_image &&
    typeof listing.featured_image === "object" &&
    listing.featured_image.src
  ) {
    return listing.featured_image.src;
  }

  if (
    Array.isArray(listing.images) &&
    listing.images.length > 0 &&
    listing.images[0]?.src
  ) {
    return listing.images[0].src;
  }

  if (listing._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
    return listing._embedded["wp:featuredmedia"][0].source_url;
  }

  if (
    listing._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium
      ?.source_url
  ) {
    return listing._embedded["wp:featuredmedia"][0].media_details.sizes.medium
      .source_url;
  }

  return DEFAULT_IMAGES[defaultType];
}

export function getBlogPostImage(post: BlogPost): string {
  if (post._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
    return post._embedded["wp:featuredmedia"][0].source_url;
  }

  if (
    post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium
      ?.source_url
  ) {
    return post._embedded["wp:featuredmedia"][0].media_details.sizes.medium
      .source_url;
  }

  return DEFAULT_IMAGES.blog;
}
