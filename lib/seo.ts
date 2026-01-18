import { cache } from "react";
import React from "react";

const WP_BASE_URL = "https://dir.lascrucesdirectory.com";
const SITE_NAME = "Las Cruces Directory";
const DEFAULT_DESCRIPTION = "Discover the best local businesses, restaurants, accommodations, and places in Las Cruces, New Mexico.";

function getDefaultSEOMetadata(title?: string, description?: string): SEOMetadata {
  const finalTitle = title || SITE_NAME;
  const finalDescription = description || DEFAULT_DESCRIPTION;
  return {
    title: finalTitle,
    description: finalDescription,
    ogTitle: finalTitle,
    ogDescription: finalDescription,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: finalTitle,
    twitterDescription: finalDescription,
    twitterSite: '@lascrucesbizdir',
  };
}

export interface SEOMetadata {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterSite?: string;
  canonical?: string;
  robots?: string;
  jsonLd?: object[];
}

export interface LocalBusinessSchema {
  name: string;
  description?: string;
  image?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  geo?: {
    latitude?: number;
    longitude?: number;
  };
  telephone?: string;
  email?: string;
  url?: string;
  priceRange?: string;
  aggregateRating?: {
    ratingValue?: number;
    reviewCount?: number;
  };
  openingHours?: string[];
}

export interface ArticleSchema {
  headline: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  publisher?: string;
}

function extractMetaContent(html: string, property: string): string | undefined {
  const patterns = [
    new RegExp(`<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*property=["']${property}["']`, 'i'),
    new RegExp(`<meta[^>]*name=["']${property}["'][^>]*content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*name=["']${property}["']`, 'i'),
  ];
  
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return match[1];
  }
  return undefined;
}

function extractCanonicalUrl(html: string): string | undefined {
  const pattern = /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i;
  const match = html.match(pattern);
  return match ? match[1] : undefined;
}

function extractTitle(html: string): string | undefined {
  const match = html.match(/<title>([^<]+)<\/title>/i);
  return match ? match[1] : undefined;
}

function extractJsonLd(html: string): object[] {
  const jsonLdArray: object[] = [];
  const pattern = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  
  while ((match = pattern.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      if (Array.isArray(parsed)) {
        jsonLdArray.push(...parsed);
      } else {
        jsonLdArray.push(parsed);
      }
    } catch (e) {
    }
  }
  
  return jsonLdArray;
}

