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
  featured_image?:
    | {
        id?: string;
        title?: string;
        src?: string;
        thumbnail?: string;
        width?: number;
        height?: number;
      }
    | false;
  images?:
    | Array<{
        id?: string;
        title?: string;
        src?: string;
        thumbnail?: string;
        featured?: boolean;
        position?: string;
      }>
    | false;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
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
  business_hours?: string | { 
    raw?: string; 
    rendered?: string | { 
      days?: Record<string, { day?: string; slots?: Array<{ range?: string }> }> 
    }; 
  };
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
    "wp:featuredmedia"?: Array<{
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
    "wp:featuredmedia"?: Array<{
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
