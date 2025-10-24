const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const pageUrl = url.searchParams.get('url');

    if (!pageUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing url parameter' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate it's from the WordPress site
    if (!pageUrl.startsWith('https://dir.lascrucesdirectory.com/')) {
      return new Response(
        JSON.stringify({ error: 'Invalid URL' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('Fetching page:', pageUrl);

    // Fetch the page HTML
    const pageResponse = await fetch(pageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEO-Proxy/1.0)',
      },
    });

    if (!pageResponse.ok) {
      console.error('Failed to fetch page:', pageResponse.status);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch page', status: pageResponse.status }),
        {
          status: pageResponse.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const html = await pageResponse.text();
    console.log('Fetched HTML length:', html.length);

    // Extract the <head> section
    const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    if (!headMatch) {
      return new Response(
        JSON.stringify({ error: 'No head section found' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const headContent = headMatch[1];
    console.log('Head content length:', headContent.length);

    // Parse meta tags
    const metadata: Record<string, string> = {};

    // Extract title
    const titleMatch = headContent.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch) {
      metadata.title = decodeHTML(titleMatch[1].trim());
    }

    // Extract meta tags
    const metaRegex = /<meta\s+([^>]+)>/gi;
    let metaMatch;
    while ((metaMatch = metaRegex.exec(headContent)) !== null) {
      const attrs = metaMatch[1];
      
      const nameMatch = attrs.match(/name=["']([^"']+)["']/i);
      const propertyMatch = attrs.match(/property=["']([^"']+)["']/i);
      const contentMatch = attrs.match(/content=["']([^"']*)["']/i);

      if (contentMatch) {
        const content = decodeHTML(contentMatch[1]);
        
        if (nameMatch) {
          const name = nameMatch[1];
          if (name === 'description') metadata.description = content;
          else if (name === 'robots') metadata.robots = content;
          else if (name === 'twitter:card') metadata.twitterCard = content;
          else if (name === 'twitter:title') metadata.twitterTitle = content;
          else if (name === 'twitter:description') metadata.twitterDescription = content;
          else if (name === 'twitter:image') metadata.twitterImage = content;
        } else if (propertyMatch) {
          const property = propertyMatch[1];
          if (property === 'og:title') metadata.ogTitle = content;
          else if (property === 'og:description') metadata.ogDescription = content;
          else if (property === 'og:image') metadata.ogImage = content;
          else if (property === 'og:type') metadata.ogType = content;
        }
      }
    }

    // Extract canonical URL and transform to frontend domain
    const canonicalMatch = headContent.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
                          headContent.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
    if (canonicalMatch) {
      let canonical = canonicalMatch[1];
      // Transform backend subdomain to frontend domain
      canonical = canonical.replace('https://dir.lascrucesdirectory.com/', 'https://las-cruces-directory.com/');
      metadata.canonical = canonical;
    }

    console.log('Parsed metadata:', metadata);

    return new Response(
      JSON.stringify(metadata),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
        },
      }
    );
  } catch (error) {
    console.error('SEO proxy error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function decodeHTML(html: string): string {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'");
}