async function fetchWordPressPageSEO(path: string, fallbackTitle?: string): Promise<SEOMetadata> {
  const defaults = getDefaultSEOMetadata(fallbackTitle);
  
  try {
    const url = `${WP_BASE_URL}${path}`;
    const response = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'Las Cruces Directory SEO Fetcher'
      }
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch SEO for ${path}: ${response.status}, using defaults`);
      return defaults;
    }
    
    const html = await response.text();
    const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    const headHtml = headMatch ? headMatch[1] : html;
    
    const fetched: SEOMetadata = {
      title: extractTitle(headHtml),
      description: extractMetaContent(headHtml, 'description'),
      ogTitle: extractMetaContent(headHtml, 'og:title'),
      ogDescription: extractMetaContent(headHtml, 'og:description'),
      ogImage: extractMetaContent(headHtml, 'og:image'),
      ogImageAlt: extractMetaContent(headHtml, 'og:image:alt'),
      ogType: extractMetaContent(headHtml, 'og:type'),
      ogUrl: extractMetaContent(headHtml, 'og:url'),
      twitterCard: extractMetaContent(headHtml, 'twitter:card'),
      twitterTitle: extractMetaContent(headHtml, 'twitter:title'),
      twitterDescription: extractMetaContent(headHtml, 'twitter:description'),
      twitterImage: extractMetaContent(headHtml, 'twitter:image'),
      twitterSite: extractMetaContent(headHtml, 'twitter:site'),
      canonical: extractCanonicalUrl(headHtml),
      robots: extractMetaContent(headHtml, 'robots'),
      jsonLd: extractJsonLd(headHtml),
    };
    
    return {
      ...defaults,
      ...Object.fromEntries(Object.entries(fetched).filter(([_, v]) => v !== undefined)),
    };
  } catch (error) {
    console.error(`Error fetching SEO for ${path}:`, error);
    return defaults;
  }
}

export const getCachedBlogPostSEO = cache(async (slug: string): Promise<SEOMetadata> => {
  return fetchWordPressPageSEO(`/${slug}/`);
});

export const getCachedListingSEO = cache(async (type: string, slug: string): Promise<SEOMetadata> => {
  const typeMapping: Record<string, string> = {
    'restaurant': 'restaurant',
    'business': 'business',
    'accommodation': 'accommodation',
    'places': 'places',
  };
  const wpType = typeMapping[type] || type;
  return fetchWordPressPageSEO(`/${wpType}/${slug}/`);
});

export function generateLocalBusinessSchema(data: LocalBusinessSchema): object {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": data.name,
  };
  
  if (data.description) {
    schema.description = data.description;
  }
  
  if (data.image) {
    schema.image = data.image;
  }
  
  if (data.address && (data.address.streetAddress || data.address.addressLocality)) {
    schema.address = {
      "@type": "PostalAddress",
    };
    if (data.address.streetAddress) schema.address.streetAddress = data.address.streetAddress;
    if (data.address.addressLocality) schema.address.addressLocality = data.address.addressLocality;
    if (data.address.addressRegion) schema.address.addressRegion = data.address.addressRegion;
    if (data.address.postalCode) schema.address.postalCode = data.address.postalCode;
    if (data.address.addressCountry) schema.address.addressCountry = data.address.addressCountry;
  }
  
  if (data.geo && data.geo.latitude && data.geo.longitude) {
    schema.geo = {
      "@type": "GeoCoordinates",
      "latitude": data.geo.latitude,
      "longitude": data.geo.longitude,
    };
  }
  
  if (data.telephone) {
    schema.telephone = data.telephone;
  }
  
  if (data.email) {
    schema.email = data.email;
  }
  
  if (data.url) {
    schema.url = data.url;
  }
  
  if (data.aggregateRating && data.aggregateRating.ratingValue) {
    const ratingValue = data.aggregateRating.ratingValue;
    if (ratingValue >= 1 && ratingValue <= 5) {
      schema.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": ratingValue,
        "bestRating": 5,
        "worstRating": 1,
        "reviewCount": data.aggregateRating.reviewCount || 1,
      };
    }
  }
  
  return schema;
}

export function generateRestaurantSchema(data: LocalBusinessSchema): object {
  const schema = generateLocalBusinessSchema(data);
  (schema as any)["@type"] = "Restaurant";
  return schema;
}

export function generateLodgingSchema(data: LocalBusinessSchema): object {
  const schema = generateLocalBusinessSchema(data);
  (schema as any)["@type"] = "LodgingBusiness";
  return schema;
}

export function generateArticleSchema(data: ArticleSchema): object {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.headline,
    "publisher": {
      "@type": "Organization",
      "name": data.publisher || "Las Cruces Directory",
      "url": "https://lascrucesdirectory.com",
    },
  };
  
  if (data.description) {
    schema.description = data.description;
  }
  
  if (data.image) {
    schema.image = data.image;
  }
  
  if (data.datePublished) {
    schema.datePublished = data.datePublished;
  }
  
  if (data.dateModified) {
    schema.dateModified = data.dateModified;
  }
  
  if (data.author) {
    schema.author = {
      "@type": "Person",
      "name": data.author,
    };
  }
  
  return schema;
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

export function generateWebsiteSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Las Cruces Directory",
    "url": "https://lascrucesdirectory.com",
    "description": "Your complete guide to local businesses, restaurants, accommodations, and places in Las Cruces, New Mexico.",
    "publisher": {
      "@type": "Organization",
      "name": "Las Cruces Directory",
      "url": "https://lascrucesdirectory.com",
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://lascrucesdirectory.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function JsonLdScript({ data }: { data: object | object[] }): React.ReactElement {
  const jsonString = JSON.stringify(Array.isArray(data) ? data : [data]);
  return React.createElement('script', {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: jsonString }
  });
}
