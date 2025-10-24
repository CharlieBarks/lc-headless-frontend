const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export interface SEOMetadata {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  robots?: string;
}

export async function fetchRankMathSEO(url: string): Promise<SEOMetadata> {
  try {
    const proxyUrl = `${SUPABASE_URL}/functions/v1/seo-proxy?url=${encodeURIComponent(url)}`;

    const response = await fetch(proxyUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY!,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch SEO data', response.status);
      return {};
    }

    const metadata = await response.json();
    return metadata;
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return {};
  }
}
